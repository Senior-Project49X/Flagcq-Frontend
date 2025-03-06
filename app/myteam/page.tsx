"use client";

import React, { FormEvent, useState, useEffect } from "react";
import Navbar from "../component/Navbar/navbar";
import { JoinTeam } from "../lib/API/GetTourListAPI";
import Pagination from "../component/Pagination";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import MyteamCard from "../component/MyteamCard";

// Define the type for tournament data
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
  teamId: number;
  teamCount: number;
  hasJoined: boolean;
  mode: string;
  teamLimit: number;
}

// Utility function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function Myuserpage() {
  const [tourData, setTourData] = useState<Tournament[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const router = useRouter();

  // Calculate remaining time for the event
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

  // Calculate remaining time for enrollment
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

  useEffect(() => {
    const fetchTourListJoinedData = async () => {
      try {
        const response = await JoinTeam(page);
        const Tournaments1 = response.data;
        setTotalPages(response.totalPages);
        setHasNextPage(response.hasNextPage);
        console.log("Tour list data:", Tournaments1);

        if (Array.isArray(Tournaments1)) {
          const initializedData = Tournaments1.map(
            (tournament1: Tournament) => ({
              ...tournament1,
              enrollRemaining: calculateEnrollRemainingTime(
                tournament1.enroll_endDate
              ),
              eventRemaining: calculateRemainingTime(
                tournament1.event_startDate,
                tournament1.event_endDate
              ),
            })
          );
          setTourData(initializedData);
        } else {
          console.error("Unexpected API response format:", Tournaments1);
        }
      } catch (error) {
        console.error("Error fetching tour list data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTourListJoinedData();
  }, [page]);

  // This effect sets up the countdown timer, updating every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTourData((prevData) =>
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

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      <Navbar />
      <div className="relative">
        {/* Tournament List */}
        <h5 className="text-center text-2xl font-semibold text-green-600">
          Tournament Joined
        </h5>
        <div className="space-y-4 max-w-3xl mx-auto mt-8">
          {isLoading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : tourData.filter((tournament1) => tournament1.hasJoined).length >
            0 ? (
            tourData
              .filter((tournament1) => tournament1.hasJoined) // Filter tournaments where hasJoined is true
              .map((tournament1, i) => (
                <MyteamCard
                  key={i}
                  id={tournament1.id}
                  topic={tournament1.name}
                  detail={tournament1.description}
                  eventStart={formatDate(tournament1.event_startDate)}
                  enrollEnd={formatDate(tournament1.enroll_endDate)}
                  status={tournament1.eventRemaining?.status || "closed"}
                  enrolltime={tournament1.enrollRemaining?.time || "Time Ended"}
                  eventtime={tournament1.eventRemaining?.time || "Starting"}
                  event_endDate={formatDate(tournament1.event_endDate)}
                  hasJoined={tournament1.hasJoined}
                  teamId={tournament1.teamId}
                  teamCount={tournament1.teamCount}
                  mode={tournament1.mode}
                  teamLimit={tournament1.teamLimit}
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
        pagePath={"/myteam?page="}
        pageNumber={page}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
      />
    </div>
  );
}
