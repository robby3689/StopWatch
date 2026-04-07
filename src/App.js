import "./index.css";
import { useEffect, useMemo, useState } from "react";

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const formatTime = (value) => {
    const minutes = String(Math.floor((value / 60000) % 60)).padStart(2, "0");
    const seconds = String(Math.floor((value / 1000) % 60)).padStart(2, "0");
    const centiseconds = String(Math.floor((value / 10) % 100)).padStart(2, "0");

    return `${minutes}:${seconds}.${centiseconds}`;
  };

  const fastestLap = useMemo(() => {
    if (laps.length < 2) {
      return null;
    }

    let smallest = Infinity;
    let smallestIndex = -1;

    for (let i = 0; i < laps.length; i += 1) {
      const nextTotal = laps[i - 1] ?? 0;
      const lapDuration = laps[i] - nextTotal;

      if (lapDuration < smallest) {
        smallest = lapDuration;
        smallestIndex = i;
      }
    }

    return smallestIndex;
  }, [laps]);

  const slowestLap = useMemo(() => {
    if (laps.length < 2) {
      return null;
    }

    let largest = -Infinity;
    let largestIndex = -1;

    for (let i = 0; i < laps.length; i += 1) {
      const nextTotal = laps[i - 1] ?? 0;
      const lapDuration = laps[i] - nextTotal;

      if (lapDuration > largest) {
        largest = lapDuration;
        largestIndex = i;
      }
    }

    return largestIndex;
  }, [laps]);

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [running]);

  const handleReset = () => {
    setRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (!running) {
      return;
    }

    setLaps((prev) => [...prev, time]);
  };

  return (
    <main className="page-shell">
      <section className="orb orb-left" aria-hidden="true" />
      <section className="orb orb-right" aria-hidden="true" />

      <div className="stopwatch-card">
        <p className="eyebrow">Timekeeper</p>
        <h1>Stopwatch</h1>

        <div className="time-display" aria-live="polite">
          {formatTime(time)}
        </div>

        <div className="controls">
          <button
            className={`btn ${running ? "btn-stop" : "btn-start"}`}
            onClick={() => setRunning((prev) => !prev)}
          >
            {running ? "Pause" : "Start"}
          </button>

          <button className="btn btn-lap" onClick={handleLap} disabled={!running}>
            Lap
          </button>

          <button className="btn btn-reset" onClick={handleReset}>
            Reset
          </button>
        </div>

        <div className="laps-panel">
          <h2>Laps</h2>
          {laps.length === 0 ? (
            <p className="empty-state">Start the timer and press Lap to track splits.</p>
          ) : (
            <ul>
              {[...laps].reverse().map((lapTime, reversedIndex) => {
                const originalIndex = laps.length - 1 - reversedIndex;
                const previousTotal = laps[originalIndex - 1] ?? 0;
                const split = lapTime - previousTotal;

                return (
                  <li
                    key={originalIndex}
                    className={[
                      originalIndex === fastestLap ? "lap-fastest" : "",
                      originalIndex === slowestLap ? "lap-slowest" : "",
                    ]
                      .join(" ")
                      .trim()}
                  >
                    <span>Lap {originalIndex + 1}</span>
                    <span>{formatTime(split)}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
