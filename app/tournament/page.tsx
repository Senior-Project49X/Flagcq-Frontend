"use client";
import { useEffect, useState } from "react";
import Navbar from "../component/navbar";
import TournamentCard from "../component/TournamentCard";
import Pagination from "../component/Pagination";
import { useSearchParams } from "next/navigation";
export default function page() {
  const tournaments = [
    {
      Topic: "linux",
      Detail: "linux for beginning",
      Quantity: 15,
      EventStart: "DD/MM/YYYY",
      EnrollEnd: "DD/MM/YYYY",
    },
    {
      Topic: "cmu 1",
      Detail: "cmu testing for cpe 1",
      Quantity: 35,
      EventStart: "DD/MM/YYYY",
      EnrollEnd: "DD/MM/YYYY",
    },
    {
      Topic: "cmu 2",
      Detail: "cmu testing for cpe 2",
      Quantity: 20,
      EventStart: "DD/MM/YYYY",
      EnrollEnd: "DD/MM/YYYY",
    },
  ];
  const [closeModal, setCloseModal] = useState(true);

  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  return (
    <div>
      <Navbar />
      <div className="space-y-4 max-w-3xl mx-auto">
        {tournaments.map((tournament, i) => (
          <TournamentCard
            key={i}
            topic={tournament.Topic}
            detail={tournament.Detail}
            quantity={tournament.Quantity}
            eventStart={tournament.EventStart}
            enrollEnd={tournament.EnrollEnd}
            status={"open"}
          />
        ))}
      </div>
      <Pagination pagePath={"/tournament?page="} pageNumber={page} />
    </div>
  );
}
