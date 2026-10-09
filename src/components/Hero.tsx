import React, { useState, useEffect, useRef } from 'react';
import { FREELANCER_INFO } from '../data/portfolioData';
import {
  ArrowDown,
  Mail,
  Camera,
  Flower2,
  Upload,
  Check,
  Trash2,
  Image as ImageIcon,
  User,
  X,
  Sparkles
} from 'lucide-react';

export const Hero: React.FC = () => {
  // 1. Independent Wallpaper State
  const [wallpaper, setWallpaper] = useState<string>(() => {
    try {
      const savedWallpaper = localStorage.getItem('agnes_hero_wallpaper_v5');
      if (savedWallpaper && (savedWallpaper.startsWith('data:image') || savedWallpaper.startsWith('blob:') || savedWallpaper.startsWith('/'))) {
        return savedWallpaper;
      }
    } catch {
      // ignore
    }
    return FREELANCER_INFO.wallpaperUrl || '/agnes_wallpaper.jpg';
  });

  // 2. Independent Profile Picture State (next to "My name is Agnes!")
  const [profilePicture, setProfilePicture] = useState<string>(() => {
    try {
      const savedProfile = localStorage.getItem('agnes_profile_avatar_v5');
      if (savedProfile && (savedProfile.startsWith('data:image') || savedProfile.startsWith('blob:') || savedProfile.startsWith('/'))) {
        return savedProfile;
      }
    } catch {
      // ignore
    }
    return FREELANCER_INFO.avatarUrl || '/agnes_portrait.svg';
  });

  // UI feedback and modals
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDraggingAvatar, setIsDraggingAvatar] = useState(false);
  const [isDraggingHero, setIsDraggingHero] = useState(false);
  const [pastedImageModal, setPastedImageModal] = useState<string | null>(null);

  // File input refs
  const wallpaperInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  // --- Handlers for Wallpaper ---
  const handleApplyWallpaper = (dataUrl: string) => {
    setWallpaper(dataUrl);
    try {
      localStorage.setItem('agnes_hero_wallpaper_v5', dataUrl);
    } catch {
      // ignore quota
    }
    showToast('Introduction Wallpaper updated! 🖼️');
  };

  const handleWallpaperFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) handleApplyWallpaper(result);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const handleResetWallpaper = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWallpaper('/agnes_wallpaper.jpg');
    try {
      localStorage.removeItem('agnes_hero_wallpaper_v5');
    } catch {
      // ignore
    }
    showToast('Wallpaper reset to default picture 🖼️');
  };

  // --- Handlers for Profile Picture (Avatar next to "My name is Agnes!") ---
  const handleApplyProfilePicture = (dataUrl: string) => {
    setProfilePicture(dataUrl);
    try {
      localStorage.setItem('agnes_profile_avatar_v5', dataUrl);
    } catch {
      // ignore quota
    }
    showToast('Profile picture next to "My name is Agnes" updated! 👤✨');
  };

  const handleProfileFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) handleApplyProfilePicture(result);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const handleResetProfilePicture = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProfilePicture('/agnes_portrait.svg');
    try {
      localStorage.removeItem('agnes_profile_avatar_v5');
    } catch {
      // ignore
    }
    showToast('Profile picture reset to default avatar 👤');
  };

  // --- Drag and Drop for Avatar Zone ---
  const handleAvatarDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingAvatar(true);
  };

  const handleAvatarDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingAvatar(false);
  };

  const handleAvatarDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingAvatar(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) handleApplyProfilePicture(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Drag and Drop for Hero Section Background (Wallpaper) ---
  const handleHeroDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingHero(true);
  };

  const handleHeroDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingHero(false);
  };

  const handleHeroDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingHero(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) handleApplyWallpaper(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Clipboard Paste (Ctrl+V) anywhere on the page ---
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const blob = items[i].getAsFile();
          if (blob) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const result = event.target?.result as string;
              if (result) {
                // Open modal asking user which picture to update
                setPastedImageModal(result);
              }
            };
            reader.readAsDataURL(blob);
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const isCustomWallpaper = wallpaper !== '/agnes_wallpaper.jpg';
  const isCustomProfile = profilePicture !== '/agnes_portrait.svg';

  return (
    <section
      id="intro"
      data-template-id="intro-section"
      onDragOver={handleHeroDragOver}
      onDragLeave={handleHeroDragLeave}
      onDrop={handleHeroDrop}
      className="canva-section hero relative"
    >
      {/* 1. Hidden file input for Wallpaper */}
      <input
        ref={wallpaperInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleWallpaperFileChange}
      />

      {/* 2. Hidden file input for Profile Picture */}
      <input
        ref={profileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleProfileFileChange}
      />

      {/* Floating success notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#383047] text-white text-xs font-semibold shadow-2xl border border-white/20 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Paste Choice Modal (if user pastes an image via Ctrl+V) */}
      {pastedImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#e7d6d9] relative text-center">
            <button
              type="button"
              onClick={() => setPastedImageModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#6b607c] hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-full bg-[#faebf2] text-[#b75078] flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6" />
            </div>

            <h3 className="font-display font-bold text-xl text-[#383047] mb-1">
              Apply Pasted Image
            </h3>
            <p className="text-xs text-[#6b607c] mb-4">
              Where would you like to use this picture?
            </p>

            {/* Thumbnail preview */}
            <div className="mb-5 max-h-40 overflow-hidden rounded-xl border border-[#e7d6d9] bg-[#faebf2]/30 flex items-center justify-center">
              <img
                src={pastedImageModal}
                alt="Pasted preview"
                className="max-h-40 w-auto object-contain"
              />
            </div>

            {/* Two separate target buttons */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  handleApplyProfilePicture(pastedImageModal);
                  setPastedImageModal(null);
                }}
                className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#faebf2] hover:bg-[#f7c9d8] border border-[#b75078]/40 text-[#b75078] transition-all cursor-pointer group"
              >
                <User className="w-5 h-5 mb-1 text-[#b75078] group-hover:scale-110 transition-transform" />
                <span className="font-bold text-xs">Set as Profile Picture</span>
                <span className="text-[10px] text-[#6b607c]">Next to "My name is Agnes"</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  handleApplyWallpaper(pastedImageModal);
                  setPastedImageModal(null);
                }}
                className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#383047] hover:bg-[#282035] border border-white/20 text-white transition-all cursor-pointer group"
              >
                <ImageIcon className="w-5 h-5 mb-1 text-pink-300 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-xs">Set as Wallpaper</span>
                <span className="text-[10px] text-neutral-300">Introduction Background</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drag overlay for hero wallpaper */}
      {isDraggingHero && !isDraggingAvatar && (
        <div className="absolute inset-0 z-30 bg-[#faebf2]/85 backdrop-blur-xs flex flex-col items-center justify-center text-[#b75078] font-bold text-base pointer-events-none border-4 border-dashed border-[#b75078]">
          <Upload className="w-10 h-10 mb-2 animate-bounce text-[#b75078]" />
          <span>Drop here to set as Introduction Background Wallpaper 🖼️</span>
        </div>
      )}

      {/* --- SEPARATE ELEMENT 1: Background Wallpaper Photo --- */}
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
        {/* Soft overlay gradient so typography and content remain readable */}
        <div className="hero-overlay" />
      </div>

      {/* Distinct Wallpaper Controls in top-right */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <div className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/60 shadow-xs flex items-center gap-1.5 text-[11px] font-medium text-[#6b607c]">
          <ImageIcon className="w-3.5 h-3.5 text-[#b75078]" />
          <span className="font-semibold text-[#383047]">Wallpaper</span>
        </div>

        {isCustomWallpaper && (
          <button
            type="button"
            onClick={handleResetWallpaper}
            title="Reset wallpaper to default photo"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-[11px] font-semibold text-rose-700 hover:text-rose-900 border border-rose-200 shadow-xs backdrop-blur-md transition-all cursor-pointer"
          >
            <Trash2 className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => wallpaperInputRef.current?.click()}
          title="Change the Hero Background Wallpaper"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 hover:bg-white text-[11px] font-bold text-[#b75078] hover:text-[#9c3b63] border border-[#b75078]/30 shadow-xs backdrop-blur-md transition-all cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5 text-[#b75078]" />
          <span>Change Wallpaper</span>
        </button>
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
          </div>

          {/* Main Title */}
          <h1
            data-template-id="hero-title"
            className="canva-text font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#383047] leading-[1.08] tracking-tight mb-4"
          >
            get to <span className="text-[#b75078] italic font-serif">know me!</span>
          </h1>

          {/* --- SEPARATE ELEMENT 2: Introduction Card with Dedicated Profile Picture next to "My name is Agnes!" --- */}
          <div
            onDragOver={handleAvatarDragOver}
            onDragLeave={handleAvatarDragLeave}
            onDrop={handleAvatarDrop}
            className={`p-5 sm:p-6 rounded-2xl bg-[#fff9f3]/95 backdrop-blur-sm border transition-all duration-200 mb-5 shadow-xs relative ${
              isDraggingAvatar
                ? 'border-2 border-dashed border-[#b75078] bg-[#faebf2]/95 scale-[1.01]'
                : 'border-[#e7d6d9]'
            }`}
          >
            {isDraggingAvatar && (
              <div className="absolute inset-0 z-30 rounded-2xl bg-[#faebf2]/95 flex flex-col items-center justify-center text-[#b75078] font-bold text-sm pointer-events-none">
                <Upload className="w-8 h-8 mb-2 animate-bounce text-[#b75078]" />
                <span>Drop photo to set Profile Picture for Agnes! 👤</span>
              </div>
            )}

            <div className="flex items-center gap-3.5 mb-3">
              {/* Separate Profile Picture (Avatar) next to "My name is Agnes!" */}
              <div
                onClick={() => profileInputRef.current?.click()}
                title="Click to choose or change Profile Picture for Agnes"
                className="relative group cursor-pointer shrink-0"
              >
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="Agnes Abelido Profile Picture"
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover object-center border-2 border-[#b75078]/40 shadow-md ring-4 ring-white group-hover:scale-105 transition-all bg-white"
                  />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#faebf2] via-[#fce4ec] to-[#f8bbd0] border-2 border-[#b75078]/40 shadow-md ring-4 ring-white flex flex-col items-center justify-center text-[#b75078] group-hover:scale-105 transition-all">
                    <span className="font-display font-bold text-lg text-[#b75078]">AA</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#6b607c]">Photo</span>
                  </div>
                )}

                {/* Camera icon badge on the Profile Picture */}
                <div
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#b75078] text-white flex items-center justify-center shadow-md border-2 border-white group-hover:scale-110 transition-transform"
                  title="Upload / Change Profile Picture"
                >
                  <Camera className="w-3 h-3" />
                </div>
              </div>

              {/* Profile Details & Separate Controls */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-base sm:text-lg font-display font-bold text-[#383047]">
                    My name is Agnes!
                  </span>
                  <Flower2 className="w-4 h-4 text-[#b75078]" />
                </div>

                {/* Profile Picture Specific Controls */}
                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => profileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faebf2] hover:bg-[#f7c9d8] text-[#b75078] text-[11px] font-bold border border-[#b75078]/30 transition-all cursor-pointer shadow-2xs hover:-translate-y-0.5"
                  >
                    <User className="w-3 h-3" />
                    <span>{isCustomProfile ? 'Change Profile Picture' : 'Upload Profile Picture'}</span>
                  </button>

                  {isCustomProfile && (
                    <button
                      type="button"
                      onClick={handleResetProfilePicture}
                      title="Reset profile picture to default"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white hover:bg-neutral-100 text-[#8b3a58] text-[11px] font-semibold border border-[#e7d6d9] transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  )}

                  <span className="text-[10px] text-[#8e829d]">
                    (Separate from the Wallpaper)
                  </span>
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

          {/* Clean experience stats */}
          <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-white/80 border border-[#e7d6d9] text-center">
            <div>
              <div className="text-xl sm:text-2xl font-bold font-display text-[#b75078]">
                4 Years
              </div>
              <div className="text-[11px] text-[#6b607c] font-medium leading-tight mt-0.5">
                School Org Graphics & Leadership
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
