"use client";

import dynamic from "next/dynamic";
import { ConnectButton, useChainModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";

function SendNetworkInput() {
  const { openChainModal } = useChainModal();

  function removeSecondWord(chainName: string): string {
    // Split the chainName into an array of words
    const words = chainName.split(" ");

    // Keep only the first word
    const result = words.length > 1 ? words[0] : chainName;

    return result;
  }

  return (
    <fieldset
      onClick={openChainModal}
      className="w-full h-1/2 flex items-center text-zinc-200 border-dashed border-t border-gray-600 "
    >
      <legend className="ml-auto mr-auto px-2 text-md">Network</legend>
      <ConnectButton.Custom>
        {({ chain }) => {
          if (!chain) return <></>;
          return (
            chain.hasIcon && (
              <span className="w-full h-full flex flex-row items-center justify-center gap-4 text-3xl cursor-pointer">
                {chain.iconUrl && (
                  <Image
                    width={35}
                    height={35}
                    alt={chain.name ?? "Chain icon"}
                    src={chain.iconUrl}
                  />
                )}
                {chain.name ? removeSecondWord(chain.name) : ""}
              </span>
            )
          );
        }}
      </ConnectButton.Custom>
    </fieldset>
  );
}

export default dynamic(() => Promise.resolve(SendNetworkInput), { ssr: false });
