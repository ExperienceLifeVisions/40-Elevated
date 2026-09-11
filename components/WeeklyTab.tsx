'use client'
import { useEffect, useState } from 'react'
import { createClient } from '../lib/supabase'
import { WEEKLY_COMMITMENTS, WEEKLY_VERSES, FRUIT_DATA, COMMITMENTS, weekRange, weekNumber, dayNumber, today, PROGRAM_WEEKS } from '../lib/data'

interface Props {
  curWeek: number
  startDate: Date
  weeklyData: Record<number, Record<string, boolean>>
  onToggle: (week: number, id: string) => void
  onChangeWeek: (week: number) => void
  onReturnToStandard: () => void
  locked: boolean
  completions?: Record<string, Record<string, boolean>>
  inStandard?: boolean
}

export default function WeeklyTab({ curWeek, startDate, weeklyData, onToggle, onChangeWeek, onReturnToStandard, locked, completions = {}, inStandard = false }: Props) {
  // ── The Standard: chosen verse state ──
  const supabase = createClient()
  const [verseText, setVerseText] = useState('')
  const [verseRef, setVerseRef] = useState('')
  const [savedVerse, setSavedVerse] = useState<{ text: string; ref: string } | null>(null)
  const [editingVerse, setEditingVerse] = useState(false)
  const [savingVerse, setSavingVerse] = useState(false)
  const [verseLoaded, setVerseLoaded] = useState(false)

  const todayNum = locked ? 0 : dayNumber(startDate, today(), false)
  const thisWeek = locked ? 1 : Math.max(1, Math.ceil(todayNum / 7))

  useEffect(() => {
    if (!inStandard) return
    let cancelled = false
    async function loadVerse() {
      const { data: userData } = await supabase.auth.getUser()
      const uid = userData?.user?.id
      if (!uid || cancelled) return
      const { data } = await supabase
        .from('weekly_data')
        .select('verse_text, verse_ref')
        .eq('user_id', uid)
        .eq('week_number', thisWeek)
        .maybeSingle()
      if (cancelled) return
      if (data?.verse_text) {
        setSavedVerse({ text: data.verse_text, ref: data.verse_ref || '' })
      }
      setVerseLoaded(true)
    }
    loadVerse()
    return () => { cancelled = true }
  }, [inStandard, thisWeek])

  async function saveVerse() {
    const text = verseText.trim()
    if (!text || savingVerse) return
    setSavingVerse(true)
    const { data: userData } = await supabase.auth.getUser()
    const uid = userData?.user?.id
    if (!uid) { setSavingVerse(false); return }
    const { error } = await supabase.from('weekly_data').upsert({
      user_id: uid,
      week_number: thisWeek,
      verse_text: text,
      verse_ref: verseRef.trim() || null,
    }, { onConflict: 'user_id,week_number' })
    setSavingVerse(false)
    if (error) return
    setSavedVerse({ text, ref: verseRef.trim() })
    setEditingVerse(false)
  }

  // ─────────────────────────────────────────────────────────────
  // THE STANDARD VIEW: week strip, chosen verse, weekly practices
  // ─────────────────────────────────────────────────────────────
  if (inStandard && !locked) {
    const wd = weeklyData[thisWeek] || {}
    const weekStart = new Date(startDate)
    weekStart.setDate(weekStart.getDate() + (thisWeek - 1) * 7)
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 6)
    const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

    const stripDays = Array.from({ length: 7 }, (_, i) => {
      const dayN = (thisWeek - 1) * 7 + i + 1
      const date = new Date(startDate)
      date.setDate(date.getDate() + dayN - 1)
      const dc = completions[dayN] || {}
      const isDone = COMMITMENTS.every(c => dc[c.id])
      return {
        dayN,
        letter: date.toLocaleDateString('en-US', { weekday: 'narrow' }),
        num: date.getDate(),
        done: isDone,
        isToday: dayN === todayNum,
      }
    })

    const streak = (() => {
      let s = 0
      for (let d = todayNum; d >= 1; d--) {
        const dc = completions[d] || {}
        if (COMMITMENTS.every(c => dc[c.id])) s++
        else if (d === todayNum) continue
        else break
      }
      return s
    })()

    const showEntry = !savedVerse || editingVerse

    return (
      <div id="tab-weekly">
        <div className="ws-header">
          <div className="ws-title">This Week</div>
          <div className="ws-range">{fmt(weekStart)} to {fmt(weekEnd)}</div>
        </div>
        <div className="ws-strip">
          {stripDays.map(d => (
            <div key={d.dayN} className="ws-day">
              <div className="ws-letter">{d.letter}</div>
              <div className={`ws-cell ${d.done ? 'done' : ''} ${d.isToday ? 'today' : ''}`}>{d.num}</div>
            </div>
          ))}
        </div>
        {streak > 0 && (
          <div className="ws-streak"><strong>{streak} {streak === 1 ? 'day' : 'days'}</strong> in a row and counting</div>
        )}

        <div className="section-label">Scripture memory</div>
        {verseLoaded && showEntry && (
          <div className="ws-verse-entry">
            <div className="ws-verse-prompt">Choose a verse from your time in His Word this week. Write it here and carry it with you.</div>
            <textarea
              className="ws-verse-input"
              rows={3}
              placeholder="Type your verse..."
              value={verseText}
              onChange={e => setVerseText(e.target.value)}
            />
            <input
              className="ws-verse-input ws-verse-ref-input"
              type="text"
              placeholder="Reference (for example Proverbs 3:5)"
              value={verseRef}
              onChange={e => setVerseRef(e.target.value)}
            />
            <button type="button" className="ws-verse-save" onClick={saveVerse} disabled={savingVerse || !verseText.trim()}>
              {savingVerse ? 'Saving...' : 'Save My Verse for This Week'}
            </button>
          </div>
        )}
        {verseLoaded && !showEntry && savedVerse && (
          <div className="ws-verse-card">
            <div className="ws-verse-eyebrow">My verse this week</div>
            <div className="ws-verse-text">&ldquo;{savedVerse.text}&rdquo;</div>
            {savedVerse.ref && <div className="ws-verse-cardref">{savedVerse.ref}</div>}
            <button
              type="button"
              className="ws-verse-change"
              onClick={() => { setVerseText(savedVerse.text); setVerseRef(savedVerse.ref); setEditingVerse(true) }}
            >
              Choose a new verse
            </button>
          </div>
        )}

        <div className="section-label">Weekly practices</div>
        <div className="weekly-cards" id="weekly-cards">
          {WEEKLY_COMMITMENTS.map(c => {
            const checked = !!wd[c.id]
            const desc = c.id === 'scripture_memory'
              ? 'Choose a verse from your time in His Word this week. Commit it to memory.'
              : c.desc
            return (
              <div key={c.id} className={`weekly-card ${checked ? 'done' : ''}`}>
                <div className="weekly-card-header" onClick={() => onToggle(thisWeek, c.id)}>
                  <div className="check">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="commit-title">{c.title}</div>
                    <div className="commit-desc">{desc}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <button type="button" className="back-to-standard" onClick={onReturnToStandard}>
          ← The Standard
        </button>

        <style>{`
          .ws-header { text-align: center; margin-bottom: 12px; }
          .ws-title { font-size: 22px; font-weight: 800; color: #ffffff; }
          .ws-range { font-size: 13px; color: #888; margin-top: 3px; }
          .ws-strip { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; margin-bottom: 4px; }
          .ws-day { text-align: center; }
          .ws-letter { font-size: 11px; color: #555; letter-spacing: 0.06em; margin-bottom: 5px; text-transform: uppercase; }
          .ws-cell { aspect-ratio: 1; border-radius: 50%; border: 0.5px solid rgba(255,255,255,0.08); background: #141414; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; color: #888; }
          .ws-cell.done { background: #c41e1e; border-color: #c41e1e; color: #ffffff; }
          .ws-cell.today { border-color: #c41e1e; color: #e02020; }
          .ws-cell.done.today { color: #ffffff; }
          .ws-streak { text-align: center; font-size: 13px; color: #888; margin: 8px 0 4px; }
          .ws-streak strong { color: #e02020; }
          .ws-verse-entry { background: #141414; border: 0.5px solid rgba(196,30,30,0.4); border-radius: 13px; padding: 16px; margin-bottom: 9px; }
          .ws-verse-prompt { font-size: 13.5px; color: #888; line-height: 1.55; margin-bottom: 12px; }
          .ws-verse-input { width: 100%; box-sizing: border-box; background: #0a0a0a; border: 0.5px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 12px; color: #f5f0ed; font-size: 14px; font-style: italic; margin-bottom: 8px; font-family: inherit; resize: none; }
          .ws-verse-input::placeholder { color: #555; }
          .ws-verse-ref-input { font-style: normal; }
          .ws-verse-save { width: 100%; padding: 12px; background: #c41e1e; color: #ffffff; border: none; border-radius: 10px; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; }
          .ws-verse-save:disabled { opacity: 0.5; }
          .ws-verse-card { background: #141414; border: 0.5px solid rgba(196,30,30,0.4); border-radius: 13px; padding: 18px 16px; margin-bottom: 9px; }
          .ws-verse-eyebrow { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #c41e1e; font-weight: 600; margin-bottom: 8px; }
          .ws-verse-text { font-size: 16px; color: #f5f0ed; font-style: italic; line-height: 1.6; margin-bottom: 6px; }
          .ws-verse-cardref { font-size: 12px; color: #c41e1e; letter-spacing: 0.08em; margin-bottom: 12px; }
          .ws-verse-change { background: none; border: none; padding: 0; font-size: 13px; color: #888; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }
        `}</style>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────
  // THE 40-DAY VIEW: unchanged from the live app
  // ─────────────────────────────────────────────────────────────
  const wd = weeklyData[curWeek] || {}
  const fruit = FRUIT_DATA[curWeek - 1]
  const verse = WEEKLY_VERSES[curWeek - 1]

  // locked wins. In preview there is no start date yet, so the week
  // comparison below cannot be trusted on its own.
  const currentWeek = locked ? 0 : weekNumber(startDate)
  const isFuture = locked || curWeek > currentWeek

  return (
    <div id="tab-weekly">
      <div className="week-nav">
        <button className="nav-btn" onClick={() => onChangeWeek(Math.max(1, curWeek - 1))}>‹</button>
        <div className="week-header" style={{ marginBottom: 0 }}>
          <div className="week-number">Week <span>{curWeek}</span></div>
          <div className="week-range">{weekRange(startDate, curWeek)}</div>
        </div>
        <button className="nav-btn" onClick={() => onChangeWeek(Math.min(PROGRAM_WEEKS, curWeek + 1))}>›</button>
      </div>

      {fruit && (
        <div className="fruit-card">
          <div className="fruit-eyebrow">{fruit.eyebrow}</div>
          <div className="fruit-name">{fruit.name}</div>
          <div className="fruit-def">{fruit.def}</div>
          <div className="fruit-divider" />
          <div className="fruit-verse">{fruit.verse}</div>
          <div className="fruit-ref">{fruit.ref}</div>
          {fruit.isList && fruit.fruits && (
            <ul className="fruit-list">
              {fruit.fruits.map((item: string) => {
                const parts = item.split(' — ')
                return (
                  <li key={item}>
                    <div className="fruit-list-name">{parts[0]}</div>
                    {parts[1] && <div className="fruit-list-def">{parts[1]}</div>}
                  </li>
                )
              })}
            </ul>
          )}
          {fruit.isHarvest && fruit.fruits && (
            <>
              <div className="fruit-harvest-grid">
                {fruit.fruits.map((name: string) => (
                  <div key={name} className="fruit-harvest-item">{name}</div>
                ))}
              </div>
              <div className="fruit-reflection">"Look back at who you were on Day 1. The Holy Spirit has been working. What fruit do you see growing in your life?"</div>
            </>
          )}
          {fruit.anchor && (
            <>
              <div className="fruit-anchor-label">Gospel anchor</div>
              <div className="fruit-anchor">
                <div className="fruit-anchor-verse">{fruit.anchor}</div>
                <div className="fruit-anchor-ref">{fruit.anchorRef}</div>
              </div>
            </>
          )}
        </div>
      )}

      <div className="section-label">Weekly practices</div>
      {isFuture && (
        <div className="week-locked-note">This week has not begun yet.</div>
      )}
      <div className="weekly-cards" id="weekly-cards">
        {WEEKLY_COMMITMENTS.map(c => {
          const checked = !!wd[c.id]
          return (
            <div key={c.id} className={`weekly-card ${checked ? 'done' : ''} ${isFuture ? 'future-week' : ''}`}>
              <div className="weekly-card-header" onClick={() => !isFuture && onToggle(curWeek, c.id)}>
                <div className="check">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="commit-title">{c.title}</div>
                  <div className="commit-desc">{c.desc}</div>
                </div>
              </div>
              {c.hasVerse && verse && (
                <div className="verse-input-wrap">
                  <div className="verse-label">This week&apos;s verse to memorize</div>
                  <div className="verse-display">{verse.verse}</div>
                  <div className="verse-display-ref">{verse.ref}</div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="section-label">All {PROGRAM_WEEKS} weeks</div>
      <div className="weekly-weeks" id="weekly-weeks">
        {Array.from({ length: PROGRAM_WEEKS }, (_, i) => i + 1).map(w => {
          const data = weeklyData[w] || {}
          const allDone = WEEKLY_COMMITMENTS.every(c => data[c.id])
          const partial = !allDone && WEEKLY_COMMITMENTS.some(c => data[c.id])
          const wLocked = w > currentWeek
          return (
            <div
              key={w}
              className={`week-cell ${w === curWeek ? 'w-now' : ''} ${allDone ? 'w-done' : ''} ${partial ? 'w-partial' : ''} ${wLocked ? 'w-locked' : ''}`}
              onClick={() => onChangeWeek(w)}
            >
              W{w}
            </div>
          )
        })}
      </div>

      <button type="button" className="back-to-standard" onClick={onReturnToStandard}>
        ← The Standard
      </button>
    </div>
  )
}
