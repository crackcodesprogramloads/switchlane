"use client";

import ContractProtocolFeeReader from "../ContractInterface/ContractProtocolFeeReader";

export default function EstimateCost({ sendAmount }: { sendAmount: string }) {
  return (
    <fieldset className="w-full h-1/2 flex items-center justify-center text-zinc-200 border-dashed border-t border-gray-600">
      <legend className="ml-auto mr-auto px-2 text-md">Estimate Cost</legend>
      {sendAmount && (
        <ContractProtocolFeeReader
          // fromToken={sendTokenAddress}
          fromToken={"0x326c977e6efc84e512bb9c30f76e30c160ed06fb"}
          // toToken={receiveTokenAddress}
          toToken={"0xf1e3a5842eeef51f2967b3f05d45dd4f4205ff40"}
          amountFromToken={sendAmount}
          // amountToToken={receiveAmount}
          amountToToken={sendAmount}
          // destinationChain={destinationChain}
          destinationChain={"16015286601757825753"} //sepolia?
        />
      )}
    </fieldset>
  );
}
