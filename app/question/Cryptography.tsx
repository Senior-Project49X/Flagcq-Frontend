interface CryptographyProps {
  selectedDifficulty: string | null;
}

export default function Cryptography({
  selectedDifficulty,
}: CryptographyProps) {
  const questions = [
    { id: 1, name: "linux", difficulty: "Easy" },
    { id: 2, name: "bread", difficulty: "Hard" },
    { id: 3, name: "meat", difficulty: "Easy" },
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
        <div key={question.id} className="bg-white rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold">{question.name}</h2>
          <p
            className={`${
              question.difficulty === "Easy"
                ? "text-green-500"
                : question.difficulty === "Hard"
                ? "text-red-500"
                : "text-yellow-500"
            }`}
          >
            {question.difficulty}
          </p>
          <p className="text-gray-500 mt-2"> Cryptography</p>
          <button className="bg-[#5e4ae3] text-white py-2 px-4 mt-4 rounded-lg">
            Start
          </button>
        </div>
      ))}
    </div>
  );
}
