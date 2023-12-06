import {
  baseGoerli,
  optimismGoerli,
  polygonMumbai,
  sepolia,
  type Chain,
} from "viem/chains";

export interface ChainConfig {
  gasManagerPolicyId: string;
  chain: Chain;
  rpcUrl: string;
}

export const chainConfig: Record<number, ChainConfig> = {
  [polygonMumbai.id]: {
    gasManagerPolicyId: process.env.NEXT_PUBLIC_MUMBAI_POLICY_ID || "",
    chain: polygonMumbai,
    rpcUrl: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_API_KEY}`,
  },
  [sepolia.id]: {
    gasManagerPolicyId: process.env.NEXT_PUBLIC_SEPOLIA_POLICY_ID || "",
    chain: sepolia,
    rpcUrl: `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA_API_KEY}`,
  },
  [optimismGoerli.id]: {
    gasManagerPolicyId: process.env.NEXT_PUBLIC_OPT_GOERLI_POLICY_ID || "",
    chain: optimismGoerli,
    rpcUrl: `https://opt-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_OPT_GOERLI_API_KEY}`,
  },
  [baseGoerli.id]: {
    gasManagerPolicyId: process.env.NEXT_PUBLIC_BASE_GOERLI_POLICY_ID || "",
    chain: baseGoerli,
    rpcUrl: `https://base-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_BASE_GOERLI_API_KEY}`,
  },
};