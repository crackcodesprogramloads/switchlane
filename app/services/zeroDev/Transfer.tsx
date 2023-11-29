"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useNetwork,
  usePublicClient,
} from "wagmi";
import { BaseError, ContractFunctionRevertedError } from "viem";
// import contractAbi from "./ERC20ABI.json";
// import contractAbi from "./NEWABI.json";
import AnimatedButton from "@/app/components/Navbar/Wallet/AnimatedButton";

export default function Transfer() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const [balanceChanging, setBalanceChanging] = useState(false);
  const publicClient = usePublicClient();

  // async function Test() {
  //   try {
  //     await publicClient.simulateContract({
  //       address: "0x94C8d45976f908267817670345C127c5D1FBd928",
  //       abi: contractAbi,
  //       functionName: "receiveTokens",
  //       args: ["0x0000000000000000000000000000000000001010", 1000000000000000], // 0.001Matic
  //     });
  //   } catch (err) {
  //     if (err instanceof BaseError) {
  //       const revertError = err.walk(
  //         (err) => err instanceof ContractFunctionRevertedError
  //       );
  //       if (revertError instanceof ContractFunctionRevertedError) {
  //         const errorName = revertError.data?.errorName ?? "";
  //         // do something with `errorName`
  //         console.log({ errorName });
  //       }
  //     }
  //   }
  // }

  // useEffect(() => {
  //   if (isConnected) {
  //     Test();
  //   }
  // }, [isConnected]);

  const {
    config,
    error: err,
    status,
  } = usePrepareContractWrite({
    address: "0x4Eb0451A0E08441A850E74dDDd3E0e355cE6aCc1",
    abi: contractAbi,
    functionName: "receiveTokens",
    args: [
      "0xEB6d15D599E9fcF8d7A7F42eD6FAB75C45540718",
      "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1",
      100000000000000,
    ],
    enabled: true,
  });

  // receiveTokens(address sender, address token, uint256 amount)

  const { write: receiveTokens, isLoading, error } = useContractWrite(config);

  const handleApprove = useCallback(async () => {
    if (receiveTokens) {
      setBalanceChanging(true);
      receiveTokens();
    }
  }, [receiveTokens]);

  console.log("err", err);
  console.log("status", status);
  console.log("config", config);

  const { data: text, refetch } = useContractRead({
    address: "0x4Eb0451A0E08441A850E74dDDd3E0e355cE6aCc1",
    abi: contractAbi,
    functionName: "getBalanceOfToken",
    args: ["0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1"],
    enabled: !!address,
  });
  //   function getBalanceOfToken(address _token) external view returns(uint256 balance){
  //     balance = IERC20(_token).balanceOf(address(this));
  // }

  console.log({ text });

  // useEffect(() => {
  //   setBalanceChanging(false);
  // }, [balance]);

  // const interval = useRef<any>();

  // useEffect(() => {
  //   if (interval.current) {
  //     clearInterval(interval.current);
  //   }
  // }, [balance, interval]);

  // useEffect(() => {
  //   if (error) {
  //     console.log(error.message);
  //   }
  // }, [error]);

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
            onClick={isConnected && handleApprove}
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
