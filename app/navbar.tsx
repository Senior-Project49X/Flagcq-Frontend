import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-[#090147] py-4 px-8">
      <div className="flex justify-between items-center">
        {/* Left side: Logo */}
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

        {/* Right side: Navigation buttons */}
        <div className="flex space-x-8 text-green-400 text-lg font-semibold">
          <a href="#" className="hover:text-white">
            Sign up
          </a>
          <a href="#" className="hover:text-white">
            Log in
          </a>
          <a href="#" className="hover:text-white">
            About us
          </a>
        </div>
      </div>
    </nav>
  );
}
