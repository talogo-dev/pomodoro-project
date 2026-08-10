import { useTimer } from 'react-timer-hook';
import { useEffect, useState } from 'react';

import { CirclePlay, CirclePause, RotateCcw, Plus, Settings } from "lucide-react";

import SettingsModal from "./SettingsModal";
import dingSound from "../assets/sound-effect-ding.mp3";

function MyTimer(props) {

  const [play, setPlay] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [goNext, setGoNext] = useState(false);
  const [counter, setCounter] = useState(1);
  const [countSession, setCountSession] = useState(0);

  const initialTime = new Date();
  initialTime.setSeconds(initialTime.getSeconds() + props.focusSeconds);

  const fiveMinutes = 60 * 5;
  const tenMinutes = 60 * 10;
  const finishAudio = new Audio(dingSound);

  const formatTime = (time) => String(time).padStart(2, '0');

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
        setTimeout(nextMode, 1000)
      },
      interval: 1000,
      autoStart: true
    });
  
  const nextMode = () => {
    if(counter == 8)
    {
      setGoNext(true);
      setCounter(0);
      setCountSession(countSession + 1);
      props.setModeStatus("long-break");
    }
    else
    {
      if(props.modeStatus == "focus")
      {
        setGoNext(true);
        setCounter(counter + 1);
        props.setModeStatus("small-break");
      }

      if(props.modeStatus == "small-break")
      {
        setGoNext(true);
        setCounter(counter + 1);
        props.setModeStatus("focus");
      }

      if(props.modeStatus == "long-break")
      {
        props.setModeStatus("focus");
      }
    }
  }

  const switchIcon = (state) => {
    setPlay(state)
    if (!state)
      resume()
    else
      pause()
  }

  useEffect(() => {
    const newTime = calcSeconds();
    if(goNext == true)
    {
      finishAudio.play();
      restart(newTime, true);
      setPlay(false);
      setGoNext(false);
    }else
    {
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

      <div className="flex md:flex-row flex-col md:gap-10 gap-5 mt-10">
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
        <button className="flex justify-center">
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
        className="bg-darker-green py-2 px-5 text-lg cursor-pointer mt-2 mb-5 rounded-lg hover:bg-hover-darker-green"
        onClick={() => setCountSession(0)}
      >Reset</button>

      <SettingsModal
        isOpen={showModal}
        setIsOpen={setShowModal}
        focusTime={props.focusSeconds}
        smallBreakTime={props.smallBreakSeconds}
        longBreakTime={props.longBreakSeconds}
        switchFocusTime={props.changeFocusTime}
        switchSmallBreakTime={props.changeSmallBreakTime}
        switchLongBreakTime={props.changeLongBreakTime}
      />
    </div>
  );
}

export default MyTimer;