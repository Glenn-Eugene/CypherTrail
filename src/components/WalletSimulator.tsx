'use client';

import React, { useState } from 'react';
import {
  Copy,
  Check,
  MoreVertical,
  Moon,
  Sun,
  ChevronDown,
  ArrowUpRight,
  ArrowDownUp,
  Network as NetIcon,
  QrCode,
  Plus,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  BarChart2,
  DollarSign
} from 'lucide-react';
import { Token, NFTItem, Transaction, Network, PredictionMarket, UserPosition } from '@/types/wallet';
import { SUPPORTED_NETWORKS, PREDICTION_MARKETS } from '@/data/mockData';
import BuySellModal from './Modals/BuySellModal';
import SendModal from './Modals/SendModal';
import SwapModal from './Modals/SwapModal';
import BridgeModal from './Modals/BridgeModal';
import ReceiveModal from './Modals/ReceiveModal';
import ImportTokenModal from './Modals/ImportTokenModal';
import TradePredictionModal from './Modals/TradePredictionModal';

interface WalletSimulatorProps {
  tokens: Token[];
  setTokens: React.Dispatch<React.SetStateAction<Token[]>>;
  nfts: NFTItem[];
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  userPositions: UserPosition[];
  setUserPositions: React.Dispatch<React.SetStateAction<UserPosition[]>>;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function WalletSimulator({
  tokens,
  setTokens,
  nfts,
  transactions,
  setTransactions,
  userPositions,
  setUserPositions,
  isDarkMode,
  toggleDarkMode
}: WalletSimulatorProps) {
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(SUPPORTED_NETWORKS[1]); // Linea
  const [activeTab, setActiveTab] = useState<'tokens' | 'nfts' | 'predict' | 'activity'>('tokens');
  const [copied, setCopied] = useState<boolean>(false);
  const [showNetworkDropdown, setShowNetworkDropdown] = useState<boolean>(false);
  const [showAccountMenu, setShowAccountMenu] = useState<boolean>(false);

  // Prediction sub-tab
  const [predictSubTab, setPredictSubTab] = useState<'markets' | 'positions'>('markets');
  const [selectedPredictMarket, setSelectedPredictMarket] = useState<PredictionMarket | null>(null);

  // Modals state
  const [activeModal, setActiveModal] = useState<
    'buy' | 'send' | 'swap' | 'bridge' | 'receive' | 'import' | 'predict' | null
  >(null);

  const walletAddress = '0x71C839F2f4625f6cD765a03D37Ce961a868449A2';
  const ensName = 'cyphertrail.linea.eth';

  // Live USDC balance
  const usdcToken = tokens.find((t) => t.symbol === 'USDC');
  const userUsdcBalance = usdcToken ? usdcToken.balance : 0;

  // Calculate live portfolio balance including tokens and prediction positions
  const tokensBalanceUsd = tokens.reduce((sum, t) => sum + t.balanceUsd, 0);
  const positionsValueUsd = userPositions.reduce((sum, p) => sum + p.currentValue, 0);
  const totalBalanceUsd = tokensBalanceUsd + positionsValueUsd;

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSuccessBuy = (amountEth: number, fiatSpent: number) => {
    setTokens((prev) =>
      prev.map((t) => {
        if (t.symbol === 'ETH') {
          const newBal = +(t.balance + amountEth).toFixed(4);
          return {
            ...t,
            balance: newBal,
            balanceUsd: +(newBal * t.priceUsd).toFixed(2)
          };
        }
        return t;
      })
    );

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'receive',
      title: 'Bought ETH via On-Ramp',
      description: `Paid $${fiatSpent} via PayPal On-Ramp`,
      timestamp: 'Just now',
      amount: `+${amountEth} ETH`,
      status: 'confirmed',
      txHash: `0x${Math.random().toString(16).slice(2, 10)}...`,
      network: selectedNetwork.id
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleSuccessSend = (tokenSymbol: string, amount: number, recipient: string) => {
    setTokens((prev) =>
      prev.map((t) => {
        if (t.symbol === tokenSymbol) {
          const newBal = +(t.balance - amount).toFixed(4);
          return {
            ...t,
            balance: Math.max(0, newBal),
            balanceUsd: +(Math.max(0, newBal) * t.priceUsd).toFixed(2)
          };
        }
        return t;
      })
    );

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'send',
      title: `Sent ${tokenSymbol}`,
      description: `To ${recipient.slice(0, 8)}...`,
      timestamp: 'Just now',
      amount: `-${amount} ${tokenSymbol}`,
      status: 'confirmed',
      txHash: `0x${Math.random().toString(16).slice(2, 10)}...`,
      network: selectedNetwork.id
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleSuccessSwap = (
    fromSymbol: string,
    fromAmount: number,
    toSymbol: string,
    toAmount: number
  ) => {
    setTokens((prev) =>
      prev.map((t) => {
        if (t.symbol === fromSymbol) {
          const newBal = +(t.balance - fromAmount).toFixed(4);
          return {
            ...t,
            balance: Math.max(0, newBal),
            balanceUsd: +(Math.max(0, newBal) * t.priceUsd).toFixed(2)
          };
        }
        if (t.symbol === toSymbol) {
          const newBal = +(t.balance + toAmount).toFixed(4);
          return {
            ...t,
            balance: newBal,
            balanceUsd: +(newBal * t.priceUsd).toFixed(2)
          };
        }
        return t;
      })
    );

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'swap',
      title: `Swap ${fromSymbol} for ${toSymbol}`,
      description: `Swapped on DEX Aggregator`,
      timestamp: 'Just now',
      amount: `+${toAmount} ${toSymbol}`,
      status: 'confirmed',
      txHash: `0x${Math.random().toString(16).slice(2, 10)}...`,
      network: selectedNetwork.id
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleSuccessBridge = (fromNet: string, toNet: string, amount: string) => {
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'bridge',
      title: `Bridge to ${toNet}`,
      description: `Transferred ${amount} ETH from ${fromNet}`,
      timestamp: 'Just now',
      amount: `${amount} ETH`,
      status: 'confirmed',
      txHash: `0x${Math.random().toString(16).slice(2, 10)}...`,
      network: toNet.toLowerCase()
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleAddToken = (newToken: Token) => {
    setTokens((prev) => [newToken, ...prev]);
  };

  const handleSuccessPredictionTrade = (newPos: UserPosition, cost: number) => {
    // Deduct USDC
    setTokens((prev) =>
      prev.map((t) => {
        if (t.symbol === 'USDC') {
          const newBal = +(t.balance - cost).toFixed(2);
          return {
            ...t,
            balance: Math.max(0, newBal),
            balanceUsd: Math.max(0, newBal)
          };
        }
        return t;
      })
    );

    // Add position
    setUserPositions((prev) => [newPos, ...prev]);

    // Record activity
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'swap',
      title: `Prediction: ${newPos.outcome} Shares`,
      description: `${newPos.question.slice(0, 32)}...`,
      timestamp: 'Just now',
      amount: `-${cost} USDC`,
      status: 'confirmed',
      txHash: `0x${Math.random().toString(16).slice(2, 10)}...`,
      network: 'polygon'
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleCashOut = (posId: string) => {
    const pos = userPositions.find((p) => p.id === posId);
    if (!pos) return;

    // Credit USDC balance with currentValue
    setTokens((prev) =>
      prev.map((t) => {
        if (t.symbol === 'USDC') {
          const newBal = +(t.balance + pos.currentValue).toFixed(2);
          return {
            ...t,
            balance: newBal,
            balanceUsd: newBal
          };
        }
        return t;
      })
    );

    // Remove position
    setUserPositions((prev) => prev.filter((p) => p.id !== posId));

    // Record activity
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'receive',
      title: `Cashed Out: ${pos.outcome} Shares`,
      description: `Realized PnL: +$${pos.pnlUsd.toFixed(2)}`,
      timestamp: 'Just now',
      amount: `+${pos.currentValue.toFixed(2)} USDC`,
      status: 'confirmed',
      txHash: `0x${Math.random().toString(16).slice(2, 10)}...`,
      network: 'polygon'
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  return (
    <div className="relative mx-auto w-full max-w-[400px] rounded-[36px] bg-white dark:bg-[#1D1137] border-4 border-stone-800/10 dark:border-purple-800/40 p-4 shadow-2xl transition-all duration-300 wallet-shadow">
      {/* Top extension bar */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-purple-900/30">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          title="Toggle Theme"
          className="p-2 rounded-full text-stone-500 hover:text-stone-900 dark:text-purple-300 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-purple-900/30 transition-colors"
        >
          {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Account / ENS Pill */}
        <div className="relative">
          <button
            onClick={() => setShowAccountMenu(!showAccountMenu)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 dark:bg-[#120824] border border-stone-200 dark:border-purple-900/40 hover:border-stone-300 dark:hover:border-purple-700 transition-all text-xs font-semibold text-stone-800 dark:text-purple-100"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="truncate max-w-[130px]">{ensName}</span>
            <ChevronDown size={14} className="text-stone-400" />
          </button>

          {/* Account Menu Dropdown */}
          {showAccountMenu && (
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 bg-white dark:bg-[#180E2E] border border-stone-200 dark:border-purple-900/50 rounded-2xl p-3 shadow-xl z-30 animate-fade-in text-left">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100 dark:border-purple-900/30">
                <span className="text-xs font-bold text-stone-900 dark:text-white">Account 1</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                  Active
                </span>
              </div>
              <p className="font-mono text-[11px] text-stone-500 dark:text-purple-300 truncate mb-3">
                {walletAddress}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleCopy();
                    setShowAccountMenu(false);
                  }}
                  className="flex-1 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 dark:bg-[#120824] hover:bg-stone-200 dark:hover:bg-purple-900/40 text-stone-700 dark:text-purple-200 flex items-center justify-center gap-1"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <a
                  href={`${selectedNetwork.explorerUrl}/address/${walletAddress}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-1.5 px-2 text-xs font-semibold rounded-lg bg-stone-100 dark:bg-[#120824] hover:bg-stone-200 dark:hover:bg-purple-900/40 text-stone-700 dark:text-purple-200 flex items-center justify-center gap-1"
                >
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Network & Options */}
        <div className="flex items-center gap-1">
          {/* Network Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowNetworkDropdown(!showNetworkDropdown)}
              className="p-1.5 px-2 rounded-full bg-stone-100 dark:bg-[#120824] border border-stone-200 dark:border-purple-900/40 text-xs font-bold text-stone-800 dark:text-purple-200 flex items-center gap-1 hover:border-blue-500 transition-colors"
              title="Select Network"
            >
              <span>{selectedNetwork.icon}</span>
              <ChevronDown size={12} />
            </button>

            {showNetworkDropdown && (
              <div className="absolute right-0 top-9 w-48 bg-white dark:bg-[#180E2E] border border-stone-200 dark:border-purple-900/50 rounded-2xl p-2 shadow-xl z-30 animate-fade-in">
                <p className="text-[10px] uppercase font-bold text-stone-400 px-2 py-1">
                  Select Network
                </p>
                {SUPPORTED_NETWORKS.map((net) => (
                  <button
                    key={net.id}
                    onClick={() => {
                      setSelectedNetwork(net);
                      setShowNetworkDropdown(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      selectedNetwork.id === net.id
                        ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                        : 'text-stone-700 dark:text-purple-200 hover:bg-stone-100 dark:hover:bg-purple-900/20'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{net.icon}</span>
                      <span>{net.name}</span>
                    </span>
                    {selectedNetwork.id === net.id && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setActiveModal('receive')}
            className="p-2 text-stone-500 hover:text-stone-900 dark:text-purple-300 dark:hover:text-white rounded-full hover:bg-stone-100 dark:hover:bg-purple-900/30 transition-colors"
          >
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {/* Balance Area */}
      <div className="text-center py-6">
        <div className="flex items-center justify-center gap-1.5">
          <h2 className="text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            ${totalBalanceUsd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
        </div>
        <div className="flex items-center justify-center gap-1 mt-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <TrendingUp size={14} />
          <span>+$58.00 (+2.4%) today</span>
        </div>
      </div>

      {/* 5 Core Action Round Pill Buttons (MetaMask signature layout) */}
      <div className="grid grid-cols-5 gap-2 px-1 pb-6">
        {/* Buy & Sell */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => setActiveModal('buy')}
            className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md shadow-blue-600/30 active:scale-95 transition-transform"
            title="Buy & Sell"
          >
            <span className="text-lg font-bold">±</span>
          </button>
          <span className="text-[11px] font-semibold text-stone-700 dark:text-purple-200 mt-1.5 text-center leading-tight">
            Buy & Sell
          </span>
        </div>

        {/* Send */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => setActiveModal('send')}
            className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md shadow-blue-600/30 active:scale-95 transition-transform"
            title="Send"
          >
            <ArrowUpRight size={20} />
          </button>
          <span className="text-[11px] font-semibold text-stone-700 dark:text-purple-200 mt-1.5">
            Send
          </span>
        </div>

        {/* Swap */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => setActiveModal('swap')}
            className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md shadow-blue-600/30 active:scale-95 transition-transform"
            title="Swap"
          >
            <ArrowDownUp size={19} />
          </button>
          <span className="text-[11px] font-semibold text-stone-700 dark:text-purple-200 mt-1.5">
            Swap
          </span>
        </div>

        {/* Bridge */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => setActiveModal('bridge')}
            className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md shadow-blue-600/30 active:scale-95 transition-transform"
            title="Bridge"
          >
            <NetIcon size={19} />
          </button>
          <span className="text-[11px] font-semibold text-stone-700 dark:text-purple-200 mt-1.5">
            Bridge
          </span>
        </div>

        {/* Receive */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => setActiveModal('receive')}
            className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-md shadow-blue-600/30 active:scale-95 transition-transform"
            title="Receive"
          >
            <QrCode size={19} />
          </button>
          <span className="text-[11px] font-semibold text-stone-700 dark:text-purple-200 mt-1.5">
            Receive
          </span>
        </div>
      </div>

      {/* Tabs (Tokens, NFTs, Predict, Activity) */}
      <div className="flex border-b border-stone-200 dark:border-purple-900/40 mb-3">
        {(['tokens', 'nfts', 'predict', 'activity'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 pb-2.5 text-xs font-bold capitalize transition-all relative ${
              activeTab === tab
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-stone-500 dark:text-purple-300 hover:text-stone-800 dark:hover:text-white'
            }`}
          >
            {tab === 'predict' ? (
              <span className="flex items-center justify-center gap-1">
                <span>Predict</span>
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              </span>
            ) : (
              tab
            )}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[230px] max-h-[270px] overflow-y-auto pr-1">
        {/* TOKENS TAB */}
        {activeTab === 'tokens' && (
          <div className="space-y-1.5">
            {tokens.map((token) => (
              <div
                key={token.id}
                onClick={() => setActiveModal('swap')}
                className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-stone-50 dark:hover:bg-purple-950/40 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-stone-100 dark:bg-purple-900/40 flex items-center justify-center text-lg shadow-sm">
                    {token.icon}
                  </span>
                  <div>
                    <h4 className="font-bold text-xs text-stone-900 dark:text-white">
                      {token.name}
                    </h4>
                    <span
                      className={`text-[11px] font-medium ${
                        token.change24h >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'
                      }`}
                    >
                      {token.change24h >= 0 ? '+' : ''}
                      {token.change24h}%
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-xs text-stone-900 dark:text-white">
                    ${token.balanceUsd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-[11px] text-stone-500 dark:text-purple-300">
                    {token.balance} {token.symbol}
                  </p>
                </div>
              </div>
            ))}

            {/* Import Tokens Action */}
            <button
              onClick={() => setActiveModal('import')}
              className="w-full mt-3 py-2 text-center text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center gap-1"
            >
              <Plus size={14} />
              <span>Import Tokens</span>
            </button>
          </div>
        )}

        {/* NFTS TAB */}
        {activeTab === 'nfts' && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {nfts.map((nft) => (
                <div
                  key={nft.id}
                  className="rounded-2xl overflow-hidden border border-stone-200 dark:border-purple-900/40 bg-stone-50 dark:bg-[#120824] p-2 hover:shadow-md transition-shadow"
                >
                  <div className="relative w-full h-24 rounded-xl overflow-hidden mb-2 bg-stone-200">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h5 className="font-bold text-[11px] text-stone-900 dark:text-white truncate">
                    {nft.name}
                  </h5>
                  <p className="text-[10px] text-stone-500 dark:text-purple-300 truncate">
                    {nft.collection}
                  </p>
                  <div className="flex justify-between items-center mt-1 pt-1 border-t border-stone-200/50 dark:border-purple-900/30">
                    <span className="text-[9px] uppercase font-bold text-stone-400">Floor</span>
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
                      {nft.floorPrice}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PREDICT TAB (MetaMask x Polymarket In-Wallet Prediction Market) */}
        {activeTab === 'predict' && (
          <div className="space-y-3">
            {/* Sub-tab toggle */}
            <div className="flex p-1 rounded-xl bg-stone-100 dark:bg-[#120824] border border-stone-200 dark:border-purple-900/40 text-[11px] font-bold">
              <button
                onClick={() => setPredictSubTab('markets')}
                className={`flex-1 py-1 rounded-lg transition-all ${
                  predictSubTab === 'markets'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-stone-600 dark:text-purple-300'
                }`}
              >
                Live Markets
              </button>
              <button
                onClick={() => setPredictSubTab('positions')}
                className={`flex-1 py-1 rounded-lg transition-all ${
                  predictSubTab === 'positions'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-stone-600 dark:text-purple-300'
                }`}
              >
                My Positions ({userPositions.length})
              </button>
            </div>

            {predictSubTab === 'markets' ? (
              <div className="space-y-2">
                {PREDICTION_MARKETS.map((market) => (
                  <div
                    key={market.id}
                    className="p-3 rounded-2xl bg-stone-50 dark:bg-[#120824] border border-stone-200 dark:border-purple-900/40 hover:border-blue-500 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-sm">{market.icon}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-300">
                        {market.category}
                      </span>
                      <span className="text-[10px] text-stone-400 ml-auto">Vol: {market.volume24h}</span>
                    </div>

                    <h5 className="font-bold text-xs text-stone-900 dark:text-white leading-snug mb-2">
                      {market.question}
                    </h5>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedPredictMarket(market);
                          setActiveModal('predict');
                        }}
                        className="flex-1 py-1.5 px-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/40 text-xs font-bold hover:bg-emerald-100 transition-colors flex items-center justify-between"
                      >
                        <span>Yes</span>
                        <span>{(market.yesPrice * 100).toFixed(0)}¢</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedPredictMarket(market);
                          setActiveModal('predict');
                        }}
                        className="flex-1 py-1.5 px-2 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-800/40 text-xs font-bold hover:bg-red-100 transition-colors flex items-center justify-between"
                      >
                        <span>No</span>
                        <span>{(market.noPrice * 100).toFixed(0)}¢</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {userPositions.length === 0 ? (
                  <div className="text-center py-8 text-xs text-stone-400">
                    No active positions yet. Explore Live Markets to take a position.
                  </div>
                ) : (
                  userPositions.map((pos) => (
                    <div
                      key={pos.id}
                      className="p-3 rounded-2xl bg-stone-50 dark:bg-[#120824] border border-stone-200 dark:border-purple-900/40 text-left space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            pos.outcome === 'YES'
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                              : 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300'
                          }`}
                        >
                          {pos.outcome} • {pos.shares} Shares
                        </span>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          +${pos.pnlUsd.toFixed(2)} (+{pos.pnlPercent.toFixed(1)}%)
                        </span>
                      </div>

                      <h5 className="font-bold text-xs text-stone-900 dark:text-white leading-tight">
                        {pos.question}
                      </h5>

                      <div className="flex items-center justify-between pt-1 border-t border-stone-200/50 dark:border-purple-900/30 text-[11px]">
                        <span className="text-stone-500 dark:text-purple-300">
                          Value: <strong className="text-stone-900 dark:text-white">${pos.currentValue.toFixed(2)}</strong>
                        </span>
                        <button
                          onClick={() => handleCashOut(pos.id)}
                          className="px-2.5 py-1 rounded-lg bg-stone-900 dark:bg-purple-600 text-white font-bold text-[10px] hover:bg-black transition-colors"
                        >
                          Cash Out
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* ACTIVITY TAB */}
        {activeTab === 'activity' && (
          <div className="space-y-2">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="p-2.5 rounded-2xl bg-stone-50 dark:bg-[#120824] border border-stone-100 dark:border-purple-900/30 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      tx.type === 'receive'
                        ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                        : tx.type === 'send'
                        ? 'bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                        : 'bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400'
                    }`}
                  >
                    {tx.type === 'receive' ? '↓' : tx.type === 'send' ? '↑' : '⇄'}
                  </span>
                  <div>
                    <h5 className="font-bold text-xs text-stone-900 dark:text-white truncate max-w-[140px]">
                      {tx.title}
                    </h5>
                    <p className="text-[10px] text-stone-500 dark:text-purple-300">
                      {tx.timestamp} • {tx.txHash}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs font-bold ${
                      tx.amount.startsWith('+')
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-stone-900 dark:text-white'
                    }`}
                  >
                    {tx.amount}
                  </span>
                  <div className="flex items-center justify-end gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] text-stone-400 capitalize">Confirmed</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Geometric Mascot Fox Peek at bottom */}
      <div className="mt-4 pt-3 border-t border-stone-100 dark:border-purple-900/30 flex flex-col items-center">
        <div className="relative group cursor-pointer hover:scale-105 active:scale-95 transition-transform">
          <svg className="w-10 h-10 animate-float" viewBox="0 0 100 100" fill="none">
            <polygon points="50,15 25,45 50,65" fill="#E2761B" />
            <polygon points="50,15 75,45 50,65" fill="#E2761B" />
            <polygon points="25,45 10,25 35,38" fill="#CD6116" />
            <polygon points="75,45 90,25 65,38" fill="#CD6116" />
            <polygon points="25,45 50,65 50,85 15,65" fill="#F6851B" />
            <polygon points="75,45 50,65 50,85 85,65" fill="#F6851B" />
            <polygon points="50,65 38,80 50,88" fill="#E4761B" />
            <polygon points="50,65 62,80 50,88" fill="#E4761B" />
            <polygon points="50,88 45,95 55,95" fill="#233447" />
            <circle cx="38" cy="55" r="4" fill="#233447" />
            <circle cx="62" cy="55" r="4" fill="#233447" />
          </svg>
        </div>
        <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400 dark:text-purple-400 mt-1">
          CypherTrail • Self Custody Engine
        </span>
      </div>

      {/* Modals Mounting */}
      <BuySellModal
        isOpen={activeModal === 'buy'}
        onClose={() => setActiveModal(null)}
        onSuccessBuy={handleSuccessBuy}
      />
      <SendModal
        isOpen={activeModal === 'send'}
        onClose={() => setActiveModal(null)}
        tokens={tokens}
        onSuccessSend={handleSuccessSend}
      />
      <SwapModal
        isOpen={activeModal === 'swap'}
        onClose={() => setActiveModal(null)}
        tokens={tokens}
        onSuccessSwap={handleSuccessSwap}
      />
      <BridgeModal
        isOpen={activeModal === 'bridge'}
        onClose={() => setActiveModal(null)}
        onSuccessBridge={handleSuccessBridge}
      />
      <ReceiveModal
        isOpen={activeModal === 'receive'}
        onClose={() => setActiveModal(null)}
        walletAddress={walletAddress}
        ensName={ensName}
      />
      <ImportTokenModal
        isOpen={activeModal === 'import'}
        onClose={() => setActiveModal(null)}
        onAddToken={handleAddToken}
      />
      <TradePredictionModal
        isOpen={activeModal === 'predict'}
        onClose={() => setActiveModal(null)}
        market={selectedPredictMarket}
        onSuccessTrade={handleSuccessPredictionTrade}
        userUsdcBalance={userUsdcBalance}
      />
    </div>
  );
}
