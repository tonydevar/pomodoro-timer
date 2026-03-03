function formatDuration(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return s > 0 ? `${m}m ${s}s` : `${m}m`
}

function formatTimestamp(isoString) {
  return new Date(isoString).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function SessionHistory({ sessions, loading }) {
  const workCount = sessions.filter((s) => s.type === 'work').length

  return (
    <div className="session-history">
      <div className="session-history__header">
        <h2 className="session-history__title">Today&rsquo;s Sessions</h2>
        <span className="session-history__count" aria-label={`${workCount} pomodoros completed`}>
          🍅 {workCount} pomodoro{workCount !== 1 ? 's' : ''}
        </span>
      </div>

      {loading ? (
        <p className="session-history__empty">Loading…</p>
      ) : sessions.length === 0 ? (
        <p className="session-history__empty">
          No sessions yet — start your first pomodoro!
        </p>
      ) : (
        <ul className="session-list">
          {sessions
            .slice()
            .reverse()
            .map((s) => (
              <li key={s.id} className="session-item">
                <span className="session-item__icon">
                  {s.type === 'work' ? '🍅' : '☕'}
                </span>
                <span className="session-item__label">
                  {s.type === 'work' ? 'Work' : 'Break'}
                </span>
                <span className="session-item__duration">{formatDuration(s.duration)}</span>
                <span className="session-item__time">{formatTimestamp(s.timestamp)}</span>
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}
