// Reusable visual pieces: icons, activity ring and bars.

import { useEffect } from 'react'
import { nf } from '../lib/format.js'

const PATHS = {
  home: 'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  gift: 'M20 12v8H4v-8M2 7h20v5H2zM12 22V7M12 7S9.5 2 7.5 3.5 8 7 12 7zM12 7s2.5-5 4.5-3.5S16 7 12 7z',
  trophy: 'M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4zM7 6H4v2a3 3 0 003 3M17 6h3v2a3 3 0 01-3 3',
  flame: 'M12 2s4 4 4 8a4 4 0 01-8 0c0-1 .5-2 .5-2S6 10 6 14a6 6 0 0012 0c0-5-6-12-6-12z',
  steps: 'M7 20c-2 0-3-1.5-3-4s1-9 3-9 2 3 2 5-1 8-2 8zM17 22c-2 0-3-1.5-3-4s1-9 3-9 2 3 2 5-1 8-2 8z',
  heart: 'M12 21s-7-4.6-9.5-9A5 5 0 0112 5a5 5 0 019.5 7c-2.5 4.4-9.5 9-9.5 9z',
  activity: 'M22 12h-4l-3 8-6-16-3 8H2',
  clock: 'M12 7v5l3 2M12 22a10 10 0 110-20 10 10 0 010 20z',
  watch: 'M9 2h6v4l1 2v8l-1 2v2H9v-2l-1-2V8l1-2V2zM12 8v4l2 1',
  check: 'M5 12l5 5L20 7',
  chevron: 'M9 6l6 6-6 6',
  lock: 'M5 11h14v10H5zM8 11V7a4 4 0 018 0v4',
  euro: 'M16 6a6 6 0 100 12M5 10h7M5 14h7',
  users: 'M9 11a4 4 0 100-8 4 4 0 000 8zM2 21v-1a6 6 0 0112 0v1M17 11a4 4 0 10-2-7.5M22 21v-1a6 6 0 00-4-5.6',
  spark: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18',
  calendar: 'M3 9h18M7 3v3M17 3v3M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z',
  plus: 'M12 5v14M5 12h14',
  pin: 'M12 21s-6-5.2-6-10a6 6 0 1112 0c0 4.8-6 10-6 10zM12 9a2 2 0 100 .01',
  close: 'M6 6l12 12M18 6L6 18',
  reset: 'M3 12a9 9 0 109-9 9 9 0 00-6.4 2.7L3 8M3 3v5h5',
}

// Decorative by default: the meaning is always in the text next to it.
export function Icon({ name, size = 22, stroke = 2, className = '' }) {
  const d = PATHS[name]
  if (!d) return null
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} />
    </svg>
  )
}

// Activity ring. value/max → arc. Big number in the center.
export function Ring({ value, max, label, sub, size = 188 }) {
  const r = (size - 22) / 2
  const c = 2 * Math.PI * r
  const pct = Math.min(value / max, 1)
  const dash = c * pct
  const completo = value >= max
  return (
    <div
      className={`ring ${completo ? 'full' : ''}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${nf(value)} ${label} of a ${nf(max)} goal`}
    >
      <svg width={size} height={size} aria-hidden="true">
        <defs>
          <linearGradient id="ringgrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2C7A57" />
            <stop offset="100%" stopColor="#B9863A" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#E3E7E1" strokeWidth="11" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#ringgrad)"
          strokeWidth="11"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="ring-arc"
        />
      </svg>
      <div className="ring-center">
        <div className="ring-value">{nf(value)}</div>
        <div className="ring-label">{label}</div>
        {sub && <div className="ring-sub">{completo ? 'goal reached!' : sub}</div>}
      </div>
    </div>
  )
}

// Mini weekly bars
export function WeekBars({ data, max }) {
  const top = max || Math.max(...data.map((d) => d.pasos))
  return (
    <div className="weekbars">
      {data.map((d, i) => (
        <div className="weekbar" key={d.dia} title={`${d.dia}: ${nf(d.pasos)} steps`}>
          <div className="weekbar-track">
            <div
              className={`weekbar-fill ${i === data.length - 1 ? 'today' : ''}`}
              style={{ height: `${Math.round((d.pasos / top) * 100)}%` }}
            />
          </div>
          <span className="weekbar-day">{d.dia}</span>
        </div>
      ))}
    </div>
  )
}

// Simple progress bar
export function Bar({ pct, tone = 'green' }) {
  return (
    <div className="bar" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
      <div className={`bar-fill ${tone}`} style={{ width: `${pct}%` }} />
    </div>
  )
}

// Short-lived notice. Closes the loop: every action shows what it earned.
export function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(onClose, 2600)
    return () => clearTimeout(t)
  }, [toast, onClose])

  if (!toast) return null
  return (
    <div className={`toast ${toast.tono}`} role="status" aria-live="polite">
      <Icon name={toast.tono === 'ok' ? 'check' : 'spark'} size={15} />
      <span>{toast.texto}</span>
    </div>
  )
}
