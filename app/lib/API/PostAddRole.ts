import axios from "axios";

const ip = process.env.NEXT_PUBLIC_IP_URL;

export const PostAddRole = async (users: string, role: "Admin" | "User") => {
  try {
    const resp = await axios.post(
      `${ip}/api/user/role`,
      {
        users: users,
        role: role,
      },
      {
        withCredentials: true,
      }
    );
    return resp.data;
  } catch (e) {
    console.error("Error posting data:", e);
    return null;
  }
};
