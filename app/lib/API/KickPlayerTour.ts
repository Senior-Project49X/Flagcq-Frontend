import axios from "axios";

const ip = process.env.NEXT_PUBLIC_IP_URL;

export const KickPlayerTour = async (team_id: number, member_id: number) => {
  await axios
    .delete(`${ip}/teams/member_page/${team_id}/${member_id}`, {
      withCredentials: true,
    })
    .then((resp) => {
      console.log(resp);
    })
    .catch((e) => {
      console.log(e);
    });
};
