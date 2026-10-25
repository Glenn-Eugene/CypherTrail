'use client';

import React, { useState } from 'react';
import { TrendingUp, ShieldCheck, ArrowRight, Sparkles, Check, Clock, BarChart3, AlertCircle } from 'lucide-react';
import { PREDICTION_MARKETS } from '@/data/mockData';
import { PredictionMarket, UserPosition } from '@/types/wallet';

interface PredictionMarketSectionProps {
  onOpenTradeModal: (market: PredictionMarket) => void;
  userUsdcBalance: number;
}

export default function PredictionMarketSection({ onOpenTradeModal, userUsdcBalance }: PredictionMarketSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [quickWagerMarket, setQuickWagerMarket] = useState<PredictionMarket>(PREDICTION_MARKETS[0]);
  const [quickOutcome, setQuickOutcome] = useState<'YES' | 'NO'>('YES');
  const [quickWagerAmount, setQuickWagerAmount] = useState<number>(50);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const categories = ['All', 'Crypto', 'Macro', 'Tech & AI', 'Politics'];

  const filteredMarkets = selectedCategory === 'All'
    ? PREDICTION_MARKETS
    : PREDICTION_MARKETS.filter((m) => m.category === selectedCategory);

  const sharePrice = quickOutcome === 'YES' ? quickWagerMarket.yesPrice : quickWagerMarket.noPrice;
  const numShares = quickWagerAmount > 0 ? +(quickWagerAmount / sharePrice).toFixed(1) : 0;
  const potentialPayout = (numShares * 1.0).toFixed(2);
  const gainPct = quickWagerAmount > 0 ? (((Number(potentialPayout) - quickWagerAmount) / quickWagerAmount) * 100).toFixed(0) : '0';

  const handleQuickWager = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 2500);
  };

  return (
    <section id="prediction-market" className="py-20 lg:py-28 bg-[#18082D] text-white relative overflow-hidden transition-colors border-t border-purple-950/60">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-purple-600/20 via-orange-500/10 to-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-orange-300 border border-orange-500/30 mb-4">
            <Sparkles size={14} className="text-[#F6851B]" />
            <span>NATIVE WEB3 PREDICTION MARKETS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
            Trade What You Believe. <br />
            <span className="bg-gradient-to-r from-orange-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              Directly From CypherTrail.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-purple-200/80 leading-relaxed">
            Trade real-world events, hedge crypto volatility, and speculate on outcomes in Politics, Tech, Macro, and Web3 with deep decentralized orderbook liquidity.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#F6851B] text-white shadow-lg shadow-orange-500/30 scale-105'
                    : 'bg-[#25104E] text-purple-200 hover:bg-[#301663] border border-purple-800/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Markets Board & Quick Trade Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Active Markets Grid */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs text-purple-300 px-1">
              <span className="font-bold uppercase tracking-wider">Trending Events</span>
              <span>24/7 Continuous Liquidity</span>
            </div>

            <div className="space-y-3">
              {filteredMarkets.map((market) => (
                <div
                  key={market.id}
                  className={`p-5 rounded-3xl bg-[#231244] border transition-all ${
                    quickWagerMarket.id === market.id
                      ? 'border-[#F6851B] shadow-xl shadow-orange-500/10'
                      : 'border-purple-800/40 hover:border-purple-600'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{market.icon}</span>
                      <div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-950/80 text-purple-300 border border-purple-800/40">
                          {market.category}
                        </span>
                        <h4 className="font-bold text-sm sm:text-base text-white mt-1 leading-snug">
                          {market.question}
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Probability Bar */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-emerald-400">Yes {market.yesPercent}%</span>
                      <span className="text-red-400">No {market.noPercent}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-purple-950 overflow-hidden flex">
                      <div
                        className="bg-emerald-500 h-full transition-all duration-500"
                        style={{ width: `${market.yesPercent}%` }}
                      />
                      <div
                        className="bg-red-500 h-full transition-all duration-500"
                        style={{ width: `${market.noPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions & Metrics */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-purple-900/40">
                    <div className="flex items-center gap-3 text-xs text-purple-300/80">
                      <span>Vol: <strong className="text-white font-mono">{market.volume24h}</strong></span>
                      <span>•</span>
                      <span>Oracle: <strong className="text-purple-200">{market.oracle}</strong></span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setQuickWagerMarket(market);
                          setQuickOutcome('YES');
                          onOpenTradeModal(market);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold text-xs transition-colors flex items-center gap-1"
                      >
                        <span>Yes</span>
                        <span className="font-mono font-black">{(market.yesPrice * 100).toFixed(0)}¢</span>
                      </button>

                      <button
                        onClick={() => {
                          setQuickWagerMarket(market);
                          setQuickOutcome('NO');
                          onOpenTradeModal(market);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 font-bold text-xs transition-colors flex items-center gap-1"
                      >
                        <span>No</span>
                        <span className="font-mono font-black">{(market.noPrice * 100).toFixed(0)}¢</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Trade Box */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 p-6 rounded-3xl bg-[#231244] border border-purple-800/60 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-purple-900/40 mb-4">
                <div className="flex items-center gap-2">
                  <BarChart3 size={18} className="text-[#F6851B]" />
                  <h3 className="font-bold text-base text-white">Instant Wager Engine</h3>
                </div>
                <span className="text-[11px] font-mono text-purple-300">Gasless on Polygon</span>
              </div>

              {isSuccess ? (
                <div className="py-12 flex flex-col items-center justify-center text-center animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mb-3">
                    <Check size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-white">Trade Placed!</h4>
                  <p className="text-xs text-purple-200 mt-1 max-w-xs">
                    Filled {numShares} {quickOutcome} shares for ${quickWagerAmount} USDC. View in wallet.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Selected market header */}
                  <div className="p-3 rounded-2xl bg-[#1A0C33] border border-purple-900/50">
                    <p className="text-[10px] font-bold uppercase text-[#F6851B]">Selected Market</p>
                    <h4 className="font-bold text-sm text-white mt-0.5 leading-snug">
                      {quickWagerMarket.question}
                    </h4>
                  </div>

                  {/* Pick Yes or No */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setQuickOutcome('YES')}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        quickOutcome === 'YES'
                          ? 'border-emerald-500 bg-emerald-950/40 text-emerald-300 font-extrabold shadow-md'
                          : 'border-purple-900/50 text-purple-300 hover:border-emerald-400/50'
                      }`}
                    >
                      <p className="text-xs uppercase font-extrabold">Buy Yes</p>
                      <p className="text-lg font-black text-emerald-400 mt-0.5">
                        {(quickWagerMarket.yesPrice * 100).toFixed(0)}¢
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setQuickOutcome('NO')}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        quickOutcome === 'NO'
                          ? 'border-red-500 bg-red-950/40 text-red-300 font-extrabold shadow-md'
                          : 'border-purple-900/50 text-purple-300 hover:border-red-400/50'
                      }`}
                    >
                      <p className="text-xs uppercase font-extrabold">Buy No</p>
                      <p className="text-lg font-black text-red-400 mt-0.5">
                        {(quickWagerMarket.noPrice * 100).toFixed(0)}¢
                      </p>
                    </button>
                  </div>

                  {/* Amount */}
                  <div>
                    <div className="flex justify-between items-center text-xs text-purple-300 mb-1">
                      <span>Wager Amount</span>
                      <span>Balance: ${userUsdcBalance.toFixed(2)} USDC</span>
                    </div>
                    <div className="flex items-center bg-[#1A0C33] border border-purple-900/50 rounded-2xl px-3 py-2">
                      <span className="text-lg font-bold text-purple-400 mr-2">$</span>
                      <input
                        type="number"
                        value={quickWagerAmount}
                        onChange={(e) => setQuickWagerAmount(Number(e.target.value))}
                        className="w-full bg-transparent text-lg font-bold text-white focus:outline-none"
                      />
                      <span className="text-xs font-bold text-purple-400">USDC</span>
                    </div>

                    <div className="flex gap-1.5 mt-2">
                      {[25, 50, 100, 250].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setQuickWagerAmount(amt)}
                          className={`flex-1 py-1 text-xs font-bold rounded-lg border transition-colors ${
                            quickWagerAmount === amt
                              ? 'border-[#F6851B] bg-orange-500/20 text-orange-300'
                              : 'border-purple-900/50 text-purple-300 hover:bg-purple-900/30'
                          }`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="p-3 bg-[#1A0C33] rounded-2xl border border-purple-900/40 text-xs space-y-1.5">
                    <div className="flex justify-between text-purple-300">
                      <span>Estimated Shares:</span>
                      <strong className="text-white font-mono">{numShares} {quickOutcome}</strong>
                    </div>
                    <div className="flex justify-between text-purple-300">
                      <span>Potential Payout:</span>
                      <strong className="text-emerald-400 font-mono">${potentialPayout} (+{gainPct}%)</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenTradeModal(quickWagerMarket)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F6851B] to-[#CD6116] hover:from-[#E2761B] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 active:scale-95 transition-transform"
                  >
                    <span>Trade in Full Terminal</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-purple-950/60 text-left">
          <div className="p-6 rounded-3xl bg-[#231244] border border-purple-800/40 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-lg">
              💰
            </div>
            <h4 className="font-bold text-base text-white">Direct Self-Custody Settlement</h4>
            <p className="text-xs text-purple-200/70 leading-relaxed">
              Winning shares resolve automatically to $1.00 USDC delivered directly into your CypherTrail wallet.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#231244] border border-purple-800/40 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center text-lg">
              ⚡
            </div>
            <h4 className="font-bold text-base text-white">Zero Counterparty Risk</h4>
            <p className="text-xs text-purple-200/70 leading-relaxed">
              Non-custodial smart contracts verified on Polygon and Linea. Decentralized oracles resolve every event.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#231244] border border-purple-800/40 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center text-lg">
              🔄
            </div>
            <h4 className="font-bold text-base text-white">24/7 Early Cash-Out</h4>
            <p className="text-xs text-purple-200/70 leading-relaxed">
              Don&apos;t wait for market resolution. Sell your shares anytime on the continuous orderbook to lock in profits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
