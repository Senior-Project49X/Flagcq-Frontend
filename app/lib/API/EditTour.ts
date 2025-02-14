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
  tournament_id: number | undefined | null;
}

export const EditTourAPI = async (data: TournamentData): Promise<any> => {
  axios
    .put(
      `${ip}/api/editTournament`,
      {
        tournament_id: data.tournament_id,
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

      if (resp.status === 200) {
        return resp.data;
      }
    })
    .catch((e) => {
      console.log("e", e.response.data.message);

      return e;
    });
};

export const GetTournamentByID = async (tournament_id: number) => {
  try {
    const resp = await axios.get(`${ip}/api/tournamentID/${tournament_id}`, {
      withCredentials: true,
    });
    return resp.data;
  } catch (e) {
    console.error("Error fetching questions:", e);
  }
};
