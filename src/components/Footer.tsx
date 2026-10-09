import React from 'react';
import { FREELANCER_INFO } from '../data/portfolioData';
import { ArrowUp, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      data-template-id="site-footer"
      className="canva-footer text-center px-5 py-10 border-t border-[#e7d6d9] bg-[#fff9f3]"
    >
      <div className="max-w-[1160px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand signature */}
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-lg text-[#383047]">
            {FREELANCER_INFO.name}
          </span>
          <span className="text-xs text-[#6b607c]">· Creative Freelancer Portfolio</span>
        </div>

        {/* Footer Text matching template */}
        <p
          data-template-id="footer-text"
          className="canva-text text-xs text-[#6b607c] flex items-center justify-center gap-1.5"
        >
          <span>© {new Date().getFullYear()} {FREELANCER_INFO.name}. Designed with</span>
          <Heart className="w-3.5 h-3.5 text-[#b75078] fill-current inline" />
          <span>and dedication. All rights reserved.</span>
        </p>

        {/* Back to top button */}
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#383047] hover:text-[#b75078] bg-white px-3.5 py-1.5 rounded-full border border-[#e7d6d9] hover:border-[#b75078] transition-all shadow-2xs"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3 h-3" />
        </button>
      </div>
    </footer>
  );
};
