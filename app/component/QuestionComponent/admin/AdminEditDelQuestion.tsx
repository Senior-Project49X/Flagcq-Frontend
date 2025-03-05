import { GetQuestionUserList } from "@/app/lib/API/QuestionAPI";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import AdminQuestionUserList from "./AdminQuestionUserList";

interface Question {
  setShowPopup: (arg0: boolean) => void;
  id: number;
  AdminEditref: React.RefObject<HTMLDivElement>;
  CanEdit: boolean;
  tournament_id?: number;
  userListPopup?: boolean;
  userListRef: React.RefObject<HTMLDivElement>;
  setUserListPopup: (arg0: boolean) => void;
}

export default function AdminEditDelQuestion({
  id,
  setShowPopup,
  AdminEditref,
  CanEdit,
  tournament_id,
  userListPopup,
  userListRef,
  setUserListPopup,
}: Readonly<Question>) {
  const [page, setPage] = useState<number>(1);
  const [userList, setUserList] = useState([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const handleChangePage = async (page: number) => {
    setUserList([]);
    setPage(page);
    const resp = await GetQuestionUserList(page, id, tournament_id);
    setUserList(resp?.data);
    setTotalPages(resp?.totalPages);
    setHasNextPage(resp?.hasNextPage);
  };
  const CheckSolver = useCallback(async () => {
    const resp = await GetQuestionUserList(page, id, tournament_id);
    setUserList(resp?.data);
    setTotalPages(resp?.totalPages);
    setHasNextPage(resp?.hasNextPage);
    setUserListPopup(true);
  }, [page, id, tournament_id, setUserListPopup]);

  return (
    <div
      ref={AdminEditref}
      className="flex flex-wrap justify-end items-center gap-3 mt-2 text-w w-full min-w-0"
    >
      {userListPopup && (
        <AdminQuestionUserList
          hasNextPage={hasNextPage}
          totalPages={totalPages}
          pageNumber={page.toString()}
          setPage={handleChangePage}
          setClosePopup={setUserListPopup}
          useListRef={userListRef}
          userList={userList}
        />
      )}
      <button className=" text-blue-300 font-bold" onClick={CheckSolver}>
        Solver
      </button>
      {CanEdit ? (
        <Link
          className="text-yellow-500 font-bold "
          href={`/admin/EditQuestion?QuestionID=${id}`}
        >
          Edit
        </Link>
      ) : (
        <span className="text-gray-300 font-bold  cursor-not-allowed">
          Edit
        </span>
      )}
      <button
        className="text-red-500 font-bold"
        onClick={() => setShowPopup(true)}
      >
        Delete
      </button>
    </div>
  );
}
