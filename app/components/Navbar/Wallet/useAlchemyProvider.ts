import { useCallback, useEffect, useState } from "react";

import { AlchemyProvider, SupportedChains } from "@alchemy/aa-alchemy";

import {
  LightSmartContractAccount,
  getDefaultLightAccountFactoryAddress,
} from "@alchemy/aa-accounts";
import {
  SmartAccountSigner,
  getDefaultEntryPointAddress,
} from "@alchemy/aa-core";

import { Alchemy } from "alchemy-sdk";

import { Address } from "viem";
import type { Chain } from "viem";
import { chainConfig } from "@/app/services/AlchemyAA/chainConfig";
import { sepolia } from "viem/chains";

export const useAlchemyProvider = ({ chain }: { chain: Chain | undefined }) => {
  const [provider, setProvider] = useState<(AlchemyProvider & Alchemy) | null>(
    null
  );

  const disconnectProviderFromAccount = useCallback(() => {
    if (!provider) return null;
    const disconnectedProvider = provider.disconnect();

    setProvider(null);
    return disconnectedProvider;
  }, [provider]);

  useEffect(() => {
    if (chain) {
      const provider = new AlchemyProvider({
        chain,
        rpcUrl: chainConfig[chain.id].rpcUrl,
      }).withAlchemyEnhancedApis(
        new Alchemy({
          network: chainConfig[chain.id].network,
          apiKey: chainConfig[chain.id].apiKey,
        })
      );

      setProvider(provider);
    }
  }, [chain]);

  // eth mainnet
  const arb = SupportedChains.get(421614);
  const sep = SupportedChains.get(11155111);

  // console.log({ arb, sep });

  // create a new AA wallet address if it doesn't exist, retrieve the aa wallet address if it exists
  const connectProviderToAccount = useCallback(
    (signer: SmartAccountSigner, account?: Address) => {
      if (!provider || !chain) return null;

      const connectedProvider = provider
        .connect((provider) => {
          return new LightSmartContractAccount({
            rpcClient: provider,
            owner: signer,
            chain,
            entryPointAddress: getDefaultEntryPointAddress(chain),
            factoryAddress: getDefaultLightAccountFactoryAddress(chain),
            accountAddress: account,
          });
        })
        .withAlchemyGasManager({
          policyId: chainConfig[chain.id].gasManagerPolicyId,
        })
        .withAlchemyEnhancedApis(
          new Alchemy({
            network: chainConfig[chain.id].network,
            apiKey: chainConfig[chain.id].apiKey,
          })
        );

      setProvider(connectedProvider);
      return connectedProvider;
    },
    [provider, chain]
  );

  return { provider, connectProviderToAccount, disconnectProviderFromAccount };
};
