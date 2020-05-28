import Axios from "axios";

export const forgotPassword = email => {
  const body = {
    email
  };

  return Axios.put(`${process.env.REACT_APP_API_URL}/forgot-password/`, body);
};

export const resetPassword = resetInfo => {
  
    
  
 return  Axios.put(`${process.env.REACT_APP_API_URL}/reset-password/`, resetInfo)
    
};
