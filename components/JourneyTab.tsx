'use client'
import { COMMITMENTS, dayNumber, PROGRAM_DAYS } from '../lib/data'

interface Props {
  startDate: Date
  completions: Record<string, Record<string, boolean>>
  todayNum: number
  onSelectDay: (day: number) => void
  onReturnToStandard: () => void
  locked: boolean
}

export default function JourneyTab({ startDate, completions, todayNum, onSelectDay, onReturnToStandard, locked }: Props) {
  // In preview nothing has been reached yet, so treat the current day as 0.
  // Every square then falls into the future state and none is marked today.
  const reached = locked ? 0 : todayNum

  const streak = (() => {
    if (locked) return 0
    let s = 0
    for (let d = reached; d >= 1; d--) {
      const dc = completions[d] || {}
      if (COMMITMENTS.every(c => dc[c.id])) s++
      else break
    }
    return s
  })()

  const daysComplete = locked ? 0 : Array.from({ length: PROGRAM_DAYS }, (_, i) => i + 1).filter(d => {
    const dc = completions[d] || {}
    return COMMITMENTS.every(c => dc[c.id])
  }).length

  return (
    <div id="tab-journey">
      <div className="stats-row">
        <div className="stat">
          <div className="stat-num red">{streak}</div>
          <div className="stat-label">Streak</div>
        </div>
        <div className="stat">
          <div className="stat-num">{daysComplete}</div>
          <div className="stat-label">Complete</div>
        </div>
        <div className="stat">
          <div className="stat-num">{locked ? PROGRAM_DAYS : Math.max(0, PROGRAM_DAYS - todayNum)}</div>
          <div className="stat-label">Remaining</div>
        </div>
      </div>

      <div className="grid" id="grid">
        {Array.from({ length: PROGRAM_DAYS }, (_, i) => i + 1).map(d => {
          const dc = completions[d] || {}
          const allDone = !locked && COMMITMENTS.every(c => dc[c.id])
          const partial = !locked && !allDone && COMMITMENTS.some(c => dc[c.id])
          const future = d > reached
          const isToday = !locked && d === reached
          return (
            <div
              key={d}
              className={`grid-cell ${allDone ? 'done' : ''} ${partial ? 'partial' : ''} ${future ? 'future' : ''} ${isToday ? 'today' : ''}`}
              onClick={() => onSelectDay(d)}
            >
              {d}
            </div>
          )
        })}
      </div>

      <div className="legend">
        <div className="legend-item"><div className="legend-dot done" />Complete</div>
        <div className="legend-item"><div className="legend-dot partial" />Partial</div>
        <div className="legend-item"><div className="legend-dot" />Upcoming</div>
      </div>

      <button type="button" className="back-to-standard" onClick={onReturnToStandard}>
        ← The Standard
      </button>
    </div>
  )
}
