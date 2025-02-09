"use client";
import Image from "next/image";
import Link from "next/link";
import ProfileToggle from "./profileToggle";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GetUserPoints } from "../../lib/API/GetUserAPI";
import { isRoleAdmin, isRoleTa } from "../../lib/role";
import AdminTogglePage from "./adminToggle";

export default function Navbar() {
  const pathname = usePathname();
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/tournament", label: "Tournament" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/createQuestion", label: "Create Question" },

    // Add more links here as needed
  ];
  const [point, setPoint] = useState<string | undefined | null>(null);
  const [role, setRole] = useState<boolean | undefined | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    setRole(isRoleAdmin() || isRoleTa());
  }, []);

  useEffect(() => {
    const fetchUserPoints = async () => {
      const points = await GetUserPoints();
      setPoint(points);
    };
    fetchUserPoints();
  }, []);
  return (
    <nav className="bg-[#090147] py-1 px-8 sticky top-0 w-full z-20">
      <div className="flex justify-between items-center">
        {/* Left side: Logo */}
        <div>
          <div className="flex items-center space-x-8 text-customRed text-lg font-semibold">
            <Link href="/" className="flex items-center space-x-2 mt-2">
              <Image
                src="/sub_logo.svg"
                alt="FlagConquest logo"
                width={35}
                height={35}
                className="object-contain"
              />
              <h1 className="text-green-400 text-x font-bold  md:flex hidden">
                FlagConquest
              </h1>
            </Link>
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <div className="hidden md:flex space-x-6 ml-8">
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

              {role && <AdminTogglePage pathname={pathname} />}
            </div>
          </div>
        </div>
        {/* Right side: Navigation buttons */}
        <div className="flex space-x-8 text-customRed text-lg font-semibold ">
          {/* <a href="#" className="hover:text-white">
            Sign up
          </a>
          <a href="#" className="hover:text-white">
            Log in
          </a> */}
          <div className="flex items-center space-x-2">
            {point !== null && point !== undefined && (
              <>
                <Image
                  src="/trophy.svg"
                  alt="FlagConquest logo"
                  width={30}
                  height={30}
                  className="object-contain mt-2 color:Tomato"
                />

                <div className="flex mt-3">{point}</div>
              </>
            )}
          </div>
          <ProfileToggle />
        </div>
      </div>
      {isMenuOpen && (
        <div className="mt-4 md:hidden space-y-2">
          <Link
            href="/"
            className="block text-white hover:text-green-400 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/tournament?page=1"
            className="block text-white hover:text-green-400 transition-colors"
          >
            Tournament
          </Link>
          <Link
            href="/leaderboard"
            className="block text-white hover:text-green-400 transition-colors"
          >
            Leaderboard
          </Link>
          {role && <AdminTogglePage pathname={pathname} />}
        </div>
      )}
    </nav>
  );
}
