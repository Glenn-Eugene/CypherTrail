'use client';

import React, { useState } from 'react';
import { X, QrCode, Copy, Check, Share2, AlertTriangle } from 'lucide-react';

interface ReceiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
  ensName: string;
}

export default function ReceiveModal({ isOpen, onClose, walletAddress, ensName }: ReceiveModalProps) {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm bg-white dark:bg-[#1A0E2E] rounded-3xl p-6 shadow-2xl border border-stone-200 dark:border-purple-900/40 text-center">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-purple-900/30">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold">
              <QrCode size={18} />
            </span>
            <div className="text-left">
              <h3 className="font-bold text-base text-stone-900 dark:text-white">Receive Assets</h3>
              <p className="text-xs text-stone-500 dark:text-purple-300">Scan QR or share address</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-white rounded-full hover:bg-stone-100 dark:hover:bg-purple-900/30 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* QR Code Container */}
        <div className="my-5 p-4 bg-stone-50 dark:bg-[#120824] rounded-2xl border border-stone-200 dark:border-purple-900/40 inline-flex flex-col items-center">
          {/* Custom SVG QR Code with CypherTrail Logo */}
          <div className="relative p-3 bg-white rounded-xl shadow-inner border border-stone-100">
            <svg
              className="w-48 h-48"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Corner Targets */}
              <rect x="10" y="10" width="50" height="50" rx="10" fill="#141618" />
              <rect x="20" y="20" width="30" height="30" rx="6" fill="white" />
              <rect x="27" y="27" width="16" height="16" rx="4" fill="#F6851B" />

              <rect x="140" y="10" width="50" height="50" rx="10" fill="#141618" />
              <rect x="150" y="20" width="30" height="30" rx="6" fill="white" />
              <rect x="157" y="27" width="16" height="16" rx="4" fill="#0376C9" />

              <rect x="10" y="140" width="50" height="50" rx="10" fill="#141618" />
              <rect x="20" y="150" width="30" height="30" rx="6" fill="white" />
              <rect x="27" y="157" width="16" height="16" rx="4" fill="#10B981" />

              {/* Data Pattern Dots */}
              <circle cx="80" cy="25" r="5" fill="#141618" />
              <circle cx="100" cy="25" r="5" fill="#141618" />
              <circle cx="120" cy="25" r="5" fill="#141618" />
              <circle cx="75" cy="45" r="4" fill="#141618" />
              <circle cx="95" cy="45" r="4" fill="#141618" />
              <circle cx="115" cy="45" r="4" fill="#141618" />
              
              <circle cx="25" cy="80" r="5" fill="#141618" />
              <circle cx="45" cy="75" r="4" fill="#141618" />
              <circle cx="25" cy="100" r="5" fill="#141618" />
              <circle cx="45" cy="115" r="4" fill="#141618" />

              <circle cx="155" cy="80" r="5" fill="#141618" />
              <circle cx="175" cy="75" r="4" fill="#141618" />
              <circle cx="155" cy="100" r="5" fill="#141618" />
              <circle cx="175" cy="115" r="4" fill="#141618" />

              <circle cx="80" cy="155" r="5" fill="#141618" />
              <circle cx="100" cy="155" r="5" fill="#141618" />
              <circle cx="120" cy="155" r="5" fill="#141618" />
              <circle cx="140" cy="175" r="4" fill="#141618" />
              <circle cx="160" cy="155" r="5" fill="#141618" />
              <circle cx="180" cy="175" r="4" fill="#141618" />

              {/* Center Emblem */}
              <circle cx="100" cy="100" r="24" fill="#1E1035" />
              <polygon points="100,82 114,94 100,118 86,94" fill="#F6851B" />
              <polygon points="100,88 108,96 100,112 92,96" fill="#FFA959" />
            </svg>
          </div>
          <span className="text-xs font-semibold text-stone-700 dark:text-purple-200 mt-2">
            {ensName}
          </span>
        </div>

        {/* Address Display & Copy */}
        <div className="flex items-center justify-between p-2.5 bg-stone-50 dark:bg-[#120824] rounded-xl border border-stone-200 dark:border-purple-900/50 mb-4">
          <span className="font-mono text-xs text-stone-600 dark:text-purple-300 truncate max-w-[220px]">
            {walletAddress}
          </span>
          <button
            onClick={handleCopy}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              copied
                ? 'bg-emerald-500 text-white'
                : 'bg-stone-200 dark:bg-purple-900/50 text-stone-800 dark:text-purple-200 hover:bg-stone-300'
            }`}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Warning Notice */}
        <div className="flex items-start gap-2 p-2.5 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/40 text-left text-[11px] text-amber-800 dark:text-amber-300 mb-4">
          <AlertTriangle size={15} className="shrink-0 mt-0.5" />
          <span>
            Send only Ethereum, Linea, or EVM-compatible tokens to this address. Sending unsupported tokens may result in permanent loss.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Copy size={14} />
            <span>Copy Address</span>
          </button>
          <button
            onClick={handleCopy}
            className="py-2.5 px-3 rounded-xl border border-stone-200 dark:border-purple-900/40 text-stone-700 dark:text-purple-300 hover:bg-stone-50 dark:hover:bg-purple-900/20 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Share2 size={14} />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
