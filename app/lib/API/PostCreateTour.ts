import axios from "axios";

const ip = process.env.NEXT_PUBLIC_IP_URL;

export interface TournamentData {
  topic: string;
  description: string;
  enroll_startDate: string;
  enroll_endDate: string;
  event_startDate: string;
  event_endDate: string;
  mode: string;
  teamSizeLimit: number;
  limit: number;
}

interface SetState {
  setIsSuccess: (value: boolean) => void;
  setIsFailed: (value: boolean) => void;
  setMessage: (message: string) => void;
}

export const PostCreateTour = async (
  data: TournamentData,
  setState: SetState
): Promise<any> => {
  axios
    .post(
      `${ip}/api/createTournament`,
      {
        name: data.topic,
        description: data.description,
        enroll_startDate: data.enroll_startDate,
        enroll_endDate: data.enroll_endDate,
        event_startDate: data.event_startDate,
        event_endDate: data.event_endDate,
        mode: data.mode,
        teamSizeLimit: data.teamSizeLimit,
        limit: data.limit,
      },
      {
        withCredentials: true,
      }
    )
    .then((resp) => {
      console.log(resp);

      if (resp.status === 201) {
        setState.setIsSuccess(true);
        return resp.data;
      }
    })
    .catch((e) => {
      setState.setIsFailed(true);
      console.log("e", e.response.data.message);
      setState.setMessage(e.response.data.message);

      return e;
    });
};
