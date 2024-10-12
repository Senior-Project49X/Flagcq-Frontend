import Image from "next/image";
import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="bg-[#090147] py-4 px-8 relative">
      <div className="flex justify-between items-center">
        {/* Left side: Logo */}
        <Link href="/">
          <div className="flex items-center space-x-4">
            <Image
              src="/sub_logo.svg"
              alt="FlagConquest logo"
              width={50}
              height={50}
              className="object-contain"
            />
            <h1 className="text-green-400 text-xl font-bold">FlagConquest</h1>
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
          <Link href="/" className="hover:text-white h-fit mt-3">
            home
          </Link>
          <Link href="#" className="hover:text-white h-fit mt-3">
            team
          </Link>
          <Link
            href="/profile"
            className="w-12 h-12 rounded-full object-cover bg-white"
          ></Link>
        </div>
      </div>
    </nav>
  );
}
