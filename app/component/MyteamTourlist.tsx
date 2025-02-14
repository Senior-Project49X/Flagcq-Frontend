import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { colCount } from "@tiptap/pm/tables";

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

  useEffect(() => {
    if (eventtime <= Date() && enrolltime >= eventtime) {
      setIsEventStarted(true);
    }
  }, [eventtime]);

  return (
    <div
      className="py-6 px-5 bg-gray-800 rounded-lg shadow-lg cursor-pointer 
         glow-effect transition duration-300 hover:shadow-green-400 hover:shadow-lg"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-1 text-green-400">{topic}</h2>
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
              className="object-contain"
            />
            <span className="text-xl font-bold text-blue-500">
              {teamCount}/{teamLimit}
            </span>
          </div>

          {/* Show mode selection only if the user is an admin */}
          <div className="flex items-center gap-2 text-blue-400">{mode}</div>
          <div className="flex flex-col gap-2">
            <button
              className={`px-6 py-2 rounded-lg text-gray-300 ${
                isEventStarted
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-customGrey cursor-not-allowed"
              }`}
              onClick={() =>
                isEventStarted &&
                router.push(`/tournament/TournamentPage?tournamentId=${id}`)
              }
              disabled={!isEventStarted}
            >
              Play tournament
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
