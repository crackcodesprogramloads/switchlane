"use client";

import ContractProtocolFeeReader, {
  ContractProtocolFeeReaderProps,
} from "../ContractInterface/ContractProtocolFeeReader";

export default function EstimateCost(
  props: Partial<ContractProtocolFeeReaderProps>
) {
  const {
    fromToken,
    toToken,
    amountFromToken,
    amountToToken,
    destinationChain,
  } = props;

  const argsNotEmpty =
    fromToken &&
    toToken &&
    amountFromToken &&
    amountToToken &&
    destinationChain;

  return (
    <fieldset className="w-full h-[68px] flex-col flex items-center justify-center text-zinc-200 border-dashed border-t border-gray-600">
      <legend className="ml-auto mr-auto px-2 text-lg">Cost estimate</legend>
      {argsNotEmpty ? (
        <ContractProtocolFeeReader
          fromToken={fromToken}
          toToken={toToken}
          amountFromToken={amountFromToken}
          amountToToken={amountToToken}
          destinationChain={destinationChain}
        />
      ) : null}
    </fieldset>
  );
}
