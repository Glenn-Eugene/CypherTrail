'use client';

import React, { useState } from 'react';
import { Check, ShieldCheck, ArrowRight, Zap, RefreshCw, ChevronDown } from 'lucide-react';

interface BuySellSectionProps {
  onOpenBuyModal: () => void;
}

export default function BuySellSection({ onOpenBuyModal }: BuySellSectionProps) {
  const [tab, setTab] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState<number>(250);
  const [selectedProvider, setSelectedProvider] = useState<'paypal' | 'transak' | 'robinhood'>('paypal');
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');

  const presets = [50, 100, 250, 500, 1000];

  const providerQuotes = {
    paypal: { name: 'PayPal', eth: (amount / 2525.25).toFixed(3), fee: '0.00%', eta: 'Instant' },
    transak: { name: 'Transak', eth: (amount / 2530.10).toFixed(3), fee: '1.20%', eta: '~2 min' },
    robinhood: { name: 'Robinhood Connect', eth: (amount / 2535.50).toFixed(3), fee: '1.45%', eta: 'Instant' }
  };

  return (
    <section id="buy-sell" className="py-20 lg:py-28 bg-[#F3EEFA]/50 dark:bg-[#150A26] border-y border-stone-200 dark:border-purple-950/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">
            FIAT ON-RAMP & OFF-RAMP
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-tight">
            Buy and sell crypto with the most secure wallet
          </h2>
          <p className="mt-3 text-base sm:text-lg text-stone-600 dark:text-purple-200/70">
            Seamlessly convert cash into crypto with zero hidden markups, competitive quotes, and native instant delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Interactive Widget Replica (Exact Mobbin Section 6c1a099e-c7e1-442d-9b7b-c4983b493b4a) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md bg-white dark:bg-[#1A0E2E] rounded-3xl p-6 shadow-2xl border border-stone-200 dark:border-purple-900/50">
              {/* Buy / Sell Tabs */}
              <div className="flex border-b border-stone-100 dark:border-purple-900/30 pb-4">
                <button
                  onClick={() => setTab('buy')}
                  className={`flex-1 pb-2 text-sm font-bold text-center transition-all relative ${
                    tab === 'buy'
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-stone-400 hover:text-stone-700 dark:hover:text-white'
                  }`}
                >
                  Buy
                  {tab === 'buy' && (
                    <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
                <button
                  onClick={() => setTab('sell')}
                  className={`flex-1 pb-2 text-sm font-bold text-center transition-all relative ${
                    tab === 'sell'
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-stone-400 hover:text-stone-700 dark:hover:text-white'
                  }`}
                >
                  Sell
                  {tab === 'sell' && (
                    <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              </div>

              {/* Account pill & Currency badge */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 dark:bg-[#120824] border border-stone-200 dark:border-purple-900/40 text-xs font-semibold text-stone-700 dark:text-purple-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>cyphertrail.linea.eth</span>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-stone-700 dark:text-purple-200 bg-stone-100 dark:bg-[#120824] px-2.5 py-1.5 rounded-full border border-stone-200 dark:border-purple-900/40">
                  <span>🇺🇸</span>
                  <span>{currency}</span>
                  <ChevronDown size={13} />
                </div>
              </div>

              {/* Amount Display */}
              <div className="text-center py-6">
                <span className="text-stone-400 text-3xl font-extrabold mr-1">$</span>
                <span className="text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
                  {amount}
                </span>
                <div className="flex justify-center gap-2 mt-4">
                  {presets.map((p) => (
                    <button
                      key={p}
                      onClick={() => setAmount(p)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all ${
                        amount === p
                          ? 'border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                          : 'border-stone-200 dark:border-purple-900/40 text-stone-600 dark:text-purple-300 hover:bg-stone-50'
                      }`}
                    >
                      ${p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Asset & Quote Selector (MetaMask style) */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-[#120824] border border-stone-200 dark:border-purple-900/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400">
                      ⟠
                    </span>
                    <div>
                      <h4 className="font-bold text-xs text-stone-900 dark:text-white">Ethereum</h4>
                      <p className="text-[11px] text-stone-500 dark:text-purple-300">Ethereum Mainnet / Linea</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xs text-stone-900 dark:text-white">
                      ≈ {providerQuotes[selectedProvider].eth} ETH
                    </p>
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                      Best Quote
                    </span>
                  </div>
                </div>

                {/* Quotes Card */}
                <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-[#120824] border border-stone-200 dark:border-purple-900/40 space-y-2">
                  <label className="text-[11px] font-bold uppercase text-stone-400 block">
                    Choose Provider Quote
                  </label>
                  {(['paypal', 'transak', 'robinhood'] as const).map((prov) => (
                    <div
                      key={prov}
                      onClick={() => setSelectedProvider(prov)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                        selectedProvider === prov
                          ? 'border-blue-600 bg-white dark:bg-[#1A0E2E] shadow-sm'
                          : 'border-stone-200 dark:border-purple-900/30 hover:bg-white dark:hover:bg-purple-900/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-stone-900 dark:text-white capitalize">
                          {providerQuotes[prov].name}
                        </span>
                        {prov === 'paypal' && (
                          <span className="px-1.5 py-0.2 text-[9px] font-bold uppercase bg-emerald-500 text-white rounded">
                            Lowest Fee
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-stone-900 dark:text-white">
                          ≈ {providerQuotes[prov].eth} ETH
                        </span>
                        <p className="text-[10px] text-stone-400">{providerQuotes[prov].eta}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Payment Option Pill */}
                <div className="p-3 rounded-xl bg-stone-100 dark:bg-[#120824] text-xs font-semibold text-stone-700 dark:text-purple-200 flex items-center justify-between">
                  <span>Debit or Credit Card</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">Instant</span>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={onOpenBuyModal}
                className="w-full mt-4 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
              >
                <span>Review Order & Instant Buy</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Right Text Features (from MetaMask Mobbin screen copy) */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                <Zap size={20} />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 dark:text-white">
                Fast, easy, direct
              </h3>
              <p className="text-stone-600 dark:text-purple-200/70 text-sm sm:text-base leading-relaxed">
                Cash to crypto and back again, all from inside your wallet. No lengthy KYC delays or transfers between external brokers.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                <RefreshCw size={20} />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 dark:text-white">
                Competitive real-time prices
              </h3>
              <p className="text-stone-600 dark:text-purple-200/70 text-sm sm:text-base leading-relaxed">
                Choose the best quote from top global providers like PayPal, Robinhood, Transak, MoonPay, and Stripe Onramp.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 dark:text-white">
                Thousands of tokens on multiple networks
              </h3>
              <p className="text-stone-600 dark:text-purple-200/70 text-sm sm:text-base leading-relaxed">
                Buy crypto directly on popular networks including Ethereum, Linea, Solana, Base, Polygon, Arbitrum, and Optimism.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
