"use client";
import { useEffect, useState } from "react";
import Navbar from "../component/navbar";
import { GetTourList } from "../lib/API/GetTourListAPI";
import TournamentCard from "../component/TournamentCard";
import Pagination from "../component/Pagination";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const [tourData, setTourData] = useState<
    {
      name: string;
      enroll_startDate: string;
      enroll_endDate: string;
      description: string;
      event_startDate: string;
      event_endDate: string;
    }[]
  >([]); // Ensure this matches the API response structure
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const calculateEnrollRemainingTime = (enrollEndDate: string) => {
    const now = new Date();
    const endDate = new Date(enrollEndDate); // Convert string to Date
    const remaining = endDate.getTime() - now.getTime();

    if (remaining <= 0) {
      return { time: "Enroll Ended", status: "closed" };
    }

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    return { time: `${hours}h ${minutes}m ${seconds}s`, status: "open" };
  };

  const calculateEventRemainingTime = (eventEndDate: string) => {
    const now = new Date();
    const endDate2 = new Date(eventEndDate);
    const remaining = endDate2.getTime() - now.getTime();

    if (remaining <= 0) {
      return { time2: "Event Ended", status2: "closed" }; // Always return string for time2
    }

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    return { time2: `${hours}h ${minutes}m ${seconds}s`, status2: "open" };
  };

  useEffect(() => {
    const fetchTourListData = async () => {
      try {
        const response = await GetTourList();
        console.log("Tour list data:", response); // Debugging the response

        if (Array.isArray(response)) {
          setTourData(response); // Ensure we set an array
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

  return (
    <div>
      <Navbar />
      <div className="space-y-4 max-w-3xl mx-auto">
        {isLoading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : tourData.length > 0 ? (
          <>
            {tourData.map((tournament, i) => {
              const { time, status } = calculateEnrollRemainingTime(
                tournament.enroll_endDate
              );

              const { time2, status2 } = calculateEventRemainingTime(
                tournament.event_endDate
              );

              return (
                <TournamentCard
                  key={i}
                  topic={tournament.name}
                  detail={tournament.description}
                  quantity={0}
                  eventStart={tournament.event_startDate}
                  enrollEnd={tournament.event_endDate}
                  status={status}
                  enrolltime={time}
                  eventtime={time2}
                />
              );
            })}
          </>
        ) : (
          <div className="text-center text-gray-600">No tournaments found.</div>
        )}
      </div>
      <Pagination pagePath={"/tournament?page="} pageNumber={page} />
    </div>
  );
}
