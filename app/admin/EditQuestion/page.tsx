"use client";
import React from "react";
import CreateQuestion from "../CreateQuestion/page";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("QuestionID");

  return (
    <div>
      <CreateQuestion id={Number(id)} />
    </div>
  );
}
