import React, { useState } from "react";
import EnrollModal from "./EnrollModal";

type TournamentDetail = {
  id: number;
  topic: string;
  detail: string;
  quantity: number;
  eventStart: string;
  enrollEnd: string;
  status: string;
  enrolltime: string;
  eventtime: string;
  event_endDate: string;
};

export default function TournamentCard({
  id,
  topic,
  detail,
  quantity,
  eventStart,
  enrollEnd,
  status,
  enrolltime,
  eventtime,
  event_endDate,
}: TournamentDetail) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (status === "open") {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="py-6 px-5 bg-white rounded-lg shadow-lg">
      {isModalOpen && (
        <EnrollModal
          ClosePopup={setIsModalOpen}
          Topic={topic}
          Detail={detail}
          tournament_id={id}
        />
      )}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-1">{topic}</h2>
          <div className="text-gray-600 text-sm">
            <div>
              Event Start: {eventStart}{" "}
              <span className="text-red-500">({eventtime})</span>
            </div>
            <div>Event End: {event_endDate}</div>
            <div>
              Enroll End: {enrollEnd}{" "}
              <span className="text-red-500">({enrolltime})</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">{quantity}</span>
          </div>
          <button
            className={`px-10 py-2 rounded-lg ${
              status === "open"
                ? "bg-customGreen hover:bg-green-500 ease-out duration-300 focus:pointer-events-auto"
                : "bg-customGrey cursor-not-allowed"
            }`}
            onClick={handleOpenModal}
            disabled={status !== "open"}
          >
            {status === "open" ? "Enroll" : "Closed"}
          </button>
        </div>
      </div>
    </div>
  );
}
