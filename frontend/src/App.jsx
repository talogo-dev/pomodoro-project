import { useEffect, useState } from "react";
import { RotateCcw, Plus } from "lucide-react";

import MyTimer from "./components/MyTimer";

function App() {

  const time = new Date();

  const [mode, setMode] = useState("focus");
  const [amountTime, setAmountTime] = useState(25*60);
  
  //
  const selected = "text-light-green cursor-pointer underline";
  const notSelected = "text-light-green cursor-pointer";

  time.setSeconds(time.getSeconds() + amountTime);

  const switchMode = (typeMode) => {
    if(typeMode == "focus")
    {
      setMode(typeMode);
      setAmountTime(25*60);
    }

    if(typeMode == "small-break")
    {
      setMode(typeMode);
      setAmountTime(5*60);
    }

    if(typeMode == "long-break")
    {
      setMode(typeMode);
      setAmountTime(15*60);
    }
  }

  return (
    <>
      <header className="flex flex-col pt-5">
        <h1 className="text-center text-4xl text-light-green">Pomodoro Timer</h1>
        <div className="mt-10 flex justify-center gap-10 text-xl">
          <span className={mode == "focus" ? selected : notSelected} onClick={() => switchMode("focus")}>focus</span>
          <span className={mode == "small-break" ? selected : notSelected} onClick={() => switchMode("small-break")}>small break</span>
          <span className={mode == "long-break" ? selected : notSelected} onClick={() => switchMode("long-break")}>long break</span>
        </div>
      </header>
      <main className="flex flex-col justify-center items-center mt-40">
        <MyTimer expiryTimestamp={time} amountOfTime={amountTime} />
      </main>
    </>
  )
}

export default App
