"use client";

import { m, LazyMotion, domAnimation } from "framer-motion";

export default function Header() {
  return (
    <LazyMotion features={domAnimation}>
      <m.h1
        className="text-2xl font-light text-zinc-200 uppercase"
        initial={{ y: "-500%", opacity: 0.1 }}
        animate={{ y: "0", opacity: 1 }}
        transition={{
          type: "spring",
          damping: 20,
          delay: 0,
        }}
      >
        Move assets gas free and cross-chain
      </m.h1>
    </LazyMotion>
  );
}
