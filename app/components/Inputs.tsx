"use client";

import Image from "next/image";

import Polygon from "/public/chains/Polygon.svg";

import Matic from "/public/tokens/Matic.svg";
import Eth from "/public/tokens/Eth.svg";

import { useState } from "react";

export function NetworkInput({
  title,
  side,
  chain,
}: {
  title: string;
  side: string;
  chain: string;
}) {
  return (
    <fieldset className="w-full h-1/2 flex items-center text-zinc-200 border-dashed border-t border-gray-600">
      <legend className="ml-auto mr-auto px-2 text-md">{title}</legend>
      <span className="w-full h-full flex flex-row items-center justify-center gap-4 text-3xl">
        {chain}
        <Image
          className="p-1 border rounded-full bg-white"
          src={Polygon}
          alt="Polygon"
          width={40}
          height={40}
        />
      </span>
    </fieldset>
  );
}

export function TokenInput({
  title,
  token,
}: {
  title: string;
  token?: string;
}) {
  return (
    <fieldset className="w-full h-1/2 flex items-center text-zinc-200 border-dashed border-t border-gray-600">
      <legend className="ml-auto mr-auto px-2 text-md">{title}</legend>
      <span className="w-full h-full flex flex-row items-center justify-center gap-4 text-3xl">
        {token}
        {token === "Matic" ? (
          <Image
            className="p-1 border rounded-full bg-white"
            src={Matic}
            alt="Matic"
            width={40}
            height={40}
          />
        ) : (
          <Image
            className="p-1 border rounded-full bg-white"
            src={Eth}
            alt="Eth"
            width={40}
            height={40}
          />
        )}
      </span>
    </fieldset>
  );
}

export function AmountInput({
  title,
  button,
  showBalance,
}: {
  title: string;
  button: boolean;
  showBalance: boolean;
}) {
  return (
    <fieldset
      className={`w-full h-1/2 px-2 flex flex-col items-center justify-around text-zinc-200 border-dashed border-t border-gray-600`}
    >
      <legend className="ml-auto mr-auto px-2 text-lg">{title}</legend>
      <span className="w-full flex flex-row items-center justify-between">
        {button ? (
          <button className="w-1/4 h-3/4 px-auto py-auto text-zinc-200 text-md border rounded-lg">
            Max
          </button>
        ) : null}
        <input
          type="number"
          id="amount"
          name="amount"
          className="w-2/3 h-full outline-none text-4xl text-end bg-transparent"
          placeholder="0.00"
        />
      </span>
      {showBalance && (
        <span className="w-full h-3 flex flex-row justify-between">
          <h5 className="text-zinc-200">Balance:</h5>
          <h6 className="text-zinc-200">10 Matic</h6>
        </span>
      )}
    </fieldset>
  );
}

export function AddressInput({ placeholder }: { placeholder: string }) {
  const [checked, setChecked] = useState(true);

  function handleCheckbox() {
    setChecked((prevState) => !prevState);
  }
  return (
    <fieldset className="py-2 px-1 w-[70%] text-zinc-200 border-l border-t border-gray-600 hover:border-gray-400 rounded-lg shadow-[0px_0px_60px] shadow-sky-700/70">
      <span className="h-10 container flex flex-row items-center justify-center gap-2">
        <label
          htmlFor="checkbox"
          className="w-max container flex flex-row items-center gap-2"
        >
          <input
            type="checkbox"
            id="checkbox"
            name="checkbox"
            className="outline-none w-5 h-5 bg-transparent text-lg text-black"
            checked={checked}
            onChange={handleCheckbox}
          />
          {checked ? "Send funds to my address" : ""}
        </label>
        {!checked && (
          <input
            type="address"
            id="address"
            name="address"
            className="w-[90%] outline-none border-dashed border-b text-center text-md bg-transparent"
            placeholder={checked ? "" : placeholder}
          />
        )}
      </span>
    </fieldset>
  );
}
