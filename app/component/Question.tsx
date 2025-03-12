import QuestionCard from "./QuestionCard";
import { questions } from "../lib/types/QuestionType";
import QuestionTable from "./QuestionTable";
import { useEffect, useState } from "react";
import { isRoleAdmin } from "../lib/role";
import { usePathname } from "next/navigation";
import { getCookie, isHasCookie, setCookie } from "../lib/cookies";
import { FaTable, FaThLarge } from "react-icons/fa";
import { FaList } from "react-icons/fa6";

interface CryptographyProps {
  selectedDifficulty: string | null;
  selectedCategory: string | null;
  questions: questions[];
  addQuestionTournament?: (id: number) => void;
  question_id?: number[]; // Add this prop
  tournament_id?: number;
  isTable?: boolean;
  setSort: (sort: string) => void;
  sort?: { name: string; order: string };
}

export default function Question({
  addQuestionTournament,
  questions,
  question_id,
  tournament_id,
  isTable: isTableProp,
  setSort,
  sort,
}: Readonly<CryptographyProps>) {
  const pathname = usePathname();
  const [isCreateQuestionTournament, setIsCreateQuestionTournament] =
    useState<boolean>(false);
  const [isTable, setIsTable] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  useEffect(() => {
    const fetchRole = async () => {
      setIsAdmin(isRoleAdmin());
    };
    fetchRole();
  }, []);

  const handleVIew = (isTable: boolean) => {
    setIsTable(isTable);
    setCookie("TableView", isTable.toString());
  };

  useEffect(() => {
    if (!isHasCookie("TableView")) {
      setCookie("TableView", "false");
      setIsTable(false);
    } else setIsTable(getCookie("TableView") === "true");
  }, []);

  useEffect(() => {
    setIsCreateQuestionTournament(
      pathname === "/admin/CreateQuestionTournament"
    );
  }, [pathname]);
  return (
    <div>
      <div className="flex justify-end mt-4 mb-4 mr-16">
        <div className="text-2xl font-bold text-green-500 mr-auto ml-16">
          Question
        </div>

        <button
          onClick={() => handleVIew(false)}
          className={`rounded-l-md px-4 py-2 flex items-center gap-2 ${
            !isTable ? "bg-gray-300" : "bg-white"
          } transition`}
        >
          <FaThLarge />
        </button>
        <button
          onClick={() => handleVIew(true)}
          className={`px-4 py-2 rounded-r-md flex items-center gap-2 ${
            isTable ? "bg-gray-300" : "bg-white"
          } transition`}
        >
          <FaList />
        </button>
      </div>
      {!isTable ? (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-16 ">
          {questions.map((question) => (
            <QuestionCard
              addQuestionTournament={addQuestionTournament}
              key={question.id}
              id={question.id}
              Topic={question.title}
              Level={question.difficulty_id}
              Category={question.categories_name}
              submitCount={question.submitCount}
              Solved={question.solved}
              point={question.point}
              question_id={question_id} // Pass the prop
              is_selected={question.is_selected}
              tournament_id={tournament_id}
              canEdit={question.canEdit}
            />
          ))}
        </div>
      ) : (
        <QuestionTable
          setSort={setSort}
          sort={sort}
          addQuestionTournament={addQuestionTournament}
          questions={questions}
          question_id={question_id} // Pass the prop
          tournament_id={tournament_id}
          isAdmin={isAdmin}
          isCreateQuestionTournament={isCreateQuestionTournament}
        />
      )}
    </div>
  );
}
