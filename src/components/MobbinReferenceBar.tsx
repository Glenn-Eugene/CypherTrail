'use client';

import React, { useState } from 'react';
import { METAMASK_MOBBIN_REFERENCES } from '@/data/mockData';
import { ExternalLink, Layers, X, CheckCircle, Shield } from 'lucide-react';

export default function MobbinReferenceBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Pill Trigger */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-stone-900 dark:bg-purple-600 text-white font-bold text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all border border-stone-700 dark:border-purple-400"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Mobbin MetaMask References ({METAMASK_MOBBIN_REFERENCES.length})</span>
        </button>
      </div>

      {/* Slide-over or Modal drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#180E2E] rounded-3xl p-6 shadow-2xl border border-stone-200 dark:border-purple-900/50 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-purple-900/30">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-[#F6851B]">
                  <Layers size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-stone-900 dark:text-white">
                    MetaMask Sections on Mobbin
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-purple-300">
                    Live UI elements mapped 1:1 to MetaMask on Mobbin
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-white rounded-full hover:bg-stone-100 dark:hover:bg-purple-900/30 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {METAMASK_MOBBIN_REFERENCES.map((ref, idx) => (
                <div
                  key={ref.screenId}
                  className="p-3.5 rounded-2xl bg-stone-50 dark:bg-[#120824] border border-stone-200 dark:border-purple-900/40 hover:border-blue-500 transition-colors text-left"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-stone-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      {ref.title}
                    </span>
                    <a
                      href={ref.mobbinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-200 dark:bg-purple-900/60 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <span>Mobbin URL</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-purple-300 leading-relaxed">
                    {ref.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 dark:border-purple-900/30 text-center">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 rounded-xl bg-stone-900 dark:bg-purple-600 text-white font-bold text-xs"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
