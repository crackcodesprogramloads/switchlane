"use client";

import { m, LazyMotion, domAnimation } from "framer-motion";

export default function Button({
  text,
  width,
}: {
  text: string;
  width?: string;
}) {
  return (
    <LazyMotion features={domAnimation}>
      <m.button
        initial={{ y: "-200%", opacity: 0.1 }}
        animate={{ y: "0", opacity: 1 }}
        transition={{
          type: "spring",
          damping: 20,
          delay: 0,
        }}
        className={`${width} py-4 px-8 text-xl text-zinc-200 hover:text-zinc-50 font-semibold border-l border-t border-gray-600 hover:border-gray-400 rounded-lg shadow-[0px_0px_50px] shadow-sky-700/70`}
      >
        {text}
      </m.button>
    </LazyMotion>
  );
}
