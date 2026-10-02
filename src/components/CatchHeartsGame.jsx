import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, Trophy, RotateCcw, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteContent } from '../data/siteContent';

export default function CatchHeartsGame() {
  const { catchHearts } = siteContent;
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(catchHearts.gameDuration);
  const [hearts, setHearts] = useState([]);
  const nextHeartId = useRef(0);

  // Timer countdown
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    if (timeLeft <= 0) {
      setGameOver(true);
      if (score >= catchHearts.winTarget) {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameOver, timeLeft, score, catchHearts.winTarget]);

  // Spawning floating hearts
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const spawnInterval = setInterval(() => {
      const id = nextHeartId.current++;
      const left = Math.random() * 80 + 10; // 10% to 90%
      const speed = Math.random() * 2 + 2; // 2s to 4s
      const size = Math.floor(Math.random() * 16) + 28; // 28px to 44px

      setHearts((prev) => [
        ...prev.slice(-12), // Limit active hearts
        { id, left, speed, size },
      ]);
    }, 700);

    return () => clearInterval(spawnInterval);
  }, [gameStarted, gameOver]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(catchHearts.gameDuration);
    setHearts([]);
  };

  const catchHeart = (id) => {
    setScore((prev) => prev + 1);
    setHearts((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl border-2 border-[#F5D3E0] p-6 sm:p-8 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#F5D3E0] pb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-[#FCE4ED] border border-[#F5D3E0] flex items-center justify-center text-[#E86F9A]">
            <Heart className="w-5 h-5 fill-[#E86F9A]" />
          </div>
          <div>
            <h3 className="font-bold text-[#493744] text-lg sm:text-xl">
              {catchHearts.title}
            </h3>
            <p className="text-xs text-[#8C6A7D]">
              {catchHearts.subtitle}
            </p>
          </div>
        </div>

        {gameStarted && !gameOver && (
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#493744] bg-[#FFF5F8] px-3 py-1 rounded-full border border-[#F5D3E0]">
              Score: <strong className="text-[#E86F9A] text-sm">{score}</strong>
            </span>
            <span className="text-xs font-bold text-[#493744] bg-[#FFF5F8] px-3 py-1 rounded-full border border-[#F5D3E0]">
              Time: <strong className="text-[#E86F9A] text-sm">{timeLeft}s</strong>
            </span>
          </div>
        )}
      </div>

      {/* Game Stage Arena */}
      <div className="relative h-72 sm:h-80 w-full bg-gradient-to-b from-[#FFF5F8] to-[#FCE4ED]/40 rounded-2xl border border-[#F5D3E0] overflow-hidden flex items-center justify-center select-none">
        
        {!gameStarted && (
          <div className="text-center p-6 space-y-4 max-w-sm">
            <div className="w-16 h-16 rounded-2xl bg-white border border-[#F5D3E0] flex items-center justify-center text-[#E86F9A] mx-auto shadow-md">
              <Sparkles className="w-8 h-8" />
            </div>
            <p className="text-sm text-[#8C6A7D] leading-relaxed">
              Tap as many rising hearts as you can in 15 seconds!
            </p>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-[#E86F9A] hover:bg-[#D84B79] text-white font-bold rounded-2xl shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Game</span>
            </button>
          </div>
        )}

        {gameStarted && !gameOver && (
          <div className="absolute inset-0">
            {hearts.map((h) => (
              <button
                key={h.id}
                onClick={() => catchHeart(h.id)}
                style={{
                  left: `${h.left}%`,
                  animationDuration: `${h.speed}s`,
                }}
                className="absolute bottom-0 -translate-x-1/2 cursor-pointer animate-float-up focus:outline-none transform hover:scale-125 transition-transform"
              >
                <Heart
                  style={{ width: `${h.size}px`, height: `${h.size}px` }}
                  className="fill-[#E86F9A] text-[#D84B79] drop-shadow-md"
                />
              </button>
            ))}
          </div>
        )}

        {gameOver && (
          <div className="text-center p-6 space-y-4 max-w-sm animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#FCE4ED] border border-[#F5D3E0] flex items-center justify-center text-[#E86F9A] mx-auto shadow-inner">
              <Trophy className="w-8 h-8 animate-bounce" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-bold text-[#493744]">
                Game Over! 🎉
              </h4>
              <p className="text-[#E86F9A] font-bold text-lg">
                You caught {score} hearts!
              </p>
              <p className="text-xs text-[#8C6A7D]">
                {catchHearts.winMessage}
              </p>
            </div>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-[#E86F9A] hover:bg-[#D84B79] text-white font-bold rounded-2xl shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
