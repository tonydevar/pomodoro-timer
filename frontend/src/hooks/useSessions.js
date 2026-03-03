import { useState, useEffect, useCallback } from 'react'
import { getSessions, postSession } from '../services/api'

export function useSessions() {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchSessions = useCallback(async () => {
    try {
      const data = await getSessions()
      setSessions(data)
    } catch (_) {
      // Backend may not be running in static/preview mode; degrade gracefully
    } finally {
      setLoading(false)
    }
  }, [])

  // Load sessions on mount
  useEffect(() => {
    fetchSessions()
  }, [fetchSessions])

  /**
   * POST a completed session then refresh the list.
   * @param {string} type  'work' | 'break'
   * @param {number} duration  seconds
   */
  const saveSession = useCallback(
    async (type, duration) => {
      try {
        await postSession({ type, duration, timestamp: new Date().toISOString() })
        await fetchSessions()
      } catch (_) {
        // Backend unavailable — skip silently
      }
    },
    [fetchSessions],
  )

  return { sessions, loading, saveSession }
}
