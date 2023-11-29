"use client";

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import {
  RainbowKitProvider,
  connectorsForWallets,
  lightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { enhanceWalletWithAAConnector } from "@zerodev/wagmi/rainbowkit";
// Connector

import "@rainbow-me/rainbowkit/styles.css";
import { ReactNode } from "react";

const zeroDevProjectId = process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID || "";
const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || "";
const alchemyProjectId = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "";

export default function WagmiProvider({ children }: { children: ReactNode }) {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [polygonMumbai],
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
          { projectId: zeroDevProjectId }
        ),
      ],
    },
  ]);

  const config = createConfig({
    autoConnect: false,
    connectors,
    publicClient,
    webSocketPublicClient,
  });

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
