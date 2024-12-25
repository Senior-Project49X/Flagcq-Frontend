import axios from "axios";

const ip = process.env.NEXT_PUBLIC_IP_URL;

export interface TournamentData {
  topic: string;
  description: string;
  enroll_startDate: string;
  enroll_endDate: string;
  event_startDate: string;
  event_endDate: string;
}

export const PostCreateTour = async (data: TournamentData) => {
  try {
    const resp = await axios.post(
      `${ip}/api/createtournament`,
      {
        name: data.topic, // Map topic to name
        description: data.description,
        enroll_startDate: data.enroll_startDate,
        enroll_endDate: data.enroll_endDate,
        event_startDate: data.event_startDate,
        event_endDate: data.event_endDate,
      },
      {
        withCredentials: true, // Ensure cookies are sent if required by backend
      }
    );
    return resp.data;
  } catch (e) {
    console.error("Error posting tournament data:", e);
    return null; // Return null to indicate failure
  }
};
