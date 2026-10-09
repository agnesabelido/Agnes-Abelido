import React, { useState, useEffect } from 'react';
import { FREELANCER_INFO } from '../data/portfolioData';
import { Mail, Copy, Check, Send, Heart, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactProps {
  initialMessage?: string;
}

export const Contact: React.FC<ContactProps> = ({ initialMessage = '' }) => {
  const [activePlatform, setActivePlatform] = useState<string>('gmail');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Publication Materials (Pubmats)',
    message: initialMessage
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialMessage) {
      setFormData((prev) => ({
        ...prev,
        message: prev.message ? `${prev.message}\n${initialMessage}` : initialMessage
      }));
    }
  }, [initialMessage]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(FREELANCER_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#b75078', '#f7c9d8', '#8e44ad', '#27ae60']
      });
    }, 800);
  };

  return (
    <section
      id="contact"
      data-template-id="contact-section"
      className="canva-section py-20 sm:py-28 bg-[#fff9f3] relative"
    >
      <div className="section-wrap text-center max-w-[1000px] mx-auto px-5 sm:px-8">
        {/* Heart icon matching template */}
        <span aria-hidden="true" className="text-5xl text-[#b75078] inline-block animate-bounce">
          ♡
        </span>

        {/* Eyebrow matching 12.jpg */}
        <p
          data-template-id="contact-eyebrow"
          className="canva-text uppercase tracking-[.25em] font-bold text-xs sm:text-sm text-[#b75078] mt-5 mb-3"
        >
          LET'S CONNECT & MAKE IT HAPPEN
        </p>

        {/* Title matching 12.jpg ("contact me at") */}
        <h2
          data-template-id="contact-title"
          className="canva-text font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#383047] lowercase"
        >
          contact me at
        </h2>

        {/* Direct Platform Links styled like Background tab buttons */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 bg-white/80 rounded-2xl border border-[#e7d6d9] w-fit mx-auto"
          role="list"
          aria-label="Contact channels"
        >
          <a
            href={FREELANCER_INFO.socialLinks.gmail}
            data-template-id="gmail-link"
            onClick={() => setActivePlatform('gmail')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer no-underline inline-flex items-center gap-1.5 ${
              activePlatform === 'gmail'
                ? 'bg-[#b75078] text-white shadow-xs'
                : 'text-[#554b65] hover:text-[#383047] hover:bg-[#faebf2]'
            }`}
          >
            Gmail: {FREELANCER_INFO.email}
          </a>

          <a
            href={FREELANCER_INFO.socialLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            data-template-id="whatsapp-link"
            onClick={() => setActivePlatform('whatsapp')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer no-underline inline-flex items-center gap-1.5 ${
              activePlatform === 'whatsapp'
                ? 'bg-[#b75078] text-white shadow-xs'
                : 'text-[#554b65] hover:text-[#383047] hover:bg-[#faebf2]'
            }`}
          >
            WhatsApp
          </a>

          <a
            href={FREELANCER_INFO.socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            data-template-id="facebook-link"
            onClick={() => setActivePlatform('facebook')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer no-underline inline-flex items-center gap-1.5 ${
              activePlatform === 'facebook'
                ? 'bg-[#b75078] text-white shadow-xs'
                : 'text-[#554b65] hover:text-[#383047] hover:bg-[#faebf2]'
            }`}
          >
            Facebook
          </a>

          <a
            href={FREELANCER_INFO.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-template-id="linkedin-link"
            onClick={() => setActivePlatform('linkedin')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer no-underline inline-flex items-center gap-1.5 ${
              activePlatform === 'linkedin'
                ? 'bg-[#b75078] text-white shadow-xs'
                : 'text-[#554b65] hover:text-[#383047] hover:bg-[#faebf2]'
            }`}
          >
            LinkedIn
          </a>

          <a
            href={FREELANCER_INFO.socialLinks.telegram}
            target="_blank"
            rel="noopener noreferrer"
            data-template-id="telegram-link"
            onClick={() => setActivePlatform('telegram')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer no-underline inline-flex items-center gap-1.5 ${
              activePlatform === 'telegram'
                ? 'bg-[#b75078] text-white shadow-xs'
                : 'text-[#554b65] hover:text-[#383047] hover:bg-[#faebf2]'
            }`}
          >
            Telegram
          </a>

          <a
            href={FREELANCER_INFO.socialLinks.onlinejobs}
            target="_blank"
            rel="noopener noreferrer"
            data-template-id="onlinejobs-link"
            onClick={() => setActivePlatform('onlinejobs')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer no-underline inline-flex items-center gap-1.5 ${
              activePlatform === 'onlinejobs'
                ? 'bg-[#b75078] text-white shadow-xs'
                : 'text-[#554b65] hover:text-[#383047] hover:bg-[#faebf2]'
            }`}
          >
            Onlinejobs.ph
          </a>
        </div>

        {/* Copy Email Helper Button */}
        <div className="mt-5 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-[#e7d6d9] text-xs font-semibold text-[#554b65] hover:text-[#383047] hover:bg-[#faebf2] transition-all cursor-pointer shadow-2xs"
          >
            {copiedEmail ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Copied: {FREELANCER_INFO.email}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#b75078]" />
                <span>Copy Email Address ({FREELANCER_INFO.email})</span>
              </>
            )}
          </button>
        </div>

        {/* Interactive Direct Project Inquiry Form */}
        <div className="mt-12 text-left max-w-xl mx-auto p-8 rounded-[32px] bg-white border border-[#e7d6d9] soft-card shadow-lg">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-[#f7c9d8] text-[#b75078] flex items-center justify-center mx-auto mb-4">
                <Heart className="w-7 h-7 fill-current" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#383047]">
                Thank you for reaching out!
              </h3>
              <p className="text-sm text-[#554b65] mt-2 mb-6">
                Your message has been sent to Agnes! I will review your project details and get back to you promptly at <strong>{formData.email}</strong>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    service: 'Publication Materials (Pubmats)',
                    message: ''
                  });
                }}
                className="text-xs font-bold text-[#b75078] underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-4 h-4 text-[#b75078]" />
                <h3 className="font-display text-lg font-bold text-[#383047]">
                  Send a Direct Message to Agnes
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="client-name" className="block text-xs font-bold uppercase tracking-wider text-[#6b607c] mb-1">
                    Your Name *
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    placeholder="e.g. Maria Santos"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e7d6d9] text-xs focus:outline-hidden focus:border-[#b75078] focus:ring-1 focus:ring-[#b75078] bg-[#fff9f3]/40 text-[#383047]"
                  />
                </div>
                <div>
                  <label htmlFor="client-email" className="block text-xs font-bold uppercase tracking-wider text-[#6b607c] mb-1">
                    Your Email *
                  </label>
                  <input
                    id="client-email"
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#e7d6d9] text-xs focus:outline-hidden focus:border-[#b75078] focus:ring-1 focus:ring-[#b75078] bg-[#fff9f3]/40 text-[#383047]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service-select" className="block text-xs font-bold uppercase tracking-wider text-[#6b607c] mb-1.5">
                  What Can I Help You With? *
                </label>
                <select
                  id="service-select"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e7d6d9] text-xs focus:outline-hidden focus:border-[#b75078] focus:ring-1 focus:ring-[#b75078] bg-[#fff9f3]/40 text-[#383047] font-medium"
                >
                  <option value="Publication Materials (Pubmats)">Publication Materials (Pubmats, Posters, Flyers & Social Graphics)</option>
                  <option value="Merch Mockups">Merch Mockups (T-Shirts, Enamel Pins, Tote Bags & Merch Previews)</option>
                  <option value="DP Blasts">DP Blasts (Facebook Profile Picture Frames & Avatar Overlays)</option>
                  <option value="Short-Form Video Editing">Short-Form Video Editing (CapCut Reels, TikToks & Campus Clips)</option>
                  <option value="Social Media Copywriting">Social Media Copywriting (Post Captions, Hashtags & Announcements)</option>
                  <option value="Admin VA">Admin VA (Data Encoding, Replying to Emails, File Arranging & Workspace)</option>
                  <option value="Social Media Management">Social Media Page Support & Content Scheduling</option>
                  <option value="Other / Collaboration">Other Creative Collaboration</option>
                </select>
              </div>

              <div>
                <label htmlFor="client-message" className="block text-xs font-bold uppercase tracking-wider text-[#6b607c] mb-1">
                  Message / Project Details *
                </label>
                <textarea
                  id="client-message"
                  required
                  rows={4}
                  placeholder="Share a brief overview of what you need, your organization or brand, and timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#e7d6d9] text-xs focus:outline-hidden focus:border-[#b75078] focus:ring-1 focus:ring-[#b75078] bg-[#fff9f3]/40 text-[#383047]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#b75078] hover:bg-[#9c3b63] text-white py-3 rounded-full text-xs font-bold uppercase tracking-wide transition-all shadow-md hover:-translate-y-0.5 disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Sending message...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Agnes</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Contact Note matching template */}
        <p
          data-template-id="contact-note"
          className="canva-text mt-8 text-xs sm:text-sm text-[#6b607c]"
        >
          Phone: {FREELANCER_INFO.phone} · Email: {FREELANCER_INFO.email} · {FREELANCER_INFO.location} · De La Salle University–Dasmariñas
        </p>
      </div>
    </section>
  );
};
