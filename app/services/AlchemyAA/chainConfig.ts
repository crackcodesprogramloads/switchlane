import { Network } from "alchemy-sdk";
import {
  baseGoerli,
  optimismGoerli,
  polygonMumbai,
  sepolia,
  // arbitrumSepolia,
  type Chain,
} from "viem/chains";

export interface ChainConfig {
  gasManagerPolicyId: string;
  chain: Chain;
  rpcUrl: string;
  network: Network;
  apiKey: string;
}

export const chainConfig: Record<number, ChainConfig> = {
  [polygonMumbai.id]: {
    gasManagerPolicyId: process.env.NEXT_PUBLIC_MUMBAI_POLICY_ID || "",
    chain: polygonMumbai,
    rpcUrl: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_API_KEY}`,
    network: Network.MATIC_MUMBAI,
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_API_KEY || "",
  },
  [sepolia.id]: {
    gasManagerPolicyId: process.env.NEXT_PUBLIC_SEPOLIA_POLICY_ID || "",
    chain: sepolia,
    rpcUrl: `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA_API_KEY}`,
    network: Network.ETH_SEPOLIA,
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA_API_KEY || "",
  },
  // [arbitrumSepolia.id]: {
  //   gasManagerPolicyId: process.env.NEXT_PUBLIC_ARB_SEPOLIA_POLICY_ID || "",
  //   chain: {
  //     ...arbitrumSepolia,
  //     rpcUrls: {
  //       ...arbitrumSepolia.rpcUrls,
  //       alchemy: {
  //         http: ["https://arb-sepolia.g.alchemy.com/v2"],
  //         webSocket: ["wss://arb-sepolia.g.alchemy.com/v2"],
  //       },
  //     },
  //   },
  //   rpcUrl: `https://arb-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ARB_SEPOLIA_API_KEY}`,
  //   network: Network.ARB_SEPOLIA,
  //   apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ARB_SEPOLIA_API_KEY || "",
  // },
  [optimismGoerli.id]: {
    gasManagerPolicyId: process.env.NEXT_PUBLIC_OPT_GOERLI_POLICY_ID || "",
    chain: optimismGoerli,
    rpcUrl: `https://opt-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_OPT_GOERLI_API_KEY}`,
    network: Network.OPT_GOERLI,
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_OPT_GOERLI_API_KEY || "",
  },
  [baseGoerli.id]: {
    gasManagerPolicyId: process.env.NEXT_PUBLIC_BASE_GOERLI_POLICY_ID || "",
    chain: baseGoerli,
    rpcUrl: `https://base-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_BASE_GOERLI_API_KEY}`,
    network: Network.BASE_GOERLI,
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_BASE_GOERLI_API_KEY || "",
  },
};
