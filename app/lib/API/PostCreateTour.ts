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

export const PostCreateTour = async (data: TournamentData) => {
  try {
    const resp = await axios.post(
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
        withCredentials: true, // Ensure cookies are sent if required by backend
      }
    );
    return resp.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 400) {
      return {
        success: false,
        message: e.response.data.message,
      };
    }

    console.error("Error posting tournament data:", e);
    return null; // Return null to indicate failure
  }
};
