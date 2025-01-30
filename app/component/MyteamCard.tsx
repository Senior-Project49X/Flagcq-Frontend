import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
};

export default function MyteamCard({
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
  teamCount,
}: TournamentDetail) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    setIsAdmin(isRoleAdmin());
  }, []);

  const handleButtonClick = () => {
    if (isAdmin) {
      router.push(`/tournament/TournamentPage?tournamentId=${id}`);
    } else {
      router.push(
        `/tournament/Tourteam_member?tournamentId=${id}&teamId=${teamId}`
      );
    }
  };

  return (
    <div className="py-6 px-5 bg-white rounded-lg shadow-lg">
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
          <span className="text-xl font-bold">{teamCount}</span>
          <button
            className="px-10 py-2 rounded-lg bg-customGreen hover:bg-green-500 ease-out duration-300"
            onClick={handleButtonClick}
          >
            {isAdmin ? "Manage" : "Joined"}
          </button>
        </div>
      </div>
    </div>
  );
}
