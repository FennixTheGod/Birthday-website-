import React, { useState } from 'react';
import { Video, Play, AlertCircle, Heart, Sparkles } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export default function FinalVideoSection() {
  const { video } = siteContent;
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="video" className="py-16 px-4 max-w-4xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FCE4ED] text-[#D84B79] text-xs font-bold uppercase tracking-wider border border-[#F5D3E0]">
          <Video className="w-3.5 h-3.5" />
          Video Message
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold text-[#493744] font-handwriting">
          {video.sectionTitle}
        </h2>
        <p className="text-sm sm:text-base text-[#8C6A7D]">
          {video.sectionSubtitle}
        </p>
      </div>

      {/* Video Player Card */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl border-2 border-[#F5D3E0] p-6 sm:p-8 shadow-xl space-y-6">
        
        <div className="relative aspect-16/9 w-full bg-[#493744] rounded-2xl overflow-hidden shadow-md flex items-center justify-center">
          
          {!videoError ? (
            <video
              controls
              poster={video.posterPath}
              onError={() => setVideoError(true)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
            >
              <source src={video.videoPath} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            /* Graceful Placeholder Card if Video File is missing */
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5F8] to-[#FCE4ED] p-8 text-center flex flex-col items-center justify-center space-y-4 border-2 border-dashed border-[#E86F9A]">
              <div className="w-16 h-16 rounded-full bg-white border border-[#F5D3E0] flex items-center justify-center text-[#E86F9A] shadow-md">
                <Video className="w-8 h-8" />
              </div>
              <div className="space-y-2 max-w-md">
                <h4 className="font-bold text-[#493744] text-lg sm:text-xl">
                  Personal Birthday Video Message 🎬
                </h4>
                <p className="text-xs sm:text-sm text-[#8C6A7D] leading-relaxed">
                  {video.missingVideoInstructions}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Written message beneath video */}
        <div className="bg-[#FFF5F8] p-5 sm:p-6 rounded-2xl border border-[#F5D3E0] text-center space-y-2">
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
