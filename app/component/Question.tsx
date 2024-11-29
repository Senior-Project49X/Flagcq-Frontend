import QuestionCard from "./QuestionCard";
import { questions } from "../lib/types/QuestionType";
interface CryptographyProps {
  selectedDifficulty: string | null;
  selectedCategory: string | null;
  questions: questions[];
}

export default function Question({
  selectedDifficulty,
  selectedCategory,
  questions,
}: CryptographyProps) {
  // const filtered = questions.filter((question) => {
  //   const categoryMatches =
  //     selectedCategory === "All Categories" ||
  //     question.type === selectedCategory;
  //   const difficultyMatches =
  //     selectedDifficulty === "All Difficulty" ||
  //     question.difficultys_id === selectedDifficulty;

  //   return categoryMatches && difficultyMatches;
  // });

  return (
    <div className="mt-12 grid grid-cols-3 gap-6 px-16">
      {questions.map((question, i) => (
        <QuestionCard
          key={i}
          id={question.id}
          Topic={question.title}
          Level={question.difficultys_id}
          Category={question.categories_name}
          Solved={question.solved}
          point={question.point}
        />
      ))}
    </div>
  );
}
