'use client'
import { PROMISE_TEXT } from '../lib/data'

export default function PromiseTab({ onReturnToStandard }: { onReturnToStandard: () => void }) {
  const lines = PROMISE_TEXT.split('\n')

  return (
    <div id="tab-promise">
      <div className="promise-card">
        <div className="promise-eyebrow">The Standard Promise</div>
        <div className="promise-text">
          {lines.map((line, i) => {
            if (line === '') return <br key={i} />
            if (line.includes('THIS IS THE STANDARD')) {
              return (
                <span key={i}>
                  <br />
                  <span className="amen">{line}</span>
                </span>
              )
            }
            return (
              <span key={i}>
                {line}
                <br />
              </span>
            )
          })}
        </div>

        <div className="promise-seal-rule" />
        <img src="/the-standard.png" alt="The Standard" className="promise-seal" />
      </div>

      <button type="button" className="back-to-standard" onClick={onReturnToStandard}>
        ← The Standard
      </button>

      <style>{`
        .promise-seal-rule { width: 44px; height: 0.5px; background: rgba(196,30,30,0.4); margin: 30px auto 22px; }
        .promise-seal { display: block; width: 170px; height: auto; margin: 0 auto; }
      `}</style>
    </div>
  )
}
