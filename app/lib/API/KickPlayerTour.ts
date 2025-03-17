import axios from "axios";

const ip = process.env.NEXT_PUBLIC_IP_URL;
export type TeamLeaderboardData = {
  teamId: number;
  memberIdToKick: string;
};

export const KickPlayerTour = async ({
  team_id,
  member_id,
}: {
  team_id: number;
  member_id: string;
}) => {
  await axios
    .delete(`${ip}/api/teams/member_page/${team_id}/${member_id}`, {
      withCredentials: true,
    })
    .then((resp) => {
      console.log(resp);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const KickAdminTour = async (
  data: TeamLeaderboardData
): Promise<any> => {
  console.log("Sending to API:", {
    url: `${ip}/api/admin/kickMember`,
    data: {
      teamId: data.teamId,
      memberIdToKick: data.memberIdToKick,
    },
  });

  try {
    const response = await axios({
      method: "delete",
      url: `${ip}/api/admin/kickMember`,
      data: {
        teamId: data.teamId,
        memberIdToKick: data.memberIdToKick,
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
