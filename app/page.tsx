"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import Homepage from "./homepage/homepage";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    "All Difficulty"
  );
  const [isLogin, setIsLogin] = useState(false);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleDifficultyClick = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };

  return <div>{isLogin ? <Homepage /> : redirect("/login")}</div>;
}
