import React, { useEffect } from 'react';
import { ProjectItem } from '../data/portfolioData';
import { X, ArrowLeft, ArrowRight, ExternalLink, CheckCircle2, Sparkles, Send } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
  allProjects: ProjectItem[];
  onInquire: (projectName: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectProject,
  allProjects,
  onInquire
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!project) return;
      const currentIndex = allProjects.findIndex((p) => p.id === project.id);
      if (e.key === 'ArrowRight' && currentIndex < allProjects.length - 1) {
        onSelectProject(allProjects[currentIndex + 1]);
      }
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onSelectProject(allProjects[currentIndex - 1]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, allProjects, onClose, onSelectProject]);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#fff9f3] rounded-[32px] border border-[#e7d6d9] shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-[#383047] hover:text-[#b75078] flex items-center justify-center border border-[#e7d6d9] shadow-xs transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#b75078] bg-[#faebf2] px-3 py-1 rounded-full">
            {project.category === 'dpblasts'
              ? 'DP BLASTS'
              : project.category === 'mockups'
              ? 'MERCH MOCKUPS'
              : project.category.toUpperCase()}
          </span>
          <span className="text-xs text-[#6b607c]">· Client: {project.client}</span>
          <span className="text-xs text-[#6b607c]">· {project.year}</span>
        </div>

        <h2
          id="modal-title"
          className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#383047] mb-6 pr-8"
        >
          {project.title}
        </h2>

        {/* Hero Visual Preview */}
        <div className="relative rounded-[24px] overflow-hidden border border-[#e7d6d9] mb-8 bg-[#f4ecfc]/40 aspect-[16/10] max-h-[460px]">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-[1.2fr_.8fr] gap-8 mb-8">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#383047] mb-3">
              Project Overview & Objective
            </h3>
            <p className="text-sm sm:text-base text-[#554b65] leading-relaxed mb-6">
              {project.fullDescription}
            </p>

            <h3 className="text-sm font-bold uppercase tracking-wider text-[#383047] mb-3">
              Key Deliverables
            </h3>
            <div className="space-y-2">
              {project.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-[#383047]">
                  <CheckCircle2 className="w-4 h-4 text-[#b75078] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/80 rounded-[24px] p-6 border border-[#e7d6d9] flex flex-col justify-between">
            <div>
              {project.metrics && (
                <div className="mb-6 p-4 rounded-2xl bg-[#faebf2]/70 border border-[#b75078]/20">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#b75078] mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Project Impact / Result</span>
                  </div>
                  <div className="text-sm font-bold text-[#383047]">{project.metrics}</div>
                </div>
              )}

              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6b607c] mb-2">
                Tools & Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2 mb-6">
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
                onInquire(project.title);
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#b75078] hover:bg-[#9c3b63] text-white py-3 rounded-full text-xs font-bold uppercase tracking-wide transition-all shadow-md hover:-translate-y-0.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Inquire About Similar Project</span>
            </button>
          </div>
        </div>

        {/* Modal Footer with Next / Prev */}
        <div className="pt-6 border-t border-[#e7d6d9] flex items-center justify-between gap-4">
          <button
            type="button"
            disabled={!prevProject}
            onClick={() => prevProject && onSelectProject(prevProject)}
            className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
              prevProject
                ? 'border-[#e7d6d9] text-[#383047] hover:border-[#b75078] hover:text-[#b75078]'
                : 'border-transparent text-gray-400 cursor-not-allowed opacity-50'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Previous:</span>
            <span className="truncate max-w-[140px]">{prevProject?.title || 'None'}</span>
          </button>

          <span className="text-xs text-[#6b607c]">
            {currentIndex + 1} of {allProjects.length}
          </span>

          <button
            type="button"
            disabled={!nextProject}
            onClick={() => nextProject && onSelectProject(nextProject)}
            className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
              nextProject
                ? 'border-[#e7d6d9] text-[#383047] hover:border-[#b75078] hover:text-[#b75078]'
                : 'border-transparent text-gray-400 cursor-not-allowed opacity-50'
            }`}
          >
            <span className="hidden sm:inline">Next:</span>
            <span className="truncate max-w-[140px]">{nextProject?.title || 'None'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
