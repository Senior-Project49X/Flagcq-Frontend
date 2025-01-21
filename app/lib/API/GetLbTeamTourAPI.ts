import axios from "axios";
const ip = process.env.NEXT_PUBLIC_IP_URL;

export const GetLbTeamTourData = async (
  team_id: number,
  tournament_id: number
) => {
  try {
    const resp = await axios.get(`${ip}/teams/${tournament_id}/${team_id}`, {
      withCredentials: true,
    });
    return resp.data;
  } catch (e) {
    console.error("Error fetching user data:", e);
    return "0";
  }
};
