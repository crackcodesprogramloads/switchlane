"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AAWalletProviderContext } from "./AAWalletProvider";
import { useContext, useState } from "react";
import { useBalance } from "wagmi";

export default function AAWalletButton() {
  const [smartWalletOpen, setSmartWalletOpen] = useState(false);
  const { provider, smartWalletAddress } = useContext(AAWalletProviderContext);

  function handleSmartWalletOpen() {
    setSmartWalletOpen((prevState) => !prevState);
  }

  const firstSectionAddress = smartWalletAddress.slice(0, 7);
  const secondSectionAddress = smartWalletAddress.slice(37, 42);

  const { data, isError, isLoading } = useBalance({
    address: "0xe01F3A01cB443BDCcDF0B8353ffb9bD558EFDaE8",
  });

  return (
    <>
      <ConnectButton.Custom>
        {({ account, chain, authenticationStatus, mounted }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== "loading";
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === "authenticated");
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
      {smartWalletOpen && (
        <div className="z-50 fixed top-6 right-8 px-10 py-8 flex flex-col items-center justify-center gap-2 border border-gray-600 rounded-lg bg-gray-950">
          <div
            onClick={handleSmartWalletOpen}
            className="fixed top-8 right-12 cursor-pointer"
          >
            X
          </div>
          <h1 className="text-2xl text-white">Your Smart Wallet</h1>
          <p className="text-md">
            Address: {firstSectionAddress}...{secondSectionAddress}
          </p>
          {isLoading ? (
            <div>Fetching balance</div>
          ) : isError ? (
            <div>Error fetching balance</div>
          ) : (
            <div>
              Balance: {data?.formatted} {data?.symbol}
            </div>
          )}
        </div>
      )}
    </>
  );
}
