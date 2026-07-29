'use client'
import { PROGRAM_DAYS } from '../lib/data'

interface Props {
  day: number
  onClose: () => void
}

export default function DayCompleteScreen({ day, onClose }: Props) {
  return (
    <div className="day-complete-screen open" id="day-complete-screen">
      <div className="day-complete-inner">
        <div className="day-complete-eyebrow">Day {day} of {PROGRAM_DAYS}</div>
        <div className="day-complete-title">Complete.</div>
        <div className="day-complete-sub">He saw every rep, every prayer,<br />every choice you made today.</div>
        <div className="day-complete-divider" />
        <div className="day-complete-verse">&ldquo;Well done, good and faithful servant.&rdquo;</div>
        <div className="day-complete-ref">Matthew 25:23</div>
        <button type="button" className="day-complete-btn" onClick={onClose}>
          {day >= PROGRAM_DAYS ? 'Glory to God.' : 'See you tomorrow.'}
        </button>
      </div>
    </div>
  )
}
