'use client'
import { PROMISE_TEXT } from '../lib/data'
export default function PromiseTab({ onReturnToStandard }: { onReturnToStandard: () => void }) {
  return (
    <div id="tab-promise">
      <div className="promise-card">
        <div className="promise-eyebrow">The 75 Elevated Promise</div>
        <div className="promise-text">
          {PROMISE_TEXT.split('\n').map((line, i) => (
            <span key={i}>
              {line === '' ? <br /> : line.includes('Amen') ? <><br /><span className="amen">{line}</span></> : line}
              {line !== '' && !line.includes('Amen') && <br />}
            </span>
          ))}
        </div>
      </div>
      <button type="button" className="back-to-standard" onClick={onReturnToStandard}>
        ← The Standard
      </button>
    </div>
  )
}
