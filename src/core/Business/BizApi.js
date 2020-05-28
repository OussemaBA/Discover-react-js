import axios from "axios"

export function FetchBuz(){
        return axios.get(
          `${process.env.REACT_APP_API_URL}/biz/recent`,
          
        );
}