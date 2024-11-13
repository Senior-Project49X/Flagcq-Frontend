import QuestionCard from "../../component/QuestionCard";

interface NetworkProps {
  selectedDifficulty: string | null;
}

export default function Network({ selectedDifficulty }: NetworkProps) {
  const questions = [
    {
      id: 1,
      name: "linux",
      difficulty: "Easy",
      type: "Network",
      isSolve: false,
    },
    {
      id: 2,
      name: "bread",
      difficulty: "Easy",
      type: "Network",
      isSolve: false,
    },
    {
      id: 3,
      name: "meat",
      difficulty: "Hard",
      type: "Network",
      isSolve: false,
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
