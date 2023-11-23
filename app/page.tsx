import UserInterface from "./components/UserInterface";
import Logo from "./components/Logo";
import Wallet from "./components/Wallet";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <nav className="fixed top-0 w-full px-12 py-6 flex items-center justify-between text-lg text-zinc-200 font-semibold">
        <Logo />
        <Wallet />
      </nav>

      <div className="w-full h-full flex items-center justify-center">
        <UserInterface />
      </div>
    </main>
  );
}
