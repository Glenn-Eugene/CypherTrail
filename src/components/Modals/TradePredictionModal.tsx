'use client';

import React, { useState } from 'react';
import { X, TrendingUp, ShieldCheck, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { PredictionMarket, UserPosition } from '@/types/wallet';

interface TradePredictionModalProps {
  isOpen: boolean;
  onClose: () => void;
  market: PredictionMarket | null;
  onSuccessTrade: (newPosition: UserPosition, cost: number) => void;
  userUsdcBalance: number;
}

export default function TradePredictionModal({
  isOpen,
  onClose,
  market,
  onSuccessTrade,
  userUsdcBalance
}: TradePredictionModalProps) {
  const [outcome, setOutcome] = useState<'YES' | 'NO'>('YES');
  const [wagerAmount, setWagerAmount] = useState<number>(50);
  const [isTrading, setIsTrading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  if (!isOpen || !market) return null;

  const sharePrice = outcome === 'YES' ? market.yesPrice : market.noPrice;
  const numShares = wagerAmount > 0 ? +(wagerAmount / sharePrice).toFixed(1) : 0;
  const potentialPayout = numShares * 1.0; // $1.00 per winning share
  const returnMultiplier = wagerAmount > 0 ? (((potentialPayout - wagerAmount) / wagerAmount) * 100).toFixed(1) : '0';

  const presets = [10, 25, 50, 100, 250];

  const handleExecuteTrade = () => {
    setError('');
    if (wagerAmount <= 0) {
      setError('Please enter a valid trade amount');
      return;
    }
    if (wagerAmount > userUsdcBalance) {
      setError(`Insufficient USDC balance (You have $${userUsdcBalance.toFixed(2)})`);
      return;
    }

    setIsTrading(true);
    setTimeout(() => {
      setIsTrading(false);
      setIsSuccess(true);

      const newPos: UserPosition = {
        id: `pos-${Date.now()}`,
        marketId: market.id,
        question: market.question,
        outcome,
        shares: numShares,
        avgBuyPrice: sharePrice,
        currentPrice: sharePrice,
        totalCost: wagerAmount,
        currentValue: wagerAmount,
        pnlUsd: 0,
        pnlPercent: 0
      };

      onSuccessTrade(newPos, wagerAmount);

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1600);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-[#1A0E2E] rounded-3xl p-6 shadow-2xl border border-stone-200 dark:border-purple-900/50">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-purple-900/30">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-[#F6851B] font-bold text-base">
              📊
            </span>
            <div>
              <h3 className="font-bold text-base text-stone-900 dark:text-white">Trade Prediction</h3>
              <p className="text-xs text-stone-500 dark:text-purple-300">Decentralized Orderbook</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-white rounded-full hover:bg-stone-100 dark:hover:bg-purple-900/30 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-10 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <Check size={32} />
            </div>
            <h4 className="text-xl font-bold text-stone-900 dark:text-white">Order Filled!</h4>
            <p className="text-sm text-stone-600 dark:text-purple-300 mt-1 max-w-xs">
              Bought {numShares} {outcome} shares for ${wagerAmount} USDC.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {/* Market Title */}
            <div className="p-3 bg-stone-50 dark:bg-[#120824] rounded-2xl border border-stone-200 dark:border-purple-900/40">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{market.icon}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-stone-200 dark:bg-purple-900/40 text-stone-700 dark:text-purple-200">
                  {market.category}
                </span>
                <span className="text-[11px] text-stone-400 ml-auto">Ends: {market.endDate}</span>
              </div>
              <p className="font-bold text-sm text-stone-900 dark:text-white leading-snug">
                {market.question}
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-2.5 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-900/50">
                <AlertCircle size={15} />
                <span>{error}</span>
              </div>
            )}

            {/* Outcome Selection Buttons */}
            <div>
              <label className="block text-xs font-semibold uppercase text-stone-500 dark:text-purple-300 mb-1.5">
                Select Outcome
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOutcome('YES')}
                  className={`p-3.5 rounded-2xl border text-center transition-all ${
                    outcome === 'YES'
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-extrabold shadow-sm scale-[1.02]'
                      : 'border-stone-200 dark:border-purple-900/40 text-stone-600 dark:text-purple-300 hover:border-emerald-300'
                  }`}
                >
                  <p className="text-xs uppercase font-extrabold">BUY YES</p>
                  <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                    {(market.yesPrice * 100).toFixed(0)}¢
                  </p>
                  <p className="text-[10px] text-stone-400">{market.yesPercent}% Probability</p>
                </button>

                <button
                  type="button"
                  onClick={() => setOutcome('NO')}
                  className={`p-3.5 rounded-2xl border text-center transition-all ${
                    outcome === 'NO'
                      ? 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 font-extrabold shadow-sm scale-[1.02]'
                      : 'border-stone-200 dark:border-purple-900/40 text-stone-600 dark:text-purple-300 hover:border-red-300'
                  }`}
                >
                  <p className="text-xs uppercase font-extrabold">BUY NO</p>
                  <p className="text-xl font-black text-red-600 dark:text-red-400 mt-1">
                    {(market.noPrice * 100).toFixed(0)}¢
                  </p>
                  <p className="text-[10px] text-stone-400">{market.noPercent}% Probability</p>
                </button>
              </div>
            </div>

            {/* Investment Amount */}
            <div>
              <div className="flex justify-between items-center text-xs text-stone-500 dark:text-purple-300 mb-1">
                <span>Amount (USDC)</span>
                <span>Available: ${userUsdcBalance.toFixed(2)}</span>
              </div>
              <div className="flex items-center bg-stone-50 dark:bg-[#120824] border border-stone-200 dark:border-purple-900/50 rounded-2xl px-4 py-2.5">
                <span className="text-xl font-bold text-stone-400 mr-2">$</span>
                <input
                  type="number"
                  value={wagerAmount}
                  onChange={(e) => setWagerAmount(Number(e.target.value))}
                  min={1}
                  className="w-full bg-transparent text-xl font-bold text-stone-900 dark:text-white focus:outline-none"
                />
                <span className="text-xs font-bold text-stone-400">USDC</span>
              </div>

              {/* Chips */}
              <div className="flex gap-2 mt-2">
                {presets.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setWagerAmount(amt)}
                    className={`flex-1 py-1 text-xs font-semibold rounded-lg border transition-colors ${
                      wagerAmount === amt
                        ? 'border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
                        : 'border-stone-200 dark:border-purple-900/40 text-stone-600 dark:text-purple-300 hover:bg-stone-50'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Payout Breakdown */}
            <div className="p-3 bg-stone-50 dark:bg-[#120824] rounded-xl border border-stone-200 dark:border-purple-900/40 text-xs space-y-1.5">
              <div className="flex justify-between text-stone-600 dark:text-purple-300">
                <span>Shares Purchased</span>
                <span className="font-bold text-stone-900 dark:text-white">
                  {numShares} {outcome} Shares
                </span>
              </div>
              <div className="flex justify-between text-stone-600 dark:text-purple-300">
                <span>Avg Price per Share</span>
                <span className="font-mono text-stone-900 dark:text-white">${sharePrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600 dark:text-purple-300">
                <span>Potential Payout (if correct)</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  ${potentialPayout.toFixed(2)} (+{returnMultiplier}%)
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleExecuteTrade}
              disabled={isTrading}
              className={`w-full py-3.5 px-4 rounded-xl text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-50 ${
                outcome === 'YES'
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30'
                  : 'bg-red-600 hover:bg-red-700 shadow-red-600/30'
              }`}
            >
              {isTrading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Routing to Orderbook...
                </span>
              ) : (
                <>
                  <span>Confirm Trade • Buy {outcome} (${wagerAmount})</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
