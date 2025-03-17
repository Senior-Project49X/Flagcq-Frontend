import axios from "axios";

const ip = process.env.NEXT_PUBLIC_IP_URL;

export const GetTourList = async (page: string | null) => {
  const NewPage = page ?? "1"; // Ensure the default page is a string
  try {
    // Include the page parameter in the API call
    const resp = await axios.get(`${ip}/api/tournaments?page=${NewPage}`, {
      withCredentials: true,
    });
    return resp.data;
  } catch (e) {
    console.error("Error fetching tournament data:", e);
    return {};
  }
};

export const GetAllTourList = async () => {
  try {
    const resp = await axios.get(`${ip}/api/tournaments/list`, {
      withCredentials: true,
    });
    return resp.data;
  } catch (e) {
    console.error("Error fetching tournament data:", e);
    return {};
  }
};

export const JoinTeam = async (page: string | null) => {
  const NewPage = page ?? "1";
  try {
    const resp = await axios.get(`${ip}/api/joinedTournament?page=${NewPage}`, {
      withCredentials: true,
    });
    return resp.data;
  } catch (e) {
    console.error("Error fetching data:", e);
    return {};
  }
};

export const DownloadTeamCSV = async (tournament_id: number) => {
  try {
    const response = await axios.get(
      `${ip}/api/info/${tournament_id}?download=true`,
      {
        responseType: "blob",
        withCredentials: true,
      }
    );
    const contentDisposition = response.headers["content-disposition"];
    const filename = contentDisposition
      ? decodeURIComponent(
          contentDisposition
            .split("filename=")[1]
            ?.split(";")[0]
            ?.replace(/"/g, "")
            ?.trim()
        ) // Extract the filename and handle quotes
      : `download`; // Fallback filename

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
  } catch (e) {
    console.error("Error fetching ALlInfo data:", e);
    return "0"; // Return a fallback value in case of error
  }
};
