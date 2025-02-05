import QuestionCard from "./QuestionCard";
import { questions } from "../lib/types/QuestionType";
import ModeFilter from "./ModeFilter";
interface CryptographyProps {
  selectedDifficulty: string | null;
  selectedCategory: string | null;
  questions: questions[];
  addQuestionTournament?: (id: number) => void;
  question_id?: number[]; // Add this prop
}

export default function Question({
  addQuestionTournament,
  questions,
  question_id,
}: Readonly<CryptographyProps>) {
  return (
    <div>
      <div className="mt-12 grid grid-cols-3 gap-6 px-16">
        {questions.map((question) => (
          <QuestionCard
            addQuestionTournament={addQuestionTournament}
            key={question.id}
            id={question.id}
            Topic={question.title}
            Level={question.difficultys_id}
            Category={question.categories_name}
            Solved={question.solved}
            point={question.point}
            question_id={question_id} // Pass the prop
          />
        ))}
      </div>
    </div>
  );
}
