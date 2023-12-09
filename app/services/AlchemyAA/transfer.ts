import { encodeFunctionData, formatEther } from "viem";
import ERC20Abi from "../../abi/ERC20_Token_Abi.json";
import { SWITCHLANE_TRANSFER_CONTRACT_ADDRESS } from "@/app/constants";
import { readContract } from "wagmi/actions";
import type { AlchemyProvider } from "@alchemy/aa-alchemy";
import { Alchemy } from "alchemy-sdk";

import SWITCHLANE_ABI from "../../abi/Switchlane.json";

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

  console.log({ tokenAddress });
  console.log({ amount });

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

  console.log({ walletAddress });
  console.log({ spender });

  const allowanceAmount = Number(formatEther(data as bigint));

  if (allowanceAmount !== amount) {
    throw new Error("Does not have the correct allowance");
  }

  return data;
}

export async function transfer({
  smartWalletProvider,
  transferArgs: {
    sender,
    receiver,
    fromToken,
    toToken,
    destinationChain,
    amount,
    minimumReceiveAmount,
  },
}: {
  smartWalletProvider: AlchemyProvider & Alchemy;
  transferArgs: {
    sender: string;
    receiver: string;
    fromToken: string;
    toToken: string;
    destinationChain: number;
    amount: number;
    minimumReceiveAmount: number;
  };
}) {
  // function switchlaneExactInput(
  //   address sender, who?
  //   address receiver,
  //   address fromToken,
  //   address toToken,
  //   uint64 destinationChain,
  //   uint256 amount,
  //   uint256 minimumReceiveAmount

  console.log({
    sender,
    receiver,
    fromToken,
    toToken,
    destinationChain,
    amount,
    minimumReceiveAmount,
  });

  const { hash } = await smartWalletProvider.sendUserOperation({
    target: SWITCHLANE_TRANSFER_CONTRACT_ADDRESS,
    data: encodeFunctionData({
      abi: SWITCHLANE_ABI,
      functionName: "switchlaneExactInput",

      args: [
        sender,
        receiver,
        fromToken,
        toToken,
        destinationChain,
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
