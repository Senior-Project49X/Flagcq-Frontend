import axios from "axios";

const ip = process.env.NEXT_PUBLIC_IP_URL;

export const getUserInfo = () => {
        
        axios.get(`${ip}/api/user` ).then((resp) => {
            console.log(resp)
            return resp
        }
    )
    
  };
