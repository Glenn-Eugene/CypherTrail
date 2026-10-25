'use client';

import React, { useState } from 'react';
import { X, Check, ArrowRight, ShieldCheck, CreditCard, Landmark, Smartphone } from 'lucide-react';
import { PROVIDER_QUOTES } from '@/data/mockData';
import { ProviderQuote } from '@/types/wallet';

interface BuySellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessBuy: (amountEth: number, fiatSpent: number) => void;
}

export default function BuySellModal({ isOpen, onClose, onSuccessBuy }: BuySellModalProps) {
  const [mode, setMode] = useState<'buy' | 'sell'>('buy');
  const [fiatAmount, setFiatAmount] = useState<number>(250);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [selectedProvider, setSelectedProvider] = useState<ProviderQuote>(PROVIDER_QUOTES[0]);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'applePay'>('card');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const quickAmounts = [50, 100, 250, 500, 1000];

  const handleExecute = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      const ethReceived = +(fiatAmount / 2525.25).toFixed(4);
      onSuccessBuy(ethReceived, fiatAmount);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1800);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-[#1A0E2E] rounded-3xl p-6 shadow-2xl border border-stone-200 dark:border-purple-900/40 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-purple-900/30">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold text-lg">
              ±
            </span>
            <div>
              <h3 className="font-bold text-lg text-stone-900 dark:text-white">Buy & Sell Crypto</h3>
              <p className="text-xs text-stone-500 dark:text-purple-300">Powered by CypherTrail On-Ramp</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-white rounded-full hover:bg-stone-100 dark:hover:bg-purple-900/30 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex p-1 mt-4 rounded-xl bg-stone-100 dark:bg-[#120824] border border-stone-200 dark:border-purple-900/40">
          <button
            onClick={() => setMode('buy')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              mode === 'buy'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-stone-600 dark:text-purple-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setMode('sell')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              mode === 'sell'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-stone-600 dark:text-purple-300 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            Sell
          </button>
        </div>

        {isSuccess ? (
          <div className="py-12 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <Check size={32} />
            </div>
            <h4 className="text-xl font-bold text-stone-900 dark:text-white">Order Confirmed!</h4>
            <p className="text-sm text-stone-600 dark:text-purple-300 mt-2">
              Successfully processed ${fiatAmount} via {selectedProvider.name}. Funds deposited into your CypherTrail wallet.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {/* Amount input */}
            <div>
              <label className="block text-xs font-semibold uppercase text-stone-500 dark:text-purple-300 mb-1">
                You Pay
              </label>
              <div className="relative flex items-center bg-stone-50 dark:bg-[#120824] border border-stone-200 dark:border-purple-900/50 rounded-2xl px-4 py-3">
                <span className="text-2xl font-bold text-stone-400 mr-2">$</span>
                <input
                  type="number"
                  value={fiatAmount}
                  onChange={(e) => setFiatAmount(Number(e.target.value))}
                  className="w-full bg-transparent text-2xl font-bold text-stone-900 dark:text-white focus:outline-none"
                  min={10}
                />
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="bg-stone-200 dark:bg-purple-900/40 text-stone-800 dark:text-purple-200 font-medium px-3 py-1.5 rounded-xl border-none outline-none cursor-pointer"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="CAD">CAD</option>
                </select>
              </div>

              {/* Quick Amount Chips */}
              <div className="flex gap-2 mt-2">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setFiatAmount(amt)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                      fiatAmount === amt
                        ? 'border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
                        : 'border-stone-200 dark:border-purple-900/40 text-stone-600 dark:text-purple-300 hover:bg-stone-100 dark:hover:bg-purple-900/20'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Estimated Crypto */}
            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-[#120824] border border-stone-200 dark:border-purple-900/40 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-500 dark:text-purple-300">Estimated Return</span>
                <p className="text-lg font-bold text-stone-900 dark:text-white">
                  ≈ {(fiatAmount / 2525.25).toFixed(4)} ETH
                </p>
              </div>
              <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full">
                Best Rate Guaranteed
              </span>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-xs font-semibold uppercase text-stone-500 dark:text-purple-300 mb-2">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-medium transition-all ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 font-semibold shadow-sm'
                      : 'border-stone-200 dark:border-purple-900/40 text-stone-600 dark:text-purple-300 hover:border-stone-300'
                  }`}
                >
                  <CreditCard size={18} />
                  <span>Debit / Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-medium transition-all ${
                    paymentMethod === 'bank'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 font-semibold shadow-sm'
                      : 'border-stone-200 dark:border-purple-900/40 text-stone-600 dark:text-purple-300 hover:border-stone-300'
                  }`}
                >
                  <Landmark size={18} />
                  <span>Bank Wire</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('applePay')}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-medium transition-all ${
                    paymentMethod === 'applePay'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 font-semibold shadow-sm'
                      : 'border-stone-200 dark:border-purple-900/40 text-stone-600 dark:text-purple-300 hover:border-stone-300'
                  }`}
                >
                  <Smartphone size={18} />
                  <span>Apple Pay</span>
                </button>
              </div>
            </div>

            {/* Provider Quotes List */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase text-stone-500 dark:text-purple-300">
                  Select Provider Quote
                </label>
                <span className="text-[11px] text-stone-400">Quotes update in real-time</span>
              </div>
              <div className="space-y-2">
                {PROVIDER_QUOTES.map((q) => (
                  <div
                    key={q.id}
                    onClick={() => setSelectedProvider(q)}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedProvider.id === q.id
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 shadow-sm'
                        : 'border-stone-200 dark:border-purple-900/40 hover:bg-stone-50 dark:hover:bg-purple-900/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{q.logo}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-stone-900 dark:text-white">{q.name}</span>
                          {q.isBestRate && (
                            <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-white rounded">
                              Best Rate
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-500 dark:text-purple-300">Fee: {q.fee} • {q.eta}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-stone-900 dark:text-white">
                        ≈ {(fiatAmount / 2525.25 * (q.id === 'paypal' ? 1 : 0.995)).toFixed(4)} ETH
                      </p>
                      <p className="text-xs text-stone-400">{q.rate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security note */}
            <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-purple-300 pt-1">
              <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
              <span>Self-custodial: Assets are delivered directly to your on-chain address.</span>
            </div>

            {/* CTA */}
            <button
              onClick={handleExecute}
              disabled={isProcessing}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-50"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Routing Order via {selectedProvider.name}...
                </span>
              ) : (
                <>
                  <span>Continue with {selectedProvider.name}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
