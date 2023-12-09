"use client";

import Image from "next/image";
import LogoIcon from "/public/Logo.svg";
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
        className="flex flex-row items-end"
      >
        <Image priority src={LogoIcon} alt="logo" width={40} height={40} />
        <Image
          priority
          className="translate-y-2 -translate-x-5 transform -scale-x-100"
          src={LogoIcon}
          alt="logo"
          width={40}
          height={40}
        />
        <a className="text-zinc-200 text-3xl font-semibold" href="/">
          Switchlane
        </a>
      </m.div>
    </LazyMotion>
  );
}
