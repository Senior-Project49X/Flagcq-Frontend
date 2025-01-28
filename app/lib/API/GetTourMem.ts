import axios from "axios";
const ip = process.env.NEXT_PUBLIC_IP_URL;

export const GetTourMem = async (tournament_id: number, team_id: number) => {
  try {
    const resp = await axios.get(
      `${ip}/teams/member_page/${tournament_id}/${team_id}`,
      {
        withCredentials: true,
      }
    );
    return resp.data;
  } catch (e) {
    console.error("Error fetching user data:", e);
    return "0";
  }
};
