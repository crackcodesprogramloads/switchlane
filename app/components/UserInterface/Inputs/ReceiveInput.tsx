"use client";
import Image from "next/image";

import { useContractRead } from "wagmi";
import contractABI from "@/app/abi/Switchlane.json";
// import { ethers } from "ethers";
import { formatEther } from "viem";

import { SWITCHLANE_TRANSFER_CONTRACT_ADDRESS } from "../../constants";
import { removeExcessDigitsFromString } from "@/app/utils/removeExcessDigitsFromString";
import PROCESSING from "/public/processing.svg";

interface ReceiveInputProps {
  fromToken: string;
  toToken: string;
  maxTolerance: number | string; // Use 'bigint' if dealing with very large numbers
  toAmount: number | string; // Use 'bigint' if dealing with very large numbers
  destinationChain: number | string;
}
function ReceiveInput({
  fromToken,
  toToken,
  maxTolerance,
  toAmount,
  destinationChain,
}: ReceiveInputProps) {
  const args = [fromToken, toToken, maxTolerance, toAmount, destinationChain];

  const { data, error, isLoading } = useContractRead({
    address: "0x0D0502489E7FA33aF1c8ed18D9053FB35c099d13", // Replace with the address of your contract
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

    return <div className="h-full">Recieve: ~{etherValue}</div>;
  }

  return <div className="h-full">Waiting for input...</div>;
}

export default ReceiveInput;
// "use client";

// export default function ReceiveInput({ value }: { value: string }) {
//   // todo: receive amount should be calculated based on the value props
//   const balanceFormatted = "100"; // hardcoded value
//   // todo: receive symbol should be calculated based on the value props
//   const balanceSymbol = "matic"; // hardcoded value

//   return (
//     <fieldset className="w-full h-[60%] px-2 flex flex-col items-center justify-around text-zinc-200 border-dashed border-t border-gray-600">
//       <legend className="ml-auto mr-auto px-2 text-lg">Receive</legend>

//       <input
//         required
//         type="text"
//         id="receiveAmount"
//         name="receiveAmount"
//         className="w-full h-full outline-none text-4xl text-end bg-transparent"
//         placeholder="0.00"
//         // value={value}
//         // onChange={onChange}
//         readOnly
//       />
//     </fieldset>
//   );
// }
