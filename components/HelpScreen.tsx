'use client'

const SUPPORT_EMAIL = '40elevated.support@gmail.com'

export default function HelpScreen({ onClose }: { onClose: () => void }) {
  const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('40 Elevated support')}`

  return (
    <div className="help-screen">
      <div className="help-inner">
        <div className="help-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m2 7 10 6 10-6" />
          </svg>
        </div>
        <div className="help-title">Need a hand?</div>
        <div className="help-sub">Questions about the challenge, trouble signing in, or anything else at all. We read every message.</div>
        <a className="help-email-btn" href={mailto}>Email us</a>
        <div className="help-addr">{SUPPORT_EMAIL}</div>
        <button type="button" className="help-back" onClick={onClose}>← Back to the app</button>
      </div>

      <style>{`
        .help-screen { position: fixed; inset: 0; background: #0a0a0a; z-index: 60; overflow-y: auto; display: flex; align-items: center; justify-content: center; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
        .help-inner { width: 100%; max-width: 320px; text-align: center; }
        .help-icon { width: 56px; height: 56px; border-radius: 50%; margin: 0 auto 24px; border: 0.5px solid rgba(196,30,30,0.4); display: flex; align-items: center; justify-content: center; color: #e33; }
        .help-title { font-size: 26px; font-weight: 300; color: #ffffff; margin-bottom: 12px; }
        .help-sub { font-size: 15px; color: #888; line-height: 1.65; margin-bottom: 28px; }
        .help-email-btn { display: block; padding: 15px; background: #c41e1e; color: #ffffff; text-decoration: none; border-radius: 10px; font-size: 15px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 14px; }
        .help-email-btn:active { background: #8b1515; }
        .help-addr { font-size: 14px; color: #888; word-break: break-all; margin-bottom: 30px; }
        .help-back { background: none; border: none; color: #888; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; }
      `}</style>
    </div>
  )
}
