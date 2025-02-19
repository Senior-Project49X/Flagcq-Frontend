import React, { useState, useEffect } from "react";
import EnrollModal from "./EnrollModal";
import Image from "next/image";
import { isRoleAdmin } from "../lib/role";
import GroupsIcon from "@mui/icons-material/Groups";

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
  teamCount: number;
  mode: string;
  teamLimit: number;
  joinCode: string;
};

export default function TournamentCard({
  id,
  topic,
  detail,
  eventStart,
  enrollEnd,
  status,
  enrolltime,
  eventtime,
  event_endDate,
  hasJoined,
  teamCount,
  mode,
  teamLimit,
  joinCode,
}: TournamentDetail) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    setIsAdmin(isRoleAdmin());
  }, []);

  const isFull = teamCount >= teamLimit;
  const isEnrollmentOpen = status === "open" && Date() > enrolltime;
  const isJoinedAndNotStart = hasJoined && Date() < eventStart;
  const isClickable = isAdmin || (isEnrollmentOpen && !isFull);

  const handleClick = () => {
    if (isClickable) {
      setIsModalOpen(true);
    }
  };

  const truncatedTopic = topic.length > 30 ? `${topic.slice(0, 20)}...` : topic;

  return (
    <div>
      {isModalOpen && (
        <EnrollModal
          ClosePopup={() => setIsModalOpen(false)}
          Topic={topic}
          Detail={detail}
          tournament_id={id}
          joinCode={joinCode}
        />
      )}
      <div
        className={`py-6 px-5 bg-gray-800 rounded-lg shadow-lg transition duration-300 
          ${
            isClickable
              ? "cursor-pointer glow-effect hover:shadow-green-400 hover:shadow-lg"
              : "cursor-not-allowed"
          }`}
        onClick={handleClick}
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-1 text-green-600">
              {truncatedTopic}
            </h2>
            <div className="text-green-400 text-sm">
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
                className="object-contain invert-50"
              />
              <span className="text-xl font-bold text-blue-500">
                {teamCount}/{teamLimit}
              </span>
            </div>

            {isAdmin && <div className="text-blue-500">{mode}</div>}

            {/* Show enroll status correctly */}
            <div
              className={`px-6 py-2 rounded-lg ${
                isClickable ? "text-green-400" : "text-gray-400"
              }`}
            >
              {isAdmin
                ? ""
                : isFull
                ? "Full"
                : isEnrollmentOpen
                ? "Enroll"
                : "Closed"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
