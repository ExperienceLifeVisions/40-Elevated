'use client'
interface Props {
  onBegin: () => void
  onShowNourish: () => void
  hasStarted: boolean
}

export default function StandardScreen({ onBegin, onShowNourish, hasStarted }: Props) {
  return (
    <div className="standard-screen" id="standard-screen">
      <div className="standard-inner">
        <img src="/logo.png" alt="75 Elevated" className="standard-logo" />

        <div className="standard-verse">
          "Come near to God and He will come near to you."
          <span>James 4:8</span>
        </div>

        <div className="standard-section-title">The Standard</div>

        <div className="standard-intro">
          This is a declaration that Jesus Christ is worth every sacrifice your flesh resists.
        </div>
        <div className="standard-intro">
          Most people give their best to everything except God. Their discipline goes to their body. Their focus goes to their career. Their mornings go to their phone. 75 Elevated is a deliberate interruption. For 75 days you will redirect your first and your best toward the One who gave you everything.
        </div>

        <div className="standard-purpose">
          <p>This standard exists because a half-committed life produces a half-transformed soul. You were not saved to stay the same.</p>
          <p>You were called to become a disciple. And disciples make disciples.</p>
          <p>75 Elevated: A Walk With Jesus is the training ground. Every morning surrendered, every meal chosen with intention, every fast, every prayer, every rep, every Word read and carried — it is all formation. It is God shaping you from the inside out into someone whose life points others toward Christ.</p>
          <p>The world does not need more people who know about Jesus. It needs more people who look like Him.</p>
          <p>This is how it starts. One day. One commitment. One walk.</p>
        </div>

        <div className="standard-section-title">Daily Commitments</div>

        <div className="standard-item">
          <div className="standard-num">1</div>
          <div>
            <div className="standard-item-title">Morning prayer</div>
            <div className="standard-item-desc">You do not get to give God your leftovers. He gets your first breath, your first thought, your first moment before the world speaks.</div>
          </div>
        </div>

        <div className="standard-item">
          <div className="standard-num">2</div>
          <div>
            <div className="standard-item-title">20 minutes of Scripture</div>
            <div className="standard-item-desc">The Word of God is not optional reading. It is the standard by which every thought, every decision, and every day must be measured.</div>
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

        <button className="standard-begin" onClick={onBegin}>
          {hasStarted ? 'Return to Your Walk' : 'Begin Your Journey'}
        </button>
        <button className="standard-revisit" onClick={onBegin}>
          I have already read this
        </button>
      </div>
    </div>
  )
}
