import React, { useState } from 'react';
import { Heart, Sparkles, Disc, Music, Smile, Star, Search, Mail, Calendar, UserCheck } from 'lucide-react';
import { siteContent } from '../data/siteContent';

export default function ProfileCard({ onExploreStory }) {
  const { hero, recipientName } = siteContent;
  const { profileCard } = hero;
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl border border-[#F5D3E0] p-4 sm:p-8 shadow-xl space-y-6">
      
      {/* Top Profile Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#F5D3E0]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#FCE4ED] p-0.5 border-2 border-[#E86F9A]">
            <img
              src={hero.heroImage}
              alt={recipientName}
              className="w-full h-full rounded-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/hero-girl.svg';
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-[#493744] text-lg sm:text-xl">
                {recipientName}
              </h3>
              <Sparkles className="w-4 h-4 text-[#E86F9A]" />
            </div>
            <p className="text-xs text-[#8C6A7D] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              {profileCard.activeStatus}
            </p>
          </div>
        </div>

        {/* Action Pills */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#FFF5F8] border border-[#F5D3E0] text-xs font-semibold text-[#D84B79]">
            {profileCard.role}
          </span>
          <div className="w-8 h-8 rounded-full bg-[#FCE4ED] flex items-center justify-center text-[#E86F9A]">
            <Heart className="w-4 h-4 fill-[#E86F9A]" />
          </div>
        </div>
      </div>

      {/* Grid Layout matching reference design */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Box 1: Birthday & Personality Metrics */}
        <div className="bg-[#FFF5F8] rounded-2xl p-4 border border-[#F5D3E0] space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] font-semibold text-[#8C6A7D] uppercase tracking-wider block">
                Birthday
              </span>
              <span className="text-3xl font-extrabold text-[#493744]">
                {profileCard.birthdayDisplay}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-white text-[#E86F9A] shadow-xs">
              <Calendar className="w-5 h-5" />
            </div>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-[#8C6A7D] uppercase tracking-wider block mb-1.5">
              Personality
            </span>
            <div className="flex flex-wrap gap-1.5">
              {profileCard.personality.map((trait, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-full bg-white text-[11px] font-semibold text-[#D84B79] border border-[#F5D3E0]"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Box 2: Cute Cloud Music Player Widget */}
        <div className="bg-[#FFF5F8] rounded-2xl p-4 border border-[#F5D3E0] flex flex-col justify-between space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#F8DCE7] flex items-center justify-center text-[#E86F9A] overflow-hidden shadow-xs">
              <Disc className="w-7 h-7 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#493744]">
                {siteContent.audio.title}
              </h4>
              <p className="text-xs text-[#8C6A7D]">
                {siteContent.audio.artist}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <div className="w-full bg-white h-1.5 rounded-full overflow-hidden border border-[#F5D3E0]">
              <div className="bg-[#E86F9A] h-full w-2/3 rounded-full" />
            </div>
            <div className="flex justify-between text-[10px] text-[#8C6A7D] font-mono">
              <span>01:24</span>
              <span>03:45</span>
            </div>
          </div>
        </div>

        {/* Box 3: Main Romantic Headline Banner */}
        <div className="bg-gradient-to-br from-[#FCE4ED] to-[#F8DCE7] rounded-2xl p-5 border border-[#F5D3E0] flex flex-col justify-between text-center relative overflow-hidden">
          <div className="absolute top-2 right-2 text-[#E86F9A]/30 text-xl font-bold">
            +
          </div>
          <div>
            <span className="text-xs font-handwriting text-[#D84B79] text-lg block">
              let's celebrate ✨
            </span>
            <h4 className="text-2xl font-bold text-[#493744] font-handwriting">
              {recipientName}
            </h4>
            <p className="text-xs text-[#8C6A7D] mt-1 line-clamp-2">
              {profileCard.bio}
            </p>
          </div>

          <button
            onClick={onExploreStory}
            className="mt-3 w-full py-2 bg-[#E86F9A] hover:bg-[#D84B79] text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            View Storyline 💗
          </button>
        </div>
      </div>

      {/* Bottom Interests & Status Pill Row */}
      <div className="pt-2 border-t border-[#F5D3E0] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[#8C6A7D] font-semibold mr-1">Interests:</span>
          {profileCard.interests.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-full bg-[#FFF5F8] text-[#493744] border border-[#F5D3E0] font-medium text-[11px]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 text-[#8C6A7D]">
          <span>Years Active: <strong className="text-[#493744]">{profileCard.yearsActive}</strong></span>
        </div>
      </div>

    </div>
  );
}
