"use client";

import GeneralSkills from "../question/GeneralSkills";
import Cryptography from "../question/Cryptography";
import Forensics from "../question/Forensics";
import Network from "../question/Network";

interface QuestionBoxProps {
  selectedCategory: string | null;
  selectedDifficulty: string | null;
}

export default function QuestionBox({
  selectedCategory,
  selectedDifficulty,
}: QuestionBoxProps) {
  const renderQuestions = (category: JSX.Element) => {
    // Logic to filter based on difficulty
    if (selectedDifficulty === "Easy") {
      return <div>{category} (Easy)</div>;
    } else if (selectedDifficulty === "Medium") {
      return <div>{category} (Medium)</div>;
    } else if (selectedDifficulty === "Hard") {
      return <div>{category} (Hard)</div>;
    }
    return category; // Show all difficulties by default
  };

  return (
    <div className="flex-1 p-6 rounded-lg">
      {/* Display Selected Category Content */}
      {selectedCategory === "All Categories" && (
        <>
          {renderQuestions(<GeneralSkills />)}
          {renderQuestions(<Cryptography />)}
          {renderQuestions(<Network />)}
          {renderQuestions(<Forensics />)}
        </>
      )}
      {selectedCategory === "General Skills" &&
        renderQuestions(<GeneralSkills />)}
      {selectedCategory === "Cryptography" && renderQuestions(<Cryptography />)}
      {selectedCategory === "Network" && renderQuestions(<Network />)}
      {selectedCategory === "Forensics" && renderQuestions(<Forensics />)}
    </div>
  );
}
