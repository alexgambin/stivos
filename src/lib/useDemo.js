// Live prototype state, in one place.
//
// Previously each screen read fixed numbers from data.js, so logging an
// activity raised the points but not the steps, the metrics or the
// leaderboard. Here the state is stored once and everything else is
// derived from it, so the demo can't contradict itself.

import { useReducer, useMemo, useCallback } from 'react'
import { ME, METRICAS, PUNTOS, RANKING, RETO, PROGRAMA, REGISTROS_SEED } from '../data.js'
import { puntosActividad } from './format.js'

function estadoInicial() {
  return {
    puntos: ME.puntos,
    registros: REGISTROS_SEED,
    reservas: [], // ids from ACTIVIDADES
    canjeados: [], // ids from PREMIOS
    hoy: ME.hoy,
    proximoId: 100, // new ids, without Date.now() so it's reproducible
    toast: null,
  }
}

function reducer(estado, accion) {
  switch (accion.type) {
    case 'registrar': {
      const { tipo, minutos } = accion
      const pts = puntosActividad(tipo, minutos)
      return {
        ...estado,
        puntos: estado.puntos + pts,
        proximoId: estado.proximoId + 1,
        registros: [
          { id: estado.proximoId, label: tipo.label, minutos, pts, cuando: 'Just now' },
          ...estado.registros,
        ],
        hoy: {
          pasos: estado.hoy.pasos + Math.round(tipo.pasosMin * minutos),
          minutos: estado.hoy.minutos + minutos,
          kcal: estado.hoy.kcal + Math.round(tipo.kcalMin * minutos),
        },
        toast: { tono: 'ok', texto: `${tipo.label}, ${minutos} min · +${pts} points` },
      }
    }

    case 'toggleReserva': {
      // This used to be `reservar(id)`: tapping an already-booked class again
      // added another 25 points, with no cap. Now it toggles and gives the points back.
      const { actividad } = accion
      const yaReservada = estado.reservas.includes(actividad.id)
      return {
        ...estado,
        reservas: yaReservada
          ? estado.reservas.filter((r) => r !== actividad.id)
          : [...estado.reservas, actividad.id],
        puntos: estado.puntos + (yaReservada ? -PUNTOS.reserva : PUNTOS.reserva),
        toast: yaReservada
          ? { tono: 'info', texto: `Booking canceled · −${PUNTOS.reserva} points` }
          : { tono: 'ok', texto: `${actividad.nombre} booked · +${PUNTOS.reserva} points` },
      }
    }

    case 'canjear': {
      const { premio } = accion
      if (estado.puntos < premio.puntos || estado.canjeados.includes(premio.id)) return estado
      return {
        ...estado,
        puntos: estado.puntos - premio.puntos,
        canjeados: [...estado.canjeados, premio.id],
        toast: { tono: 'ok', texto: `Redeemed: ${premio.nombre}` },
      }
    }

    case 'cerrarToast':
      return { ...estado, toast: null }

    case 'reset':
      return { ...estadoInicial(), toast: { tono: 'info', texto: 'Demo reset' } }

    default:
      return estado
  }
}

export function useDemo() {
  const [estado, dispatch] = useReducer(reducer, undefined, estadoInicial)

  const acciones = useMemo(
    () => ({
      registrar: (tipo, minutos) => dispatch({ type: 'registrar', tipo, minutos }),
      toggleReserva: (actividad) => dispatch({ type: 'toggleReserva', actividad }),
      canjear: (premio) => dispatch({ type: 'canjear', premio }),
      reset: () => dispatch({ type: 'reset' }),
    }),
    [],
  )

  const cerrarToast = useCallback(() => dispatch({ type: 'cerrarToast' }), [])

  // ─── Derived values: nothing else recalculates these ───
  const derivado = useMemo(() => {
    // What you've logged during the demo (on top of the seed)
    const nuevos = estado.registros.filter((r) => !REGISTROS_SEED.some((s) => s.id === r.id))
    const minutosNuevos = nuevos.reduce((a, r) => a + r.minutos, 0)

    // The last day of the week IS today: kept in sync instead of duplicated.
    const semana = ME.semana.map((d, i) =>
      i === ME.semana.length - 1 ? { ...d, pasos: estado.hoy.pasos } : d,
    )
    const pasosSemana = semana.reduce((a, d) => a + d.pasos, 0)

    // Your leaderboard row uses the live points, and the table re-sorts.
    const ranking = RANKING.map((r) => (r.tuyo ? { ...r, puntos: estado.puntos } : r)).sort(
      (a, b) => b.puntos - a.puntos,
    )

    // Your team moves up with what you log (capped at +9 pts so it doesn't jump ahead at once).
    const equipos = RETO.equipos
      .map((e) => (e.tuyo ? { ...e, progreso: Math.min(99, e.progreso + Math.min(9, nuevos.length * 3)) } : e))
      .sort((a, b) => b.progreso - a.progreso)

    return {
      semana,
      pasosSemana,
      mediaSemana: Math.round(pasosSemana / semana.length),
      ranking,
      equipos,
      lider: equipos[0],
      metaCumplida: estado.hoy.pasos >= ME.meta,
      metricas: {
        diasActivos: `${METRICAS.diasActivos} / ${METRICAS.diasSemana}`,
        minutosSemana: METRICAS.minutosSemana + minutosNuevos,
        sesionesPrograma: `${PROGRAMA.sesionesHechas} / ${PROGRAMA.sesionesTotal}`,
        mejorRacha: METRICAS.mejorRacha,
      },
      programaProgreso: Math.round((PROGRAMA.sesionesHechas / PROGRAMA.sesionesTotal) * 100),
    }
  }, [estado.registros, estado.hoy, estado.puntos])

  return { ...estado, ...derivado, ...acciones, cerrarToast }
}
