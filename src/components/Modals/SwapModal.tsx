'use client';

import React, { useState } from 'react';
import { X, ArrowDownUp, Settings2, Sparkles, Check, AlertCircle } from 'lucide-react';
import { Token } from '@/types/wallet';

interface SwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokens: Token[];
  onSuccessSwap: (fromSymbol: string, fromAmount: number, toSymbol: string, toAmount: number) => void;
}

export default function SwapModal({ isOpen, onClose, tokens, onSuccessSwap }: SwapModalProps) {
  const [fromToken, setFromToken] = useState<Token>(tokens[0] || {} as Token);
  const [toToken, setToToken] = useState<Token>(tokens[1] || tokens[0] || {} as Token);
  const [fromAmount, setFromAmount] = useState<string>('0.05');
  const [slippage, setSlippage] = useState<number>(0.5);
  const [isSwapping, setIsSwapping] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  // Conversion rate calculation
  const calculatedRate = (fromToken.priceUsd / (toToken.priceUsd || 1));
  const parsedFrom = parseFloat(fromAmount) || 0;
  const toAmount = (parsedFrom * calculatedRate * 0.998).toFixed(4);

  const handleFlip = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  const handleExecuteSwap = () => {
    setError('');
    if (parsedFrom <= 0) {
      setError('Please specify an amount to swap');
      return;
    }
    if (parsedFrom > fromToken.balance) {
      setError(`Insufficient ${fromToken.symbol} balance`);
      return;
    }

    setIsSwapping(true);
    setTimeout(() => {
      setIsSwapping(false);
      setIsSuccess(true);
      onSuccessSwap(fromToken.symbol, parsedFrom, toToken.symbol, parseFloat(toAmount));
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1800);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-[#1A0E2E] rounded-3xl p-6 shadow-2xl border border-stone-200 dark:border-purple-900/40">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-purple-900/30">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold">
              <ArrowDownUp size={18} />
            </span>
            <div>
              <h3 className="font-bold text-lg text-stone-900 dark:text-white">CypherTrail Swaps</h3>
              <p className="text-xs text-stone-500 dark:text-purple-300">DEX Aggregator with Smart Routing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-white rounded-full hover:bg-stone-100 dark:hover:bg-purple-900/30 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-10 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <Check size={32} />
            </div>
            <h4 className="text-xl font-bold text-stone-900 dark:text-white">Swap Executed!</h4>
            <p className="text-sm text-stone-600 dark:text-purple-300 mt-2">
              Swapped {fromAmount} {fromToken.symbol} for {toAmount} {toToken.symbol}
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-900/50">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {/* From Card */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#120824] border border-stone-200 dark:border-purple-900/50">
              <div className="flex items-center justify-between text-xs text-stone-500 dark:text-purple-300 mb-2">
                <span>You Pay</span>
                <span>Balance: {fromToken.balance} {fromToken.symbol}</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="0.0"
                  className="w-full bg-transparent text-2xl font-bold text-stone-900 dark:text-white focus:outline-none"
                />
                <select
                  value={fromToken.id}
                  onChange={(e) => {
                    const t = tokens.find((tk) => tk.id === e.target.value);
                    if (t) setFromToken(t);
                  }}
                  className="bg-white dark:bg-purple-900/40 border border-stone-200 dark:border-purple-800/40 px-3 py-1.5 rounded-xl font-bold text-sm text-stone-800 dark:text-white"
                >
                  {tokens.map((tk) => (
                    <option key={tk.id} value={tk.id}>
                      {tk.symbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Invert button */}
            <div className="relative flex justify-center -my-2 z-10">
              <button
                type="button"
                onClick={handleFlip}
                className="p-2.5 rounded-full bg-white dark:bg-[#1A0E2E] border-2 border-stone-200 dark:border-purple-900/60 text-blue-600 dark:text-blue-400 hover:scale-110 active:scale-95 transition-all shadow-md"
              >
                <ArrowDownUp size={16} />
              </button>
            </div>

            {/* To Card */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#120824] border border-stone-200 dark:border-purple-900/50">
              <div className="flex items-center justify-between text-xs text-stone-500 dark:text-purple-300 mb-2">
                <span>You Receive</span>
                <span>Balance: {toToken.balance} {toToken.symbol}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-full text-2xl font-bold text-stone-900 dark:text-white">
                  {toAmount}
                </span>
                <select
                  value={toToken.id}
                  onChange={(e) => {
                    const t = tokens.find((tk) => tk.id === e.target.value);
                    if (t) setToToken(t);
                  }}
                  className="bg-white dark:bg-purple-900/40 border border-stone-200 dark:border-purple-800/40 px-3 py-1.5 rounded-xl font-bold text-sm text-stone-800 dark:text-white"
                >
                  {tokens.map((tk) => (
                    <option key={tk.id} value={tk.id}>
                      {tk.symbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rate & Slippage */}
            <div className="p-3 bg-stone-50 dark:bg-[#120824] rounded-xl border border-stone-200 dark:border-purple-900/40 text-xs space-y-1.5">
              <div className="flex justify-between text-stone-600 dark:text-purple-300">
                <span>Exchange Rate</span>
                <span className="font-semibold text-stone-900 dark:text-white">
                  1 {fromToken.symbol} ≈ {calculatedRate.toFixed(4)} {toToken.symbol}
                </span>
              </div>
              <div className="flex justify-between items-center text-stone-600 dark:text-purple-300">
                <span className="flex items-center gap-1">
                  <Settings2 size={12} /> Slippage Tolerance
                </span>
                <div className="flex gap-1">
                  {[0.5, 1.0, 2.0].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSlippage(s)}
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        slippage === s
                          ? 'bg-blue-600 text-white'
                          : 'bg-stone-200 dark:bg-purple-900/40 text-stone-700 dark:text-purple-200'
                      }`}
                    >
                      {s}%
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between text-stone-600 dark:text-purple-300">
                <span>Estimated Network Gas</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">~$0.45 (0.00015 ETH)</span>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleExecuteSwap}
              disabled={isSwapping}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-50"
            >
              {isSwapping ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Routing best DEX route...
                </span>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Swap {fromToken.symbol} → {toToken.symbol}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
