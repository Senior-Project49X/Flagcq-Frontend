"use client";

import React, { FormEvent, useState, useEffect } from "react";
import Navbar from "../component/navbar";
import { GetTourList } from "../lib/API/GetTourListAPI";
import TournamentCard from "../component/TournamentCard";
import Pagination from "../component/Pagination";
import { useSearchParams } from "next/navigation";
import { PostJoinTeam } from "../lib/API/PostJoinTeam";
import { useRouter } from "next/navigation";

// Define the type for tournament data
interface RemainingTime {
  time: string;
  status: string;
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
  teamId: number;
  teamCount: number;
}

// Utility function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function Page() {
  const [tourData, setTourData] = useState<Tournament[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isLoadingJoin, setIsLoadingJoin] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [inviteCode, setInviteCode] = useState("");
  const router = useRouter();

  const calculateRemainingTime = (endDate: string): RemainingTime => {
    const now = new Date();
    const targetDate = new Date(endDate);
    const remaining = targetDate.getTime() - now.getTime();

    if (remaining <= 0) {
      return { time: "Time Ended", status: "closed" };
    }

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    return {
      time: `${days}d ${hours}h ${minutes}m ${seconds}s`,
      status: "open",
    };
  };

  useEffect(() => {
    const fetchTourListData = async () => {
      try {
        const response = await GetTourList(page);
        const Tournaments = response.data;
        setTotalPages(response.totalPages);
        setHasNextPage(response.hasNextPage);
        console.log("Tour list data:", Tournaments);

        if (Array.isArray(Tournaments)) {
          const initializedData = Tournaments.map((tournament: Tournament) => ({
            ...tournament,
            enrollRemaining: calculateRemainingTime(tournament.enroll_endDate),
            eventRemaining: calculateRemainingTime(tournament.event_endDate),
          }));
          setTourData(initializedData);
        } else {
          console.error("Unexpected API response format:", Tournaments);
        }
      } catch (error) {
        console.error("Error fetching tour list data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTourListData();
  }, [page]);

  // This effect sets up the countdown timer, updating every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTourData((prevData) =>
        prevData.map((tournament) => ({
          ...tournament,
          enrollRemaining: calculateRemainingTime(tournament.enroll_endDate),
          eventRemaining: calculateRemainingTime(tournament.event_endDate),
        }))
      );
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Join a team
  const handleJoinTeam = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoadingJoin(true);
      setSuccessMessage(null);
      const teamData = await PostJoinTeam({ invite_code: inviteCode }); // Joining a team
      setSuccessMessage("Successfully joined the team!");
      router.push(
        `/tournament/Tourteam_member?tournamentId=${teamData.team.tournament_id}&teamId=${teamData.team.id}`
      );
    } catch (error) {
      console.error("Error joining team:", error);
    } finally {
      setIsLoadingJoin(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="relative">
        {/* Join Team Heading */}
        <h5 className="text-lg font-semibold text-green-600 mb-4 ml-[1470px]">
          Join Team
        </h5>

        {/* Invite Code Form */}
        <form
          onSubmit={handleJoinTeam}
          className="absolute top-10 right-4 w-80 flex items-center space-x-2"
        >
          <input
            type="text"
            placeholder="Invite Code"
            className="flex-1 px-3 py-2 border rounded"
            maxLength={50}
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            disabled={isLoadingJoin}
          >
            {isLoadingJoin ? "Joining..." : "Join"}
          </button>
        </form>

        {/* Tournament List */}
        <h5 className="text-center text-2xl font-semibold text-green-600">
          Tournament List
        </h5>
        <div className="space-y-4 max-w-3xl mx-auto mt-8">
          {isLoading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : tourData.length > 0 ? (
            tourData.map((tournament, i) => (
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
                hasJoined={true}
                teamId={tournament.teamId}
                teamCount={0}
              />
            ))
          ) : (
            <div className="text-center text-gray-600">
              No tournaments found.
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        pagePath={"/tournament?page="}
        pageNumber={page}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}
