import { useCallback, useEffect, useState } from "react";

import { AlchemyProvider } from "@alchemy/aa-alchemy";
import {
  LightSmartContractAccount,
  getDefaultLightAccountFactoryAddress,
} from "@alchemy/aa-accounts";
import {
  SmartAccountSigner,
  getDefaultEntryPointAddress,
} from "@alchemy/aa-core";

import { Address } from "viem";
import type { Chain } from "viem";
import { chainConfig } from "@/app/services/AlchemyAA/chainConfig";

export const useAlchemyProvider = ({ chain }: { chain: Chain | undefined }) => {
  const [provider, setProvider] = useState<AlchemyProvider | null>(null);

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
      });

      setProvider(provider);
    }
  }, [chain]);

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
        });


      setProvider(connectedProvider);
      return connectedProvider;
    },
    [provider, chain]
  );

  return { provider, connectProviderToAccount, disconnectProviderFromAccount };
};
