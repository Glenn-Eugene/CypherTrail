'use client';

import React from 'react';
import { Compass, Smartphone, Monitor, ShieldCheck, ArrowRight, AppWindow } from 'lucide-react';

export default function DownloadSection() {
  const platforms = [
    { name: 'Chrome Extension', icon: <AppWindow size={22} />, users: '30M+ Users', badge: 'Recommended' },
    { name: 'Brave Browser', icon: <Compass size={22} />, users: 'Native Web3', badge: 'Popular' },
    { name: 'iOS Mobile App', icon: <Smartphone size={22} />, users: 'App Store', badge: 'iOS 15+' },
    { name: 'Android APK / Play', icon: <Smartphone size={22} />, users: 'Play Store', badge: 'Android 10+' }
  ];

  return (
    <section id="download" className="py-20 lg:py-28 bg-[#18082D] text-white overflow-hidden relative">
      {/* Decorative radial blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Exact bold geometric heading from MetaMask Mobbin section 2390dd8f-80b8-44c2-a5df-794118143d29 */}
        <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-purple-900/60 text-purple-200 border border-purple-700/50 mb-6 inline-block">
          CROSS-PLATFORM SUITE
        </span>

        <h2 className="font-extrabold tracking-tight text-5xl sm:text-7xl lg:text-8xl text-purple-100 uppercase leading-[0.95] mb-6">
          READY TO BUY <br />
          <span className="bg-gradient-to-r from-orange-400 via-purple-300 to-blue-400 bg-clip-text text-transparent">
            CRYPTO?
          </span>
        </h2>

        <p className="text-base sm:text-xl text-purple-200/80 max-w-2xl mx-auto mb-12">
          Join tens of millions of people exploring Web3. Download CypherTrail for your favorite browser or mobile device today.
        </p>

        {/* Platform Download Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
          {platforms.map((p) => (
            <div
              key={p.name}
              className="p-6 rounded-3xl bg-[#231244] border border-purple-800/50 hover:border-purple-500 hover:scale-[1.02] transition-all text-left group cursor-pointer shadow-xl"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-2xl bg-purple-900/60 text-purple-200 group-hover:text-white transition-colors">
                  {p.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800/40">
                  {p.badge}
                </span>
              </div>
              <h4 className="font-bold text-lg text-white mb-1">{p.name}</h4>
              <p className="text-xs text-purple-300/70 mb-4">{p.users}</p>
              <div className="flex items-center text-xs font-bold text-[#F6851B] group-hover:underline">
                <span>Install now</span>
                <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Security endorsement */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-purple-300">
          <ShieldCheck size={16} className="text-emerald-400" />
          <span>Non-custodial by design • Encrypted key storage • Biometric unlock</span>
        </div>
      </div>
    </section>
  );
}
