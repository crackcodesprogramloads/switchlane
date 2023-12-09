import { useContext, useState } from "react";
import { AAWalletProviderContext } from "@/app/components/Navbar/Wallet/AAWalletProvider";
import { useAccount } from "wagmi";

export default function useRecipientAddress() {
  const [isSenderRecipient, setIsSenderRecipient] = useState(true);
  const [recipientAddress, setRecipientAddress] = useState("");

  const { address } = useAccount(); // EOA
  const { smartWalletAddress } = useContext(AAWalletProviderContext); // Smart wallet

  function toggleIsSenderRecipient() {
    setIsSenderRecipient((prevState) => !prevState);
  }

  function handleRecipientAddress(e: any) {
    // todo: accept ens domains for each chain
    setRecipientAddress(e.target.value);
  }

  return {
    isSenderRecipient,
    recipientAddress,
    toggleIsSenderRecipient,
    handleRecipientAddress,
    destinationAddress: isSenderRecipient
      ? smartWalletAddress
      : recipientAddress,
  };
}
