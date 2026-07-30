'use client'
import { useState } from 'react'

const APP_URL = 'https://40elevated.com'
const CODE_URL = 'https://40elevated.com/code'

export default function InstallScreen({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false)
  const [trouble, setTrouble] = useState(false)

  function copy(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (trouble) {
    return (
      <div className="install-screen open">
        <button type="button" className="install-screen-back" onClick={() => setTrouble(false)}>← Back</button>
        <div className="install-screen-inner">
          <div className="install-screen-title">Let us fix this.</div>

          <div className="tr-warn">
            <p>Some browsers, including <strong>Chrome on iPhone</strong>, cannot add apps to the home screen. Apple only allows it in <strong>Safari</strong>.</p>
          </div>

          <div className="install-step">
            <div className="install-step-num">1</div>
            <div className="install-step-text">Copy this address</div>
          </div>
          <div className="copy-big">
            <div className="copy-big-url">40elevated.com/code</div>
            <button type="button" className={`install-copy-btn ${copied ? 'copied' : ''}`} onClick={() => copy(CODE_URL)}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div className="install-step">
            <div className="install-step-num">2</div>
            <div className="install-step-text">Open <strong>Safari</strong> yourself and paste it in. Do not tap a link in your email.</div>
          </div>
          <div className="install-step">
            <div className="install-step-num">3</div>
            <div className="install-step-text">Add it to your home screen from there</div>
          </div>
          <div className="install-step">
            <div className="install-step-num">4</div>
            <div className="install-step-text">Open the new icon and sign in with a code. Just once.</div>
          </div>
        </div>

        <style>{`
          .tr-warn { border: 1px solid rgba(196,30,30,0.5); background: rgba(196,30,30,0.09); border-radius: 12px; padding: 16px; margin: 20px 0 24px; }
          .tr-warn p { font-size: 15px; color: #ddd; line-height: 1.6; margin: 0; }
          .tr-warn strong { color: #fff; font-weight: 700; }
          .copy-big { display: flex; align-items: center; gap: 10px; background: #141414; border: 0.5px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 14px 16px; margin: 14px 0 22px; }
          .copy-big-url { flex: 1; font-size: 15px; color: #f5f0ed; font-family: ui-monospace, Menlo, monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        `}</style>
      </div>
    )
  }

  return (
    <div className="install-screen open" id="install-screen">
      <button type="button" className="install-screen-back" onClick={onClose}>← Back</button>
      <div className="install-screen-inner">
        <div className="install-screen-title">Add to your home screen.</div>
        <div className="install-screen-sub">Takes less than 30 seconds. Works like any other app, no App Store needed.</div>

        <div className="install-step">
          <div className="install-step-num">1</div>
          <div className="install-step-text">Find the <strong>share</strong> option. Your phone will have one of these two.</div>
        </div>

        <div className="find-row">
          <div className="find-card">
            <div className="find-ic">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
              </svg>
            </div>
            <div className="find-lb">This icon</div>
          </div>
          <div className="find-card">
            <div className="find-ic">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="5" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="19" r="2" />
              </svg>
            </div>
            <div className="find-lb">Or this menu,<br />then tap Share</div>
          </div>
        </div>
        <div className="find-hint">Look along the top or bottom edge of your screen.</div>

        <div className="install-step" style={{ marginTop: 22 }}>
          <div className="install-step-num">2</div>
          <div className="install-step-text">Scroll the list and tap <strong>Add to Home Screen</strong></div>
        </div>

        <div className="install-step">
          <div className="install-step-num">3</div>
          <div className="install-step-text">Tap <strong>Add</strong> to finish</div>
        </div>

        <button type="button" className="trouble-btn" onClick={() => setTrouble(true)}>Having trouble?</button>
      </div>

      <style>{`
        .find-row { display: flex; gap: 10px; margin: 14px 0 4px; }
        .find-card { flex: 1; border: 0.5px solid rgba(255,255,255,0.1); background: #141414; border-radius: 12px; padding: 18px 12px; text-align: center; }
        .find-ic { color: #e33; margin-bottom: 10px; display: flex; justify-content: center; }
        .find-lb { font-size: 14px; color: #f5f0ed; font-weight: 600; line-height: 1.35; }
        .find-hint { text-align: center; font-size: 13px; color: #888; margin-top: 12px; }
        .trouble-btn { display: block; width: 100%; padding: 17px; background: #ffffff; color: #c41e1e; border: none; border-radius: 10px; font-size: 16px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; margin-top: 30px; }
        .trouble-btn:active { opacity: 0.85; }
      `}</style>
    </div>
  )
}
