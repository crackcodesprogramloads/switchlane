"use client";

import { useNetwork } from "wagmi";
import dynamic from "next/dynamic";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useState } from "react";

function DestinationNetworkInput({
  title,
  destinationChain,
  onClick,
}: {
  title: string;
  destinationChain?: string;
  onClick?: () => void;
}) {
  const { chain } = useNetwork();

  return (
    <fieldset
      onClick={onClick}
      className="w-full h-1/2 flex items-center text-zinc-200 border-dashed border-t border-gray-600 "
    >
      <legend className="ml-auto mr-auto px-2 text-md">{title}</legend>
      <ConnectButton.Custom>
        {({ chain }) => {
          if (!chain) return <></>;
          return (
            chain.hasIcon && (
              <span className="w-full h-full flex flex-row items-center justify-center gap-4 text-3xl cursor-pointer">
                {chain.name}
                {chain.iconUrl && (
                  <Image
                    width={35}
                    height={35}
                    alt={chain.name ?? "Chain icon"}
                    src={chain.iconUrl}
                  />
                )}
              </span>
            )
          );
        }}
      </ConnectButton.Custom>
    </fieldset>
  );
}

export default dynamic(() => Promise.resolve(DestinationNetworkInput), {
  ssr: false,
});
