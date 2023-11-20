import Interface from "./components/Interface";
import Logo from "./components/Logo";
import Wallet from "./components/Wallet";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between">
      <nav className="z-10 px-12 py-6 w-full flex items-center justify-between text-lg text-zinc-200 font-semibold">
        <Logo />
        <Wallet />
      </nav>

      <div className="h-full w-full flex items-center justify-center">
        <Interface />
      </div>
    </main>
  );
}
