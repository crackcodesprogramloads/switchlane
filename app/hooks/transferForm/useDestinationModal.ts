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

  return {
    destinationNetwork,
    isDestinationNetworkModalOpen,
    toggleDestinationModal,
    setDestinationNetwork,
  };
}
