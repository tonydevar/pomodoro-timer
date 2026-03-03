import { useState, useEffect, useRef, useCallback } from 'react'

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 880
    osc.type = 'sine'
    gain.gain.setValueAtTime(0.5, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1)
    osc.start()
    osc.stop(ctx.currentTime + 1)
  } catch (_) {
    // Web Audio API not available
  }
}

export function useTimer({ workMins, breakMins, onComplete }) {
  const [mode, setMode] = useState('work')
  const [running, setRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(workMins * 60)
  const intervalRef = useRef(null)

  // Derive total duration from current mode
  const total = mode === 'work' ? workMins * 60 : breakMins * 60

  // Stop the interval without touching state
  const stopInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // When durations change and timer is idle, reset to new duration
  useEffect(() => {
    if (!running) {
      setTimeLeft(mode === 'work' ? workMins * 60 : breakMins * 60)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workMins, breakMins, mode])

  // Detect completion
  useEffect(() => {
    if (timeLeft === 0 && running) {
      stopInterval()
      playBeep()
      const nextMode = mode === 'work' ? 'break' : 'work'
      if (onComplete) onComplete(mode, total)
      setRunning(false)
      setMode(nextMode)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, running])

  // Cleanup on unmount
  useEffect(() => () => stopInterval(), [stopInterval])

  const start = useCallback(() => {
    if (intervalRef.current !== null) return
    setRunning(true)
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
          return 0
        }
        return t - 1
      })
    }, 1000)
  }, [])

  const pause = useCallback(() => {
    stopInterval()
    setRunning(false)
  }, [stopInterval])

  const reset = useCallback(() => {
    stopInterval()
    setRunning(false)
    setTimeLeft(mode === 'work' ? workMins * 60 : breakMins * 60)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, workMins, breakMins, stopInterval])

  const switchMode = useCallback(
    (newMode) => {
      stopInterval()
      setRunning(false)
      setMode(newMode)
      // timeLeft will be updated by the workMins/breakMins/mode effect
    },
    [stopInterval],
  )

  return { mode, running, timeLeft, total, start, pause, reset, switchMode }
}
