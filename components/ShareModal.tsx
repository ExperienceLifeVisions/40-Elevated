'use client'
import { useState, useEffect } from 'react'

const APP_URL = 'https://40elevated.com'

export default function ShareModal({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false)
  const [qrReady, setQrReady] = useState(false)

  useEffect(() => {
    // Load QR code library
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js'
    script.onload = () => {
      const el = document.getElementById('qr-code')
      if (el && !(window as any).qrGenerated) {
        new (window as any).QRCode(el, { text: APP_URL, width: 140, height: 140, colorDark: '#000000', colorLight: '#ffffff' })
        ;(window as any).qrGenerated = true
      }
      setQrReady(true)
    }
    document.head.appendChild(script)
  }, [])

  function copyUrl() {
    navigator.clipboard.writeText(APP_URL).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function nativeShare() {
    if (navigator.share) {
      navigator.share({ title: '40 Elevated', text: 'A Walk With Christ, 40 days of spiritual discipline', url: APP_URL })
    }
  }

  return (
    <div className="share-modal-bg open" onClick={onClose}>
      <div className="share-modal" onClick={e => e.stopPropagation()}>
        <div className="share-handle" />
        <img src="/logo.png" alt="40 Elevated" className="share-modal-logo" />
        <div className="share-modal-sub">Scan to begin your walk with Christ</div>
        <div id="qr-code" className="qr-wrap" />
        <div className="share-url-row">
          <span className="share-url-text">40elevated.com</span>
          <button type="button" className={`share-copy-btn ${copied ? 'copied' : ''}`} onClick={copyUrl}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <button type="button" className="share-native-btn" onClick={nativeShare}>Share with someone</button>

        <div className="share-socials">
          <div className="share-socials-label">Follow CTC Cabo</div>
          <div className="share-socials-row">
            <a className="share-social-btn" href="https://www.facebook.com/share/1EmZPi2cv7/" target="_blank" rel="noopener">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
              Facebook
            </a>
            <a className="share-social-btn" href="https://www.instagram.com/ctccabo" target="_blank" rel="noopener">
              <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" style={{stopColor:'#f09433'}}/><stop offset="25%" style={{stopColor:'#e6683c'}}/><stop offset="50%" style={{stopColor:'#dc2743'}}/><stop offset="75%" style={{stopColor:'#cc2366'}}/><stop offset="100%" style={{stopColor:'#bc1888'}}/></linearGradient></defs>
                <path fill="url(#ig)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </a>
          </div>
        </div>

        <button type="button" className="share-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
