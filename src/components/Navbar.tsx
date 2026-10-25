'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  Globe,
  Sun,
  Moon,
  Menu,
  X,
  ExternalLink,
  Shield,
  Layers,
  ArrowDownUp,
  Cpu,
  CreditCard
} from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onOpenWallet: () => void;
}

export default function Navbar({ isDarkMode, toggleDarkMode, onOpenWallet }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresDropdownOpen, setFeaturesDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FAF6F0]/90 dark:bg-[#0F081D]/90 border-b border-stone-200 dark:border-purple-950/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-3 group">
            {/* Geometric Fox Logo (MetaMask signature) */}
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#F6851B] to-[#CD6116] p-1.5 shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform flex items-center justify-center">
              <svg className="w-7 h-7" viewBox="0 0 100 100" fill="none">
                <polygon points="50,15 25,45 50,65" fill="#FFFFFF" />
                <polygon points="50,15 75,45 50,65" fill="#FFFFFF" />
                <polygon points="25,45 10,25 35,38" fill="#F3EEFA" opacity="0.8" />
                <polygon points="75,45 90,25 65,38" fill="#F3EEFA" opacity="0.8" />
                <polygon points="25,45 50,65 50,85 15,65" fill="#FFFFFF" opacity="0.9" />
                <polygon points="75,45 50,65 50,85 85,65" fill="#FFFFFF" opacity="0.9" />
                <circle cx="38" cy="55" r="4" fill="#140C24" />
                <circle cx="62" cy="55" r="4" fill="#140C24" />
              </svg>
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tight text-stone-900 dark:text-white">
                CypherTrail
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 rounded-full">
                WEB3 SUITE
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <div
              className="relative"
              onMouseEnter={() => setFeaturesDropdownOpen(true)}
              onMouseLeave={() => setFeaturesDropdownOpen(false)}
            >
              <button className="flex items-center gap-1.5 text-sm font-semibold text-stone-700 hover:text-stone-900 dark:text-purple-200 dark:hover:text-white transition-colors py-2">
                <span>Features</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${featuresDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {featuresDropdownOpen && (
                <div className="absolute top-8 -left-4 w-72 bg-white dark:bg-[#180E2E] border border-stone-200 dark:border-purple-900/50 rounded-2xl p-3 shadow-2xl animate-fade-in z-50">
                  <a
                    href="#portfolio"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-stone-50 dark:hover:bg-purple-900/30 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                      <Layers size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 dark:text-white">Portfolio Dashboard</h4>
                      <p className="text-[11px] text-stone-500 dark:text-purple-300">Track tokens & NFTs across chains</p>
                    </div>
                  </a>

                  <a
                    href="#buy-sell"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-stone-50 dark:hover:bg-purple-900/30 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400">
                      <ArrowDownUp size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 dark:text-white">Buy & Swaps Engine</h4>
                      <p className="text-[11px] text-stone-500 dark:text-purple-300">Fiat on-ramp & DEX aggregator</p>
                    </div>
                  </a>

                  <a
                    href="#multichain"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-stone-50 dark:hover:bg-purple-900/30 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                      <Cpu size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 dark:text-white">Multi-Chain & Solana</h4>
                      <p className="text-[11px] text-stone-500 dark:text-purple-300">One home, all major blockchains</p>
                    </div>
                  </a>

                  <a
                    href="#prediction-market"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-stone-50 dark:hover:bg-purple-900/30 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400">
                      <span className="font-bold text-sm">📊</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-stone-900 dark:text-white">Prediction Markets</h4>
                        <span className="px-1.5 py-0.2 text-[9px] font-bold uppercase bg-emerald-500 text-white rounded">
                          New
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 dark:text-purple-300">Trade real-world event shares</p>
                    </div>
                  </a>

                  <a
                    href="#developer"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-stone-50 dark:hover:bg-purple-900/30 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                      <Shield size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 dark:text-white">Security & Snaps</h4>
                      <p className="text-[11px] text-stone-500 dark:text-purple-300">Extensible Web3 modularity</p>
                    </div>
                  </a>
                </div>
              )}
            </div>

            <a
              href="#prediction-market"
              className="text-sm font-semibold text-stone-700 hover:text-stone-900 dark:text-purple-200 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Predictions</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#F6851B]" />
            </a>

            <a
              href="#developer"
              className="text-sm font-semibold text-stone-700 hover:text-stone-900 dark:text-purple-200 dark:hover:text-white transition-colors"
            >
              Developer
            </a>

            <a
              href="#ways-to-buy"
              className="text-sm font-semibold text-stone-700 hover:text-stone-900 dark:text-purple-200 dark:hover:text-white transition-colors"
            >
              Cryptocurrencies
            </a>

            <a
              href="#faqs"
              className="text-sm font-semibold text-stone-700 hover:text-stone-900 dark:text-purple-200 dark:hover:text-white transition-colors"
            >
              Support & FAQs
            </a>
          </nav>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-full text-stone-600 hover:text-stone-900 dark:text-purple-200 dark:hover:text-white bg-stone-100 dark:bg-[#1C1035] hover:bg-stone-200 dark:hover:bg-purple-900/50 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Connect / Open Wallet Simulator */}
          <button
            onClick={onOpenWallet}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full border border-stone-300 dark:border-purple-800 text-stone-800 dark:text-purple-100 font-bold text-xs hover:border-stone-400 dark:hover:border-purple-600 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Launch Wallet</span>
          </button>

          {/* Primary CTA Button (MetaMask pill CTA) */}
          <a
            href="#download"
            className="px-6 py-2.5 rounded-full bg-stone-900 hover:bg-black dark:bg-white dark:hover:bg-purple-100 text-white dark:text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95 flex items-center gap-2"
          >
            <span>Get CypherTrail</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 dark:text-purple-200"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 dark:border-purple-950/60 bg-[#FAF6F0] dark:bg-[#0F081D] px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          <a
            href="#portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-stone-800 dark:text-white"
          >
            Portfolio
          </a>
          <a
            href="#buy-sell"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-stone-800 dark:text-white"
          >
            Buy & Sell Crypto
          </a>
          <a
            href="#prediction-market"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-stone-800 dark:text-white"
          >
            Prediction Markets 📊
          </a>
          <a
            href="#multichain"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-stone-800 dark:text-white"
          >
            Multi-Chain
          </a>
          <a
            href="#developer"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-stone-800 dark:text-white"
          >
            Developers & SDK
          </a>
          <a
            href="#faqs"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-stone-800 dark:text-white"
          >
            Frequently Asked Questions
          </a>
          <div className="pt-2 flex gap-2">
            <button
              onClick={() => {
                onOpenWallet();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 text-center rounded-xl bg-blue-600 text-white font-bold text-xs"
            >
              Open Wallet Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
