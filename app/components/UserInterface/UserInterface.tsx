"use client";

import AddressInput from "./Inputs/AddressInput";
import AmountInput from "./Inputs/AmountInput";
import NetworkInput from "./Inputs/NetworkInput";
import TokenInput from "./Inputs/TokenInput";

import { m, LazyMotion, domAnimation } from "framer-motion";

export default function UserInterface() {
  const handleSubmit = () => {
    console.log("Submit");
  };

  return (
    <div className="relative w-[42%] h-[60%] flex flex-col items-center gap-3">
      <LazyMotion features={domAnimation}>
        <div className="w-full h-full gap-3 flex flex-col items-center">
          <m.div
            initial={{ y: "1000%", opacity: 0.1 }}
            animate={{ y: "0", opacity: 1 }}
            transition={{ type: "spring", damping: 20, delay: 0 }}
            className="w-full h-1/2 px-12 flex flex-row items-center justify-center gap-12 border-l border-t border-gray-600 hover:border-gray-400 rounded-lg shadow-[0px_0px_50px] shadow-sky-700/70"
          >
            <span className="w-1/2 h-full py-6 flex flex-col items-center justify-center gap-4">
              <AmountInput title="Send" button={true} showBalance={true} />
              <TokenInput title="GAS" token="Eth" />
            </span>
            <span className="w-1/2 h-full py-6 flex flex-col items-center justify-center gap-4">
              <TokenInput title="Token" token="Matic" />
              <NetworkInput title="Network" side="From" chain="Polygon" />
            </span>
          </m.div>
          <m.span
            initial={{ y: "1000%", opacity: 0.1 }}
            animate={{ y: "0", opacity: 1 }}
            transition={{
              type: "spring",
              damping: 20,
              delay: 0.15,
            }}
            className="relative w-[85%] h-2/3 px-16 flex flex-row items-center justify-center gap-20 border-l border-t border-gray-600 hover:border-gray-400 rounded-lg shadow-[0px_0px_50px] shadow-sky-700/70"
          >
            <AmountInput title="Receive" button={false} showBalance={false} />
            <NetworkInput title="Network" side="To" chain="Polygon" />

            <span className="z-50 absolute -top-8 rotate-180 text-5xl">𐊾</span>
          </m.span>

          <AddressInput placeholder="Receiver address 0x..." />
        </div>
        <m.button
          initial={{ y: "1000%", opacity: 0.1 }}
          animate={{ y: "0", opacity: 1 }}
          transition={{
            type: "spring",
            damping: 20,
            delay: 0.45,
          }}
          className="w-[55%] py-4 px-8 text-xl text-zinc-200 hover:text-zinc-50 font-semibold border-l border-t border-gray-600 hover:border-gray-400 rounded-lg shadow-[0px_0px_50px] shadow-sky-700/70"
          onClick={handleSubmit}
        >
          Submit transfer
        </m.button>
      </LazyMotion>
    </div>
  );
}
