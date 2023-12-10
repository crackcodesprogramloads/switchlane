"use client";

import dynamic from "next/dynamic";
import { ConnectButton, useChainModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";
// import ARBITRUM from "/public/chains/RainbowIcons/Arbitrum.svg";

function SendNetworkInput() {
  const { openChainModal } = useChainModal();

  function removeSecondWord(chainName: string): string {
    const words = chainName.split(" ");
    const result = words.length > 1 ? words[0] : chainName;

    return result;
  }

  return (
    <fieldset
      onClick={openChainModal}
      className="w-full h-[68px] flex items-center text-zinc-200 border-dashed border-t border-gray-600"
    >
      <legend className="ml-auto mr-auto px-2 text-lg">From Network</legend>
      <ConnectButton.Custom>
        {({ chain }) => {
          if (!chain) return <></>;

          const icon =
            chain.hasIcon && chain.iconUrl ? (
              <Image
                width={35}
                height={35}
                alt={chain.name ?? "Chain icon"}
                src={chain.iconUrl}
              />
            ) : null;
          // <Image
          //   width={35}
          //   height={35}
          //   alt="Arbitrum icon"
          //   src={ARBITRUM}
          // />

          return (
            <span className="w-full h-full flex flex-row items-center justify-center gap-4 text-3xl font-light cursor-pointer">
              {icon}
              {chain.name ? removeSecondWord(chain.name) : ""}
            </span>
          );
        }}
      </ConnectButton.Custom>
    </fieldset>
  );
}

export default dynamic(() => Promise.resolve(SendNetworkInput), { ssr: false });
