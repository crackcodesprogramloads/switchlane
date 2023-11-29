"use client";

import { useCallback, useState } from "react";
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePublicClient,
} from "wagmi";
import { useEcdsaProvider } from "@zerodev/wagmi";
import type { ECDSAProvider } from "@zerodev/sdk";

import AnimatedButton from "@/app/components/Navbar/Wallet/AnimatedButton";
import { Abi, encodeFunctionData } from "viem";

import ERC20Abi from "../../abi/ERC20_Token_Abi.json";

export default function Transfer() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const [balanceChanging, setBalanceChanging] = useState(false);
  const publicClient = usePublicClient();

  const ecdsaProvider = useEcdsaProvider();

  async function approveTransaction({
    ecdsaProvider,
    targetToken,
    amount,
  }: {
    ecdsaProvider: ECDSAProvider;
    targetToken: `0x${string}`;
    amount: number;
  }) {
    try {
      const spender = ""; // contract address
      const { hash } = await ecdsaProvider.sendUserOperation({
        target: targetToken,
        data: encodeFunctionData({
          abi: ERC20Abi,
          functionName: "approve",
          args: [spender, amount],
        }),
      });

      await ecdsaProvider.waitForUserOperationTransaction(
        hash as `0x${string}`
      );
    } catch (error: any) {
      console.log(error.message);
    }
  }

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
          ></div>
          <AnimatedButton
            // loading={isLoading}
            onClick={isConnected && approveTransaction}
          >
            Approve
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
