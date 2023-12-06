"use client";

export default function ReceiveInput({ value }: { value: string }) {
  // todo: receive amount should be calculated based on the value props
  const balanceFormatted = "100"; // hardcoded value
  // todo: receive symbol should be calculated based on the value props
  const balanceSymbol = "matic"; // hardcoded value

  return (
    <fieldset className="w-full h-[60%] px-2 flex flex-col items-center justify-around text-zinc-200 border-dashed border-t border-gray-600">
      <legend className="ml-auto mr-auto px-2 text-lg">Receive</legend>

      <input
        required
        type="text"
        id="receiveAmount"
        name="receiveAmount"
        className="w-full h-full outline-none text-4xl text-end bg-transparent"
        placeholder="0.00"
        // value={value}
        // onChange={onChange}
        readOnly
      />
    </fieldset>
  );
}
