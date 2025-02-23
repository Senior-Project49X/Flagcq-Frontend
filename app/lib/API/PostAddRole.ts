import axios from "axios";

const ip = process.env.NEXT_PUBLIC_IP_URL;

interface SetState {
  setIsSuccess: (value: boolean) => void;
  setIsFailed: (value: boolean) => void;
  setMessage: (message: string) => void;
}

export const PostAddRole = async (
  users: string,
  role: "Admin" | "User",
  setState: SetState
): Promise<any> => {
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
    if (resp.status === 200) {
      setState.setIsFailed(false);
      setState.setIsSuccess(true);
      return resp.data;
    }
    return resp.data;
  } catch (e: Error | any) {
    setState.setMessage(e.response.data.message);
    console.error("Error posting data:", e);
    setState.setIsFailed(true);

    return null;
  }
};
