import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, Trophy, RotateCcw, Play, Award, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteContent } from '../data/siteContent';

export default function CatchHeartsGame() {
  const { catchHearts, recipientName } = siteContent;
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [hearts, setHearts] = useState([]);
  const [popEffects, setPopEffects] = useState([]);
  const nextHeartId = useRef(0);

  // Exact 15-second countdown timer
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    if (timeLeft <= 0) {
      setGameOver(true);
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
      });
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameOver, timeLeft]);

  // Spawning floating hearts of Sidhant
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const spawnInterval = setInterval(() => {
      const id = nextHeartId.current++;
      const left = Math.random() * 82 + 8; // 8% to 90%
      const speed = Math.random() * 1.5 + 2.2; // 2.2s to 3.7s
      const size = Math.floor(Math.random() * 16) + 32; // 32px to 48px

      setHearts((prev) => [
        ...prev.slice(-14), // Keep max 15 active floating hearts
        { id, left, speed, size },
      ]);
    }, 420);

    return () => clearInterval(spawnInterval);
  }, [gameStarted, gameOver]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(15);
    setHearts([]);
    setPopEffects([]);
  };

  const catchHeart = (e, id) => {
    e.stopPropagation();
    setScore((prev) => prev + 1);
    
    // Add floating "+1" pop effect at click position
    const rect = e.currentTarget.getBoundingClientRect();
    const popId = Date.now() + Math.random();
    setPopEffects((prev) => [
      ...prev,
      { id: popId, x: rect.left + rect.width / 2, y: rect.top },
    ]);

    // Remove popped heart
    setHearts((prev) => prev.filter((h) => h.id !== id));

    // Cleanup pop effect after animation
    setTimeout(() => {
      setPopEffects((prev) => prev.filter((p) => p.id !== popId));
    }, 600);
  };

  // Determine reward tier based on score
  const getRewardInfo = () => {
    const rewards = catchHearts.rewards || {};
    let rewardObj = rewards.cute;
    if (score >= 15) {
      rewardObj = rewards.legendary;
    } else if (score >= 8) {
      rewardObj = rewards.super;
    }

    const name = recipientName || "Trivi";
    const msg = (rewardObj.message || "")
      .replace(/\{score\}/g, score)
      .replace(/Trivi/g, name);

    return {
      title: rewardObj.title,
      badge: rewardObj.badge,
      message: msg,
    };
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl border-2 border-[#F5D3E0] p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
      
      {/* Floating +1 Pop Effects */}
      {popEffects.map((p) => (
        <div
          key={p.id}
          style={{ left: `${p.x}px`, top: `${p.y}px` }}
          className="fixed z-50 pointer-events-none text-rose-500 font-extrabold text-lg animate-float-up"
        >
          +1 Sid's Heart 💖
        </div>
      ))}

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
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs font-bold text-[#493744] bg-[#FFF5F8] px-3 py-1.5 rounded-full border border-[#F5D3E0] flex items-center gap-1 shadow-xs">
              Hearts: <strong className="text-[#E86F9A] text-sm">{score}</strong>
            </span>
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full border shadow-xs transition-colors ${
              timeLeft <= 5 ? 'bg-rose-100 text-rose-600 border-rose-300 animate-pulse' : 'bg-[#FFF5F8] text-[#493744] border-[#F5D3E0]'
            }`}>
              Time: <strong className="text-sm">{timeLeft}s</strong>
            </span>
          </div>
        )}
      </div>

      {/* Game Stage Arena */}
      <div className="relative min-h-[380px] sm:min-h-[440px] w-full bg-gradient-to-b from-[#FFF5F8] via-white to-[#FCE4ED]/40 rounded-2xl border-2 border-[#F5D3E0] overflow-hidden flex items-center justify-center select-none shadow-inner py-4">
        
        {/* Start Game Screen */}
        {!gameStarted && (
          <div className="text-center p-6 space-y-4 max-w-sm relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-white border-2 border-[#F5D3E0] flex items-center justify-center text-[#E86F9A] mx-auto shadow-md">
              <Heart className="w-8 h-8 fill-[#E86F9A] animate-pulse" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-[#493744] text-lg sm:text-xl">
                Catch Sidhant's Hearts 💖
              </h4>
              <p className="text-xs sm:text-sm text-[#8C6A7D] leading-relaxed">
                Tap as many floating hearts of Sidhant as you can in <strong>exact 15 seconds</strong>!
              </p>
            </div>
            <button
              onClick={startGame}
              className="px-8 py-3.5 bg-[#E86F9A] hover:bg-[#D84B79] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start 15-Second Challenge ✨</span>
            </button>
          </div>
        )}

        {/* Active Gameplay Arena */}
        {gameStarted && !gameOver && (
          <div className="absolute inset-0">
            {hearts.map((h) => (
              <button
                key={h.id}
                onClick={(e) => catchHeart(e, h.id)}
                style={{
                  left: `${h.left}%`,
                  animationDuration: `${h.speed}s`,
                }}
                className="absolute bottom-0 -translate-x-1/2 cursor-pointer animate-float-up focus:outline-none transform hover:scale-125 active:scale-95 transition-transform group flex flex-col items-center"
              >
                <div className="relative">
                  <Heart
                    style={{ width: `${h.size}px`, height: `${h.size}px` }}
                    className="fill-[#E86F9A] text-[#D84B79] drop-shadow-md group-hover:fill-rose-600 transition-colors"
                  />
                  <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-amber-300 animate-spin" />
                </div>
                <span className="text-[9px] font-bold text-[#D84B79] bg-white/90 px-1.5 py-0.5 rounded-full border border-[#F5D3E0] shadow-xs mt-0.5">
                  Sid's Heart
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Game Over Reward Screen */}
        {gameOver && (
          <div className="text-center p-4 sm:p-6 space-y-3 max-w-md animate-fadeIn relative z-10 my-auto">
            {(() => {
              const reward = getRewardInfo();
              return (
                <>
                  <div className="w-16 h-16 rounded-full bg-[#FCE4ED] border-2 border-[#E86F9A] flex items-center justify-center text-[#E86F9A] mx-auto shadow-inner">
                    <Trophy className="w-8 h-8 animate-bounce" />
                  </div>

                  <div className="space-y-1.5">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#FCE4ED] text-[#D84B79] text-xs font-bold border border-[#F5D3E0]">
                      {reward.badge}
                    </span>

                    <h4 className="text-xl sm:text-2xl font-bold text-[#493744] font-handwriting">
                      {reward.title}
                    </h4>

                    <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#F5D3E0] space-y-0.5 shadow-xs">
                      <p className="text-[10px] sm:text-xs font-bold text-[#8C6A7D] uppercase tracking-wider">
                        15-Second Challenge Result
                      </p>
                      <p className="text-base sm:text-lg font-bold text-[#E86F9A]">
                        {recipientName} caught {score} hearts of Sidhant! 💖
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#493744] leading-relaxed font-sans-rounded font-medium px-2">
                      {reward.message}
                    </p>
                  </div>

                  <button
                    onClick={startGame}
                    className="px-6 py-3 bg-[#E86F9A] hover:bg-[#D84B79] text-white font-bold rounded-2xl shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer mt-1"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Play Again 🔄</span>
                  </button>
                </>
              );
            })()}
          </div>
        )}

      </div>

    </div>
  );
}
