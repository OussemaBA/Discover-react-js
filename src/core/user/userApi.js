import axios from "axios";
import { isAuthenticated } from "../common/index";
import React from "react";
import { Link } from "react-router-dom";
import defaultImg from "../../images/avatar.png";


const follow = (userId, token, followId) => {
  const body = { userId, followId };
  return axios
    .put(`${process.env.REACT_APP_API_URL}/user/follow`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
};

const unfollow = (userId, token, unfollowId) => {
  const body = { userId, unfollowId };
  return axios
    .put(`${process.env.REACT_APP_API_URL}/user/unfollow`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

};

const remove = (userId, token) => {
  console.log("Delete: ",userId)
  axios
    .delete(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
};

const init_user_data = userId => {
  return axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${isAuthenticated().token}`
    }
  });
};

const users_list = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/users`);
};





const UsersCards = (users) => {
  return (
    <div className="container">
      <div className="row">
        {users.map((user, i) => {
          return(

          <div className="card col-md-4 mb-2 ml-2" key={i}>
          {user!==null && (<>  <img
              style={{ height: "300px", width: "auto" }}
              className="img-thumbnail"
              src={`${process.env.REACT_APP_API_URL}/user/avatar/${user._id}`}
              alt={defaultImg}
            />
            <div className="card-body">
              <h5 className="card-title">
                {user.name.first + " " + user.name.first}
              </h5>
              <p className="card-text">{user.email}</p>
              <Link
                href="#"
                className="btn btn-raised btn-primary btn-sm"
                to={`/user/${user._id}`}
              >
                View Profile{" "}
              </Link>
              
            </div> </>)}
          
          </div>
          )
        })}
      </div>
    </div>
  );
};

const updateUser = user => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("jwt")) {
      let auth = JSON.parse(localStorage.getItem("jwt"));
      auth.user = user;
      localStorage.setItem("jwt", JSON.stringify(auth));
    }
  }
};

const findPeople = (userId, token) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/user/findpeople/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};

export {
  init_user_data,
  users_list,
  UsersCards,
  remove,
  updateUser,
  follow,
  unfollow,
  findPeople
};
