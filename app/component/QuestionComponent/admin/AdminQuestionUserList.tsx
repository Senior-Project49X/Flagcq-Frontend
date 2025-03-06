import { UserList } from "@/app/lib/types/UserType";
import PaginationSolver from "../PaginationSolver";
// import { useEffect } from "react";
interface Userlist {
  setClosePopup: (arg0: boolean) => void;
  userList: UserList[];
  useListRef: React.RefObject<HTMLDivElement>;
  pageNumber: string;
  totalPages: number;
  hasNextPage: boolean;
  setPage: (arg0: number) => void;
}
export default function AdminQuestionUserList({
  setClosePopup,
  userList,
  useListRef,
  hasNextPage,
  totalPages,
  pageNumber,
  setPage,
}: Readonly<Userlist>) {
  // useEffect(() => {
  //   console.log(window.location.pathname + window.location.search);
  // }, []);
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black bg-opacity-75 backdrop-blur-sm"></div>

      <div className=" w-auto my-6 mx-auto max-w-lg justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div
          className="relative bg-gray-800 rounded-xl shadow-2xl border-2 border-opacity-20 border-white"
          ref={useListRef}
        >
          <div className="relative w-full max-w-3xl bg-gray-800 rounded-lg shadow-xl min-h-full items-center justify-center p-4 overflow-y-auto">
            <p className="justify-center items-center flex mb-6 text-3xl text-blue-300 font-bold font-mono">
              SOLVERS
            </p>
            {userList.length === 0 && (
              <p className="text-gray-300 text-center">No Solver Found</p>
            )}
            {userList.map((user) => (
              <p key={user.last_name} className="mb-4 text-white">
                {user.first_name}
                {"  "}
                {user.last_name}
              </p>
            ))}
            <PaginationSolver
              setPage={setPage}
              pageNumber={pageNumber}
              pagePath={"solverPage="}
              totalPages={totalPages}
              hasNextPage={hasNextPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}
