'use client'
import { COMMITMENTS, APPROACH_NAMES, formatDate, PROGRAM_DAYS } from '../lib/data'

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
  weeklyVerses: { week: number; verse: string; ref: string }[]
  weekNum: number
}

export default function TodayTab({
  curDay, todayNum, startDate, completions, nutritionApproach,
  onToggle, onChangeDay, onShowInstall, onReturnToStandard, weeklyVerses, weekNum
}: Props) {
  const dayCompletions = completions[curDay] || {}
  const done = COMMITMENTS.filter(c => dayCompletions[c.id]).length
  const pct = Math.round((done / COMMITMENTS.length) * 100)
  const isFuture = curDay > todayNum
  const currentVerse = weeklyVerses[weekNum - 1]

  function getNourishDesc() {
    if (nutritionApproach && APPROACH_NAMES[nutritionApproach]) {
      const name = APPROACH_NAMES[nutritionApproach]
      return `${name.charAt(0).toUpperCase() + name.slice(1)} — honoring the temple God entrusted to me.`
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
          <div style={{ fontSize: 10, color: 'var(--red)', marginTop: 4, letterSpacing: '0.06em' }}>{currentVerse.ref}</div>
        </div>
      )}

      <div className="day-nav">
        <button className="nav-btn" onClick={() => onChangeDay(Math.max(1, curDay - 1))}>‹</button>
        <div className="week-header">
          <div className="week-number">Day <span>{curDay}</span></div>
          <div className="week-range">{formatDate(startDate, curDay)}</div>
        </div>
        <button className="nav-btn" onClick={() => onChangeDay(Math.min(PROGRAM_DAYS, curDay + 1))}>›</button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div className="prog-bar-wrap">
          <div className="prog" style={{ width: `${pct}%` }} />
        </div>
        <div className="prog-label" id="prog-label">
          {isFuture
            ? <span style={{ color: 'var(--gray)', fontSize: 11, letterSpacing: '0.06em' }}>This day has not begun yet.</span>
            : <><strong>{done} of {COMMITMENTS.length}</strong> commitments today</>
          }
        </div>
      </div>

      <div className="commitments" id="commitments-list">
        {COMMITMENTS.map(c => {
          const checked = !!dayCompletions[c.id]
          const desc = c.id === 'nutrition' ? getNourishDesc() : c.desc
          return (
            <div
              key={c.id}
              className={`commitment ${checked ? 'done' : ''} ${isFuture ? 'future-day' : ''}`}
              onClick={() => !isFuture && onToggle(curDay, c.id)}
            >
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
          )
        })}
      </div>

      <button className="reset-btn" onClick={() => {
        if (confirm('Reset today\'s commitments?')) {
          COMMITMENTS.forEach(c => {
            if (dayCompletions[c.id]) onToggle(curDay, c.id)
          })
        }
      }}>reset today</button>

      <button type="button" className="back-to-standard" onClick={onReturnToStandard}>
        ← The Standard
      </button>
    </div>
  )
}
