import React, { useState, useEffect } from "react";
import EnrollModal from "./EnrollModal";
import Image from "next/image";
import { isRoleAdmin } from "../lib/role";

type TournamentDetail = {
  id: number;
  topic: string;
  detail: string;
  eventStart: string;
  enrollEnd: string;
  status: string;
  enrolltime: string;
  eventtime: string;
  event_endDate: string;
  hasJoined: boolean;
  teamId: number;
  teamCount: number;
  mode: string;
  teamLimit: number;
};

export default function TournamentCard({
  id,
  topic,
  detail,
  eventStart,
  enrollEnd,
  status: originalStatus,
  enrolltime,
  eventtime,
  event_endDate,
  hasJoined,
  teamId,
  teamCount,
  mode,
  teamLimit,
}: TournamentDetail) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const role = isRoleAdmin();
    setIsAdmin(role);
  }, []);

  // Override status if the user is an admin
  const status = isAdmin ? "open" : originalStatus;

  const handleOpenModal = () => {
    if (status === "open") {
      setIsModalOpen(true);
    }
  };

  return (
    <div className="py-6 px-5 bg-white rounded-lg shadow-lg">
      {isModalOpen && (
        <EnrollModal
          ClosePopup={() => setIsModalOpen(false)}
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
            <Image
              src="/people.svg"
              alt="Category logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-xl font-bold">
              {teamCount}/{teamLimit}
            </span>
          </div>

          {/* Show mode selection only if the user is an admin */}
          {isAdmin && <div className="flex items-center gap-2">{mode}</div>}

          <button
            className={`px-10 py-2 rounded-lg ${
              status === "open"
                ? "bg-customGreen hover:bg-green-500 ease-out duration-300 focus:pointer-events-auto"
                : "bg-customGrey cursor-not-allowed"
            }`}
            onClick={handleOpenModal}
            disabled={status !== "open"}
          >
            {isAdmin ? "Manage" : status === "open" ? "Enroll" : "Closed"}
          </button>
        </div>
      </div>
    </div>
  );
}
