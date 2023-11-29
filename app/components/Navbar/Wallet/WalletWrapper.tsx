"use client";

import {
  WagmiConfig,
  useConnect,
  configureChains,
  createConfig,
  useAccount,
  useEnsName,
  useEnsAvatar,
  useDisconnect,
} from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import {
  RainbowKitProvider,
  connectorsForWallets,
  lightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { metaMaskWallet, rainbowWallet } from "@rainbow-me/rainbowkit/wallets";
import {
  enhanceWalletWithAAConnector,
  googleWallet,
} from "@zerodev/wagmi/rainbowkit";
// Connector
import { enhanceConnectorWithAA } from "@zerodev/wagmi";

import "@rainbow-me/rainbowkit/styles.css";
import { ReactNode } from "react";

const zeroDevProjectId = process.env.ZERODEV_PROJECT_ID || "";
const metamaskProjectId = process.env.METAMASK_WALLET_ID || "";
const alchemyProjectId = process.env.ALCHEMY_API_KEY || "";

export default function WalletWrapper({ children }: { children: ReactNode }) {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [polygonMumbai],
    [alchemyProvider({ apiKey: alchemyProjectId })]
  );

  const connectors = connectorsForWallets([
    {
      groupName: "EOA Wrapped with AA",
      wallets: [
        enhanceWalletWithAAConnector(
          metaMaskWallet({
            chains,
            projectId: metamaskProjectId,
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
