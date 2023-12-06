// import type { ECDSAProvider } from "@zerodev/sdk";
// import { encodeFunctionData, formatEther } from "viem";
// import ERC20Abi from "../../abi/ERC20_Token_Abi.json";
// import { SWITCHLANE_TRANSFER_CONTRACT_ADDRESS } from "@/app/constants";
// import { waitForTransaction, readContract } from "wagmi/actions";

// export async function approveTransaction({
//   ecdsaProvider,
//   tokenAddress,
//   amount,
// }: {
//   ecdsaProvider: ECDSAProvider;
//   tokenAddress: `0x${string}`;
//   amount: number;
// }) {
//   const { hash } = await ecdsaProvider.sendUserOperation({
//     target: tokenAddress,
//     data: encodeFunctionData({
//       abi: ERC20Abi,
//       // approve(address _spender, uint256 _value)
//       functionName: "approve",
//       args: [SWITCHLANE_TRANSFER_CONTRACT_ADDRESS, amount],
//     }),
//   });

//   const txHash = await ecdsaProvider.waitForUserOperationTransaction(
//     hash as `0x${string}`
//   );

//   return txHash;
// }

// export async function checkAllowance({
//   walletAddress,
//   spender,
//   tokenAddress,
//   amount,
// }: {
//   ecdsaProvider: ECDSAProvider;
//   walletAddress: `0x${string}`;
//   spender: `0x${string}`;
//   tokenAddress: `0x${string}`;
//   amount: number;
// }) {
//   const data = await readContract({
//     address: tokenAddress,
//     abi: ERC20Abi,
//     // allowance(address _owner, address _spender)
//     functionName: "allowance",
//     args: [walletAddress, spender],
//   });

//   const allowanceAmount = Number(formatEther(data as bigint));

//   console.log({ allowanceAmount }, typeof allowanceAmount);
//   console.log({ data }, typeof data);
//   console.log({ amount }, typeof amount);

//   if (allowanceAmount !== amount) {
//     throw new Error("Does not have the correct allowance");
//   }

//   return data;
// }

// export async function transfer({
//   ecdsaProvider,
//   destinationChainId,
//   recipientAddress,
//   tokenAddress,
//   amount,
// }: {
//   ecdsaProvider: ECDSAProvider;
//   destinationChainId: number;
//   recipientAddress: string;
//   tokenAddress: `0x${string}`;
//   amount: number;
// }) {
//   const { hash } = await ecdsaProvider.sendUserOperation({
//     target: SWITCHLANE_TRANSFER_CONTRACT_ADDRESS,
//     data: encodeFunctionData({
//       abi: ERC20Abi,
//       // _transferTokens(uint64 _destinationChainSelector, address _receiver, address _token, uint256 _amount)
//       functionName: "_transferTokens",
//       args: [destinationChainId, recipientAddress, tokenAddress, amount],
//     }),
//   });

//   const txHash = await ecdsaProvider.waitForUserOperationTransaction(
//     hash as `0x${string}`
//   );

//   return txHash;
// }
