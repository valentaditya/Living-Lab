"use client";

import React, { useState } from 'react';
import type { FAQItem } from "@/lib/cms-content";

export const FAQSection = ({ faqs }: { faqs: FAQItem[] }) => {
  const [activeCategory, setActiveCategory] = useState("Semua Pertanyaan");
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const categories = [
    "Semua Pertanyaan",
    ...new Set(faqs.map((faq) => faq.category)),
  ];

  const filteredFaqs = activeCategory === "Semua Pertanyaan" 
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-8 bg-[#f8f9fa] min-h-[50vh]">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-[10px] font-mono text-gray-500 mr-2">TOPIK ARSIP:</span>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-xs font-medium rounded-sm transition-colors border ${
                activeCategory === cat
                  ? "bg-teal-700 text-white border-teal-700"
                  : "bg-transparent text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {cat} {cat === "Semua Pertanyaan" && `(${faqs.length})`}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="flex flex-col gap-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="bg-white border border-gray-200 rounded-sm shadow-sm transition-all duration-200">
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center hover:bg-gray-50 transition-colors focus:outline-none"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-sm font-mono text-gray-400 mt-1">0{idx + 1}.</span>
                    <span className="text-base font-semibold text-[#0f1713]">{faq.question}</span>
                  </div>
                  <span className="text-xl font-light text-gray-500 w-6 h-6 flex items-center justify-center border border-gray-300 rounded-sm flex-shrink-0">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-0 border-t border-gray-100 mt-2">
                    <p className="text-sm text-gray-600 leading-relaxed mt-4">
                      {faq.answer}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-6">
                      <span className="text-[9px] font-mono text-gray-500 px-2 py-1">
                        Kategori: {faq.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};