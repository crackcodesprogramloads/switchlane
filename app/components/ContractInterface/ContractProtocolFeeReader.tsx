"use client";

import { useContractRead } from "wagmi";
import contractABI from "@/app/abi/Switchlane.json";
import { ethers } from "ethers";

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
  // const args = [
  //   "0x326c977e6efc84e512bb9c30f76e30c160ed06fb",
  //   "0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40",
  //   1,
  //   1,
  //   "16015286601757825753",
  // ];

  const { data, error, isLoading } = useContractRead({
    address: "0xb80214f73b47D2E4ceda3600bD3c2c83365E8893",
    abi: contractABI.abi as any,
    functionName: "calculateProtocolFees",
    args: args,
  });

  // Handle the response
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (data) {
    const etherValue = ethers.utils.formatUnits(data, "ether");
    return <div>Fee: ${etherValue}</div>;
  }

  return <div>Waiting for input...</div>;
}

export default ContractProtocolFeeReader;
