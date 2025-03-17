import axios from "axios";
const ip = process.env.NEXT_PUBLIC_IP_URL;
export const LoginUser = async (code: string): Promise<boolean> => {
  return axios
    .post(
      `${ip}/api/login`,
      { authorizationCode: code },
      {
        withCredentials: true,
      }
    )
    .then((resp) => {
      console.log(resp);
      console.log(resp.data);

      if (resp.status === 200) {
        window.location.href = "/";
        return true;
      } else {
        // Handle login failure (optional)
        console.error("Login failed:", resp.data);
        return false;
      }
    })
    .catch((error) => {
      console.error("Error during login:", error);
      return false;
      // Optionally notify the user of the error
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
};

export const LogoutUser = () => {
  axios
    .post(
      `${ip}/api/logout`,
      {},
      {
        withCredentials: true,
      }
    )
    .then((resp) => {
      console.log("logoutsuccess:", resp.data);
      if (resp.status === 200) {
        console.log("logoutsuccess:", resp.data);

        window.location.href =
          process.env.NEXT_PUBLIC_CMU_ENTRAID_LOGOUT_URL ?? "/login";
      } else {
        // Handle login failure (optional)
        console.error("logoutfailed:", resp.data);
      }
    })
    .catch((error) => {
      console.error("Error during logout:", error);
      // Optionally notify the user of the error
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
};
