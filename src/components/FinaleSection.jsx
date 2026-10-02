import React from 'react';
import { Sparkles, Heart, RotateCcw, Award, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteContent } from '../data/siteContent';

export default function FinaleSection({ onReplay }) {
  const { finale, recipientName } = siteContent;

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <footer id="finale" className="py-20 px-4 max-w-4xl mx-auto text-center space-y-10">
      
      {/* Glow Container Card */}
      <div className="bg-gradient-to-br from-white via-[#FFF5F8] to-[#FCE4ED] rounded-3xl border-2 border-[#E86F9A] p-8 sm:p-14 shadow-2xl space-y-8 relative overflow-hidden">
        
        {/* Floating Sparkle Elements */}
        <div className="absolute top-4 left-4 text-[#E86F9A]/40 text-xl font-bold animate-pulse">
          ✨
        </div>
        <div className="absolute top-6 right-6 text-[#E86F9A]/40 text-2xl font-bold animate-pulse" style={{ animationDelay: '1s' }}>
          ✨
        </div>

        {/* Big Heart Icon Badge */}
        <div
          onClick={triggerConfetti}
          className="w-24 h-24 rounded-full bg-[#FCE4ED] border-4 border-white flex items-center justify-center text-[#E86F9A] mx-auto shadow-xl cursor-pointer hover:scale-110 transition-transform group"
          role="button"
          tabIndex={0}
          aria-label="Click for extra confetti burst"
        >
          <Heart className="w-12 h-12 fill-[#E86F9A] group-hover:animate-bounce" />
        </div>

        {/* Closing Message */}
        <div className="space-y-3 max-w-xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold text-[#493744] font-handwriting leading-tight">
            {finale.heading}
          </h2>
          <p className="text-base sm:text-lg text-[#8C6A7D] leading-relaxed">
            {finale.message.replace(/\[HER_NAME\]/g, recipientName)}
          </p>
        </div>

        {/* Replay Button */}
        <div className="pt-2">
          <button
            onClick={onReplay}
            className="px-8 py-4 bg-[#E86F9A] hover:bg-[#D84B79] text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all inline-flex items-center gap-3 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>{finale.replayButtonText}</span>
          </button>
        </div>

        {/* Footer Credit Line */}
        <div className="pt-6 border-t border-[#F5D3E0] text-xs text-[#8C6A7D] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#E86F9A]" />
            {finale.footerText}
          </span>
          <span className="font-semibold">
            Happy Birthday {recipientName} 💗
          </span>
        </div>

      </div>

    </footer>
  );
}
