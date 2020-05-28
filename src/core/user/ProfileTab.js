import React, { Component } from "react";
import { Link } from "react-router-dom";
class ProfileTab extends Component {
  render() {
    const { followers, following,posts } = this.props;
    
    return (

      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <hr />
              <h3 className="text-secondary"> Followers</h3>
              <hr />

              { (followers != null) && followers.map((person, i) => {
                    
                    return (
  
                      <div key={i}>
                      <div className="row">
                          <div className="float-left ml-4">
                            <Link to={`/user/${person._id}`}>
                              <img
                                style={{
                                  borderRadius: "50%",
                                  border: "1px solid white"
                                }}
                                height="120px"
                                width="130px"
                                src={`${
                                  process.env.REACT_APP_API_URL
                                }/user/avatar/${person._id}`}
                                alt={person.name}
                              />
                              <h6>
                                {person.name.first + " " + person.name.last}
                              </h6>
                            </Link>
                            <p style={{ clear: "both" }}>{person.about}</p>
                          </div>
                        </div>
  
                       
                      </div>
                    );
                })}
            </div>
            <div className="col-sm">
              {/*///////////////////FOLLOWING/////////////////////////////*/}
              <hr />

              <h3 className="text-secondary"> Following</h3>
              <hr />

              {(following != null) && following.map((person, i) => {
                  return (
                    <div key={i}>
                      <div className="row">
                        <div className="float-right ml-3">
                          <Link to={`/user/${person._id}`}>
                            <img
                              style={{
                                borderRadius: "50%",
                                border: "1px solid white"
                              }}
                              height="120px"
                              width="130px"
                              src={`${
                                process.env.REACT_APP_API_URL
                              }/user/avatar/${person._id}`}
                              alt={person.name}
                            />
                          </Link>
                            <h6>
                              {person.name.first + " " + person.name.last}
                            </h6>
                        </div>
                      </div>
                    </div>
                  );
              })}
            </div>
            <div className="col-sm">
              {/*//////////////////////POSTS//////////////////////////*/}
              <hr />

              <h3 className="text-secondary"> Posts</h3>
              <hr />
              {(posts != null) && posts.map((post, i) => {
                  
                  return (
                    <div key={i}>
                      <div className="row">
                        <div className="float-right ml-3">
                          <Link to={`/posts/${post._id}`}>
                            <h6>
                              {post.title}
                            </h6>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileTab;
