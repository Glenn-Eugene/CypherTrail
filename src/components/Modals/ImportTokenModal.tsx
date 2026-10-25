'use client';

import React, { useState } from 'react';
import { X, Plus, Search, AlertCircle, Check } from 'lucide-react';
import { Token } from '@/types/wallet';

interface ImportTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToken: (token: Token) => void;
}

const PRESET_IMPORTABLE_TOKENS = [
  { name: 'Dai Stablecoin', symbol: 'DAI', icon: '◈', price: 1.00 },
  { name: 'Chainlink', symbol: 'LINK', icon: '🔗', price: 18.50 },
  { name: 'Uniswap', symbol: 'UNI', icon: '🦄', price: 9.80 },
  { name: 'Arbitrum', symbol: 'ARB', icon: '🔵', price: 1.15 },
  { name: 'Optimism', symbol: 'OP', icon: '🔴', price: 2.20 }
];

export default function ImportTokenModal({ isOpen, onClose, onAddToken }: ImportTokenModalProps) {
  const [tab, setTab] = useState<'search' | 'custom'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [customAddress, setCustomAddress] = useState('');
  const [customSymbol, setCustomSymbol] = useState('');
  const [customDecimals, setCustomDecimals] = useState('18');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSelectPreset = (preset: typeof PRESET_IMPORTABLE_TOKENS[0]) => {
    const newToken: Token = {
      id: preset.symbol.toLowerCase(),
      name: preset.name,
      symbol: preset.symbol,
      balance: +(Math.random() * 50 + 10).toFixed(2),
      balanceUsd: 0,
      priceUsd: preset.price,
      change24h: +(Math.random() * 8 - 2).toFixed(2),
      icon: preset.icon,
      network: 'linea'
    };
    newToken.balanceUsd = +(newToken.balance * newToken.priceUsd).toFixed(2);
    onAddToken(newToken);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  const handleAddCustom = () => {
    setError('');
    if (!customAddress.startsWith('0x') || customAddress.length < 10) {
      setError('Please provide a valid token contract address starting with 0x');
      return;
    }
    if (!customSymbol.trim()) {
      setError('Please provide a token symbol');
      return;
    }

    const newToken: Token = {
      id: customSymbol.toLowerCase(),
      name: `${customSymbol} Token`,
      symbol: customSymbol.toUpperCase(),
      balance: 100,
      balanceUsd: 100,
      priceUsd: 1.0,
      change24h: 0,
      icon: '🪙',
      network: 'linea'
    };

    onAddToken(newToken);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setCustomAddress('');
      setCustomSymbol('');
      onClose();
    }, 1200);
  };

  const filteredPresets = PRESET_IMPORTABLE_TOKENS.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-[#1A0E2E] rounded-3xl p-6 shadow-2xl border border-stone-200 dark:border-purple-900/40">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-purple-900/30">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold">
              <Plus size={18} />
            </span>
            <div>
              <h3 className="font-bold text-lg text-stone-900 dark:text-white">Import Tokens</h3>
              <p className="text-xs text-stone-500 dark:text-purple-300">Add tokens to your portfolio</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-white rounded-full hover:bg-stone-100 dark:hover:bg-purple-900/30 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex p-1 mt-4 rounded-xl bg-stone-100 dark:bg-[#120824] border border-stone-200 dark:border-purple-900/40">
          <button
            onClick={() => setTab('search')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              tab === 'search'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-purple-300'
            }`}
          >
            Search Popular
          </button>
          <button
            onClick={() => setTab('custom')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              tab === 'custom'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-stone-600 dark:text-purple-300'
            }`}
          >
            Custom Token
          </button>
        </div>

        {isSuccess ? (
          <div className="py-10 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <Check size={28} />
            </div>
            <h4 className="text-lg font-bold text-stone-900 dark:text-white">Token Added!</h4>
            <p className="text-xs text-stone-600 dark:text-purple-300 mt-1">
              Token is now visible in your portfolio balance.
            </p>
          </div>
        ) : tab === 'search' ? (
          <div className="mt-4 space-y-3">
            <div className="relative flex items-center bg-stone-50 dark:bg-[#120824] border border-stone-200 dark:border-purple-900/50 rounded-xl px-3 py-2">
              <Search size={16} className="text-stone-400 mr-2" />
              <input
                type="text"
                placeholder="Search token name or symbol"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-stone-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {filteredPresets.map((token) => (
                <div
                  key={token.symbol}
                  onClick={() => handleSelectPreset(token)}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-stone-100 dark:border-purple-900/30 hover:bg-stone-50 dark:hover:bg-purple-900/20 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{token.icon}</span>
                    <div>
                      <p className="font-bold text-xs text-stone-900 dark:text-white">{token.name}</p>
                      <p className="text-[11px] text-stone-500 dark:text-purple-400">{token.symbol}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    + Import
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {error && (
              <div className="flex items-center gap-2 p-2.5 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-900/50">
                <AlertCircle size={15} />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold uppercase text-stone-500 dark:text-purple-300 mb-1">
                Token Contract Address
              </label>
              <input
                type="text"
                value={customAddress}
                onChange={(e) => setCustomAddress(e.target.value)}
                placeholder="0x..."
                className="w-full bg-stone-50 dark:bg-[#120824] border border-stone-200 dark:border-purple-900/50 rounded-xl px-3 py-2 text-xs font-mono text-stone-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-bold uppercase text-stone-500 dark:text-purple-300 mb-1">
                  Token Symbol
                </label>
                <input
                  type="text"
                  value={customSymbol}
                  onChange={(e) => setCustomSymbol(e.target.value)}
                  placeholder="e.g. CYPHER"
                  className="w-full bg-stone-50 dark:bg-[#120824] border border-stone-200 dark:border-purple-900/50 rounded-xl px-3 py-2 text-xs font-bold text-stone-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase text-stone-500 dark:text-purple-300 mb-1">
                  Decimals
                </label>
                <input
                  type="number"
                  value={customDecimals}
                  onChange={(e) => setCustomDecimals(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-[#120824] border border-stone-200 dark:border-purple-900/50 rounded-xl px-3 py-2 text-xs font-semibold text-stone-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              onClick={handleAddCustom}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-colors mt-2"
            >
              Add Custom Token
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
