import Wallet from "./Wallet/Wallet";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full px-12 py-6 flex items-center justify-between text-lg text-zinc-200 font-semibold">
      <Logo />
      <Wallet />
    </nav>
  );
}
