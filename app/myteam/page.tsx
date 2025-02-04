"use client";

import React, { FormEvent, useState, useEffect } from "react";
import Navbar from "../component/Navbar/navbar";
import { GetTourList } from "../lib/API/GetTourListAPI";
import Pagination from "../component/Pagination";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import MyteamCard from "../component/MyteamCard";
import Myadminpage from "./admin";
import Myuserpage from "./user";
import { isRoleAdmin } from "../lib/role";

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
  hasJoined: boolean;
}

// Component Function
export default function MyPage() {
  const [tourData, setTourData] = useState<Tournament[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const fetchTourListData = async () => {
      try {
        const response = await GetTourList(page);
        const Tournaments = response.data;
        setTotalPages(response.totalPages);
        setHasNextPage(response.hasNextPage);
        setTourData(Tournaments); // Correctly setting tournament data
        console.log("Tour list data:", Tournaments);
      } catch (error) {
        console.error("Error fetching tour list data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTourListData();
  }, [page]);

  useEffect(() => {
    const role = isRoleAdmin();
    setIsAdmin(role);
    if (!role) {
      setMode("");
    }
  }, []);

  return <div>{isAdmin ? <Myadminpage /> : <Myuserpage />}</div>;
}
