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
        <button type="button" className="install-safari-btn" onClick={() => window.open(APP_URL, '_blank')}>Open in Safari First →</button>
        <div className="install-copy-row">
          <div className="install-copy-url">40elevated.com</div>
          <button type="button" className={`install-copy-btn ${copied ? 'copied' : ''}`} onClick={copyLink}>
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
        <div className="install-platform-label">iPhone, Safari</div>
        <div className="install-step"><div className="install-step-num">1</div><div className="install-step-text">Tap <strong>Open in Safari</strong> above, or paste the copied link into Safari</div></div>
        <div className="install-step"><div className="install-step-num">2</div><div className="install-step-text">Tap the <strong>Share icon</strong> 📤 at the bottom of the screen</div></div>
        <div className="install-step"><div className="install-step-num">3</div><div className="install-step-text">Scroll down and tap <strong>Add to Home Screen</strong></div></div>
        <div className="install-step"><div className="install-step-num">4</div><div className="install-step-text">Tap <strong>Add</strong> in the top right corner</div></div>
        <hr className="install-divider" />
        <div className="install-platform-label">Android, Chrome</div>
        <div className="install-step"><div className="install-step-num">1</div><div className="install-step-text">Tap the <strong>three-dot menu</strong> in Chrome</div></div>
        <div className="install-step"><div className="install-step-num">2</div><div className="install-step-text">Tap <strong>Add to Home Screen</strong> and confirm</div></div>
      </div>
    </div>
  )
}
