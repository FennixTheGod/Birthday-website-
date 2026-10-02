import React, { useState } from 'react';
import { Gamepad2, Award, RotateCcw, CheckCircle2, XCircle, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteContent } from '../data/siteContent';

export default function QuizGame() {
  const { quiz } = siteContent;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleOptionSelect = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const questionObj = quiz.questions[currentQuestion];
    if (index === questionObj.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setIsAnswered(false);
    setIsFinished(false);
  };

  const questionObj = quiz.questions[currentQuestion];

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl border-2 border-[#F5D3E0] p-6 sm:p-8 shadow-xl space-y-6">
      
      {/* Quiz Header */}
      <div className="flex items-center justify-between border-b border-[#F5D3E0] pb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-[#FCE4ED] border border-[#F5D3E0] flex items-center justify-center text-[#E86F9A]">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#493744] text-lg sm:text-xl">
              {quiz.sectionTitle}
            </h3>
            <p className="text-xs text-[#8C6A7D]">
              {quiz.sectionSubtitle}
            </p>
          </div>
        </div>

        {!isFinished && (
          <span className="text-xs font-bold text-[#D84B79] bg-[#FCE4ED] px-3 py-1 rounded-full border border-[#F5D3E0]">
            Question {currentQuestion + 1} / {quiz.questions.length}
          </span>
        )}
      </div>

      {!isFinished ? (
        <div className="space-y-6">
          
          {/* Question Box */}
          <div className="bg-[#FFF5F8] p-5 rounded-2xl border border-[#F5D3E0]">
            <h4 className="text-lg sm:text-xl font-bold text-[#493744] flex items-start gap-2">
              <Sparkles className="w-5 h-5 text-[#E86F9A] shrink-0 mt-1" />
              <span>{questionObj.question}</span>
            </h4>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-3">
            {questionObj.options.map((option, idx) => {
              let btnStyle = 'bg-white text-[#493744] border-[#F5D3E0] hover:bg-[#FFF5F8]';
              
              if (isAnswered) {
                if (idx === questionObj.correctIndex) {
                  btnStyle = 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold';
                } else if (selectedOption === idx) {
                  btnStyle = 'bg-rose-50 text-rose-700 border-rose-300 font-bold';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-2xl border-2 text-left text-sm sm:text-base font-semibold transition-all duration-200 flex items-center justify-between cursor-pointer ${btnStyle}`}
                >
                  <span>{option}</span>
                  {isAnswered && idx === questionObj.correctIndex && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  )}
                  {isAnswered && selectedOption === idx && idx !== questionObj.correctIndex && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation & Next Step */}
          {isAnswered && (
            <div className="space-y-4 pt-2 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-[#FCE4ED] text-[#D84B79] text-xs sm:text-sm font-medium border border-[#F5D3E0]">
                {questionObj.explanation}
              </div>

              <button
                onClick={nextQuestion}
                className="w-full py-3.5 bg-[#E86F9A] hover:bg-[#D84B79] text-white font-bold rounded-2xl shadow-md transition-all cursor-pointer"
              >
                {currentQuestion + 1 < quiz.questions.length ? 'Next Question →' : 'See Your Score 🎉'}
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Results Screen */
        <div className="text-center py-6 space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#FCE4ED] border-2 border-[#E86F9A] flex items-center justify-center text-[#E86F9A] mx-auto shadow-inner">
            <Award className="w-10 h-10 animate-bounce" />
          </div>

          <div className="space-y-2">
            <h4 className="text-2xl font-bold text-[#493744]">
              Quiz Completed! 💗
            </h4>
            <p className="text-xl font-bold text-[#E86F9A]">
              Score: {score} / {quiz.questions.length}
            </p>
            <p className="text-sm text-[#8C6A7D] max-w-sm mx-auto">
              {score === quiz.questions.length
                ? quiz.results.perfect
                : score >= quiz.questions.length / 2
                ? quiz.results.good
                : quiz.results.tryAgain}
            </p>
          </div>

          <button
            onClick={restartQuiz}
            className="px-6 py-3 bg-[#E86F9A] hover:bg-[#D84B79] text-white font-bold rounded-2xl shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again</span>
          </button>
        </div>
      )}

    </div>
  );
}
