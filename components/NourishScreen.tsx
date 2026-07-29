'use client'
import { useState } from 'react'
import { APPROACH_NAMES } from '../lib/data'

const APPROACHES = [
  { id: 'mediterranean', name: 'Mediterranean', desc: 'Vegetables, fruit, legumes, whole grains, fish, olive oil, nuts, and seeds. One of the most studied and sustained approaches to whole-body health.' },
  { id: 'paleo', name: 'Paleo', desc: 'Meat, fish, vegetables, fruit, nuts, and seeds. Removes grains, dairy, legumes, and processed foods. Anchored in eating close to the earth.' },
  { id: 'keto', name: 'Ketogenic', desc: 'Very low carbohydrate, high fat. Shifts the body to burn fat for fuel. A powerful tool for some, particularly around blood sugar and metabolic health.' },
  { id: 'plantbased', name: 'Plant-based', desc: 'Centers on vegetables, legumes, whole grains, fruits, nuts, and seeds. Requires intentional planning — protein, B12, iron, and omega-3s deserve attention.' },
  { id: 'whole30', name: 'Whole30', desc: 'A 30-day reset that removes sugar, alcohol, grains, legumes, dairy, and processed foods. A powerful way to identify what serves your body and what does not.' },
  { id: 'mypath', name: 'My own path', desc: 'Not ready for a full approach? That is okay. Small, consistent acts of stewardship are still stewardship. Choose one thing you are honoring your body with during these 40 days.' },
]

interface Props {
  approach: string
  declaration: string
  onSave: (approach: string, declaration: string) => void
  onClose: () => void
}

export default function NourishScreen({ approach: initialApproach, declaration: initialDeclaration, onSave, onClose }: Props) {
  const [selectedApproach, setSelectedApproach] = useState(initialApproach)
  const [declaration, setDeclaration] = useState(initialDeclaration)
  const [saved, setSaved] = useState(false)

  function selectApproach(id: string) {
    setSelectedApproach(id)
    setSaved(false)
    if (id === 'mypath') {
      if (!declaration) setDeclaration('')
    } else {
      const name = APPROACH_NAMES[id]
      const defaultDecl = `As an act of worship, I am choosing to nourish my body through ${name} during these 40 days — honoring the temple God entrusted to me so I can serve Him fully.`
      setDeclaration(prev => prev && prev !== getDefaultDecl(initialApproach) ? prev : defaultDecl)
    }
  }

  function getDefaultDecl(id: string) {
    if (!id || id === 'mypath') return ''
    const name = APPROACH_NAMES[id]
    return `As an act of worship, I am choosing to nourish my body through ${name} during these 40 days — honoring the temple God entrusted to me so I can serve Him fully.`
  }

  async function handleSave() {
    await onSave(selectedApproach, declaration)
    setSaved(true)
  }

  return (
    <div className="nutrition-screen open" id="nutrition-screen">
      <button type="button" className="nutrition-screen-back" onClick={onClose}>← Back</button>
      <div className="nutrition-inner">
        <div className="nutrition-eyebrow">Daily Commitment</div>
        <div className="nutrition-title">Nourish Well.</div>
        <div className="nutrition-verse">"Do you not know that your bodies are temples of the Holy Spirit, who is in you, whom you have received from God? You are not your own; you were bought at a price. Therefore honor God with your bodies."</div>
        <div className="nutrition-verse-ref">1 Corinthians 6:19-20</div>
        <div className="nutrition-body">How you feed the body God entrusted to you is an act of stewardship. Not a diet. Not a program. A daily decision to care well for what belongs to Him.</div>
        <div className="nutrition-body" style={{ fontStyle: 'italic', color: 'var(--gray)' }}>"So whether you eat or drink, or whatever you do, do all to the glory of God." — 1 Corinthians 10:31</div>
        <div className="nutrition-body">Eat real food. Eat close to the earth. Choose quality over convenience. Drink water throughout the day. Eat slowly and with intention.</div>
        <div className="nutrition-body">Daniel chose differently than the king&apos;s table and was more alive for it. <span style={{ color: 'var(--gray)', fontStyle: 'italic' }}>Daniel 1:15</span></div>
        <hr className="nutrition-divider" />
        <div className="nutrition-section-title">Choose your approach</div>
        <div className="nutrition-body" style={{ color: 'var(--gray)' }}>Tap the one you are committing to for these 40 days.</div>
        {APPROACHES.map(a => (
          <div key={a.id} className={`nutrition-approach ${selectedApproach === a.id ? 'selected' : ''}`} onClick={() => selectApproach(a.id)}>
            <div className="nutrition-approach-name">{a.name}</div>
            <div className="nutrition-approach-desc">{a.desc}</div>
          </div>
        ))}
        <hr className="nutrition-divider" />
        <div className="nutrition-declaration">
          <div className="nutrition-declaration-label">My declaration</div>
          {!selectedApproach && <div className="nutrition-declaration-hint">Choose an approach above to receive your personal declaration.</div>}
          {selectedApproach && (
            <>
              <div className="nutrition-declaration-text">As an act of worship, I am choosing to nourish my body with __________ during these 40 days — honoring the temple God entrusted to me so I can serve Him fully.</div>
              <textarea
                className="nutrition-declaration-input"
                rows={4}
                placeholder={selectedApproach === 'mypath' ? 'I am honoring my body by... (e.g. cutting sugar, drinking water instead of soda, cooking at home)' : 'Your declaration...'}
                value={declaration}
                onChange={e => { setDeclaration(e.target.value); setSaved(false) }}
              />
              {!saved
                ? <button type="button" className="nutrition-save-btn" onClick={handleSave}>Save my declaration</button>
                : (
                  <>
                    <div className="nutrition-saved-msg" style={{ display: 'block' }}>Saved. Walk in it.</div>
                    <button type="button" className="nutrition-save-btn" style={{ marginTop: 8, background: 'none', border: '0.5px solid var(--border)', color: 'var(--gray)' }} onClick={onClose}>← Back to The Standard</button>
                  </>
                )
              }
            </>
          )}
        </div>
      </div>
    </div>
  )
}
