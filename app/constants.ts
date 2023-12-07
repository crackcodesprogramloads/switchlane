import {
  optimismGoerli,
  polygonMumbai,
  sepolia,
  baseGoerli,
} from "viem/chains";

import OPTIMISM from "/public/chains/RainbowIcons/Optimism.svg";
import POLYGON from "/public/chains/RainbowIcons/Polygon.svg";
import ETHEREUM from "/public/chains/RainbowIcons/Ethereum.svg";
import BASE from "/public/chains/RainbowIcons/Base.svg";
import TEST_TOKEN from "/public/chains/RainbowIcons/Base.svg";

export const MATIC_TOKEN_ADDRESS = "0x0000000000000000000000000000000000001010"; // MATIC, NOT WORKING!? ISN'T MATIC AN ERC20!?

export const DUMMY_ERC20_TOKEN_ADDRESS =
  "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1"; // DUMMY ERC20

export const SWITCHLANE_TRANSFER_CONTRACT_ADDRESS =
  "0x4Eb0451A0E08441A850E74dDDd3E0e355cE6aCc1";

// TESTNET CHAINS AND TOKENS

export const DESTINATION_CHAINS = [
  { id: optimismGoerli.id, name: "Optimism", icon: OPTIMISM },
  { id: polygonMumbai.id, name: "Polygon", icon: POLYGON },
  { id: sepolia.id, name: "Ethereum", icon: ETHEREUM },
  { id: baseGoerli.id, name: "Base", icon: BASE },
];

export const TOKENS = [
  {
    address: "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1",
    name: "Test ERC20",
    icon: TEST_TOKEN,
  },
  { address: "", name: "Optimism", icon: OPTIMISM },
  { address: "", name: "Polygon", icon: POLYGON },
  { address: "", name: "Ethereum", icon: ETHEREUM },
  { address: "", name: "Base", icon: BASE },
];
