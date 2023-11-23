"use client";

import Button from "./Button";
import { TokenInput, NetworkInput, AmountInput, AddressInput } from "./Inputs";
import Image from "next/image";
import TransferIcon from "/public/TransferIcon.svg";

export default function UserInterface() {
  return (
    <div className="relative w-[42%] h-[60%] flex flex-col items-center gap-3">
      <div className="relative w-full h-full gap-3 flex flex-col items-center">
        <div className="w-full h-1/2 px-12 flex flex-row items-center justify-center gap-12 border-l border-t border-gray-600 hover:border-gray-400 rounded-lg shadow-[0px_0px_60px] shadow-sky-700/70">
          <span className="w-1/2 h-full py-6 flex flex-col items-center justify-center gap-4">
            <AmountInput title="Send" button={true} showBalance={true} />
            <TokenInput title="GAS" token="Eth" />
          </span>
          <span className="w-1/2 h-full py-6 flex flex-col items-center justify-center gap-4">
            <TokenInput title="Token" token="Matic" />
            <NetworkInput title="Network" side="From" chain="Polygon" />
          </span>
        </div>

        <Image
          className="absolute top-1/2 transform -translate-y-1/2 p-1 border border-gray-600 rounded-full bg-gray-950"
          src={TransferIcon}
          alt="transfer-icon"
          width={55}
          height={55}
        />
        <span className="w-[85%] h-2/3 px-16 flex flex-row items-center justify-center gap-20 border-l border-t border-gray-600 hover:border-gray-400 rounded-lg shadow-[0px_0px_60px] shadow-sky-700/70">
          <AmountInput title="Receive" button={false} showBalance={false} />
          <NetworkInput title="Network" side="To" chain="Polygon" />
        </span>

        <AddressInput placeholder="Receiver address 0x..." />
      </div>
      <Button text="Submit transfer" width="w-[55%]" />
    </div>
  );
}
