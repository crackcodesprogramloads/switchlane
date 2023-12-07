"use client";

import { ReactNode } from "react";

export default function Button({
  children,
  width,
  onClick,
  loading,
}: {
  children?: ReactNode;
  width?: string;
  onClick?: () => void;
  loading?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`${width} py-4 px-8 text-xl text-zinc-200 hover:text-zinc-50 font-semibold border-l border-t border-gray-600 hover:border-gray-400 rounded-lg shadow-[0px_0px_50px] shadow-sky-700/70`}
    >
      {loading ? <p>loading...</p> : children}
    </button>
  );
}
