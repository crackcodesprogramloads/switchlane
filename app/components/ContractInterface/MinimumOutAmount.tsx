"use client";
import Image from "next/image";

import { useContractRead } from "wagmi";
import contractABI from "@/app/abi/Switchlane.json";
import { formatEther } from "viem";

import { removeExcessDigitsFromString } from "@/app/utils/removeExcessDigitsFromString";
import PROCESSING from "/public/processing.svg";
import { SWITCHLANE_TRANSFER_CONTRACT_ADDRESS } from "@/app/constants";

interface ReceiveInputProps {
  fromToken: string | undefined;
  toToken: string | undefined;
  maxTolerance: number | string; // Use 'bigint' if dealing with very large numbers
  fromAmount: number | string; // Use 'bigint' if dealing with very large numbers
  destinationChain: number | string;
}
function MinimumOutAmount({
  fromToken,
  toToken,
  maxTolerance,
  fromAmount,
  destinationChain,
}: ReceiveInputProps) {
  const args = [fromToken, toToken, maxTolerance, fromAmount, destinationChain];

  const { data, error, isLoading } = useContractRead({
    address: SWITCHLANE_TRANSFER_CONTRACT_ADDRESS,
    abi: contractABI as any,
    functionName: "calculateMinimumOutAmount",
    args: args,
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

    return <p className="h-full text-[16px]">Minimum ~{truncatedEtherValue}</p>;
  }

  return <p className="h-full text-lg">Waiting for input...</p>;
}

export default MinimumOutAmount;
