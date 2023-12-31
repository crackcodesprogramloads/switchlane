"use client";

import Image from "next/image";

import PROCESSING from "/public/processing.svg";
import COMPLETE from "/public/complete.svg";
import ERROR from "/public/error.svg";
import { TransferStep } from "../hooks/transferForm/useTransferModal";

export default function LoadingModal({
  openModal,
  closeTransferModal,
  transferSteps,
}: {
  openModal: boolean;
  closeTransferModal: () => void;
  transferSteps: TransferStep[];
}) {
  return openModal ? (
    <div className="z-50 fixed w-full h-full bg-gray-950/70 backdrop-blur-sm">
      <div className="z-50 fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[92%] sm:w-1/2 px-10 py-14 flex flex-col items-center justify-center gap-4 border-l border-t border-gray-600 rounded-lg bg-gray-950">
        {transferSteps.length >= 3 ||
        transferSteps.some((s) => s.status === "error") ? (
          <div
            onClick={closeTransferModal}
            className="absolute top-2 right-4 text-xl cursor-pointer"
          >
            X
          </div>
        ) : null}
        {/* todo: render based on which step we are on */}
        <h1 className="text-3xl font-semibold">Transfer in progress..</h1>
        <p className="text-xl font-semibold">
          Time estimate: 2 - 3 minutes, please do not close the window.
        </p>
        <div className="flex flex-col gap-4">
          {transferSteps.map((step, index) => {
            return (
              <div
                key={index}
                className="flex flex-row gap-4 items-center max-h-[70vh] overflow-y-auto"
              >
                <p className="text-lg">{step.text}</p>
                {step.status === "processing" && (
                  <Image
                    className="animate-spin"
                    src={PROCESSING}
                    alt="processing icon"
                    width={25}
                    height={25}
                  />
                )}
                {step.status === "completed" && (
                  <Image
                    src={COMPLETE}
                    alt="complete icon"
                    width={25}
                    height={25}
                  />
                )}
                {step.status === "error" && (
                  <Image
                    className="animate-pulse"
                    src={ERROR}
                    alt="error icon"
                    width={25}
                    height={25}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : null;
}
