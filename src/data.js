// ───────────────────────────────────────────────────────────
//  Mock data for the prototype. All invented, but consistent
//  across screens. Edit the numbers here for each meeting.
//  No component has hard-coded figures: change a number here
//  and it carries through to both views.
// ───────────────────────────────────────────────────────────

export const PILOT = {
  empresa: 'Logística Vallès',
  financiador: 'Mutua Horizonte',
  periodo: 'Jan – Jun 2026',
  meses: 6, // pilot length — used to annualize
  plantilla: 52,
  plantillaTotal: 520, // for the projection
}

// User signed in to the employee app
export const ME = {
  nombre: 'Marc',
  apellido: 'Soler',
  equipo: 'Operations',
  puntos: 1240,
  racha: 5,
  meta: 7000,
  hoy: { pasos: 6240, minutos: 27, kcal: 412 },
  semana: [
    { dia: 'Mo', pasos: 4100 },
    { dia: 'Tu', pasos: 5200 },
    { dia: 'We', pasos: 3800 },
    { dia: 'Th', pasos: 6200 },
    { dia: 'Fr', pasos: 7100 },
    { dia: 'Sa', pasos: 5800 },
    { dia: 'Su', pasos: 6240 }, // today — kept in sync with ME.hoy.pasos
  ],
}

// How many points each action is worth. The "How you earn points" screen reads from here.
export const PUNTOS = {
  reserva: 25,
  meta: 50,
  sesionPrograma: 150,
  actividadEmpresa: 100,
  semanaCompleta: 200,
}

// Rewards catalog. "fuente" = who pays for it (pass-through).
export const PREMIOS = [
  { id: 'yoga', nombre: 'On-site yoga class', puntos: 600, fuente: 'Paid for by your employer', icon: 'heart' },
  { id: 'fisio', nombre: 'Physiotherapy session', puntos: 800, fuente: 'Paid for by your insurer', icon: 'activity' },
  { id: 'vale', nombre: '€15 voucher', puntos: 1000, fuente: 'Paid for by your employer', icon: 'gift' },
  { id: 'dia', nombre: 'Half day off for wellbeing', puntos: 2500, fuente: 'Paid for by your employer', icon: 'clock' },
  { id: 'watch', nombre: 'Subsidized smartwatch', puntos: 5000, fuente: 'Paid for by your insurer', icon: 'watch' },
]

// Current team challenge
export const RETO = {
  titulo: '1,000,000 steps in March',
  restanteDias: 9,
  equipos: [
    { nombre: 'Operations', progreso: 68, tuyo: true },
    { nombre: 'Sales', progreso: 61, tuyo: false },
    { nombre: 'Warehouse', progreso: 54, tuyo: false },
    { nombre: 'Office', progreso: 49, tuyo: false },
  ],
}

// This week's individual leaderboard. The "tuyo" row uses the prototype's
// live points, not the number here.
export const RANKING = [
  { nombre: 'Ana Ruiz', equipo: 'Sales', puntos: 2180 },
  { nombre: 'Javier Mora', equipo: 'Warehouse', puntos: 1940 },
  { nombre: 'Marc Soler', equipo: 'Operations', puntos: 1240, tuyo: true },
  { nombre: 'Lucía Gómez', equipo: 'Office', puntos: 980 },
  { nombre: 'David Pons', equipo: 'Operations', puntos: 870 },
]

// Targeted program (intervention layer). Marc is sedentary →
// PREVENTIVE back program, before any sick leave happens.
export const PROGRAMA = {
  nombre: 'Healthy Back',
  tipo: 'Prevention program',
  fisio: 'Núria Camps',
  sesionesHechas: 4,
  sesionesTotal: 6,
  proxima: { dia: 'Thursday', hora: '12:30', lugar: 'Multipurpose room' },
  pasos: [
    { nombre: 'Initial assessment', estado: 'hecho' },
    { nombre: 'Guided lower-back mobility', estado: 'hecho' },
    { nombre: 'Core strengthening', estado: 'hecho' },
    { nombre: 'Posture at your workstation', estado: 'hecho' },
    { nombre: 'Graded activity', estado: 'proxima' },
    { nombre: 'Discharge and maintenance plan', estado: 'pendiente' },
  ],
}

// Funder dashboard (the screen that makes the business case).
// Only figures observed in the pilot: the projection and ROI are derived.
export const PANEL = {
  participacion: 73, // %
  participacionN: '38 / 52',
  adherencia: 81, // % of sessions completed by the at-risk group
  diasEvitados: 31,
  ahorro: 6200, // gross € observed during the pilot
  costePorEmpleadoAnual: 120, // € Stivos costs per employee per year
  comparativa: [
    { label: 'Long-term sick-leave cases', base: 9, real: 6, unidad: '' },
    { label: 'Sick-leave days lost', base: 142, real: 111, unidad: '' },
  ],
}

// ─── Activity types for manual logging ────────────────────
// `pts` = reference points per 30 min. `pasosMin` and `kcalMin` feed the
// Home ring, so logging an activity really moves the day forward.
export const TIPOS_ACTIVIDAD = [
  { id: 'caminar', label: 'Walking', icon: 'steps', pts: 50, pasosMin: 105, kcalMin: 4 },
  { id: 'clase', label: 'Class', icon: 'heart', pts: 100, pasosMin: 40, kcalMin: 6 },
  { id: 'gimnasio', label: 'Gym', icon: 'activity', pts: 80, pasosMin: 25, kcalMin: 7 },
  { id: 'bici', label: 'Cycling', icon: 'activity', pts: 80, pasosMin: 60, kcalMin: 8 },
  { id: 'otro', label: 'Other', icon: 'spark', pts: 60, pasosMin: 45, kcalMin: 5 },
]

// Recent activity already logged (seed)
export const REGISTROS_SEED = [
  { id: 1, label: 'Walk to work', minutos: 25, pts: 50, cuando: 'Today · 8:10' },
  { id: 2, label: 'Healthy Back class', minutos: 45, pts: 100, cuando: 'Yesterday · 12:30' },
]

// Baseline metrics for the Progress screen. The week's minutes and
// sessions add to whatever you log during the demo.
export const METRICAS = {
  diasActivos: 6,
  diasSemana: 7,
  minutosSemana: 168,
  mejorRacha: 7,
}

// ─── On-site classes and workshops (with booking) ──────────
export const ACTIVIDADES = [
  { id: 'espalda', nombre: 'Healthy Back', tipo: 'Posture', dia: 'Mon', hora: '12:30', lugar: 'Multipurpose room', instructor: 'Núria Camps, physio', plazas: 8, libres: 3, pts: 100 },
  { id: 'yoga', nombre: 'Gentle yoga', tipo: 'Mobility', dia: 'Wed', hora: '14:00', lugar: 'Multipurpose room', instructor: 'Lola Vidal', plazas: 12, libres: 5, pts: 100 },
  { id: 'estres', nombre: 'Stress management', tipo: 'Mental health', dia: 'Thu', hora: '17:00', lugar: 'Meeting room 2', instructor: 'Marc Roig, psychologist', plazas: 10, libres: 6, pts: 120 },
  { id: 'caminata', nombre: 'Brisk walk', tipo: 'Light cardio', dia: 'Fri', hora: '13:00', lugar: 'Reception', instructor: 'Stivos team', plazas: 20, libres: 11, pts: 50 },
  { id: 'fuerza', nombre: 'Mobility and strength', tipo: 'Strength', dia: 'Tue', hora: '08:00', lugar: 'Gym', instructor: 'Núria Camps, physio', plazas: 1, libres: 1, pts: 100 },
  { id: 'core', nombre: 'Core and balance', tipo: 'Strength', dia: 'Tue', hora: '18:00', lugar: 'Gym', instructor: 'Núria Camps, physio', plazas: 8, libres: 0, pts: 100 },
]
