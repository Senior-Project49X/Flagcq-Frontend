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
      console.log(resp);
      setState.setIsSuccess(true);
      if (resp.status === 200) {
        return resp.data;
      }
    })
    .catch((e) => {
      setState.setIsFailed(true);
      console.log("e", e.response.data.message);
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
      console.log(resp);
      setState.setIsSuccess(true);
      if (resp.status === 200) {
        return resp.data;
      }
    })
    .catch((e) => {
      setState.setIsFailed(true);
      console.log("e", e.response.data.message);
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
  } catch (error: any) {
    console.error("Error creating questions for the tournament:", error);
  }
};

// export const GetQuestions = async (
//   selectedCategory: string,
//   selectedDifficulty: string,
//   page: string | null
// ) => {
//   const NewPage = page ?? 1;

//   try {

//     const resp = await axios.get(
//       `${ip}/api/questions/practice?mode=Practice${
//         selectedCategory === "All Categories"
//           ? ""
//           : `&category=${selectedCategory}`
//       }${
//         selectedDifficulty === "All Difficulty"
//           ? ""
//           : `&Difficulty=${selectedDifficulty}`
//       }&page=${NewPage}`,
//       { withCredentials: true }
//     );
//     return resp.data;
//   } catch (e) {
//     console.error("Error fetching questions:", e);
//   }
//   // console.log(`${ip}/api/questions/practice?${selectedCategory==="All Categories" ? "":`category=${selectedCategory}`}${selectedDifficulty==="All Difficulty" ? "":`&Difficulty=${selectedDifficulty}&`}page=${NewPage}`)
// };

export const GetQuestions = async (
  selectedCategory: string,
  selectedDifficulty: string,
  page: string | null,
  mode: string,
  tournament_id?: number
) => {
  const NewPage = page ?? 1;

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

  if (tournament_id) {
    url += `&tournament_id=${tournament_id}`;
  }

  try {
    const response = await axios.get(url, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

export const GetQuestionsByID = async (id: number) => {
  try {
    const resp = await axios.get(`${ip}/api/question/${id}`, {
      withCredentials: true,
    });
    console.log(resp.data);
    return resp.data;
  } catch (e) {
    console.error("Error fetching questions:", e);
  }
};

export const DeleteQuestionsByID = async (id: number) => {
  await axios
    .delete(`${ip}/api/question/${id}`, { withCredentials: true })
    .then((resp) => {
      console.log(resp);
    })
    .catch((e) => {
      console.log(e);
    });
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
    console.log(e);
    return false;
  }
};

export const DownloadQuestionsByID = async (id: number) => {
  try {
    const response = await axios.get(`${ip}/api/question/download/${id}`, {
      responseType: "blob", // Important for file download
      withCredentials: true,
    });

    // Access the Content-Disposition header
    const contentDisposition = response.headers["content-disposition"];

    // Parse the filename from the header
    const filename = contentDisposition
      ? contentDisposition
          .split("filename=")[1]
          ?.split(";")[0]
          ?.replace(/"/g, "") // Extract the filename and handle quotes
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
    console.error("Error downloading file:", error);
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
    console.error("Error downloading file:", error);
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
    console.log(response);
    return response.data.id;
  } catch (error) {
    console.error("Error downloading file:", error);
    alert("Failed to download the file. Please try again.");
  }
};

export const UseHintAPI = async (id: number) => {
  try {
    const response = await axios.get(`${ip}/api/question/usehint/${id}`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};
