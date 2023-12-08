import { TokenOption } from "@/app/components/UserInterface/Inputs/SelectToken";
import { useState } from "react";

export default function useTokenModal({
  tokenOptions,
  defaultToken,
}: {
  tokenOptions: TokenOption[];
  defaultToken?: string;
}) {
  const [selectedToken, setSelectedToken] = useState(defaultToken);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);

  function toggleTokenModal(isOpen: boolean) {
    setIsSelectModalOpen(isOpen);
  }

  const selectedTokenWithDefault = selectedToken || tokenOptions[0]?.name;

  return {
    selectedToken: selectedTokenWithDefault,
    isSelectModalOpen,
    toggleTokenModal,
    setSelectedToken,
    tokenAddress: tokenOptions?.find(
      (token) =>
        token.name.toLowerCase() === selectedTokenWithDefault?.toLowerCase()
    )?.address,
  };
}
