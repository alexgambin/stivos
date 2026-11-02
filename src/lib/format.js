// Shared formatting. One place for the locale.

export const nf = (n) => Math.round(n).toLocaleString('en-US')

export const eur = (n) => `€${nf(n)}`

// Points for an activity: `tipo.pts` is the reference for 30 minutes and
// scales proportionally, rounded to multiples of 5 so it reads cleanly.
export function puntosActividad(tipo, minutos) {
  return Math.max(10, Math.round((tipo.pts * minutos) / 30 / 5) * 5)
}
