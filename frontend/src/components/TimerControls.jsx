export default function TimerControls({ running, onStart, onPause, onReset }) {
  return (
    <div className="timer-controls">
      {running ? (
        <button className="btn btn--primary" onClick={onPause}>
          Pause
        </button>
      ) : (
        <button className="btn btn--primary" onClick={onStart}>
          Start
        </button>
      )}
      <button className="btn btn--secondary" onClick={onReset}>
        Reset
      </button>
    </div>
  )
}
