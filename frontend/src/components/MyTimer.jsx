import { useTimer } from 'react-timer-hook';
import { useEffect, useState } from 'react';

import { CirclePlay, CirclePause } from "lucide-react";

function MyTimer({ expiryTimestamp }) {

  const [play, setPlay] = useState(true);

  const {
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
          (<CirclePlay size={150} color="black" strokeWidth={1} className="cursor-pointer" onClick={() => switchIcon(false)} />)}
        {!play && 
          (<CirclePause size={150} color="black" strokeWidth={1} className="cursor-pointer" onClick={() => switchIcon(true)} />)}
        <span className="text-light-green mt-10 text-4xl font-semibold">{formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}</span>

      {/* <button onClick={() => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 300);
        restart(time)
      }}>Restart</button> */}
    </div>
  );
}

export default MyTimer;