"use client";

import { useState } from "react";
import AddressInput from "./Inputs/AddressInput";
import AmountInput from "./Inputs/AmountInput";
import NetworkInput from "./Inputs/NetworkInput";
import TokenInput from "./Inputs/TokenInput";

import { useEcdsaProvider } from "@zerodev/wagmi";

import { m, LazyMotion, domAnimation } from "framer-motion";
import {
  approveTransaction,
  checkAllowance,
} from "@/app/services/zeroDev/transfer";
import {
  DEFAULT_SEND_TOKEN_ADDRESS,
  DEFAULT_SEND_TOKEN_ADDRESS_2,
  SWITCHLANE_TRANSFER_CONTRACT_ADDRESS,
} from "@/app/constants";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";

export default function UserInterface() {
  const [sendTokenAddress, setSendTokenAddress] = useState<`0x${string}`>(
    DEFAULT_SEND_TOKEN_ADDRESS_2
  );
  const [inputAmount, setInputAmount] = useState(0);
  const [receiveEstimate, setReceiveEstimate] = useState(0);

  const ecdsaProvider = useEcdsaProvider();
  const { address } = useAccount();

  function handleTokenChange(e: any) {
    const tokenAddress = e.target.value;
    if (!tokenAddress) {
      // handle error
      return;
    }

    setSendTokenAddress(tokenAddress);
  }

  function handleInputAmountChange(e: any) {
    const amount = e.target.value;
    if (!amount) {
      // handle error
      return;
    }

    setInputAmount(Number(amount));
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!address) {
      // handle error
      return;
    }

    if (!sendTokenAddress) {
      // handle error
      return;
    }

    if (!inputAmount) {
      // handle error
      return;
    }

    if (!ecdsaProvider) {
      // handle error
      return;
    }

    try {
      await approveTransaction({
        ecdsaProvider,
        tokenAddress: sendTokenAddress,
        amount: Number(parseEther(String(inputAmount))),
      });

      await checkAllowance({
        ecdsaProvider,
        walletAddress: address,
        spender: SWITCHLANE_TRANSFER_CONTRACT_ADDRESS,
        tokenAddress: sendTokenAddress,
        amount: Number(inputAmount),
      });

      // reset();
    } catch (error: any) {
      console.log(error.message);
    }
  }

  function reset() {
    setInputAmount(0);
    setReceiveEstimate(0);
    setSendTokenAddress(DEFAULT_SEND_TOKEN_ADDRESS_2);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-[42%] h-[60%] flex flex-col items-center gap-3"
    >
      <LazyMotion features={domAnimation}>
        <div className="w-full h-full gap-3 flex flex-col items-center">
          <m.div
            initial={{ y: "500%", opacity: 0.1 }}
            animate={{ y: "0", opacity: 1 }}
            transition={{ type: "spring", damping: 20, delay: 0 }}
            className="w-full h-1/2 px-12 flex flex-row items-center justify-center gap-12 border-l border-t border-gray-600 hover:border-gray-400 rounded-lg shadow-[0px_0px_50px] shadow-sky-700/70"
          >
            <span className="w-1/2 h-full py-6 flex flex-col items-center justify-center gap-4">
              <AmountInput
                title="Send"
                button={true}
                showBalance={true}
                value={inputAmount}
                onChange={handleInputAmountChange}
              />
              <TokenInput title="GAS" token="Eth" />
            </span>
            <span className="w-1/2 h-full py-6 flex flex-col items-center justify-center gap-4">
              <TokenInput title="Token" token="Matic" />
              <NetworkInput title="Network" side="From" chain="Polygon" />
            </span>
          </m.div>
          <m.span
            initial={{ y: "500%", opacity: 0.1 }}
            animate={{ y: "0", opacity: 1 }}
            transition={{
              type: "spring",
              damping: 20,
              delay: 0.15,
            }}
            className="relative w-[85%] h-2/3 px-16 flex flex-row items-center justify-center gap-20 border-l border-t border-gray-600 hover:border-gray-400 rounded-lg shadow-[0px_0px_50px] shadow-sky-700/70"
          >
            <AmountInput
              title="Receive"
              button={false}
              showBalance={false}
              value={receiveEstimate}
              readOnly
            />
            <NetworkInput title="Network" side="To" chain="Polygon" />

            <span className="z-50 absolute -top-8 rotate-180 text-5xl">𐊾</span>
          </m.span>

          <AddressInput placeholder="Receiver address 0x..." />
        </div>
        <m.button
          initial={{ y: "500%", opacity: 0.1 }}
          animate={{ y: "0", opacity: 1 }}
          transition={{
            type: "spring",
            damping: 20,
            delay: 0.45,
          }}
          className="w-[55%] py-4 px-8 text-xl text-zinc-200 hover:text-zinc-50 font-semibold border-l border-t border-gray-600 hover:border-gray-400 rounded-lg shadow-[0px_0px_50px] shadow-sky-700/70"
        >
          Submit transfer
        </m.button>
      </LazyMotion>

      {/* {chain?.blockExplorers?.default.url && (
            <a
              href={`${chain?.blockExplorers?.default.url}/address/${address}#tokentxnsErc721`}
              target="_blank"
            >
              Block Explorer
            </a>
          )} */}
    </form>
  );
}
