import React, { useState, useEffect } from 'react';
import { FREELANCER_INFO } from '../data/portfolioData';
import { getMediaItem, getSyncMediaItem } from '../utils/mediaStorage';
import {
  ArrowDown,
  Mail
} from 'lucide-react';

export const Hero: React.FC = () => {
  // Independent Wallpaper State (checks IndexedDB, localStorage, and fallback)
  const [wallpaper, setWallpaper] = useState<string>(() => {
    return getSyncMediaItem('agnes_hero_wallpaper_v5', FREELANCER_INFO.wallpaperUrl || '/agnes_wallpaper.jpg');
  });

  // Independent Profile Picture State (checks IndexedDB, localStorage, and fallback)
  const [profilePicture, setProfilePicture] = useState<string>(() => {
    return getSyncMediaItem('agnes_profile_avatar_v6', FREELANCER_INFO.avatarUrl || '/assets/images/agnes_photo.jpg');
  });

  // Hydrate wallpaper and avatar from IndexedDB (survives refreshes & large images)
  useEffect(() => {
    let isMounted = true;
    getMediaItem('agnes_hero_wallpaper_v5').then((savedWp) => {
      if (isMounted && savedWp) setWallpaper(savedWp);
    });
    getMediaItem('agnes_profile_avatar_v6').then((savedAv) => {
      if (isMounted && savedAv) setProfilePicture(savedAv);
    });

    const handleMediaUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<{ key: string; url: string }>;
      if (customEvent.detail) {
        if (customEvent.detail.key === 'agnes_hero_wallpaper_v5') {
          setWallpaper(customEvent.detail.url);
        }
        if (customEvent.detail.key === 'agnes_profile_avatar_v6') {
          setProfilePicture(customEvent.detail.url);
        }
      }
    };

    window.addEventListener('agnes_media_updated', handleMediaUpdated);
    return () => {
      isMounted = false;
      window.removeEventListener('agnes_media_updated', handleMediaUpdated);
    };
  }, []);

  return (
    <section
      id="intro"
      data-template-id="intro-section"
      className="canva-section hero relative"
    >
      {/* Background Wallpaper Photo */}
      <div className="hero-photo-wrap absolute inset-0 overflow-hidden">
        {wallpaper ? (
          <img
            src={wallpaper}
            alt="Agnes Abelido - Introduction Wallpaper"
            data-template-id="hero-image"
            referrerPolicy="no-referrer"
            className="canva-image hero-photo w-full h-full object-cover object-center sm:object-right transition-opacity duration-300"
            loading="eager"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#fdf4f7] via-[#faebf2] to-[#f4dde7] relative">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#f7c9d8]/30 blur-3xl" />
            <div className="absolute bottom-1/3 right-10 w-80 h-80 rounded-full bg-[#b75078]/15 blur-2xl" />
          </div>
        )}
        <div className="hero-overlay" />
      </div>

      {/* Hero Copy (Overlaid gracefully on the wallpaper) */}
      <div className="hero-copy relative z-10 w-full min-h-[640px] flex items-center">
        <div className="max-w-[650px] p-6 sm:p-10 rounded-[36px] bg-white/85 backdrop-blur-md border border-white/60 shadow-xl my-10">
          {/* Eyebrow Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              data-template-id="hero-eyebrow"
              className="canva-tag text-xs font-bold uppercase tracking-wider text-[#b75078] bg-white/90 border border-[#b75078]/30 px-3.5 py-1.5 rounded-full shadow-2xs"
            >
              [ i'm a student ]
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8e44ad] bg-white/90 border border-[#8e44ad]/30 px-3.5 py-1.5 rounded-full shadow-2xs">
              [ i'm a social media manager! ]
            </span>
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Creative Roles</span>
            </span>
            <span className="text-[11px] font-semibold text-[#8e44ad] bg-[#f4ecfc] px-3 py-1 rounded-full flex items-center gap-1.5 border border-[#e2cbf7]">
              <span className="w-2 h-2 rounded-full bg-[#8e44ad] animate-pulse" />
              <span>Available for Social Media Roles</span>
            </span>
          </div>

          {/* Main Title */}
          <h1
            data-template-id="hero-title"
            className="canva-text font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#383047] leading-[1.08] tracking-tight mb-4"
          >
            get to <span className="text-[#b75078] italic font-serif">know me!</span>
          </h1>

          {/* Introduction Card with Dedicated Profile Picture */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#fff9f3]/95 backdrop-blur-sm border border-[#e7d6d9] mb-5 shadow-xs">
            <div className="flex items-center gap-3.5 mb-3">
              {/* Profile Picture (Avatar) next to "My name is Agnes!" */}
              <div className="relative shrink-0">
                <img
                  src={profilePicture}
                  alt="Agnes Abelido Profile Picture"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/images/agnes_photo.jpg';
                  }}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover object-center border-2 border-[#b75078]/40 shadow-md ring-4 ring-white bg-white"
                />
              </div>

              {/* Profile Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base sm:text-lg font-display font-bold text-[#383047] flex items-center gap-1.5">
                    <span>My name is Agnes Grace J. Abelido</span>
                    <span className="inline-block animate-bounce origin-bottom-right text-base sm:text-xl" role="img" aria-label="waving hand">👋</span>
                  </span>
                </div>
                <div className="text-xs text-[#6b607c] mt-1 font-medium">
                  BSBA Business Economics Student · Social Media Manager & Content Creator
                </div>
              </div>
            </div>

            <p
              data-template-id="hero-description"
              className="canva-text text-sm sm:text-base text-[#554b65] leading-relaxed"
            >
              {FREELANCER_INFO.heroDescription}
            </p>
          </div>

          {/* Experience stats */}
          <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-white/80 border border-[#e7d6d9] text-center">
            <div>
              <div className="text-xl sm:text-2xl font-bold font-display text-[#b75078]">
                4 Years
              </div>
              <div className="text-[11px] text-[#6b607c] font-medium leading-tight mt-0.5">
                Social Media Management & Leadership
              </div>
            </div>
            <div className="border-l border-[#e7d6d9] pl-3">
              <div className="text-xl sm:text-2xl font-bold font-display text-[#383047]">
                DLSU-D
              </div>
              <div className="text-[11px] text-[#6b607c] font-medium leading-tight mt-0.5">
                BSBA Business Economics
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#works"
              data-template-id="hero-cta"
              className="canva-button inline-flex items-center gap-2 bg-[#b75078] hover:bg-[#9c3b63] text-white px-7 py-3 rounded-full font-bold text-xs tracking-wide uppercase shadow-md shadow-[#b75078]/25 hover:-translate-y-0.5 transition-all no-underline"
            >
              <span>Explore My Works</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white hover:bg-[#faebf2] text-[#383047] hover:text-[#b75078] border border-[#e7d6d9] px-6 py-3 rounded-full font-semibold text-xs uppercase tracking-wide transition-all shadow-2xs hover:-translate-y-0.5"
            >
              <Mail className="w-3.5 h-3.5 text-[#b75078]" />
              <span>Contact Agnes</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
