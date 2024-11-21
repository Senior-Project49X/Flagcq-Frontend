import QuestionCard from "./QuestionCard";

interface CryptographyProps {
  selectedDifficulty: string | null;
  selectedCategory: string | null;
  questions: {
    title: string;
    categories_name: string;
    id: string;
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
          id={question.id}
          Topic={question.title}
          Level={question.difficultys_id}
          Category={question.categories_name}
          isSolve={question.isSolve}
        />
      ))}
    </div>
  );
}
