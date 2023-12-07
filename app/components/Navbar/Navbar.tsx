import Logo from "./Logo";
import AAWalletButton from "./Wallet/AAWalletButton";
import WalletButton from "./Wallet/WalletButton";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full px-12 py-6 flex items-center justify-between text-lg text-zinc-200 font-semibold">
      <Logo />
      <div className="flex flex-row gap-4">
        <WalletButton />
        <AAWalletButton />
      </div>
    </nav>
  );
}
