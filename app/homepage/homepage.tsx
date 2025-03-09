"use client";

import Navbar from "../component/Navbar/navbar";

import { useSearchParams } from "next/navigation";

import {
  CategoryReroute,
  PageReroute,
  UsePage,
} from "../lib/types/QuestionType";
import { isRoleAdmin } from "../lib/role";
import QuestionRefactor from "../component/QuestionRefactor";
export default function Homepage() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";

  return (
    <div>
      <Navbar />

      <QuestionRefactor
        useMode={isRoleAdmin() ? UsePage.AllMode : UsePage.Practice}
        categoryReroute={CategoryReroute.HomePage}
        PageReroute={PageReroute.HomePage}
        pageNumber={page}
      />
    </div>
  );
}
