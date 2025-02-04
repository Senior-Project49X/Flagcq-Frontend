import axios from "axios";
import { setCookie, removeCookie } from "../cookies";
const ip = process.env.NEXT_PUBLIC_IP_URL;
export const LoginUser=(code:string)=>{
    
    axios
      .post(`${ip}/api/login`, { authorizationCode: code }, {
        withCredentials: true
      })
      .then((resp) => {
        console.log(resp);
        console.log(resp.data);

        if (resp.status === 200) {
          window.location.href = "/";
        } else {
          // Handle login failure (optional)
          console.error("Login failed:", resp.data);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
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
