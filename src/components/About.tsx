import React, { useState } from 'react';
import { FREELANCER_INFO } from '../data/portfolioData';
import { GraduationCap, Briefcase, Award, CheckCircle2, ChevronRight, Laptop, Calendar } from 'lucide-react';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'education' | 'experience' | 'orgs'>('education');

  return (
    <section id="about" data-template-id="about-section" className="canva-section bg-[#fff9f3] py-20 sm:py-28">
      <div className="section-wrap max-w-[1160px] mx-auto px-5 sm:px-8">
        {/* Eyebrow & Title */}
        <div className="text-center md:text-left mb-12">
          <p
            data-template-id="about-eyebrow"
            className="canva-text uppercase tracking-[.25em] font-bold text-xs sm:text-sm text-[#b75078] mb-3"
          >
            BACKGROUND
          </p>
          <h2
            data-template-id="about-title"
            className="canva-text font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#383047]"
          >
            Education, Experience in Leadership & Experience
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#554b65] max-w-2xl leading-relaxed">
            {FREELANCER_INFO.professionalSummary}
          </p>
        </div>

        {/* Tab Navigation: Education first, next is Experience in Leadership, then Experience */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-white/80 rounded-2xl border border-[#e7d6d9] w-fit">
          <button
            type="button"
            onClick={() => setActiveTab('education')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'education'
                ? 'bg-[#b75078] text-white shadow-xs'
                : 'text-[#554b65] hover:text-[#383047] hover:bg-[#faebf2]'
            }`}
          >
            Education
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('orgs')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'orgs'
                ? 'bg-[#b75078] text-white shadow-xs'
                : 'text-[#554b65] hover:text-[#383047] hover:bg-[#faebf2]'
            }`}
          >
            Experience in Leadership ({FREELANCER_INFO.orgInvolvements.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('experience')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'experience'
                ? 'bg-[#b75078] text-white shadow-xs'
                : 'text-[#554b65] hover:text-[#383047] hover:bg-[#faebf2]'
            }`}
          >
            Experience ({FREELANCER_INFO.workExperience.length})
          </button>
        </div>

        {/* Dynamic Tab Content */}
        {activeTab === 'education' && (
          <div className="grid md:grid-cols-2 gap-6">
            {FREELANCER_INFO.educationHistory.map((edu, idx) => (
              <article
                key={idx}
                className="soft-card rounded-[28px] p-6 sm:p-7 bg-white/95 border border-[#e7d6d9] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-[#b75078] bg-[#faebf2] px-3 py-1 rounded-full">
                      {edu.period}
                    </span>
                    <GraduationCap className="w-4 h-4 text-[#8e44ad]" />
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#383047]">
                    {edu.school}
                  </h3>
                  <p className="text-sm font-medium text-[#554b65] mt-2">
                    {edu.degreeOrLevel}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="grid md:grid-cols-2 gap-6">
            {FREELANCER_INFO.workExperience.map((exp, idx) => (
              <article
                key={idx}
                className="soft-card rounded-[28px] p-7 bg-white/95 border border-[#e7d6d9] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-[#b75078] bg-[#faebf2] px-3 py-1 rounded-full">
                      {exp.period}
                    </span>
                    <Briefcase className="w-4 h-4 text-[#8e44ad]" />
                  </div>

                  <h3 className="font-display font-bold text-lg text-[#383047]">
                    {exp.company}
                  </h3>
                  <div className="text-sm font-bold text-[#8e44ad] mb-4">
                    {exp.role}
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-[#554b65] leading-relaxed">
                    {exp.bulletPoints.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#b75078] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        )}

        {activeTab === 'orgs' && (
          <div className="grid md:grid-cols-2 gap-6">
            {FREELANCER_INFO.orgInvolvements.map((org, idx) => (
              <article
                key={idx}
                className="soft-card rounded-[28px] p-6 sm:p-7 bg-white/95 border border-[#e7d6d9] flex flex-col justify-between hover:border-[#b75078]/40 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-[#b75078] bg-[#faebf2] px-3 py-1 rounded-full">
                      {org.period}
                    </span>
                    {org.committeeOrTeam && (
                      <span className="text-[11px] font-semibold text-[#8e44ad] bg-[#f4ecfc] px-2.5 py-0.5 rounded-full">
                        {org.committeeOrTeam}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-base sm:text-lg text-[#383047] mt-2">
                    {org.organization}
                  </h3>
                  <div className="text-xs sm:text-sm font-bold text-[#8e44ad] mb-4">
                    {org.role}
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-[#554b65] leading-relaxed">
                    {org.bulletPoints.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#b75078] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Skills, Certifications & Awards Grid from Resume Page 3 */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {/* Skills */}
          <div
            data-template-id="skills-card"
            className="canva-card soft-card rounded-[32px] p-6 sm:p-7 bg-white border border-[#e7d6d9]"
          >
            <h3
              data-template-id="skills-heading"
              className="canva-text font-display text-lg font-bold text-[#383047] mb-4 flex items-center gap-2"
            >
              <Laptop className="w-4 h-4 text-[#b75078]" />
              <span>Skills</span>
            </h3>
            <div className="space-y-2.5">
              {FREELANCER_INFO.technicalSkills.map((sk, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-xl bg-[#fff9f3] border border-[#e7d6d9]/70">
                  <span className="font-semibold text-[#383047]">{sk.name}</span>
                  {sk.level ? (
                    <span className="text-[11px] font-bold text-[#b75078]">{sk.level}</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications (2026) */}
          <div className="soft-card rounded-[32px] p-6 sm:p-7 bg-white border border-[#e7d6d9]">
            <h3 className="font-display text-lg font-bold text-[#383047] mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#8e44ad]" />
              <span>Certifications (2026)</span>
            </h3>
            <div className="space-y-2">
              {FREELANCER_INFO.certifications.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#554b65]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8e44ad] shrink-0" />
                  <span className="font-medium">{cert.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Awards & Recognition */}
          <div className="soft-card rounded-[32px] p-6 sm:p-7 bg-white border border-[#e7d6d9] flex flex-col justify-between">
            <div>
              <h3 className="font-display text-lg font-bold text-[#383047] mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#d35400]" />
                <span>Awards & Recognition</span>
              </h3>
              <div className="space-y-3">
                {FREELANCER_INFO.awards.map((aw, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-[#fff9f3] border border-[#e7d6d9]/80">
                    <div className="text-xs font-bold text-[#383047]">{aw.title}</div>
                    <div className="text-[11px] font-semibold text-[#b75078] mt-0.5">{aw.year}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#e7d6d9] text-xs text-[#6b607c]">
              <strong>Languages:</strong> {FREELANCER_INFO.languages.join(', ')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
