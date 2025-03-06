import axios from "axios";
const ip = process.env.NEXT_PUBLIC_IP_URL;

export const GetAllinfo = async (tournament_id: number) => {
  try {
    const resp = await axios.get(`${ip}/api/info/${tournament_id}`, {
      withCredentials: true,
    });
    return resp.data; // Return the points
  } catch (e) {
    console.error("Error fetching ALlInfo data:", e);
    return "0"; // Return a fallback value in case of error
  }
};

export const GetmyTeamInfo = async (tournament_id: number) => {
  try {
    const resp = await axios.get(`${ip}/api/myTeamInfo/${tournament_id}`, {
      withCredentials: true,
    });
    return resp.data; // Return the points
  } catch (e) {
    console.error("Error fetching ALlInfo data:", e);
    return "0"; // Return a fallback value in case of error
  }
};
