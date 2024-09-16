import CardItem from "../component/cardItem";

interface NetworkProps {
  selectedDifficulty: string | null;
}

export default function Network({ selectedDifficulty }: NetworkProps) {
  const questions = [
    { id: 1, name: "linux", difficulty: "Easy", type: "Network" },
    { id: 2, name: "bread", difficulty: "Hard", type: "Network" },
    { id: 3, name: "meat", difficulty: "Easy", type: "Network" },
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
        <CardItem
          Topic={question.name}
          Level={question.difficulty}
          Category={question.type}
        />
      ))}
    </div>
  );
}
