import { useCallback, useContext, useEffect, useState } from "react";
import { AAWalletProviderContext } from "../components/Navbar/Wallet/AAWalletProvider";
import { TokenBalance } from "alchemy-sdk";

export default function useTokenBalances({ enabled }: { enabled?: boolean }) {
  const { provider, smartWalletAddress } = useContext(AAWalletProviderContext);
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const getSmartWalletTokenBalances = useCallback(async () => {
    if (smartWalletAddress && provider) {
      try {
        setIsLoading(true);
        const { tokenBalances } = await provider.core.getTokenBalances(
          smartWalletAddress
        );

        setTokenBalances(tokenBalances);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [provider, smartWalletAddress]);

  useEffect(() => {
    if (enabled !== false && provider) {
      getSmartWalletTokenBalances();
    }
  }, [enabled, getSmartWalletTokenBalances, provider]);

  return {
    data: tokenBalances,
    error: error,
    isLoading: isLoading,
    isError: Boolean(error),
  };
}
