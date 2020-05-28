import React, { Component } from "react";
import {follow,unfollow} from "./userApi";

class FollowUserButton extends Component {
  render() {
    return (
      <div className="d-inline-block">
        {this.props.following ? (
          <button className="btn btn-warning btn-raised mt-1"
            onClick={()=>this.props.onButtonClick(unfollow)}
          >
          UnFollow</button>
        ) : (
          <button className="btn btn-success btn-raised mt-1"
                      onClick={()=>this.props.onButtonClick(follow)}

          >Follow</button>
        )}
      </div>
    );
  }
}

export default FollowUserButton;
