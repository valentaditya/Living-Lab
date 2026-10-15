"use client";

import React, { useState } from 'react';

// Data FAQ
const faqData = [
  {
    id: 1,
    question: "Apa itu Living Lab Sungai Yogyakarta?",
    answer: "Living Lab Sungai Yogyakarta adalah inisiatif riset kolaboratif terapan yang menempatkan koridor sungai (Kali Code, Winongo, Gajahwong) sebagai laboratorium hidup di mana akademisi, warga bantaran, pemerintah, dan industri bekerja sama secara egaliter untuk menyelesaikan persoalan sosial-ekologis secara nyata.",
    tags: ["DAS CODE // WINONGO // GAJAHWONG"],
    category: "Landasan Operasional"
  },
  {
    id: 2,
    question: "Siapa saja yang bisa terlibat dalam inisiatif ini?",
    answer: "Inisiatif ini terbuka untuk siapa saja yang memiliki kepedulian terhadap sungai, mulai dari akademisi, mahasiswa, komunitas warga, LSM, sektor swasta, hingga instansi pemerintah.",
    tags: [],
    category: "Keterlibatan & Warga"
  },
  {
    id: 3,
    question: "Bagaimana cara masyarakat atau peneliti berkontribusi data?",
    answer: "Anda dapat berkontribusi dengan mengikuti pelatihan sains warga (citizen science) yang kami adakan secara berkala, atau mengirimkan data hasil pemantauan mandiri melalui portal data terbuka kami.",
    tags: [],
    category: "Data & Akses"
  },
  {
    id: 4,
    question: "Apakah data kualitas air dan riset dapat diakses secara publik?",
    answer: "Ya, seluruh data telemetri dan hasil riset kami dipublikasikan secara terbuka melalui repositori data kami. Kami percaya bahwa data terbuka adalah kunci untuk advokasi kebijakan yang berbasis bukti.",
    tags: [],
    category: "Data & Akses"
  },
  {
    id: 5,
    question: "Bagaimana prosedur menjadi mitra resmi atau sponsor riset?",
    answer: "Silakan menghubungi tim sekretariat kami melalui email untuk mendapatkan dokumen panduan kemitraan. Kami akan menjadwalkan sesi diskusi awal untuk menyelaraskan tujuan dan ruang lingkup kolaborasi.",
    tags: [],
    category: "Kelembagaan"
  }
];

const categories = ["Semua Pertanyaan", "Kelembagaan", "Keterlibatan & Warga", "Data & Akses"];

export const FAQSection = () => {
  const [activeCategory, setActiveCategory] = useState("Semua Pertanyaan");
  const [openId, setOpenId] = useState<number | null>(1); // Default item 1 terbuka

  const filteredFaqs = activeCategory === "Semua Pertanyaan" 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory);

  const toggleAccordion = (id: number) => {
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
              {cat} {cat === "Semua Pertanyaan" && "(5)"}
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
                      {faq.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[9px] font-mono bg-teal-50 text-teal-800 px-2 py-1 border border-teal-100 uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
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