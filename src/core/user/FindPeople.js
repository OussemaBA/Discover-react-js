import React, { Component } from "react";
import { findPeople, follow } from "./userApi";
import { isAuthenticated } from "../common/index";
import { Link } from "react-router-dom";
import defaultImg from "../../images/avatar.png";

class FindPeople extends Component {
  componentDidMount() {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    findPeople(userId, token).then(res => {
      if (typeof res.data.message === "undefined") {
        this.setState({ users: res.data.users });
      } else {
        this.setState({ redirectToSignin: true });
      }
    });
  }

  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  clickFollow = (user, i) => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    follow(userId, token, user._id).then(res => {
      if (typeof res.data.message !== "undefined");

      let toFollow = this.state.users;

      toFollow.splice(i, 1);

      this.setState({
        users: toFollow,
        open: true,
        followMessage: `Following ${user.name.first + " " + user.name.last}`
      });
    });
  };

  render() {
    const { users, followMessage, open } = this.state;

    return (
      <div>
        <h2 className="mt-5 mb-5"> People You May Know</h2>

        {open && (
          <div className="alert alert-success">
            <p>{followMessage}</p>
          </div>
        )}

        <div className="container">
          <div className="row">
            {users.map((user, i) => {
              return (
                <div className="card col-md-4 mb-2 ml-2" key={i}>
                  {user !== null && (
                    <>
                      {" "}
                      <img
                        style={{ height: "300px", width: "auto" }}
                        className="img-thumbnail"
                        src={`${process.env.REACT_APP_API_URL}/user/avatar/${
                          user._id
                        }`}
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
                        <button
                          onClick={() => {
                            this.clickFollow(user, i);
                          }}
                          className="btn btn-raised btn-info float-right btn-sm"
                        >
                          Follow
                        </button>
                      </div>{" "}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default FindPeople;

