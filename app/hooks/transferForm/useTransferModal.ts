import { ReactNode, useState } from "react";

export type TransferStep = { status: string; text: ReactNode };

export default function useTransferModal() {
  const defaultTransferSteps = {
    signApproval: "Please sign approval for our contract to send your tokens.",
    receivedSignature: "Signature received, checking allowance.",
    transferring: "Please sign to confirm transfer.",
    waitingOnTxHash: "Waiting for transaction hash.",
  };

  const [transferSteps, setTransferSteps] = useState<TransferStep[]>([]);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  function toggleIsTransferOpen() {
    setIsTransferModalOpen((prev) => !prev);
  }

  function closeTransferModal() {
    setTransferSteps([]);
    setIsTransferModalOpen(false);
  }

  function updateTransferSteps({
    isPreviousStepCompleted,
    newStep,
  }: {
    isPreviousStepCompleted?: boolean;
    newStep?: ReactNode;
  }) {
    setTransferSteps((prev) => {
      if (isPreviousStepCompleted && prev[prev.length - 1]?.status) {
        prev[prev.length - 1].status = "completed";
      }

      if (!newStep) return [...prev];

      return [
        ...prev,
        {
          status: "processing",
          text: newStep,
        },
      ];
    });
  }

  function handleTransferError(error: any) {
    console.log("error: ", error.message);
    setTransferSteps((prev) => {
      prev[prev.length - 1].status = "error";
      let customErrorMessage = error.message;

      if (error.message.includes("User rejected signing")) {
        customErrorMessage = "User rejected approval to spend tokens.";
        // todo: check error handling for coin transfer
      }

      return [
        ...prev,
        {
          status: "error",
          text: customErrorMessage,
        },
      ];
    });
  }

  return {
    isTransferModalOpen,
    toggleIsTransferOpen,
    closeTransferModal,
    transferSteps,
    updateTransferSteps,
    defaultTransferSteps,
    handleTransferError,
  };
}
