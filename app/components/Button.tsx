export default function Button({
  text,
  width,
}: {
  text: string;
  width?: string;
}) {
  return (
    <button
      className={`${width} py-4 px-8 text-xl text-zinc-200 hover:text-zinc-50 font-semibold border-l border-t border-gray-600 hover:border-gray-400 rounded-lg shadow-[0px_0px_60px] shadow-sky-700/70`}
    >
      {text}
    </button>
  );
}
