export default function Forensics() {
  return (
    <div className="mt-12 grid grid-cols-3 gap-6 px-16">
      <div className="bg-white rounded-lg p-6 text-center">
        <h2 className="text-xl font-bold">linux</h2>
        <p className="text-green-500">Easy</p>
        <button className="bg-[#5e4ae3] text-white py-2 px-4 mt-4 rounded-lg">
          Start
        </button>
      </div>
      <div className="bg-white rounded-lg p-6 text-center">
        <h2 className="text-xl font-bold">bread</h2>
        <p className="text-red-500">Hard</p>
        <button className="bg-[#5e4ae3] text-white py-2 px-4 mt-4 rounded-lg">
          Start
        </button>
      </div>
      <div className="bg-white rounded-lg p-6 text-center">
        <h2 className="text-xl font-bold">meat</h2>
        <p className="text-green-500">Easy</p>
        <button className="bg-[#5e4ae3] text-white py-2 px-4 mt-4 rounded-lg">
          Start
        </button>
      </div>
    </div>
  );
}
