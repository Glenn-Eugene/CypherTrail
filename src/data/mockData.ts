import { Token, NFTItem, Transaction, Network, ProviderQuote, PredictionMarket, UserPosition } from '../types/wallet';

export const SUPPORTED_NETWORKS: Network[] = [
  {
    id: 'ethereum',
    name: 'Ethereum Mainnet',
    symbol: 'ETH',
    chainId: 1,
    icon: '⟠',
    color: '#627EEA',
    explorerUrl: 'https://etherscan.io'
  },
  {
    id: 'linea',
    name: 'Linea',
    symbol: 'ETH',
    chainId: 59144,
    icon: '⚡',
    color: '#121212',
    explorerUrl: 'https://lineascan.build'
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    chainId: 101,
    icon: '◎',
    color: '#14F195',
    explorerUrl: 'https://solscan.io'
  },
  {
    id: 'polygon',
    name: 'Polygon',
    symbol: 'POL',
    chainId: 137,
    icon: '⬡',
    color: '#8247E5',
    explorerUrl: 'https://polygonscan.com'
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum One',
    symbol: 'ETH',
    chainId: 42161,
    icon: '🔵',
    color: '#28A0F0',
    explorerUrl: 'https://arbiscan.io'
  },
  {
    id: 'base',
    name: 'Base',
    symbol: 'ETH',
    chainId: 8453,
    icon: '🔷',
    color: '#0052FF',
    explorerUrl: 'https://basescan.org'
  }
];

export const INITIAL_TOKENS: Token[] = [
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    balance: 0.58,
    balanceUsd: 2088.74,
    priceUsd: 3601.27,
    change24h: 2.84,
    icon: '⟠',
    network: 'linea'
  },
  {
    id: 'usdc',
    name: 'USD Coin',
    symbol: 'USDC',
    balance: 138.49,
    balanceUsd: 138.49,
    priceUsd: 1.00,
    change24h: 0.01,
    icon: '💲',
    network: 'linea'
  },
  {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    balance: 1.82,
    balanceUsd: 205.49,
    priceUsd: 112.90,
    change24h: 5.12,
    icon: '◎',
    network: 'solana'
  },
  {
    id: 'cypher',
    name: 'CypherTrail Native',
    symbol: 'CYPHER',
    balance: 5000,
    balanceUsd: 450.00,
    priceUsd: 0.09,
    change24h: 14.20,
    icon: '🦊',
    network: 'linea'
  }
];

export const INITIAL_NFTS: NFTItem[] = [
  {
    id: 'nft-1',
    name: 'CypherTrail Genesis Fox #042',
    collection: 'CypherTrail Citizens',
    tokenId: '#042',
    floorPrice: '0.85 ETH',
    image: 'https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    network: 'ethereum'
  },
  {
    id: 'nft-2',
    name: 'Linea Voyage Sentinel',
    collection: 'Linea Early Explorers',
    tokenId: '#1337',
    floorPrice: '0.42 ETH',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    network: 'linea'
  },
  {
    id: 'nft-3',
    name: 'cyphertrail.eth',
    collection: 'ENS: Ethereum Name Service',
    tokenId: 'cyphertrail.eth',
    floorPrice: '1.20 ETH',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    network: 'ethereum'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    type: 'swap',
    title: 'Swap ETH to USDC',
    description: 'Swapped 0.04 ETH for 138.49 USDC',
    timestamp: '10 mins ago',
    amount: '+138.49 USDC',
    status: 'confirmed',
    txHash: '0x9a8f...4e12',
    network: 'linea'
  },
  {
    id: 'tx-2',
    type: 'receive',
    title: 'Received ETH',
    description: 'From 0x48a...90bd',
    timestamp: '2 hours ago',
    amount: '+0.50 ETH',
    status: 'confirmed',
    txHash: '0x32cf...81aa',
    network: 'ethereum'
  },
  {
    id: 'tx-3',
    type: 'bridge',
    title: 'Bridge to Linea',
    description: 'Transferred ETH across canonical bridge',
    timestamp: 'Yesterday',
    amount: '0.25 ETH',
    status: 'confirmed',
    txHash: '0x17ba...bb32',
    network: 'linea'
  },
  {
    id: 'tx-4',
    type: 'send',
    title: 'Sent USDC',
    description: 'To 0x33e...0981',
    timestamp: '3 days ago',
    amount: '-50.00 USDC',
    status: 'confirmed',
    txHash: '0x71ed...cc29',
    network: 'linea'
  }
];

export const PROVIDER_QUOTES: ProviderQuote[] = [
  {
    id: 'paypal',
    name: 'PayPal',
    logo: '🅿️',
    cryptoAmount: '0.099 ETH',
    fiatAmount: '$250.00',
    rate: '1 ETH = $2,525.25',
    fee: '$0.00 (Zero Fee promo)',
    eta: 'Instant',
    isBestRate: true
  },
  {
    id: 'transak',
    name: 'Transak',
    logo: '⚡',
    cryptoAmount: '0.0988 ETH',
    fiatAmount: '$250.00',
    rate: '1 ETH = $2,530.36',
    fee: '$2.99',
    eta: '~2 mins'
  },
  {
    id: 'stripe',
    name: 'Stripe Onramp',
    logo: '💳',
    cryptoAmount: '0.0985 ETH',
    fiatAmount: '$250.00',
    rate: '1 ETH = $2,538.07',
    fee: '$3.50',
    eta: 'Instant'
  },
  {
    id: 'moonpay',
    name: 'MoonPay',
    logo: '🌙',
    cryptoAmount: '0.0982 ETH',
    fiatAmount: '$250.00',
    rate: '1 ETH = $2,545.82',
    fee: '$3.99',
    eta: '~5 mins'
  }
];

export const METAMASK_MOBBIN_REFERENCES = [
  {
    title: 'Wallet Extension & In-App Suite',
    description: 'Account balance ($2,227.23 - $2,432.72), pill actions (Buy, Send, Swap, Bridge, Receive), tabbed Tokens/NFTs/Activity, Linea ENS header.',
    mobbinUrl: 'https://mobbin.com/sites/sections/274437fc-75b5-444b-a8a6-1c4f91ebe918',
    screenId: '274437fc-75b5-444b-a8a6-1c4f91ebe918'
  },
  {
    title: 'Hero: "YOUR HOME IN WEB3"',
    description: 'Bold geometric display typography, orange/purple brand motif, notification banner pill, and desktop download CTA.',
    mobbinUrl: 'https://mobbin.com/sites/sections/70eabcb5-a5d2-49cc-9d45-5893e5378cac',
    screenId: '70eabcb5-a5d2-49cc-9d45-5893e5378cac'
  },
  {
    title: 'Hero: "READY TO BUY CRYPTO?"',
    description: 'Deep purple background, high-contrast headline, and fast on-ramp CTA.',
    mobbinUrl: 'https://mobbin.com/sites/sections/2390dd8f-80b8-44c2-a5df-794118143d29',
    screenId: '2390dd8f-80b8-44c2-a5df-794118143d29'
  },
  {
    title: 'Buy & Sell Crypto Widget',
    description: 'Fiat on-ramp aggregator comparing real-time quotes (PayPal, Transak, Robinhood) with presets ($50, $100, $250, $500, $1k).',
    mobbinUrl: 'https://mobbin.com/sites/sections/6c1a099e-c7e1-442d-9b7b-c4983b493b4a',
    screenId: '6c1a099e-c7e1-442d-9b7b-c4983b493b4a'
  },
  {
    title: 'Ways to Buy Crypto Cards',
    description: '4-bento grid covering Cards, Bank Transfers, Mobile payments, and Local exchanges with Payment methods vs Fees tabs.',
    mobbinUrl: 'https://mobbin.com/sites/sections/dc2ffd81-3c80-4b80-a81c-6e2784b0ab62',
    screenId: 'dc2ffd81-3c80-4b80-a81c-6e2784b0ab62'
  },
  {
    title: 'Introducing Solana / Multi-Chain',
    description: '"One home, many chains" multi-chain support including Solana, Linea, Ethereum, Base, and Polygon.',
    mobbinUrl: 'https://mobbin.com/sites/sections/04c3b0d2-79a7-49ce-9fdb-d45dea38ee69',
    screenId: '04c3b0d2-79a7-49ce-9fdb-d45dea38ee69'
  },
  {
    title: 'Developer SDK & Ecosystem Case Studies',
    description: 'Partner integrations (Galxe, HyperPlay) showcasing frictionless Web3 SDK onboarding.',
    mobbinUrl: 'https://mobbin.com/sites/sections/35db54ca-2ca6-4dcf-b42b-b1e0f89a6050',
    screenId: '35db54ca-2ca6-4dcf-b42b-b1e0f89a6050'
  },
  {
    title: 'Frequently Asked Questions (Light & Dark)',
    description: 'Structured accordion covering Getting started, Managing digital assets, Payments, Swaps, and Security.',
    mobbinUrl: 'https://mobbin.com/sites/sections/e0e3236b-db12-41d4-913e-c94960ab7589',
    screenId: 'e0e3236b-db12-41d4-913e-c94960ab7589'
  },
  {
    title: 'MetaMask Canonical Footer',
    description: 'Comprehensive navigation columns for Product, Developer, About, language selector, and ConsenSys attribution.',
    mobbinUrl: 'https://mobbin.com/sites/sections/e9773030-cbc5-433a-8d19-36dcce0fdde3',
    screenId: 'e9773030-cbc5-433a-8d19-36dcce0fdde3'
  }
];

export const FAQ_DATA = [
  {
    category: 'Getting started',
    questions: [
      {
        q: 'What is CypherTrail wallet?',
        a: 'CypherTrail is a self-custodial crypto wallet and Web3 gateway that gives users secure access to blockchain applications, digital identities, tokens, and collectibles. Unlike centralized platforms, only you hold the keys to your assets.'
      },
      {
        q: 'How do I install CypherTrail?',
        a: 'CypherTrail is available as a browser extension for Google Chrome, Brave, Firefox, and Microsoft Edge, as well as native mobile apps for iOS and Android. You can install it with one click directly from our download center.'
      },
      {
        q: 'Do I need cryptocurrency to start using CypherTrail?',
        a: 'No! You can download, configure, create new accounts, and explore decentralized apps without holding any funds. When you are ready to make transactions, you can easily purchase crypto directly with your card or bank account.'
      }
    ]
  },
  {
    category: 'Manage my digital assets',
    questions: [
      {
        q: 'How do I find my CypherTrail wallet address?',
        a: 'Your public address is displayed prominently at the top of your wallet screen (e.g. cyphertrail.linea.eth or 0x71C...49A2). Simply click or tap the address to copy it to your clipboard.'
      },
      {
        q: 'How do I add or import custom tokens?',
        a: 'Navigate to the Tokens tab, scroll to the bottom, and click "Import Tokens". You can either search by token symbol or paste the custom contract address.'
      },
      {
        q: 'Can I manage multiple accounts and hardware wallets?',
        a: 'Yes. CypherTrail supports unlimited sub-accounts, Ledger and Trezor hardware wallet connections, and importing existing recovery phrases.'
      }
    ]
  },
  {
    category: 'Payments & Swaps',
    questions: [
      {
        q: 'How do I buy crypto inside CypherTrail?',
        a: 'Click the "Buy & Sell" button in your wallet or visit the on-ramp section. Choose your fiat payment method (Credit/Debit Card, Bank Transfer, Apple Pay, PayPal), compare real-time provider rates, and complete the instant purchase.'
      },
      {
        q: 'How does the Swaps engine find the best price?',
        a: 'CypherTrail Swaps aggregates liquidity across leading decentralized exchange protocols (Uniswap, 1inch, Curve, Sushiswap) to find the lowest gas fees and best slippage protection.'
      },
      {
        q: 'How do I bridge assets across different chains?',
        a: 'Use the "Bridge" button to transfer tokens seamlessly between Ethereum, Linea, Polygon, Solana, Arbitrum, and Base with built-in route optimization.'
      }
    ]
  },
  {
    category: 'Security',
    questions: [
      {
        q: 'Where is my private key or secret recovery phrase stored?',
        a: 'Your secret recovery phrase and private keys are encrypted locally on your device with high-grade AES-256 encryption. They are never sent to our servers or stored in the cloud.'
      },
      {
        q: 'How do I backup and secure my wallet?',
        a: 'Write down your 12 or 24-word Secret Recovery Phrase on physical paper and store it in multiple secure offline locations. Never share your seed phrase or private key with anyone, including CypherTrail support.'
      }
    ]
  },
  {
    category: 'Prediction Markets',
    questions: [
      {
        q: 'How do Prediction Markets work inside CypherTrail?',
        a: 'CypherTrail integrates decentralized prediction market orderbooks (powered by Polymarket liquidity) directly into your wallet. You can buy "Yes" or "No" shares representing the probability of real-world events. When the event resolves, each winning share settles at exactly $1.00 USDC.'
      },
      {
        q: 'How do I fund my prediction trades?',
        a: 'You can trade directly using your existing wallet balance in USDC or ETH with 1-tap gasless execution on Polygon and Linea.'
      },
      {
        q: 'Can I cash out early before an event resolves?',
        a: 'Yes! The prediction orderbooks have continuous 24/7 liquidity. You can sell your Yes or No shares at any moment before event closure to lock in profits or minimize loss.'
      }
    ]
  }
];

export const PREDICTION_MARKETS: PredictionMarket[] = [
  {
    id: 'pm-1',
    question: 'Ethereum above $4,500 by End of Q4?',
    category: 'Crypto',
    yesPrice: 0.68,
    noPrice: 0.32,
    yesPercent: 68,
    noPercent: 32,
    volume24h: '$12.4M',
    totalLiquidity: '$45.8M',
    endDate: 'Dec 31, 2026',
    oracle: 'Chainlink + UMA Oracle',
    icon: '⟠'
  },
  {
    id: 'pm-2',
    question: 'Solana achieves 100k TPS on Firedancer Mainnet?',
    category: 'Crypto',
    yesPrice: 0.74,
    noPrice: 0.26,
    yesPercent: 74,
    noPercent: 26,
    volume24h: '$6.8M',
    totalLiquidity: '$18.2M',
    endDate: 'Nov 30, 2026',
    oracle: 'Pyth Network',
    icon: '◎'
  },
  {
    id: 'pm-3',
    question: 'US Fed cuts interest rates by 25bps at next FOMC?',
    category: 'Macro',
    yesPrice: 0.82,
    noPrice: 0.18,
    yesPercent: 82,
    noPercent: 18,
    volume24h: '$28.1M',
    totalLiquidity: '$84.5M',
    endDate: 'Next FOMC Meeting',
    oracle: 'Federal Reserve Official Release',
    icon: '🏛️'
  },
  {
    id: 'pm-4',
    question: 'OpenAI announces GPT-5 release date in 2026?',
    category: 'Tech & AI',
    yesPrice: 0.59,
    noPrice: 0.41,
    yesPercent: 59,
    noPercent: 41,
    volume24h: '$15.3M',
    totalLiquidity: '$32.9M',
    endDate: 'Dec 31, 2026',
    oracle: 'UMA Optimistic Oracle',
    icon: '🤖'
  },
  {
    id: 'pm-5',
    question: 'US Congress passes comprehensive Web3 Market Structure bill?',
    category: 'Politics',
    yesPrice: 0.63,
    noPrice: 0.37,
    yesPercent: 63,
    noPercent: 37,
    volume24h: '$8.9M',
    totalLiquidity: '$21.4M',
    endDate: 'Dec 15, 2026',
    oracle: 'Congressional Record / UMA',
    icon: '⚖️'
  }
];

export const INITIAL_USER_POSITIONS: UserPosition[] = [
  {
    id: 'pos-1',
    marketId: 'pm-1',
    question: 'Ethereum above $4,500 by End of Q4?',
    outcome: 'YES',
    shares: 150,
    avgBuyPrice: 0.52,
    currentPrice: 0.68,
    totalCost: 78.00,
    currentValue: 102.00,
    pnlUsd: 24.00,
    pnlPercent: 30.77
  },
  {
    id: 'pos-2',
    marketId: 'pm-3',
    question: 'US Fed cuts interest rates by 25bps at next FOMC?',
    outcome: 'YES',
    shares: 200,
    avgBuyPrice: 0.65,
    currentPrice: 0.82,
    totalCost: 130.00,
    currentValue: 164.00,
    pnlUsd: 34.00,
    pnlPercent: 26.15
  }
];

