import { useCallback, useEffect, useState } from "react";
import { TokenMetadataResponse } from "alchemy-sdk";

export default function useTokenMetadata({
  provider,
  tokenAddresses,
  enabled = true,
}: {
  provider: any;
  tokenAddresses: string[];
  enabled?: boolean;
}) {
  const [tokenMetaData, setTokenMetaData] = useState<TokenMetadataResponse[]>(
    []
  );

  const getTokenMetaData = useCallback(async () => {
    if (provider && tokenAddresses.length) {
      const data = await Promise.all(
        tokenAddresses.map(async (tokenAddress) => {
          return await provider.core.getTokenMetadata(tokenAddress);
        })
      );
      setTokenMetaData(data);
    }
  }, [provider, tokenAddresses]);

  useEffect(() => {
    if (enabled !== false && !tokenMetaData.length) {
      getTokenMetaData();
    }
  }, [getTokenMetaData, enabled, tokenMetaData]);

  return [tokenMetaData];
}
