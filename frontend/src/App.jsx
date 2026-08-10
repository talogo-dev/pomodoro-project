import { useEffect, useState } from "react";
import MyTimer from "./components/MyTimer";

function App() {

  const [focusTime, setFocusTime] = useState(25 * 60);
  const [smallBreakTime, setSmallBreakTime] = useState(5 * 60);
  const [longBreakTime, setLongBreakTime] = useState(15 * 60);
  const [mode, setMode] = useState("focus");

  const selected = "text-light-green cursor-pointer underline";
  const notSelected = "text-light-green cursor-pointer";

  return (
    <>
      <header className="flex flex-col pt-5">
        <h1 className="text-center text-4xl text-light-green">Pomodoro Timer</h1>
        <div className="mt-10 flex justify-center gap-10 text-xl">
          <span className={mode == "focus" ? selected : notSelected} onClick={() => setMode("focus")}>focus</span>
          <span className={mode == "small-break" ? selected : notSelected} onClick={() => setMode("small-break")}>small break</span>
          <span className={mode == "long-break" ? selected : notSelected} onClick={() => setMode("long-break")}>long break</span>
        </div>
      </header>
      <main className="flex flex-col justify-center items-center mt-30">
        <MyTimer
          modeStatus={mode}
          setModeStatus={setMode}
          focusSeconds={focusTime}
          smallBreakSeconds={smallBreakTime}
          longBreakSeconds={longBreakTime}
          changeFocusTime={setFocusTime}
          changeSmallBreakTime={setSmallBreakTime}
          changeLongBreakTime={setLongBreakTime} />
      </main>
    </>
  )
}

export default App;
