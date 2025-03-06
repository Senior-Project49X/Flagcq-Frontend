import Image from "next/image";
import Link from "next/link";
import ProfileToggle from "./profileToggle";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GetUserPoints } from "../../lib/API/GetUserAPI";
import { isRoleAdmin, isRoleTa } from "../../lib/role";
import AdminTogglePage from "./adminToggle";
import { FaHome, FaTrophy, FaChartBar, FaBars, FaCog } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  const [point, setPoint] = useState<string | undefined | null>(null);
  const [role, setRole] = useState<boolean | undefined | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: FaHome },
    { href: "/tournament", label: "Tournament", icon: FaTrophy },
    { href: "/leaderboard", label: "Leaderboard", icon: FaChartBar },
  ];

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
    <nav className="bg-[#090147] py-1 px-8 sticky mt-2 top-0 w-full z-20">
      <div className="flex justify-between items-center">
        {/* Logo and Desktop Navigation */}
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="flex items-center space-x-3 group transition-transform duration-200 hover:scale-105 "
          >
            <div className="relative w-10 h-10">
              <Image
                src="/sub_logo.svg"
                alt="FlagConquest logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-emerald-400 text-xl font-bold hidden md:block">
              FlagConquest
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center space-x-2 px-4 rounded-lg transition-all duration-200 py-3
                  ${
                    pathname === item.href
                      ? "text-emerald-400 bg-emerald-500/10"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                  }
                `}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
            {role && <AdminTogglePage pathname={pathname} />}
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 mt-1 bg-slate-800 rounded-lg p-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200
                    ${
                      pathname === item.href
                        ? "text-emerald-400 bg-emerald-500/10"
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-700"
                    }
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Points and Profile */}
        <div className="flex items-center space-x-6">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-400 hover:text-slate-200 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars className="w-6 h-6" />
          </button>

          {/* Points Display */}
          {point !== null && point !== undefined && (
            <div className="flex items-center space-x-2 bg-slate-800 rounded-lg px-3 py-2">
              <Image
                src="/trophy.svg"
                alt="Points"
                width={24}
                height={24}
                className="object-contain"
              />
              <span className="text-emerald-400 font-semibold">{point}</span>
            </div>
          )}

          {/* Profile Toggle */}
          <ProfileToggle />
        </div>
      </div>
    </nav>
  );
}
