import Header from "./components/Header";
import UserInterface from "./components/UserInterface/UserInterface";

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center gap-4">
      <Header />
      <UserInterface />
    </main>
  );
}
