import { useTimer } from 'react-timer-hook';
import { useEffect, useState } from 'react';

import { CirclePlay, CirclePause, RotateCcw, Plus, Settings } from "lucide-react";

import SettingsModal from "./SettingsModal";

//* Parâmetros desestruturados
function MyTimer(props) {

  const [play, setPlay] = useState(true);
  const [showModal, setShowModal] = useState(false);

  //* Tempo inicial para aparecer no cronómetro
  const initialTime = new Date();
  initialTime.setSeconds(initialTime.getSeconds() + props.focusSeconds);

  //* Auxiliar variables
  const fiveMinutes = 60 * 5;
  const tenMinutes = 60 * 10;

  //* Função auxiliar para calcular os segundos de cada modo
  const calcSeconds = () => {
    const newTime = new Date();

    if (props.modeStatus == "focus")
      newTime.setSeconds(newTime.getSeconds() + props.focusSeconds);

    if (props.modeStatus == "small-break")
      newTime.setSeconds(newTime.getSeconds() + props.smallBreakSeconds);

    if (props.modeStatus == "long-break")
      newTime.setSeconds(newTime.getSeconds() + props.longBreakSeconds);

    return newTime;
  }

  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    pause,
    resume,
    restart,

  } = useTimer(
    //! Modificar isto
    {
      expiryTimestamp: initialTime, onExpire: () => console.warn('onExpire called'),
      interval: 20,
      autoStart: false
    });

  const switchIcon = (state) => {
    setPlay(state)
    if (!state)
      resume()
    else
      pause()
  }

  useEffect(() => {

    //? Quando o modo muda, atualiza os segundos
    const newTime = calcSeconds();
    restart(newTime, false);
    setPlay(true);
  }, [props.modeStatus, props.focusSeconds, props.smallBreakSeconds, props.longBreakSeconds])

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
          className="flex flex-row bg-darker-green py-5 px-8 text-2xl gap-2 cursor-pointer rounded-lg hover:bg-hover-darker-green"
          onClick={() => {
            const time = new Date();
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
            const time = calcSeconds();
            restart(time, false);
            switchIcon(true);
          }} />
        </button>
        <button
          className="flex flex-row bg-darker-green py-5 px-8 text-2xl gap-2 cursor-pointer rounded-lg hover:bg-hover-darker-green"
          onClick={() => {
            const time = new Date();
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
        className="flex flex-row bg-darker-green py-5 px-15 text-2xl gap-2 cursor-pointer mt-5 rounded-lg hover:bg-hover-darker-green"
        onClick={() => setShowModal(true)}
      >
        <Settings size={30} />
        Settings
      </button>

      <SettingsModal
        isOpen={showModal}
        setIsOpen={setShowModal}

        //? Valores em segundos de cada modo
        focusTime={props.focusSeconds}
        smallBreakTime={props.smallBreakSeconds}
        longBreakTime={props.longBreakSeconds}

        //? Funções para mudar os segundos de cada modo
        switchFocusTime={props.changeFocusTime}
        switchSmallBreakTime={props.changeSmallBreakTime}
        switchLongBreakTime={props.changeLongBreakTime}
      />
    </div>
  );
}

export default MyTimer;