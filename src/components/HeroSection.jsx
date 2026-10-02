import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, ArrowDown, Calendar, Clock } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import ProfileCard from './ProfileCard';

export default function HeroSection({ onExploreStory }) {
  const { hero, recipientName, birthdayDate, customAgeSubtitle } = siteContent;
  const [displayedText, setDisplayedText] = useState('');
  const [ageInfo, setAgeInfo] = useState('');

  // Typewriter effect for short romantic birthday message (fast, smooth reveal)
  useEffect(() => {
    let currentLength = 0;
    const fullText = hero.messageTypewriter || '';
    setDisplayedText('');

    const interval = setInterval(() => {
      currentLength += 2; // Advance 2 characters per tick for fast typing
      setDisplayedText(fullText.slice(0, currentLength));
      if (currentLength >= fullText.length) {
        setDisplayedText(fullText);
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [hero.messageTypewriter]);

  // Calculate live age/birthday text if birthdayDate provided
  useEffect(() => {
    if (!birthdayDate) {
      setAgeInfo(customAgeSubtitle);
      return;
    }

    try {
      const birth = new Date(birthdayDate);
      if (isNaN(birth.getTime())) {
        setAgeInfo(customAgeSubtitle);
        return;
      }

      const now = new Date();
      let years = now.getFullYear() - birth.getFullYear();
      setAgeInfo(`Celebrating ${years} wonderful years & counting 🎂✨`);
    } catch {
      setAgeInfo(customAgeSubtitle);
    }
  }, [birthdayDate, customAgeSubtitle]);

  return (
    <section id="hero" className="relative pt-24 sm:pt-32 pb-16 px-4 max-w-6xl mx-auto space-y-12">
      
      {/* Top Hero Romantic Banner */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        
        {/* Floating Heart Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FCE4ED] border border-[#F5D3E0] text-[#D84B79] text-xs font-bold tracking-wide shadow-xs animate-bounce" style={{ animationDuration: '3s' }}>
          <Sparkles className="w-4 h-4 text-[#E86F9A]" />
          <span>{hero.badge}</span>
        </div>

        {/* Headline with Handwritten Script Accent */}
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#493744] tracking-tight leading-tight">
          {hero.headingPrefix}
          <span className="font-handwriting text-5xl sm:text-7xl text-[#E86F9A] block sm:inline ml-1 sm:ml-2">
            {recipientName} 💗
          </span>
        </h1>

        {/* Live Age / Birthday Line */}
        <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-semibold text-[#8C6A7D] bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#F5D3E0] shadow-xs max-w-md mx-auto">
          <Calendar className="w-4 h-4 text-[#E86F9A]" />
          <span>{ageInfo}</span>
        </div>

        {/* Romantic Typewriter Reveal Message */}
        <div className="bg-white/90 backdrop-blur-md border border-[#F5D3E0] rounded-3xl p-6 sm:p-8 shadow-lg max-w-2xl mx-auto text-left relative min-h-[120px] flex items-center">
          <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-[#E86F9A] text-white text-[10px] font-bold uppercase tracking-wider">
            From the heart
          </div>
          <p className="text-base sm:text-lg text-[#493744] leading-relaxed font-sans-rounded">
            {displayedText}
            <span className="inline-block w-1.5 h-4 ml-1 bg-[#E86F9A] animate-ping" />
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={onExploreStory}
            className="px-8 py-4 bg-[#E86F9A] hover:bg-[#D84B79] text-white font-bold text-base sm:text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center gap-3 mx-auto cursor-pointer"
          >
            <Heart className="w-5 h-5 fill-white" />
            <span>{hero.ctaButtonText}</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Profile Card Widget based on Reference Design */}
      <ProfileCard onExploreStory={onExploreStory} />

    </section>
  );
}
