'use client'
import { useState } from 'react'
import { createClient } from '../lib/supabase'

export default function AuthScreen() {
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
    if (token.length < 6) { setError('Enter the whole code from your email.'); return }
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
    <div className="auth-screen">
      <div className="auth-inner">
        <div className="auth-logo-wrap">
          <img src="/logo.png" alt="40 Elevated" style={{ width: 200, height: 'auto', display: 'block', margin: '0 auto' }} />
        </div>

        {!sent ? (
          <>
            <div className="auth-title">Begin your walk.</div>
            <div className="auth-sub">Enter your email and we will send you a code. No password needed.</div>
            <form onSubmit={sendCode} className="auth-form">
              <input
                type="email"
                className="auth-input"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              {error && <div className="auth-error">{error}</div>}
              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? 'Sending...' : 'Send my code'}
              </button>
            </form>
            <div className="auth-footer">CTC Cabo, 40 Elevated</div>
          </>
        ) : (
          <>
            <div className="auth-title">Enter your code.</div>
            <div className="auth-sub">We sent a code to <strong>{email}</strong>. Read it and type it below.</div>
            <form onSubmit={submitCode} className="auth-form">
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                className="auth-code"
                placeholder="Your code"
                value={code}
                onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 10))}
                maxLength={10}
              />
              {error && <div className="auth-error">{error}</div>}
              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? 'Opening...' : 'Open 40 Elevated'}
              </button>
            </form>

            <div className="spam-note">
              <div className="spam-note-h">Check your <em>SPAM</em> folder</div>
              <p>If it is there, tap <strong>Not Spam</strong> so the next one reaches your inbox.</p>
            </div>

            <button className="auth-btn-outline" onClick={() => { setSent(false); setCode(''); setError('') }}>
              Send a new code
            </button>
          </>
        )}
      </div>

      <style>{`
        .auth-screen { min-height: 100vh; background: #0a0a0a; display: flex; align-items: center; justify-content: center; padding: 24px; padding-top: calc(env(safe-area-inset-top, 0px) + 24px); font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
        .auth-inner { width: 100%; max-width: 360px; text-align: center; }
        .auth-logo-wrap { margin-bottom: 44px; }
        .auth-title { font-size: 30px; font-weight: 300; color: #ffffff; margin-bottom: 12px; }
        .auth-sub { font-size: 15px; color: #888; line-height: 1.65; margin-bottom: 32px; }
        .auth-sub strong { color: #f5f0ed; font-weight: 600; }
        .auth-form { display: flex; flex-direction: column; gap: 12px; }
        .auth-input { width: 100%; background: #141414; border: 0.5px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 14px 16px; font-size: 17px; color: #ffffff; outline: none; box-sizing: border-box; }
        .auth-input:focus { border-color: rgba(196,30,30,0.4); }
        .auth-code { width: 100%; background: #141414; border: 0.5px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 16px; font-size: 26px; letter-spacing: 0.24em; text-align: center; color: #ffffff; outline: none; box-sizing: border-box; font-family: ui-monospace, Menlo, monospace; }
        .auth-code:focus { border-color: rgba(196,30,30,0.4); }
        .auth-code::placeholder { color: #3a3a3a; font-size: 17px; letter-spacing: 0.06em; font-family: -apple-system, sans-serif; }
        .auth-error { font-size: 14px; color: #e33; text-align: left; padding: 0 4px; line-height: 1.5; }
        .auth-btn { width: 100%; padding: 15px; background: #c41e1e; color: #ffffff; border: none; border-radius: 10px; font-size: 15px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; }
        .auth-btn:disabled { opacity: 0.6; }
        .auth-btn:active { background: #8b1515; }
        .auth-footer { margin-top: 32px; font-size: 12px; color: #555; letter-spacing: 0.1em; text-transform: uppercase; }
        .auth-btn-outline { padding: 12px 24px; background: none; border: 0.5px solid rgba(255,255,255,0.08); border-radius: 10px; color: #888; font-size: 14px; cursor: pointer; margin-top: 20px; }
        .spam-note { width: 100%; border: 1px solid rgba(196,30,30,0.5); background: rgba(196,30,30,0.09); border-radius: 12px; padding: 18px; text-align: center; box-sizing: border-box; margin-top: 26px; }
        .spam-note-h { font-size: 20px; font-weight: 800; color: #ffffff; margin-bottom: 10px; letter-spacing: -0.01em; }
        .spam-note-h em { font-style: normal; color: #e33; }
        .spam-note p { font-size: 15px; color: #bbb; line-height: 1.6; margin: 0; }
        .spam-note strong { color: #ffffff; font-weight: 700; }
      `}</style>
    </div>
  )
}
