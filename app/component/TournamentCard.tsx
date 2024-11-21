"use client";

import React, { useState } from "react";
import EnrollModal from "./EnrollModal";

type TournamentDetail = {
  topic: string;
  detail: string;
  quantity: number;
  eventStart: string;
  enrollEnd: string;
  status: string;
};

export default function TournamentCard({
  topic,
  detail,
  quantity,
  eventStart,
  enrollEnd,
  status,
}: TournamentDetail) {
  const [CloseModal, setCloseModal] = useState(true);
  return (
    <div className="py-6 px-5 bg-white rounded-lg ">
      {!CloseModal && <EnrollModal ClosePopup={setCloseModal} Topic={topic} />}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-1">{topic}</h2>
          <div className="text-gray-600 text-sm">
            <div>Event Start: {eventStart}</div>
            <div>Enroll End: {enrollEnd}</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">{quantity}</span>
          </div>
          <button
            className={
              status === "open"
                ? "bg-customGreen hover:bg-green-500 px-10 py-2 rounded-lg ease-out duration-300 focus:pointer-events-auto"
                : "bg-customGrey  px-10 py-2 rounded-lg cursor-default "
            }
            onClick={() => {
              setCloseModal(false);
            }}
          >
            {status === "open" ? "Enroll" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
