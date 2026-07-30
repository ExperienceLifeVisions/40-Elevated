'use client'
import { useState } from 'react'

interface Props {
  onBegin: (name: string) => void
  onClose: () => void
  onShowNourish: () => void
  hasStarted: boolean
  savedName: string | null
  beforeLaunch: boolean
  launchLabel: string
}

export default function StandardScreen({ onBegin, onClose, onShowNourish, hasStarted, savedName, beforeLaunch, launchLabel }: Props) {
  const [name, setName] = useState(savedName || '')
  const needsName = !savedName

  function handlePrimary() {
    // Before the launch date, tapping through saves the name but does NOT
    // start the counter. The participant lands in preview mode instead.
    if (beforeLaunch) {
      if (needsName && name.trim()) onBegin(name.trim())
      else onClose()
      return
    }
    if (hasStarted) {
      if (needsName && name.trim()) onBegin(name.trim())
      else onClose()
    } else {
      onBegin(name.trim())
    }
  }

  const primaryLabel = beforeLaunch
    ? 'Look Around'
    : hasStarted ? 'Return to Your Walk' : 'Begin Your Journey'

  return (
    <div className="standard-screen" id="standard-screen">
      <div className="standard-inner">
        <img src="/logo.png" alt="40 Elevated" className="standard-logo" />

        <div className="standard-verse">
          "Come near to God and He will come near to you."
          <span>James 4:8</span>
        </div>

        <div className="standard-section-title">The Standard</div>

        <div className="standard-intro">
          This is a declaration that Jesus Christ is worth every sacrifice your flesh resists.
        </div>
        <div className="standard-intro">
          Most people give their best to everything except God. Their discipline goes to their body. Their focus goes to their career. Their mornings go to their phone. 40 Elevated is a deliberate interruption. For 40 days you will redirect your first and your best toward the One who gave you everything.
        </div>

        <div className="standard-purpose">
          <p>This standard exists because a half-committed life produces a half-transformed soul. You were not saved to stay the same.</p>
          <p>You were called to become a disciple. And disciples make disciples.</p>
        </div>

        <div className="standard-section-title">Daily Commitments</div>

        <div className="standard-item">
          <div className="standard-num">1</div>
          <div>
            <div className="standard-item-title">Morning prayer</div>
            <div className="standard-item-desc">Before the phone. Before the noise. Before the world gets a word in. Give Him the first thing, not the leftover.</div>
          </div>
        </div>

        <div className="standard-item">
          <div className="standard-num">2</div>
          <div>
            <div className="standard-item-title">20 minutes in the Word</div>
            <div className="standard-item-desc">You cannot follow a voice you do not recognize. Scripture is how you learn to recognize it.</div>
          </div>
        </div>

        <div className="standard-item">
          <div className="standard-num">3</div>
          <div>
            <div className="standard-item-title">45 minute workout</div>
            <div className="standard-item-desc">Your body is not yours. It is the temple of the Holy Spirit and you are called to steward it with intention and gratitude.</div>
          </div>
        </div>

        <div className="standard-item">
          <div className="standard-num">4</div>
          <div>
            <div className="standard-item-title">Nourish Well</div>
            <div className="standard-item-desc">Every meal is an act of stewardship. How you feed the body God entrusted to you is an act of worship.</div>
            <button type="button" className="nutrition-guide-btn" onClick={onShowNourish}>The Nourish Well Guide →</button>
          </div>
        </div>

        <div className="standard-item">
          <div className="standard-num">5</div>
          <div>
            <div className="standard-item-title">Daily fast</div>
            <div className="standard-item-desc">Fasting is how you silence the noise of the world long enough to hear the voice of God.</div>
          </div>
        </div>

        <div className="standard-item">
          <div className="standard-num">6</div>
          <div>
            <div className="standard-item-title">1 gallon of water</div>
            <div className="standard-item-desc">Discipline in the small things is discipline in all things. Honor the body He entrusted to you.</div>
          </div>
        </div>

        <div className="standard-item">
          <div className="standard-num">7</div>
          <div>
            <div className="standard-item-title">Evening prayer</div>
            <div className="standard-item-desc">End where you began. Give the day back to God. Nothing you carry into tomorrow needs to be carried alone.</div>
          </div>
        </div>

        <div className="standard-item">
          <div className="standard-num">8</div>
          <div>
            <div className="standard-item-title">Daily reflection</div>
            <div className="standard-item-desc">You cannot grow what you refuse to examine. Write it down. God is speaking. Pay attention.</div>
          </div>
        </div>

        <div className="standard-section-title">Weekly Practices</div>

        <div className="standard-item">
          <div className="standard-num" style={{ background: 'none', border: '0.5px solid var(--border-red)', color: 'var(--red)' }}>+</div>
          <div>
            <div className="standard-item-title">Sabbath hour</div>
            <div className="standard-item-desc">Rest is not weakness. It is obedience. God commanded it because He knows what you will not stop to admit.</div>
          </div>
        </div>

        <div className="standard-item">
          <div className="standard-num" style={{ background: 'none', border: '0.5px solid var(--border-red)', color: 'var(--red)' }}>+</div>
          <div>
            <div className="standard-item-title">Scripture memory</div>
            <div className="standard-item-desc">When the Word lives in you, the enemy cannot take it from you.</div>
          </div>
        </div>

        <div className="standard-item">
          <div className="standard-num" style={{ background: 'none', border: '0.5px solid var(--border-red)', color: 'var(--red)' }}>+</div>
          <div>
            <div className="standard-item-title">Act of service</div>
            <div className="standard-item-desc">Faith without works is dead. Go prove yours alive.</div>
          </div>
        </div>

        {needsName && (
          <div className="standard-name-block">
            <label className="standard-name-label" htmlFor="participant-name">What should we call you?</label>
            <input
              id="participant-name"
              className="standard-name-input"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              autoComplete="given-name"
              maxLength={60}
            />
          </div>
        )}

        {beforeLaunch && !hasStarted && (
          <div className="standard-launch-note">
            Your walk begins {launchLabel}. Look around until then.
          </div>
        )}

        <button className="standard-begin" onClick={handlePrimary}>
          {primaryLabel}
        </button>
        <button className="standard-revisit" onClick={hasStarted || beforeLaunch ? onClose : handlePrimary}>
          I have already read this
        </button>
      </div>

      <style>{`
        .standard-name-block { margin: 28px 0 4px; }
        .standard-name-label { display: block; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; color: #888; margin-bottom: 10px; }
        .standard-name-input { width: 100%; background: #141414; border: 0.5px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 14px 16px; font-size: 17px; color: #ffffff; outline: none; box-sizing: border-box; font-family: inherit; }
        .standard-name-input:focus { border-color: rgba(196,30,30,0.4); }
        .standard-launch-note { margin: 24px 0 14px; padding: 14px 16px; border: 0.5px solid rgba(196,30,30,0.35); background: rgba(196,30,30,0.06); border-radius: 10px; text-align: center; font-size: 14px; color: #f5f0ed; line-height: 1.6; }
      `}</style>
    </div>
  )
}
