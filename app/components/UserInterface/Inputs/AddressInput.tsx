"use client";

import { useState } from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";

export default function AddressInput({ placeholder }: { placeholder: string }) {
  const [checked, setChecked] = useState(true);

  function handleCheckbox() {
    setChecked((prevState) => !prevState);
  }
  return (
    <LazyMotion features={domAnimation}>
      <m.fieldset
        initial={{ y: "500%", opacity: 0.1 }}
        animate={{ y: "0", opacity: 1 }}
        transition={{
          type: "spring",
          damping: 20,
          delay: 0.3,
        }}
        className="py-2 px-1 w-[70%] text-zinc-200 border-l border-t border-gray-600 hover:border-gray-400 rounded-lg shadow-[0px_0px_50px] shadow-sky-700/70"
      >
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
      </m.fieldset>
    </LazyMotion>
  );
}
