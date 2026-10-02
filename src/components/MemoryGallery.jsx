import React, { useState } from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Sparkles, Heart } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export default function MemoryGallery() {
  const { gallery } = siteContent;
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const filteredItems = activeCategory === 'All'
    ? gallery.items
    : gallery.items.filter(item => item.category === activeCategory);

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
    }
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <section id="gallery" className="py-16 px-4 max-w-6xl mx-auto space-y-10">
      
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FCE4ED] text-[#D84B79] text-xs font-bold uppercase tracking-wider border border-[#F5D3E0]">
          <ImageIcon className="w-3.5 h-3.5" />
          Photo Moments
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold text-[#493744] font-handwriting">
          {gallery.sectionTitle}
        </h2>
        <p className="text-sm sm:text-base text-[#8C6A7D]">
          {gallery.sectionSubtitle}
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {gallery.categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#E86F9A] text-white shadow-md'
                : 'bg-white text-[#493744] border border-[#F5D3E0] hover:bg-[#FFF5F8]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Responsive Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id || idx}
            onClick={() => openLightbox(idx)}
            className="group relative bg-white rounded-3xl border border-[#F5D3E0] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            {/* Image Box */}
            <div className="relative aspect-4/3 w-full bg-[#FCE4ED] overflow-hidden">
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  const fallbackSrc = item.src.replace(/\.jpg$/, '.svg');
                  e.target.src = fallbackSrc;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-xs font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Tap to expand
                </span>
              </div>
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#E86F9A] shadow-xs">
                {item.date}
              </div>
            </div>

            {/* Caption Info */}
            <div className="p-5 space-y-1.5 bg-white">
              <h3 className="font-bold text-[#493744] text-lg group-hover:text-[#E86F9A] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#8C6A7D] line-clamp-2 leading-relaxed">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-[#F5D3E0]"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#493744] flex items-center justify-center shadow-md cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative w-full md:w-2/3 aspect-4/3 bg-black flex items-center justify-center">
              <img
                src={filteredItems[selectedImageIndex].src}
                alt={filteredItems[selectedImageIndex].title}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  const fallbackSrc = filteredItems[selectedImageIndex].src.replace(/\.jpg$/, '.svg');
                  e.target.src = fallbackSrc;
                }}
              />

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#493744] flex items-center justify-center shadow-md cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#493744] flex items-center justify-center shadow-md cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Details Side */}
            <div className="w-full md:w-1/3 p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-[#FFF5F8]">
              <div className="space-y-3">
                <span className="px-3 py-1 rounded-full bg-[#FCE4ED] text-[#D84B79] text-xs font-bold border border-[#F5D3E0] inline-block">
                  {filteredItems[selectedImageIndex].category}
                </span>

                <h3 className="text-2xl font-bold text-[#493744]">
                  {filteredItems[selectedImageIndex].title}
                </h3>

                <p className="text-sm text-[#8C6A7D] leading-relaxed">
                  {filteredItems[selectedImageIndex].caption}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F5D3E0] flex justify-between items-center text-xs text-[#8C6A7D]">
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-[#E86F9A] fill-[#E86F9A]" />
                  {filteredItems[selectedImageIndex].date}
                </span>
                <span>
                  {selectedImageIndex + 1} of {filteredItems.length}
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
