import { useState, useEffect, useRef } from 'react'
import { ME, PREMIOS, RETO, PROGRAMA, PUNTOS, ACTIVIDADES, TIPOS_ACTIVIDAD } from '../data.js'
import { nf, puntosActividad } from '../lib/format.js'
import { Icon, Ring, WeekBars, Bar } from './bits.jsx'

// ─── HOME ─────────────────────────────────────────────────
export function Home({ onOpenProgram, demo }) {
  const { puntos, hoy, registros, equipos, lider, programaProgreso } = demo
  return (
    <div className="screen-pad">
      <header className="hi">
        <div>
          <p className="eyebrow">Hi, {ME.nombre}</p>
          <h1 className="screen-title">Today</h1>
        </div>
        <div className="streak">
          <Icon name="flame" size={16} />
          <span>{ME.racha} days</span>
        </div>
      </header>

      <section className="ring-card">
        <Ring value={hoy.pasos} max={ME.meta} label="steps" sub={`goal ${nf(ME.meta)}`} />
        <div className="ring-stats">
          <div>
            <span className="stat-num">{hoy.minutos}</span>
            <span className="stat-lbl">active min</span>
          </div>
          <div className="stat-div" />
          <div>
            <span className="stat-num">{nf(hoy.kcal)}</span>
            <span className="stat-lbl">kcal</span>
          </div>
          <div className="stat-div" />
          <div>
            <span className="stat-num">{nf(puntos)}</span>
            <span className="stat-lbl">points</span>
          </div>
        </div>
      </section>

      <button className="program-card" onClick={onOpenProgram}>
        <div className="program-ic"><Icon name="activity" size={20} /></div>
        <div className="program-tx">
          <p className="program-k">Your program · {PROGRAMA.nombre}</p>
          <p className="program-s">
            {PROGRAMA.sesionesHechas} of {PROGRAMA.sesionesTotal} sessions · {programaProgreso}% · next on {PROGRAMA.proxima.dia}
          </p>
        </div>
        <Icon name="chevron" size={18} className="program-go" />
      </button>

      <section className="challenge-mini">
        <div className="cm-head">
          <span className="eyebrow">Your team's challenge</span>
          <span className="cm-days">{RETO.restanteDias} days left</span>
        </div>
        <p className="cm-title">{RETO.titulo}</p>
        <Bar pct={equipos.find((e) => e.tuyo).progreso} tone="brass" />
        <p className="cm-foot">
          {lider.tuyo ? 'Your team is leading' : `${lider.nombre} is leading`} · {equipos.find((e) => e.tuyo).progreso}%
        </p>
      </section>

      <section className="recent">
        <p className="eyebrow">Recent activity</p>
        <div className="recent-list">
          {registros.map((r) => (
            <div className="recent-item" key={r.id}>
              <div className="recent-ic"><Icon name="check" size={15} /></div>
              <div className="recent-tx">
                <span className="recent-name">{r.label}</span>
                <span className="recent-meta">{r.cuando} · {r.minutos} min</span>
              </div>
              <span className="recent-pts">+{r.pts}</span>
            </div>
          ))}
        </div>
        <p className="recent-hint">Tap the + button to log an activity.</p>
      </section>
    </div>
  )
}

// ─── PROGRESS ─────────────────────────────────────────────
export function Progress({ demo }) {
  const { semana, pasosSemana, mediaSemana, metricas } = demo
  const cards = [
    { num: metricas.diasActivos, lbl: 'Active days' },
    { num: nf(metricas.minutosSemana), lbl: 'Min this week' },
    { num: metricas.sesionesPrograma, lbl: 'Program sessions' },
    { num: metricas.mejorRacha, lbl: 'Best streak' },
  ]
  return (
    <div className="screen-pad">
      <h1 className="screen-title">Your progress</h1>

      <div className="metrics">
        {cards.map((m) => (
          <div className="metric" key={m.lbl}>
            <span className="metric-num">{m.num}</span>
            <span className="metric-lbl">{m.lbl}</span>
          </div>
        ))}
      </div>

      <section className="card">
        <div className="card-head">
          <span className="eyebrow">This week</span>
          <span className="card-strong">{nf(pasosSemana)} steps</span>
        </div>
        <WeekBars data={semana} />
        <div className="prog-foot">
          <span>Avg {nf(mediaSemana)}/day</span>
          <span className="ok"><Icon name="spark" size={14} /> +18% vs last week</span>
        </div>
      </section>

      <section className="card">
        <p className="eyebrow">How you earn points</p>
        <ul className="howto">
          <li><span>Hit your daily step goal</span><b>+{PUNTOS.meta}</b></li>
          <li><span>Complete a session of your program</span><b>+{PUNTOS.sesionPrograma}</b></li>
          <li><span>Attend an on-site activity</span><b>+{PUNTOS.actividadEmpresa}</b></li>
          <li><span>Book your spot in a class</span><b>+{PUNTOS.reserva}</b></li>
          <li><span>Finish the week without missing a day</span><b>+{PUNTOS.semanaCompleta}</b></li>
        </ul>
      </section>
    </div>
  )
}

// ─── REWARDS ──────────────────────────────────────────────
export function Rewards({ demo }) {
  const { puntos, canjeados, canjear } = demo
  return (
    <div className="screen-pad">
      <header className="rew-head">
        <h1 className="screen-title">Rewards</h1>
        <div className="pts-chip"><Icon name="spark" size={14} /> {nf(puntos)} pts</div>
      </header>
      <p className="rew-note">Your rewards are paid for by your employer or your insurer. You pay nothing.</p>

      <div className="rew-list">
        {PREMIOS.map((p) => {
          const yaCanjeado = canjeados.includes(p.id)
          const puede = puntos >= p.puntos && !yaCanjeado
          const faltan = p.puntos - puntos
          return (
            <div className={`rew-item ${yaCanjeado ? 'got' : puede ? '' : 'locked'}`} key={p.id}>
              <div className="rew-ic">
                <Icon name={yaCanjeado ? 'check' : p.icon} size={20} />
              </div>
              <div className="rew-tx">
                <p className="rew-name">{p.nombre}</p>
                <p className="rew-src">
                  {yaCanjeado ? "Redeemed · we'll let you know when to pick it up" : p.fuente}
                </p>
                {!yaCanjeado && !puede && (
                  <p className="rew-falta">{nf(faltan)} more points needed</p>
                )}
              </div>
              <button
                className={`rew-btn ${yaCanjeado ? 'done' : puede ? '' : 'off'}`}
                onClick={() => puede && canjear(p)}
                disabled={!puede}
                aria-label={
                  yaCanjeado ? `${p.nombre}, already redeemed` : `Redeem ${p.nombre} for ${nf(p.puntos)} points`
                }
              >
                {yaCanjeado ? '✓' : puede ? 'Redeem' : nf(p.puntos)}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── CHALLENGES ───────────────────────────────────────────
export function Challenges({ demo }) {
  const { equipos, ranking } = demo
  return (
    <div className="screen-pad">
      <h1 className="screen-title">Challenges</h1>

      <section className="card">
        <div className="cm-head">
          <span className="eyebrow">Team challenge · {RETO.restanteDias} days left</span>
        </div>
        <p className="cm-title big">{RETO.titulo}</p>
        <div className="team-list">
          {equipos.map((t, i) => (
            <div className={`team-row ${t.tuyo ? 'mine' : ''}`} key={t.nombre}>
              <span className="team-pos">{i + 1}</span>
              <span className="team-name">{t.nombre}{t.tuyo && ' · your team'}</span>
              <div className="team-bar"><div className="team-fill" style={{ width: `${t.progreso}%` }} /></div>
              <span className="team-pct">{t.progreso}%</span>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <p className="eyebrow">Individual leaderboard</p>
        <div className="rank-list">
          {ranking.map((r, i) => (
            <div className={`rank-row ${r.tuyo ? 'mine' : ''}`} key={r.nombre}>
              <span className="rank-pos">{i + 1}</span>
              <div className="rank-av">{r.nombre.charAt(0)}</div>
              <div className="rank-tx">
                <span className="rank-name">{r.nombre}{r.tuyo && ' (you)'}</span>
                <span className="rank-team">{r.equipo}</span>
              </div>
              <span className="rank-pts">{nf(r.puntos)}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

// ─── PROGRAM (detail) ─────────────────────────────────────
export function Program({ onBack, demo }) {
  return (
    <div className="screen-pad">
      <button className="back" onClick={onBack}>
        <Icon name="chevron" size={18} className="flip" /> Back
      </button>

      <div className="prog-hero">
        <span className="prog-tag">{PROGRAMA.tipo}</span>
        <h1 className="screen-title">{PROGRAMA.nombre}</h1>
        <p className="prog-fisio">Led by {PROGRAMA.fisio}, physiotherapist</p>
      </div>

      <section className="card next-card">
        <div className="next-ic"><Icon name="clock" size={20} /></div>
        <div>
          <p className="eyebrow">Next session</p>
          <p className="next-when">{PROGRAMA.proxima.dia} · {PROGRAMA.proxima.hora}</p>
          <p className="next-where">{PROGRAMA.proxima.lugar}</p>
        </div>
        <button className="next-btn">Confirm</button>
      </section>

      <section className="card">
        <div className="card-head">
          <span className="eyebrow">Your plan</span>
          <span className="card-strong">{demo.programaProgreso}%</span>
        </div>
        <Bar pct={demo.programaProgreso} tone="green" />
        <ol className="steps">
          {PROGRAMA.pasos.map((s, i) => (
            <li key={s.nombre} className={`step ${s.estado}`}>
              <span className="step-dot">
                {s.estado === 'hecho' ? <Icon name="check" size={13} /> : i + 1}
              </span>
              <span className="step-name">{s.nombre}</span>
              {s.estado === 'proxima' && <span className="step-flag">next</span>}
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}

// ─── CLASSES (on-site catalog + booking) ──────────────────
export function Clases({ demo }) {
  const { reservas, toggleReserva } = demo
  return (
    <div className="screen-pad">
      <h1 className="screen-title">Classes</h1>
      <p className="rew-note">Guided activities at your workplace. Book your spot and earn points.</p>

      <div className="clase-list">
        {ACTIVIDADES.map((a) => {
          const reservada = reservas.includes(a.id)
          const libres = a.libres - (reservada ? 1 : 0)
          const lleno = libres <= 0 && !reservada
          return (
            <div className={`clase ${reservada ? 'on' : ''} ${lleno ? 'full' : ''}`} key={a.id}>
              <div className="clase-top">
                <span className="clase-tag">{a.tipo}</span>
                <span className="clase-pts">+{a.pts} pts</span>
              </div>
              <p className="clase-name">{a.nombre}</p>
              <p className="clase-meta">
                <Icon name="calendar" size={13} /> {a.dia} · {a.hora}
                <span className="clase-dot">·</span>
                <Icon name="pin" size={13} /> {a.lugar}
              </p>
              <p className="clase-inst">{a.instructor}</p>
              <div className="clase-foot">
                <span className={`clase-plazas ${libres <= 2 ? 'low' : ''}`}>
                  {reservada
                    ? 'Your spot is booked'
                    : libres === 0
                      ? 'Full · waiting list'
                      : `${libres} ${libres === 1 ? 'spot left' : 'spots left'}`}
                </span>
                <button
                  className={`clase-btn ${reservada ? 'done' : ''} ${lleno ? 'off' : ''}`}
                  onClick={() => toggleReserva(a)}
                  disabled={lleno}
                  aria-pressed={reservada}
                  aria-label={
                    reservada ? `Cancel your booking for ${a.nombre}` : `Book a spot in ${a.nombre}`
                  }
                >
                  {reservada ? 'Booked ✓' : lleno ? 'Full' : 'Book'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── ACTIVITY LOGGING SHEET (bottom modal) ────────────────
export function RegisterSheet({ onClose, onSave }) {
  const [tipo, setTipo] = useState(TIPOS_ACTIVIDAD[0])
  const [min, setMin] = useState(30)
  const panel = useRef(null)

  // Escape closes, and focus moves into the sheet: without this, screen
  // readers and the keyboard stay behind, on the screen underneath.
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    panel.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const pts = puntosActividad(tipo, min)

  return (
    <div className="sheet-wrap" onClick={onClose}>
      <div
        className="sheet"
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sheet-grip" />
        <div className="sheet-head">
          <h2 className="sheet-title" id="sheet-title">Log activity</h2>
          <button className="sheet-x" onClick={onClose} aria-label="Close">
            <Icon name="close" size={18} />
          </button>
        </div>

        <p className="sheet-lbl" id="sheet-tipo">Type</p>
        <div className="chips" role="group" aria-labelledby="sheet-tipo">
          {TIPOS_ACTIVIDAD.map((t) => (
            <button
              key={t.id}
              className={`chip ${tipo.id === t.id ? 'on' : ''}`}
              onClick={() => setTipo(t)}
              aria-pressed={tipo.id === t.id}
            >
              <Icon name={t.icon} size={15} /> {t.label}
            </button>
          ))}
        </div>

        <label className="sheet-lbl" htmlFor="sheet-min">
          Duration: <b>{min} min</b>
        </label>
        <input
          id="sheet-min"
          className="range"
          type="range"
          min="10"
          max="90"
          step="5"
          value={min}
          onChange={(e) => setMin(Number(e.target.value))}
        />

        <button className="sheet-save" onClick={() => onSave(tipo, min)}>
          Save · +{pts} points
        </button>
      </div>
    </div>
  )
}
