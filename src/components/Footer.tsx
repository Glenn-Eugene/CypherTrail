'use client';

import React, { useState } from 'react';
import { Globe } from 'lucide-react';

export default function Footer() {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  return (
    <footer className="bg-white dark:bg-[#0A0514] border-t border-stone-200 dark:border-purple-950/60 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-stone-200 dark:border-purple-950/50">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F6851B] to-[#CD6116] p-1 flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 100 100" fill="none">
                  <polygon points="50,15 25,45 50,65" fill="#FFFFFF" />
                  <polygon points="50,15 75,45 50,65" fill="#FFFFFF" />
                  <polygon points="25,45 50,65 50,85 15,65" fill="#FFFFFF" opacity="0.9" />
                  <polygon points="75,45 50,65 50,85 85,65" fill="#FFFFFF" opacity="0.9" />
                  <circle cx="38" cy="55" r="4" fill="#140C24" />
                  <circle cx="62" cy="55" r="4" fill="#140C24" />
                </svg>
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-stone-900 dark:text-white">
                CypherTrail
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-purple-300 max-w-sm leading-relaxed">
              CypherTrail is the world-renowned self-custodial Web3 wallet, empowering millions of users to securely store, trade, and explore decentralized finance and cross-chain applications.
            </p>
          </div>

          {/* Column 1: CypherTrail */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-stone-900 dark:text-white">CypherTrail</h4>
            <ul className="space-y-2 text-xs text-stone-600 dark:text-purple-300">
              <li><a href="#download" className="hover:text-blue-600 dark:hover:text-blue-400">Get CypherTrail</a></li>
              <li><a href="#buy-sell" className="hover:text-blue-600 dark:hover:text-blue-400">Buy & Sell</a></li>
              <li><a href="#portfolio" className="hover:text-blue-600 dark:hover:text-blue-400">Earn & Staking</a></li>
              <li><a href="#portfolio" className="hover:text-blue-600 dark:hover:text-blue-400">Swaps Aggregator</a></li>
              <li><a href="#developer" className="hover:text-blue-600 dark:hover:text-blue-400">Snaps Directory</a></li>
              <li><a href="#download" className="hover:text-blue-600 dark:hover:text-blue-400">CypherTrail Metal Card</a></li>
              <li><a href="#faqs" className="hover:text-blue-600 dark:hover:text-blue-400">Learn Web3</a></li>
            </ul>
          </div>

          {/* Column 2: Developer */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-stone-900 dark:text-white">Developer</h4>
            <ul className="space-y-2 text-xs text-stone-600 dark:text-purple-300">
              <li><a href="#developer" className="hover:text-blue-600 dark:hover:text-blue-400">View the Docs</a></li>
              <li><a href="#developer" className="hover:text-blue-600 dark:hover:text-blue-400">Developer Home</a></li>
              <li><a href="#developer" className="hover:text-blue-600 dark:hover:text-blue-400">Dashboard</a></li>
              <li><a href="#developer" className="hover:text-blue-600 dark:hover:text-blue-400">Delegation Toolkit</a></li>
              <li><a href="#developer" className="hover:text-blue-600 dark:hover:text-blue-400">Embedded Wallets</a></li>
              <li><a href="#developer" className="hover:text-blue-600 dark:hover:text-blue-400">CypherTrail SDK</a></li>
              <li><a href="#developer" className="hover:text-blue-600 dark:hover:text-blue-400">Web3 Services</a></li>
            </ul>
          </div>

          {/* Column 3: About */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-stone-900 dark:text-white">About</h4>
            <ul className="space-y-2 text-xs text-stone-600 dark:text-purple-300">
              <li><a href="#faqs" className="hover:text-blue-600 dark:hover:text-blue-400">Security Architecture</a></li>
              <li><a href="#faqs" className="hover:text-blue-600 dark:hover:text-blue-400">24/7 Support</a></li>
              <li><a href="#developer" className="hover:text-blue-600 dark:hover:text-blue-400">Engineering Blog</a></li>
              <li><a href="#download" className="hover:text-blue-600 dark:hover:text-blue-400">Careers</a></li>
              <li><a href="#faqs" className="hover:text-blue-600 dark:hover:text-blue-400">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Social & Language Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 dark:text-purple-300">
            <Globe size={16} />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-stone-100 dark:bg-[#180E2E] border border-stone-200 dark:border-purple-900/40 rounded-lg px-2.5 py-1 text-xs outline-none cursor-pointer text-stone-800 dark:text-white"
            >
              <option value="English">English</option>
              <option value="Español">Español</option>
              <option value="Français">Français</option>
              <option value="Deutsch">Deutsch</option>
              <option value="日本語">日本語</option>
            </select>
          </div>

          {/* Social Badges */}
          <div className="flex items-center gap-2">
            {['𝕏', 'GitHub', 'Discord', 'YouTube', 'Reddit', 'Telegram'].map((net) => (
              <span
                key={net}
                className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-[#180E2E] text-xs font-bold text-stone-700 dark:text-purple-200 border border-stone-200 dark:border-purple-900/40 hover:bg-stone-200 dark:hover:bg-purple-900/50 cursor-pointer transition-colors"
              >
                {net}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Legal Notice (from MetaMask Mobbin section e9773030-cbc5-433a-8d19-36dcce0fdde3) */}
        <div className="mt-8 pt-6 border-t border-stone-100 dark:border-purple-950/30 flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] text-stone-400 dark:text-purple-400">
          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Use</a>
            <a href="#" className="hover:underline">Contributor License Agreement</a>
            <a href="#" className="hover:underline">Sitemap</a>
            <a href="#" className="hover:underline">Accessibility</a>
            <a href="#" className="hover:underline">Manage Cookies</a>
          </div>
          <p>© 2026 CypherTrail • Referencing MetaMask UI Patterns curated by Mobbin</p>
        </div>
      </div>
    </footer>
  );
}
