"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import AnimatedButton from "./AnimatedButton";

export default function WalletButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
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
                return (
                  <AnimatedButton onClick={openConnectModal}>
                    Connect Wallet
                  </AnimatedButton>
                );
              }
              if (chain.unsupported) {
                return (
                  <AnimatedButton onClick={openChainModal}>
                    Wrong network
                  </AnimatedButton>
                );
              }
              return (
                <div className="flex gap-12">
                  <button
                    className="py-2 px-4 border-2 border-zinc-200 rounded-full flex flex-row items-center"
                    onClick={openChainModal}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 25,
                          height: 25,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            width={25}
                            height={25}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>
                  {/* <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button> */}
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
