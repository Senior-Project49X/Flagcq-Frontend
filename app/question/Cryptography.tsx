import CardItem from "../component/cardItem";

interface CryptographyProps {
  selectedDifficulty: string | null;
}

export default function Cryptography({
  selectedDifficulty,
}: CryptographyProps) {
  const questions = [
    {
      id: 1,
      name: "linux tot 555 kuyqqqqqq",
      difficulty: "Easy",
      type: "Cryptography",
    },
    { id: 2, name: "bread", difficulty: "Hard", type: "Cryptography" },
    { id: 3, name: "meat", difficulty: "Easy", type: "Cryptography" },
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
