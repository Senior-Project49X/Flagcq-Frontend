import axios from "axios";
const ip = process.env.NEXT_PUBLIC_IP_URL;

export const GetTourList = async () => {
  try {
    const resp = await axios.get(`${ip}/api/tournaments`, {
      withCredentials: true,
    });
    return resp.data;
  } catch (e) {
    console.error("Error fetching user data:", e);
    return "0";
  }
};
