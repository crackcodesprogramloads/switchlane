"use client";

import { Dispatch, SetStateAction } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { m, LazyMotion, domAnimation } from "framer-motion";

import CLOSE_ICON from "/public/close.svg";

export type TokenOption = {
  address: string;
  name: string;
  icon: string;
};

export function SelectTokenModal({
  tokenOptions,
  currentToken,
  setCurrentToken,
  handleModalClose,
}: {
  tokenOptions: TokenOption[];
  currentToken?: string;
  setCurrentToken: Dispatch<SetStateAction<string | undefined>>;
  handleModalClose: () => void;
}) {
  const TokenOptions = tokenOptions.map((token, index) => {
    return (
      <button
        onClick={() => setCurrentToken(token.name)}
        key={index}
        className={`px-2 py-[6px] my-[2px] w-full h-full flex flex-row items-center gap-3 rounded-xl ${
          currentToken === token.name ? "bg-[#3898FF]" : "hover:bg-[#2e3036]"
        }`}
      >
        <Image src={token.icon} alt="token icon" width={35} height={35} />
        <p className="text-md">{token.name}</p>
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
            <h1 className="p-2 text-zinc-00 text-lg font-bold">Select token</h1>

            <div
              className="w-6 h-6 hover:scale-[1.1] flex items-center justify-center border border-gray-800 rounded-full bg-[#2e3036] cursor-pointer"
              onClick={handleModalClose}
            >
              <Image src={CLOSE_ICON} alt="close icon" width={10} height={10} />
            </div>
          </div>
          {TokenOptions}
        </m.div>
      </LazyMotion>
    </div>
  );
}

function SelectToken({
  title,
  tokenOptions,
  token,
  onClick,
}: {
  title: string;
  tokenOptions: TokenOption[];
  token?: string;
  onClick: () => void;
}) {
  const selectedToken = tokenOptions.find((c) => c.name === token);

  return (
    <fieldset className="w-full h-16 flex items-center text-zinc-200 border-dashed border-t border-gray-600">
      <legend className="ml-auto mr-auto px-2 text-md">{title}</legend>
      <button
        type="button"
        onClick={onClick}
        className="w-full h-full flex flex-row items-center justify-center gap-4"
      >
        {selectedToken ? (
          <>
            <Image
              src={selectedToken.icon}
              alt="token icon"
              width={35}
              height={35}
            />
            <p className="text-3xl font-light">{selectedToken.name}</p>
          </>
        ) : null}
      </button>
    </fieldset>
  );
}

export default dynamic(() => Promise.resolve(SelectToken), {
  ssr: false,
});
