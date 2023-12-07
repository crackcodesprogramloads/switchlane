import { TOKENS } from "@/app/constants";
import { useState } from "react";

const DEFAULT_TOKEN = "Ethereum";

export default function useTokenModal() {
  const [currentToken, setCurrentToken] = useState(DEFAULT_TOKEN);
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);

  function toggleTokenModal(isOpen: boolean) {
    setIsTokenModalOpen(isOpen);
  }

  return {
    currentToken,
    isTokenModalOpen,
    toggleTokenModal,
    setCurrentToken,
    tokenAddress: TOKENS.find(
      (token) => token.name.toLowerCase() === currentToken.toLowerCase()
    )?.address,
  };
}
