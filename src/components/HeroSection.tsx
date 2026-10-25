'use client';

import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Download, AppWindow, Shield } from 'lucide-react';

interface HeroSectionProps {
  onOpenWallet: () => void;
  children: React.ReactNode;
}

export default function HeroSection({ onOpenWallet, children }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-8 pb-20 lg:pt-14 lg:pb-32">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-orange-400/10 via-purple-600/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Update Notification Pill (MetaMask Mobbin section 70eabcb5-a5d2-49cc-9d45-5893e5378cac) */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#1D1137] border border-stone-200 dark:border-purple-800/40 shadow-sm text-xs font-medium text-stone-800 dark:text-purple-200 hover:border-orange-500/50 transition-colors cursor-pointer group">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F6851B] text-white uppercase tracking-wider">
              UPDATES
            </span>
            <span className="truncate max-w-[280px] sm:max-w-none">
              CypherTrail Multi-chain Engine & Metal Card Presale is Live
            </span>
            <ArrowRight size={13} className="text-orange-500 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <h1 className="font-extrabold tracking-tight text-5xl sm:text-7xl lg:text-8xl text-stone-900 dark:text-white leading-[0.95] mb-6">
            YOUR HOME <br />
            <span className="bg-gradient-to-r from-[#F6851B] via-purple-600 to-[#0376C9] bg-clip-text text-transparent">
              IN WEB3
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-stone-600 dark:text-purple-200/80 max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            The world’s leading self-custodial wallet and Web3 gateway. Securely buy, store, swap, and explore millions of digital assets across Ethereum, Linea, Solana, and 20+ blockchains.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#download"
              className="px-8 py-4 rounded-full bg-stone-900 hover:bg-black dark:bg-white dark:hover:bg-purple-100 text-white dark:text-stone-950 font-bold text-sm uppercase tracking-wider shadow-xl shadow-stone-900/10 dark:shadow-purple-900/20 transition-transform active:scale-95 flex items-center gap-2.5"
            >
              <Download size={18} />
              <span>Get CypherTrail</span>
            </a>

            <button
              onClick={onOpenWallet}
              className="px-8 py-4 rounded-full border-2 border-stone-300 dark:border-purple-800 text-stone-800 dark:text-purple-100 font-bold text-sm uppercase tracking-wider hover:border-stone-400 dark:hover:border-purple-600 bg-white/50 dark:bg-transparent backdrop-blur-sm transition-all active:scale-95 flex items-center gap-2"
            >
              <Sparkles size={17} className="text-[#F6851B]" />
              <span>Try Live Wallet Simulator</span>
            </button>
          </div>

          {/* Social Proof Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs font-semibold text-stone-500 dark:text-purple-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-emerald-500" />
              100% Self-Custodial
            </span>
            <span className="flex items-center gap-1.5">
              <AppWindow size={16} className="text-blue-500" />
              Browser & Mobile Extension
            </span>
            <span className="flex items-center gap-1.5">
              <Shield size={16} className="text-[#F6851B]" />
              Audited by Leading Security Firms
            </span>
          </div>
        </div>

        {/* Live Interactive Wallet Container Showcase */}
        <div id="portfolio" className="relative mt-8">
          {/* Decorative geometric background badge (MetaMask fox origami backdrop) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] -z-10 opacity-30 dark:opacity-20 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
              <polygon points="50,5 5,50 50,95 95,50" stroke="#F6851B" strokeWidth="2" strokeDasharray="4 4" />
              <polygon points="50,20 20,50 50,80 80,50" stroke="#0376C9" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Wallet Simulator Child */}
          {children}
        </div>
      </div>
    </section>
  );
}
