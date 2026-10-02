import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Menu, X, BookOpen, Image, Gamepad2, Cake, Mail, Video, User } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export default function Navbar({ activeSection, scrollToSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home', icon: User },
    { id: 'story', label: 'Story', icon: BookOpen },
    { id: 'facts', label: 'Facts', icon: Heart },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'cake', label: 'Cake', icon: Cake },
    { id: 'letter', label: 'Letter', icon: Mail },
    { id: 'video', label: 'Video', icon: Video },
  ];

  const handleNavClick = (id) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-[#F5D3E0] shadow-sm py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand Logo inspired by reference design */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2 text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-[#FCE4ED] border border-[#F5D3E0] flex items-center justify-center text-[#E86F9A] group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-[#E86F9A]" />
          </div>
          <div>
            <span className="font-handwriting text-2xl font-bold text-[#493744] block leading-none">
              {siteContent.recipientName}'s World
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#8C6A7D] font-semibold">
              Birthday Special
            </span>
          </div>
        </button>

        {/* Desktop Navigation Bar (Center Tabs matching design reference) */}
        <nav className="hidden md:flex items-center gap-1 bg-white/90 p-1.5 rounded-full border border-[#F5D3E0] shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-[#E86F9A] text-white shadow-sm'
                    : 'text-[#493744] hover:text-[#E86F9A] hover:bg-[#FFF5F8]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#8C6A7D]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Sparkle badge */}
          <div className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full bg-[#FCE4ED] text-[#D84B79] text-xs font-semibold border border-[#F5D3E0]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Special Day</span>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white border border-[#F5D3E0] text-[#493744] hover:bg-[#FFF5F8]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-[#F5D3E0] p-4 shadow-lg animate-fadeIn">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#E86F9A] text-white'
                      : 'bg-[#FFF5F8] text-[#493744] hover:bg-[#FCE4ED]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
