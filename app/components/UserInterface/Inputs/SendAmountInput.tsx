"use client";

export default function SendInput({
  value,
  onChange,
}: {
  value: string;
  onChange?: (e: any) => void;
}) {
  return (
    <fieldset className="w-full h-16 flex items-center text-zinc-200 border-dashed border-t border-gray-600">
      <legend className="ml-auto mr-auto px-2 text-lg">Send amount</legend>
      <span className="w-full flex flex-row items-center justify-between">
        <button className="w-1/4 h-3/4 px-auto py-auto text-zinc-200 text-md border rounded-lg">
          Max
        </button>
        <input
          required
          type="text"
          id="sendAmount"
          name="sendAmount"
          className="w-full h-full outline-none text-4xl text-end bg-transparent"
          placeholder="0.00"
          value={value}
          onChange={onChange}
        />
      </span>
    </fieldset>
  );
}
