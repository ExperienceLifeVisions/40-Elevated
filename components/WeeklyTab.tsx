'use client'
import { WEEKLY_COMMITMENTS, WEEKLY_VERSES, FRUIT_DATA, weekRange } from '../lib/data'

interface Props {
  curWeek: number
  startDate: Date
  weeklyData: Record<number, Record<string, boolean>>
  onToggle: (week: number, id: string) => void
  onChangeWeek: (week: number) => void
  onReturnToStandard: () => void
}

export default function WeeklyTab({ curWeek, startDate, weeklyData, onToggle, onChangeWeek, onReturnToStandard }: Props) {
  const wd = weeklyData[curWeek] || {}
  const fruit = FRUIT_DATA[curWeek - 1]
  const verse = WEEKLY_VERSES[curWeek - 1]

  return (
    <div id="tab-weekly">
      <div className="week-nav">
        <button className="nav-btn" onClick={() => onChangeWeek(Math.max(1, curWeek - 1))}>‹</button>
        <div className="week-header" style={{ marginBottom: 0 }}>
          <div className="week-number">Week <span>{curWeek}</span></div>
          <div className="week-range">{weekRange(startDate, curWeek)}</div>
        </div>
        <button className="nav-btn" onClick={() => onChangeWeek(Math.min(11, curWeek + 1))}>›</button>
      </div>

      {fruit && (
        <div className="fruit-card">
          <div className="fruit-eyebrow">{fruit.eyebrow}</div>
          <div className="fruit-name">{fruit.name}</div>
          <div className="fruit-def">{fruit.def}</div>
          <div className="fruit-divider" />
          <div className="fruit-verse">{fruit.verse}</div>
          <div className="fruit-ref">{fruit.ref}</div>
          {fruit.isList && fruit.fruits && (
            <ul className="fruit-list">
              {fruit.fruits.map((item: string) => {
                const parts = item.split(' — ')
                return (
                  <li key={item}>
                    <div className="fruit-list-name">{parts[0]}</div>
                    {parts[1] && <div className="fruit-list-def">{parts[1]}</div>}
                  </li>
                )
              })}
            </ul>
          )}
          {fruit.isHarvest && fruit.fruits && (
            <>
              <div className="fruit-harvest-grid">
                {fruit.fruits.map((name: string) => (
                  <div key={name} className="fruit-harvest-item">{name}</div>
                ))}
              </div>
              <div className="fruit-reflection">"Look back at who you were on Day 1. The Holy Spirit has been working. What fruit do you see growing in your life?"</div>
            </>
          )}
          {fruit.anchor && (
            <>
              <div className="fruit-anchor-label">Gospel anchor</div>
              <div className="fruit-anchor">
                <div className="fruit-anchor-verse">{fruit.anchor}</div>
                <div className="fruit-anchor-ref">{fruit.anchorRef}</div>
              </div>
            </>
          )}
        </div>
      )}

      <div className="section-label">Weekly practices</div>
      <div className="weekly-cards" id="weekly-cards">
        {WEEKLY_COMMITMENTS.map(c => {
          const checked = !!wd[c.id]
          return (
            <div key={c.id} className={`weekly-card ${checked ? 'done' : ''}`}>
              <div className="weekly-card-header" onClick={() => onToggle(curWeek, c.id)}>
                <div className="check">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="commit-title">{c.title}</div>
                  <div className="commit-desc">{c.desc}</div>
                </div>
              </div>
              {c.hasVerse && verse && (
                <div className="verse-input-wrap">
                  <div className="verse-label">This week&apos;s verse to memorize</div>
                  <div className="verse-display">{verse.verse}</div>
                  <div className="verse-display-ref">{verse.ref}</div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="section-label">All 11 weeks</div>
      <div className="weekly-weeks" id="weekly-weeks">
        {Array.from({ length: 11 }, (_, i) => i + 1).map(w => (
          <div
            key={w}
            className={`week-cell ${w === curWeek ? 'active' : ''} ${w < curWeek ? 'done' : ''}`}
            onClick={() => onChangeWeek(w)}
          >
            W{w}
          </div>
        ))}
      </div>

      <button type="button" className="back-to-standard" onClick={onReturnToStandard}>
        ← The Standard
      </button>
    </div>
  )
}
