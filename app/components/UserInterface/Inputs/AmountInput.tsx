export default function AmountInput({
  title,
  button,
  showBalance,
}: {
  title: string;
  button: boolean;
  showBalance: boolean;
}) {
  return (
    <fieldset
      className={`w-full h-1/2 px-2 flex flex-col items-center justify-around text-zinc-200 border-dashed border-t border-gray-600`}
    >
      <legend className="ml-auto mr-auto px-2 text-lg">{title}</legend>
      <span className="w-full flex flex-row items-center justify-between">
        {button ? (
          <button className="w-1/4 h-3/4 px-auto py-auto text-zinc-200 text-md border rounded-lg">
            Max
          </button>
        ) : null}
        <input
          type="number"
          id={button ? "amount" : "receive-amount"}
          name={button ? "amount" : "receive-amount"}
          className="w-full h-full outline-none text-4xl text-end bg-transparent"
          placeholder="0.00"
        />
      </span>
      {showBalance && (
        <span className="w-full h-3 flex flex-row justify-between">
          <h5 className="text-zinc-200">Balance:</h5>
          <h6 className="text-zinc-200">10 Matic</h6>
        </span>
      )}
    </fieldset>
  );
}
