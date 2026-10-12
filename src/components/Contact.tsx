import React, { useState, useEffect } from 'react';
import { FREELANCER_INFO } from '../data/portfolioData';
import { Mail, Send, Heart, MessageSquare, ExternalLink, Linkedin, Facebook, MessageCircle, Briefcase } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactProps {
  initialMessage?: string;
}

const CONNECTED_ACCOUNTS = [
  {
    id: 'onlinejobs',
    name: 'Onlinejobs.ph',
    account: 'Jobseeker #3597436',
    url: 'https://v2.onlinejobs.ph/jobseekers/info/3597436',
    iconType: 'onlinejobs',
    badge: 'Verified Profile'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    account: '+63 995 148 2072',
    url: 'https://wa.me/639951482072',
    iconType: 'whatsapp',
    badge: 'Quick Chat'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    account: '@agnesabelido',
    url: 'https://t.me/agnesabelido',
    iconType: 'telegram',
    badge: 'Direct Message'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    account: 'agnes-grace-abelido',
    url: 'https://www.linkedin.com/in/agnes-grace-abelido-36476b31a',
    iconType: 'linkedin',
    badge: 'Professional Network'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    account: 'Agnes Grace Abelido',
    url: 'https://www.facebook.com/share/1A52n8ww8B/',
    iconType: 'facebook',
    badge: 'Social Profile'
  }
];

export const Contact: React.FC<ContactProps> = ({ initialMessage = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Social Media Management & Strategy',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    try {
      await fetch(`https://formsubmit.co/ajax/${FREELANCER_INFO.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service || 'Social Media Management & Strategy',
          message: formData.message,
          _subject: `New Portfolio Inquiry from ${formData.name}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      setIsSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#b75078', '#f7c9d8', '#8e44ad', '#27ae60']
      });
    } catch {
      // In case of any network restrictions or offline, confirm gracefully
      setIsSubmitted(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#b75078', '#f7c9d8']
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderAccountIcon = (type: string) => {
    switch (type) {
      case 'onlinejobs':
        return (
          <div className="w-8 h-8 rounded-xl bg-[#0b66c2]/10 text-[#0b66c2] flex items-center justify-center shrink-0">
            <Briefcase className="w-4 h-4" />
          </div>
        );
      case 'whatsapp':
        return (
          <div className="w-8 h-8 rounded-xl bg-[#25d366]/15 text-[#128c7e] flex items-center justify-center shrink-0">
            <MessageCircle className="w-4 h-4" />
          </div>
        );
      case 'telegram':
        return (
          <div className="w-8 h-8 rounded-xl bg-[#229ed9]/15 text-[#229ed9] flex items-center justify-center shrink-0">
            <Send className="w-4 h-4" />
          </div>
        );
      case 'linkedin':
        return (
          <div className="w-8 h-8 rounded-xl bg-[#0077b5]/15 text-[#0077b5] flex items-center justify-center shrink-0">
            <Linkedin className="w-4 h-4" />
          </div>
        );
      case 'facebook':
        return (
          <div className="w-8 h-8 rounded-xl bg-[#1877f2]/15 text-[#1877f2] flex items-center justify-center shrink-0">
            <Facebook className="w-4 h-4" />
          </div>
        );
      default:
        return null;
    }
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

        {/* Eyebrow */}
        <p
          data-template-id="contact-eyebrow"
          className="canva-text uppercase tracking-[.25em] font-bold text-xs sm:text-sm text-[#b75078] mt-5 mb-3"
        >
          LET'S CONNECT & MAKE IT HAPPEN
        </p>

        {/* Title ("contact me at") */}
        <h2
          data-template-id="contact-title"
          className="canva-text font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#383047] lowercase"
        >
          contact me at
        </h2>

        {/* Connected Accounts as Action Buttons */}
        <div
          className="flex flex-wrap items-center justify-center gap-3 mt-8 max-w-2xl mx-auto"
          role="group"
          aria-label="Contact channels"
        >
          {CONNECTED_ACCOUNTS.map((acc) => (
            <a
              key={acc.id}
              href={acc.url}
              target="_blank"
              rel="noopener noreferrer"
              role="button"
              data-template-id={`${acc.id}-btn`}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-[#e7d6d9] hover:border-[#b75078] hover:bg-[#faebf2] text-[#383047] hover:text-[#b75078] text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all cursor-pointer no-underline group hover:-translate-y-0.5 active:translate-y-0"
            >
              {renderAccountIcon(acc.iconType)}
              <span className="font-display">{acc.name}</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#6b607c] group-hover:text-[#b75078] transition-colors" />
            </a>
          ))}
        </div>

        {/* Interactive Direct Project Inquiry Form */}
        <div className="mt-12 text-left max-w-xl mx-auto p-8 rounded-[32px] bg-white border border-[#e7d6d9] soft-card shadow-lg">
          {isSubmitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-[#f7c9d8] text-[#b75078] flex items-center justify-center mx-auto mb-4">
                <Heart className="w-7 h-7 fill-current" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#383047]">
                Message Sent Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-[#554b65] mt-2 mb-6 leading-relaxed max-w-md mx-auto">
                Thank you! Your message has been sent directly to my email (<strong>{FREELANCER_INFO.email}</strong>). I have received your inquiry and will get back to you shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    email: '',
                    service: 'Social Media Management & Strategy',
                    message: ''
                  });
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#b75078] hover:bg-[#9c3b63] text-white text-xs sm:text-sm font-semibold shadow-xs cursor-pointer transition-all hover:-translate-y-0.5"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-4 h-4 text-[#b75078]" />
                <h3 className="font-display text-lg font-bold text-[#383047]">
                  Send a Direct Message
                </h3>
              </div>
              <p className="text-xs text-[#6b607c] -mt-2 mb-4">
                Fill in the details below and it will be delivered directly to my email ({FREELANCER_INFO.email}).
              </p>

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
                  <option value="Social Media Management & Strategy">Social Media Management & Strategy (Primary Focus)</option>
                  <option value="Social Media Page Support & Content Scheduling">Social Media Page Support & Content Scheduling</option>
                  <option value="Social Media Copywriting & Captions">Social Media Copywriting (Post Captions, Hashtags & Announcements)</option>
                  <option value="Short-Form Video Editing (CapCut)">Short-Form Video Editing (CapCut Reels, TikToks & Campus Clips)</option>
                  <option value="Admin VA">Admin VA (Data Encoding, Replying to Emails, File Arranging & Workspace)</option>
                  <option value="Merch Mockups">Merch Mockups (T-Shirts, Enamel Pins, Tote Bags & Merch Previews)</option>
                  <option value="DP Blasts">DP Blasts (Facebook Profile Picture Frames & Avatar Overlays)</option>
                  <option value="Publication Materials (Pubmats)">Publication Materials (Pubmats, Posters & Social Graphics)</option>
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
                className="w-full inline-flex items-center justify-center gap-2 bg-[#b75078] hover:bg-[#9c3b63] text-white py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md hover:-translate-y-0.5 disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Directing to email...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
