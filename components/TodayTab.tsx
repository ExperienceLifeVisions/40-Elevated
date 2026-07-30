'use client'
import { COMMITMENTS, APPROACH_NAMES, formatDate, PROGRAM_DAYS } from '../lib/data'

interface Verse { verse: string; ref: string }

interface Props {
  curDay: number
  todayNum: number
  startDate: Date
  completions: Record<string, Record<string, boolean>>
  nutritionApproach: string | null
  onToggle: (day: number, id: string) => void
  onChangeDay: (day: number) => void
  onShowInstall: () => void
  onReturnToStandard: () => void
  weeklyVerses: Verse[]
  weekNum: number
  locked: boolean
}

export default function TodayTab({
  curDay, todayNum, startDate, completions, nutritionApproach,
  onToggle, onChangeDay, onShowInstall, onReturnToStandard, weeklyVerses, weekNum, locked
}: Props) {
  const dayCompletions = completions[curDay] || {}
  const done = COMMITMENTS.filter(c => dayCompletions[c.id]).length
  const pct = Math.round((done / COMMITMENTS.length) * 100)
  // locked wins over the day comparison. A start date in the future still
  // calculates as Day 1, so the comparison alone is not enough.
  const isFuture = locked || curDay > todayNum
  const currentVerse = weeklyVerses[weekNum - 1]

  function getNourishDesc() {
    if (nutritionApproach && APPROACH_NAMES[nutritionApproach]) {
      const name = APPROACH_NAMES[nutritionApproach]
      return `${name.charAt(0).toUpperCase() + name.slice(1)}, honoring the temple God entrusted to me.`
    }
    return 'Every meal is an act of stewardship. Choose with intention.'
  }

  return (
    <div id="tab-today">
      <div className="install-row" id="install-row">
        <div className="install-row-icon">📲</div>
        <div className="install-row-text">
          <strong>Add to Home Screen</strong>
          <span>Use like a native app. No App Store needed.</span>
        </div>
        <button type="button" className="install-row-btn" onClick={onShowInstall}>How →</button>
      </div>

      {currentVerse && (
        <div className="verse-banner visible">
          <div className="verse-banner-text">{currentVerse.verse}</div>
          <div style={{ fontSize: 12, color: 'var(--red)', marginTop: 5, letterSpacing: '0.06em' }}>{currentVerse.ref}</div>
        </div>
      )}

      <div className="day-nav">
        <button className="nav-btn" onClick={() => onChangeDay(Math.max(1, curDay - 1))}>‹</button>
        <div className="day-center">
          <div className="day-number">Day <span>{curDay}</span></div>
          <div className="day-date">{formatDate(startDate, curDay)}</div>
        </div>
        <button className="nav-btn" onClick={() => onChangeDay(Math.min(PROGRAM_DAYS, curDay + 1))}>›</button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div className="prog-bar-wrap">
          <div className="prog" style={{ width: `${pct}%` }} />
        </div>
        <div className="prog-label" id="prog-label">
          {isFuture
            ? <span style={{ color: 'var(--gray)', fontSize: 13, letterSpacing: '0.06em' }}>This day has not begun yet.</span>
            : <><strong>{done} of {COMMITMENTS.length}</strong> commitments today</>
          }
        </div>
      </div>

      <div className="commitments">
        {COMMITMENTS.map(c => {
          const isDone = !!dayCompletions[c.id]
          return (
            <div
              key={c.id}
              className={`commitment ${isDone ? 'done' : ''} ${isFuture ? 'future-day' : ''}`}
              onClick={() => !isFuture && onToggle(curDay, c.id)}
            >
              <div className="check">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <div className="commit-title">{c.title}</div>
                <div className="commit-desc">{c.id === 'nourish' ? getNourishDesc() : c.desc}</div>
              </div>
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
