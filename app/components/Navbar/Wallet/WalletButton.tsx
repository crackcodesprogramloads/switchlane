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
