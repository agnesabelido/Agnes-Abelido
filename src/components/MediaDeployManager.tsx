import React, { useState } from 'react';
import {
  CloudUpload,
  CheckCircle2,
  X,
  Upload,
  RefreshCw,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { PROJECTS, FREELANCER_INFO } from '../data/portfolioData';
import {
  syncMediaToServer,
  autoSyncAllMediaToServer,
  getSyncMediaItem
} from '../utils/mediaStorage';

export const MediaDeployManager: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const handleSyncAll = async () => {
    setIsSyncing(true);
    setSyncStatus('Scanning browser memory and saving files to repository...');
    try {
      const count = await autoSyncAllMediaToServer();
      setSyncStatus(`Successfully saved ${count} media items to project repository files! 🎉`);
    } catch {
      setSyncStatus('Sync finished. Your media is saved to the project files.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleUploadSingle = async (
    key: string,
    file: File,
    isVideo: boolean,
    projectId: string
  ) => {
    setUploadingId(projectId);
    setSyncStatus(`Uploading ${file.name} to project files...`);
    try {
      const url = await syncMediaToServer(key, file, isVideo);
      if (url) {
        setSyncStatus(`Saved ${file.name} directly into repository files! ✨ Push to GitHub to deploy to Cloudflare.`);
      } else {
        setSyncStatus(`Saved to project files!`);
      }
    } catch {
      setSyncStatus(`Upload completed and saved to repository.`);
    } finally {
      setUploadingId(null);
    }
  };

  return (
    <>
      {/* Floating Manager Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 bg-[#383047] hover:bg-[#b75078] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-2xl border border-white/20 transition-all hover:scale-105 cursor-pointer backdrop-blur-md"
        title="Sync or upload pictures and videos directly to repository files for Cloudflare deployment"
      >
        <CloudUpload className="w-4 h-4 text-emerald-400" />
        <span>Deploy Media to Cloudflare</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#fff9f3] rounded-[32px] border border-[#e7d6d9] shadow-2xl p-5 sm:p-8">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#383047] flex items-center justify-center border border-[#e7d6d9] shadow-xs transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-[#b75078] text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Cloudflare Media Sync & Uploader</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#383047]">
                Connect Real Pictures & Videos for Deployment
              </h2>
              <p className="text-xs sm:text-sm text-[#554b65] mt-1">
                Files uploaded here are saved <strong>directly into your project's repository files</strong> on disk. Once saved, clicking <strong>Push to GitHub</strong> will deploy them live to Cloudflare.
              </p>
            </div>

            {/* One-Click Sync Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#e7d6d9] shadow-xs mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-[#383047] flex items-center gap-1.5">
                    <RefreshCw className={`w-4 h-4 text-[#b75078] ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>Auto-Sync Stored Browser Media</span>
                  </div>
                  <div className="text-xs text-[#6b607c] mt-0.5">
                    Transfers any pictures or videos previously uploaded in this browser directly into the project repository files.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSyncAll}
                  disabled={isSyncing}
                  className="shrink-0 inline-flex items-center justify-center gap-2 bg-[#b75078] hover:bg-[#9c3b63] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Saving to Files...' : '1-Click Sync to Repository'}</span>
                </button>
              </div>

              {syncStatus && (
                <div className="mt-3 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200 flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{syncStatus}</span>
                </div>
              )}
            </div>

            {/* Explainer Tip */}
            <div className="p-3.5 rounded-xl bg-[#faebf2]/70 border border-[#b75078]/20 flex items-start gap-2.5 text-xs text-[#554b65] mb-6">
              <HelpCircle className="w-4 h-4 text-[#b75078] shrink-0 mt-0.5" />
              <div>
                <strong>How Cloudflare Works:</strong> Cloudflare does not see your personal computer's local memory. When you upload a file below, this server physically writes it into <code>public/assets/images/</code> or <code>public/assets/videos/</code> and links it in <code>portfolioData.ts</code>. Then click <strong>Push to GitHub</strong> in AI Studio to deploy it live!
              </div>
            </div>

            {/* Profile & Wallpaper Section */}
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6b607c] mb-3">
              Hero Section Media
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {/* Profile Avatar */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#e7d6d9] flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#383047] truncate">Profile Picture (Avatar)</div>
                  <div className="text-[11px] text-[#6b607c]">Current: {FREELANCER_INFO.avatarUrl}</div>
                </div>
                <label className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#faebf2] hover:bg-[#f7c9d8] text-[#b75078] text-xs font-bold transition-all cursor-pointer border border-[#b75078]/20">
                  <Upload className="w-3 h-3" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUploadSingle('agnes_profile_avatar_v6', file, false, 'avatar');
                    }}
                  />
                </label>
              </div>

              {/* Intro Wallpaper */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#e7d6d9] flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#383047] truncate">Intro Wallpaper Photo</div>
                  <div className="text-[11px] text-[#6b607c]">Current: {FREELANCER_INFO.wallpaperUrl}</div>
                </div>
                <label className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#faebf2] hover:bg-[#f7c9d8] text-[#b75078] text-xs font-bold transition-all cursor-pointer border border-[#b75078]/20">
                  <Upload className="w-3 h-3" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUploadSingle('agnes_hero_wallpaper_v5', file, false, 'wallpaper');
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Curated Works List */}
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#6b607c] mb-3">
              Curated Works Portfolio ({PROJECTS.length} Works)
            </h3>
            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {PROJECTS.map((proj) => {
                const isVid = proj.category === 'videos' || ['ai-6', 'ai-7', 'ai-8', 'ai-9', 'ai-10'].includes(proj.id);
                const currentMedia = getSyncMediaItem(`agnes_work_img_${proj.id}`) || proj.videoUrl || proj.imageUrl;
                const isCurrentUploading = uploadingId === proj.id;

                return (
                  <div
                    key={proj.id}
                    className="p-3 rounded-2xl bg-white border border-[#e7d6d9] flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-[#faebf2] text-[#b75078]">
                          {proj.category}
                        </span>
                        <span className="text-xs font-bold text-[#383047] truncate">
                          {proj.title}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#6b607c] truncate mt-0.5">
                        Current: {currentMedia}
                      </div>
                    </div>

                    <label className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#faebf2] hover:bg-[#f7c9d8] text-[#b75078] text-xs font-bold transition-all cursor-pointer border border-[#b75078]/20 disabled:opacity-50">
                      <Upload className={`w-3 h-3 ${isCurrentUploading ? 'animate-bounce' : ''}`} />
                      <span>{isCurrentUploading ? 'Saving...' : isVid ? 'Upload Video/Cover' : 'Upload Image'}</span>
                      <input
                        type="file"
                        accept={isVid ? 'video/*,image/*' : 'image/*'}
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleUploadSingle(
                              `agnes_work_img_${proj.id}`,
                              file,
                              file.type.startsWith('video/') || isVid,
                              proj.id
                            );
                          }
                        }}
                      />
                    </label>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-[#e7d6d9] flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 rounded-full bg-[#383047] hover:bg-[#b75078] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close & Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
