import React, { useState, useRef, useEffect } from 'react';
import { PROJECTS, COPYWRITING_PIECES, ProjectItem, CopywritingItem } from '../data/portfolioData';
import { Eye, Search, Sparkles, BookOpen, Copy, Check, Quote, Tag, Camera, RotateCcw } from 'lucide-react';
import { saveMediaItem, getMediaItem, deleteMediaItem } from '../utils/mediaStorage';

interface WorksProps {
  onOpenProject: (project: ProjectItem) => void;
}

// Visual Card with direct Picture & Video Editing feature
const WorkVisualCard: React.FC<{
  project: ProjectItem;
  onOpenProject: (project: ProjectItem) => void;
  onToast: (msg: string) => void;
}> = ({ project, onOpenProject, onToast }) => {
  const [currentImg, setCurrentImg] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(`agnes_work_img_${project.id}`);
      if (saved && (saved.startsWith('data:') || saved.startsWith('blob:') || saved.startsWith('/') || saved.startsWith('http'))) {
        return saved;
      }
    } catch {
      // ignore
    }
    return project.videoUrl || project.imageUrl;
  });

  useEffect(() => {
    let isMounted = true;
    getMediaItem(`agnes_work_img_${project.id}`).then((stored) => {
      if (isMounted && stored) {
        setCurrentImg(stored);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [project.id]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const isVideoCategory =
    project.category === 'videos' ||
    ['ai-6', 'ai-7', 'ai-8', 'ai-9', 'ai-10'].includes(project.id);
  const isAi = project.category === 'ai';
  const isCustom = currentImg !== project.imageUrl && currentImg !== project.videoUrl;

  const isVideoFile =
    currentImg.startsWith('data:video') ||
    currentImg.startsWith('blob:') ||
    currentImg.endsWith('.mp4') ||
    currentImg.endsWith('.webm') ||
    currentImg.endsWith('.mov') ||
    Boolean(project.videoUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        const objectUrl = URL.createObjectURL(file);
        setCurrentImg(objectUrl);
        // Persist directly into IndexedDB (supports high-res and large video files without 5MB limits)
        saveMediaItem(`agnes_work_img_${project.id}`, file).catch(() => {});
        onToast('Video uploaded and saved! 🎬✨');
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          if (result) {
            setCurrentImg(result);
            saveMediaItem(`agnes_work_img_${project.id}`, result).catch(() => {});
            onToast('Picture updated and saved! 🖼️');
          }
        };
        reader.readAsDataURL(file);
      }
    }
    e.target.value = '';
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg(project.videoUrl || project.imageUrl);
    deleteMediaItem(`agnes_work_img_${project.id}`).catch(() => {});
    onToast('Reset to original media');
  };

  return (
    <article
      data-template-id={project.templateCardId || `card-${project.id}`}
      onClick={() =>
        onOpenProject({
          ...project,
          imageUrl: isVideoFile ? (project.imageUrl || currentImg) : currentImg,
          videoUrl: isVideoFile ? currentImg : undefined
        })
      }
      className="soft-card rounded-[26px] overflow-hidden group cursor-pointer border border-[#563e4b]/12 hover:border-[#b75078] transition-all duration-300 bg-white shadow-xs hover:shadow-xl hover:-translate-y-1 relative"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,video/*,video/mp4,video/webm,video/quicktime"
        className="hidden"
      />
      <div className="relative overflow-hidden aspect-[4/3] bg-[#f4ecfc]/40">
        {isVideoFile && (currentImg.startsWith('data:video') || currentImg.startsWith('blob:') || currentImg.endsWith('.mp4') || currentImg.endsWith('.webm')) ? (
          <video
            src={currentImg}
            muted
            loop
            autoPlay
            playsInline
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <img
            src={currentImg}
            alt="Work sample"
            data-template-id={project.templateImageId || `img-${project.id}`}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        )}

        {/* Hover overlay with View / Open button and Edit Picture/Video button */}
        <div className="absolute inset-0 bg-[#383047]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <span className="bg-white/95 text-[#383047] font-semibold text-xs px-3.5 py-2 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-[#b75078]" />
            <span>View</span>
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            title={isVideoCategory ? "Upload / Replace Video or Photo" : "Upload / Replace Picture"}
            className="bg-white/95 hover:bg-white text-[#b75078] font-semibold text-xs px-3 py-2 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{isVideoCategory ? 'Upload Video/Photo' : 'Edit'}</span>
          </button>
          {isCustom && (
            <button
              type="button"
              onClick={handleReset}
              title="Reset to original"
              className="bg-white/95 hover:bg-white text-rose-600 font-semibold text-xs p-2 rounded-full shadow-lg flex items-center transform translate-y-2 group-hover:translate-y-0 transition-transform cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Corner badge indicating human category or AI work */}
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#383047] bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-2xs border border-white/60">
            {isAi
              ? (isVideoCategory ? 'AI Video' : 'AI Concept')
              : project.category === 'dpblasts'
              ? 'DP Blast'
              : project.category === 'mockups'
              ? 'Merch Mockup'
              : project.category === 'videos'
              ? 'Campus Video'
              : 'Pubmat'}
          </span>
        </div>

        {/* Direct Camera icon in top right corner to edit image/video anytime */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          title={isVideoCategory ? "Upload Video or Photo" : "Upload / Change Picture"}
          className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md hover:bg-white text-[#b75078] flex items-center justify-center shadow-xs border border-white/60 opacity-80 group-hover:opacity-100 transition-all cursor-pointer"
        >
          <Camera className="w-3.5 h-3.5" />
        </button>

        {/* Subtle play indicator for video entries (if not directly playing inline video) */}
        {isVideoCategory && !isVideoFile && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
            <div className="w-11 h-11 rounded-full bg-black/55 backdrop-blur-sm flex items-center justify-center text-white shadow-lg ring-2 ring-white/60">
              <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[11px] border-l-white ml-0.5" />
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export const Works: React.FC<WorksProps> = ({ onOpenProject }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'pubmats' | 'mockups' | 'dpblasts' | 'videos' | 'ai' | 'copywriting'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCopyPiece, setSelectedCopyPiece] = useState<CopywritingItem>(COPYWRITING_PIECES[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  const pubmatProjects = PROJECTS.filter((p) => p.category === 'pubmats');
  const mockupProjects = PROJECTS.filter((p) => p.category === 'mockups');
  const dpblastProjects = PROJECTS.filter((p) => p.category === 'dpblasts');
  const videoProjects = PROJECTS.filter((p) => p.category === 'videos');
  const aiImageProjects = PROJECTS.filter((p) => p.category === 'ai' && !['ai-6', 'ai-7', 'ai-8', 'ai-9', 'ai-10'].includes(p.id));
  const aiVideoProjects = PROJECTS.filter((p) => p.category === 'ai' && ['ai-6', 'ai-7', 'ai-8', 'ai-9', 'ai-10'].includes(p.id));

  const filterButtons = [
    { id: 'filter-all', category: 'all' as const, label: `All Works (${PROJECTS.length})` },
    { id: 'filter-pubmats', category: 'pubmats' as const, label: `Pubmats & Graphics (${pubmatProjects.length})` },
    { id: 'filter-mockups', category: 'mockups' as const, label: `Merch Mockups (${mockupProjects.length})` },
    { id: 'filter-dpblasts', category: 'dpblasts' as const, label: `DP Blasts (${dpblastProjects.length})` },
    { id: 'filter-videos', category: 'videos' as const, label: `Videos (${videoProjects.length})` },
    { id: 'filter-ai', category: 'ai' as const, label: `AI Concepts (${aiImageProjects.length + aiVideoProjects.length})` }
  ];

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const searchedProjects = searchQuery.trim()
    ? PROJECTS.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  return (
    <section id="works" data-template-id="works-section" className="canva-section py-20 sm:py-28 bg-[#fff9f3] relative">
      {/* Toast Notification for Image Edits */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#383047] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-xl animate-fadeIn">
          {toastMessage}
        </div>
      )}

      <div className="section-wrap max-w-[1160px] mx-auto px-5 sm:px-8">
        {/* Eyebrow, Title & Intro */}
        <div className="mb-8">
          <p
            data-template-id="works-eyebrow"
            className="canva-text uppercase tracking-[.25em] font-bold text-xs sm:text-sm text-[#b75078] mb-3"
          >
            WORK SAMPLES
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2
                data-template-id="works-title"
                className="canva-text font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#383047]"
              >
                Curated Student Org & Creative Works
              </h2>
              <p
                data-template-id="works-note"
                className="canva-text mt-3 text-sm sm:text-base text-[#554b65] max-w-2xl leading-relaxed"
              >
                Graphics and content developed over 4 years across DLSU-D student organizations—featuring publication materials, merchandise mockups, Facebook DP blasts, CapCut event reels, and original copywriting.
              </p>
            </div>

            {/* Quick search input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-[#6b607c] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search works, orgs or tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-[#d8b7c5] bg-white focus:outline-hidden focus:border-[#b75078] focus:ring-1 focus:ring-[#b75078] text-[#383047]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6b607c] hover:text-[#383047]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter buttons styled like Background tab buttons */}
        <div
          className="flex flex-wrap items-center gap-2 mb-10 p-1.5 bg-white/80 rounded-2xl border border-[#e7d6d9] w-fit"
          role="group"
          aria-label="Filter work samples"
        >
          {filterButtons.map((btn) => {
            const isSelected = activeCategory === btn.category && !searchQuery;
            return (
              <button
                key={btn.id}
                type="button"
                data-category={btn.category}
                data-template-id={btn.id}
                onClick={() => {
                  setActiveCategory(btn.category);
                  setSearchQuery('');
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#b75078] text-white shadow-xs'
                    : 'text-[#554b65] hover:text-[#383047] hover:bg-[#faebf2]'
                }`}
                aria-pressed={isSelected ? 'true' : 'false'}
              >
                {btn.label}
              </button>
            );
          })}
        </div>

        {/* Search Results */}
        {searchedProjects && (
          <div className="mb-8">
            <p className="text-xs font-semibold text-[#6b607c] mb-4">
              Found {searchedProjects.length} projects matching "{searchQuery}"
            </p>
            {searchedProjects.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border border-[#e7d6d9] p-8">
                <p className="text-sm text-[#6b607c]">No projects found matching your search.</p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-3 text-xs font-bold text-[#b75078] underline"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchedProjects.map((proj) => (
                  <WorkVisualCard
                    key={proj.id}
                    project={proj}
                    onOpenProject={onOpenProject}
                    onToast={showToast}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Regular groups matching template specifications */}
        {!searchQuery && (
          <div className="space-y-12">
            {/* PUBMATS GROUP */}
            <div
              className={`work-group ${
                activeCategory !== 'pubmats' && activeCategory !== 'all' ? 'hidden' : ''
              }`}
              data-group="pubmats"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#b75078] bg-[#faebf2] px-3.5 py-1.5 rounded-full border border-[#f7c9d8]">
                  Pubmats & Graphics
                </span>
                <span className="text-xs text-[#6b607c]">Event Posters & Social Pubmats ({pubmatProjects.length} frames)</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pubmatProjects.map((p) => (
                  <WorkVisualCard
                    key={p.id}
                    project={p}
                    onOpenProject={onOpenProject}
                    onToast={showToast}
                  />
                ))}
              </div>
            </div>

            {/* MERCH MOCKUPS GROUP */}
            <div
              className={`work-group ${
                activeCategory !== 'mockups' && activeCategory !== 'all' ? 'hidden' : ''
              }`}
              data-group="mockups"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#b75078] bg-[#faebf2] px-3.5 py-1.5 rounded-full border border-[#f7c9d8]">
                  Merch Mockups
                </span>
                <span className="text-xs text-[#6b607c]">Apparel, Pins & Brand Mockups ({mockupProjects.length} frames)</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockupProjects.map((p) => (
                  <WorkVisualCard
                    key={p.id}
                    project={p}
                    onOpenProject={onOpenProject}
                    onToast={showToast}
                  />
                ))}
              </div>
            </div>

            {/* DP BLASTS GROUP */}
            <div
              className={`work-group ${
                activeCategory !== 'dpblasts' && activeCategory !== 'all' ? 'hidden' : ''
              }`}
              data-group="dpblasts"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2980b9] bg-[#ebf5fb] px-3.5 py-1.5 rounded-full border border-[#d4e6f1]">
                  DP Blasts & Facebook Campaign Frames
                </span>
                <span className="text-xs text-[#6b607c]">Student Avatar Frames ({dpblastProjects.length} frames)</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {dpblastProjects.map((p) => (
                  <WorkVisualCard
                    key={p.id}
                    project={p}
                    onOpenProject={onOpenProject}
                    onToast={showToast}
                  />
                ))}
              </div>
            </div>

            {/* VIDEOS GROUP (Campus & Motion Works) */}
            <div
              className={`work-group ${
                activeCategory !== 'videos' && activeCategory !== 'all' ? 'hidden' : ''
              }`}
              data-group="videos"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#e67e22] bg-[#fef5e7] px-3.5 py-1.5 rounded-full border border-[#fbdca7]">
                  Campus & Event Videos
                </span>
                <span className="text-xs text-[#6b607c]">Vlogs, Reels & Motion Graphics ({videoProjects.length} frames)</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoProjects.map((p) => (
                  <WorkVisualCard
                    key={p.id}
                    project={p}
                    onOpenProject={onOpenProject}
                    onToast={showToast}
                  />
                ))}
              </div>
            </div>

            {/* AI CONCEPTS GROUP (Organized into AI Images and AI Videos) */}
            <div
              className={`work-group space-y-8 ${
                activeCategory !== 'ai' && activeCategory !== 'all' ? 'hidden' : ''
              }`}
              data-group="ai"
            >
              {/* AI Generated Images */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#8e44ad]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8e44ad] bg-[#f4ecfc] px-3.5 py-1.5 rounded-full border border-[#e2cbf7]">
                      AI Generated Images (5 Works)
                    </span>
                  </div>
                  <span className="text-xs text-[#6b607c]">Generative Commercial Concepts</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aiImageProjects.map((p) => (
                    <WorkVisualCard
                      key={p.id}
                      project={p}
                      onOpenProject={onOpenProject}
                      onToast={showToast}
                    />
                  ))}
                </div>
              </div>

              {/* AI Generated Videos */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#8e44ad]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8e44ad] bg-[#f4ecfc] px-3.5 py-1.5 rounded-full border border-[#e2cbf7]">
                      AI Generated Videos (5 Works)
                    </span>
                  </div>
                  <span className="text-xs text-[#6b607c]">Generative Motion Concepts</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aiVideoProjects.map((p) => (
                    <WorkVisualCard
                      key={p.id}
                      project={p}
                      onOpenProject={onOpenProject}
                      onToast={showToast}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* COPYWRITING GROUP */}
            <div
              className={`work-group ${
                activeCategory !== 'copywriting' && activeCategory !== 'all' ? 'hidden' : ''
              }`}
              data-group="copywriting"
            >
              {/* Full Interactive Clothesline Copywriting Reader with all 10 works! */}
              <div className="rounded-[32px] bg-white border border-[#e7d6d9] p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-[#e7d6d9]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#f7c9d8] text-[#b75078] flex items-center justify-center font-bold text-sm">
                      @
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-[#383047]">
                        Copywriting Portfolio
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-[1.1fr_1.3fr] gap-6">
                  {/* Left List of Pieces */}
                  <div className="space-y-2 max-h-[460px] overflow-y-auto pr-2">
                    {COPYWRITING_PIECES.map((piece) => {
                      const isSelected = selectedCopyPiece.id === piece.id;
                      return (
                        <button
                          key={piece.id}
                          type="button"
                          onClick={() => setSelectedCopyPiece(piece)}
                          className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                            isSelected
                              ? 'bg-[#faebf2]/70 border-[#b75078] shadow-2xs'
                              : 'bg-[#fff9f3]/60 border-[#e7d6d9] hover:border-[#b75078]/40 hover:bg-white'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-[#383047] line-clamp-1">
                                {piece.title}
                              </span>
                            </div>
                            <div className="text-[11px] text-[#6b607c] mt-0.5">
                              {piece.dateOrTag}
                            </div>
                          </div>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border border-[#e7d6d9] text-[#6b607c] shrink-0">
                            {piece.language}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Reader View */}
                  <div className="p-6 rounded-2xl bg-[#fff9f3] border border-[#e7d6d9] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <span className="text-xs font-bold text-[#b75078] uppercase tracking-wider">
                          {selectedCopyPiece.category}
                        </span>
                        <span className="text-xs text-[#6b607c]">
                          {selectedCopyPiece.dateOrTag}
                        </span>
                      </div>

                      <h4 className="font-display font-bold text-xl text-[#383047] mb-3">
                        {selectedCopyPiece.title}
                      </h4>

                      {selectedCopyPiece.quote && (
                        <div className="p-3 rounded-xl bg-white border-l-4 border-[#b75078] text-xs font-serif italic text-[#383047] mb-4">
                          {selectedCopyPiece.quote}
                        </div>
                      )}

                      <div className="text-xs sm:text-sm text-[#554b65] leading-relaxed whitespace-pre-line font-sans">
                        {selectedCopyPiece.body}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#e7d6d9] flex items-center justify-end">
                      <button
                        type="button"
                        onClick={() => handleCopyText(selectedCopyPiece.body, selectedCopyPiece.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#b75078] bg-white px-3 py-1.5 rounded-full border border-[#e7d6d9] hover:bg-[#faebf2] transition-colors"
                      >
                        {copiedId === selectedCopyPiece.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Text</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
