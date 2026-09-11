'use client'
import { useState } from 'react'
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
  const [showFirst40, setShowFirst40] = useState(false)

  // In preview nothing has been reached yet, so treat the current day as 0.
  // Every square then falls into the future state and none is marked today.
  const reached = locked ? 0 : todayNum

  const isDayDone = (d: number) => {
    const dc = completions[d] || {}
    return COMMITMENTS.every(c => dc[c.id])
  }

  // The Standard counts a day when they showed up and did even one thing.
  const isDayCounted = (d: number) => {
    const dc = completions[d] || {}
    return COMMITMENTS.some(c => dc[c.id])
  }

  // ─────────────────────────────────────────────────────────────
  // THE STANDARD VIEW: streak first, growing grid, the first 40
  // ─────────────────────────────────────────────────────────────
  const standardMode = !locked && todayNum > PROGRAM_DAYS

  if (standardMode) {
    // Streaks belong to The Standard: they begin at Day 41. The first 40
    // days are a completed season, honored in The First 40 below, not
    // carried into these numbers.
    const streak = (() => {
      let s = 0
      for (let d = reached; d >= PROGRAM_DAYS + 1; d--) {
        if (isDayCounted(d)) s++
        else if (d === reached) continue
        else break
      }
      return s
    })()

    const daysWalked = Array.from({ length: todayNum - PROGRAM_DAYS }, (_, i) => PROGRAM_DAYS + i + 1).filter(isDayCounted).length

    const bestStreak = (() => {
      let best = 0
      let run = 0
      for (let d = PROGRAM_DAYS + 1; d <= todayNum; d++) {
        if (isDayCounted(d)) { run++; if (run > best) best = run }
        else run = 0
      }
      return best
    })()

    const thisWeek = Math.max(1, Math.ceil(todayNum / 7))
    const weekFirst = (thisWeek - 1) * 7 + 1
    const thisWeekCount = Array.from({ length: 7 }, (_, i) => weekFirst + i)
      .filter(d => d > PROGRAM_DAYS && d <= todayNum && isDayCounted(d)).length

    let gridEnd = PROGRAM_DAYS + Math.ceil((todayNum - PROGRAM_DAYS) / 7) * 7
    if (gridEnd === todayNum) gridEnd += 7
    const standardDays = Array.from({ length: gridEnd - PROGRAM_DAYS }, (_, i) => PROGRAM_DAYS + i + 1)

    const startLabel = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    const day40 = new Date(startDate)
    day40.setDate(day40.getDate() + PROGRAM_DAYS - 1)
    const day40Label = day40.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    const first40Complete = Array.from({ length: PROGRAM_DAYS }, (_, i) => i + 1).filter(isDayDone).length

    return (
      <div id="tab-journey">
        <div className="jn-streak-hero">
          <div className="jn-streak-num">{streak}</div>
          <div className="jn-streak-caption">{streak === 1 ? 'Day' : 'Days'} in a row</div>
        </div>

        <div className="stats-row">
          <div className="stat">
            <div className="stat-num">{bestStreak}</div>
            <div className="stat-label">Best streak</div>
          </div>
          <div className="stat">
            <div className="stat-num">{daysWalked}</div>
            <div className="stat-label">Days walked</div>
          </div>
          <div className="stat">
            <div className="stat-num">{thisWeekCount}</div>
            <div className="stat-label">This week</div>
          </div>
        </div>

        <div className="section-label">The Standard</div>
        <div className="grid" id="grid">
          {standardDays.map(d => {
            const dc = completions[d] || {}
            const allDone = COMMITMENTS.every(c => dc[c.id])
            const partial = !allDone && COMMITMENTS.some(c => dc[c.id])
            const future = d > reached
            const isToday = d === reached
            return (
              <div
                key={d}
                className={`grid-cell ${allDone ? 'done' : ''} ${partial ? 'partial' : ''} ${future ? 'future' : ''} ${isToday ? 'today' : ''}`}
                onClick={() => !future && onSelectDay(d)}
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

        <div className="section-label">The First 40</div>
        <div className="jn-first40" onClick={() => setShowFirst40(v => !v)}>
          <div>
            <div className="jn-first40-title">40 Elevated</div>
            <div className="jn-first40-sub">{first40Complete >= PROGRAM_DAYS ? 'Complete · ' : ''}{startLabel} to {day40Label} · Tap to {showFirst40 ? 'hide' : 'see'} your 40-day grid</div>
          </div>
          <div className="jn-first40-badge">{first40Complete}/{PROGRAM_DAYS}</div>
        </div>
        {showFirst40 && (
          <div className="grid jn-first40-grid">
            {Array.from({ length: PROGRAM_DAYS }, (_, i) => i + 1).map(d => {
              const dc = completions[d] || {}
              const allDone = COMMITMENTS.every(c => dc[c.id])
              const partial = !allDone && COMMITMENTS.some(c => dc[c.id])
              return (
                <div
                  key={d}
                  className={`grid-cell ${allDone ? 'done' : ''} ${partial ? 'partial' : ''}`}
                  onClick={() => onSelectDay(d)}
                >
                  {d}
                </div>
              )
            })}
          </div>
        )}

        <button type="button" className="back-to-standard" onClick={onReturnToStandard}>
          ← The Standard
        </button>

        <style>{`
          .jn-streak-hero { text-align: center; margin: 4px 0 16px; }
          .jn-streak-num { font-size: 64px; font-weight: 800; color: #e02020; line-height: 1; letter-spacing: -0.03em; }
          .jn-streak-caption { font-size: 13px; color: #888; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 4px; }
          .jn-first40 { background: #141414; border: 0.5px solid rgba(196,30,30,0.4); border-radius: 13px; padding: 15px 16px; display: flex; align-items: center; justify-content: space-between; gap: 12px; cursor: pointer; }
          .jn-first40-title { font-size: 15px; font-weight: 600; color: #f5f0ed; margin-bottom: 2px; }
          .jn-first40-sub { font-size: 12.5px; color: #888; }
          .jn-first40-badge { font-size: 22px; font-weight: 800; color: #e02020; white-space: nowrap; }
          .jn-first40-grid { margin-top: 10px; }
        `}</style>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────
  // THE 40-DAY VIEW: unchanged from the live app
  // ─────────────────────────────────────────────────────────────
  const daysComplete = locked ? 0 : Array.from({ length: PROGRAM_DAYS }, (_, i) => i + 1).filter(d => {
    const dc = completions[d] || {}
    return COMMITMENTS.every(c => dc[c.id])
  }).length

  const classicStreak = (() => {
    if (locked) return 0
    let s = 0
    for (let d = reached; d >= 1; d--) {
      const dc = completions[d] || {}
      if (COMMITMENTS.every(c => dc[c.id])) s++
      else break
    }
    return s
  })()

  return (
    <div id="tab-journey">
      <div className="stats-row">
        <div className="stat">
          <div className="stat-num red">{classicStreak}</div>
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
