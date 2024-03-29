import { useEffect, useMemo, useState } from "react";
import "./App.css";
import ButtonGroup from "./Components/ButtonGroup";
import QuestionBox from "./Components/QuestionBox";
import AnswerBox from "./Components/AnswerBox";
import jsonData from "./data/questions.json";
import FinalBox from "./Components/FinalBox";
import StartBox from "./Components/StartBox";

function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    Array(jsonData.length).fill(null)
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const handleStart = () => {
    if (!isStart) {
      setIsStart(true);
      setQuestionIndex(0);
      setUserAnswers(Array(jsonData.length).fill(null));
      setIsSubmitted(false);
      setIsTimeUp(false);
    }
  };

  useEffect(() => {
    if (isTimeUp && !isSubmitted) {
      setIsSubmitted(true);
    }
  }, [isTimeUp, isSubmitted]);

  const handleTimeUp = () => {
    setIsTimeUp(true);
  };

  const isLastQuestion = useMemo(
    () => questionIndex === jsonData.length - 1,
    [questionIndex]
  );

  const isFirstQuestion = useMemo(() => questionIndex === 0, [questionIndex]);

  const nextQuestion = () => {
    setQuestionIndex((prev) => Math.min(prev + 1, jsonData.length - 1));
  };
  const prevQuestion = () => {
    setQuestionIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setUserAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = answerIndex;
      console.log(newAnswers);
      return newAnswers;
    });
  };

  const currentQuestion = jsonData[questionIndex];

  const handleSubmit = () => {
    const confirmSubmit = window.confirm("Do you want to submit answers?");
    if (confirmSubmit === true) {
      setIsSubmitted(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    jsonData.forEach((question, index) => {
      const userAnswerIndex = userAnswers[index];
      if (
        userAnswerIndex !== null &&
        question.answers[userAnswerIndex].correct
      ) {
        score++;
      }
    });
    return score;
  };

  const resetApp = () => {
    setQuestionIndex(0);
    setUserAnswers(Array(jsonData.length).fill(null));
    setIsSubmitted(false);
    setIsStart(false);
    setIsTimeUp(false);
  };

  if (!isStart) {
    return <StartBox handleStart={handleStart} />;
  }

  if (isSubmitted || isTimeUp) {
    return (
      <FinalBox
        score={calculateScore()}
        resetApp={resetApp}
        userAnswers={userAnswers}
      />
    );
  }

  return (
    <>
      <ButtonGroup
        count={questionIndex + 1}
        onPrevClick={prevQuestion}
        onNextClick={nextQuestion}
        onSubmit={handleSubmit}
        isLastQuestion={isLastQuestion}
        isFirstQuestion={isFirstQuestion}
      />
      <QuestionBox
        questionTitle={currentQuestion.question_content}
        questionIndex={parseInt(currentQuestion.id)}
        handleTimeUp={handleTimeUp}
      />
      <AnswerBox
        key={currentQuestion.id}
        answers={currentQuestion?.answers}
        onAnswerSelected={handleAnswerSelect}
        userAnswer={userAnswers[questionIndex]}
      />
    </>
  );
}

export default App;
