import React, { useEffect, useState } from 'react';
import { ProjectItem } from '../data/portfolioData';
import {
  X,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Send,
  Video as VideoIcon
} from 'lucide-react';
import { getSyncMediaItem, getMediaItem, getMediaType } from '../utils/mediaStorage';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
  allProjects: ProjectItem[];
  onInquire: (projectName: string) => void;
}

const normalizeAssetUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('/src/assets/images/')) {
    return url.replace('/src/assets/images/', '/assets/images/');
  }
  return url;
};

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectProject,
  allProjects,
  onInquire
}) => {
  const [, setRerenderKey] = useState(0);

  // State to hold the current active media URL for the selected project
  const [activeMediaUrl, setActiveMediaUrl] = useState<string>(() => {
    if (!project) return '';
    return getSyncMediaItem(`agnes_work_img_${project.id}`, normalizeAssetUrl(project.videoUrl || project.imageUrl));
  });

  const [activeMediaType, setActiveMediaType] = useState<'video' | 'image'>(() => {
    if (!project) return 'image';
    const sync = getSyncMediaItem(`agnes_work_img_${project.id}`);
    return getMediaType(`agnes_work_img_${project.id}`, sync || project.videoUrl || '');
  });

  // Helper function to resolve the current effective media for ANY project item
  const getProjectEffectiveMedia = (p?: ProjectItem | null): string => {
    if (!p) return '';
    const custom = getSyncMediaItem(`agnes_work_img_${p.id}`);
    if (custom) return custom;
    return normalizeAssetUrl(p.videoUrl || p.imageUrl);
  };

  // Safe thumbnail helper that always returns a valid image (never a video container)
  const getProjectThumbnail = (p?: ProjectItem | null): string => {
    if (!p) return '';
    const custom = getSyncMediaItem(`agnes_work_img_${p.id}`);
    const type = getMediaType(`agnes_work_img_${p.id}`, custom || p.videoUrl || '');
    if (custom && type !== 'video') return custom;
    if (p.imageUrl) return normalizeAssetUrl(p.imageUrl);
    if (p.videoUrl && type !== 'video') return normalizeAssetUrl(p.videoUrl);
    return '';
  };

  // Re-sync activeMediaUrl whenever the selected project changes
  useEffect(() => {
    if (!project) return;
    let isMounted = true;
    const initial = getSyncMediaItem(`agnes_work_img_${project.id}`);
    if (initial) {
      setActiveMediaUrl(initial);
      setActiveMediaType(getMediaType(`agnes_work_img_${project.id}`, initial));
    } else {
      const def = normalizeAssetUrl(project.videoUrl || project.imageUrl);
      setActiveMediaUrl(def);
      setActiveMediaType(getMediaType(`agnes_work_img_${project.id}`, def || project.videoUrl || ''));
      getMediaItem(`agnes_work_img_${project.id}`).then((stored) => {
        if (isMounted && stored) {
          setActiveMediaUrl(stored);
          setActiveMediaType(getMediaType(`agnes_work_img_${project.id}`, stored));
        }
      });
    }

    const handleMediaUpdated = (e: Event) => {
      const customEvent = e as CustomEvent<{ key: string; url: string }>;
      if (customEvent.detail) {
        if (customEvent.detail.key === `agnes_work_img_${project.id}` || customEvent.detail.key === '__all__') {
          const fresh = getSyncMediaItem(`agnes_work_img_${project.id}`);
          if (fresh) {
            setActiveMediaUrl(fresh);
            setActiveMediaType(getMediaType(`agnes_work_img_${project.id}`, fresh));
          }
        }
      }
      setRerenderKey((prev) => prev + 1);
    };

    window.addEventListener('agnes_media_updated', handleMediaUpdated);
    return () => {
      isMounted = false;
      window.removeEventListener('agnes_media_updated', handleMediaUpdated);
    };
  }, [project]);

  // Keyboard navigation: Left/Right arrows and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!project || allProjects.length === 0) return;
      const currentIndex = allProjects.findIndex((p) => p.id === project.id);
      if (e.key === 'ArrowRight') {
        const nextIndex = currentIndex < allProjects.length - 1 ? currentIndex + 1 : 0;
        onSelectProject(allProjects[nextIndex]);
      }
      if (e.key === 'ArrowLeft') {
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : allProjects.length - 1;
        onSelectProject(allProjects[prevIndex]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, allProjects, onClose, onSelectProject]);

  if (!project) return null;

  const currentIndex = Math.max(
    0,
    allProjects.findIndex((p) => p.id === project.id)
  );

  const prevProject =
    allProjects.length > 0
      ? currentIndex > 0
        ? allProjects[currentIndex - 1]
        : allProjects[allProjects.length - 1]
      : null;

  const nextProject =
    allProjects.length > 0
      ? currentIndex < allProjects.length - 1
        ? allProjects[currentIndex + 1]
        : allProjects[0]
      : null;

  const getCategoryLabel = (p: ProjectItem) => {
    if (p.category === 'dpblasts') return 'DP Blast';
    if (p.category === 'mockups') return 'Merch Mockup';
    if (p.category === 'videos') return 'Campus Video';
    if (p.category === 'ai') {
      const isVid =
        ['ai-6', 'ai-7', 'ai-8', 'ai-9', 'ai-10'].includes(p.id) ||
        Boolean(p.videoUrl && getMediaType(p.id, p.videoUrl) === 'video');
      return isVid ? 'AI Video' : 'AI Concept';
    }
    return 'Pubmat';
  };

  const isVideo = activeMediaType === 'video';
  const categoryLabel = getCategoryLabel(project);
  const isVideoCategory =
    project.category === 'videos' ||
    ['ai-6', 'ai-7', 'ai-8', 'ai-9', 'ai-10'].includes(project.id);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-category-badge"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#fff9f3] rounded-[32px] border border-[#e7d6d9] shadow-2xl p-5 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#383047] hover:text-[#b75078] flex items-center justify-center border border-[#e7d6d9] shadow-xs transition-colors z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Category Header */}
        <div id="modal-category-badge" className="flex flex-wrap items-center gap-3 mb-4 sm:mb-5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#b75078] bg-[#faebf2] px-3.5 py-1.5 rounded-full border border-[#f7c9d8]">
            {categoryLabel}
          </span>
          <span className="text-xs text-[#6b607c]">
            Work {currentIndex + 1} of {allProjects.length}
          </span>
        </div>

        {/* Hero Visual or Video Preview */}
        <div className="relative rounded-[24px] overflow-hidden border border-[#e7d6d9] mb-4 bg-black aspect-[16/10] max-h-[460px] flex items-center justify-center group">
          {isVideo ? (
            <video
              src={activeMediaUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain bg-black"
            />
          ) : (
            <img
              src={activeMediaUrl}
              alt={project.title}
              onError={(e) => {
                const fallback = normalizeAssetUrl(project.imageUrl || project.videoUrl);
                if (fallback && (e.target as HTMLImageElement).src !== fallback) {
                  (e.target as HTMLImageElement).src = fallback;
                }
              }}
              className="w-full h-full object-cover object-center"
            />
          )}

          {/* Badge for video projects */}
          {isVideoCategory && (
            <div className="absolute bottom-4 left-4 z-10 bg-black/75 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5">
              <VideoIcon className="w-3.5 h-3.5 text-[#fbdca7]" />
              <span>Campus Video Showcase · Edited in CapCut</span>
            </div>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-[1.2fr_.8fr] gap-6 sm:gap-8 mb-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#383047] mb-2 sm:mb-3">
              Overview & Concept
            </h3>
            <p className="text-xs sm:text-sm text-[#554b65] leading-relaxed mb-5">
              {project.fullDescription}
            </p>

            <h3 className="text-xs font-bold uppercase tracking-wider text-[#383047] mb-2 sm:mb-3">
              Key Deliverables
            </h3>
            <div className="space-y-2">
              {project.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#383047]">
                  <CheckCircle2 className="w-4 h-4 text-[#b75078] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/85 rounded-[24px] p-5 sm:p-6 border border-[#e7d6d9] flex flex-col justify-between">
            <div>
              {project.metrics && (
                <div className="mb-4 sm:mb-6 p-3.5 sm:p-4 rounded-2xl bg-[#faebf2]/70 border border-[#b75078]/20">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#b75078] mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Project Impact / Result</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#383047]">{project.metrics}</div>
                </div>
              )}

              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6b607c] mb-2">
                Tools & Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                {project.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#f4ecfc] text-[#383047] border border-[#e7d6d9]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onInquire(categoryLabel);
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#b75078] hover:bg-[#9c3b63] text-white py-3 rounded-full text-xs font-bold uppercase tracking-wide transition-all shadow-md hover:-translate-y-0.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Inquire About Similar Work</span>
            </button>
          </div>
        </div>

        {/* Works Before & After Navigation Section */}
        <div className="pt-6 border-t border-[#e7d6d9]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#6b607c]">
              Works Before and After ({currentIndex + 1} of {allProjects.length})
            </span>
            <span className="text-[11px] text-[#b75078] font-semibold">
              ← Click cards or thumbnails below to navigate →
            </span>
          </div>

          {/* Cards for Previous Work and Next Work */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
            {prevProject && (
              <button
                type="button"
                onClick={() => onSelectProject(prevProject)}
                className="flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl bg-white border border-[#e7d6d9] hover:border-[#b75078] hover:bg-[#faebf2]/40 transition-all text-left cursor-pointer group shadow-2xs"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 bg-black flex items-center justify-center relative">
                  {getMediaType(`agnes_work_img_${prevProject.id}`, getProjectEffectiveMedia(prevProject)) === 'video' ? (
                    <video
                      src={getProjectEffectiveMedia(prevProject)}
                      muted
                      preload="metadata"
                      className="w-full h-full object-cover"
                      onLoadedMetadata={(e) => {
                        try {
                          (e.target as HTMLVideoElement).currentTime = 0.1;
                        } catch {}
                      }}
                    />
                  ) : (
                    <img
                      src={getProjectThumbnail(prevProject)}
                      alt={prevProject.title}
                      onError={(e) => {
                        const fb = normalizeAssetUrl(prevProject.imageUrl || prevProject.videoUrl);
                        if (fb) (e.target as HTMLImageElement).src = fb;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#b75078]">
                    <ArrowLeft className="w-3 h-3" />
                    <span>Previous Work</span>
                  </div>
                  <div className="text-xs font-semibold text-[#383047] truncate">
                    {prevProject.title}
                  </div>
                  <div className="text-[10px] text-[#6b607c] truncate">
                    {getCategoryLabel(prevProject)}
                  </div>
                </div>
              </button>
            )}

            {nextProject && (
              <button
                type="button"
                onClick={() => onSelectProject(nextProject)}
                className="flex items-center justify-end gap-3 p-2.5 sm:p-3 rounded-2xl bg-white border border-[#e7d6d9] hover:border-[#b75078] hover:bg-[#faebf2]/40 transition-all text-right cursor-pointer group shadow-2xs"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-end gap-1 text-[11px] font-bold text-[#b75078]">
                    <span>Next Work</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                  <div className="text-xs font-semibold text-[#383047] truncate">
                    {nextProject.title}
                  </div>
                  <div className="text-[10px] text-[#6b607c] truncate">
                    {getCategoryLabel(nextProject)}
                  </div>
                </div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 bg-black flex items-center justify-center relative">
                  {getMediaType(`agnes_work_img_${nextProject.id}`, getProjectEffectiveMedia(nextProject)) === 'video' ? (
                    <video
                      src={getProjectEffectiveMedia(nextProject)}
                      muted
                      preload="metadata"
                      className="w-full h-full object-cover"
                      onLoadedMetadata={(e) => {
                        try {
                          (e.target as HTMLVideoElement).currentTime = 0.1;
                        } catch {}
                      }}
                    />
                  ) : (
                    <img
                      src={getProjectThumbnail(nextProject)}
                      alt={nextProject.title}
                      onError={(e) => {
                        const fb = normalizeAssetUrl(nextProject.imageUrl || nextProject.videoUrl);
                        if (fb) (e.target as HTMLImageElement).src = fb;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  )}
                </div>
              </button>
            )}
          </div>

          {/* Sequential Thumbnail Filmstrip */}
          <div className="flex items-center gap-2 overflow-x-auto py-2 px-1 scrollbar-thin">
            {allProjects.map((p, pIdx) => {
              const isCurrent = p.id === project.id;
              const thumbUrl = getProjectThumbnail(p);
              const pEffective = getProjectEffectiveMedia(p);
              const isPVideo = getMediaType(`agnes_work_img_${p.id}`, pEffective) === 'video';

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onSelectProject(p)}
                  title={`Work ${pIdx + 1}: ${p.title} (${getCategoryLabel(p)})`}
                  className={`relative shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-black ${
                    isCurrent
                      ? 'border-[#b75078] shadow-md scale-105 ring-2 ring-[#b75078]/40'
                      : 'border-transparent opacity-60 hover:opacity-100 hover:border-[#e7d6d9]'
                  }`}
                >
                  {isPVideo ? (
                    <video
                      src={pEffective}
                      muted
                      preload="metadata"
                      className="w-full h-full object-cover"
                      onLoadedMetadata={(e) => {
                        try {
                          (e.target as HTMLVideoElement).currentTime = 0.1;
                        } catch {}
                      }}
                    />
                  ) : (
                    <img
                      src={thumbUrl}
                      alt={p.title}
                      onError={(e) => {
                        const fb = normalizeAssetUrl(p.imageUrl || p.videoUrl);
                        if (fb) (e.target as HTMLImageElement).src = fb;
                      }}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <span className="absolute bottom-0 right-0 bg-black/70 text-white text-[9px] px-1 font-bold rounded-tl-md">
                    {pIdx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
