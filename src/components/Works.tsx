import React, { useState } from 'react';
import { PROJECTS, COPYWRITING_PIECES, ProjectItem, CopywritingItem } from '../data/portfolioData';
import { Eye, Search, Sparkles, BookOpen, Copy, Check, Quote, Tag } from 'lucide-react';

interface WorksProps {
  onOpenProject: (project: ProjectItem) => void;
}

export const Works: React.FC<WorksProps> = ({ onOpenProject }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'pubmats' | 'mockups' | 'dpblasts' | 'videos' | 'ai' | 'copywriting'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCopyPiece, setSelectedCopyPiece] = useState<CopywritingItem>(COPYWRITING_PIECES[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filterButtons = [
    { id: 'filter-all', category: 'all' as const, label: `All Works (${PROJECTS.length})` },
    { id: 'filter-pubmats', category: 'pubmats' as const, label: 'Pubmats & Graphics' },
    { id: 'filter-mockups', category: 'mockups' as const, label: 'Merch Mockups' },
    { id: 'filter-dpblasts', category: 'dpblasts' as const, label: 'DP Blasts' },
    { id: 'filter-videos', category: 'videos' as const, label: 'Videos' },
    { id: 'filter-ai', category: 'ai' as const, label: 'AI Concepts' },
    { id: 'filter-copywriting', category: 'copywriting' as const, label: 'Copywriting (10 Works)' }
  ];

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Helper to render individual card with its specific template IDs
  const renderCard = (
    project: ProjectItem,
    cardId: string,
    imageId: string,
    titleId: string,
    descId: string
  ) => {
    return (
      <article
        key={project.id}
        data-template-id={cardId}
        onClick={() => onOpenProject(project)}
        className="canva-card soft-card rounded-[28px] overflow-hidden group cursor-pointer flex flex-col justify-between border border-[#563e4b]/12 hover:border-[#b75078]/40 transition-all duration-300 bg-white"
      >
        <div className="relative overflow-hidden aspect-[16/10] bg-[#f4ecfc]/40">
          <img
            src={project.imageUrl}
            alt={project.title}
            data-template-id={imageId}
            className="canva-image work-image w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Subtle overlay button on hover */}
          <div className="absolute inset-0 bg-[#383047]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-white/95 text-[#383047] font-semibold text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <Eye className="w-3.5 h-3.5 text-[#b75078]" />
              <span>View Case Brief</span>
            </span>
          </div>

          <div className="absolute top-3 left-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#383047] bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-2xs">
              {project.category === 'dpblasts'
                ? 'DP Blast'
                : project.category === 'mockups'
                ? 'Merch Mockup'
                : project.category}
            </span>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3
              data-template-id={titleId}
              className="canva-text font-display text-lg sm:text-xl font-bold text-[#383047] group-hover:text-[#b75078] transition-colors"
            >
              {project.title}
            </h3>
            <p
              data-template-id={descId}
              className="canva-text mt-2 text-xs sm:text-sm text-[#554b65] leading-relaxed line-clamp-2"
            >
              {project.shortDescription}
            </p>
          </div>

          <div className="mt-4 pt-3.5 border-t border-[#e7d6d9]/60 flex items-center justify-between text-xs text-[#6b607c]">
            <span className="truncate max-w-[200px]">{project.client}</span>
            <span className="text-[#b75078] font-bold flex items-center gap-1 group-hover:underline shrink-0">
              Details →
            </span>
          </div>
        </div>
      </article>
    );
  };

  const pubmatProject1 = PROJECTS.find((p) => p.id === 'pubmat-1')!;
  const pubmatProject2 = PROJECTS.find((p) => p.id === 'pubmat-2')!;
  const videoProject1 = PROJECTS.find((p) => p.id === 'video-1')!;
  const videoProject2 = PROJECTS.find((p) => p.id === 'video-2')!;
  const aiProject1 = PROJECTS.find((p) => p.id === 'ai-1')!;
  const aiProject2 = PROJECTS.find((p) => p.id === 'ai-2')!;
  const mockupProject1 = PROJECTS.find((p) => p.id === 'mockup-1')!;
  const mockupProject2 = PROJECTS.find((p) => p.id === 'mockup-2')!;
  const dpblastProject1 = PROJECTS.find((p) => p.id === 'dpblast-1')!;
  const dpblastProject2 = PROJECTS.find((p) => p.id === 'dpblast-2')!;
  const copyProject1 = PROJECTS.find((p) => p.id === 'copy-1')!;
  const copyProject2 = PROJECTS.find((p) => p.id === 'copy-2')!;

  // Additional projects in categories
  const otherPubmats = PROJECTS.filter((p) => p.category === 'pubmats' && p.id !== 'pubmat-1' && p.id !== 'pubmat-2');
  const otherMockups = PROJECTS.filter((p) => p.category === 'mockups' && p.id !== 'mockup-1' && p.id !== 'mockup-2');
  const otherDpblasts = PROJECTS.filter((p) => p.category === 'dpblasts' && p.id !== 'dpblast-1' && p.id !== 'dpblast-2');
  const otherVideos = PROJECTS.filter((p) => p.category === 'videos' && p.id !== 'video-1' && p.id !== 'video-2');

  const searchedProjects = searchQuery.trim()
    ? PROJECTS.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : null;

  return (
    <section id="works" data-template-id="works-section" className="canva-section py-20 sm:py-28 bg-[#fff9f3]">
      <div className="section-wrap max-w-[1160px] mx-auto px-5 sm:px-8">
        {/* Eyebrow, Title & Intro */}
        <div className="mb-8">
          <p
            data-template-id="works-eyebrow"
            className="canva-text uppercase tracking-[.25em] font-bold text-xs sm:text-sm text-[#b75078] mb-3"
          >
            PORTFOLIO & WORK SAMPLES
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
              <div className="grid sm:grid-cols-2 gap-6">
                {searchedProjects.map((proj) =>
                  renderCard(
                    proj,
                    proj.templateCardId || `card-${proj.id}`,
                    proj.templateImageId || `img-${proj.id}`,
                    proj.templateTitleId || `title-${proj.id}`,
                    proj.templateDescId || `desc-${proj.id}`
                  )
                )}
              </div>
            )}
          </div>
        )}

        {/* Regular groups matching template specifications */}
        {!searchQuery && (
          <div className="space-y-8">
            {/* PUBMATS GROUP */}
            <div
              className={`work-group ${
                activeCategory !== 'pubmats' && activeCategory !== 'all' ? 'hidden' : ''
              }`}
              data-group="pubmats"
            >
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                {renderCard(
                  pubmatProject1,
                  'pubmat-card-one',
                  'pubmat-image-one',
                  'pubmat-title-one',
                  'pubmat-description-one'
                )}
                {renderCard(
                  pubmatProject2,
                  'pubmat-card-two',
                  'pubmat-image-two',
                  'pubmat-title-two',
                  'pubmat-description-two'
                )}
              </div>
              {/* Additional pubmats from Agnes's school portfolio */}
              {(activeCategory === 'pubmats' || activeCategory === 'all') && otherPubmats.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#e7d6d9]">
                  {otherPubmats.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => onOpenProject(p)}
                      className="p-4 rounded-2xl bg-white border border-[#e7d6d9] cursor-pointer hover:border-[#b75078] transition-all hover:-translate-y-1 flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-[11px] font-bold text-[#b75078] mb-1">
                          {p.year}
                        </div>
                        <div className="font-display font-bold text-sm text-[#383047] line-clamp-1">
                          {p.title}
                        </div>
                        <p className="text-xs text-[#554b65] mt-1 line-clamp-2">
                          {p.shortDescription}
                        </p>
                      </div>
                      <div className="mt-3 text-[11px] text-[#6b607c] flex items-center justify-between">
                        <span>{p.client}</span>
                        <span className="text-[#b75078] font-bold">View →</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                  Merch Mockups (Shirts, Badges & Bags)
                </span>
                <span className="text-xs text-[#6b607c]">Apparel & Print Previews</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                {renderCard(
                  mockupProject1,
                  'mockup-card-one',
                  'mockup-image-one',
                  'mockup-title-one',
                  'mockup-description-one'
                )}
                {renderCard(
                  mockupProject2,
                  'mockup-card-two',
                  'mockup-image-two',
                  'mockup-title-two',
                  'mockup-description-two'
                )}
              </div>
              {(activeCategory === 'mockups' || activeCategory === 'all') && otherMockups.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#e7d6d9]">
                  {otherMockups.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => onOpenProject(p)}
                      className="p-4 rounded-2xl bg-white border border-[#e7d6d9] cursor-pointer hover:border-[#b75078] transition-all"
                    >
                      <div className="text-[11px] font-bold text-[#b75078] mb-1">{p.year}</div>
                      <div className="font-display font-bold text-sm text-[#383047]">{p.title}</div>
                      <p className="text-xs text-[#554b65] mt-1">{p.shortDescription}</p>
                    </div>
                  ))}
                </div>
              )}
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
                <span className="text-xs text-[#6b607c]">Student Avatar Campaigns</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                {renderCard(
                  dpblastProject1,
                  'dpblast-card-one',
                  'dpblast-image-one',
                  'dpblast-title-one',
                  'dpblast-description-one'
                )}
                {renderCard(
                  dpblastProject2,
                  'dpblast-card-two',
                  'dpblast-image-two',
                  'dpblast-title-two',
                  'dpblast-description-two'
                )}
              </div>
              {(activeCategory === 'dpblasts' || activeCategory === 'all') && otherDpblasts.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#e7d6d9]">
                  {otherDpblasts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => onOpenProject(p)}
                      className="p-4 rounded-2xl bg-white border border-[#e7d6d9] cursor-pointer hover:border-[#b75078] transition-all"
                    >
                      <div className="text-[11px] font-bold text-[#b75078] mb-1">{p.year}</div>
                      <div className="font-display font-bold text-sm text-[#383047]">{p.title}</div>
                      <p className="text-xs text-[#554b65] mt-1">{p.shortDescription}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* VIDEOS GROUP */}
            <div
              className={`work-group ${
                activeCategory !== 'videos' && activeCategory !== 'all' ? 'hidden' : ''
              }`}
              data-group="videos"
            >
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                {renderCard(
                  videoProject1,
                  'video-card-one',
                  'video-image-one',
                  'video-title-one',
                  'video-description-one'
                )}
                {renderCard(
                  videoProject2,
                  'video-card-two',
                  'video-image-two',
                  'video-title-two',
                  'video-description-two'
                )}
              </div>
              {(activeCategory === 'videos' || activeCategory === 'all') && otherVideos.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#e7d6d9]">
                  {otherVideos.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => onOpenProject(p)}
                      className="p-4 rounded-2xl bg-white border border-[#e7d6d9] cursor-pointer hover:border-[#b75078] transition-all"
                    >
                      <div className="text-[11px] font-bold text-[#b75078] mb-1">{p.year}</div>
                      <div className="font-display font-bold text-sm text-[#383047]">{p.title}</div>
                      <p className="text-xs text-[#554b65] mt-1">{p.shortDescription}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* AI GROUP */}
            <div
              className={`grid sm:grid-cols-2 gap-6 work-group ${
                activeCategory !== 'ai' && activeCategory !== 'all' ? 'hidden' : ''
              }`}
              data-group="ai"
            >
              {renderCard(
                aiProject1,
                'ai-card-one',
                'ai-image-one',
                'ai-title-one',
                'ai-description-one'
              )}
              {renderCard(
                aiProject2,
                'ai-card-two',
                'ai-image-two',
                'ai-title-two',
                'ai-description-two'
              )}
            </div>

            {/* COPYWRITING GROUP */}
            <div
              className={`work-group ${
                activeCategory !== 'copywriting' && activeCategory !== 'all' ? 'hidden' : ''
              }`}
              data-group="copywriting"
            >
              {/* Template Cards */}
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {renderCard(
                  copyProject1,
                  'copy-card-one',
                  'copy-image-one',
                  'copy-title-one',
                  'copy-description-one'
                )}
                {renderCard(
                  copyProject2,
                  'copy-card-two',
                  'copy-image-two',
                  'copy-title-two',
                  'copy-description-two'
                )}
              </div>

              {/* Full Interactive Clothesline Copywriting Reader with all 10 works! */}
              <div className="rounded-[32px] bg-white border border-[#e7d6d9] p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-[#e7d6d9]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#f7c9d8] text-[#b75078] flex items-center justify-center font-bold text-sm">
                      @
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-[#383047]">
                        Agnes's Copywriting Portfolio (All 10 Works)
                      </h3>
                      <p className="text-xs text-[#6b607c]">
                        Captions, event tributes, and community reflections authored for CoSA & DLSU-D
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-[#b75078] bg-[#faebf2] px-3.5 py-1.5 rounded-full self-start sm:self-auto">
                    Written by @agnesabelido
                  </span>
                </div>

                <div className="grid lg:grid-cols-[1.1fr_1.3fr] gap-6">
                  {/* Left List of 10 Pieces */}
                  <div className="space-y-2 max-h-[460px] overflow-y-auto pr-2">
                    {COPYWRITING_PIECES.map((piece, index) => {
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
                              <span className="text-[11px] font-bold text-[#b75078]">
                                #{index + 1}
                              </span>
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

                    <div className="mt-6 pt-4 border-t border-[#e7d6d9] flex items-center justify-between">
                      <span className="text-[11px] text-[#6b607c]">
                        Author: @agnesabelido
                      </span>
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
