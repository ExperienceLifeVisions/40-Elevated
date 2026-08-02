'use client'
import { useState } from 'react'

const VIDEO_EMBED = 'https://www.loom.com/embed/d8f526d3ef3f4d8eb215af9f425b2bd7'

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
  const [showVideo, setShowVideo] = useState(false)
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

  // "Monday, August 3" -> "August 3", so the button stays short
  const shortDate = launchLabel.split(', ').pop() || launchLabel
  const primaryLabel = beforeLaunch
    ? `Look Around Until ${shortDate}`
    : hasStarted ? 'Return to Your Walk' : 'Begin Your Journey'
  // The declaration is a threshold the first time only. Once someone has
  // given a name they have crossed it, so they get a quick way out.
  const showBack = !needsName

  return (
    <div className="standard-screen" id="standard-screen">
      {showBack && (
        <button type="button" className="standard-screen-back" onClick={onClose}>← Back</button>
      )}
      <div className="standard-inner" style={showBack ? { paddingTop: 'calc(env(safe-area-inset-top, 0px) + 86px)' } : undefined}>
        {beforeLaunch && !hasStarted && (
          <div className="standard-welcome">
            <div className="sw-eyebrow">Welcome</div>
            <div className="sw-date">We begin {launchLabel}</div>
            <div className="sw-note">Read The Standard, then look around the app until then.</div>
          </div>
        )}

        <img src="/logo.png" alt="40 Elevated" className="standard-logo" />

        {/* The image is the button. Nothing loads from Loom until it is tapped. */}
        <button type="button" className="vid-card" onClick={() => setShowVideo(true)} aria-label="Play the welcome video">
          <img src="/video-thumb.jpg" alt="A word from Pastor Denis Armstrong" />
        </button>

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
            <div className="standard-item-desc">A weekly invitation to step away from work, quiet the noise, and turn your attention to Christ. Your worth is not found in what you accomplish, but in the grace of God.</div>
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

        <button className="standard-begin" onClick={handlePrimary}>
          {primaryLabel}
        </button>
      </div>

      {showVideo && (
        <div className="vid-screen" onClick={() => setShowVideo(false)}>
          <div className="vid-frame" onClick={e => e.stopPropagation()}>
            <iframe
              src={VIDEO_EMBED}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="A word from Pastor Denis Armstrong"
            />
          </div>
          <button type="button" className="vid-close" onClick={() => setShowVideo(false)}>Close</button>
        </div>
      )}

      <style>{`
        .standard-name-block { margin: 28px 0 4px; }
        .standard-name-label { display: block; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; color: #888; margin-bottom: 10px; }
        .standard-name-input { width: 100%; background: #141414; border: 0.5px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 14px 16px; font-size: 17px; color: #ffffff; outline: none; box-sizing: border-box; font-family: inherit; }
        .standard-name-input:focus { border-color: rgba(196,30,30,0.4); }
        .standard-begin { font-size: 16px; }
        .standard-screen-back { position: absolute; top: 0; left: 0; right: 0; z-index: 401; display: flex; align-items: center; gap: 8px; min-height: 46px; background: #0a0a0a; border: none; border-bottom: 0.5px solid rgba(255,255,255,0.08); color: #f5f0ed; font-size: 16px; letter-spacing: 0.06em; text-transform: uppercase; text-align: left; cursor: pointer; padding: 12px 18px; padding-top: calc(env(safe-area-inset-top, 0px) + 12px); }
        .standard-screen-back:active { opacity: 0.6; }
        .standard-welcome { border: 0.5px solid rgba(196,30,30,0.4); background: rgba(196,30,30,0.07); border-radius: 12px; margin: 0 0 26px; padding: 16px; text-align: center; }
        .sw-eyebrow { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #e33; margin-bottom: 8px; }
        .sw-date { font-size: 19px; font-weight: 400; color: #ffffff; margin-bottom: 6px; }
        .sw-note { font-size: 13px; color: #999; line-height: 1.55; }
        .vid-card { display: block; width: 100%; padding: 0; border: 0.5px solid rgba(255,255,255,0.1); border-radius: 14px; overflow: hidden; background: #000; margin-bottom: 26px; cursor: pointer; }
        .vid-card img { width: 100%; height: auto; display: block; }
        .vid-card:active { opacity: 0.85; }
        .vid-screen { position: fixed; inset: 0; background: rgba(0,0,0,0.93); z-index: 500; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; }
        .vid-frame { width: 100%; max-width: 380px; aspect-ratio: 16 / 9; background: #000; border-radius: 14px; overflow: hidden; border: 0.5px solid rgba(255,255,255,0.12); }
        .vid-frame iframe { width: 100%; height: 100%; border: 0; display: block; }
        .vid-close { margin-top: 22px; padding: 14px 34px; background: none; border: 0.5px solid rgba(255,255,255,0.2); border-radius: 10px; color: #ccc; font-size: 14px; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; }
      `}</style>
    </div>
  )
}
