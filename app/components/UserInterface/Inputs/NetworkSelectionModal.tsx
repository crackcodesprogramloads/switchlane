import React from "react";
import Image from "next/image";

export interface Network {
  name: string;
  imageSrc: string; // Path or URL to the image
}

interface NetworkSelectionModalProps {
  networks: Network[];
  onSelectNetwork: (network: Network) => void;
  showModal: boolean;
  setShowNetworkModal: (show: boolean) => void;
}

const NetworkSelectionModal: React.FC<NetworkSelectionModalProps> = ({
  networks,
  onSelectNetwork,
  showModal,
  setShowNetworkModal,
}) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="bg-rainbowGrey rounded-lg p-4">
        <div className="flex flex-col items-center">
          {networks.map((network) => (
            <button
              key={network.name}
              className="flex items-center p-2 hover:bg-gray-500 w-full"
              onClick={() => onSelectNetwork(network)}
            >
              <Image
                className="w-6 h-6 mr-2"
                src={network.imageSrc}
                alt={network.name}
                width={20}
                height={20}
              />
              {network.name}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowNetworkModal(false)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NetworkSelectionModal;
