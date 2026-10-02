import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX, Disc } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { romanticSynth } from '../utils/audioSynth';

export default function AudioPlayer({ isPlaying, onTogglePlay }) {
  const [usingSynth, setUsingSynth] = useState(false);
  const audioRef = useRef(null);

  const { audio } = siteContent;

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    if (isPlaying) {
      if (usingSynth) {
        romanticSynth.play();
      } else {
        audioElement.play().catch((err) => {
          console.log("Audio file playback blocked or missing, falling back to Web Audio synth:", err);
          setUsingSynth(true);
          romanticSynth.play();
        });
      }
    } else {
      audioElement.pause();
      romanticSynth.stop();
    }

    return () => {
      romanticSynth.stop();
    };
  }, [isPlaying, usingSynth]);

  const handleAudioError = () => {
    console.log("MP3 file not found at " + audio.bgMusicPath + ", using Web Audio synthesizer");
    setUsingSynth(true);
    if (isPlaying) {
      romanticSynth.play();
    }
  };

  return (
    <div className="fixed top-4 right-4 z-40">
      <audio
        ref={audioRef}
        src={audio.bgMusicPath}
        loop
        onError={handleAudioError}
        preload="auto"
      />

      <button
        onClick={onTogglePlay}
        aria-label={isPlaying ? "Mute background music" : "Play background music"}
        className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full border shadow-md backdrop-blur-md transition-all duration-300 cursor-pointer ${
          isPlaying
            ? 'bg-[#E86F9A] text-white border-[#E86F9A] shadow-pink-200 shadow-lg scale-105'
            : 'bg-white/90 text-[#493744] border-[#F5D3E0] hover:border-[#E86F9A] hover:bg-[#FFF5F8]'
        }`}
      >
        <div className="relative flex items-center justify-center">
          <Disc className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} />
          {isPlaying && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white animate-ping" />
          )}
        </div>

        <span className="text-xs font-semibold select-none hidden sm:inline">
          {isPlaying ? (
            <span className="flex items-center gap-1.5">
              <span>{audio.title}</span>
              <Volume2 className="w-3.5 h-3.5 animate-pulse" />
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-[#8C6A7D]">
              <span>Music Off</span>
              <VolumeX className="w-3.5 h-3.5" />
            </span>
          )}
        </span>
      </button>
    </div>
  );
}
