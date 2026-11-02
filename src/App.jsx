import { useState } from 'react'
import { Icon } from './components/bits.jsx'
import { Home, Progress, Rewards, Challenges, Program, Clases, RegisterSheet } from './components/screens.jsx'
import { PayerPanel } from './components/PayerPanel.jsx'
import { useDemo } from './lib/useDemo.js'

const TABS = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'progress', label: 'Progress', icon: 'chart' },
  { id: 'clases', label: 'Classes', icon: 'calendar' },
  { id: 'rewards', label: 'Rewards', icon: 'gift' },
  { id: 'challenges', label: 'Challenges', icon: 'trophy' },
]

export default function App() {
  const [view, setView] = useState('employee') // 'employee' | 'payer'
  const [tab, setTab] = useState('home')
  const [program, setProgram] = useState(false)

  // Live prototype state: lives in useDemo and is passed whole to each screen
  const demo = useDemo()
  const [sheet, setSheet] = useState(false)

  function guardarActividad(tipo, minutos) {
    demo.registrar(tipo, minutos)
    setSheet(false)
  }

  const showFab = view === 'employee' && !program && tab === 'home'

  return (
    <div className="stage">
      <div className="demo-toggle" role="tablist" aria-label="View">
        <button className={view === 'employee' ? 'on' : ''} onClick={() => setView('employee')}>
          Employee app
        </button>
        <button className={view === 'payer' ? 'on' : ''} onClick={() => setView('payer')}>
          Funder dashboard
        </button>
      </div>

      <div className="phone">
        <div className="statusbar">
          <span className="sb-time">9:41</span>
          <span className="sb-brand">Stivos</span>
          <span className="sb-icons">
            <i className="sb-sig" />
            <i className="sb-wifi" />
            <i className="sb-bat" />
          </span>
        </div>

        <main className="screen">
          {view === 'payer' ? (
            <PayerPanel />
          ) : program ? (
            <Program onBack={() => setProgram(false)} demo={demo} />
          ) : (
            <>
              {tab === 'home' && <Home onOpenProgram={() => setProgram(true)} demo={demo} />}
              {tab === 'progress' && <Progress demo={demo} />}
              {tab === 'clases' && <Clases demo={demo} />}
              {tab === 'rewards' && <Rewards demo={demo} />}
              {tab === 'challenges' && <Challenges demo={demo} />}
            </>
          )}
        </main>

        {showFab && (
          <button className="fab" onClick={() => setSheet(true)} aria-label="Log activity">
            <Icon name="plus" size={24} stroke={2.4} />
          </button>
        )}

        {sheet && <RegisterSheet onClose={() => setSheet(false)} onSave={guardarActividad} />}

        {view === 'employee' && !program && (
          <nav className="tabbar">
            {TABS.map((t) => (
              <button
                key={t.id}
                className={`tab ${tab === t.id ? 'active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                <Icon name={t.icon} size={21} stroke={tab === t.id ? 2.4 : 1.9} />
                <span>{t.label}</span>
              </button>
            ))}
          </nav>
        )}
      </div>

      {view === 'employee' && (
        <p className="hint">Tap "Funder dashboard" above to see the savings.</p>
      )}
    </div>
  )
}
