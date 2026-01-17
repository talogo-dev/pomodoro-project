import { useTimer } from 'react-timer-hook';
import { useEffect, useState } from 'react';

import { CirclePlay, CirclePause, RotateCcw, Plus, Settings } from "lucide-react";

import SettingsModal from "./SettingsModal";
import dingSound from "../assets/sound-effect-ding.mp3";

//* Parâmetros desestruturados
function MyTimer(props) {

  const [play, setPlay] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [goNext, setGoNext] = useState(false);

  //? Começa em 1 porque o modo focus está ativo por default
  const [counter, setCounter] = useState(1);
  const [countSession, setCountSession] = useState(0);

  //* Tempo inicial para aparecer no cronómetro
  const initialTime = new Date();
  initialTime.setSeconds(initialTime.getSeconds() + props.focusSeconds);

  //* Variáveis auxiliares
  const fiveMinutes = 60 * 5;
  const tenMinutes = 60 * 10;
  const finishAudio = new Audio(dingSound);

  //* Função para formatar o tempo
  const formatTime = (time) => String(time).padStart(2, '0');

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
    {
      expiryTimestamp: initialTime, 
      onExpire: () => {
        //? Antes de trocar o modo, espera 1 segundo para não parecer estranho
        setTimeout(nextMode, 1000)
      },
      interval: 1000,
      autoStart: true
    });
  
  //* Função para calcular as sessões
  const nextMode = () => {

    //? Se o contador estiver estiver a 8 (significa que foi 4 "focus"), 
    //? entra em modo "long-break" e conta uma sessão
    if(counter == 8)
    {
      setGoNext(true);
      setCounter(0);
      setCountSession(countSession + 1);
      props.setModeStatus("long-break");
    }
    else
    {
      //? Verifica se o modo está no "Focus"
      if(props.modeStatus == "focus")
      {
        setGoNext(true);
        setCounter(counter + 1);
        props.setModeStatus("small-break");
      }

      //? Verifica se o modo está como "small-break"
      if(props.modeStatus == "small-break")
      {
        setGoNext(true);
        setCounter(counter + 1);
        props.setModeStatus("focus");
      }

      //? Verifica se o modo está como "long-break"
      if(props.modeStatus == "long-break")
      {
        props.setModeStatus("focus");
      }
    }
  }

  //* Função para alterar o ícone
  const switchIcon = (state) => {
    setPlay(state)
    if (!state)
      resume()
    else
      pause()
  }

  useEffect(() => {
    //? Quando o modo muda, atualiza os segundos

    //* Calcula o tempo em segundos
    const newTime = calcSeconds();
    //* Se for para trocar de modo reinicia com o tempo do novo modo e começa a correr
    if(goNext == true)
    {
      finishAudio.play();
      restart(newTime, true);
      setPlay(false);
      setGoNext(false);
    }else
    {
      //* Senão apenas atribui o novo tempo
      restart(newTime, false);
      setPlay(true);
    }
  }, [props.modeStatus, props.focusSeconds, props.smallBreakSeconds, props.longBreakSeconds])

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
      
      <p className="text-3xl text-light-green mt-10">Total Sessions: {countSession}</p>
      <button
        className="bg-darker-green py-2 px-5 text-lg cursor-pointer mt-2 rounded-lg hover:bg-hover-darker-green"
        onClick={() => setCountSession(0)}
      >Reset</button>

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