'use client';

import React, { useState } from 'react';
import { X, Send, Fuel, AlertCircle, Check } from 'lucide-react';
import { Token } from '@/types/wallet';

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokens: Token[];
  onSuccessSend: (tokenSymbol: string, amount: number, recipient: string) => void;
}

export default function SendModal({ isOpen, onClose, tokens, onSuccessSend }: SendModalProps) {
  const [selectedToken, setSelectedToken] = useState<Token>(tokens[0] || {} as Token);
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [gasTier, setGasTier] = useState<'low' | 'market' | 'aggressive'>('market');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const handleSend = () => {
    setError('');
    if (!recipient.trim()) {
      setError('Please enter a recipient address or ENS name');
      return;
    }
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid transfer amount');
      return;
    }
    if (numAmount > selectedToken.balance) {
      setError(`Insufficient ${selectedToken.symbol} balance`);
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      onSuccessSend(selectedToken.symbol, numAmount, recipient);
      setTimeout(() => {
        setIsSuccess(false);
        setRecipient('');
        setAmount('');
        onClose();
      }, 1800);
    }, 1200);
  };

  const gasFees = {
    low: { gwei: '12', usd: '$0.42', eta: '~45 sec' },
    market: { gwei: '16', usd: '$0.65', eta: '~15 sec' },
    aggressive: { gwei: '24', usd: '$1.05', eta: '< 5 sec' }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-[#1A0E2E] rounded-3xl p-6 shadow-2xl border border-stone-200 dark:border-purple-900/40">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-purple-900/30">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold">
              <Send size={18} />
            </span>
            <div>
              <h3 className="font-bold text-lg text-stone-900 dark:text-white">Send Tokens</h3>
              <p className="text-xs text-stone-500 dark:text-purple-300">Fast on-chain transfer</p>
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
            <h4 className="text-xl font-bold text-stone-900 dark:text-white">Transaction Broadcast!</h4>
            <p className="text-sm text-stone-600 dark:text-purple-300 mt-2">
              Sent {amount} {selectedToken.symbol} to {recipient.slice(0, 10)}...
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

            {/* Recipient */}
            <div>
              <label className="block text-xs font-semibold uppercase text-stone-500 dark:text-purple-300 mb-1">
                Recipient Address
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x... or ENS domain"
                className="w-full bg-stone-50 dark:bg-[#120824] border border-stone-200 dark:border-purple-900/50 rounded-xl px-4 py-2.5 text-sm font-mono text-stone-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Asset Selector & Amount */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold uppercase text-stone-500 dark:text-purple-300">
                  Asset & Amount
                </label>
                <span className="text-xs text-stone-500 dark:text-purple-400">
                  Balance: {selectedToken.balance} {selectedToken.symbol}
                </span>
              </div>

              <div className="flex gap-2">
                <select
                  value={selectedToken.id}
                  onChange={(e) => {
                    const found = tokens.find((t) => t.id === e.target.value);
                    if (found) setSelectedToken(found);
                  }}
                  className="bg-stone-50 dark:bg-[#120824] border border-stone-200 dark:border-purple-900/50 rounded-xl px-3 py-2.5 text-sm font-semibold text-stone-900 dark:text-white focus:outline-none"
                >
                  {tokens.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.icon} {t.symbol}
                    </option>
                  ))}
                </select>

                <div className="relative flex-1 flex items-center bg-stone-50 dark:bg-[#120824] border border-stone-200 dark:border-purple-900/50 rounded-xl px-3">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.0"
                    step="any"
                    className="w-full bg-transparent text-sm font-semibold text-stone-900 dark:text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setAmount(selectedToken.balance.toString())}
                    className="ml-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase hover:underline"
                  >
                    Max
                  </button>
                </div>
              </div>
            </div>

            {/* Network Fee Tier */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold uppercase text-stone-500 dark:text-purple-300 flex items-center gap-1">
                  <Fuel size={14} /> Network Fee (Gas)
                </label>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {(['low', 'market', 'aggressive'] as const).map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setGasTier(tier)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      gasTier === tier
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold shadow-sm'
                        : 'border-stone-200 dark:border-purple-900/40 text-stone-600 dark:text-purple-300'
                    }`}
                  >
                    <p className="text-xs uppercase font-bold tracking-wider capitalize">{tier}</p>
                    <p className="text-xs font-medium text-stone-900 dark:text-white mt-0.5">
                      {gasFees[tier].usd}
                    </p>
                    <p className="text-[10px] text-stone-400">{gasFees[tier].eta}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleSend}
              disabled={isSending}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-50"
            >
              {isSending ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Broadcasting Transfer...
                </span>
              ) : (
                <>
                  <span>Send {amount ? `${amount} ${selectedToken.symbol}` : 'Tokens'}</span>
                  <Send size={15} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
