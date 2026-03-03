const RADIUS = 45
const CX = 50
const CY = 50
const CIRCUMFERENCE = 2 * Math.PI * RADIUS // ≈ 282.743

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function TimerDisplay({ timeLeft, total, mode }) {
  const progress = total > 0 ? timeLeft / total : 1
  const dashOffset = CIRCUMFERENCE * (1 - progress)

  return (
    <div className="timer-display">
      <svg
        className="progress-ring"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        {/* Background track */}
        <circle
          cx={CX}
          cy={CY}
          r={RADIUS}
          fill="none"
          stroke="var(--color-track)"
          strokeWidth="6"
        />
        {/* Progress arc */}
        <circle
          cx={CX}
          cy={CY}
          r={RADIUS}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
      </svg>
      <div className="timer-countdown">
        <span className="timer-time">{formatTime(timeLeft)}</span>
        <span className="timer-mode">{mode === 'work' ? 'Focus' : 'Break'}</span>
      </div>
    </div>
  )
}
