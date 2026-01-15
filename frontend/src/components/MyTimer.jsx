import { useTimer } from 'react-timer-hook';
import { useEffect, useState } from 'react';

import { CirclePlay, CirclePause, RotateCcw, Plus, Settings } from "lucide-react";

//* Parâmetros deestruturados
function MyTimer({ expiryTimestamp, amountOfTime }) {

  const [play, setPlay] = useState(true);

  //* Auxiliar variables
  const fiveMinutes = 60*5;
  const tenMinutes = 60*10;

  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    pause,
    resume,
    restart,
    
  } = useTimer(
    { expiryTimestamp, onExpire: () => console.warn('onExpire called'), 
      interval: 20 ,
      autoStart: false
    });

  const switchIcon = (state) => {
    setPlay(state)
    if(!state)
      resume()
    else
      pause()
  }

  useEffect(() => {
    restart(expiryTimestamp, false); 
    setPlay(true);
  }, [expiryTimestamp])

  const formatTime = (time) => String(time).padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
        {play && 
          (<button><CirclePlay size={150} color="black" strokeWidth={1} className="cursor-pointer" onClick={() => switchIcon(false)} /></button>)}
        {!play && 
          (<button><CirclePause size={150} color="black" strokeWidth={1} className="cursor-pointer" onClick={() => switchIcon(true)} /></button>)}
        <span className="text-light-green mt-10 text-4xl font-semibold">{formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}</span>

        <div className="flex flex-row gap-10 mt-10">
          <button 
            className="flex flex-row bg-darker-green py-5 px-8 text-2xl gap-2 cursor-pointer rounded-lg"
            onClick={() => {
              let time = new Date();
              time.setSeconds(time.getSeconds() + totalSeconds + fiveMinutes);
              //? Coloca o ícone de "Pause"
              switchIcon(false);
              restart(time);
            }}
          >
            <Plus size={30} />
            5:00
          </button>
          <button>
            <RotateCcw size={60} className="cursor-pointer" onClick={() => {
              //? Reinicia o tempo selecionado e muda o ícone para "Play"
              let time = new Date();
              time.setSeconds(time.getSeconds() + amountOfTime);
              restart(time, false);
              switchIcon(true);
             }}/>
          </button>
          <button 
            className="flex flex-row bg-darker-green py-5 px-8 text-2xl gap-2 cursor-pointer rounded-lg"
            onClick={() => {
              let time = new Date();
              time.setSeconds(time.getSeconds() + totalSeconds + tenMinutes);
              //? Coloca o ícone de "Pause"
              switchIcon(false);
              restart(time);
            }}
          >
            <Plus size={30} />
            10:00
          </button>
        </div>
        <button 
          className="flex flex-row bg-darker-green py-5 px-15 text-2xl gap-2 cursor-pointer mt-5 rounded-lg"
        >
          <Settings size={30} />
          Settings
        </button>
    </div>
  );
}

export default MyTimer;