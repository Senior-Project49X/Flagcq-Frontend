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
