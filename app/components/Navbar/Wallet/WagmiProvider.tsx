"use client";

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import {
  RainbowKitProvider,
  connectorsForWallets,
  lightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";

import "@rainbow-me/rainbowkit/styles.css";
import { ReactNode } from "react";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { chainConfig } from "@/app/services/AlchemyAA/chainConfig";

export default function WagmiProvider({ children }: { children: ReactNode }) {
  const chainsArray = Object.keys(chainConfig).map(
    (id) => chainConfig[Number(id)].chain
  );

  const { chains, publicClient } = configureChains(chainsArray, [
    jsonRpcProvider({
      rpc: (c) => {
        const http = chainConfig[c.id]?.rpcUrl;

        if (!http) {
          throw new Error(`Chain ${c.id} not configured`);
        }

        return {
          http,
          webSocket: http.replace("https", "wss"),
        };
      },
    }),
  ]);

  const connectors = connectorsForWallets([
    {
      groupName: "Switchlane",
      wallets: [
        metaMaskWallet({
          chains,
          projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || "",
        }),
      ],
    },
  ]);

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={{
          lightMode: lightTheme(),
          darkMode: darkTheme(),
        }}
        chains={chains}
        modalSize="compact"
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
