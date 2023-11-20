export default function Dropdown({
  title,
  chain,
  token,
}: {
  title: string;
  chain?: string;
  token?: string;
}) {
  return (
    <div className="w-[90%] h-14 flex flex-row items-center justify-center text-zinc-200 border-t border-r border-b border-gray-600 rounded-lg shadow-inner shadow-sky-700/70">
      <p className="w-1/3 h-full flex items-center justify-center text-center bg-gray-900 border-x rounded-l-lg border-gray-600 shadow-inner shadow-sky-700/70">
        {title}
      </p>
      <select className="w-2/3 h-full text-center bg-transparent">
        {chain === "Ethereum" && (
          <>
            <option>Ethereum</option>
            <option>Polygon</option>
            <option>Optimism</option>
            <option>Arbitrum</option>
            <option>BSC</option>
            <option>Base</option>
          </>
        )}
        {chain === "Polygon" && (
          <>
            <option>Polygon</option>
            <option>Ethereum</option>
            <option>Optimism</option>
            <option>Arbitrum</option>
            <option>BSC</option>
            <option>Base</option>
          </>
        )}
        {token === "BNB" && (
          <>
            <option>Bnb</option>
            <option>Eth</option>
            <option>Weth</option>
            <option>Matic</option>
          </>
        )}
      </select>
    </div>
  );
}
