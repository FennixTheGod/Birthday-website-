import React from 'react';
import { Video, Heart, ExternalLink, Sparkles } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export default function FinalVideoSection() {
  const { video } = siteContent;

  return (
    <section id="video" className="py-16 px-4 max-w-4xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FCE4ED] text-[#D84B79] text-xs font-bold uppercase tracking-wider border border-[#F5D3E0]">
          <Video className="w-3.5 h-3.5" />
          Special Video Message
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold text-[#493744] font-handwriting">
          {video.sectionTitle}
        </h2>
        <p className="text-sm sm:text-base text-[#8C6A7D]">
          {video.sectionSubtitle}
        </p>
      </div>

      {/* Prominent Video Card with Large Google Drive Link Button */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl border-2 border-[#F5D3E0] p-8 sm:p-12 shadow-xl text-center space-y-8 relative overflow-hidden">
        
        {/* Soft Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#FCE4ED]/60 rounded-full blur-3xl pointer-events-none" />

        {/* Video Icon Illustration */}
        <div className="relative z-10 space-y-6 max-w-xl mx-auto">
          
          <div className="w-24 h-24 rounded-full bg-[#FCE4ED] border-4 border-white flex items-center justify-center text-[#E86F9A] mx-auto shadow-lg animate-pulse" style={{ animationDuration: '3s' }}>
            <Video className="w-12 h-12 text-[#E86F9A]" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-4xl font-bold text-[#493744] font-handwriting">
              A Personal Video Recorded Just For You 🎥✨
            </h3>
            <p className="text-xs sm:text-sm text-[#8C6A7D] leading-relaxed font-sans-rounded">
              Tap the button below to watch the special birthday video message on Google Drive!
            </p>
          </div>

          {/* Prominent Large Google Drive Link Button */}
          <div className="pt-2">
            <a
              href={video.driveLink || "https://drive.google.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-5 bg-[#E86F9A] hover:bg-[#D84B79] text-white font-bold text-lg sm:text-xl rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 active:translate-y-0 transition-all inline-flex items-center justify-center gap-3 cursor-pointer group"
            >
              <Video className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>{video.driveButtonText || "🎥 Watch Video Message on Google Drive ✨"}</span>
              <ExternalLink className="w-5 h-5 opacity-90" />
            </a>
          </div>

        </div>

        {/* Written message beneath */}
        <div className="relative z-10 bg-[#FFF5F8] p-6 rounded-2xl border border-[#F5D3E0] text-center space-y-2 max-w-xl mx-auto">
          <div className="flex justify-center text-[#E86F9A]">
            <Heart className="w-5 h-5 fill-[#E86F9A]" />
          </div>
          <p className="text-base sm:text-lg text-[#493744] font-medium leading-relaxed font-sans-rounded">
            {video.captionUnderVideo}
          </p>
        </div>

      </div>

    </section>
  );
}
