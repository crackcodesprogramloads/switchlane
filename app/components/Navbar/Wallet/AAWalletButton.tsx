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
import { AAWalletProviderContext } from "./AAWalletProvider";

export default function AAWalletButton() {
  const [smartWalletOpen, setSmartWalletOpen] = useState(false);
  const { smartWalletAddress } = useContext(AAWalletProviderContext);

  const [, copy] = useCopyToClipboard();

  const firstSectionAddress = smartWalletAddress.slice(0, 7);
  const secondSectionAddress = smartWalletAddress.slice(37, 42);

  const { data, isError, isLoading } = useBalance({
    address: "0xe01F3A01cB443BDCcDF0B8353ffb9bD558EFDaE8",
  });

  const {
    data: tokenBalances,
    isError: isTokenBalancesError,
    isLoading: isTokenBalancesLoading,
  } = useTokenBalances();

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
                <div
                  {...(!ready && {
                    "aria-hidden": true,
                    style: {
                      opacity: 0,
                      pointerEvents: "none",
                      userSelect: "none",
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return null;
                    }
                    if (chain.unsupported) {
                      return null;
                    }
                    return (
                      <button
                        onClick={handleSmartWalletOpen}
                        type="button"
                        className="py-2 px-4 border-2 border-zinc-200 rounded-full flex flex-row items-center"
                      >
                        Smart Wallet
                      </button>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </m.div>
      </LazyMotion>

      {smartWalletOpen && (
        <div className="z-50 fixed top-6 right-8 px-10 py-8 flex flex-col items-center justify-center gap-2 border border-gray-600 rounded-lg bg-gray-950">
          <div
            onClick={handleSmartWalletOpen}
            className="fixed top-8 right-12 cursor-pointer"
          >
            X
          </div>
          <h1 className="text-2xl text-white">Your Smart Wallet</h1>
          <span className="py-2 w-full flex flex-col items-center border-b border-dotted">
            <span className="flex flex-row gap-2">
              <p className="text-md">
                {firstSectionAddress}...{secondSectionAddress}{" "}
              </p>
              <Image
                onClick={() => copy(smartWalletAddress)}
                className="cursor-pointer active:scale-[0.1]"
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
            <div>
              {data?.formatted} {data?.symbol}
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
    <div>
      {balance?.formatted} {balance?.symbol}
    </div>
  );
}
