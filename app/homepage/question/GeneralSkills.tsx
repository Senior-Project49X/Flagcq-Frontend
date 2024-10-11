import CardItem from "../../component/cardItem";

interface GeneralSkillsProps {
  selectedDifficulty: string | null;
}

export default function GeneralSkills({
  selectedDifficulty,
}: GeneralSkillsProps) {
  const questions = [
    { id: 1, name: "linux", difficulty: "Easy", type: "General Skills" },
    { id: 2, name: "bread", difficulty: "Hard", type: "General Skills" },
    { id: 3, name: "meat", difficulty: "Easy", type: "General Skills" },
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
