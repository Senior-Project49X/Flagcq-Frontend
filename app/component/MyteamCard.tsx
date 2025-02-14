import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isRoleAdmin } from "../lib/role";
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
  mode,
  teamCount,
  teamLimit,
}: TournamentDetail) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    setIsAdmin(isRoleAdmin());
  }, []);

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
          <div className="flex items-center gap-2">{mode}</div>
          <div className="flex flex-col gap-2">
            {/* Button for everyone to view their team */}
            <button
              className="px-6 py-2 bg-customGreen hover:bg-green-500 text-black rounded-lg"
              onClick={() =>
                router.push(
                  `/tournament/Tourteam_member?tournamentId=${id}&teamId=${teamId}`
                )
              }
            >
              View Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
