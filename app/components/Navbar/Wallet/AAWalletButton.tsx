"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { TokenBalance } from "alchemy-sdk";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useBalance } from "wagmi";

import { useCopyToClipboard } from "@/app/hooks/useCopyToClipboard";
import useTokenBalances from "@/app/hooks/useTokenBalances";

import CLIPBOARD from "/public/clipboard.svg";
import WALLET from "/public/wallet.svg";
import { AAWalletProviderContext } from "./AAWalletProvider";

export default function AAWalletButton() {
  const [smartWalletOpen, setSmartWalletOpen] = useState(false);
  const { smartWalletAddress } = useContext(AAWalletProviderContext);

  const [value, copy] = useCopyToClipboard();

  const firstSectionAddress = smartWalletAddress.slice(0, 7);
  const secondSectionAddress = smartWalletAddress.slice(37, 42);

  const { data, isError, isLoading } = useBalance({
    address: smartWalletAddress as `0x${string}`,
    enabled: Boolean(smartWalletAddress) && smartWalletOpen,
  });

  const {
    data: tokenBalances,
    isError: isTokenBalancesError,
    isLoading: isTokenBalancesLoading,
  } = useTokenBalances({
    enabled: Boolean(smartWalletAddress) && smartWalletOpen,
  });

  function handleSmartWalletOpen() {
    setSmartWalletOpen((prevState) => !prevState);
  }

  return (
    <>
      <LazyMotion features={domAnimation}>
        <m.div
          initial={{ y: "-200%", opacity: 0.1 }}
          animate={{ y: "0", opacity: 1 }}
          transition={{
            type: "spring",
            damping: 20,
            delay: 0,
          }}
        >
          <ConnectButton.Custom>
            {({ account, chain, authenticationStatus, mounted }) => {
              const ready = mounted && authenticationStatus !== "loading";
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === "authenticated");
              return (
                <div>
                  {(() => {
                    if (!connected) {
                      return null;
                    }
                    if (chain.unsupported) {
                      return null;
                    }
                    return (
                      <>
                        <button
                          onClick={handleSmartWalletOpen}
                          type="button"
                          className="hidden py-2 px-4 sm:border-[1.5px] border-zinc-200 rounded-full sm:flex flex-row items-center font-normal"
                        >
                          Smart Wallet
                        </button>
                        <button
                          onClick={handleSmartWalletOpen}
                          type="button"
                          className="flex sm:border-[1.5px] border-zinc-200 rounded-full sm:hidden flex-row items-center font-normal"
                        >
                          <Image
                            src={WALLET}
                            alt="wallet icon"
                            width={30}
                            height={30}
                          />
                        </button>
                      </>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </m.div>
      </LazyMotion>

      {smartWalletOpen && (
        <div className="z-50 fixed top-6 right-8 px-10 py-8 flex flex-col items-center justify-center gap-2 border border-gray-600 rounded-lg bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900">
          <div
            onClick={handleSmartWalletOpen}
            className="fixed top-8 right-12 cursor-pointer"
          >
            X
          </div>
          <h1 className="text-2xl text-white font-medium">Your Smart Wallet</h1>
          <span className="py-2 w-full flex flex-col items-center border-b border-dotted">
            <span className="flex flex-row gap-2">
              <p className="text-md">
                {firstSectionAddress}...{secondSectionAddress}{" "}
              </p>
              <Image
                onClick={() => copy(smartWalletAddress)}
                className="cursor-pointer"
                src={CLIPBOARD}
                alt="clipboard icon"
                width={20}
                height={20}
              />
            </span>
          </span>
          {isLoading ? (
            <div>Fetching balance</div>
          ) : isError ? (
            <div>Error fetching balance</div>
          ) : (
            <div className="w-full">
              <div className="flex flex-row justify-between">
                <p>{data?.symbol}</p>
                <p> {data?.formatted}</p>
              </div>
              <div>
                {tokenBalances?.map((bal) => (
                  <TokenBalanceDisplay
                    key={bal.contractAddress}
                    data={bal}
                    smartWalletAddress={smartWalletAddress}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

function TokenBalanceDisplay({
  data,
  smartWalletAddress,
}: {
  data: TokenBalance;
  smartWalletAddress: string;
}) {
  const {
    data: balance,
    isError,
    isLoading,
  } = useBalance({
    address: smartWalletAddress as `0x${string}`,
    token: data.contractAddress as `0x${string}`,
  });

  if (data.error) {
    return <div>Error getting token balance</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row justify-between">
      <p> {balance?.symbol}</p>
      <p>{balance?.formatted}</p>
    </div>
  );
}
