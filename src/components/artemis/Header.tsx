'use client';

import { Search, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

/* ─── Artemis Shield Logo ─── */
function ArtemisLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shield shape */}
      <path
        d="M20 3L4 9V19.5C4 28.5 11 35.5 20 37.5C29 35.5 36 28.5 36 19.5V9L20 3Z"
        stroke="white"
        strokeWidth="1.8"
        fill="none"
      />
      {/* Inner shield fill accent */}
      <path
        d="M20 5.5L6.5 10.8V19.5C6.5 27.2 12.4 33.2 20 35C27.6 33.2 33.5 27.2 33.5 19.5V10.8L20 5.5Z"
        fill="rgba(255,255,255,0.08)"
      />
      {/* Letter A */}
      <path
        d="M20 11L14 24H16.5L17.8 20.8H22.2L23.5 24H26L20 11ZM18.6 18.8L20 14.8L21.4 18.8H18.6Z"
        fill="white"
      />
      {/* Horizontal bar at bottom of shield */}
      <line x1="12" y1="28" x2="28" y2="28" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
      {/* Three stars above the bar */}
      <circle cx="15" cy="30.5" r="0.8" fill="rgba(255,255,255,0.5)" />
      <circle cx="20" cy="30.5" r="0.8" fill="rgba(255,255,255,0.5)" />
      <circle cx="25" cy="30.5" r="0.8" fill="rgba(255,255,255,0.5)" />
    </svg>
  );
}

interface HeaderProps {
  onMenuClick: () => void;
  goHome: () => void;
  goToPage: (page: string) => void;
  onSearchClick?: () => void;
}

export default function Header({ onMenuClick, goHome, goToPage, onSearchClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`bg-[#8A0000] text-white h-[50px] flex items-center justify-between px-6 sticky top-0 z-[100] w-full shrink-0 transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="lg:hidden mr-4 p-2.5 hover:bg-white/10 rounded transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2.5 cursor-pointer group" onClick={goHome}>
          <ArtemisLogo size={30} />
          <div className="leading-[1.15] group-hover:opacity-80 transition-opacity">
            <div className="text-[12px] font-semibold tracking-tight">University of</div>
            <div className="text-[13px] font-bold tracking-tight">Artemis</div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex space-x-5 text-[13px] font-bold">
        <button onClick={() => goToPage('education')} className="hover:underline transition-opacity cursor-pointer">education</button>
        <button onClick={() => goToPage('research')} className="hover:underline transition-opacity cursor-pointer">research</button>
        <button onClick={() => goToPage('innovation')} className="hover:underline transition-opacity cursor-pointer">innovation</button>
        <button onClick={() => goToPage('admissions')} className="hover:underline transition-opacity cursor-pointer text-white/90">admissions + aid</button>
        <button onClick={() => goToPage('campus')} className="hover:underline transition-opacity cursor-pointer text-white/90">campus life</button>
        <button onClick={() => goToPage('colleges')} className="hover:underline transition-opacity cursor-pointer text-white/90">colleges</button>
        <button onClick={() => goToPage('about')} className="hover:underline transition-opacity cursor-pointer text-white/90">about artemis</button>
        <button onClick={() => goToPage('blog')} className="hover:underline transition-opacity cursor-pointer text-white/90">journal</button>
        <button onClick={() => goToPage('fundraising')} className="border border-white/40 text-white px-4 py-1 rounded-sm uppercase tracking-wider text-[11px] hover:bg-white/10 transition-colors cursor-pointer">give</button>
        <button onClick={() => goToPage('apply')} className="bg-white text-[#8A0000] px-4 py-1 rounded-sm uppercase tracking-wider text-[11px] hover:bg-gray-100 transition-colors cursor-pointer">apply</button>
      </div>
      <button
        onClick={onSearchClick}
        className="flex items-center group cursor-pointer p-2.5 hover:bg-white/10 rounded transition-colors"
        aria-label="Search"
      >
        <Search size={18} className="group-hover:opacity-80 transition-opacity" />
      </button>
    </nav>
  );
}
