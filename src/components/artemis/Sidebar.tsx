'use client';

import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  goHome: () => void;
  goToPage: (page: string) => void;
  /** When true, hide the desktop sidebar column (subpages); mobile drawer still works */
  hideDesktopSidebar?: boolean;
}

export default function Sidebar({ isOpen, onClose, goHome, goToPage, hideDesktopSidebar }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const mockResults = [
    { title: 'The Artemis Project', type: 'Initiative' },
    { title: 'Synthetic Intelligence Lab', type: 'Research' },
    { title: 'Admission Class of 2030', type: 'Deadline' },
  ].filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const sidebarContent = (
    <>
      <div className="flex-1 px-8 lg:px-10 py-12 overflow-y-auto">
        <div className="lg:hidden flex items-center justify-between mb-8">
           <span className="font-bold tracking-tighter text-[#8A0000]">MENU</span>
           <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded text-gray-500"><X size={20}/></button>
        </div>

        {/* ── Mobile Section Navigation ── */}
        <div className="lg:hidden mb-8 border-b border-gray-100 pb-6">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8A0000] mb-3">Navigate</h3>
          <nav className="space-y-0">
            {[
              { label: 'Education', page: 'education' },
              { label: 'Research', page: 'research' },
              { label: 'Innovation', page: 'innovation' },
              { label: 'Admissions + Aid', page: 'admissions' },
              { label: 'Campus Life', page: 'campus' },
              { label: 'Colleges', page: 'colleges' },
              { label: 'About Artemis', page: 'about' },
              { label: 'Journal', page: 'blog' },
            ].map((item) => (
              <button
                key={item.page}
                onClick={() => { goToPage(item.page); onClose?.(); }}
                className="block w-full text-left text-[15px] font-bold text-[#141414] py-2.5 hover:text-[#8A0000] hover:pl-1 transition-all"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
            <button
              onClick={() => { goToPage('fundraising'); onClose?.(); }}
              className="flex-1 py-2.5 border border-[#8A0000] text-[#8A0000] text-[12px] font-bold uppercase tracking-wider hover:bg-[#8A0000] hover:text-white transition-colors text-center"
            >
              Give
            </button>
            <button
              onClick={() => { goToPage('apply'); onClose?.(); }}
              className="flex-1 py-2.5 bg-[#8A0000] text-white text-[12px] font-bold uppercase tracking-wider hover:bg-[#6B0000] transition-colors text-center"
            >
              Apply
            </button>
          </div>
        </div>

        <div className="mb-10 relative">
          <h3 className="text-[14px] font-bold mb-4">Explore websites, people, and locations</h3>
          <div className="bg-[#F3F3F3] p-3 flex items-center focus-within:bg-white focus-within:ring-1 focus-within:ring-[#8A0000] transition-all">
            <Search size={16} className="text-[#8A0000] mr-3" />
            <input 
              type="text" 
              placeholder="What are you looking for?" 
              className="bg-transparent text-[13px] w-full outline-none" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearching(e.target.value.length > 0);
              }}
              onFocus={() => searchQuery.length > 0 && setIsSearching(true)}
              onBlur={() => setTimeout(() => setIsSearching(false), 200)}
            />
          </div>

          <AnimatePresence>
            {isSearching && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 bg-white shadow-xl border border-gray-100 z-50 mt-1 p-2"
              >
                {mockResults.length > 0 ? mockResults.map((res, i) => (
                  <div key={i} className="p-3 hover:bg-gray-50 cursor-pointer flex justify-between items-center group">
                    <span className="text-[13px] font-medium">{res.title}</span>
                    <span className="text-[10px] font-bold uppercase text-gray-400 group-hover:text-[#8A0000]">{res.type}</span>
                  </div>
                )) : (
                  <div className="p-4 text-[12px] text-gray-500 italic text-center">No matches found for "{searchQuery}"</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mb-10">
          <h3 className="text-[14px] font-bold mb-4 uppercase tracking-tight">Top resources for</h3>
          <ul className="text-[14px] space-y-3 font-medium">
            <li><button onClick={() => { goHome(); onClose?.(); }} className="side-link w-full text-left">prospective students</button></li>
            <li><button onClick={() => { goToPage('education'); onClose?.(); }} className="side-link w-full text-left">current students</button></li>
            <li><button onClick={() => { goToPage('about'); onClose?.(); }} className="side-link w-full text-left">faculty & staff</button></li>
            <li><button onClick={() => { goToPage('about'); onClose?.(); }} className="side-link w-full text-left">alumni</button></li>
            <li><button onClick={() => { goToPage('campus'); onClose?.(); }} className="side-link w-full text-left">communities & partners</button></li>
          </ul>
        </div>

        <div className="bg-[#FFF5F5] border border-[#FFDADA] p-5 mb-10">
          <h4 className="text-[14px] font-bold border-b border-[#FFDADA] pb-2 mb-3">Artemis Manifesto</h4>
          <button onClick={() => { goToPage('about'); onClose?.(); }} className="text-[13px] leading-snug text-left hover:underline">Read the 'The Artemis Project' - our mission to re-engineer human learning.</button>
        </div>

        <div className="mb-6">
          <button
            onClick={() => { goToPage('blog'); onClose?.(); }}
            className="flex items-center justify-between w-full py-3 border-t border-b border-gray-100 group"
          >
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-1">From the Journal</div>
              <span className="text-[13px] font-medium group-hover:text-[#8A0000] transition-colors">Latest stories & research</span>
            </div>
            <svg className="w-4 h-4 text-gray-300 group-hover:text-[#8A0000] group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>

      {/* SIDEBAR FOOTER */}
      <div className="pb-10 border-t border-gray-100 pt-8 px-8 lg:px-10">
        <div className="flex items-center gap-2.5 mb-1">
          <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 3L4 9V19.5C4 28.5 11 35.5 20 37.5C29 35.5 36 28.5 36 19.5V9L20 3Z" stroke="#8A0000" strokeWidth="1.8" fill="none"/>
            <path d="M20 5.5L6.5 10.8V19.5C6.5 27.2 12.4 33.2 20 35C27.6 33.2 33.5 27.2 33.5 19.5V10.8L20 5.5Z" fill="rgba(138,0,0,0.06)"/>
            <path d="M20 11L14 24H16.5L17.8 20.8H22.2L23.5 24H26L20 11ZM18.6 18.8L20 14.8L21.4 18.8H18.6Z" fill="#8A0000"/>
            <line x1="12" y1="28" x2="28" y2="28" stroke="rgba(138,0,0,0.25)" strokeWidth="0.8"/>
            <circle cx="15" cy="30.5" r="0.8" fill="rgba(138,0,0,0.4)"/>
            <circle cx="20" cy="30.5" r="0.8" fill="rgba(138,0,0,0.4)"/>
            <circle cx="25" cy="30.5" r="0.8" fill="rgba(138,0,0,0.4)"/>
          </svg>
          <div className="leading-[1.1]">
            <span className="text-[11px] font-semibold tracking-tight text-gray-800">University of </span>
            <span className="text-[12px] font-bold tracking-tight text-gray-800">Artemis</span>
          </div>
        </div>
        <p className="text-[12px] text-gray-600 mb-4 leading-tight">A global collegiate model for the collective future of humanity.</p>
        
        <div className="text-[12px] space-x-2 mb-2 font-medium">
          <button onClick={() => goToPage('visit-us')} className="footer-link">Visit</button>
          <button onClick={() => goToPage('campus')} className="footer-link">Map</button>
          <button onClick={() => goToPage('blog')} className="footer-link">Journal</button>
          <button onClick={() => goToPage('campus')} className="footer-link">Events</button>
          <button onClick={() => goToPage('jobs')} className="footer-link">Jobs</button>
          <button onClick={() => goToPage('fundraising')} className="footer-link text-[#8A0000]">Give</button>
          <button onClick={() => goToPage('contact-us')} className="footer-link">Contact</button>
        </div>
        <div className="text-[12px] space-x-2 mb-6 font-medium">
          <button onClick={() => goToPage('about')} className="footer-link">Privacy</button>
          <button onClick={() => goToPage('access-at-artemis')} className="footer-link">Accessibility</button>
        </div>
        
        <div className="flex space-x-4 grayscale opacity-60 text-sm font-bold">
          <span>𝕏</span>
          <span>f</span>
          <span>In</span>
          <span>IG</span>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar — only on homepage (when desktopOnly is not set) */}
      {!hideDesktopSidebar && (
        <aside className="w-[330px] hidden lg:flex flex-col border-r border-gray-100 sticky top-[50px] h-[calc(100vh-50px)] shrink-0 overflow-hidden bg-white">
          {sidebarContent}
        </aside>
      )}

      {/* Mobile Drawer — available on all pages */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-[110] lg:hidden backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-[330px] bg-white z-[120] flex flex-col lg:hidden shadow-2xl"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
