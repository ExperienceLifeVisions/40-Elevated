'use client'
import { COMMITMENTS, dayNumber, PROGRAM_DAYS } from '../lib/data'
interface Props {
  startDate: Date
  completions: Record<string, Record<string, boolean>>
  todayNum: number
  onSelectDay: (day: number) => void
  onReturnToStandard: () => void
}
export default function JourneyTab({ startDate, completions, todayNum, onSelectDay, onReturnToStandard }: Props) {
  const streak = (() => {
    let s = 0
    for (let d = todayNum; d >= 1; d--) {
      const dc = completions[d] || {}
      if (COMMITMENTS.every(c => dc[c.id])) s++
      else break
    }
    return s
  })()
  const daysComplete = Array.from({ length: PROGRAM_DAYS }, (_, i) => i + 1).filter(d => {
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
          <div className="stat-num">{Math.max(0, PROGRAM_DAYS - todayNum)}</div>
          <div className="stat-label">Remaining</div>
        </div>
      </div>
      <div className="grid" id="grid">
        {Array.from({ length: PROGRAM_DAYS }, (_, i) => i + 1).map(d => {
          const dc = completions[d] || {}
          const allDone = COMMITMENTS.every(c => dc[c.id])
          const partial = !allDone && COMMITMENTS.some(c => dc[c.id])
          const future = d > todayNum
          return (
            <div
              key={d}
              className={`grid-cell ${allDone ? 'done' : ''} ${partial ? 'partial' : ''} ${future ? 'future' : ''}`}
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
