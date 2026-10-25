'use client';

import React, { useState } from 'react';
import { FAQ_DATA } from '@/data/mockData';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>(FAQ_DATA[0].category);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const currentCategoryData = FAQ_DATA.find((c) => c.category === selectedCategory) || FAQ_DATA[0];

  return (
    <section id="faqs" className="py-20 lg:py-28 bg-[#FAF6F0] dark:bg-[#0F081D] border-t border-stone-200 dark:border-purple-950/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 dark:bg-orange-950/60 text-[#E2761B]">
            SUPPORT & DOCUMENTATION
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight mt-3">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-stone-500 dark:text-purple-300 text-base">
            Answers to commonly asked questions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main FAQ Accordion (Exact layout from MetaMask Mobbin section e0e3236b-db12-41d4-913e-c94960ab7589) */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-6">
              {currentCategoryData.category}
            </h3>

            <div className="divide-y divide-stone-200 dark:divide-purple-900/40">
              {currentCategoryData.questions.map((item, idx) => {
                const isExpanded = expandedIndex === idx;
                return (
                  <div key={idx} className="py-5">
                    <button
                      onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                      className="w-full flex items-center justify-between text-left group"
                    >
                      <span className="text-base sm:text-lg font-bold text-stone-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors pr-4">
                        {item.q}
                      </span>
                      <span className="w-8 h-8 rounded-full flex items-center justify-center bg-stone-100 dark:bg-purple-900/40 text-stone-600 dark:text-purple-300 shrink-0">
                        {isExpanded ? <Minus size={16} /> : <Plus size={16} />}
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="mt-4 text-stone-600 dark:text-purple-200/80 text-sm leading-relaxed animate-fade-in pl-1">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Jump To Sidebar (MetaMask signature FAQ sidebar) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 p-6 rounded-3xl bg-white dark:bg-[#1A0E2E] border border-stone-200 dark:border-purple-900/40 shadow-xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-purple-400 mb-4">
                Jump to:
              </h4>

              <div className="space-y-1">
                {FAQ_DATA.map((cat) => {
                  const isSelected = selectedCategory === cat.category;
                  return (
                    <button
                      key={cat.category}
                      onClick={() => {
                        setSelectedCategory(cat.category);
                        setExpandedIndex(0);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#F6851B]/10 text-[#E2761B] dark:text-[#FFA959] border-l-4 border-[#F6851B]'
                          : 'text-stone-600 dark:text-purple-300 hover:bg-stone-50 dark:hover:bg-purple-900/20'
                      }`}
                    >
                      <span>{cat.category}</span>
                      <span className="text-[11px] font-mono text-stone-400">
                        ({cat.questions.length})
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 pt-6 border-t border-stone-100 dark:border-purple-900/30 text-xs text-stone-500 dark:text-purple-300">
                <p className="font-semibold text-stone-800 dark:text-white mb-1">
                  Need more assistance?
                </p>
                <p className="text-[11px] leading-relaxed mb-3">
                  Our community support team is available 24/7 on Discord and Zendesk.
                </p>
                <a
                  href="#support"
                  className="inline-block font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Contact CypherTrail Support →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
