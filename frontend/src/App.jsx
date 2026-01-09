import { useEffect, useState } from "react";

function App() {

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
      {/* Secção para botoes e afins */}
      <section>
        
      </section>
      <main>
        {/* timer */}
      </main>
    </>
  )
}

export default App
