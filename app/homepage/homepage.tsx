"use client";

import { useState, useEffect } from "react";
import Navbar from "../component/navbar";
import Category from "../category";
import Difficult from "../difficult";
import Pagination from "../component/Pagination";
import { useSearchParams } from "next/navigation";
import Question from "../component/Question";
import { GetQuestions } from "../lib/API/QuestionAPI";
import ScoreBar from "../component/ScoreBar";
import { GetUserPoints } from "../lib/API/GetUserAPI";

interface question {
  id: string;
  name: string;
  difficulty: string;
  type: string;
  isSolve: boolean;
}

export default function Homepage() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<string>("All Difficulty");
  const [isLogin, setIsLogin] = useState(false);
  const [point, setPoint] = useState<string>("0");
  const [questions, setQuestions] = useState<question[]>([]);
  // const questions = [
  //   {
  //     id: 1,
  //     name: "linux1",
  //     difficulty: "Easy",
  //     type: "Cryptography",
  //     isSolve: true,
  //   },
  //   {
  //     id: 2,
  //     name: "meat2",
  //     difficulty: "Easy",
  //     type: "Cryptography",
  //     isSolve: false,
  //   },
  //   {
  //     id: 3,
  //     name: "bread3",
  //     difficulty: "Hard",
  //     type: "Cryptography",
  //     isSolve: true,
  //   },
  //   {
  //     id: 4,
  //     name: "bread4",
  //     difficulty: "Hard",
  //     type: "Network",
  //     isSolve: true,
  //   },
  //   {
  //     id: 5,
  //     name: "bread5",
  //     difficulty: "Easy",
  //     type: "Forensics",
  //     isSolve: true,
  //   },
  //   {
  //     id: 6,
  //     name: "bread6",
  //     difficulty: "Easy",
  //     type: "GeneralSkills",
  //     isSolve: true,
  //   },
  //   {
  //     id: 7,
  //     name: "bread7",
  //     difficulty: "Hard",
  //     type: "Forensics",
  //     isSolve: true,
  //   },
  // ];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleDifficultyClick = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };

  const fetchUserQuestions = async () => {
    const userQuestion = await GetQuestions(
      selectedCategory,
      selectedDifficulty,
      page
    );
    console.log(userQuestion.data);
    setQuestions(userQuestion.data);
  };
  useEffect(() => {
    fetchUserQuestions();
  }, [selectedCategory, selectedDifficulty, page]);

  const fetchUserData = async () => {
    const userData = await GetUserPoints(); // Now correctly awaits the returned value
    setPoint(userData);
    console.log("a", point);
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div>
      <>
        <Navbar />
        <ScoreBar point={point} />
        <div className="flex">
          <Category
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
          />

          <Difficult
            selectedDifficulty={selectedDifficulty}
            onDifficultyClick={handleDifficultyClick}
          />

          {/* Question Box */}
          <div className="flex-1 p-6 rounded-lg">
            <>
              <Question
                selectedDifficulty={selectedDifficulty}
                selectedCategory={selectedCategory}
                questions={questions}
              />
            </>

            <Pagination pagePath={"/?page="} pageNumber={page} />
          </div>
        </div>
      </>
    </div>
  );
}
