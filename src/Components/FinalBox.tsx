// FinalBox.tsx

import React, { Fragment, useState } from "react";
import style from "../style/Main.module.css";
import ReviewBox from "./ReviewBox";
import jsonData from "../data/questions.json";

interface FinalBoxProps {
  score: number;
  resetApp: () => void;
  userAnswers: number[];
}

const FinalBox: React.FC<FinalBoxProps> = ({
  score,
  resetApp,
  userAnswers,
}) => {
  const [showReviewBox, setShowReviewBox] = useState(false);

  const handleReviewClick = () => {
    setShowReviewBox(true);
  };

  return (
    <div className={style.finalBox}>
      {!showReviewBox && (
        <Fragment>
          <h2>Your score is : {score}</h2>
          <button className={`${style.nextBtn} main-button`} onClick={resetApp}>
            Try again
          </button>
          <button
            onClick={handleReviewClick}
            className={`${style.reviewBtn} main-button`}
          >
            Review
          </button>
        </Fragment>
      )}

      {showReviewBox && (
        <ReviewBox
          questions={jsonData}
          onRestart={resetApp}
          userAnswers={userAnswers}
        />
      )}
    </div>
  );
};

export default FinalBox;
