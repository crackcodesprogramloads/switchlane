"use client";

import Image from "next/image";
import Link from "next/link";
import { m, LazyMotion, domAnimation } from "framer-motion";

import GITHUB from "/public/github.svg";
import TWITTER from "/public/twitter.svg";
import EMAIL from "/public/email.svg";

export default function Footer() {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="fixed bottom-0 w-screen h-14 px-6 sm:px-12 py-4 sm:py-6 flex flex-row items-center justify-between"
        initial={{ y: "200%", opacity: 0.1 }}
        animate={{ y: "0", opacity: 1 }}
        transition={{
          type: "spring",
          damping: 20,
          delay: 0,
        }}
      >
        <div className="flex flex-row gap-2 text-md">
          <p>Powered by Chainlink</p>
        </div>
        <div className="flex flex-row gap-4">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/crackcodesprogramloads/switchlane"
          >
            <Image
              className="cursor-pointer hover:scale-[1.1]"
              src={GITHUB}
              alt="github icon"
              width={34}
              height={34}
            />
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/switchxlane"
          >
            <Image
              className="cursor-pointer hover:scale-[1.1]"
              src={TWITTER}
              alt="twitter icon"
              width={34}
              height={34}
            />
          </a>
          <a rel="noopener noreferrer" target="_blank" href="">
            <Image
              className="cursor-pointer hover:scale-[1.1]"
              src={EMAIL}
              alt="email icon"
              width={34}
              height={34}
            />
          </a>
        </div>
      </m.div>
    </LazyMotion>
  );
}
