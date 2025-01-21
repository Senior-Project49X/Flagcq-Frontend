import axios from "axios";

const ip = process.env.NEXT_PUBLIC_IP_URL;

export const DeleteTour = async (tournament_id: number) => {
  await axios
    .delete(`${ip}/api/tournaments/${tournament_id}`, { withCredentials: true })
    .then((resp) => {
      console.log(resp);
    })
    .catch((e) => {
      console.log(e);
    });
};
