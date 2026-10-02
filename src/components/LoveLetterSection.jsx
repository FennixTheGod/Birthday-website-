import React, { useState, useEffect } from 'react';
import { Mail, Heart, Sparkles, Check } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export default function LoveLetterSection() {
  const { letter, recipientName } = siteContent;
  const [isOpen, setIsOpen] = useState(false);
  const [typedBody, setTypedBody] = useState('');

  const fullBodyText = letter.body.replace(/\[HER_NAME\]/g, recipientName);

  useEffect(() => {
    if (!isOpen) {
      setTypedBody('');
      return;
    }

    let currentLength = 0;
    setTypedBody('');

    const timer = setInterval(() => {
      currentLength += 3; // Advance 3 characters per tick for fluid, fast reading
      setTypedBody(fullBodyText.slice(0, currentLength));
      if (currentLength >= fullBodyText.length) {
        setTypedBody(fullBodyText);
        clearInterval(timer);
      }
    }, 12);

    return () => clearInterval(timer);
  }, [isOpen, fullBodyText]);

  return (
    <section id="letter" className="py-16 px-4 max-w-4xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FCE4ED] text-[#D84B79] text-xs font-bold uppercase tracking-wider border border-[#F5D3E0]">
          <Mail className="w-3.5 h-3.5" />
          {letter.badge}
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold text-[#493744] font-handwriting">
          {letter.sectionTitle}
        </h2>
        <p className="text-sm sm:text-base text-[#8C6A7D]">
          {letter.sectionSubtitle}
        </p>
      </div>

      {/* Interactive Envelope / Letter Container */}
      <div className="max-w-2xl mx-auto">
        
        {!isOpen ? (
          /* Sealed Envelope Front */
          <div
            onClick={() => setIsOpen(true)}
            className="group relative bg-[#FFF5F8] border-2 border-[#F5D3E0] rounded-3xl p-8 sm:p-12 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer text-center space-y-6 overflow-hidden"
          >
            {/* Stamp on Top Right */}
            <div className="absolute top-4 right-4 w-16 h-20 bg-white border-2 border-dashed border-[#E86F9A] rounded-lg p-1.5 flex flex-col items-center justify-between rotate-3 shadow-xs">
              <Heart className="w-6 h-6 text-[#E86F9A] fill-[#E86F9A]" />
              <span className="text-[9px] font-bold text-[#D84B79] uppercase">Special</span>
            </div>

            {/* Wax Seal Icon */}
            <div className="w-20 h-20 rounded-full bg-[#E86F9A] border-4 border-[#FCE4ED] text-white flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform">
              <Heart className="w-10 h-10 fill-white" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-[#493744] font-handwriting">
                {letter.heading}
              </h3>
              <p className="text-xs text-[#8C6A7D] font-medium">
                Tap wax seal to open envelope 💌
              </p>
            </div>
          </div>
        ) : (
          /* Open Letter Paper Card */
          <div className="bg-[#FAF6F0] border-2 border-[#E8DCC4] rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6 relative animate-fadeIn">
            
            {/* Paper Texture Decor */}
            <div className="flex items-center justify-between border-b border-[#E8DCC4] pb-4">
              <span className="text-xs font-bold text-[#8C6A7D] font-serif italic">
                {letter.date}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs font-bold text-[#E86F9A] underline hover:text-[#D84B79] cursor-pointer"
              >
                Close letter ✉️
              </button>
            </div>

            {/* Letter Content */}
            <div className="space-y-4 font-serif text-[#493744] leading-relaxed text-base sm:text-lg">
              <h3 className="text-2xl font-bold font-handwriting text-[#E86F9A]">
                {letter.heading}
              </h3>
              
              <div className="whitespace-pre-line min-h-[160px]">
                {typedBody}
                {typedBody.length < fullBodyText.length && (
                  <span className="inline-block w-1.5 h-4 ml-1 bg-[#E86F9A] animate-ping" />
                )}
              </div>
            </div>

            {/* Closing Signature */}
            <div className="pt-6 border-t border-[#E8DCC4] text-right space-y-1">
              <p className="text-sm italic text-[#8C6A7D] font-serif">
                {letter.closing}
              </p>
              <p className="text-2xl font-bold font-handwriting text-[#E86F9A]">
                {siteContent.senderName} 💗
              </p>
            </div>

          </div>
        )}

      </div>

    </section>
  );
}
