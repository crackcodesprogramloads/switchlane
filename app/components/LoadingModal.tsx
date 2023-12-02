"use client";

import Image from "next/image";

import PROCESSING from "/public/processing.svg";
import COMPLETE from "/public/complete.svg";
import ERROR from "/public/error.svg";

export default function LoadingModal({
  openModal,
  setOpenModal,
  processTransferSteps,
}: {
  openModal: boolean;
  setOpenModal: () => void;
  processTransferSteps: { text: string; status: string }[];
}) {
  return openModal ? (
    <div className="z-50 fixed w-full h-full bg-gray-950/70 backdrop-blur-sm">
      <div className="z-50 fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-1/2 px-10 py-14 flex flex-col items-center justify-center gap-4 border-l border-t border-gray-600 rounded-lg bg-gray-950">
        {processTransferSteps.length >= 3 ||
        processTransferSteps.some((s) => s.status === "error") ? (
          <div
            onClick={setOpenModal}
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
          {processTransferSteps.map((step) => {
            return (
              <div key={step.text} className="flex flex-row gap-4 items-center">
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
