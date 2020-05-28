import axios from "axios";
import { isAuthenticated } from "../common/index";

const Post_list = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
    headers: {
      Authorization: `Bearer ${isAuthenticated().token}`
    }
  });
};

const init_post_data = postId => {
  return axios.get(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${isAuthenticated().token}`
    }
  })
     
};

const postsByUser = userId => {
  return axios.get(`${process.env.REACT_APP_API_URL}/posts/by/${userId}`,{
    headers: {
      Authorization: `Bearer ${isAuthenticated().token}`
    }});
};

const deletePost = (postId, token) => {
 return  axios
    .delete(`${process.env.REACT_APP_API_URL}/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
};


/* const like=(postId,token,userId)=>{


return axios.put((`${process.env.REACT_APP_API_URL}/posts/like`),{postId,userId})
}



const unlike=(postId,token,userId)=>{


  return axios.put((`${process.env.REACT_APP_API_URL}/posts/unlike`),{postId,userId})
  }

   */
export { Post_list, init_post_data, postsByUser ,deletePost};
