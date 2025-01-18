"use client";

import { useEffect, useState } from "react";
import Navbar from "../component/navbar";
import { GetTourList } from "../lib/API/GetTourListAPI";
import TournamentCard from "../component/TournamentCard";
import Pagination from "../component/Pagination";
import { useSearchParams } from "next/navigation";

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
        const response = await GetTourList();
        console.log("Tour list data:", response);

        if (Array.isArray(response)) {
          const initializedData = response.map((tournament) => ({
            ...tournament,
            enrollRemaining: calculateRemainingTime(tournament.enroll_endDate),
            eventRemaining: calculateRemainingTime(tournament.event_endDate),
          }));
          setTourData(initializedData);
        } else {
          console.error("Unexpected API response format:", response);
        }
      } catch (error) {
        console.error("Error fetching tour list data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTourListData();
  }, []);

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

  return (
    <div>
      <Navbar />
      <div className="space-y-4 max-w-3xl mx-auto">
        {isLoading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : tourData.length > 0 ? (
          tourData.map((tournament, i) => (
            <TournamentCard
              key={i}
              id={tournament.id}
              topic={tournament.name}
              detail={tournament.description}
              quantity={0}
              eventStart={formatDate(tournament.event_startDate)}
              enrollEnd={formatDate(tournament.enroll_endDate)}
              status={tournament.eventRemaining?.status || "closed"}
              enrolltime={tournament.enrollRemaining?.time || "Time Ended"}
              eventtime={tournament.eventRemaining?.time || "Time Ended"}
              event_endDate={formatDate(tournament.event_endDate)}
            />
          ))
        ) : (
          <div className="text-center text-gray-600">No tournaments found.</div>
        )}
      </div>
      <Pagination
        pagePath={"/tournament?page="}
        pageNumber={page}
        totalPages={10} // Replace with the actual total pages
        hasNextPage={true} // Replace with the actual condition
      />
    </div>
  );
}
