import React, { useState, useEffect } from 'react';
import FloatingDecorations from './components/FloatingDecorations';
import IntroOpening from './components/IntroOpening';
import Navbar from './components/Navbar';
import AudioPlayer from './components/AudioPlayer';
import HeroSection from './components/HeroSection';
import TimelineSection from './components/TimelineSection';
import FlipCardsSection from './components/FlipCardsSection';
import MemoryGallery from './components/MemoryGallery';
import QuizGame from './components/QuizGame';
import CatchHeartsGame from './components/CatchHeartsGame';
import CandleCakeSection from './components/CandleCakeSection';
import LoveLetterSection from './components/LoveLetterSection';
import FinalVideoSection from './components/FinalVideoSection';
import FinaleSection from './components/FinaleSection';

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section for navbar highlighting
  useEffect(() => {
    if (!hasStarted) return;

    const sections = ['hero', 'story', 'facts', 'gallery', 'games', 'cake', 'letter', 'video', 'finale'];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasStarted]);

  const handleStartExperience = () => {
    setHasStarted(true);
    // Optionally start audio if requested
    setIsPlayingAudio(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleAudio = () => {
    setIsPlayingAudio((prev) => !prev);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setHasStarted(false);
  };

  return (
    <div className="relative min-h-screen bg-[#FFF5F8] text-[#493744] selection:bg-[#F8DCE7] selection:text-[#E86F9A] font-sans-rounded">
      {/* Background Floating Stars & Grid */}
      <FloatingDecorations />

      {/* Intro Loading / Surprise Screen */}
      {!hasStarted ? (
        <IntroOpening
          onStart={handleStartExperience}
          isAudioPlaying={isPlayingAudio}
          onToggleAudio={handleToggleAudio}
        />
      ) : (
        /* Main Storyline Website */
        <div className="relative z-10 animate-fadeIn">
          
          {/* Header Navigation */}
          <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

          {/* Floating Audio Player Widget */}
          <AudioPlayer isPlaying={isPlayingAudio} onTogglePlay={handleToggleAudio} />

          {/* Core Sections */}
          <main className="space-y-12 sm:space-y-20">
            <HeroSection onExploreStory={() => scrollToSection('story')} />
            <TimelineSection />
            <FlipCardsSection />
            <MemoryGallery />

            {/* Mini Games Combined Section */}
            <section id="games" className="py-16 px-4 max-w-6xl mx-auto space-y-12">
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FCE4ED] text-[#D84B79] text-xs font-bold uppercase tracking-wider border border-[#F5D3E0]">
                  Interactive Fun
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold text-[#493744] font-handwriting">
                  Mini Games & Fun 🎮
                </h2>
                <p className="text-sm sm:text-base text-[#8C6A7D]">
                  Play these cute little mini-games made to bring a smile to your face!
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <QuizGame />
                <CatchHeartsGame />
              </div>
            </section>

            <CandleCakeSection />
            <LoveLetterSection />
            <FinalVideoSection />
            <FinaleSection onReplay={handleReplay} />
          </main>

        </div>
      )}
    </div>
  );
}
