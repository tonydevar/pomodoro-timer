// Base URL: set VITE_API_URL to override (e.g. production); defaults to '' for Vite proxy
const BASE_URL = import.meta.env.VITE_API_URL ?? ''

/**
 * Fetch today's sessions from the backend.
 * @returns {Promise<Array>}
 */
export async function getSessions() {
  const res = await fetch(`${BASE_URL}/api/sessions`)
  if (!res.ok) throw new Error(`GET /api/sessions failed: ${res.status}`)
  return res.json()
}

/**
 * Save a completed session to the backend.
 * @param {{ type: string, duration: number, timestamp: string }} session
 * @returns {Promise<Object>} saved session with generated id
 */
export async function postSession({ type, duration, timestamp }) {
  const res = await fetch(`${BASE_URL}/api/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, duration, timestamp }),
  })
  if (!res.ok) throw new Error(`POST /api/sessions failed: ${res.status}`)
  return res.json()
}
