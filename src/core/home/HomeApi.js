import axios from "axios";

export function getDatafromDataBase(category) {
    
    let config = {
        params: {
            category
        },
      }
  return axios.get(`${process.env.REACT_APP_API_URL}/search`,config
  );

 
}
