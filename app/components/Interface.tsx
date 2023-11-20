import Button from "./Button";
import Dropdown from "./Dropdown";

export default function Interface() {
  return (
    <div className="w-1/3 h-2/3 px-10 flex flex-col items-center justify-center gap-8 border border-gray-600 rounded-lg shadow-[5px_5px_50px] shadow-sky-700/70">
      <Dropdown title="From:" chain="Ethereum" />
      <Dropdown title="To:" chain="Polygon" />
      <Dropdown title="Gas token:" token="BNB" />
      <Button text="Submit transfer" />
    </div>
  );
}
