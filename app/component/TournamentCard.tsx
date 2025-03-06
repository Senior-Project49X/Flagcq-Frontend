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
  statusColor?: string;
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
  statusColor,
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
  const isClickable = isAdmin || (isEnrollmentOpen && !isFull);
  const isView = hasJoined && status === "closed";

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
        className={`py-6 px-5 bg-gray-800 rounded-lg shadow-lg transition duration-300 border-2 border-rgba(255,255,255,0.1)
  ${
    isClickable
      ? "cursor-pointer glow-effect hover:shadow-green-400 hover:shadow-lg"
      : "cursor-not-allowed"
  }
  ${!isEnrollmentOpen && !isAdmin ? "opacity-70" : ""}`}
        onClick={handleClick}
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-1 text-[#00ff9d]">
              {truncatedTopic}
            </h2>
            <div className="text-[#94a3b8] text-sm">
              <div>
                Event Start: {eventStart}{" "}
                <span style={{ color: statusColor || "#ff4757" }}>
                  ({eventtime})
                </span>
              </div>
              <div>Event End: {event_endDate}</div>
              <div>
                Enroll End: {enrollEnd}{" "}
                <span style={{ color: statusColor || "#ff4757" }}>
                  ({enrolltime})
                </span>
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
            {isAdmin && <div className="text-[#64748b]">{mode}</div>}
            <div
              style={{
                color: statusColor || (isClickable ? "#2ecc71" : "#ff4757"),
                padding: "8px 24px",
                borderRadius: "8px",
              }}
            >
              {isAdmin
                ? ""
                : isFull
                ? "Full"
                : isEnrollmentOpen
                ? "Enroll"
                : isView
                ? "View"
                : "Closed"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
