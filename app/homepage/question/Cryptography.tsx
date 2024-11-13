import QuestionCard from "../../component/QuestionCard";

interface CryptographyProps {
  selectedDifficulty: string | null;
}

export default function Cryptography({
  selectedDifficulty,
}: CryptographyProps) {
  const questions = [
    {
      id: 1,
      name: "linux",
      difficulty: "Easy",
      type: "Cryptography",
      isSolve: true,
    },
    {
      id: 3,
      name: "meat",
      difficulty: "Easy",
      type: "Cryptography",
      isSolve: false,
    },
    {
      id: 2,
      name: "bread",
      difficulty: "Hard",
      type: "Cryptography",
      isSolve: true,
    },
  ];

  const filteredQuestions =
    selectedDifficulty === "All Difficulty"
      ? questions
      : questions.filter(
          (question) => question.difficulty === selectedDifficulty
        );

  return (
    <div className="mt-12 grid grid-cols-3 gap-6 px-16">
      {filteredQuestions.map((question) => (
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
