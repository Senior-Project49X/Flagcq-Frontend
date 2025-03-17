"use client";
import React, { useState, useEffect, FormEvent } from "react";
import Navbar from "../component/Navbar/navbar";
import { GetTourList } from "../lib/API/GetTourListAPI";
import { PostJoinTeam } from "../lib/API/PostJoinTeam";
import TournamentCard from "../component/TournamentCard";
import MyteamTourlist from "../component/MyteamTourlist";
import Pagination from "../component/Pagination";
import { useSearchParams, useRouter } from "next/navigation";
import { isRoleAdmin } from "../lib/role";

// Types
interface RemainingTime {
  time: string;
  status: string;
  color?: string;
}

interface Tournament {
  id: number;
  name: string;
  enroll_startDate: string;
  enroll_endDate: string;
  description: string;
  event_startDate: string;
  event_endDate: string;
  enrollRemaining?: RemainingTime;
  eventRemaining?: RemainingTime;
  teamCount: number;
  mode: string;
  teamLimit: number;
  joinCode: string;
  hasJoined: boolean;
  teamId: number;
}

// Utility Functions
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};

const calculateRemainingTime = (
  startDate: string,
  endDate: string
): RemainingTime => {
  const now = new Date();
  const eventStart = new Date(startDate);
  const eventEnd = new Date(endDate);
  const remaining = eventStart.getTime() - now.getTime();

  // If current time is between start and end (event is ongoing)
  if (now >= eventStart && now <= eventEnd) {
    return { time: "ongoing", status: "open", color: "#2ecc71" };
  }

  // If current time is after event end (event is finished)
  if (now > eventEnd) {
    return { time: "closed", status: "closed", color: "#ff4757" };
  }

  // If event hasn't started, show countdown
  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  // Format for hours:minutes:seconds
  if (days === 0) {
    return {
      time: `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      status: "open",
      color: "#2ecc71",
    };
  }

  // Format for days, hours, minutes, seconds
  return {
    time: `${days}d ${hours}h ${minutes}m ${seconds}s`,
    status: "open",
    color: "#2ecc71",
  };
};

const calculateEnrollRemainingTime = (endDate: string): RemainingTime => {
  const now = new Date();
  const enrollEnd = new Date(endDate);
  const remaining = enrollEnd.getTime() - now.getTime();

  // If enrollment end date is before now
  if (enrollEnd < now) {
    return { time: "closed", status: "closed", color: "#ff4757" };
  }

  // If enrollment is still open, show countdown
  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  if (days === 0) {
    return {
      time: `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      status: "open",
      color: "#2ecc71",
    };
  }

  return {
    time: `${days}d ${hours}h ${minutes}m ${seconds}s`,
    status: "open",
    color: "#2ecc71",
  };
};

// Component for Join Team Form
const JoinTeamForm = ({
  isPrivate = false,
  onClose,
}: {
  isPrivate?: boolean;
  onClose?: () => void;
}) => {
  const router = useRouter();
  const [teamName, setTeamName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const teamData = await PostJoinTeam({
        invite_code: inviteCode,
        teamName: isPrivate ? teamName : "",
      });

      if (!teamData?.team) throw new Error("Invalid response from server.");

      router.push(
        `/tournament/Tourteam_member?tournamentId=${teamData.team.tournament_id}&teamId=${teamData.team.id}`
      );
      if (onClose) onClose();
    } catch (error) {
      setErrorMessage("Code is invalid or Team is full. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {isPrivate && (
        <input
          type="text"
          placeholder="Team Name"
          className="w-full px-3 py-2 border rounded mb-4 text-center"
          maxLength={50}
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      )}
      <input
        type="text"
        placeholder="Invite Code"
        className="w-full px-3 py-2 border rounded mb-4 text-center"
        value={inviteCode}
        onChange={(e) => setInviteCode(e.target.value)}
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        disabled={isLoading}
      >
        {isLoading ? "Joining..." : "Join"}
      </button>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
    </form>
  );
};

// Main Component
export default function TournamentPage() {
  const [unjoinedTournaments, setUnjoinedTournaments] = useState<Tournament[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  // Check admin status
  useEffect(() => {
    setIsAdmin(isRoleAdmin());
  }, []);

  useEffect(() => {
    const fetchTournaments = async () => {
      setUnjoinedTournaments([]);
      try {
        const response = await GetTourList(page);
        setTotalPages(response.totalPages);
        setHasNextPage(response.hasNextPage);
        if (Array.isArray(response.data)) {
          const formattedData = response.data.map((tournament: Tournament) => ({
            ...tournament,
            enrollRemaining: calculateEnrollRemainingTime(
              tournament.enroll_endDate
            ),
            eventRemaining: calculateRemainingTime(
              tournament.event_startDate,
              tournament.event_endDate
            ),
          }));
          setUnjoinedTournaments(formattedData);
        }
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTournaments();
  }, [page]);

  useEffect(() => {
    const interval = setInterval(() => {
      setUnjoinedTournaments((prevData) =>
        prevData.map((tournament) => ({
          ...tournament,
          enrollRemaining: calculateEnrollRemainingTime(
            tournament.enroll_endDate
          ),
          eventRemaining: calculateRemainingTime(
            tournament.event_startDate,
            tournament.event_endDate
          ),
        }))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="relative">
        <div className="flex-1 flex justify-center">
          <h5 className="text-2xl font-semibold text-green-600 mt-6">
            Tournament List
          </h5>
        </div>

        {!isAdmin && (
          <div className="max-w-5xl mx-auto flex justify-center items-center space-x-8 mt-4">
            <div className="w-96">
              <h5 className="text-lg font-semibold text-green-600 text-center">
                Join Team
              </h5>
              <JoinTeamForm />
            </div>
            <div className="w-96">
              <h5 className="text-lg font-semibold text-green-600 text-center">
                Create private team
              </h5>
              <button
                onClick={() => setShowPopup(true)}
                className="w-full bg-blue-300 text-black py-2 rounded hover:bg-blue-400 transition duration-300"
              >
                Create
              </button>
            </div>
          </div>
        )}

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-2xl w-96 max-w-full relative border border-gray-700">
              <div className=" px-6 py-4 border-b ">
                <h2 className="text-xl font-semibold text-green-400">
                  Create Team
                </h2>
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 text-2xl"
                  onClick={() => setShowPopup(false)}
                >
                  &times;
                </button>
              </div>
              <br />
              <JoinTeamForm isPrivate onClose={() => setShowPopup(false)} />
            </div>
          </div>
        )}

        <div className="space-y-4 max-w-3xl mx-auto mt-4">
          {isLoading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : unjoinedTournaments.length > 0 ? (
            unjoinedTournaments.map((tournament, i) =>
              tournament.hasJoined ? (
                <MyteamTourlist
                  key={i}
                  id={tournament.id}
                  topic={tournament.name}
                  detail={tournament.description}
                  eventStart={formatDate(tournament.event_startDate)}
                  enrollEnd={formatDate(tournament.enroll_endDate)}
                  status={tournament.eventRemaining?.status || "closed"}
                  enrolltime={tournament.enrollRemaining?.time || "Time Ended"}
                  eventtime={tournament.eventRemaining?.time || "Time Ended"}
                  event_endDate={formatDate(tournament.event_endDate)}
                  hasJoined={tournament.hasJoined}
                  teamCount={tournament.teamCount}
                  mode={tournament.mode}
                  teamLimit={tournament.teamLimit}
                  joinCode={tournament.joinCode}
                  teamId={tournament.teamId}
                />
              ) : (
                <TournamentCard
                  key={i}
                  id={tournament.id}
                  topic={tournament.name}
                  detail={tournament.description}
                  eventStart={formatDate(tournament.event_startDate)}
                  enrollEnd={formatDate(tournament.enroll_endDate)}
                  status={tournament.eventRemaining?.status || "closed"}
                  enrolltime={tournament.enrollRemaining?.time || "Time Ended"}
                  eventtime={tournament.eventRemaining?.time || "Time Ended"}
                  event_endDate={formatDate(tournament.event_endDate)}
                  hasJoined={tournament.hasJoined}
                  teamCount={tournament.teamCount}
                  mode={tournament.mode}
                  teamLimit={tournament.teamLimit}
                  joinCode={tournament.joinCode}
                />
              )
            )
          ) : (
            <div className="text-center text-gray-600">
              No tournaments available.
            </div>
          )}
        </div>
      </div>
      <Pagination
        pageNumber={page}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}
