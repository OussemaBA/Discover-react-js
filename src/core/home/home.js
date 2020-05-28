import React from "react";
import Posts from "../post/allPosts";
import Upbar from "../bar/upbar";

const home = () => {
  
  return (
    <div>
    <Upbar/>
      <div className="jumbotron">
        <h2> Home</h2>
      </div>
      <div className="container">
        <Posts />
      </div>
    </div>
  );
};

export default home;
