import React from "react";

interface score {
  point: string;
}
export default function ScoreBar({ point }: score) {
  return <div className="right-03">{point}</div>;
}
