"use client";

import { useContext } from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";
import {
  approveTransaction,
  checkAllowance,
  transfer,
} from "@/app/services/AlchemyAA/transfer";
import { parseEther } from "viem/utils";

import {
  SWITCHLANE_TRANSFER_CONTRACT_ADDRESS,
  TO_TOKEN_OPTIONS,
} from "@/app/constants";

import TEST_TOKEN from "/public/tokens/TestToken.svg";

import SendInput from "./Inputs/SendAmountInput";
import SelectToken, { SelectTokenModal } from "./Inputs/SelectToken";
import SendNetworkInput from "./Inputs/SendNetworkInput";
import ReceiveInput from "./Inputs/ReceiveInput";
import DestinationNetworkInput, {
  DestinationNetworkModal,
} from "./Inputs/DestinationNetworkInput";
import AddressInput from "./Inputs/AddressInput";
import LoadingModal from "../LoadingModal";
import { AAWalletProviderContext } from "../Navbar/Wallet/AAWalletProvider";
import EstimateCost from "./CostEstimate";

import useFormattedSendAmount from "@/app/hooks/transferForm/useFormattedSendAmount";
import useTokenModal from "@/app/hooks/transferForm/useTokenModal";
import useDestinationModal from "@/app/hooks/transferForm/useDestinationModal";
import useRecipientAddress from "@/app/hooks/transferForm/useRecipientAddress";
import useTransferModal from "@/app/hooks/transferForm/useTransferModal";
import useTokenBalances from "@/app/hooks/useTokenBalances";
import useTokenMetadata from "@/app/hooks/useTokenMetadata";

import TempInput from "./Inputs/TempInput";

export default function UserInterface() {
  const { provider: smartWalletProvider, smartWalletAddress } = useContext(
    AAWalletProviderContext
  );

  const { sendAmount, handleSendAmountChange } = useFormattedSendAmount();

  const { data: tokenBalances } = useTokenBalances({
    enabled: Boolean(smartWalletAddress) && Boolean(smartWalletProvider),
  });

  const tokenAddresses = [
    ...(tokenBalances ? tokenBalances.map((v) => v.contractAddress) : []),
  ];

  const [tokenMetaData] = useTokenMetadata({
    tokenAddresses,
    enabled: tokenAddresses.length !== 0,
    provider: smartWalletProvider,
  });

  const fromTokenOptions = tokenMetaData.map(({ symbol }, i) => ({
    name: symbol || "",
    icon: TEST_TOKEN,
    address: tokenAddresses[i],
  }));

  const {
    isSelectModalOpen: isFromSelectModalOpen,
    selectedToken: selectedFromToken,
    tokenAddress: selectedFromTokenAddress,
    toggleTokenModal: toggleFromSelectModal,
    setSelectedToken: setSelectedFromToken,
  } = useTokenModal({
    tokenOptions: fromTokenOptions,
  });

  const {
    isSelectModalOpen: isToSelectedModalOpen,
    selectedToken: selectedToToken,
    tokenAddress: selectedToTokenAddress,
    toggleTokenModal: toggleToSelectedModal,
    setSelectedToken: setSelectedToToken,
  } = useTokenModal({
    tokenOptions: TO_TOKEN_OPTIONS,
    defaultToken: TO_TOKEN_OPTIONS[0].name,
  });

  const {
    isDestinationNetworkModalOpen,
    destinationNetwork,
    toggleDestinationModal,
    setDestinationNetwork,
    destinationChainId,
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

  function validateFormInput() {
    // todo: validate form data
    if (!destinationAddress) {
      throw Error("Missing destination address");
    }

    if (!destinationChainId) {
      throw Error("Missing destination chain id");
    }

    if (!smartWalletProvider) {
      throw Error("Missing smart wallet provider");
    }

    if (!selectedFromTokenAddress) {
      throw Error("Missing selected from token");
    }

    if (!selectedToTokenAddress) {
      throw Error("Missing selected to token");
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    validateFormInput();

    toggleIsTransferOpen();
    updateTransferSteps({ newStep: defaultTransferSteps.signApproval });

    try {
      await approveTransaction({
        smartWalletProvider: smartWalletProvider!,
        tokenAddress: selectedFromTokenAddress! as `0x${string}`,
        amount: Number(parseEther(sendAmount)),
      });

      updateTransferSteps({
        isPreviousStepCompleted: true,
        newStep: defaultTransferSteps.receivedSignature,
      });

      await checkAllowance({
        smartWalletProvider: smartWalletProvider!,
        walletAddress: smartWalletAddress as `0x${string}`,
        spender: SWITCHLANE_TRANSFER_CONTRACT_ADDRESS,
        tokenAddress: selectedFromTokenAddress! as `0x${string}`,
        amount: Number(sendAmount),
      });

      updateTransferSteps({
        isPreviousStepCompleted: true,
        newStep: defaultTransferSteps.transferring,
      });

      const transferTx = await transfer({
        smartWalletProvider: smartWalletProvider!,
        transferArgs: {
          maxTolerance: 5000,
          sender: smartWalletAddress,
          receiver: destinationAddress!,
          fromToken: selectedFromTokenAddress!,
          toToken: selectedToTokenAddress!,
          destinationChain: destinationChainId as string | number,
          fromAmount: Number(parseEther(sendAmount)),
        },
      });

      updateTransferSteps({
        isPreviousStepCompleted: true,
        newStep: (
          <div className="w-full">
            <p>Transaction submitted.</p>
            <div className="w-full flex flex-row justify-between gap-4">
              <p>Transaction Hash: </p>
              <a
                className="cursor-pointer text-blue-400 underline"
                href={`https://mumbai.polygonscan.com/tx/${transferTx}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Block Explorer
              </a>
            </div>
          </div>
        ),
      });
      updateTransferSteps({
        isPreviousStepCompleted: true,
      });
    } catch (error: any) {
      handleTransferError(error);
    }
  }

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
      {isFromSelectModalOpen && (
        <SelectTokenModal
          tokenOptions={fromTokenOptions}
          currentToken={selectedFromToken}
          setCurrentToken={setSelectedFromToken}
          handleModalClose={() => toggleFromSelectModal(false)}
        />
      )}

      {isToSelectedModalOpen && (
        <SelectTokenModal
          tokenOptions={TO_TOKEN_OPTIONS}
          currentToken={selectedToToken}
          setCurrentToken={setSelectedToToken}
          handleModalClose={() => toggleToSelectedModal(false)}
        />
      )}

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="relative w-[98%] sm:w-[80%] md:w-[70%] lg:w-[52%] xl:w-[44%] h-[64%] flex flex-col items-center gap-3"
      >
        <LazyMotion features={domAnimation}>
          <div className="flex flex-col items-center w-full h-full gap-2">
            <m.div
              initial={{ y: "500%", opacity: 0.1 }}
              animate={{ y: "0", opacity: 1 }}
              transition={{ type: "spring", damping: 20, delay: 0.3 }}
              className="w-full h-[55%] sm:h-[45%] px-6 sm:px-10 flex flex-row items-center justify-center gap-4 sm:gap-12 border-l border-t border-gray-600 hover:border-gray-400 rounded-lg shadow-[0px_0px_50px] shadow-sky-700/70"
            >
              <div className="flex flex-col items-center justify-center w-1/2 h-full gap-3 py-0 sm:py-4">
                <SendInput
                  smartWalletAddress={smartWalletAddress}
                  fromTokenAddress={selectedFromTokenAddress}
                  value={sendAmount}
                  onChange={handleSendAmountChange}
                />
                <EstimateCost
                  fromToken={selectedFromTokenAddress}
                  toToken={selectedToTokenAddress}
                  amountFromToken={parseEther(sendAmount)}
                  amountToToken={parseEther(sendAmount)}
                  destinationChain={destinationChainId}
                />
              </div>
              <div className="flex flex-col items-center justify-center w-1/2 h-full gap-3 py-4">
                <SelectToken
                  title="From Token"
                  tokenOptions={fromTokenOptions}
                  token={selectedFromToken}
                  onClick={() => toggleFromSelectModal(true)}
                />
                <SendNetworkInput />
              </div>
            </m.div>
            <m.div
              initial={{ y: "500%", opacity: 0.1 }}
              animate={{ y: "0", opacity: 1 }}
              transition={{
                type: "spring",
                damping: 20,
                delay: 0.45,
              }}
              className="relative w-full sm:w-[85%] h-[45%] px-6 sm:px-10 flex flex-row items-center justify-center gap-4 sm:gap-12 border-l border-t border-gray-600 hover:border-gray-400 rounded-lg shadow-[0px_0px_50px] shadow-sky-700/70"
            >
              <div className="flex flex-col items-center justify-center w-1/2 h-full gap-3 py-4">
                <ReceiveInput
                  fromToken={selectedFromTokenAddress}
                  toToken={selectedToTokenAddress}
                  maxTolerance={5000}
                  fromAmount={Number(parseEther(sendAmount))}
                  destinationChain={destinationChainId as string | number}
                />
                <TempInput />
              </div>
              <div className="flex flex-col items-center justify-center w-1/2 h-full gap-3 py-4">
                <SelectToken
                  title="To Token"
                  tokenOptions={TO_TOKEN_OPTIONS}
                  token={selectedToToken}
                  onClick={() => toggleToSelectedModal(true)}
                />
                <DestinationNetworkInput
                  destinationNetwork={destinationNetwork}
                  onClick={() => toggleDestinationModal(true)}
                />
              </div>

              <span className="absolute z-50 text-5xl text-zinc-300 rotate-180 -top-8">
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
              delay: 0.75,
            }}
            className="w-[70%] sm:w-[55%] py-4 px-8 text-xl text-zinc-200 hover:text-zinc-50 font-semibold rounded-lg border-l border-t border-gray-400 hover:border-gray-300 shadow-[0px_0px_50px] shadow-sky-700/70 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-700"
          >
            Submit transfer
          </m.button>
        </LazyMotion>
      </form>
    </>
  );
}
