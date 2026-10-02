import React from 'react';

/**
 * FloatingDecorations
 * Renders cute background grid dots, floating sparkles, hearts, and plus (+) markers
 * inspired by the dreamy anime reference design screenshot.
 */
export default function FloatingDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* Subtle background grid dots */}
      <div className="absolute inset-0 bg-grid-dots" />

      {/* Aesthetic Plus (+) Markers matching reference screenshot */}
      <div className="absolute top-[8%] left-[5%] text-[#E86F9A]/30 text-2xl font-bold animate-float-slow">
        +
      </div>
      <div className="absolute top-[18%] right-[8%] text-[#E86F9A]/40 text-3xl font-bold animate-float-slow" style={{ animationDelay: '1s' }}>
        +
      </div>
      <div className="absolute top-[45%] left-[3%] text-[#B87591]/30 text-xl font-bold animate-float-slow" style={{ animationDelay: '2s' }}>
        +
      </div>
      <div className="absolute top-[65%] right-[4%] text-[#E86F9A]/35 text-2xl font-bold animate-float-slow" style={{ animationDelay: '1.5s' }}>
        +
      </div>
      <div className="absolute bottom-[10%] left-[8%] text-[#E86F9A]/30 text-3xl font-bold animate-float-slow" style={{ animationDelay: '2.5s' }}>
        +
      </div>

      {/* Floating Sparkles & Hearts */}
      <div className="absolute top-[12%] right-[15%] text-[#E86F9A]/40 text-lg animate-pulse">
        ✨
      </div>
      <div className="absolute top-[35%] left-[8%] text-[#E86F9A]/30 text-xl animate-float-slow" style={{ animationDelay: '0.8s' }}>
        💗
      </div>
      <div className="absolute top-[75%] right-[12%] text-[#E86F9A]/30 text-lg animate-pulse" style={{ animationDelay: '1.2s' }}>
        ✨
      </div>
      <div className="absolute bottom-[18%] left-[12%] text-[#E86F9A]/35 text-xl animate-float-slow" style={{ animationDelay: '3s' }}>
        💖
      </div>

      {/* Decorative Soft Glow Blobs */}
      <div className="absolute -top-[100px] -left-[100px] w-[350px] h-[350px] bg-[#F8DCE7]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[40%] -right-[150px] w-[400px] h-[400px] bg-[#FCE4ED]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-[100px] left-[20%] w-[350px] h-[350px] bg-[#F8DCE7]/30 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
