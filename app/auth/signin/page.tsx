'use client'
import { useEffect, useState } from 'react'
import { createClient } from '../../../lib/supabase'
import type { EmailOtpType } from '@supabase/supabase-js'

export default function SignInPage() {
  const [tokenHash, setTokenHash] = useState<string | null>(null)
  const [otpType, setOtpType] = useState<EmailOtpType>('email')
  const [state, setState] = useState<'ready' | 'working' | 'error'>('ready')
  const [message, setMessage] = useState('')

  // Read the code from the address bar in the browser. Nothing is verified
  // until the person taps the button, so a mail scanner that loads this page
  // spends nothing.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const hash = params.get('token_hash')
    const type = (params.get('type') || 'email') as EmailOtpType
    if (hash) {
      setTokenHash(hash)
      setOtpType(type)
    } else {
      setState('error')
      setMessage('This link is missing its sign-in code. Please request a new one.')
    }
  }, [])

  async function handleSignIn() {
    if (!tokenHash) return
    setState('working')
    setMessage('')
    const supabase = createClient()
    const { error } = await supabase.auth.verifyOtp({ type: otpType, token_hash: tokenHash })
    if (error) {
      setState('error')
      setMessage('This link has already been used or has expired. Please request a new one.')
    } else {
      window.location.replace('/')
    }
  }

  return (
    <div className="si-screen">
      <div className="si-inner">
        <img src="/logo.png" alt="40 Elevated" className="si-logo" />

        {state !== 'error' ? (
          <>
            <div className="si-title">Welcome back.</div>
            <div className="si-sub">Tap below to finish signing in.</div>
            <button
              type="button"
              className="si-btn"
              onClick={handleSignIn}
              disabled={state === 'working' || !tokenHash}
            >
              {state === 'working' ? 'Signing you in...' : 'Continue to 40 Elevated'}
            </button>
          </>
        ) : (
          <>
            <div className="si-title">Link expired.</div>
            <div className="si-sub">{message}</div>
            <a className="si-btn" href="/">Request a new link</a>
          </>
        )}

        <div className="si-footer">CTC Cabo, 40 Elevated</div>
      </div>

      <style>{`
        .si-screen { min-height: 100vh; background: #0a0a0a; display: flex; align-items: center; justify-content: center; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
        .si-inner { width: 100%; max-width: 340px; text-align: center; }
        .si-logo { width: 190px; height: auto; display: block; margin: 0 auto 44px; }
        .si-title { font-size: 30px; font-weight: 300; color: #ffffff; margin-bottom: 12px; }
        .si-sub { font-size: 15px; color: #888; line-height: 1.65; margin-bottom: 32px; }
        .si-btn { display: block; width: 100%; padding: 16px; background: #c41e1e; color: #ffffff; border: none; border-radius: 10px; font-size: 15px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; text-decoration: none; box-sizing: border-box; }
        .si-btn:disabled { opacity: 0.6; }
        .si-btn:active { background: #8b1515; }
        .si-footer { margin-top: 36px; font-size: 12px; color: #555; letter-spacing: 0.1em; text-transform: uppercase; }
      `}</style>
    </div>
  )
}
