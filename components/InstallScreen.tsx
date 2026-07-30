'use client'
import { useState } from 'react'

const APP_URL = 'https://40elevated.com'

export default function InstallScreen({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false)

  function copyLink() {
    navigator.clipboard.writeText(APP_URL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
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

        <div className="install-last-resort">
          Cannot find either one? You are probably viewing this inside an email or social app. Tap its <strong>&#8943;</strong> menu, choose <strong>Open in Safari</strong>, and try again from there.
          <div className="install-copy-row" style={{ marginTop: 16 }}>
            <div className="install-copy-url">40elevated.com</div>
            <button type="button" className={`install-copy-btn ${copied ? 'copied' : ''}`} onClick={copyLink}>
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .find-row { display: flex; gap: 10px; margin: 14px 0 4px; }
        .find-card { flex: 1; border: 0.5px solid rgba(255,255,255,0.1); background: #141414; border-radius: 12px; padding: 18px 12px; text-align: center; }
        .find-ic { color: #e33; margin-bottom: 10px; display: flex; justify-content: center; }
        .find-lb { font-size: 14px; color: #f5f0ed; font-weight: 600; line-height: 1.35; }
        .find-hint { text-align: center; font-size: 13px; color: #888; margin-top: 12px; }
        .install-last-resort { border-top: 0.5px solid rgba(255,255,255,0.08); margin-top: 26px; padding-top: 18px; font-size: 13px; color: #888; line-height: 1.6; }
        .install-last-resort strong { color: #f5f0ed; }
      `}</style>
    </div>
  )
}
