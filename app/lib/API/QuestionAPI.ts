import axios from "axios";
import { isRoleAdmin } from "../role";

const ip = process.env.NEXT_PUBLIC_IP_URL;
interface SetState {
  setIsSuccess: (value: boolean) => void;
  setIsFailed: (value: boolean) => void;
  setMessage: (message: string) => void;
}

export const CreateQuestionAPI = async (
  CreateData: FormData,
  setState: SetState
): Promise<any> => {
  axios
    .post(`${ip}/api/question`, CreateData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((resp) => {
      setState.setIsSuccess(true);
      if (resp.status === 200) {
        return resp.data;
      }
    })
    .catch((e) => {
      setState.setIsFailed(true);
      setState.setMessage(e.response.data.message);

      return e;
    });
};

export const EditQuestionAPI = async (
  CreateData: FormData,
  setState: SetState,
  id: number
): Promise<any> => {
  axios
    .put(`${ip}/api/questions/${id}`, CreateData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((resp) => {
      setState.setIsSuccess(true);
      if (resp.status === 200) {
        return resp.data;
      }
    })
    .catch((e) => {
      setState.setIsFailed(true);
      setState.setMessage(e.response.data.message);

      return e;
    });
};

export const CreateQuestionTournamentAPI = async (
  question_id: number[],
  tournament_id: number
): Promise<any> => {
  try {
    const response = await axios.post(
      `${ip}/api/questions/tournament`,
      {
        question_id: question_id,
        tournament_id: tournament_id,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json", // Use application/json if the data is not a form
        },
      }
    );
  } catch (error: any) {}
};

export const GetQuestions = async (
  selectedCategory: string,
  selectedDifficulty: string,
  page: string | null,
  mode: string,
  tournament_id?: number,
  isTornamentSelected?: boolean,
  sort?: { name: string; order: string }
) => {
  const NewPage = page ?? 1;
  const useSelected = isTornamentSelected ?? false;
  let url = isRoleAdmin()
    ? `${ip}/api/questions/admin?page=${NewPage}`
    : `${ip}/api/questions/user?&page=${NewPage}`;

  if (mode !== "") {
    url += `&mode=${mode}`;
  }

  if (selectedCategory !== "All Categories") {
    url += `&category=${selectedCategory}`;
  }

  if (selectedDifficulty !== "All Difficulty") {
    url += `&difficulty=${selectedDifficulty}`;
  }
  if (sort?.name !== "" && sort?.name !== undefined)
    url += `&sort=${sort?.name}`;
  if (sort?.order !== "" && sort?.order !== undefined)
    url += `&sort_order=${sort?.order}`;
  if (tournament_id && !useSelected) {
    url += `&tournament_id=${tournament_id}`;
  } else if (tournament_id && useSelected) {
    url += `&tournament_selected=${tournament_id}`;
  }

  try {
    const response = await axios.get(url, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {}
};

export const GetQuestionsByID = async (
  id: number,
  tournament_id?: string | number | null
) => {
  try {
    let url = `${ip}/api/question?id=${id}`;
    if (tournament_id) {
      url += `&tournament_id=${tournament_id}`;
    }

    const resp = await axios.get(url, {
      withCredentials: true,
    });
    return resp.data;
  } catch (e) {}
};

export const DeleteQuestionsByID = async (id: number) => {
  await axios
    .delete(`${ip}/api/question/${id}`, { withCredentials: true })
    .then((resp) => {})
    .catch((e) => {});
};

export const CheckQuestionsByID = async (
  id: number,
  Answer: string
): Promise<boolean> => {
  try {
    const resp = await axios.post(
      `${ip}/api/question/practice/check-answer`,
      { id: id, Answer: Answer },
      { withCredentials: true }
    );
    return resp.data.solve;
  } catch (e) {
    return false;
  }
};

export const CheckQuestionsTournamentByID = async (
  id: number,
  Answer: string,
  tournament_id: number
): Promise<boolean> => {
  try {
    const resp = await axios.post(
      `${ip}/api/question/tournament/check-answer`,
      { question_id: id, Answer: Answer, tournament_id: tournament_id },
      { withCredentials: true }
    );
    return resp.data.solve;
  } catch (e) {
    return false;
  }
};

export const DownloadQuestionsByID = async (
  id: number,
  tournament_id?: number | string | null
) => {
  try {
    let url = `${ip}/api/question/download?id=${id}`;
    if (tournament_id) {
      url += `&tournament_id=${tournament_id}`;
    }
    const response = await axios.get(url, {
      responseType: "blob", // Important for file download
      withCredentials: true,
    });

    // Access the Content-Disposition header
    const contentDisposition = response.headers["content-disposition"];

    // Parse the filename from the header
    const filename = contentDisposition
      ? decodeURIComponent(contentDisposition
          .split("filename=")[1]
          ?.split(";")[0]
          ?.replace(/"/g, "")
          ?.trim()) // Extract the filename and handle quotes
      : `download-${id}`; // Fallback filename

    // Create a Blob and a download URL
    const blob = new Blob([response.data]);
    const downloadUrl = window.URL.createObjectURL(blob);

    // Create a temporary anchor element for the download
    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click(); // Trigger the download
    anchor.remove(); // Clean up the DOM

    // Revoke the object URL to free up memory
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    alert("Failed to download the file. Please try again.");
  }
};

export const GetCategories = async () => {
  try {
    const response = await axios.get(`${ip}/api/categories`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    alert("Failed to download the file. Please try again.");
  }
};
export const CreateCategoriesAPI = async (name: string) => {
  try {
    const response = await axios.post(
      `${ip}/api/categories`,
      { name },
      { withCredentials: true }
    );
    return response.data.id;
  } catch (error) {
    alert("Failed to download the file. Please try again.");
  }
};

export const UseHintAPI = async (
  id: number,
  setState: SetState,
  tournament_id?: string | number | null,
  setShowGreen?: (arg0: boolean) => void
) => {
  try {
    let url = `${ip}/api/question/usehint?id=${id}`;

    if (tournament_id) {
      url += `&tournament_id=${tournament_id}`;
    }

    const response = await axios.get(url, { withCredentials: true });

    setState.setIsSuccess(true);
    if(setShowGreen) setShowGreen(true);
    return response.data.data;
  } catch (e: any) {
    if(setShowGreen) setShowGreen(false);
    setState.setIsFailed(true);
    console.error(
      "API Error:",
      e.response?.data?.message || "An error occurred"
    );
    setState.setMessage(e.response?.data?.message || "An error occurred.");
  }
};

export const DeleteQuestionTournament = async (
  questionIds: number,
  tournamentId: number
) => {
  try {
    const response = await axios.delete(
      `${ip}/api/questions/tournament/${tournamentId}/question/${questionIds}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {}
};

export const EditCategoryAPI = async (
  name: string,
  id: number
): Promise<any> => {
  return axios
    .put(
      `${ip}/api/categories/${id}`,
      { name },
      {
        withCredentials: true,
      }
    )
    .then((resp) => {
      if (resp.status === 200) {
        return resp.data.id;
      }
    })
    .catch((e) => {
      return e;
    });
};
export const DeleteCategoryAPI = async (id: number): Promise<any> => {
  return axios
    .delete(`${ip}/api/categories/${id}`, {
      withCredentials: true,
    })
    .then((resp) => {
      if (resp.status === 200) {
        return resp.data;
      }
    })
    .catch((e) => {
      return e;
    });
};

export const GetQuestionUserList = async (
  page:number,
  question_id: number,
  tournament_id: number | undefined
) => {
  try {
    let url = `${ip}/api/question/user-list?page=${page}&id=${question_id}`;
    if (tournament_id) {
      url += `&tournament_id=${tournament_id}`;
    }
    const response = await axios.get(
      url,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {}
};