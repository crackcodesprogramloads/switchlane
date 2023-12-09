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
import TEST_TOKEN from "/public/tokens/TestToken.svg";

export const SWITCHLANE_TRANSFER_CONTRACT_ADDRESS =
  "0x0D0502489E7FA33aF1c8ed18D9053FB35c099d13";

export const DESTINATION_CHAINS = [
  { id: optimismGoerli.id, name: "Optimism", icon: OPTIMISM },
  { id: polygonMumbai.id, name: "Polygon", icon: POLYGON },
  { id: "16015286601757825753", name: "Ethereum", icon: ETHEREUM },
  { id: baseGoerli.id, name: "Base", icon: BASE },
  // { id: optimismGoerli.id, name: "Optimism", icon: OPTIMISM },
  // { id: polygonMumbai.id, name: "Polygon", icon: POLYGON },
  // { id: sepolia.id, name: "Ethereum", icon: ETHEREUM },
  // { id: baseGoerli.id, name: "Base", icon: BASE },
];

export const TO_TOKEN_OPTIONS = [
  {
    address: "0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40", // Mumbai
    name: "CCIP-BnM",
    icon: TEST_TOKEN,
  },
];
