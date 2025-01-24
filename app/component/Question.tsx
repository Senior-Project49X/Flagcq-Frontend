import QuestionCard from "./QuestionCard";
import { questions } from "../lib/types/QuestionType";
interface CryptographyProps {
  selectedDifficulty: string | null;
  selectedCategory: string | null;
  questions: questions[];
}

export default function Question({ questions }: Readonly<CryptographyProps>) {
  return (
    <div>
      <div className=" grid grid-cols-3 gap-6 px-16">
        <button className="text-white py-2 px-4 rounded-lg hover:bg-red-500 bg-[#0c0332]">
          Practice
        </button>
        <button className="text-white py-2 px-4 rounded-lg hover:bg-red-500 bg-[#0c0332]">
          Tournament
        </button>
        <button className="text-white py-2 px-4 rounded-lg hover:bg-red-500 bg-[#0c0332]">
          Unpublished
        </button>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-6 px-16">
        {questions.map((question) => (
          <QuestionCard
            key={question.id}
            id={question.id}
            Topic={question.title}
            Level={question.difficultys_id}
            Category={question.categories_name}
            Solved={question.solved}
            point={question.point}
          />
        ))}
      </div>
    </div>
  );
}
