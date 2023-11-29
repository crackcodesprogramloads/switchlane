import Logo from "./Logo";
import WalletButton from "./Wallet/WalletButton";
import WalletWrapper from "./Wallet/WalletWrapper";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full px-12 py-6 flex items-center justify-between text-lg text-zinc-200 font-semibold">
      <Logo />
      <WalletWrapper>
        <WalletButton />
      </WalletWrapper>
    </nav>
  );
}
