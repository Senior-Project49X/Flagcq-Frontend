"use client";
import Image from "next/image";
import Link from "next/link";
import ProfileToggle from "./profileToggle";
import { usePathname } from "next/navigation";
type NavbarProps = {
  point: string;
};
export default function Navbar({ point }: Readonly<NavbarProps>) {
  const pathname = usePathname();

  return (
    <nav className="bg-[#090147] py-4 px-8 relative">
      <div className="flex justify-between items-center">
        {/* Left side: Logo */}
        <Link href="/">
          <div className="flex items-center space-x-4">
            <Image
              src="/sub_logo.svg"
              alt="FlagConquest logo"
              width={35}
              height={35}
              className="object-contain"
            />
            <h1 className="text-green-400 text-x font-bold">FlagConquest</h1>
            <div className="flex space-x-8 text-customRed text-lg font-semibold ">
              <Link
                href="/"
                className={
                  pathname == "/"
                    ? "text-green-400 h-fit mt-3"
                    : "hover:text-white h-fit mt-3"
                }
              >
                Home
              </Link>
              <Link
                href="/tournament?page=1"
                className={
                  pathname == "/tournament"
                    ? "text-green-400 h-fit mt-3"
                    : "hover:text-white h-fit mt-3"
                }
              >
                Tournament
              </Link>
              <Link
                href="/leaderboard"
                className={
                  pathname == "/leaderboard"
                    ? "text-green-400 h-fit mt-3 "
                    : "hover:text-white h-fit mt-3"
                }
              >
                Leaderboard
              </Link>
              <Link
                href="/createQuestion"
                className={
                  pathname == "/createQuestion"
                    ? "text-green-400 h-fit mt-3 "
                    : "hover:text-white h-fit mt-3"
                }
              >
                Create Question
              </Link>
            </div>
          </div>
        </Link>
        {/* Right side: Navigation buttons */}
        <div className="flex space-x-8 text-customRed text-lg font-semibold ">
          {/* <a href="#" className="hover:text-white">
            Sign up
          </a>
          <a href="#" className="hover:text-white">
            Log in
          </a> */}
          <div className="flex space-x-8 mt-3">{point}</div>
          <ProfileToggle />
        </div>
      </div>
    </nav>
  );
}
