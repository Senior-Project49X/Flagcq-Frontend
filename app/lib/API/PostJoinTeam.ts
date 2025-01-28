import axios from "axios";

const ip = process.env.NEXT_PUBLIC_IP_URL;

export interface JoinTeamData {
  invite_code: string;
}

export const PostJoinTeam = async (data: JoinTeamData) => {
  try {
    const resp = await axios.post(
      `${ip}/teams/join`,
      {
        invite_code: data.invite_code,
      },
      {
        withCredentials: true,
      }
    );
    return resp.data;
  } catch (e) {
    console.error("Error posting team data:", e);
    return null;
  }
};
