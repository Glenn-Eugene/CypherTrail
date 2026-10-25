'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import WalletSimulator from '@/components/WalletSimulator';
import BuySellSection from '@/components/BuySellSection';
import WaysToBuySection from '@/components/WaysToBuySection';
import MultiChainSection from '@/components/MultiChainSection';
import PredictionMarketSection from '@/components/PredictionMarketSection';
import DeveloperSection from '@/components/DeveloperSection';
import FaqSection from '@/components/FaqSection';
import DownloadSection from '@/components/DownloadSection';
import Footer from '@/components/Footer';
import MobbinReferenceBar from '@/components/MobbinReferenceBar';
import BuySellModal from '@/components/Modals/BuySellModal';
import TradePredictionModal from '@/components/Modals/TradePredictionModal';
import { INITIAL_TOKENS, INITIAL_NFTS, INITIAL_TRANSACTIONS, INITIAL_USER_POSITIONS } from '@/data/mockData';
import { Token, Transaction, UserPosition, PredictionMarket } from '@/types/wallet';

export default function Home() {
  const [tokens, setTokens] = useState<Token[]>(INITIAL_TOKENS);
  const [nfts] = useState(INITIAL_NFTS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [userPositions, setUserPositions] = useState<UserPosition[]>(INITIAL_USER_POSITIONS);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isStandaloneBuyModalOpen, setIsStandaloneBuyModalOpen] = useState<boolean>(false);
  const [tradeModalMarket, setTradeModalMarket] = useState<PredictionMarket | null>(null);

  const usdcToken = tokens.find((t) => t.symbol === 'USDC');
  const userUsdcBalance = usdcToken ? usdcToken.balance : 0;

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const scrollToWallet = () => {
    const el = document.getElementById('portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStandaloneBuySuccess = (amountEth: number, fiatSpent: number) => {
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
      network: 'linea'
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const handleGlobalPredictionTradeSuccess = (newPos: UserPosition, cost: number) => {
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

  return (
    <div className="min-h-screen bg-[#FAF6F0] dark:bg-[#0F081D] text-stone-900 dark:text-white transition-colors duration-300">
      {/* Navigation Header */}
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onOpenWallet={scrollToWallet}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section with Interactive Wallet Demo */}
        <HeroSection onOpenWallet={scrollToWallet}>
          <WalletSimulator
            tokens={tokens}
            setTokens={setTokens}
            nfts={nfts}
            transactions={transactions}
            setTransactions={setTransactions}
            userPositions={userPositions}
            setUserPositions={setUserPositions}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        </HeroSection>

        {/* Prediction Market Showcase Section */}
        <PredictionMarketSection
          onOpenTradeModal={(market) => setTradeModalMarket(market)}
          userUsdcBalance={userUsdcBalance}
        />

        {/* Buy & Sell Section */}
        <BuySellSection onOpenBuyModal={() => setIsStandaloneBuyModalOpen(true)} />

        {/* Ways To Buy (4 Bento Cards + Fees Table) */}
        <WaysToBuySection />

        {/* Multi-Chain Support & Solana Announcement */}
        <MultiChainSection />

        {/* Developer Suite & SDK Case Studies */}
        <DeveloperSection />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Bold Download Call-to-Action */}
        <DownloadSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Mobbin Reference Inspector */}
      <MobbinReferenceBar />

      {/* Global Buy Modal triggered from sections */}
      <BuySellModal
        isOpen={isStandaloneBuyModalOpen}
        onClose={() => setIsStandaloneBuyModalOpen(false)}
        onSuccessBuy={handleStandaloneBuySuccess}
      />

      {/* Global Prediction Trade Modal */}
      <TradePredictionModal
        isOpen={!!tradeModalMarket}
        onClose={() => setTradeModalMarket(null)}
        market={tradeModalMarket}
        onSuccessTrade={handleGlobalPredictionTradeSuccess}
        userUsdcBalance={userUsdcBalance}
      />
    </div>
  );
}
