import Image from "next/image";
import LogoIcon from "/public/Logo.svg";

export default function Logo() {
  return (
    <div className="flex flex-row items-end">
      <Image src={LogoIcon} alt="logo" width={40} height={40} />
      <Image
        className="translate-y-2 -translate-x-5 transform -scale-x-100"
        src={LogoIcon}
        alt="logo"
        width={40}
        height={40}
      />
      <a className="text-zinc-200 text-3xl font-semibold" href="/">
        Switchlane
      </a>
    </div>
  );
}
