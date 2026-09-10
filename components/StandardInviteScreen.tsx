'use client'
import { useState } from 'react'

interface Props {
  onEnter: () => Promise<void>
}

export default function StandardInviteScreen({ onEnter }: Props) {
  const [entering, setEntering] = useState(false)

  async function handleEnter() {
    if (entering) return
    setEntering(true)
    try {
      await onEnter()
    } finally {
      setEntering(false)
    }
  }

  return (
    <div className="si-screen" id="standard-invite-screen">
      <div className="si-inner">
        <img src="/the-standard.png" alt="The Standard" className="si-logo" />
        <div className="si-title">The 40 days were never the finish line.</div>
        <div className="si-body">
          They were the training ground. Over these 40 days you built a daily walk with
          Christ. You saw Him move. You were changed.{' '}
          <strong>That walk does not end today. It becomes the standard for your life.</strong>
        </div>
        <div className="si-divider" />
        <div className="si-verse">&ldquo;As you therefore have received Christ Jesus the Lord, so walk in Him.&rdquo;</div>
        <div className="si-ref">Colossians 2:6 (NKJV)</div>
        <button type="button" className="si-btn" onClick={handleEnter} disabled={entering}>
          {entering ? 'One moment...' : 'Enter The Standard'}
        </button>
        <div className="si-note">
          Same daily commitments. Same weekly practices. No finish line.
          Your 40-day journey stays saved in your Journey tab.
        </div>
      </div>
      <style>{`
        .si-screen { position: fixed; inset: 0; background: #0a0a0a; display: flex; align-items: center; justify-content: center; z-index: 300; overflow-y: auto; }
        .si-inner { padding: 44px 30px; max-width: 420px; width: 100%; text-align: center; }
        .si-logo { width: 230px; height: auto; display: block; margin: 0 auto 22px; }
        .si-title { font-size: 27px; font-weight: 800; color: #ffffff; margin-bottom: 16px; letter-spacing: -0.01em; line-height: 1.2; }
        .si-body { font-size: 14.5px; color: #888; line-height: 1.85; margin-bottom: 24px; }
        .si-body strong { color: #f5f0ed; font-weight: 600; }
        .si-divider { width: 40px; height: 0.5px; background: rgba(196,30,30,0.4); margin: 0 auto 20px; }
        .si-verse { font-size: 16px; font-style: italic; color: #f5f0ed; line-height: 1.65; margin-bottom: 8px; }
        .si-ref { font-size: 12px; color: #c41e1e; letter-spacing: 0.08em; margin-bottom: 30px; }
        .si-btn { width: 100%; padding: 16px; background: #c41e1e; color: #ffffff; border: none; border-radius: 12px; font-size: 16px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; margin-bottom: 14px; }
        .si-btn:active { background: #8b1515; }
        .si-btn:disabled { opacity: 0.6; }
        .si-note { font-size: 12.5px; color: #555; line-height: 1.6; }
      `}</style>
    </div>
  )
}
