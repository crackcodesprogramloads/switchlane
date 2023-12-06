import { useState } from "react";

const useFormattedSendAmount = () => {
  const [sendAmount, setSendAmount] = useState("");

  function handleSendAmountChange(e: any) {
    // todo: test amount input with gas sponsorship
    let amount = e.target.value;
    // Remove leading zeros unless it's a single zero
    amount = amount.replace(/^0+(?!$)/, "");
    // Remove leading decimal point if it's the first character
    if (amount.startsWith(".")) {
      amount = "0" + amount;
    }
    // Allow only digits and one decimal point
    amount = amount.replace(/[^0-9.]/g, "");

    if (!amount) {
      setSendAmount("");
      // handle error
      return;
    }

    if (amount.split(".").length > 2) {
      return;
    }

    setSendAmount(amount);
  }

  return { sendAmount, handleSendAmountChange };
};

export default useFormattedSendAmount;
