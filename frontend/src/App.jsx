import { useState } from 'react'
import { useTimer } from './hooks/useTimer'
import { useSessions } from './hooks/useSessions'
import ModeSelector from './components/ModeSelector'
import TimerDisplay from './components/TimerDisplay'
import TimerControls from './components/TimerControls'
import SessionHistory from './components/SessionHistory'

export default function App() {
  const [workMins, setWorkMins] = useState(25)
  const [breakMins, setBreakMins] = useState(5)

  const { sessions, loading, saveSession } = useSessions()

  const { mode, running, timeLeft, total, start, pause, reset, switchMode } =
    useTimer({
      workMins,
      breakMins,
      // Called when a session completes: persist to backend + refresh history
      onComplete: (completedMode, duration) => saveSession(completedMode, duration),
    })

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🍅 Pomodoro</h1>
      </header>

      <main className="app-main">
        <div className="card">
          <ModeSelector
            mode={mode}
            workMins={workMins}
            breakMins={breakMins}
            running={running}
            onSwitchMode={switchMode}
            onWorkMinsChange={setWorkMins}
            onBreakMinsChange={setBreakMins}
          />

          <TimerDisplay timeLeft={timeLeft} total={total} mode={mode} />

          <TimerControls
            running={running}
            onStart={start}
            onPause={pause}
            onReset={reset}
          />
        </div>

        <SessionHistory sessions={sessions} loading={loading} />
      </main>
    </div>
  )
}
