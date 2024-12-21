import axios from "axios";
import { setCookie, removeCookie, getCookie } from "../cookies";
const ip = process.env.NEXT_PUBLIC_IP_URL;
export const LoginUser=(code:string)=>{
    
    axios
      .post(`${ip}/api/oauth-login`, { authorizationCode: code })
      .then((resp) => {
        console.log(resp);
        console.log(resp.data);

        if (resp.status === 200) {
          removeCookie("cmu-oauth-token");
          setCookie("cmu-oauth-token", resp.data.token);

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
  }

  