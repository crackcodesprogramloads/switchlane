"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Button from "./Button";
import { m, LazyMotion, domAnimation } from "framer-motion";

export default function WalletButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
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
              {(() => {
                if (!connected) {
                  return (
                    <Button onClick={openConnectModal}>Connect Wallet</Button>
                  );
                }
                if (chain.unsupported) {
                  return (
                    <Button onClick={openChainModal}>Wrong network</Button>
                  );
                }
                return (
                  <div className="flex flex-row gap-2 md:gap-12">
                    <button
                      className="sm:py-2 sm:px-4 sm:border-[1.5px] border-zinc-200 rounded-full flex flex-row items-center font-normal"
                      onClick={openChainModal}
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div className="mr-2">
                          {chain.iconUrl && (
                            <Image
                              className="scale-125 sm:scale-100"
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              width={25}
                              height={25}
                            />
                          )}
                        </div>
                      )}
                      <div className="hidden sm:flex">{chain.name}</div>
                    </button>
                  </div>
                );
              })()}
            </m.div>
          </LazyMotion>
        );
      }}
    </ConnectButton.Custom>
  );
}
