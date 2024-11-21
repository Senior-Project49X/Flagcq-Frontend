import QuestionCard from "./QuestionCard";

interface CryptographyProps {
  selectedDifficulty: string | null;
  selectedCategory: string | null;
  questions: {
    id: number;
    name: string;
    difficulty: string;
    type: string;
    isSolve: boolean;
  }[];
}

export default function Question({
  selectedDifficulty,
  selectedCategory,
  questions,
}: CryptographyProps) {
  const filtered = questions.filter((question) => {
    const categoryMatches =
      selectedCategory === "All Categories" ||
      question.type === selectedCategory;
    const difficultyMatches =
      selectedDifficulty === "All Difficulty" ||
      question.difficulty === selectedDifficulty;

    return categoryMatches && difficultyMatches;
  });

  return (
    <div className="mt-12 grid grid-cols-3 gap-6 px-16">
      {[...filtered].map((question, i) => (
        <QuestionCard
          key={i}
          Topic={question.name}
          Level={question.difficulty}
          Category={question.type}
          isSolve={question.isSolve}
        />
      ))}
    </div>
  );
}
