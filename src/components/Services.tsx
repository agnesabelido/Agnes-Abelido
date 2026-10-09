import React from 'react';
import { SERVICES } from '../data/portfolioData';
import { Layout, Video, Sparkles, PenTool, CheckCircle2, Shirt, Frame } from 'lucide-react';

export const Services: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Layout: <Layout className="w-5 h-5 text-[#b75078]" />,
    Shirt: <Shirt className="w-5 h-5 text-[#27ae60]" />,
    Frame: <Frame className="w-5 h-5 text-[#2980b9]" />,
    Video: <Video className="w-5 h-5 text-[#d35400]" />,
    PenTool: <PenTool className="w-5 h-5 text-[#e91e63]" />,
    CheckCircle2: <CheckCircle2 className="w-5 h-5 text-[#8e44ad]" />,
    Sparkles: <Sparkles className="w-5 h-5 text-[#b75078]" />
  };

  return (
    <section id="services" className="py-20 sm:py-28 bg-gradient-to-b from-[#fff9f3] to-[#faebf2]/30">
      <div className="max-w-[1160px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="uppercase tracking-[.25em] font-bold text-xs sm:text-sm text-[#b75078] mb-3">
            WHAT I CAN DO
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#383047]">
            Creative Work & Admin Support
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#554b65] leading-relaxed">
            Beginner-friendly creative designs and dependable virtual assistance built through 4 years of active campus organization work.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => (
            <div
              key={idx}
              className="soft-card rounded-[28px] p-7 bg-white/90 border border-[#e7d6d9] flex flex-col justify-between hover:border-[#b75078]/40 transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#f7c9d8]/40 flex items-center justify-center mb-5">
                  {iconMap[service.iconName] || <Sparkles className="w-5 h-5 text-[#b75078]" />}
                </div>
                <h3 className="font-display text-lg font-bold text-[#383047] mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[#554b65] leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div>
                <div className="pt-4 border-t border-[#e7d6d9] space-y-2">
                  {service.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-[#383047]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b75078]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
