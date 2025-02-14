"use client";
import { useState, useEffect } from "react";
import Leader from "./leader";
import Member from "./member";
import { GetTourMem } from "../../lib/API/GetTourMem";
import { useSearchParams } from "next/navigation";
import { GetUserData } from "../../lib/API/GetUserAPI";
import { DecodedToken } from "../../lib/types/DecodedToken";
import { useRouter } from "next/navigation";

export default function Tourteam_member() {
  const roles = {
    leader: "Leader",
    member: "Member",
  };
  const [TourMemData, setTourMemdData] = useState<TourMemData | null>(null);
  const searchParams = useSearchParams();
  const teamId = searchParams.get("teamId");
  const tournamentId = searchParams.get("tournamentId");
  const router = useRouter();

  type TourMemData = {
    tournamentName: string;
    teamName: string;
    invitedCode: string;
    memberCount: number;
    members: {
      userId: number;
      isLeader: boolean;
      student_id: number;
      first_name: string;
      last_name: string;
    }[];
  };

  const [role, setRole] = useState<keyof typeof roles | null>(null);
  const [data, setData] = useState<undefined | DecodedToken>(undefined);

  useEffect(() => {
    GetUserData().then((data) => {
      console.log(data);
      setData(data);
    });
  }, []);

  useEffect(() => {
    const fetchTourMemData = async () => {
      try {
        const response = await GetTourMem(Number(tournamentId), Number(teamId));
        setTourMemdData(response);
      } catch (error) {
        console.error("Error fetching tournament data:", error);
      }
    };

    fetchTourMemData();
  }, []);

  useEffect(() => {
    if (TourMemData && TourMemData.members && TourMemData.members.length > 0) {
      if (
        (TourMemData.members[0].first_name &&
          TourMemData.members[0].last_name) ==
        (data?.first_name && data?.last_name)
      ) {
        setRole("leader");
      } else {
        setRole("member");
      }
    }
  }, [TourMemData]);

  if (role === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#090147] text-white">
      {role === "leader" && <Leader />}
      {role === "member" && <Member />}
    </div>
  );
}
