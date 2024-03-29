import React from "react";
import style from "../style/Main.module.css";

interface AnswerBoxProps {
  answers: { answer_content: string; correct: boolean }[];
  onAnswerSelected: (index: number) => void;
  userAnswer: number | null;
}

const AnswerBox: React.FC<AnswerBoxProps> = ({
  answers,
  onAnswerSelected,
  userAnswer,
}) => {
  return (
    <div className={style.answerBox}>
      {answers.map((answer, index) => (
        <p
          key={index}
          className={`${style.answerTitle} ${
            userAnswer === index ? style.selectedAnswer : ""
          }`}
          onClick={() => onAnswerSelected(index)}
        >
          {index + 1}. {answer.answer_content}
        </p>
      ))}
    </div>
  );
};

export default AnswerBox;
