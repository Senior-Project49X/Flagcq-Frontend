import axios from "axios";

const ip = process.env.NEXT_PUBLIC_IP_URL;

export interface TeamData {
  name: string;
  tournament_id: number;
}

export const PostCreateTeam = async (data: TeamData) => {
  try {
    const resp = await axios.post(
      `${ip}/api/teams/create`,
      {
        name: data.name, // Map topic to name
        tournament_id: data.tournament_id,
      },
      {
        withCredentials: true, // Ensure cookies are sent if required by backend
      }
    );
    return resp.data;
  } catch (e) {
    console.error("Error posting team data:", e);
    return null; // Return null to indicate failure
  }
};
