import CardItem from "../component/cardItem";

interface ForensicsProps {
  selectedDifficulty: string | null;
}

export default function Forensics({ selectedDifficulty }: ForensicsProps) {
  const questions = [
    { id: 1, name: "linux", difficulty: "Easy", type: "Forensics" },
    { id: 2, name: "bread", difficulty: "Hard", type: "Forensics" },
    { id: 3, name: "meat", difficulty: "Easy", type: "Forensics" },
    { id: 4, name: "balls", difficulty: "Medium", type: "Forensics" },
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
          key={question.id}
          Topic={question.name}
          Level={question.difficulty}
          Category={question.type}
        />
      ))}
    </div>
  );
}
