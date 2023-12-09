"use client";

import { formatEther } from "viem/utils";
import { useBalance } from "wagmi";

export default function SendInput({
  value,
  onChange,
  fromTokenAddress,
  smartWalletAddress,
}: {
  value: string | undefined;
  onChange: (e: any) => void;
  fromTokenAddress: string | undefined;
  smartWalletAddress: string;
}) {
  const {
    data: balance,
    isError,
    isLoading,
  } = useBalance({
    address: smartWalletAddress as `0x${string}`,
    token: fromTokenAddress as `0x${string}`,
    enabled: !!value && !!smartWalletAddress && !!fromTokenAddress,
  });

  function handleMaxAmount() {
    const maxValue = balance?.value;
    if (maxValue) {
      const maxValueEthString = formatEther(maxValue);
      onChange({ target: { value: maxValueEthString } });
    }
  }

  return (
    <fieldset className="w-full h-[68px] flex items-center text-zinc-200 border-dashed border-t border-gray-600">
      <legend className="ml-auto mr-auto px-2 text-lg">Send amount</legend>
      <span className="w-full flex flex-row items-center justify-between">
        <button
          type="button"
          disabled={isError || isLoading}
          onClick={handleMaxAmount}
          className="w-1/4 h-3/4 px-auto py-auto text-zinc-200 text-md border rounded-lg"
        >
          Max
        </button>
        <input
          required
          type="text"
          id="sendAmount"
          name="sendAmount"
          className="w-full h-full outline-none text-4xl text-end bg-transparent"
          placeholder="0.00"
          value={value}
          onChange={onChange}
        />
      </span>
    </fieldset>
  );
}
