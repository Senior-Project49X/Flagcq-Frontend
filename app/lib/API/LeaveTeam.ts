import axios from "axios";

const ip = process.env.NEXT_PUBLIC_IP_URL;

export const LeaveTeam = async ({ team_id }: { team_id: number }) => {
  await axios
    .delete(`${ip}/api/teams/${team_id}/leave`, {
      withCredentials: true,
    })
    .then((resp) => {
      console.log(resp);
    })
    .catch((e) => {
      console.log(e);
    });
};
