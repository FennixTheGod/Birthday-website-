import React, { useState } from 'react';
import { Eye, Coffee, Home, Star, Bookmark, Sparkles, Heart, RefreshCw } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export default function FlipCardsSection() {
  const { facts } = siteContent;
  const [flippedCards, setFlippedCards] = useState({});

  const iconMap = {
    Eye: Eye,
    Coffee: Coffee,
    Home: Home,
    Star: Star,
    Bookmark: Bookmark,
    Sparkles: Sparkles,
  };

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="facts" className="py-16 px-4 max-w-6xl mx-auto space-y-12">
      
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FCE4ED] text-[#D84B79] text-xs font-bold uppercase tracking-wider border border-[#F5D3E0]">
          <Heart className="w-3.5 h-3.5 fill-[#D84B79]" />
          Interactive Cards
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold text-[#493744] font-handwriting">
          {facts.sectionTitle}
        </h2>
        <p className="text-sm sm:text-base text-[#8C6A7D]">
          {facts.sectionSubtitle}
        </p>
      </div>

      {/* Flip Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {facts.cards.map((card) => {
          const IconComponent = iconMap[card.frontIcon] || Heart;
          const isFlipped = !!flippedCards[card.id];

          return (
            <div
              key={card.id}
              onClick={() => toggleFlip(card.id)}
              className="h-64 cursor-pointer perspective-1000 group"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleFlip(card.id);
                }
              }}
              aria-label={`Card: ${card.title}. Tap to flip.`}
            >
              <div
                className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                
                {/* Front Side */}
                <div className="absolute inset-0 w-full h-full bg-white/90 backdrop-blur-md rounded-3xl border-2 border-[#F5D3E0] p-6 shadow-md hover:shadow-xl flex flex-col items-center justify-between text-center backface-hidden group-hover:border-[#E86F9A] transition-colors">
                  <div className="w-full flex justify-end">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6A7D] bg-[#FFF5F8] px-2.5 py-1 rounded-full border border-[#F5D3E0] flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 text-[#E86F9A]" /> Tap to flip
                    </span>
                  </div>

                  <div className="space-y-3 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#FCE4ED] border border-[#F5D3E0] flex items-center justify-center text-[#E86F9A] shadow-inner group-hover:scale-110 transition-transform">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-[#493744]">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#8C6A7D] font-medium">
                    Tap to reveal secret memory 💌
                  </p>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#FFF5F8] to-[#FCE4ED] rounded-3xl border-2 border-[#E86F9A] p-6 shadow-xl flex flex-col justify-between rotate-y-180 backface-hidden text-center">
                  <div className="w-full flex justify-between items-center">
                    <Sparkles className="w-4 h-4 text-[#E86F9A]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#E86F9A]">
                      Shared Memory
                    </span>
                    <Heart className="w-4 h-4 text-[#E86F9A] fill-[#E86F9A]" />
                  </div>

                  <p className="text-sm sm:text-base text-[#493744] font-medium leading-relaxed my-auto">
                    {card.backText}
                  </p>

                  <p className="text-[11px] text-[#8C6A7D] font-semibold">
                    Tap to flip back 🔄
                  </p>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
