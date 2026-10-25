'use client';

import React, { useState } from 'react';
import { X, Network as NetIcon, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { SUPPORTED_NETWORKS } from '@/data/mockData';

interface BridgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessBridge: (fromNet: string, toNet: string, amount: string) => void;
}

export default function BridgeModal({ isOpen, onClose, onSuccessBridge }: BridgeModalProps) {
  const [fromNetwork, setFromNetwork] = useState(SUPPORTED_NETWORKS[0]); // Ethereum
  const [toNetwork, setToNetwork] = useState(SUPPORTED_NETWORKS[1]); // Linea
  const [amount, setAmount] = useState<string>('0.25');
  const [isBridging, setIsBridging] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleBridge = () => {
    setIsBridging(true);
    setTimeout(() => {
      setIsBridging(false);
      setIsSuccess(true);
      onSuccessBridge(fromNetwork.name, toNetwork.name, amount);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1800);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-[#1A0E2E] rounded-3xl p-6 shadow-2xl border border-stone-200 dark:border-purple-900/40">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-purple-900/30">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 font-bold">
              <NetIcon size={18} />
            </span>
            <div>
              <h3 className="font-bold text-lg text-stone-900 dark:text-white">CypherTrail Bridge</h3>
              <p className="text-xs text-stone-500 dark:text-purple-300">Cross-Chain Canonical & Native Bridges</p>
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
            <h4 className="text-xl font-bold text-stone-900 dark:text-white">Bridge Initiated!</h4>
            <p className="text-sm text-stone-600 dark:text-purple-300 mt-2">
              Transferring {amount} ETH from {fromNetwork.name} to {toNetwork.name}. Route finalized.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {/* Network Route Selection */}
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-stone-50 dark:bg-[#120824] rounded-2xl border border-stone-200 dark:border-purple-900/50">
              <div>
                <label className="text-[11px] font-bold uppercase text-stone-400 dark:text-purple-400 block mb-1">
                  From Network
                </label>
                <select
                  value={fromNetwork.id}
                  onChange={(e) => {
                    const f = SUPPORTED_NETWORKS.find((n) => n.id === e.target.value);
                    if (f) setFromNetwork(f);
                  }}
                  className="w-full bg-white dark:bg-purple-900/40 border border-stone-200 dark:border-purple-800/40 p-2 rounded-xl text-xs font-bold text-stone-900 dark:text-white"
                >
                  {SUPPORTED_NETWORKS.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.icon} {n.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-stone-400 dark:text-purple-400 block mb-1">
                  To Network
                </label>
                <select
                  value={toNetwork.id}
                  onChange={(e) => {
                    const t = SUPPORTED_NETWORKS.find((n) => n.id === e.target.value);
                    if (t) setToNetwork(t);
                  }}
                  className="w-full bg-white dark:bg-purple-900/40 border border-stone-200 dark:border-purple-800/40 p-2 rounded-xl text-xs font-bold text-stone-900 dark:text-white"
                >
                  {SUPPORTED_NETWORKS.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.icon} {n.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Transfer Amount */}
            <div>
              <label className="block text-xs font-semibold uppercase text-stone-500 dark:text-purple-300 mb-1">
                Amount (ETH)
              </label>
              <div className="flex items-center bg-stone-50 dark:bg-[#120824] border border-stone-200 dark:border-purple-900/50 rounded-2xl px-4 py-3">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                  step="any"
                  className="w-full bg-transparent text-2xl font-bold text-stone-900 dark:text-white focus:outline-none"
                />
                <span className="text-sm font-bold text-stone-500">ETH</span>
              </div>
            </div>

            {/* Bridge Info Summary */}
            <div className="p-3 bg-stone-50 dark:bg-[#120824] rounded-xl border border-stone-200 dark:border-purple-900/40 text-xs space-y-1.5">
              <div className="flex justify-between text-stone-600 dark:text-purple-300">
                <span>Estimated Arrival</span>
                <span className="font-semibold text-stone-900 dark:text-white">~3 mins</span>
              </div>
              <div className="flex justify-between text-stone-600 dark:text-purple-300">
                <span>Bridge Route</span>
                <span className="font-semibold text-stone-900 dark:text-white">Linea Canonical Router</span>
              </div>
              <div className="flex justify-between text-stone-600 dark:text-purple-300">
                <span>Bridge Fee</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">0% Fee (Subsidized)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-purple-300">
              <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
              <span>Secured by cryptographic proof validation across canonical state roots.</span>
            </div>

            <button
              onClick={handleBridge}
              disabled={isBridging}
              className="w-full py-3.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-50"
            >
              {isBridging ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Initiating Cross-Chain Bridge...
                </span>
              ) : (
                <>
                  <span>Bridge {amount} ETH to {toNetwork.name}</span>
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
