import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import WagmiProvider from "./components/Navbar/Wallet/WagmiProvider";
import AAWalletProvider from "./components/Navbar/Wallet/AAWalletProvider";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Switchlane",
  description: "Pay gas with any ERC20 token",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-950 text-zinc-200`}>
        {/* EOA Provider, Wagmi and RainbowKit */}
        <WagmiProvider>
          {/* Smart Wallet Provider using Alchemy AA */}
          <AAWalletProvider>
            <Navbar />
            {children}
          </AAWalletProvider>
        </WagmiProvider>
        <Footer />
      </body>
    </html>
  );
}
