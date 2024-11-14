import QuestionCard from "./QuestionCard";

interface CryptographyProps {
  selectedDifficulty: string | null;
  selectedCategory: string | null;
}

export default function Question({
  selectedDifficulty,
  selectedCategory,
}: CryptographyProps) {
  const questions = [
    {
      id: 1,
      name: "linux1",
      difficulty: "Easy",
      type: "Cryptography",
      isSolve: true,
    },
    {
      id: 2,
      name: "meat2",
      difficulty: "Easy",
      type: "Cryptography",
      isSolve: false,
    },
    {
      id: 3,
      name: "bread3",
      difficulty: "Hard",
      type: "Cryptography",
      isSolve: true,
    },
    {
      id: 4,
      name: "bread4",
      difficulty: "Hard",
      type: "Network",
      isSolve: true,
    },
    {
      id: 5,
      name: "bread5",
      difficulty: "Easy",
      type: "Forensics",
      isSolve: true,
    },
    {
      id: 6,
      name: "bread6",
      difficulty: "Easy",
      type: "GeneralSkills",
      isSolve: true,
    },
    {
      id: 7,
      name: "bread7",
      difficulty: "Hard",
      type: "Forensics",
      isSolve: true,
    },
  ];

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
      {[...filtered].map((question) => (
        <QuestionCard
          key={question.id}
          Topic={question.name}
          Level={question.difficulty}
          Category={question.type}
          isSolve={question.isSolve}
        />
      ))}
    </div>
  );
}
