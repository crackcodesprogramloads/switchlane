// async function Test() {
//   try {
//     await publicClient.simulateContract({
//       address: "0x94C8d45976f908267817670345C127c5D1FBd928",
//       abi: contractAbi,
//       functionName: "receiveTokens",
//       args: ["0x0000000000000000000000000000000000001010", 1000000000000000], // 0.001Matic
//     });
//   } catch (err) {
//     if (err instanceof BaseError) {
//       const revertError = err.walk(
//         (err) => err instanceof ContractFunctionRevertedError
//       );
//       if (revertError instanceof ContractFunctionRevertedError) {
//         const errorName = revertError.data?.errorName ?? "";
//         // do something with `errorName`
//         console.log({ errorName });
//       }
//     }
//   }
// }
