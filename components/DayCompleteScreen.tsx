'use client'
import { PROGRAM_DAYS } from '../lib/data'

interface Props {
  day: number
  onClose: () => void
  onBeginStandard?: () => void
}

export default function DayCompleteScreen({ day, onClose, onBeginStandard }: Props) {
  const isFinalDay = day >= PROGRAM_DAYS

  if (isFinalDay) {
    return (
      <div className="day-complete-screen open" id="day-complete-screen">
        <div className="day-complete-inner">
          <img src="/logo.png" alt="40 Elevated" className="dc-logo-40" />
          <div className="day-complete-eyebrow">Day {day} of {PROGRAM_DAYS}</div>
          <div className="day-complete-title dc-title-final">Complete.</div>
          <div className="day-complete-sub dc-sub-final">He saw every rep, every prayer,<br />every choice you made these last 40 days.</div>
          <div className="day-complete-divider" />
          <div className="day-complete-verse">&ldquo;Well done, good and faithful servant.&rdquo;</div>
          <div className="day-complete-ref dc-ref-final">Matthew 25:23</div>
          <div className="dc-more">And this is not the end.</div>
          <img src="/the-standard.png" alt="The Standard" className="dc-logo-standard" />
          <button type="button" className="dc-btn-final" onClick={onBeginStandard ?? onClose}>
            Begin the Daily Walk
          </button>
        </div>
        <style>{`
          .dc-logo-40 { width: 140px; height: auto; display: block; margin: 0 auto 10px; }
          .dc-title-final { font-size: 46px !important; margin-bottom: 12px !important; }
          .dc-sub-final { margin-bottom: 18px !important; }
          .dc-ref-final { margin-bottom: 20px !important; }
          .dc-more { font-size: 14px; color: #f5f0ed; letter-spacing: 0.02em; margin-bottom: 14px; }
          .dc-logo-standard { width: 210px; height: auto; display: block; margin: 0 auto 20px; }
          .dc-btn-final { width: 100%; padding: 16px; background: #c41e1e; border: none; border-radius: 10px; color: #ffffff; font-size: 15px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; }
          .dc-btn-final:active { background: #8b1515; }
        `}</style>
      </div>
    )
  }

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
          See you tomorrow.
        </button>
      </div>
    </div>
  )
}
