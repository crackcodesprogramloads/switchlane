"use client";

import Image from "next/image";
import LogoIcon from "/public/logo.svg";
import { m, LazyMotion, domAnimation } from "framer-motion";

export default function Logo() {
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
        className="flex flex-row items-center gap-4"
      >
        <Image priority src={LogoIcon} alt="logo" width={50} height={50} />
        <a className="text-zinc-200 text-3xl font-semibold" href="/">
          Switchlane
        </a>
      </m.div>
    </LazyMotion>
  );
}
