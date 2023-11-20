export default function Button({ text }: { text: string }) {
  return (
    <button className="py-4 px-8 text-zinc-200 hover:text-zinc-100 border border-gray-600 hover:border-gray-400 rounded-lg shadow-[5px_5px_50px] shadow-sky-700/70">
      {text}
    </button>
  );
}
