import React from "react";
import Timer from "./Timer";
import style from "../style/Main.module.css";
import jsonData from "../data/questions.json";

interface questionBoxProps {
  questionIndex: number;
  questionTitle: string;
  handleTimeUp: () => void;
}

const QuestionBox: React.FC<questionBoxProps> = ({
  questionIndex,
  questionTitle,
  handleTimeUp,
}) => {
  console.log(jsonData);
  return (
    <div className={style.questionBox}>
      <Timer onTimeUp={handleTimeUp} />
      <div>
        <p className={style.questionNumber}>
          Question <span>{questionIndex}</span>/{jsonData.length}
        </p>
        <p className={style.questionTitle}>{questionTitle}</p>
      </div>
    </div>
  );
};

export default QuestionBox;
