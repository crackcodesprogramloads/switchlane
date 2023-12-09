"use client";

import Image from "next/image";

import { useContractRead } from "wagmi";
import { formatEther } from "viem";

import contractABI from "@/app/abi/Switchlane.json";
import { removeExcessDigitsFromString } from "@/app/utils/removeExcessDigitsFromString";
import PROCESSING from "/public/processing.svg";

export interface ContractProtocolFeeReaderProps {
  fromToken: string;
  toToken: string;
  amountFromToken: bigint;
  amountToToken: bigint;
  destinationChain: string | number;
}

function ContractProtocolFeeReader({
  fromToken,
  toToken,
  amountFromToken,
  amountToToken,
  destinationChain,
}: ContractProtocolFeeReaderProps) {
  const args = [
    fromToken,
    toToken,
    amountFromToken,
    amountToToken,
    destinationChain,
  ];

  const { data, error, isLoading } = useContractRead({
    // address: "0xb80214f73b47D2E4ceda3600bD3c2c83365E8893",
    address: "0x0D0502489E7FA33aF1c8ed18D9053FB35c099d13",
    abi: contractABI,
    functionName: "calculateProtocolFees",
    args: args,
    enabled: args.every((arg) => Boolean(arg)),
  });

  if (isLoading)
    return (
      <Image
        className="animate-spin"
        src={PROCESSING}
        alt="processing icon"
        width={28}
        height={28}
      />
    );
  if (error) {
    console.log(error.message);
    return null;
  }
  if (data) {
    const etherValue = formatEther(data as any);
    const truncatedEtherValue = removeExcessDigitsFromString(etherValue);

    return (
      <div className="h-full flex flex-col items-center text-[18px]">
        <p>Sponsored gas fee</p>
        <p>~{truncatedEtherValue} USD</p>
      </div>
    );
  }

  return <div className="h-full">Waiting for input...</div>;
}

export default ContractProtocolFeeReader;
