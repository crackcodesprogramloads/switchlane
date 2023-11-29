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

const zeroDevProjectId = "c8211653-2f9c-47f3-90a9-b52d86c38b3b";

export default function WalletWrapper({ children }: { children: ReactNode }) {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [polygonMumbai],
    [alchemyProvider({ apiKey: "knLkQi3vCjt9NZKjQHqz_Z8PTpsS35dL" })]
  );

  const connectors = connectorsForWallets([
    {
      groupName: "EOA Wrapped with AA",
      wallets: [
        enhanceWalletWithAAConnector(
          metaMaskWallet({
            chains,
            projectId: "c75647671be1d45589e737462a1ae029",
          }),
          { projectId: zeroDevProjectId }
        ),
        // enhanceWalletWithAAConnector(
        //   rainbowWallet({
        //     chains,
        //     projectId: "c75647671be1d45589e737462a1ae029",
        //   }),
        //   { projectId: zeroDevProjectId }
        // ),
        // enhanceWalletWithAAConnector(
        //   googleWallet({ options: { projectId: zeroDevProjectId } }),
        //   { projectId: zeroDevProjectId }
        // ),
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
