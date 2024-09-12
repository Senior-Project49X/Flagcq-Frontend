import Image from "next/image";

export default function Category() {
  return (
    <div className="bg-[#090147] py-4 px-8">
      <div className="border-4 border-red-500 rounded-lg p-6 w-64">
        {/* Category Header */}
        <div className="flex items-center space-x-4 mb-4">
          <Image
            src="/category.svg"
            alt="Category logo"
            width={50}
            height={50}
            className="object-contain"
          />
          <h1 className="text-red-400 text-xl font-bold">Category</h1>
        </div>

        {/* Category List */}
        <div className="flex flex-col space-y-4">
          <button className="bg-[#0c0332] text-white py-2 px-4 rounded-lg hover:bg-red-500">
            All Categories
          </button>
          <button className="bg-[#0c0332] text-white py-2 px-4 rounded-lg hover:bg-red-500">
            General Skills
          </button>
          <button className="bg-[#0c0332] text-white py-2 px-4 rounded-lg hover:bg-red-500">
            Cryptography
          </button>
          <button className="bg-[#0c0332] text-white py-2 px-4 rounded-lg hover:bg-red-500">
            Network
          </button>
          <button className="bg-[#0c0332] text-white py-2 px-4 rounded-lg hover:bg-red-500">
            Forensics
          </button>
        </div>

        {/* Tournament Button */}
      </div>
      <div className="mt-6 flex items-center">
        <button className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600">
          Tournament
        </button>
      </div>
    </div>
  );
}
