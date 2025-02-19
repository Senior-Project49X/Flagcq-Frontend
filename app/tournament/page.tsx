"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Navbar from "../component/Navbar/navbar";
import { GetTourList, JoinTeam } from "../lib/API/GetTourListAPI";
import { PostJoinTeam } from "../lib/API/PostJoinTeam";
import TournamentCard from "../component/TournamentCard";
import MyteamTourlist from "../component/MyteamTourlist";
import Pagination from "../component/Pagination";
import { useSearchParams, useRouter } from "next/navigation";
import { isRoleAdmin } from "../lib/role";

// Define Tournament Type
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
  teamCount: number;
  mode: string;
  teamLimit: number;
  joinCode: string;
  hasJoined: boolean;
  teamId: number;
}

// Format Date Utility
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); // Format: DD/MM/YYYY
};

// Calculate Remaining Time
const calculateRemainingTime = (endDate: string): RemainingTime => {
  const now = new Date();
  const targetDate = new Date(endDate);
  const remaining = targetDate.getTime() - now.getTime();

  if (remaining <= 0) return { time: "Time Ended", status: "closed" };

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  return { time: `${days}d ${hours}h ${minutes}m ${seconds}s`, status: "open" };
};

export default function Page() {
  const [unjoinedTournaments, setUnjoinedTournaments] = useState<Tournament[]>(
    []
  );
  const [joinedTournaments, setJoinedTournaments] = useState<Tournament[]>([]);

  const [teamName, setTeamName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isLoadingJoin, setIsLoadingJoin] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [inviteCode, setInviteCode] = useState("");
  const [inviteCodePrivate, setInviteCodePrivate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessagePrivate, setErrorMessagePrivate] = useState("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const role = isRoleAdmin();
    setIsAdmin(role);
    if (!role) {
      console.log("Not an admin");
    }
  }, []);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await GetTourList(page);
        setTotalPages(response.totalPages);
        setHasNextPage(response.hasNextPage);
        console.log("Tournaments:", response.data);

        if (Array.isArray(response.data)) {
          const formattedData = response.data.map((tournament: Tournament) => ({
            ...tournament,
            enrollRemaining: calculateRemainingTime(tournament.enroll_endDate),
            eventRemaining: calculateRemainingTime(tournament.event_endDate),
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
          enrollRemaining: calculateRemainingTime(tournament.enroll_endDate),
          eventRemaining: calculateRemainingTime(tournament.event_endDate),
        }))
      );

      setJoinedTournaments((prevData) =>
        prevData.map((tournament) => ({
          ...tournament,
          enrollRemaining: calculateRemainingTime(tournament.enroll_endDate),
          eventRemaining: calculateRemainingTime(tournament.event_endDate),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleJoinTeam = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoadingJoin(true);
    setSuccessMessage(null);
    try {
      const teamData = await PostJoinTeam({
        invite_code: inviteCode,
        teamName: teamName,
      });
      if (!teamData || !teamData.team) {
        throw new Error("Invalid response from server.");
      }
      setSuccessMessage("Successfully joined the team!");
      router.push(
        `/tournament/Tourteam_member?tournamentId=${teamData.team.tournament_id}&teamId=${teamData.team.id}`
      );
    } catch (error) {
      console.error("Error joining team:", error);
      setErrorMessage("Code is invalid or Team is full. Please try again.");
    } finally {
      setIsLoadingJoin(false);
    }
  };

  const handleJoinTeamPrivate = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoadingJoin(true);
    setSuccessMessage(null);
    try {
      const teamData = await PostJoinTeam({
        invite_code: inviteCodePrivate,
        teamName: teamName,
      });
      if (!teamData || !teamData.team) {
        throw new Error("Invalid response from server.");
      }
      setSuccessMessage("Successfully joined the team!");
      router.push(
        `/tournament/Tourteam_member?tournamentId=${teamData.team.tournament_id}&teamId=${teamData.team.id}`
      );
    } catch (error) {
      console.error("Error joining team:", error);
      setErrorMessagePrivate(
        "Code is invalid or team is full. Please try again."
      );
    } finally {
      setIsLoadingJoin(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="relative">
        <div className="flex-1 flex justify-center">
          <h5 className="text-2xl font-semibold text-green-600 mt-10 ">
            Tournament List
          </h5>
        </div>
        <br />
        <div className="max-w-5xl mx-auto flex justify-center items-center space-x-8">
          {!isAdmin && (
            <>
              {/* Join Team Section */}
              <div className="w-96 flex flex-col items-center">
                <h5 className="text-lg font-semibold text-green-600 text-center">
                  Join Team
                </h5>
                <form
                  onSubmit={handleJoinTeam}
                  className="w-full flex items-center space-x-2"
                >
                  <input
                    type="text"
                    placeholder="Invite Code"
                    className="flex-1 px-3 py-2 border rounded text-center"
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
                {errorMessage && (
                  <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                )}
              </div>

              {/* Join Private Tournament Section */}
              <div className="w-96 flex flex-col items-center">
                <h5 className="text-lg font-semibold text-green-600 text-center">
                  Join Private Tournament
                </h5>
                <button
                  onClick={() => setShowPopup(true)}
                  className="w-full bg-blue-300 text-black py-2 rounded hover:bg-blue-400 transition duration-300"
                >
                  Join Private
                </button>
              </div>

              {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-96 max-w-full relative z-25 text-center">
                    <button
                      className="absolute top-2 right-4 text-black text-2xl"
                      onClick={() => setShowPopup(false)}
                    >
                      &times;
                    </button>
                    <br />
                    <h5 className="text-sm font-bold mb-2">Create New Team</h5>

                    <form onSubmit={handleJoinTeamPrivate} className="w-full">
                      <input
                        type="text"
                        placeholder="Team Name"
                        className="w-full px-3 py-2 border rounded mb-4 text-center"
                        maxLength={50}
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                      />

                      <h5 className="text-sm font-bold mb-2">
                        Code from Private Tournament
                      </h5>

                      <input
                        type="text"
                        placeholder="Invite Code"
                        className="w-full px-3 py-2 border rounded mb-4 text-center"
                        value={inviteCodePrivate}
                        onChange={(e) => setInviteCodePrivate(e.target.value)}
                      />

                      <button
                        type="submit"
                        className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                        disabled={isLoadingCreate}
                      >
                        {isLoadingCreate ? "Creating..." : "Create"}
                      </button>
                    </form>
                    {errorMessagePrivate && (
                      <p className="text-red-500 text-sm mt-2">
                        {errorMessagePrivate}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Joined Tournaments */}
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
        pagePath="/tournament?page="
        pageNumber={page}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}
