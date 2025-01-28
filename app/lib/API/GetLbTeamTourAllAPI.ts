import axios from "axios";
const ip = process.env.NEXT_PUBLIC_IP_URL;

export const GetLbTeamTourAllData = async (tournament_id: number) => {
  try {
    const resp = await axios.get(`${ip}/teams/tournament/${tournament_id}`, {
      withCredentials: true,
    });
    return resp.data;
  } catch (e) {
    console.error("Error fetching user data:", e);
    return "0";
  }
};
