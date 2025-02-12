import QuestionCard from "./QuestionCard";
import { questions } from "../lib/types/QuestionType";
import QuestionTable from "./QuestionTable";
import { useEffect, useState } from "react";
import { isRoleAdmin } from "../lib/role";
import { usePathname } from "next/navigation";
import { getCookie, isHasCookie, setCookie } from "../lib/cookies";
interface CryptographyProps {
  selectedDifficulty: string | null;
  selectedCategory: string | null;
  questions: questions[];
  addQuestionTournament?: (id: number) => void;
  question_id?: number[]; // Add this prop
  tournament_id?: number;
  isTable?: boolean;
}

export default function Question({
  addQuestionTournament,
  questions,
  question_id,
  tournament_id,
  isTable: isTableProp,
}: Readonly<CryptographyProps>) {
  const pathname = usePathname();
  const [isCreateQuestionTournament, setIsCreateQuestionTournament] =
    useState<boolean>(false);
  const [isTable, setIsTable] = useState(getCookie("view") === "true");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  useEffect(() => {
    const fetchRole = async () => {
      setIsAdmin(isRoleAdmin());
    };
    fetchRole();
  }, []);
  useEffect(() => {
    if (!isHasCookie("view")) setCookie("view", "false");
  }, []);

  useEffect(() => {
    setIsCreateQuestionTournament(
      pathname === "/admin/CreateQuestionTournament"
    );
  }, [pathname]);
  return (
    <div>
      <div className="flex justify-end mt-4 mr-16">
        <button
          onClick={() => {
            setCookie("view", "false");
            setIsTable(false);
          }}
          className={`rounded-l-md px-4 py-2 ${
            !isTable ? "bg-gray-300" : "bg-white"
          } transition`}
        >
          Card view
        </button>
        <button
          onClick={() => {
            setCookie("view", "true");
            setIsTable(true);
          }}
          className={`px-4 py-2 rounded-r-md ${
            isTable ? "bg-gray-300" : "bg-white"
          } transition`}
        >
          List view
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
              Level={question.difficultys_id}
              Category={question.categories_name}
              submitCount={question.submitCount}
              Solved={question.solved}
              point={question.point}
              question_id={question_id} // Pass the prop
              is_selected={question.is_selected}
              tournament_id={tournament_id}
            />
          ))}
        </div>
      ) : (
        <table className="table-auto w-full ">
          <thead className="bg-gray-900 text-green">
            <tr>
              {isAdmin && isCreateQuestionTournament && (
                <th className=" px-4 py-2">Select</th>
              )}

              <th className="px-4 py-2 text-green-400">Question name</th>
              <th className=" px-4 py-2 text-green-400">Difficulty</th>
              <th className=" px-4 py-2 text-green-400">Point</th>
              <th className=" px-4 py-2 text-green-400">Solved</th>
              {isAdmin && (
                <>
                  <th className=" px-4 py-2 text-green-400">Edit</th>
                  <th className=" px-4 py-2 text-green-400">Delete</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <QuestionTable
                addQuestionTournament={addQuestionTournament}
                key={question.id}
                id={question.id}
                Topic={question.title}
                Level={question.difficultys_id}
                Category={question.categories_name}
                Solved={question.solved}
                point={question.point}
                question_id={question_id} // Pass the prop
                is_selected={question.is_selected}
                tournament_id={tournament_id}
                isRoleAdmin={isAdmin}
                isCreateQuestionTournament={isCreateQuestionTournament}
                submitCount={question.submitCount}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
