"use client";

export default function ReceiveInput({ value }: { value: number | undefined }) {
  // todo: receive amount should be calculated based on the value props
  const balanceFormatted = "100"; // hardcoded value
  // todo: receive symbol should be calculated based on the value props
  const balanceSymbol = "matic"; // hardcoded value

  return (
    <fieldset className="w-full h-1/2 px-2 flex flex-col items-center justify-around text-zinc-200 border-dashed border-t border-gray-600">
      <legend className="ml-auto mr-auto px-2 text-lg">Receive Amount</legend>
      <span className="w-full flex flex-row items-center justify-between">
        <input
          type="number"
          id="receive-amount"
          name="receive-amount"
          className="w-full h-full outline-none text-4xl text-end bg-transparent"
          placeholder="0.00"
          value={value}
          readOnly
        />
      </span>
      <span className="w-full flex flex-row justify-end text-zinc-200">
        {balanceFormatted} {balanceSymbol}
      </span>
    </fieldset>
  );
}
