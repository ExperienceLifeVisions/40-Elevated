'use client'
import { useState } from 'react'
import { createClient } from '../../lib/supabase'

export default function CodePage() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  async function sendCode(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithOtp({ email: email.trim() })
    if (error) { setError(error.message); setLoading(false) }
    else { setSent(true); setLoading(false) }
  }

  async function submitCode(e: React.FormEvent) {
    e.preventDefault()
    const token = code.replace(/\D/g, '')
    if (token.length < 6) { setError('Enter all 6 digits.'); return }
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.verifyOtp({ email: email.trim(), token, type: 'email' })
    if (error) {
      setError('That code did not work. Check the newest email, or send a new code.')
      setLoading(false)
    } else {
      window.location.replace('/')
    }
  }

  return (
    <div className="cp-screen">
      <div className="cp-inner">
        <img src="/logo.png" alt="40 Elevated" className="cp-logo" />

        {!sent ? (
          <>
            <div className="cp-title">Add it first.</div>
            <div className="cp-sub">Save this to your home screen before you sign in, so you only have to do it once.</div>

            <div className="cp-find-row">
              <div className="cp-find-card">
                <div className="cp-find-ic">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
                  </svg>
                </div>
                <div className="cp-find-lb">Tap this icon</div>
              </div>
              <div className="cp-find-card">
                <div className="cp-find-ic">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="19" r="2" />
                  </svg>
                </div>
                <div className="cp-find-lb">Or this menu,<br />then tap Share</div>
              </div>
            </div>
            <div className="cp-hint">Look along the top or bottom edge of your screen, then tap <strong>Add to Home Screen</strong>.</div>

            <div className="cp-divider">
              <div className="cp-sub" style={{ marginBottom: 14 }}>Already added it? Open the new icon and sign in there.</div>
              <form onSubmit={sendCode} className="cp-form">
                <input
                  type="email"
                  className="cp-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
                {error && <div className="cp-error">{error}</div>}
                <button type="submit" className="cp-btn" disabled={loading}>
                  {loading ? 'Sending...' : 'Send my code'}
                </button>
              </form>
            </div>
          </>
        ) : (
          <>
            <div className="cp-title">Enter your code.</div>
            <div className="cp-sub">Find the 6 digit code in the email we just sent to <strong>{email}</strong>. Do not tap the button, just read the digits.</div>
            <form onSubmit={submitCode} className="cp-form">
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                className="cp-code"
                placeholder="000000"
                value={code}
                onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
              />
              {error && <div className="cp-error">{error}</div>}
              <button type="submit" className="cp-btn" disabled={loading}>
                {loading ? 'Opening...' : 'Open 40 Elevated'}
              </button>
            </form>
            <button type="button" className="cp-again" onClick={() => { setSent(false); setCode(''); setError('') }}>
              Send a new code
            </button>
          </>
        )}
      </div>

      <style>{`
        .cp-screen { min-height: 100vh; background: #0a0a0a; display: flex; align-items: center; justify-content: center; padding: 24px; padding-top: calc(env(safe-area-inset-top, 0px) + 24px); font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
        .cp-inner { width: 100%; max-width: 340px; text-align: center; }
        .cp-logo { width: 170px; height: auto; display: block; margin: 0 auto 30px; }
        .cp-title { font-size: 30px; font-weight: 300; color: #ffffff; margin-bottom: 12px; }
        .cp-sub { font-size: 15px; color: #888; line-height: 1.65; }
        .cp-sub strong { color: #f5f0ed; font-weight: 600; }
        .cp-find-row { display: flex; gap: 10px; margin: 20px 0 4px; }
        .cp-find-card { flex: 1; border: 0.5px solid rgba(255,255,255,0.1); background: #141414; border-radius: 12px; padding: 18px 12px; text-align: center; }
        .cp-find-ic { color: #e33; margin-bottom: 10px; display: flex; justify-content: center; }
        .cp-find-lb { font-size: 14px; color: #f5f0ed; font-weight: 600; line-height: 1.35; }
        .cp-hint { font-size: 13px; color: #888; margin-top: 12px; line-height: 1.55; }
        .cp-hint strong { color: #f5f0ed; }
        .cp-divider { border-top: 0.5px solid rgba(255,255,255,0.1); margin-top: 26px; padding-top: 22px; }
        .cp-form { display: flex; flex-direction: column; gap: 12px; }
        .cp-input { width: 100%; background: #141414; border: 0.5px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 14px 16px; font-size: 17px; color: #ffffff; outline: none; box-sizing: border-box; }
        .cp-input:focus { border-color: rgba(196,30,30,0.4); }
        .cp-code { width: 100%; background: #141414; border: 0.5px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 16px; font-size: 28px; letter-spacing: 0.3em; text-align: center; color: #ffffff; outline: none; box-sizing: border-box; font-family: ui-monospace, Menlo, monospace; }
        .cp-code:focus { border-color: rgba(196,30,30,0.4); }
        .cp-code::placeholder { color: #3a3a3a; }
        .cp-btn { width: 100%; padding: 16px; background: #c41e1e; color: #ffffff; border: none; border-radius: 10px; font-size: 15px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; }
        .cp-btn:disabled { opacity: 0.6; }
        .cp-btn:active { background: #8b1515; }
        .cp-error { font-size: 14px; color: #e33; line-height: 1.5; }
        .cp-again { background: none; border: none; color: #888; font-size: 14px; margin-top: 20px; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; }
      `}</style>
    </div>
  )
}
