'use client';

import React, { useState } from 'react';
import { Terminal, Copy, Check, ExternalLink, Code2, Cpu } from 'lucide-react';

export default function DeveloperSection() {
  const [copiedCode, setCopiedCode] = useState(false);

  const sdkCode = `// Connect to CypherTrail in 3 lines of TypeScript
import { createCypherTrailClient } from '@cyphertrail/sdk';

const client = createCypherTrailClient({
  dappName: 'My Decentralized App',
  supportedChains: [1, 59144, 101] // Ethereum, Linea, Solana
});

const { address, provider } = await client.connect();
console.log('Connected to CypherTrail:', address);`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sdkCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="developer" className="py-20 lg:py-28 bg-[#140C24] text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header from MetaMask Mobbin section 35db54ca-2ca6-4dcf-b42b-b1e0f89a6050 */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-14">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#F6851B]">
              CYPHERTRAIL DEVELOPER SUITE
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mt-2 text-white">
              Read how partners deliver a seamless UX via our SDK
            </h2>
          </div>
          <a
            href="#docs"
            className="mt-4 sm:mt-0 text-xs font-bold uppercase tracking-wider text-purple-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>All case studies</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Case Studies Grid (Exact replica of Mobbin cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Card 1: Galxe */}
          <div className="rounded-3xl overflow-hidden bg-[#1D1137] border border-purple-900/50 p-6 sm:p-8 hover:border-purple-600/50 transition-all group">
            <div className="h-44 rounded-2xl bg-gradient-to-tr from-sky-500/20 to-purple-600/20 border border-sky-500/30 p-6 flex flex-col justify-between mb-6 group-hover:scale-[1.02] transition-transform">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-stone-900/80 text-white w-max">
                CASE STUDY
              </span>
              <div>
                <p className="text-xs font-mono text-purple-200">Galxe Ecosystem</p>
                <h4 className="text-xl font-extrabold text-white">Galxe x CypherTrail SDK</h4>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Creating a Frictionless Web3 Experience for 10M+ Users
            </h3>
            <p className="text-sm text-purple-200/70 mb-4 leading-relaxed">
              How Galxe accelerated user onboarding by 42% through CypherTrail embedded authorization and native mobile deep-linking.
            </p>
            <span className="text-xs font-bold text-[#F6851B] flex items-center gap-1 group-hover:underline">
              Read blog →
            </span>
          </div>

          {/* Card 2: HyperPlay */}
          <div className="rounded-3xl overflow-hidden bg-[#1D1137] border border-purple-900/50 p-6 sm:p-8 hover:border-purple-600/50 transition-all group">
            <div className="h-44 rounded-2xl bg-gradient-to-tr from-pink-500/20 to-indigo-600/20 border border-pink-500/30 p-6 flex flex-col justify-between mb-6 group-hover:scale-[1.02] transition-transform">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-stone-900/80 text-white w-max">
                CASE STUDY
              </span>
              <div>
                <p className="text-xs font-mono text-purple-200">HyperPlay Game Suite</p>
                <h4 className="text-xl font-extrabold text-white">HyperPlay x CypherTrail</h4>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Building a Web3 Game Store with CypherTrail Developer Suite
            </h3>
            <p className="text-sm text-purple-200/70 mb-4 leading-relaxed">
              HyperPlay brings native in-game overlays and secure zero-friction transactions across Unreal and Unity games.
            </p>
            <span className="text-xs font-bold text-[#F6851B] flex items-center gap-1 group-hover:underline">
              Read blog →
            </span>
          </div>
        </div>

        {/* Code Snippet */}
        <div className="rounded-3xl bg-[#0B0515] border border-purple-900/50 p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-purple-900/40 mb-4">
            <div className="flex items-center gap-2">
              <Code2 size={18} className="text-[#F6851B]" />
              <span className="font-mono text-xs text-purple-200">quickstart.ts</span>
            </div>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-900/40 hover:bg-purple-900/60 text-xs text-purple-200 font-mono transition-colors"
            >
              {copiedCode ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>
          <pre className="font-mono text-xs sm:text-sm text-purple-100 overflow-x-auto leading-relaxed">
            {sdkCode}
          </pre>
        </div>
      </div>
    </section>
  );
}
