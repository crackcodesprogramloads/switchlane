import UserInterface from "./components/UserInterface/UserInterface";
import Logo from "./components/Navbar/Logo";
import Wallet from "./components/Navbar/Wallet/Wallet";
import Navbar from "./components/Navbar/Navbar";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <Navbar />
      <div className="w-full h-full flex items-center justify-center">
        <UserInterface />
      </div>
    </main>
  );
}
