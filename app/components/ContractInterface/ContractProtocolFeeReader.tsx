"use client";

import Image from "next/image";

import { useContractRead } from "wagmi";
import { formatEther } from "viem";

import contractABI from "@/app/abi/Switchlane.json";
import { SWITCHLANE_TRANSFER_CONTRACT_ADDRESS } from "../../constants";
import { removeExcessDigitsFromString } from "@/app/utils/removeExcessDigitsFromString";
import PROCESSING from "/public/processing.svg";

interface ContractProtocolFeeReaderProps {
  fromToken: string;
  toToken: string;
  amountFromToken: number | string; // Use 'bigint' if dealing with very large numbers
  amountToToken: number | string; // Use 'bigint' if dealing with very large numbers
  destinationChain: number | string;
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
    address: "0xb80214f73b47D2E4ceda3600bD3c2c83365E8893",
    abi: contractABI.abi as any,
    functionName: "calculateProtocolFees",
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

    return (
      <div className="h-full">Sponsored gas: ~{truncatedEtherValue} USD</div>
    );
  }

  return <div className="h-full">Waiting for input...</div>;
}

export default ContractProtocolFeeReader;
