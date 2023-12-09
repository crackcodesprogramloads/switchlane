"use client";

import MinimumOutAmount from "../../ContractInterface/MinimumOutAmount";

interface ReceiveInputProps {
  fromToken: string | undefined;
  toToken: string | undefined;
  maxTolerance: number | string; // Use 'bigint' if dealing with very large numbers
  fromAmount: number | string; // Use 'bigint' if dealing with very large numbers
  destinationChain: number | string;
}

function ReceiveInput({
  fromToken,
  toToken,
  maxTolerance,
  fromAmount,
  destinationChain,
}: ReceiveInputProps) {
  const argsNotEmpty =
    fromToken && toToken && maxTolerance && fromAmount && destinationChain;

  return (
    <fieldset className="w-full h-16 flex items-center text-zinc-200 border-dashed border-t border-gray-600 ">
      <legend className="ml-auto mr-auto px-2 text-lg">Receive amount</legend>
      {argsNotEmpty ? (
        <MinimumOutAmount
          fromToken={fromToken}
          toToken={toToken}
          maxTolerance={maxTolerance}
          fromAmount={fromAmount}
          destinationChain={destinationChain}
        />
      ) : null}
    </fieldset>
  );
}

export default ReceiveInput;
