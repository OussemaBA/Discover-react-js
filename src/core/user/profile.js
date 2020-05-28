import React, { Component } from "react";
import { isAuthenticated, Loading } from "../common/index";
import { Redirect, Link } from "react-router-dom";
import { init_user_data } from "./userApi";
import DeleteProfile from "./profile_modification/deleteProfile";
import defaultImg from "../../images/avatar.png";
import FollowUserButton from "./FollowUserButton";
import ProfileTab from "./ProfileTab";
import { postsByUser } from "../post/apiPost";
import { Button } from "semantic-ui-react";

class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { Followers: [], following: [] },
      redirectToSignin: false,
      loading: true,
      following: false,
      posts: [],
      error: "",
      userInfo: ""
    };
  }

  checkFollow = user => {
    const jwt = isAuthenticated();
    const match = (user = user.followers.find(follower => {
      if (follower === null) return false;
      else return follower._id === jwt.user._id;
    }));
    return match;
  };

  clickFollowButton = callApi => {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    callApi(userId, token, this.state.user._id).then(res => {
      if (res.data.error) {
        this.setState({ error: res.data.message });
      } else {
        this.setState({ user: res.data, following: !this.state.following });
      }
    });
  };
  //*******Functions**********/
  componentDidMount() {
    const userId = this.props.match.params.userId;
    init_user_data(userId).then(res => {
      if (typeof res.data.message === "undefined") {
        this.setState({ user: res.data, loading: false, userInfo: res.data });
      }
    });

    postsByUser(userId).then(res => {
      if (typeof res.data.message === "undefined") {
        this.setState({ posts: res.data, loading: false });
      }
    });
  }
  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;

    init_user_data(userId).then(res => {
      if (typeof res.data.message === "undefined") {
        this.setState({ user: res.data, loading: false, userInfo: res.data });
      }
    });
  }

  render() {
    const { redirectToSignin, user, loading, posts, userInfo } = this.state;

    if (loading) {
      return <Loading />;
    }
    if (redirectToSignin) {
      return <Redirect to="/signin" />;
    }

    const photoUrl = user._id
      ? `${process.env.REACT_APP_API_URL}/user/avatar/${
          user._id
        }?${new Date().getTime()}`
      : defaultImg;

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Profile </h2>
        <div className="row">
          <div className="col-md-6">
            <img
              style={{ height: "300px", width: "auto" }}
              className="img-thumbnail"
              src={photoUrl}
            />
            <div className="col-md-12 mt-5 mb-5">
              <h4> About Me</h4>
              <hr />

              <p className="lead">{user.about}</p>
              <ProfileTab
                followers={user.followers}
                following={user.following}
                posts={posts}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="lead mt-2 ml-2">
              <p>Hello : {userInfo.name.first} </p>
              <p> Email : {userInfo.email} </p>
              <p> {`Joined ${new Date(user.created).toDateString()}`} </p>
            </div>
            {isAuthenticated() &&
            isAuthenticated().user._id === userInfo._id ? (
              <div style={{ marginTop: "20px" }}>
                <Button.Group>
                  <Button>
                    <Link to={`/user/edit/${user._id}`}>Edit Profile</Link>
                  </Button>{" "}
                  <Button>
                    {" "}
                    <DeleteProfile userId={userInfo._id} />
                  </Button>{" "}
                  <Button>
                    <Link to="/business/explore">Write a review</Link>{" "}
                  </Button>{" "}
                </Button.Group>
              </div>
            ) : (
              <FollowUserButton
                following={this.state.following}
                onButtonClick={this.clickFollowButton}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default profile;
