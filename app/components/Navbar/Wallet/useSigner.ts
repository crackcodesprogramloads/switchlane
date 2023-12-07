import { WalletClientSigner } from "@alchemy/aa-core";

import { WalletClient, createWalletClient, custom } from "viem";

export const useSigner = () => {
  if (typeof window === "undefined" || !window.ethereum) {
    return { signer: null };
  }

  const client: WalletClient = createWalletClient({
    transport: custom(window.ethereum),
  });

  const eoaSigner = new WalletClientSigner(
    client,
    "json-rpc" //signerType
  );

  return { signer: eoaSigner };
};
