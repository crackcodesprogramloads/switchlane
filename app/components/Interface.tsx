import Button from "./Button";
import Input from "./Input";

export default function Interface() {
  return (
    <div className="w-1/3 h-2/3 px-10 flex flex-col items-center justify-center gap-8 border border-gray-600 rounded-lg shadow-[5px_5px_50px] shadow-sky-700/70">
      <Input type="dropdown" title="From:" chain="Ethereum" />
      <Input type="dropdown" title="To:" chain="Polygon" />
      <Input type="dropdown" title="Gas token:" token="BNB" />
      <Input type="input" title="Amount:" />
      <Button text="Submit transfer" />
    </div>
  );
}
