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
  enrolltime: string;
  eventtime: string;
};

export default function TournamentCard({
  topic,
  detail,
  quantity,
  eventStart,
  enrollEnd,
  status,
  enrolltime,
  eventtime,
}: TournamentDetail) {
  const [CloseModal, setCloseModal] = useState(true);
  return (
    <div className="py-6 px-5 bg-white rounded-lg ">
      {!CloseModal && (
        <EnrollModal ClosePopup={setCloseModal} Topic={topic} Detail={detail} />
      )}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-1">{topic}</h2>
          <div className="text-gray-600 text-sm">
            <div>Event Start: {eventStart}</div>
            <div>Enroll End: {enrollEnd}</div>
            <div className=" text-red-500">Enroll End: {enrolltime}</div>
            <div className=" text-red-500">Event End: {eventtime}</div>
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
                : "bg-customGrey px-10 py-2 rounded-lg cursor-not-allowed"
            }
            onClick={() => {
              if (status === "open") {
                setCloseModal(false);
              }
            }}
            disabled={status !== "open"}
          >
            {status === "open" ? "Enroll" : "Closed"}
          </button>
        </div>
      </div>
    </div>
  );
}
