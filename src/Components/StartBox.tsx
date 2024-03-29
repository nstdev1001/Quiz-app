import React from "react";
import style from "../style/Main.module.css";

interface StartBoxProps {
  handleStart: () => void;
}

const StartBox: React.FC<StartBoxProps> = ({ handleStart }) => {
  return (
    <div className={style.startWrapper}>
      <h1>Welcome to React Quiz Game</h1>
      <button onClick={handleStart} className={`${style.startBtn} main-button`}>
        Start
      </button>
    </div>
  );
};

export default StartBox;
