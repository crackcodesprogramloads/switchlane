"use client";

import { useState } from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";
import {
  approveTransaction,
  checkAllowance,
  transfer,
} from "@/app/services/zeroDev/transfer";

import { useEcdsaProvider } from "@zerodev/wagmi";
import { useAccount, useBalance } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { parseEther } from "viem";

import {
  DUMMY_ERC20_TOKEN_ADDRESS,
  SWITCHLANE_TRANSFER_CONTRACT_ADDRESS,
} from "@/app/constants";

import AddressInput from "./Inputs/AddressInput";
import SendInput from "./Inputs/SendInput";
import NetworkInput from "./Inputs/NetworkInput";
import TokenInput from "./Inputs/TokenInput";
import ReceiveInput from "./Inputs/ReceiveInput";
import LoadingModal from "../LoadingModal";

import ContractProtocolFeeReader from "../ContractInterface/ContractProtocolFeeReader";
import NetworkSelectionModal, { Network } from "./Inputs/NetworkSelectionModal";

export default function UserInterface() {
  const networks = [
    { name: "Ethereum", imageSrc: "/chains/ethereum-icon.png" },
    { name: "Polygon", imageSrc: "/chains/polygon-icon.png" },
    // ... other networks
  ];
  const defaultNetwork =
    networks.find((n) => n.name === "Ethereum") || networks[0];
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(
    defaultNetwork
  );
  const [showNetworkModal, setShowNetworkModal] = useState(false);

  const handleSelectNetwork = (network: Network) => {
    setSelectedNetwork(network);
    setShowNetworkModal(false); // Close the modal after selection
  };
  const [openModal, setOpenModal] = useState(false);
  const [processTransferSteps, setProcessTransferSteps] = useState<
    { status: string; text: string }[]
  >([]);

  const [sendTokenAddress, setSendTokenAddress] = useState<`0x${string}`>(
    DUMMY_ERC20_TOKEN_ADDRESS
  );
  const [sendAmount, setSendAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");

  const [checked, setChecked] = useState(true);
  const [recipientAddress, setRecipientAddress] = useState("");

  const ecdsaProvider = useEcdsaProvider();
  const { address } = useAccount();

  function handleSendAmountChange(e: any) {
    //todo: test amount input with gas sponsorship
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
    setSendAmount(amount);
  }

  function handleAddressCheckbox() {
    setChecked((prevState) => !prevState);
  }

  function handleRecipientAddress(e: any) {
    // todo: accept ens domains for each chain
    setRecipientAddress(e.target.value);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (!address) {
      // handle error
      return;
    }

    if (!ecdsaProvider) {
      // handle error
      return;
    }

    if (!sendAmount) {
      // handle error
      return;
    }

    if (!sendTokenAddress) {
      // handle error
      return;
    }

    const destinationAddress = checked ? address : recipientAddress;

    if (!destinationAddress) {
      // handle error
      return;
    }

    setOpenModal((prevState) => !prevState);
    setProcessTransferSteps((prev) => {
      return [
        ...prev,
        {
          status: "processing",
          text: "Please sign approval for our contract to send your tokens.",
        },
      ];
    });

    try {
      await approveTransaction({
        ecdsaProvider,
        tokenAddress: sendTokenAddress,
        amount: Number(parseEther(sendAmount)),
      });

      setProcessTransferSteps((prev) => {
        prev[prev.length - 1].status = "completed";

        return [
          ...prev,
          {
            status: "processing",
            text: "Signature received, checking allowance.",
          },
        ];
      });

      await checkAllowance({
        ecdsaProvider,
        walletAddress: address,
        spender: SWITCHLANE_TRANSFER_CONTRACT_ADDRESS,
        tokenAddress: sendTokenAddress,
        amount: Number(sendAmount),
      });

      setProcessTransferSteps((prev) => {
        prev[prev.length - 1].status = "completed";

        return [
          ...prev,
          {
            status: "processing",
            text: "Transferring funds...",
          },
        ];
      });

      // const transferTx = await transfer({
      //   ecdsaProvider,
      //   destinationChainId: polygonMumbai.id,
      //   recipientAddress: destinationAddress,
      //   tokenAddress: sendTokenAddress,
      //   amount: Number(inputAmount),
      // });

      setProcessTransferSteps((prev) => {
        prev[prev.length - 1].status = "completed";
        console.log(prev.length);
        return [...prev];
      });

      // reset();
    } catch (error: any) {
      console.log(error.message);
      setProcessTransferSteps((prev) => {
        prev[prev.length - 1].status = "error";
        let customErrorMessage = error.message;

        if (error.message.includes("user rejected signing")) {
          customErrorMessage = "User rejected approval to spend tokens.";
          // todo: check error handling for coin transfer
        }

        return [
          ...prev,
          {
            status: "error",
            text: customErrorMessage,
          },
        ];
      });
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
        openModal={openModal}
        setOpenModal={() => {
          setProcessTransferSteps([]);
          setOpenModal(false);
        }}
        processTransferSteps={processTransferSteps}
      />
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
              // className="w-full h-1/2 px-12 flex flex-row items-center justify-center gap-12 border-l border-t border-gray-600 hover:border-gray-400 rounded-lg shadow-[0px_0px_50px] shadow-sky-700/70"
              // className="w-full h-1/2 px-12 flex flex-col justify-between items-center gap-12 border-l border-t border-gray-600 hover:border-gray-400 rounded-lg shadow-[0px_0px_50px] shadow-sky-700/70"
              className="w-full h-1/2 px-12 flex flex-col justify-between items-center gap-12 border-l border-t border-gray-600 hover:border-gray-400 rounded-lg shadow-[0px_0px_50px] shadow-sky-700/70"
            >
              <div className="flex items-center w-full">
                <span className="w-1/2 py-6 flex flex-col items-center justify-center gap-4">
                  <SendInput
                    value={sendAmount}
                    onChange={handleSendAmountChange}
                  />
                  <TokenInput title="GAS" token="Eth" />
                </span>

                <span className="w-1/2 py-6 flex flex-col items-center justify-center gap-4">
                  <TokenInput title="Token" token="Matic" />
                  {/* <NetworkInput title="Network" side="From" chain="Polygon" /> */}
                  <div>
                    <button
                      onClick={() => setShowNetworkModal(true)}
                      className="flex items-center"
                    >
                      {selectedNetwork ? (
                        <>
                          <img
                            src={selectedNetwork.imageSrc}
                            alt={selectedNetwork.name}
                            className="w-6 h-6 mr-2"
                          />
                          <span>{selectedNetwork.name}</span>
                        </>
                      ) : (
                        <span>Select Network</span>
                      )}
                    </button>
                    {/* {selectedNetwork && (
                      <div>
                        <img
                          src={selectedNetwork.imageSrc}
                          alt={selectedNetwork.name}
                          className="w-6 h-6 mr-2"
                        />
                        {selectedNetwork.name}
                      </div>
                    )} */}

                    <NetworkSelectionModal
                      networks={networks}
                      onSelectNetwork={handleSelectNetwork}
                      showModal={showNetworkModal}
                      setShowNetworkModal={setShowNetworkModal}
                    />
                  </div>
                  {/* <NetworkSelectionModal /> */}
                </span>
              </div>
              <div className="flex justify-center items-center w-full">
                <ContractProtocolFeeReader
                  // fromToken={sendTokenAddress}
                  fromToken={"0x326c977e6efc84e512bb9c30f76e30c160ed06fb"}
                  // toToken={receiveTokenAddress}
                  toToken={"0xf1e3a5842eeef51f2967b3f05d45dd4f4205ff40"}
                  amountFromToken={sendAmount}
                  // amountToToken={receiveAmount}
                  amountToToken={1}
                  // destinationChain={destinationChain}
                  destinationChain={"16015286601757825753"} //sepolia?
                />
              </div>
            </m.div>
            {/* <div>
              <ContractProtocolFeeReader
                // fromToken={sendTokenAddress}
                fromToken={"0x326c977e6efc84e512bb9c30f76e30c160ed06fb"}
                // toToken={receiveTokenAddress}
                toToken={"0xf1e3a5842eeef51f2967b3f05d45dd4f4205ff40"}
                amountFromToken={sendAmount}
                // amountToToken={receiveAmount}
                amountToToken={1}
                // destinationChain={destinationChain}
                destinationChain={"16015286601757825753"} //sepolia?
              />
            </div> */}
            <m.span
              initial={{ y: "500%", opacity: 0.1 }}
              animate={{ y: "0", opacity: 1 }}
              transition={{
                type: "spring",
                damping: 20,
                delay: 0.15,
              }}
              className="relative w-[85%] h-2/3 px-16 flex flex-row items-center justify-center gap-20 border-l border-t border-gray-600 hover:border-gray-400 rounded-lg shadow-[0px_0px_50px] shadow-sky-700/70"
            >
              <ReceiveInput value={sendAmount} />
              <NetworkInput title="Network" side="To" chain="Polygon" />

              <span className="z-50 absolute -top-8 rotate-180 text-5xl">
                𐊾
              </span>
            </m.span>

            <AddressInput
              placeholder="Recipient address 0x..."
              checkboxOnChange={handleAddressCheckbox}
              addressOnChange={handleRecipientAddress}
              recipientAddress={recipientAddress}
              checked={checked}
            />
          </div>

          <m.button
            type="submit"
            disabled={openModal}
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
