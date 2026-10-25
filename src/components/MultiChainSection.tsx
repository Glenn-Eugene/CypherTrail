'use client';

import React, { useState } from 'react';
import { SUPPORTED_NETWORKS } from '@/data/mockData';
import { Network } from '@/types/wallet';
import { ArrowUpRight, Check, Layers, Cpu, ShieldCheck } from 'lucide-react';

export default function MultiChainSection() {
  const [selectedChain, setSelectedChain] = useState<Network>(SUPPORTED_NETWORKS[2]); // Solana default (like MetaMask's Solana announcement)

  return (
    <section id="multichain" className="py-20 lg:py-28 bg-[#FAF6F0] dark:bg-[#0F081D] border-t border-stone-200 dark:border-purple-950/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Card modeled directly on MetaMask's Solana announcement banner from Mobbin section 04c3b0d2-79a7-49ce-9fdb-d45dea38ee69 */}
        <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#A578FF] via-[#7B3FE4] to-[#25104E] text-white p-8 sm:p-12 lg:p-16 shadow-2xl mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-black/30 backdrop-blur-md text-purple-200">
                LATEST ARCHITECTURE
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white">
                Introducing Solana on CypherTrail
              </h2>
              <p className="text-lg sm:text-xl font-medium text-purple-100/90 max-w-xl">
                One home, many chains. High throughput, sub-second settlement, and unified seed phrases for both EVM and SVM networks.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href="#portfolio"
                  className="px-6 py-3 rounded-full bg-white text-purple-950 font-bold text-xs uppercase tracking-wider hover:bg-purple-100 transition-colors shadow-lg shadow-black/20"
                >
                  Explore Solana Assets
                </a>
                <span className="text-xs text-purple-200/80 self-center">
                  Live on Mainnet Beta & Devnet
                </span>
              </div>
            </div>

            {/* Visual Coin graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-56 h-56 sm:w-72 sm:h-72 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-2xl animate-pulse-subtle" />
                <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-[#1A0E2E] border-4 border-purple-400/50 shadow-2xl flex items-center justify-center transform hover:rotate-6 transition-transform duration-500">
                  <div className="text-center">
                    <span className="text-5xl sm:text-6xl">◎</span>
                    <p className="font-extrabold text-sm sm:text-base tracking-widest uppercase mt-2 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                      SOLANA
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chain selector grid */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
            Unified Multi-Chain Experience
          </h3>
          <p className="mt-2 text-stone-600 dark:text-purple-300 text-sm">
            Switch networks instantaneously with zero RPC reconfiguration required.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SUPPORTED_NETWORKS.map((chain) => (
            <div
              key={chain.id}
              onClick={() => setSelectedChain(chain)}
              className={`p-4 rounded-2xl border text-center cursor-pointer transition-all ${
                selectedChain.id === chain.id
                  ? 'border-blue-600 bg-white dark:bg-[#1A0E2E] shadow-lg shadow-blue-600/10 scale-105'
                  : 'border-stone-200 dark:border-purple-900/30 bg-white/60 dark:bg-[#120824] hover:border-stone-300'
              }`}
            >
              <div className="w-12 h-12 mx-auto rounded-2xl bg-stone-100 dark:bg-purple-900/40 flex items-center justify-center text-2xl mb-2">
                {chain.icon}
              </div>
              <h4 className="font-bold text-xs text-stone-900 dark:text-white truncate">
                {chain.name}
              </h4>
              <p className="text-[11px] font-mono text-stone-400 dark:text-purple-400 mt-0.5">
                {chain.symbol}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
