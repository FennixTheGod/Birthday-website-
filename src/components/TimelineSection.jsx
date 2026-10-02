import React, { useState } from 'react';
import { Sparkles, MessageCircle, Smile, Heart, Gift, Calendar, X } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export default function TimelineSection() {
  const { timeline } = siteContent;
  const [selectedImage, setSelectedImage] = useState(null);

  const iconMap = {
    Sparkles: Sparkles,
    MessageCircle: MessageCircle,
    Smile: Smile,
    Heart: Heart,
    Gift: Gift,
  };

  return (
    <section id="story" className="py-16 px-4 max-w-5xl mx-auto space-y-12">
      
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FCE4ED] text-[#D84B79] text-xs font-bold uppercase tracking-wider border border-[#F5D3E0]">
          <Calendar className="w-3.5 h-3.5" />
          Our Journey
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold text-[#493744] font-handwriting">
          {timeline.sectionTitle}
        </h2>
        <p className="text-sm sm:text-base text-[#8C6A7D]">
          {timeline.sectionSubtitle}
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-[#F5D3E0] ml-4 sm:ml-32 space-y-8 sm:space-y-12">
        {timeline.entries.map((entry, index) => {
          const IconComponent = iconMap[entry.icon] || Heart;
          return (
            <div key={entry.id || index} className="relative pl-6 sm:pl-10 group">
              
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#FFF5F8] border-2 border-[#E86F9A] flex items-center justify-center text-[#E86F9A] shadow-sm group-hover:bg-[#E86F9A] group-hover:text-white transition-colors">
                <IconComponent className="w-4 h-4" />
              </div>

              {/* Date tag on left for desktop */}
              <div className="hidden sm:block absolute -left-36 top-2.5 text-right w-28 text-xs font-bold text-[#D84B79] font-mono">
                {entry.date}
              </div>

              {/* Timeline Card with Side Image */}
              <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-[#F5D3E0] p-6 shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                
                {/* Text Content Column */}
                <div className="md:col-span-2 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="sm:hidden text-xs font-bold text-[#D84B79] bg-[#FCE4ED] px-2.5 py-0.5 rounded-full">
                      {entry.date}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#8C6A7D] bg-[#FFF5F8] px-2.5 py-0.5 rounded-full border border-[#F5D3E0]">
                      {entry.tag}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#493744]">
                    {entry.title}
                  </h3>

                  <p className="text-sm text-[#8C6A7D] leading-relaxed">
                    {entry.description}
                  </p>
                </div>

                {/* Photo Thumbnail Column beside Text */}
                {entry.image && (
                  <div
                    onClick={() => setSelectedImage(entry)}
                    className="relative aspect-4/3 w-full rounded-2xl overflow-hidden border-2 border-[#F5D3E0] bg-[#FCE4ED] shadow-sm group-hover:border-[#E86F9A] transition-all cursor-pointer flex-shrink-0"
                    role="button"
                    tabIndex={0}
                    aria-label={`View photo for ${entry.title}`}
                  >
                    <img
                      src={entry.image}
                      alt={entry.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        const fallback = entry.image.replace(/\.jpg$/, '.svg');
                        e.target.src = fallback;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5">
                      <Sparkles className="w-4 h-4 text-white" />
                      <span>View photo</span>
                    </div>
                  </div>
                )}

              </div>

            </div>
          );
        })}
      </div>

      {/* Timeline Image Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-[#F5D3E0]"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#493744] flex items-center justify-center shadow-md cursor-pointer"
              aria-label="Close photo view"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative w-full md:w-2/3 aspect-4/3 bg-black flex items-center justify-center">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  const fallback = selectedImage.image.replace(/\.jpg$/, '.svg');
                  e.target.src = fallback;
                }}
              />
            </div>

            {/* Modal Details */}
            <div className="w-full md:w-1/3 p-6 flex flex-col justify-between space-y-4 bg-[#FFF5F8]">
              <div className="space-y-3">
                <span className="px-3 py-1 rounded-full bg-[#FCE4ED] text-[#D84B79] text-xs font-bold border border-[#F5D3E0] inline-block">
                  {selectedImage.date} • {selectedImage.tag}
                </span>

                <h3 className="text-xl font-bold text-[#493744]">
                  {selectedImage.title}
                </h3>

                <p className="text-xs text-[#8C6A7D] leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F5D3E0] text-right text-xs text-[#E86F9A] font-semibold">
                Memory Photo 💕
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
