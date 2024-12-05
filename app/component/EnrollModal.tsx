import React, { FormEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ModalDetail = {
  ClosePopup: Function;
  Topic: string;
  Detail: string;
};

export default function EnrollModal({
  ClosePopup,
  Topic,
  Detail,
}: ModalDetail) {
  async function onCreateTeam(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData.get("TeamName"));
  }

  async function onJoinTeam(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData.get("TeamCode"));
  }

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        onMouseDown={() => ClosePopup(true)}
      >
        <div
          className="relative w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">{Topic}</h3>
            <button
              className="text-black text-2xl"
              onClick={() => ClosePopup(true)}
            >
              ×
            </button>
          </div>

          <div className="px-6 py-6">
            <h4 className="text-center text-lg font-semibold mb-6">Detail</h4>
            <div className="text-center mb-6">{Detail}</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center border-r pr-4">
                <h5 className="text-sm font-bold mb-2">Create new team</h5>
                <form onSubmit={onCreateTeam} className="w-full">
                  <input
                    type="text"
                    name="TeamName"
                    placeholder="ชื่อทีม"
                    className="w-full px-3 py-2 border rounded mb-4"
                    maxLength={50}
                  />
                  <Link href="/tournament/Tourteam">
                    <button
                      type="submit"
                      className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-300"
                    >
                      Create
                    </button>
                  </Link>
                </form>
              </div>

              {/* Join Team */}
              <div className="flex flex-col items-center">
                <h5 className="text-sm font-bold mb-2">Already has team</h5>
                <form onSubmit={onJoinTeam} className="w-full">
                  <input
                    type="text"
                    name="TeamCode"
                    placeholder="รหัสเชิญ"
                    className="w-full px-3 py-2 border rounded mb-4"
                  />
                  <Link href="/tournament/Tourteam">
                    <button
                      type="submit"
                      className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-300"
                    >
                      Join
                    </button>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Overlay */}
      <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
