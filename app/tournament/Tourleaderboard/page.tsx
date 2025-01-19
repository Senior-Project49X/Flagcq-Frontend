"use client";

import Navbar from "../../component/navbar";
import { GetLbTeamTourData } from "../../lib/API/GetLbTeamTourAPI";
import { GetLbTeamTourAllData } from "../../lib/API/GetLbTeamTourAllAPI";
import { useState, useEffect } from "react";

// Define types for the leaderboard data and team data
type TeamLeaderboardData = {
  team_name: string;
  members: {
    first_name: string;
    last_name: string;
    points: string;
  }[];
  total_points: string;
  rank: string;
};

type TeamLeaderboardAllData = {
  name: string;
}[];

export default function TeamLeaderboard() {
  const [teamLeaderboardData, setTeamLeaderboardData] =
    useState<TeamLeaderboardData | null>(null);
  const [teamLeaderboardAllData, setTeamLeaderboardAllData] =
    useState<TeamLeaderboardAllData | null>(null);
  const [isLoadingTeam, setIsLoadingTeam] = useState(true);
  const [isLoadingAllTeams, setIsLoadingAllTeams] = useState(true);

  // Fetch data for a specific team's leaderboard
  useEffect(() => {
    const fetchTeamLeaderboardData = async () => {
      try {
        const response = await GetLbTeamTourData(1, 3); // API call
        setTeamLeaderboardData(response);
      } catch (error) {
        console.error("Error fetching team leaderboard data:", error);
      } finally {
        setIsLoadingTeam(false);
      }
    };

    fetchTeamLeaderboardData();
  }, []);

  // Fetch data for all teams' leaderboard
  useEffect(() => {
    const fetchTeamLeaderboardAllData = async () => {
      try {
        const response = await GetLbTeamTourAllData(3); // API call
        setTeamLeaderboardAllData(response);
      } catch (error) {
        console.error("Error fetching all teams leaderboard data:", error);
      } finally {
        setIsLoadingAllTeams(false);
      }
    };

    fetchTeamLeaderboardAllData();
  }, []);

  return (
    <div className="min-h-screen bg-[#090147] text-white">
      {/* Navbar */}
      <Navbar />

      {/* Back Button */}
      <div className="flex justify-between items-center p-6">
        <button
          onClick={() => window.history.back()}
          className="text-xl text-green-300 hover:underline ml-auto"
        >
          Back →
        </button>
      </div>

      {/* All Teams Leaderboard */}
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Tournament Leaderboard
        </h1>
        <div className="bg-gray-100 rounded-lg p-6 text-black shadow-md">
          <div className="flex justify-between mb-4">
            <span className="font-bold">Rank</span>
            <span className="font-bold">Team Name</span>
          </div>
          <hr className="border-t-2 mb-4" />

          {!isLoadingAllTeams && teamLeaderboardAllData?.length ? (
            teamLeaderboardAllData.map((team, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-lg mb-2"
              >
                <span>{index + 1}</span>
                <span>{team.name}</span>
              </div>
            ))
          ) : (
            <p className="text-center">
              {isLoadingAllTeams
                ? "Loading leaderboard..."
                : "No team data available."}
            </p>
          )}
        </div>
      </div>

      {/* Specific Team Leaderboard */}
      <div>
        {isLoadingTeam ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : (
          <>
            {/* Team Overview */}
            <h1 className="text-2xl font-bold mb-8 text-center">
              Our Team Leaderboard
            </h1>
            <div className="bg-white text-black rounded-lg shadow-md px-4 py-6 mb-6 max-w-[400px] mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">
                Team {teamLeaderboardData?.team_name || "N/A"}
              </h2>
              <div className="text-center text-base sm:text-lg mb-4">
                Rank: {teamLeaderboardData?.rank || "N/A"}
              </div>
              <div className="text-center text-lg sm:text-xl font-semibold text-green-600">
                Total Points: {teamLeaderboardData?.total_points || "0"}
              </div>
            </div>

            <div className="max-w-4xl mx-auto p-6">
              {/* Team Members */}
              <div className="bg-white text-black rounded-lg shadow-md p-6">
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span className="text-green-600">Member</span>
                  <span className="text-red-500">Score</span>
                </div>
                <hr className="border-t-2 mb-4" />
                {teamLeaderboardData?.members?.length ? (
                  teamLeaderboardData.members.map((member, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center text-lg mb-2"
                    >
                      <span>
                        {index + 1}. {member.first_name} {member.last_name}
                      </span>
                      <span className="text-red-500">{member.points}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500">
                    No member data available.
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
