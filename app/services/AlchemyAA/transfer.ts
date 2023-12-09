import { encodeFunctionData, formatEther } from "viem";
import ERC20Abi from "../../abi/ERC20_Token_Abi.json";
import { SWITCHLANE_TRANSFER_CONTRACT_ADDRESS } from "@/app/constants";
import { readContract } from "wagmi/actions";
import type { AlchemyProvider } from "@alchemy/aa-alchemy";
import { Alchemy } from "alchemy-sdk";

export async function approveTransaction({
  smartWalletProvider,
  tokenAddress,
  amount,
}: {
  smartWalletProvider: AlchemyProvider & Alchemy;
  tokenAddress: `0x${string}`;
  amount: number;
}) {
  const { hash } = await smartWalletProvider.sendUserOperation({
    target: tokenAddress,
    data: encodeFunctionData({
      abi: ERC20Abi,
      // approve(address _spender, uint256 _value)
      functionName: "approve",
      args: [SWITCHLANE_TRANSFER_CONTRACT_ADDRESS, amount],
    }),
  });

  const txHash = await smartWalletProvider.waitForUserOperationTransaction(
    hash as `0x${string}`
  );

  return txHash;
}

export async function checkAllowance({
  walletAddress,
  spender,
  tokenAddress,
  amount,
}: {
  smartWalletProvider: AlchemyProvider & Alchemy;
  walletAddress: `0x${string}`;
  spender: `0x${string}`;
  tokenAddress: `0x${string}`;
  amount: number;
}) {
  const data = await readContract({
    address: tokenAddress,
    abi: ERC20Abi,
    // allowance(address _owner, address _spender)
    functionName: "allowance",
    args: [walletAddress, spender],
  });

  const allowanceAmount = Number(formatEther(data as bigint));

  if (allowanceAmount !== amount) {
    throw new Error("Does not have the correct allowance");
  }

  return data;
}

export async function transfer({
  smartWalletProvider,
  walletAddress,
  destinationChainId,
  recipientAddress,
  tokenAddress,
  amount,
  minimumReceiveAmount,
}: {
  smartWalletProvider: AlchemyProvider & Alchemy;
  walletAddress: string;
  destinationChainId: number;
  recipientAddress: string;
  tokenAddress: `0x${string}`;
  amount: number;
  minimumReceiveAmount: number;
}) {
  // function switchlaneExactInput(
  //   address sender,
  //   address receiver,
  //   address fromToken,
  //   address toToken,
  //   uint64 destinationChain,
  //   uint256 amount,
  //   uint256 minimumReceiveAmount

  const { hash } = await smartWalletProvider.sendUserOperation({
    target: SWITCHLANE_TRANSFER_CONTRACT_ADDRESS,
    data: encodeFunctionData({
      abi: ERC20Abi,
      functionName: "switchlaneExactInput",

      args: [
        walletAddress,
        recipientAddress,
        tokenAddress, // fromTokenAddress
        tokenAddress, // toTokenAddress
        destinationChainId, // toNetwork
        amount,
        minimumReceiveAmount,
      ],
    }),
  });

  const txHash = await smartWalletProvider.waitForUserOperationTransaction(
    hash as `0x${string}`
  );
  console.log({ txHash });

  return txHash;
}
