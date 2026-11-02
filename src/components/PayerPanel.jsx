import { PILOT, PANEL } from '../data.js'
import { nf, eur } from '../lib/format.js'
import { Icon } from './bits.jsx'

// Savings observed in the pilot, extrapolated to the whole workforce and to 12 months.
const proyeccionAnual = (PANEL.ahorro / PILOT.plantilla) * PILOT.plantillaTotal * (12 / PILOT.meses)

export function PayerPanel() {
  return (
    <div className="screen-pad payer">
      <header className="payer-head">
        <p className="eyebrow">Funder dashboard · {PILOT.financiador}</p>
        <h1 className="screen-title">Pilot results</h1>
        <p className="payer-meta">{PILOT.empresa} · {PILOT.plantilla} employees · {PILOT.periodo}</p>
      </header>

      {/* Hero: the savings */}
      <section className="savings">
        <p className="savings-k">Estimated gross savings</p>
        <p className="savings-num">{eur(PANEL.ahorro)}</p>
        <p className="savings-sub">
          {PANEL.diasEvitados} sick-leave days avoided or shortened during the pilot
        </p>
      </section>

      {/* KPIs */}
      <div className="kpis">
        <div className="kpi">
          <span className="kpi-num">{PANEL.participacion}%</span>
          <span className="kpi-lbl">Participation</span>
          <span className="kpi-sub">{PANEL.participacionN} employees</span>
        </div>
        <div className="kpi">
          <span className="kpi-num">{PANEL.adherencia}%</span>
          <span className="kpi-lbl">Adherence</span>
          <span className="kpi-sub">sessions completed, at-risk group</span>
        </div>
      </div>

      {/* Baseline vs actual */}
      <section className="card">
        <p className="eyebrow">Against the baseline</p>
        {PANEL.comparativa.map((c, i) => {
          const max = Math.max(c.base, c.real)
          return (
            <div className="cmp" key={i}>
              <p className="cmp-label">{c.label}</p>
              <div className="cmp-row">
                <span className="cmp-tag base">Baseline</span>
                <div className="cmp-track"><div className="cmp-fill base" style={{ width: `${(c.base / max) * 100}%` }} /></div>
                <span className="cmp-val">{c.base}</span>
              </div>
              <div className="cmp-row">
                <span className="cmp-tag real">With Stivos</span>
                <div className="cmp-track"><div className="cmp-fill real" style={{ width: `${(c.real / max) * 100}%` }} /></div>
                <span className="cmp-val">{c.real}</span>
              </div>
            </div>
          )
        })}
      </section>

      {/* Projection */}
      <section className="projection">
        <div className="proj-ic"><Icon name="spark" size={18} /></div>
        <div>
          <p className="proj-k">Projected yearly savings</p>
          <p className="proj-num">~{eur(proyeccionAnual)}</p>
          <p className="proj-sub">extrapolated from the pilot to all {nf(PILOT.plantillaTotal)} employees</p>
        </div>
      </section>

      {/* Method and privacy note — answers the GDPR objection */}
      <div className="method">
        <Icon name="lock" size={15} />
        <p>
          Estimated against a risk-adjusted baseline. Aggregated, anonymous data: no
          individual health data is accessible to the employer or the insurer.
        </p>
      </div>
    </div>
  )
}
