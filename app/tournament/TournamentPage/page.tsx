"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../../component/Navbar/navbar";
import Pagination from "../../component/Pagination";
import Question from "../../component/Question";
import { GetQuestions } from "../../lib/API/QuestionAPI";
import {
  CategoryReroute,
  PageReroute,
  questions,
  UsePage,
} from "../../lib/types/QuestionType";
import { GetTourPage } from "@/app/lib/API/GetTourPage";
import { isRoleAdmin } from "../../lib/role";
import {
  FaTrophy,
  FaClock,
  FaCalendarAlt,
  FaMedal,
  FaUsers,
  FaStar,
} from "react-icons/fa";
import QuestionRefactor from "@/app/component/QuestionRefactor";

interface TourData {
  name: string;
  teamName: string;
  teamId: number;
  teamRank: number;
  teamScore: number;
  individualScore: number;
  event_endDate: string;
  event_startDate: string;
  enroll_startDate: string;
  enroll_endDate: string;
}

interface InfoBlockProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
}

export default function Homepage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tournament_id = searchParams.get("tournamentId");
  const [tourData, setTourData] = useState<TourData | null>(null);
  const [remainingTime, setRemainingTime] = useState("");
  const [page, setPage] = useState("1");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const EnrollEnddate = new Date(tourData?.enroll_endDate ?? "");
  const EventEnddate = new Date(tourData?.event_endDate ?? "");
  const EnrollStartdate = new Date(tourData?.enroll_startDate ?? "");
  const EventStartdate = new Date(tourData?.event_startDate ?? "");

  useEffect(() => {
    const role = isRoleAdmin();
    setIsAdmin(role);
  }, []);

  useEffect(() => {
    const pageParam = searchParams.get("page") || "1";
    setPage(pageParam);
  }, [searchParams]);

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        if (!tournament_id) return;
        const response = await GetTourPage(Number(tournament_id));
        setTourData(response);
      } catch (error) {
        console.error("Error fetching tournament data:", error);
      }
    };

    fetchTourData();
  }, [tournament_id]);

  useEffect(() => {
    if (!tourData?.event_endDate) return;

    const calculateRemainingTime = () => {
      const now = new Date();
      const endDate = new Date(tourData.event_endDate);

      // Check if endDate is a valid date
      if (isNaN(endDate.getTime())) {
        console.error("Invalid event_endDate:", tourData.event_endDate);
        setRemainingTime("Invalid Date");
        return;
      }

      const remaining = endDate.getTime() - now.getTime();

      if (remaining <= 0) {
        setRemainingTime("Event Ended");
        return;
      }

      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    const interval = setInterval(calculateRemainingTime, 1000);
    calculateRemainingTime();

    return () => clearInterval(interval);
  }, [tourData?.event_endDate]);

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="w-80 p-6 bg-darkblue text-white">
          <div className="w-80 p-6 bg-[#151a3d]/90 backdrop-blur-sm rounded-xl shadow-xl border border-[#2a2f62]">
            {isAdmin && (
              <>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-[#00ffcc]">
                    Tournament Name
                  </h2>
                  <p className="text-lg text-white mt-2">
                    {tourData?.name ?? "Loading..."}
                  </p>
                </div>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-[#00ffcc]">
                    Remaining Time
                  </h2>
                  <p className="text-lg text-white mt-2">
                    {remainingTime || "Calculating..."}
                  </p>
                </div>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-[#00ffcc]">
                    Enroll Start Date
                  </h2>
                  <p className="text-lg text-white mt-2">
                    {EnrollStartdate.toLocaleString() || "Calculating..."}
                  </p>
                </div>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-[#00ffcc]">
                    Enroll End Date
                  </h2>
                  <p className="text-lg text-white mt-2">
                    {EnrollEnddate.toLocaleString() || "Calculating..."}
                  </p>
                </div>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-[#00ffcc]">
                    Event Start Date
                  </h2>
                  <p className="text-lg text-white mt-2">
                    {EventStartdate.toLocaleString() || "Calculating..."}
                  </p>
                </div>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-[#00ffcc]">
                    Event End Date
                  </h2>
                  <p className="text-lg text-white mt-2">
                    {EventEnddate.toLocaleString() || "Calculating..."}
                  </p>
                </div>
              </>
            )}
            {!isAdmin && (
              <>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-[#00ffcc]">
                    Tournament Name
                  </h2>
                  <p className="text-lg text-white mt-2">
                    {tourData?.name ?? "Loading..."}
                  </p>
                </div>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-[#00ffcc]">
                    Remaining Time
                  </h2>
                  <p className="text-lg text-white mt-2">
                    {remainingTime || "Calculating..."}
                  </p>
                </div>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-[#00ffcc]">
                    Team Rank
                  </h2>
                  <p className="text-lg text-white mt-2">
                    {tourData?.teamRank || "N/A"}
                  </p>
                </div>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-[#00ffcc]">
                    Team Score
                  </h2>
                  <p className="text-lg text-white mt-2">
                    {tourData?.teamScore || 0} Points
                  </p>
                </div>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-[#00ffcc]">
                    Individual Score
                  </h2>
                  <p className="text-lg text-white mt-2">
                    {tourData?.individualScore ?? 0} Points
                  </p>
                </div>
              </>
            )}
            <button
              onClick={() =>
                router.push(
                  `/tournament/Tourleaderboard?tournamentId=${Number(
                    tournament_id
                  )}`
                )
              }
              className="w-full bg-[#00ffcc]/20 text-[#00ffcc] py-2 px-4 rounded-lg hover:bg-[#00ffcc]/30 transition-all duration-300 font-semibold"
            >
              Leaderboard
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 rounded-lg">
          <QuestionRefactor
            tournament_id={Number(tournament_id)}
            useMode={UsePage.Tournament}
            categoryReroute={CategoryReroute.Tournament}
            PageReroute={PageReroute.Tournament}
            pageNumber={page}
          />
        </div>
      </div>
    </div>
  );
}
