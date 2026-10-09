import React, { useState, useEffect } from 'react';
import { FREELANCER_INFO } from '../data/portfolioData';
import { Menu, X, Sparkles, Send, Flower2 } from 'lucide-react';

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
          className="canva-link font-display text-xl sm:text-2xl font-bold tracking-tight text-[#383047] no-underline hover:text-[#b75078] transition-colors flex items-center gap-2 group"
        >
          <span className="w-8 h-8 rounded-full bg-[#fce8f0] text-[#b75078] flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform shadow-2xs border border-[#f7c9d8]">
            <Flower2 className="w-4.5 h-4.5 text-[#b75078]" />
          </span>
          <span>{FREELANCER_INFO.name}</span>
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
