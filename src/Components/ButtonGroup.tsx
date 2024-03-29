import React from "react";
import style from "../style/Main.module.css";

interface ButtonGroupProps {
  count: number;
  onPrevClick: () => void;
  onNextClick: () => void;
  onSubmit: () => void;
  isLastQuestion: boolean;
  isFirstQuestion: boolean;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  onPrevClick,
  onNextClick,
  onSubmit,
  isLastQuestion,
  isFirstQuestion,
}) => {
  return (
    <div className={style.buttonGroup}>
      <button
        className={`${style.prevBtn} main-button ${
          isFirstQuestion ? style.disablePrevBtn : ""
        }`}
        onClick={onPrevClick}
      >
        Previous
      </button>
      <button
        className={`${style.nextBtn} main-button ${
          isLastQuestion ? style.disableNextBtn : ""
        }`}
        onClick={onNextClick}
      >
        Next
      </button>
      {isLastQuestion && (
        <button className={`${style.submitBtn} main-button`} onClick={onSubmit}>
          Submit
        </button>
      )}
    </div>
  );
};

export default ButtonGroup;
