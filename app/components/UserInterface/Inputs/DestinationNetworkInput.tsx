"use client";

import { Dispatch, SetStateAction } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { m, LazyMotion, domAnimation } from "framer-motion";

import OPTIMISM from "/public/chains/RainbowIcons/Optimism.svg";
import POLYGON from "/public/chains/RainbowIcons/Polygon.svg";
import ETHEREUM from "/public/chains/RainbowIcons/Ethereum.svg";
import BASE from "/public/chains/RainbowIcons/Base.svg";
import CLOSE_ICON from "/public/close.svg";

const DestinationChains = [
  { name: "Optimism", icon: OPTIMISM },
  { name: "Polygon", icon: POLYGON },
  { name: "Ethereum", icon: ETHEREUM },
  { name: "Base", icon: BASE },
];

export function DestinationNetworkModal({
  destinationNetwork,
  setDestinationNetwork,
  handleModalClose,
}: {
  destinationNetwork: any;
  setDestinationNetwork: Dispatch<SetStateAction<string>>;
  handleModalClose: () => void;
}) {
  const DestinationChainOptions = DestinationChains.map((chain, index) => {
    return (
      <button
        onClick={() => setDestinationNetwork(chain.name)}
        key={index}
        className={`px-2 py-[6px] my-[2px] w-full h-full flex flex-row items-center gap-3 rounded-xl ${
          destinationNetwork === chain.name
            ? "bg-[#3898FF]"
            : "hover:bg-[#2e3036]"
        }`}
      >
        <Image src={chain.icon} alt="chain icon" width={35} height={35} />
        <p className="text-md">{chain.name}</p>
      </button>
    );
  });

  return (
    <div
      className="z-50 fixed w-full h-[60%] bg-gray-950/70 backdrop-blur-sm flex flex-col items-center justify-center"
      onClick={handleModalClose}
    >
      <LazyMotion features={domAnimation}>
        <m.div
          className="w-72 px-4 py-2 flex flex-col justify-center border border-gray-800 rounded-3xl bg-[#1A1B1F] text-zinc-200"
          initial={{ y: "70px", opacity: 0.1 }}
          animate={{ y: "0", opacity: 1 }}
          transition={{
            type: "tween",
            duration: 0.2,
          }}
        >
          <div className="flex flex-row items-center justify-between">
            <h1 className="p-2 text-zinc-00 text-lg font-bold">
              Destination Network
            </h1>

            <div
              className="w-6 h-6 hover:scale-[1.1] flex items-center justify-center border border-gray-800 rounded-full bg-[#2e3036] cursor-pointer"
              onClick={handleModalClose}
            >
              <Image src={CLOSE_ICON} alt="close icon" width={10} height={10} />
            </div>
          </div>
          {DestinationChainOptions}
        </m.div>
      </LazyMotion>
    </div>
  );
}

function DestinationNetworkInput({
  destinationNetwork,
  onClick,
}: {
  destinationNetwork: string;
  onClick: () => void;
}) {
  const selectedChain = DestinationChains.find(
    (c) => c.name === destinationNetwork
  );

  return (
    <>
      <fieldset className="w-full h-[60%] flex items-center text-zinc-200 border-dashed border-t border-gray-600 ">
        <legend className="ml-auto mr-auto px-2 text-md">Network</legend>
        <button
          type="button"
          onClick={onClick}
          className="w-full h-full flex flex-row items-center justify-center gap-4"
        >
          {selectedChain ? (
            <>
              <Image
                src={selectedChain.icon}
                alt="chain icon"
                width={32}
                height={32}
              />
              <p className="text-3xl font-semibold">{selectedChain.name}</p>
            </>
          ) : null}
        </button>
      </fieldset>
    </>
  );
}

export default dynamic(() => Promise.resolve(DestinationNetworkInput), {
  ssr: false,
});
