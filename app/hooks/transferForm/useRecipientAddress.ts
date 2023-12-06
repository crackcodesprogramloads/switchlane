import { useState } from "react";
import { useAccount } from "wagmi";

export default function useRecipientAddress() {
  const [isSenderRecipient, setIsSenderRecipient] = useState(true);
  const [recipientAddress, setRecipientAddress] = useState("");

  const { address } = useAccount();

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
    destinationAddress: isSenderRecipient ? address : recipientAddress,
  };
}
