import type { ECDSAProvider } from "@zerodev/sdk";
import { encodeFunctionData, formatEther } from "viem";
import ERC20Abi from "../../abi/ERC20_Token_Abi.json";
import { SWITCHLANE_TRANSFER_CONTRACT_ADDRESS } from "@/app/constants";
import { waitForTransaction, readContract } from "wagmi/actions";

export async function approveTransaction({
  ecdsaProvider,
  tokenAddress,
  amount,
}: {
  ecdsaProvider: ECDSAProvider;
  tokenAddress: `0x${string}`;
  amount: number;
}) {
  const { hash } = await ecdsaProvider.sendUserOperation({
    target: tokenAddress,
    data: encodeFunctionData({
      abi: ERC20Abi,
      functionName: "approve",
      args: [SWITCHLANE_TRANSFER_CONTRACT_ADDRESS, amount],
    }),
  });

  const txHash = await ecdsaProvider.waitForUserOperationTransaction(
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
  ecdsaProvider: ECDSAProvider;
  walletAddress: `0x${string}`;
  spender: `0x${string}`;
  tokenAddress: `0x${string}`;
  amount: number;
}) {
  const data = await readContract({
    address: tokenAddress,
    abi: ERC20Abi,
    functionName: "allowance",
    args: [walletAddress, spender],
  });

  const allowanceAmount = Number(formatEther(data as bigint));

  console.log({ allowanceAmount }, typeof allowanceAmount);
  console.log({ data }, typeof data);
  console.log({ amount }, typeof amount);

  if (allowanceAmount !== amount) {
    throw new Error("Does not have the correct allowance");
  }

  return data;
}
