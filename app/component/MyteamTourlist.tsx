import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  joinCode: string;
};

export default function MyteamTourlist({
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
  teamId,
  mode,
  teamCount,
  teamLimit,
  joinCode,
}: TournamentDetail) {
  const router = useRouter();
  const [isEventStarted, setIsEventStarted] = useState<boolean>(false);
  const truncatedTopic = topic.length > 30 ? `${topic.slice(0, 20)}...` : topic;
  const isJoinedAndNotStart = hasJoined && Date() > eventtime;
  const isView = hasJoined && Date() < event_endDate;
  useEffect(() => {
    // Check if event has started
    if (eventtime >= Date() && enrolltime <= eventtime) {
      setIsEventStarted(true);
    }
  }, [eventtime, enrolltime]);

  const handleClick = () => {
    if (isEventStarted) {
      router.push(`/tournament/TournamentPage?tournamentId=${id}`);
    }
  };

  return (
    <div
      className={`py-6 px-5 bg-gray-800 rounded-lg shadow-lg transition duration-300 border-2 border-rgba(255,255,255,0.1)${
        isEventStarted
          ? "cursor-pointer glow-effect hover:shadow-green-400 hover:shadow-lg"
          : "cursor-not-allowed "
      }`}
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
            <span className="text-xl font-bold text-blue-500">
              {teamCount}/{teamLimit}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#64748b]">{mode}</div>

          {/* "Play Tournament" text instead of button */}
          <div
            className={`px-6 py-2 rounded-lg ${
              isEventStarted ? "text-blue-500" : "text-gray-400"
            }`}
          >
            {isEventStarted
              ? "Play"
              : isJoinedAndNotStart
              ? "Waiting"
              : isView
              ? "View"
              : "Closed"}
          </div>
        </div>
      </div>
    </div>
  );
}
