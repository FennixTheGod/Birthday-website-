import React from 'react';
import { Sparkles, Heart, Gift, Music } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export default function IntroOpening({ onStart, isAudioPlaying, onToggleAudio }) {
  const { opening, recipientName } = siteContent;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FFF5F8] px-4 overflow-hidden">
      {/* Background ambient sparkles & floating elements */}
      <div className="absolute inset-0 bg-grid-dots pointer-events-none opacity-20" />
      
      {/* Glow aura */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-[#F8DCE7] rounded-full blur-3xl opacity-70 animate-pulse pointer-events-none" />

      {/* Main Intro Card */}
      <div className="relative z-10 max-w-lg w-full bg-white/90 backdrop-blur-md border border-[#F5D3E0] rounded-3xl p-8 sm:p-10 shadow-2xl text-center flex flex-col items-center gap-6 animate-float-slow">
        
        {/* Floating Heart Icon Badge */}
        <div className="relative">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FCE4ED] border-2 border-[#E86F9A]/30 flex items-center justify-center text-[#E86F9A] shadow-inner">
            <Heart className="w-10 h-10 sm:w-12 sm:h-12 fill-[#E86F9A] animate-pulse" />
          </div>
          <div className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-md border border-[#F5D3E0]">
            <Sparkles className="w-5 h-5 text-[#E86F9A]" />
          </div>
        </div>

        {/* Small Pill Badge */}
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FCE4ED] text-[#D84B79] text-xs font-semibold tracking-wide border border-[#F5D3E0]">
          <Sparkles className="w-3.5 h-3.5" />
          {opening.badgeText}
        </span>

        {/* Handwritten Title */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#493744] leading-tight font-handwriting">
            {opening.title}
          </h1>
          <p className="text-sm sm:text-base text-[#8C6A7D] max-w-sm mx-auto leading-relaxed">
            {opening.subtitle}
          </p>
        </div>

        {/* Optional Music Toggle Hint */}
        <div className="flex items-center gap-2 text-xs text-[#B87591] bg-[#FFF5F8] px-3 py-1.5 rounded-full border border-[#F5D3E0]">
          <Music className="w-3.5 h-3.5 text-[#E86F9A]" />
          <span>Soft background music available</span>
          <button
            onClick={onToggleAudio}
            className="underline font-semibold hover:text-[#E86F9A] transition-colors ml-1"
          >
            {isAudioPlaying ? 'Mute' : 'Play sound 🎵'}
          </button>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="w-full sm:w-auto px-8 py-4 bg-[#E86F9A] hover:bg-[#D84B79] text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 group cursor-pointer"
        >
          <Gift className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span>{opening.buttonText}</span>
          <Sparkles className="w-4 h-4 opacity-80" />
        </button>

        {/* Recipient hint */}
        <p className="text-xs text-[#B87591]/80 italic">
          Dedicated to {recipientName} 💗
        </p>
      </div>
    </div>
  );
}
