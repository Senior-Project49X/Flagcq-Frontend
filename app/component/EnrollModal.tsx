import React, { FormEvent } from "react";
type ModalDetail = {
  ClosePopup: Function;
  Topic: string;
};

export default function EnrollModal({ ClosePopup, Topic }: ModalDetail) {
  async function onCreateTeam(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData.get("TeamName"));

    // const response = await fetch("/api/submit", {
    //   method: "POST",
    //   body: formData,
    // });

    // // Handle response if necessary
    // const data = await response.json();
    // // ...
  }
  async function onJoinTeam(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData.get("TeamCode"));

    // const response = await fetch("/api/submit", {
    //   method: "POST",
    //   body: formData,
    // });

    // // Handle response if necessary
    // const data = await response.json();
    // // ...
  }

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        onMouseDown={() => ClosePopup(true)}
      >
        <div
          className="relative w-auto my-6 mx-auto max-w-3xl"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">{Topic}</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => ClosePopup(true)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/* content */}
              <div className="relative p-6 flex-auto">
                <div>
                  <p>Create new team</p>
                  <form onSubmit={onCreateTeam}>
                    <input
                      type="text"
                      name="TeamName"
                      placeholder="ชื่อทีม"
                      maxLength={50}
                    />
                    <button type="submit">Submit</button>
                  </form>
                  <p>Already has team</p>
                  <form onSubmit={onJoinTeam}>
                    <input
                      type="text"
                      name="TeamCode"
                      placeholder="รหัสเชิญ..."
                    />
                    <button type="submit">Submit</button>
                  </form>
                  {/* <input type="text"></input> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
