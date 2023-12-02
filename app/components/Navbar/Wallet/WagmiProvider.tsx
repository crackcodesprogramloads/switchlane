"use client";

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { polygonMumbai, sepolia } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import {
  RainbowKitProvider,
  connectorsForWallets,
  lightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";

import "@rainbow-me/rainbowkit/styles.css";
import { ReactNode, useEffect, useRef, useState } from "react";

import { enhanceWalletWithAAConnector } from "@zerodev/wagmi/rainbowkit";

const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || "";
const alchemyProjectId = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "";

const zeroDevMumbaiProjectId =
  process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID_MUMBAI || "";
const zeroSepoliaDevProjectId =
  process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID_SEPOLIA || "";

const CHAIN_OPTIONS = [
  { chain: polygonMumbai, projectId: zeroDevMumbaiProjectId },
  { chain: sepolia, projectId: zeroSepoliaDevProjectId },
];

export default function WagmiProvider({ children }: { children: ReactNode }) {
  const [selectedChain, setSelectedChain] = useState(zeroDevMumbaiProjectId);
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    CHAIN_OPTIONS.map((c) => c.chain),
    [alchemyProvider({ apiKey: alchemyProjectId })]
  );

  const connectors = connectorsForWallets([
    {
      groupName: "Switchlane Smart Wallet",
      wallets: [
        enhanceWalletWithAAConnector(
          metaMaskWallet({
            chains,
            projectId: walletConnectProjectId,
          }),
          {
            projectId: selectedChain,
            projectIds: CHAIN_OPTIONS.map((c) => c.projectId),
          }
        ),
      ],
    },
  ]);

  const config = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
  });

  async function chainChangeListener(chainId: string) {
    const chainIdNumber = parseInt(chainId, 16);

    const matchedChain = CHAIN_OPTIONS.find(
      (c) => c.chain.id === chainIdNumber
    );

    if (matchedChain) {
      setSelectedChain(matchedChain.projectId);
    } else {
    }
  }

  useEffect(() => {
    if (window?.ethereum) {
      window.ethereum.on("chainChanged", chainChangeListener);
    }
    return () => {
      if (window?.ethereum) {
        window.ethereum.removeListener("chainChanged", chainChangeListener);
      }
    };
  }, []);

  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider
        theme={{
          lightMode: lightTheme(),
          darkMode: darkTheme(),
        }}
        chains={chains}
        modalSize={"compact"}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
