import React, { useState, useEffect } from 'react';
import { FREELANCER_INFO } from '../data/portfolioData';
import { Menu, X, Sparkles, Send } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About', templateId: 'nav-about' },
    { href: '#works', label: 'Works', templateId: 'nav-works' },
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact', templateId: 'nav-contact' }
  ];

  return (
    <header
      data-template-id="site-header"
      className={`canva-header sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#fff9f3]/90 backdrop-blur-md border-b border-[#e7d6d9] shadow-xs'
          : 'bg-[#fff9f3]/70 backdrop-blur-sm border-b border-[#e7d6d9]/60'
      }`}
    >
      <nav
        className="max-w-[1160px] mx-auto px-5 py-4 flex items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        <a
          href="#intro"
          data-template-id="brand-link"
          className="canva-link font-display text-xl sm:text-2xl font-bold tracking-tight text-[#383047] no-underline hover:text-[#b75078] transition-colors flex items-center gap-2.5 group"
        >
          {/* Forward-facing daisy with no frame/container around it */}
          <svg
            viewBox="0 0 40 40"
            className="w-8 h-8 group-hover:rotate-45 transition-transform duration-500 shrink-0 drop-shadow-xs"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* 12 forward-facing daisy petals in full bloom */}
            <g fill="#FFFDF8" stroke="#E2CAD4" strokeWidth="1">
              <ellipse cx="20" cy="8" rx="3.2" ry="5.5" />
              <ellipse cx="26" cy="9.6" rx="3.2" ry="5.5" transform="rotate(30 26 9.6)" />
              <ellipse cx="30.4" cy="14" rx="3.2" ry="5.5" transform="rotate(60 30.4 14)" />
              <ellipse cx="32" cy="20" rx="3.2" ry="5.5" transform="rotate(90 32 20)" />
              <ellipse cx="30.4" cy="26" rx="3.2" ry="5.5" transform="rotate(120 30.4 26)" />
              <ellipse cx="26" cy="30.4" rx="3.2" ry="5.5" transform="rotate(150 26 30.4)" />
              <ellipse cx="20" cy="32" rx="3.2" ry="5.5" />
              <ellipse cx="14" cy="30.4" rx="3.2" ry="5.5" transform="rotate(210 14 30.4)" />
              <ellipse cx="9.6" cy="26" rx="3.2" ry="5.5" transform="rotate(240 9.6 26)" />
              <ellipse cx="8" cy="20" rx="3.2" ry="5.5" transform="rotate(270 8 20)" />
              <ellipse cx="9.6" cy="14" rx="3.2" ry="5.5" transform="rotate(300 9.6 14)" />
              <ellipse cx="14" cy="9.6" rx="3.2" ry="5.5" transform="rotate(330 14 9.6)" />
            </g>
            {/* Daisy golden-yellow center disc */}
            <circle cx="20" cy="20" r="5.8" fill="#FBBF24" stroke="#D97706" strokeWidth="0.8" />
            <circle cx="20" cy="20" r="4.2" fill="#F59E0B" />
            <circle cx="18.5" cy="18.5" r="1.5" fill="#FDE68A" opacity="0.85" />
          </svg>
          <span className="font-display font-bold text-lg text-[#383047] group-hover:text-[#b75078] transition-colors">
            Portfolio
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-7">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.templateId ? { 'data-template-id': link.templateId } : {})}
                className="canva-link text-sm font-medium text-[#383047]/80 hover:text-[#b75078] no-underline hover:underline transition-colors relative py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="h-4 w-px bg-[#e7d6d9]" />

          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#b75078] text-white hover:bg-[#9c3b63] px-5 py-2 rounded-full text-xs font-semibold tracking-wide uppercase shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Hire Me</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden p-2 rounded-lg text-[#383047] hover:bg-[#f7c9d8]/40 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fff9f3] border-b border-[#e7d6d9] px-6 py-5 shadow-lg">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.templateId ? { 'data-template-id': link.templateId } : {})}
                onClick={() => setMobileMenuOpen(false)}
                className="canva-link text-base font-medium text-[#383047] hover:text-[#b75078] py-1.5 border-b border-[#f4ecfc]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 bg-[#b75078] text-white px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide uppercase mt-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Let's Work Together</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
