import React, { useState, useEffect } from 'react';
import { PROJECTS, COPYWRITING_PIECES, ProjectItem, CopywritingItem } from '../data/portfolioData';
import { Eye, Search, Sparkles, BookOpen, Copy, Check } from 'lucide-react';
import { getSyncMediaItem, getMediaItem, getMediaType } from '../utils/mediaStorage';

interface WorksProps {
  onOpenProject: (project: ProjectItem, contextProjects?: ProjectItem[]) => void;
}

const normalizeAssetUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('/src/assets/images/')) {
    return url.replace('/src/assets/images/', '/assets/images/');
  }
  return url;
};

const WorkVisualCard: React.FC<{
  project: ProjectItem;
  onOpenProject: (project: ProjectItem) => void;
}> = ({ project, onOpenProject }) => {
  const isVideoCategory =
    project.category === 'videos' ||
    ['ai-6', 'ai-7', 'ai-8', 'ai-9', 'ai-10'].includes(project.id);
  const isAi = project.category === 'ai';

  const [currentImg, setCurrentImg] = useState<string>(() => {
    const sync = getSyncMediaItem(`agnes_work_img_${project.id}`);
    if (sync && getMediaType(`agnes_work_img_${project.id}`, sync) !== 'video') return sync;
    return normalizeAssetUrl(project.imageUrl) || '/assets/images/agnes_photo.jpg';
  });

  const [videoSrc, setVideoSrc] = useState<string>(() => {
    if (project.videoUrl) return normalizeAssetUrl(project.videoUrl);
    const sync = getSyncMediaItem(`agnes_work_img_${project.id}`);
    if (sync && getMediaType(`agnes_work_img_${project.id}`, sync) === 'video') return sync;
    return '';
  });

  useEffect(() => {
    let isMounted = true;
    const initial = getSyncMediaItem(`agnes_work_img_${project.id}`);
    if (initial) {
      if (getMediaType(`agnes_work_img_${project.id}`, initial) === 'video') {
        setVideoSrc(initial);
      } else {
        setCurrentImg(initial);
      }
    }

    getMediaItem(`agnes_work_img_${project.id}`).then((stored) => {
      if (isMounted && stored) {
        if (getMediaType(`agnes_work_img_${project.id}`, stored) === 'video') {
          setVideoSrc(stored);
        } else {
          setCurrentImg(stored);
        }
      }
    });

    const handleMediaUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<{ key: string; url: string }>;
      if (customEvent.detail) {
        if (customEvent.detail.key === `agnes_work_img_${project.id}` || customEvent.detail.key === '__all__') {
          const fresh = getSyncMediaItem(`agnes_work_img_${project.id}`);
          if (fresh) {
            if (getMediaType(`agnes_work_img_${project.id}`, fresh) === 'video') {
              setVideoSrc(fresh);
            } else {
              setCurrentImg(fresh);
            }
          }
        }
      }
    };
    window.addEventListener('agnes_media_updated', handleMediaUpdated);
    return () => {
      isMounted = false;
      window.removeEventListener('agnes_media_updated', handleMediaUpdated);
    };
  }, [project.id, project.imageUrl, project.videoUrl]);

  return (
    <article
      data-template-id={project.templateCardId || `card-${project.id}`}
      onClick={() =>
        onOpenProject({
          ...project,
          imageUrl: currentImg,
          videoUrl: videoSrc || project.videoUrl
        })
      }
      className="soft-card rounded-[26px] overflow-hidden group cursor-pointer border border-[#563e4b]/12 hover:border-[#b75078] transition-all duration-300 bg-white shadow-xs hover:shadow-xl hover:-translate-y-1 relative"
    >
      <div className="relative overflow-hidden aspect-[4/3] bg-[#f4ecfc]/40">
        {/* Base Image Cover - Always reliably loaded and visible */}
        <img
          src={currentImg}
          alt={project.title}
          onError={(e) => {
            const fallback = normalizeAssetUrl(project.imageUrl) || '/assets/images/agnes_photo.jpg';
            if (fallback && (e.target as HTMLImageElement).src !== fallback) {
              (e.target as HTMLImageElement).src = fallback;
            }
          }}
          data-template-id={project.templateImageId || `img-${project.id}`}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Video Hover Layer (Desktop) */}
        {isVideoCategory && videoSrc && (
          <video
            src={videoSrc}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            onMouseEnter={(e) => (e.target as HTMLVideoElement).play().catch(() => {})}
            onMouseLeave={(e) => {
              const v = e.target as HTMLVideoElement;
              v.pause();
              v.currentTime = 0;
            }}
          />
        )}

        {/* Hover overlay with View Work button */}
        <div className="absolute inset-0 bg-[#383047]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white/95 text-[#383047] font-semibold text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-[#b75078]" />
            <span>{isVideoCategory ? 'Watch Video' : 'View Work'}</span>
          </span>
        </div>

        {/* Corner badge indicating category */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
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

        {/* Play indicator badge for video entries */}
        {isVideoCategory && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-200">
            <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white shadow-xl ring-2 ring-white/70">
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

  const pubmatProjects = PROJECTS.filter((p) => p.category === 'pubmats');
  const mockupProjects = PROJECTS.filter((p) => p.category === 'mockups');
  const dpblastProjects = PROJECTS.filter((p) => p.category === 'dpblasts');
  const videoProjects = PROJECTS.filter((p) => p.category === 'videos');
  const aiImageProjects = PROJECTS.filter((p) => p.category === 'ai' && !['ai-6', 'ai-7', 'ai-8', 'ai-9', 'ai-10'].includes(p.id));
  const aiVideoProjects = PROJECTS.filter((p) => p.category === 'ai' && ['ai-6', 'ai-7', 'ai-8', 'ai-9', 'ai-10'].includes(p.id));

  const filterButtons = [
    { id: 'filter-all', category: 'all' as const, label: 'All Works' },
    { id: 'filter-pubmats', category: 'pubmats' as const, label: 'Pubmats & Graphics' },
    { id: 'filter-mockups', category: 'mockups' as const, label: 'Merch Mockups' },
    { id: 'filter-dpblasts', category: 'dpblasts' as const, label: 'DP Blasts' },
    { id: 'filter-videos', category: 'videos' as const, label: 'Videos' },
    { id: 'filter-ai', category: 'ai' as const, label: 'AI Concepts' }
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

  const getCategoryListForProject = (p: ProjectItem) => {
    if (searchedProjects) return searchedProjects;
    if (p.category === 'pubmats') return pubmatProjects;
    if (p.category === 'mockups') return mockupProjects;
    if (p.category === 'dpblasts') return dpblastProjects;
    if (p.category === 'videos') return videoProjects;
    if (p.category === 'ai') {
      const isAiVid = ['ai-6', 'ai-7', 'ai-8', 'ai-9', 'ai-10'].includes(p.id);
      return isAiVid ? aiVideoProjects : aiImageProjects;
    }
    return PROJECTS;
  };

  const handleOpenProjectWithContext = (p: ProjectItem) => {
    onOpenProject(p, getCategoryListForProject(p));
  };

  return (
    <section id="works" data-template-id="works-section" className="canva-section py-20 sm:py-28 bg-[#fff9f3] relative">
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

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 overflow-x-auto">
          {filterButtons.map((btn) => {
            const isActive = activeCategory === btn.category;
            return (
              <button
                key={btn.id}
                id={btn.id}
                type="button"
                onClick={() => {
                  setActiveCategory(btn.category);
                  setSearchQuery('');
                }}
                className={`canva-button px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#b75078] text-white shadow-sm'
                    : 'bg-white text-[#554b65] border border-[#e7d6d9] hover:border-[#b75078] hover:text-[#b75078]'
                }`}
              >
                {btn.label}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => {
              setActiveCategory('copywriting');
              setSearchQuery('');
            }}
            className={`canva-button px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'copywriting'
                ? 'bg-[#b75078] text-white shadow-sm'
                : 'bg-white text-[#554b65] border border-[#e7d6d9] hover:border-[#b75078] hover:text-[#b75078]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Copywriting ({COPYWRITING_PIECES.length})</span>
          </button>
        </div>

        {/* If Search is Active */}
        {searchedProjects ? (
          <div>
            <div className="mb-4 text-xs font-semibold text-[#6b607c]">
              Found {searchedProjects.length} results matching "{searchQuery}"
            </div>
            {searchedProjects.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#e7d6d9]">
                <p className="text-sm text-[#6b607c]">No works found matching your search.</p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-3 text-xs font-bold text-[#b75078] hover:underline"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchedProjects.map((p) => (
                  <WorkVisualCard
                    key={p.id}
                    project={p}
                    onOpenProject={handleOpenProjectWithContext}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Structured Content Showcase by Category */
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
                <span className="text-xs text-[#6b607c]">Event Posters & Social Pubmats</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pubmatProjects.map((p) => (
                  <WorkVisualCard
                    key={p.id}
                    project={p}
                    onOpenProject={handleOpenProjectWithContext}
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
                <span className="text-xs text-[#6b607c]">Apparel, Pins & Brand Mockups</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockupProjects.map((p) => (
                  <WorkVisualCard
                    key={p.id}
                    project={p}
                    onOpenProject={handleOpenProjectWithContext}
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
                <span className="text-xs text-[#6b607c]">Student Avatar Frames</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {dpblastProjects.map((p) => (
                  <WorkVisualCard
                    key={p.id}
                    project={p}
                    onOpenProject={handleOpenProjectWithContext}
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
                <span className="text-xs text-[#6b607c]">Vlogs, Reels & Motion Graphics</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videoProjects.map((p) => (
                  <WorkVisualCard
                    key={p.id}
                    project={p}
                    onOpenProject={handleOpenProjectWithContext}
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
                      AI Generated Images
                    </span>
                  </div>
                  <span className="text-xs text-[#6b607c]">Generative Commercial Concepts</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aiImageProjects.map((p) => (
                    <WorkVisualCard
                      key={p.id}
                      project={p}
                      onOpenProject={handleOpenProjectWithContext}
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
                      AI Generated Videos
                    </span>
                  </div>
                  <span className="text-xs text-[#6b607c]">Generative Motion Concepts</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aiVideoProjects.map((p) => (
                    <WorkVisualCard
                      key={p.id}
                      project={p}
                      onOpenProject={handleOpenProjectWithContext}
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
              <div className="rounded-[32px] bg-white border border-[#e7d6d9] p-6 sm:p-8 shadow-xs">
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
