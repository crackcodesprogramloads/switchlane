"use client";

import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { useAlchemyProvider } from "./useAlchemyProvider";
import { useSigner } from "./useSigner";
import { useAccount } from "wagmi";
import { watchNetwork } from "wagmi/actions";
import { createContext } from "react";
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import type { Chain } from "viem";
import { Alchemy } from "alchemy-sdk";

export const AAWalletProviderContext = createContext<{
  provider: null | (AlchemyProvider & Alchemy);
  smartWalletAddress: string;
}>({
  provider: null,
  smartWalletAddress: "",
});

type Props = {
  children: ReactNode;
};

const AAWalletContext = (props: Props) => {
  const { signer } = useSigner(); // EOA signer
  const { isConnected } = useAccount(); // EOA account

  const [currentChain, setCurrentChain] = useState<Chain>(); // EOA chain state
  const [smartWalletAddress, setSmartWalletAddress] = useState("");

  // Watching current EOA chain
  const unwatchChain = watchNetwork(({ chain, chains }) => {
    const isSupportedChain = chains.some((c) => {
      return c.id === chain?.id;
    });
    if (!isSupportedChain) {
      return;
    }
    disconnectProviderFromAccount(); // Disconnect to force reconnect with new chain
    setCurrentChain(chain);
  });

  const {
    provider: AAWalletProvider,
    connectProviderToAccount,
    disconnectProviderFromAccount,
  } = useAlchemyProvider({ chain: currentChain });

  const connectToAAWallet = useCallback(async () => {
    if (signer && AAWalletProvider) {
      connectProviderToAccount(signer);
      try {
        const smartWalletAddress = await AAWalletProvider.getAddress();
        setSmartWalletAddress(smartWalletAddress);
      } catch (error: any) {
        console.error(error.message);
      }
    }
  }, [signer, connectProviderToAccount, AAWalletProvider]);

  useEffect(() => {
    if (isConnected && currentChain && AAWalletProvider && signer) {
      connectToAAWallet();
    }

    return () => unwatchChain();
  }, [
    isConnected,
    currentChain,
    connectToAAWallet,
    unwatchChain,
    AAWalletProvider,
    signer,
  ]);

  return (
    <AAWalletProviderContext.Provider
      value={{ provider: AAWalletProvider, smartWalletAddress }}
    >
      {props.children}
    </AAWalletProviderContext.Provider>
  );
};

export default AAWalletContext;
