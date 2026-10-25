import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CypherTrail | Your Home in Web3 | Leading Self-Custodial Wallet",
  description: "CypherTrail is the world-renowned self-custodial Web3 wallet. Securely buy, store, swap, and explore digital assets across Ethereum, Linea, Solana, and multi-chain ecosystems.",
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,15 25,45 50,65" fill="%23E2761B"/><polygon points="50,15 75,45 50,65" fill="%23E2761B"/><polygon points="25,45 50,65 50,85 15,65" fill="%23F6851B"/><polygon points="75,45 50,65 50,85 85,65" fill="%23F6851B"/><circle cx="38" cy="55" r="4" fill="%23140C24"/><circle cx="62" cy="55" r="4" fill="%23140C24"/></svg>',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
