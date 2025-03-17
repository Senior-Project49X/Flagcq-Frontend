import axios from "axios";

const ip = process.env.NEXT_PUBLIC_IP_URL;

export type TeamLeaderboardData = {
  teamId: number;
  tournamentId: number | string;
};

export const DelTeamTour = async (tournament_id: number) => {
  await axios
    .delete(`${ip}/api/teams/${tournament_id}`, {
      withCredentials: true,
    })
    .then((resp) => {
      console.log(resp);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const DelAdminTour = async (data: TeamLeaderboardData): Promise<any> => {
  // Debug what we're actually sending
  console.log("Sending to API:", {
    url: `${ip}/api/admin/deleteTeam`,
    data: {
      teamId: data.teamId,
      tournamentId: Number(data.tournamentId),
    },
  });

  try {
    // Make sure data is properly structured for axios delete with payload
    const response = await axios({
      method: "delete",
      url: `${ip}/api/admin/deleteTeam`,
      data: {
        teamId: data.teamId,
        tournamentId: Number(data.tournamentId),
      },
      withCredentials: true,
    });

    console.log("Delete team response:", response);

    if (response.status === 200) {
      return response;
    }

    return null;
  } catch (e: any) {
    // Log the full error for debugging
    console.error("Error deleting team:", e);
    console.error("Response data:", e.response?.data);
    console.error("Request details:", e.config);
    throw e;
  }
};
