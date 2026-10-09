import React, { useState } from 'react';
import { Calculator, ArrowRight, Check } from 'lucide-react';

interface QuoteEstimatorProps {
  onApplyEstimate: (summary: string) => void;
}

export const QuoteEstimator: React.FC<QuoteEstimatorProps> = ({ onApplyEstimate }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Publication Materials (Pubmats & Posters)'
  ]);
  const [projectScope, setProjectScope] = useState<'single' | 'bundle' | 'ongoing'>('bundle');

  const options = [
    { id: 'Publication Materials (Pubmats & Posters)', label: 'Publication Materials (Pubmats & Posters)' },
    { id: 'Merch Mockups (Shirts & Pins)', label: 'Merch Mockups (Shirts & Pin Badges)' },
    { id: 'DP Blast Frames (Facebook Avatars)', label: 'DP Blast Frames (Facebook Avatars)' },
    { id: 'Short-Form Video Editing (CapCut)', label: 'Short-Form Video Editing (CapCut)' },
    { id: 'Social Media Copywriting & Captions', label: 'Social Media Copywriting & Captions' },
    { id: 'Admin VA (Data Encoding, Emails & Files)', label: 'Admin VA (Data Encoding, Reply Emails & File Arranging)' },
    { id: 'Social Media Page Support', label: 'Social Media Page Support & Scheduling' }
  ];

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const handleSendToForm = () => {
    const summary = `Project Scope: ${projectScope.toUpperCase()} | Services: [${selectedServices.join(', ')}]`;
    onApplyEstimate(summary);
  };

  return (
    <div className="my-16 p-8 sm:p-12 rounded-[36px] bg-white border border-[#e7d6d9] soft-card">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-[#e7d6d9]">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#b75078] bg-[#faebf2] px-3 py-1 rounded-full mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Project Scope</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#383047]">
            Build Your Custom Creative Scope
          </h3>
          <p className="text-xs sm:text-sm text-[#6b607c] mt-1">
            Select the services you need to prepare and pre-fill your project inquiry.
          </p>
        </div>

        <div className="flex items-center gap-2 p-1.5 bg-[#f4ecfc] rounded-2xl">
          <button
            type="button"
            onClick={() => setProjectScope('single')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              projectScope === 'single'
                ? 'bg-white text-[#b75078] shadow-xs'
                : 'text-[#554b65] hover:text-[#383047]'
            }`}
          >
            Single Task
          </button>
          <button
            type="button"
            onClick={() => setProjectScope('bundle')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              projectScope === 'bundle'
                ? 'bg-white text-[#b75078] shadow-xs'
                : 'text-[#554b65] hover:text-[#383047]'
            }`}
          >
            Multi-Asset Bundle
          </button>
          <button
            type="button"
            onClick={() => setProjectScope('ongoing')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              projectScope === 'ongoing'
                ? 'bg-white text-[#b75078] shadow-xs'
                : 'text-[#554b65] hover:text-[#383047]'
            }`}
          >
            Ongoing Support
          </button>
        </div>
      </div>

      {/* Services selection grid (no 24h / turnaround badges) */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        {options.map((opt) => {
          const isSelected = selectedServices.includes(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => toggleService(opt.id)}
              className={`p-4 rounded-2xl border text-left flex items-start justify-between gap-3 transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#b75078] bg-[#faebf2]/60 text-[#383047]'
                  : 'border-[#e7d6d9] bg-white text-[#554b65] hover:border-[#b75078]/40'
              }`}
            >
              <div className="text-xs font-bold text-[#383047] leading-relaxed">
                {opt.label}
              </div>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  isSelected ? 'bg-[#b75078] text-white' : 'border border-[#e7d6d9]'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Summary Box & Action */}
      <div className="p-6 rounded-2xl bg-[#fff9f3] border border-[#e7d6d9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-[#6b607c]">Selected Services ({selectedServices.length}):</div>
          <div className="text-sm font-bold text-[#383047] mt-0.5">
            {selectedServices.join(' · ')}
          </div>
          <div className="text-xs text-[#b75078] font-semibold mt-1">
            ✓ Ready to discuss your project requirements
          </div>
        </div>

        <button
          type="button"
          onClick={handleSendToForm}
          className="inline-flex items-center gap-2 bg-[#b75078] hover:bg-[#9c3b63] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wide transition-all shadow-md hover:-translate-y-0.5 shrink-0 cursor-pointer"
        >
          <span>Use This Scope in Inquiry</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
