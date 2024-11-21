import axios from "axios"
const ip = process.env.NEXT_PUBLIC_IP_URL;

export const GetUserData = async () => {
    try {
      const resp = await axios.get(`${ip}/api/users`, { withCredentials: true });
      console.log(resp.data.points);
      return resp.data.points; // Return the points
    } catch (e) {
      console.error("Error fetching user data:", e);
      return "0"; // Return a fallback value in case of error
    }
  };