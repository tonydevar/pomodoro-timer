export default function ModeSelector({
  mode,
  workMins,
  breakMins,
  running,
  onSwitchMode,
  onWorkMinsChange,
  onBreakMinsChange,
}) {
  return (
    <div className="mode-selector">
      <div className="mode-tabs">
        <button
          className={`mode-tab${mode === 'work' ? ' mode-tab--active' : ''}`}
          onClick={() => onSwitchMode('work')}
          disabled={running}
        >
          Work
        </button>
        <button
          className={`mode-tab${mode === 'break' ? ' mode-tab--active' : ''}`}
          onClick={() => onSwitchMode('break')}
          disabled={running}
        >
          Break
        </button>
      </div>

      <div className="duration-inputs">
        <label className="duration-label">
          Work
          <input
            type="number"
            className="duration-input"
            min="1"
            max="60"
            value={workMins}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10)
              if (!isNaN(v) && v >= 1 && v <= 60) onWorkMinsChange(v)
            }}
            disabled={running}
          />
          min
        </label>
        <label className="duration-label">
          Break
          <input
            type="number"
            className="duration-input"
            min="1"
            max="30"
            value={breakMins}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10)
              if (!isNaN(v) && v >= 1 && v <= 30) onBreakMinsChange(v)
            }}
            disabled={running}
          />
          min
        </label>
      </div>
    </div>
  )
}
