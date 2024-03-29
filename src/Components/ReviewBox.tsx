import React, { Fragment, useMemo, useState } from "react";
import style from "../style/Main.module.css";
import jsonData from "../data/questions.json";

interface ReviewBoxProps {
  questions: { id: string; question_content: string; answers: any[] }[];
  onRestart: () => void;
  userAnswers: number[];
}

const ReviewBox: React.FC<ReviewBoxProps> = ({
  questions,
  onRestart,
  userAnswers,
}) => {
  const [questionIndex, setQuestionIndex] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions.length - 1)
    );
    setQuestionIndex((prev) => Math.min(prev + 1, jsonData.length));
  };

  const goToPrevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setQuestionIndex((prev) => Math.max(prev - 1, 1));
  };

  const currentQuestion = questions[currentQuestionIndex];

  const isLastQuestion = useMemo(
    () => questionIndex === jsonData.length,
    [questionIndex]
  );

  const isFirstQuestion = useMemo(() => questionIndex === 1, [questionIndex]);

  return (
    <Fragment>
      <div className={style.buttonGroup}>
        <button
          className={`${style.prevBtn} main-button ${
            isFirstQuestion ? style.disablePrevBtn : ""
          }`}
          onClick={goToPrevQuestion}
        >
          Previous
        </button>
        <button
          className={`${style.nextBtn} main-button ${
            isLastQuestion ? style.disableNextBtn : ""
          }`}
          onClick={goToNextQuestion}
        >
          Next
        </button>
        <button
          className={`${style.submitBtn} main-button`}
          onClick={onRestart}
        >
          Restart
        </button>
      </div>

      <div className={style.questionBox}>
        <div className={style.timerBox}>
          <svg>
            <circle className={style.circle1} cx={35} cy={35} r={30} />
          </svg>
          <p className={style.timeReview}>End!</p>
        </div>
        <div>
          <p className={style.questionNumber}>
            Question <span>{questionIndex}</span>/{jsonData.length}
          </p>
          <p className={style.questionTitle}>
            {currentQuestion.question_content}
          </p>
        </div>
      </div>

      <div className={style.answerBox}>
        {currentQuestion.answers.map((answer, index) => (
          <p
            key={index}
            className={`${style.answerTitleReview} ${
              userAnswers[currentQuestionIndex] === index
                ? answer.correct
                  ? style.rightAnswer
                  : style.wrongAnswer
                : answer.correct
                ? style.rightAnswer
                : ""
            }`}
          >
            {index + 1}. {answer.answer_content}
          </p>
        ))}
      </div>
    </Fragment>
  );
};

export default ReviewBox;
