# 🦊 CypherTrail — Self-Custodial Web3 Platform & Prediction Markets

> **CypherTrail** is a premier self-custodial Web3 wallet, multi-chain gateway, and native decentralized prediction market platform built with **Next.js 16**, **TypeScript**, and **React 19**, designed 1:1 after **MetaMask** design patterns, workflows, and sections curated on **Mobbin**.

[![Next.js 16](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Self Custodial](https://img.shields.io/badge/Web3-Self_Custodial-orange?style=for-the-badge&logo=ethereum)](https://ethereum.org)

---

## 🌟 Key Features & Workflows

### 1. 💼 Interactive Wallet Simulator
- **Account & ENS Header**: Multi-network indicator, ENS identifier (`cyphertrail.linea.eth`), 1-click address copy with visual toast feedback, account details dropdown, and dark/light theme switch.
- **Dynamic Balance Display**: Live portfolio valuation (`$2,432.72`) with 24-hour PnL metrics.
- **Core 5-Action Radial Bar**:
  - **Buy & Sell (±)**: Multi-provider fiat on-ramp drawer with live quote comparisons.
  - **Send (↗)**: Recipient address validation (ENS & hex), 3-tier gas selector (Low, Market, Aggressive).
  - **Swap (⇄)**: Real-time decentralized exchange rate calculator with configurable slippage protection.
  - **Bridge (🌉)**: Cross-chain transfers across Ethereum, Linea, Solana, Polygon, Arbitrum, and Base.
  - **Receive (⊡)**: Live SVG QR code generator with brand fox emblem and network safety safeguards.
- **Multi-Tab Architecture**:
  - `Tokens`: Real-time USD balances, 24h percentage changes, and a custom token importer.
  - `NFTs`: Curated digital collectibles gallery with floor prices and rarity traits.
  - `Predict`: Live prediction market shares with real-time probability pricing and early cash-out.
  - `Activity`: Immutable transaction history with block explorer hashes and status tags.
- **Animated 3D Mascot**: Geometric origami fox head that reacts to cursor interaction.

---

### 2. 📊 Native Web3 Prediction Markets (Polymarket Integration)
- **Direct In-Wallet Trading**: Buy and sell "Yes" or "No" shares representing the probability of real-world outcomes in Crypto, Politics, Macroeconomics, Tech & AI, and Web3.
- **Continuous 24/7 Liquidity**: Orderbook trading allows users to enter or exit positions at any time prior to market settlement.
- **Early Cash-Out**: Realize gains or limit losses with 1-click instant cash-out directly into USDC.
- **Decentralized Settlement**: Winning shares settle automatically to $1.00 USDC via Chainlink & UMA optimistic oracles.
- **Instant Wager Engine Widget**: Quick-trade widget with odds calculator, volume metrics, and presets ($25, $50, $100, $250).

---

### 3. 💳 Fiat On-Ramp & Aggregated Buy/Sell Flow
- **Real-Time Aggregator**: Live quotes comparing top global fiat rails:
  - **PayPal**: 0.00% promo fee, instant delivery.
  - **Transak**: 1.20% fee, ~2 min settlement.
  - **Robinhood Connect**: 1.45% fee, instant settlement.
  - **Stripe Onramp**: Instant settlement with native bank rails.
- **Flexible Amount Selectors**: Quick amount chips ($50, $100, $250, $500, $1,000) and custom amount inputs in USD, EUR, GBP, and CAD.

---

### 4. 🌐 "One Home, Many Chains" Multi-Chain Support
- **Solana & EVM Unification**: Unified seed phrase and management for Ethereum, Linea, Solana, Polygon, Arbitrum One, and Base.
- **Interactive Network Explorer**: Seamless zero-latency network switching without manual RPC configuration.

---

### 5. 🛠️ Developer SDK & Partner Showcase
- **Seamless 3-Line Integration**: Clean TypeScript client SDK snippet demonstrating instant dApp connectivity.
- **Ecosystem Case Studies**: Detailed breakdowns of integrations with Galxe (frictionless auth) and HyperPlay (native Web3 gaming overlay).

---

### 6. ❓ Comprehensive FAQ Knowledge Base
- **Categorized Accordion**: Sticky "Jump to:" sidebar navigation covering:
  - *Getting Started*
  - *Manage Digital Assets*
  - *Payments & Swaps*
  - *Prediction Markets*
  - *Security & Seed Phrases*

---

## 🎨 Mobbin MetaMask Design References

All components, typography, layout structures, and user journeys were built strictly following MetaMask designs indexed on **Mobbin**:

| Component / Section | MetaMask Mobbin Reference | Canonical Mobbin URL |
| :--- | :--- | :--- |
| **Interactive Wallet Extension** | Wallet Extension & In-App Suite | [Mobbin 274437fc](https://mobbin.com/sites/sections/274437fc-75b5-444b-a8a6-1c4f91ebe918) |
| **Hero Display & Headline** | "YOUR HOME IN WEB3" | [Mobbin 70eabcb5](https://mobbin.com/sites/sections/70eabcb5-a5d2-49cc-9d45-5893e5378cac) |
| **In-App Mockup Hero** | Feature Preview Hero | [Mobbin 23098664](https://mobbin.com/sites/sections/23098664-e072-45fa-a177-8e5e1ee0792a) |
| **Fiat On-Ramp Widget** | Buy & Sell Crypto Widget | [Mobbin 6c1a099e](https://mobbin.com/sites/sections/6c1a099e-c7e1-442d-9b7b-c4983b493b4a) |
| **Payment Bento Cards** | Ways to Buy Crypto | [Mobbin dc2ffd81](https://mobbin.com/sites/sections/dc2ffd81-3c80-4b80-a81c-6e2784b0ab62) |
| **Multi-Chain Expansion** | Introducing Solana / Multi-Chain | [Mobbin 04c3b0d2](https://mobbin.com/sites/sections/04c3b0d2-79a7-49ce-9fdb-d45dea38ee69) |
| **Partner SDK Showcase** | Developer Ecosystem Case Studies | [Mobbin 35db54ca](https://mobbin.com/sites/sections/35db54ca-2ca6-4dcf-b42b-b1e0f89a6050) |
| **Frequently Asked Questions** | FAQs Accordion & Sidebar | [Mobbin e0e3236b](https://mobbin.com/sites/sections/e0e3236b-db12-41d4-913e-c94960ab7589) & [30f3080c](https://mobbin.com/sites/sections/30f3080c-0b2d-4185-a2db-edbd67179ebc) |
| **High-Impact CTA** | "READY TO BUY CRYPTO?" | [Mobbin 2390dd8f](https://mobbin.com/sites/sections/2390dd8f-80b8-44c2-a5df-794118143d29) & [1534d728](https://mobbin.com/sites/sections/1534d728-8e44-40ea-b416-2f2d0ad1446d) |
| **Web3 Authority Footer** | Canonical Footer & Legal Rows | [Mobbin e9773030](https://mobbin.com/sites/sections/e9773030-cbc5-433a-8d19-36dcce0fdde3) |

---

## 💻 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org) (Strict typing)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) + Custom CSS Design System
- **Icons**: [Lucide React](https://lucide.dev)
- **State Management**: React 19 Client Hooks (`useState`, `useEffect`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm, yarn, pnpm, or bun

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Glenn-Eugene/CypherTrail.git
cd CypherTrail
npm install
```

### 2. Development Server
Run the Turbopack development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001` if port 3000 is occupied) in your browser.

### 3. Production Build
Verify the production build:
```bash
npm run build
npm run start
```

---

## 🔒 Security & Self-Custody Notice
CypherTrail is built as a non-custodial interface prototype. Private keys and secret recovery phrases are stored exclusively in local encrypted browser state and are never transmitted to external servers.

---

## 📄 License
This project is open-source under the MIT License.
MetaMask design patterns and references are curated from [Mobbin](https://mobbin.com).
