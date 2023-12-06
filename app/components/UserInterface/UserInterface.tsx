"use client";

import { useState } from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";

import { useChainModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import {
  DUMMY_ERC20_TOKEN_ADDRESS,
  SWITCHLANE_TRANSFER_CONTRACT_ADDRESS,
} from "@/app/constants";

import SendInput from "./Inputs/SendAmountInput";
import TokenInput from "./Inputs/TokenInput";
import ContractProtocolFeeReader from "../ContractInterface/ContractProtocolFeeReader";
import SendNetworkInput from "./Inputs/SendNetworkInput";
import ReceiveInput from "./Inputs/ReceiveInput";
import DestinationNetworkInput, {
  DestinationNetworkModal,
} from "./Inputs/DestinationNetworkInput";
import AddressInput from "./Inputs/AddressInput";
import LoadingModal from "../LoadingModal";

import useFormattedSendAmount from "@/app/hooks/transferForm/useFormattedSendAmount";
import useDestinationModal from "@/app/hooks/transferForm/useDestinationModal";
import useRecipientAddress from "@/app/hooks/transferForm/useRecipientAddress";
import useTransferModal from "@/app/hooks/transferForm/useTransferModal";

export default function UserInterface() {
  const { sendAmount, handleSendAmountChange } = useFormattedSendAmount();

  const {
    isDestinationNetworkModalOpen,
    destinationNetwork,
    toggleDestinationModal,
    setDestinationNetwork,
  } = useDestinationModal();

  const {
    isSenderRecipient,
    recipientAddress,
    destinationAddress,
    toggleIsSenderRecipient,
    handleRecipientAddress,
  } = useRecipientAddress();

  const {
    isTransferModalOpen,
    transferSteps,
    toggleIsTransferOpen,
    closeTransferModal,
    updateTransferSteps,
    defaultTransferSteps,
    handleTransferError,
  } = useTransferModal();

  const [sendTokenAddress, setSendTokenAddress] = useState<`0x${string}`>(
    DUMMY_ERC20_TOKEN_ADDRESS
  );
  const [receiveAmount, setReceiveAmount] = useState("");

  function validateFormInput() {
    // todo: validate form data
    if (!destinationAddress) {
      throw Error("Missing destination address");
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    validateFormInput();

    toggleIsTransferOpen();
    updateTransferSteps({ newStep: defaultTransferSteps.signApproval });

    try {
      // await approveTransaction({
      //   ecdsaProvider,
      //   tokenAddress: sendTokenAddress,
      //   amount: Number(parseEther(sendAmount)),
      // });

      updateTransferSteps({
        isPreviousStepCompleted: true,
        newStep: defaultTransferSteps.receivedSignature,
      });

      // await checkAllowance({
      //   ecdsaProvider,
      //   walletAddress: address,
      //   spender: SWITCHLANE_TRANSFER_CONTRACT_ADDRESS,
      //   tokenAddress: sendTokenAddress,
      //   amount: Number(sendAmount),
      // });

      updateTransferSteps({
        isPreviousStepCompleted: true,
        newStep: defaultTransferSteps.transferring,
      });

      // const transferTx = await transfer({
      //   ecdsaProvider,
      //   destinationChainId: polygonMumbai.id,
      //   recipientAddress: destinationAddress,
      //   tokenAddress: sendTokenAddress,
      //   amount: Number(inputAmount),
      // });

      updateTransferSteps({ isPreviousStepCompleted: true });

      // reset();
    } catch (error: any) {
      handleTransferError(error);
    }
  }

  // function reset() {
  //   setInputAmount(0);
  //   setReceiveEstimate(0);
  //   setSendTokenAddress(DUMMY_ERC20_TOKEN_ADDRESS);
  // }

  return (
    <>
      <LoadingModal
        openModal={isTransferModalOpen}
        closeTransferModal={closeTransferModal}
        transferSteps={transferSteps}
      />
      {isDestinationNetworkModalOpen && (
        <DestinationNetworkModal
          destinationNetwork={destinationNetwork}
          setDestinationNetwork={setDestinationNetwork}
          handleModalClose={() => toggleDestinationModal(false)}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="relative w-[80%] md:w-[50%] lg:w-[45%] xl:w-[42%] h-[60%] flex flex-col items-center gap-3"
      >
        <LazyMotion features={domAnimation}>
          <div className="w-full h-full gap-3 flex flex-col items-center">
            <m.div
              initial={{ y: "500%", opacity: 0.1 }}
              animate={{ y: "0", opacity: 1 }}
              transition={{ type: "spring", damping: 20, delay: 0 }}
              className="w-full h-1/2 px-12 flex flex-row items-center justify-center gap-12 border-l border-t border-gray-600 hover:border-gray-400 rounded-lg shadow-[0px_0px_50px] shadow-sky-700/70"
            >
              <div className="w-1/2 h-full py-6 flex flex-col items-center justify-center gap-4">
                <SendInput
                  value={sendAmount}
                  onChange={handleSendAmountChange}
                />
                <TokenInput title="GAS" token="Eth" />
                {/* <ContractProtocolFeeReader
                  // fromToken={sendTokenAddress}
                  fromToken={"0x326c977e6efc84e512bb9c30f76e30c160ed06fb"}
                  // toToken={receiveTokenAddress}
                  toToken={"0xf1e3a5842eeef51f2967b3f05d45dd4f4205ff40"}
                  amountFromToken={sendAmount}
                  // amountToToken={receiveAmount}
                  amountToToken={1}
                  // destinationChain={destinationChain}
                  destinationChain={"16015286601757825753"} //sepolia?
                /> */}
              </div>
              <div className="w-1/2 h-full py-6 flex flex-col items-center justify-center gap-4">
                {/* todo: dynamic token input */}
                <TokenInput title="Token" token="Matic" />
                <SendNetworkInput />
              </div>
            </m.div>
            <m.div
              initial={{ y: "500%", opacity: 0.1 }}
              animate={{ y: "0", opacity: 1 }}
              transition={{
                type: "spring",
                damping: 20,
                delay: 0.15,
              }}
              className="w-[85%] h-1/2 px-12 flex flex-row items-center justify-center gap-12 border-l border-t border-gray-600 hover:border-gray-400 rounded-lg shadow-[0px_0px_50px] shadow-sky-700/70"
            >
              <ReceiveInput value={sendAmount} />
              <DestinationNetworkInput
                destinationNetwork={destinationNetwork}
                onClick={() => toggleDestinationModal(true)}
              />

              <span className="z-50 absolute -top-8 rotate-180 text-5xl">
                𐊾
              </span>
            </m.div>

            <AddressInput
              checkboxOnChange={toggleIsSenderRecipient}
              addressOnChange={handleRecipientAddress}
              recipientAddress={recipientAddress}
              checked={isSenderRecipient}
            />
          </div>

          <m.button
            type="submit"
            disabled={isTransferModalOpen}
            initial={{ y: "500%", opacity: 0.1 }}
            animate={{ y: "0", opacity: 1 }}
            transition={{
              type: "spring",
              damping: 20,
              delay: 0.45,
            }}
            className="w-[55%] py-4 px-8 text-xl text-zinc-200 hover:text-zinc-50 font-semibold border-l border-t border-gray-600 hover:border-gray-400 rounded-lg shadow-[0px_0px_50px] shadow-sky-700/70"
          >
            Submit transfer
          </m.button>
        </LazyMotion>

        {/* {chain?.blockExplorers?.default.url && (
            <a
              href={`${chain?.blockExplorers?.default.url}/address/${address}#tokentxnsErc721`}
              target="_blank"
            >
              Block Explorer
            </a>
          )} */}
      </form>
    </>
  );
}
