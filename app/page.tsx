'use client'
import { useEffect, useState } from 'react'
import { createClient } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'
import AuthScreen from '../components/AuthScreen'
import App from '../components/App'

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser()
      .then(({ data: { user }, error }) => {
        if (error) {
          // Session is stale, expired, or points to a user that no longer
          // exists. Clear it out and treat this as a normal logged-out state
          // rather than letting the error crash the app.
          supabase.auth.signOut().catch(() => {})
          setUser(null)
        } else {
          setUser(user)
        }
        setLoading(false)
      })
      .catch(() => {
        // Network hiccup or an auth error that threw instead of resolving.
        // Same treatment: fall back to logged-out, never crash.
        supabase.auth.signOut().catch(() => {})
        setUser(null)
        setLoading(false)
      })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0a0a0a' }}>
        <div style={{ width: 24, height: 24, border: '2px solid rgba(255,255,255,0.08)', borderTopColor: '#c41e1e', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      </div>
    )
  }

  if (!user) return <AuthScreen />
  return <App user={user} />
}
