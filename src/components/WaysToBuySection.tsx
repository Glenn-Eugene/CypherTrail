'use client';

import React, { useState } from 'react';
import { CreditCard, Landmark, Smartphone, Globe2, Percent, CheckCircle2 } from 'lucide-react';

export default function WaysToBuySection() {
  const [activeTab, setActiveTab] = useState<'methods' | 'fees'>('methods');

  return (
    <section id="ways-to-buy" className="py-20 lg:py-28 bg-[#FAF6F0] dark:bg-[#0F081D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Ways to buy crypto with CypherTrail
          </h2>
          <p className="mt-3 text-stone-600 dark:text-purple-200/70 text-base sm:text-lg">
            Choose from flexible global payment methods with high limits and low transparent fees.
          </p>

          {/* Tab Selector (Exact MetaMask design from Mobbin section dc2ffd81-3c80-4b80-a81c-6e2784b0ab62) */}
          <div className="inline-flex p-1 mt-8 rounded-full bg-stone-200 dark:bg-[#1D1137] border border-stone-300 dark:border-purple-800/40">
            <button
              onClick={() => setActiveTab('methods')}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'methods'
                  ? 'bg-stone-900 dark:bg-purple-600 text-white shadow-md'
                  : 'text-stone-600 dark:text-purple-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Payment methods
            </button>
            <button
              onClick={() => setActiveTab('fees')}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'fees'
                  ? 'bg-stone-900 dark:bg-purple-600 text-white shadow-md'
                  : 'text-stone-600 dark:text-purple-300 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Fees & Limits
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'methods' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Credit + debit cards */}
            <div className="relative group overflow-hidden rounded-3xl p-8 bg-[#1F0D3D] text-white border border-purple-900/40 shadow-xl hover:border-purple-600/50 transition-all">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Credit + debit cards</h3>
                  <p className="text-purple-200/80 text-sm max-w-sm leading-relaxed">
                    Use major debit and credit cards, including Visa, Mastercard, and American Express with 3D-Secure protection.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-purple-900/60 flex items-center justify-center text-amber-300">
                  <CreditCard size={24} />
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 mt-8 pt-4 border-t border-purple-900/50">
                <CheckCircle2 size={15} className="text-emerald-400" />
                <span>Instant token delivery • 180+ countries supported</span>
              </div>
            </div>

            {/* Card 2: Bank Transfers */}
            <div className="relative group overflow-hidden rounded-3xl p-8 bg-[#1F0D3D] text-white border border-purple-900/40 shadow-xl hover:border-purple-600/50 transition-all">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Bank Transfers</h3>
                  <p className="text-purple-200/80 text-sm max-w-sm leading-relaxed">
                    Make ACH, SEPA, SEPA Instant, and Faster Payments transfers directly across banks in the USA, UK, and Europe.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-purple-900/60 flex items-center justify-center text-blue-300">
                  <Landmark size={24} />
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 mt-8 pt-4 border-t border-purple-900/50">
                <CheckCircle2 size={15} className="text-emerald-400" />
                <span>Lowest fees (from 0%) • High institutional limits</span>
              </div>
            </div>

            {/* Card 3: Mobile payments */}
            <div className="relative group overflow-hidden rounded-3xl p-8 bg-[#1F0D3D] text-white border border-purple-900/40 shadow-xl hover:border-purple-600/50 transition-all">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Mobile payments</h3>
                  <p className="text-purple-200/80 text-sm max-w-sm leading-relaxed">
                    Buy crypto directly with Apple Pay, Google Pay, PayPal, PIX, GCash, and regional digital wallets.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-purple-900/60 flex items-center justify-center text-emerald-300">
                  <Smartphone size={24} />
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 mt-8 pt-4 border-t border-purple-900/50">
                <CheckCircle2 size={15} className="text-emerald-400" />
                <span>1-Tap biometric checkout • Zero manual card entry</span>
              </div>
            </div>

            {/* Card 4: Local exchanges */}
            <div className="relative group overflow-hidden rounded-3xl p-8 bg-[#1F0D3D] text-white border border-purple-900/40 shadow-xl hover:border-purple-600/50 transition-all">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Local exchanges</h3>
                  <p className="text-purple-200/80 text-sm max-w-sm leading-relaxed">
                    CypherTrail supports a wide range of alternative local payment methods and regional liquidity partners.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-purple-900/60 flex items-center justify-center text-pink-300">
                  <Globe2 size={24} />
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 mt-8 pt-4 border-t border-purple-900/50">
                <CheckCircle2 size={15} className="text-emerald-400" />
                <span>Localized currencies • Competitive forex conversion</span>
              </div>
            </div>
          </div>
        ) : (
          /* Fees & Limits Table */
          <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-stone-200 dark:border-purple-900/40 bg-white dark:bg-[#1A0E2E] shadow-xl p-6">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 dark:border-purple-900/40 text-stone-400 text-xs uppercase">
                  <th className="pb-3 font-bold">Method</th>
                  <th className="pb-3 font-bold">Speed</th>
                  <th className="pb-3 font-bold">Fee Range</th>
                  <th className="pb-3 font-bold text-right">Daily Limit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-purple-900/30 text-stone-800 dark:text-purple-100">
                <tr>
                  <td className="py-3.5 font-bold">ACH / SEPA Bank Transfer</td>
                  <td className="py-3.5 text-stone-500 dark:text-purple-300">0 - 1 Business Day</td>
                  <td className="py-3.5 text-emerald-600 dark:text-emerald-400 font-semibold">0.0% - 0.5%</td>
                  <td className="py-3.5 text-right font-mono">$50,000 / day</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-bold">Apple Pay / Google Pay</td>
                  <td className="py-3.5 text-stone-500 dark:text-purple-300">Instant (&lt; 60 sec)</td>
                  <td className="py-3.5 font-semibold">1.5% - 2.5%</td>
                  <td className="py-3.5 text-right font-mono">$10,000 / day</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-bold">Visa & Mastercard</td>
                  <td className="py-3.5 text-stone-500 dark:text-purple-300">Instant</td>
                  <td className="py-3.5 font-semibold">1.8% - 2.9%</td>
                  <td className="py-3.5 text-right font-mono">$15,000 / day</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-bold">PayPal Direct</td>
                  <td className="py-3.5 text-stone-500 dark:text-purple-300">Instant</td>
                  <td className="py-3.5 text-emerald-600 dark:text-emerald-400 font-semibold">0.0% Promo</td>
                  <td className="py-3.5 text-right font-mono">$20,000 / day</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
