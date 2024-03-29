import React, { useEffect, useState } from "react";
import style from "../style/Main.module.css";

const Timer = ({ onTimeUp }: any) => {
  const [time, setTime] = useState({ minutes: 1, seconds: 30 });
  const [isRunningOut, setIsRunningOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime.seconds === 0) {
          if (prevTime.minutes === 0) {
            clearInterval(timer);
            onTimeUp();
            return prevTime;
          } else {
            return { minutes: prevTime.minutes - 1, seconds: 59 };
          }
        } else {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        }
      });

      if (time.minutes === 0 && time.seconds < 10) {
        setIsRunningOut(true);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { minutes, seconds } = time;
  const totalSeconds = minutes * 60 + seconds;
  const dashOffset = (188 * (90 - totalSeconds)) / 90;

  return (
    <div className={style.timerBox}>
      <svg>
        <circle className={style.circle1} cx={35} cy={35} r={30} />
        <circle
          strokeDashoffset={dashOffset}
          className={`${style.circle2} ${isRunningOut && style.runningOut}`}
          cx={35}
          cy={35}
          r={30}
        />
      </svg>
      <p className={style.time}>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </p>
    </div>
  );
};

export default Timer;
