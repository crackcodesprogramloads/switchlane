import { DESTINATION_CHAINS } from "@/app/constants";
import { useState } from "react";

const DEFAULT_DESTINATION_NETWORK = "Ethereum";

export default function useDestinationModal() {
  const [destinationNetwork, setDestinationNetwork] = useState(
    DEFAULT_DESTINATION_NETWORK
  );
  const [isDestinationNetworkModalOpen, setIsDestinationNetworkModalOpen] =
    useState(false);

  function toggleDestinationModal(isOpen: boolean) {
    setIsDestinationNetworkModalOpen(isOpen);
  }

  DESTINATION_CHAINS.find(
    (chain) => chain.name.toLowerCase() === destinationNetwork.toLowerCase()
  )?.id;

  return {
    destinationNetwork,
    isDestinationNetworkModalOpen,
    toggleDestinationModal,
    setDestinationNetwork,
    destinationChainId: DESTINATION_CHAINS.find(
      (chain) => chain.name.toLowerCase() === destinationNetwork.toLowerCase()
    )?.id,
  };
}
