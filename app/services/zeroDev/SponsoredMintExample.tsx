"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useNetwork,
} from "wagmi";
import contractAbi from "./MintToken.json";
import AnimatedButton from "@/app/components/Navbar/Wallet/AnimatedButton";

export default function SponsoredMintExample() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const [balanceChanging, setBalanceChanging] = useState(false);

  const { config } = usePrepareContractWrite({
    address: "0x34bE7f35132E97915633BC1fc020364EA5134863",
    abi: contractAbi,
    functionName: "mint",
    args: [address],
    enabled: false,
  });
  const { write: mint, isLoading, error } = useContractWrite(config);
  console.log("config", config);

  const { data: balance = 0, refetch } = useContractRead({
    address: "0x34bE7f35132E97915633BC1fc020364EA5134863",
    abi: contractAbi,
    functionName: "balanceOf",
    args: [address],
    enabled: !!address,
  });

  useEffect(() => {
    setBalanceChanging(false);
  }, [balance]);

  const interval = useRef<any>();

  const handleClick = useCallback(async () => {
    if (mint) {
      setBalanceChanging(true);
      mint();
    }
  }, [mint]);

  useEffect(() => {
    if (interval.current) {
      clearInterval(interval.current);
    }
  }, [balance, interval]);

  useEffect(() => {
    if (error) {
      console.log(error.message);
    }
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {isConnected && (
        <>
          <strong style={{ fontSize: "1.5rem" }}>NFT Count</strong>
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "medium",
              width: 100,
              height: 100,
              borderRadius: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              border: "10px solid #2B8DE3",
            }}
          >{`${balance ?? 0}`}</div>
          <AnimatedButton loading={isLoading} onClick={handleClick}>
            Gas-free Mint
          </AnimatedButton>
          {chain?.blockExplorers?.default.url && (
            <a
              href={`${chain?.blockExplorers?.default.url}/address/${address}#tokentxnsErc721`}
              target="_blank"
            >
              Block Explorer
            </a>
          )}
        </>
      )}
    </div>
  );
}
