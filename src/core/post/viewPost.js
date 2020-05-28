import React, { Component } from "react";
import { init_post_data, deletePost } from "./apiPost";
import food from "../../images/food.jpg";
import { Link } from "react-router-dom";
import faker from "faker";
import { Button} from "semantic-ui-react";
import { Loading } from "../common";
import { isAuthenticated } from "../common/index";
import LikeButton from "./LikeButton";
import { Image ,Rating} from 'semantic-ui-react'

class viewPost extends Component {
  state = {
    post: "",
    loading: true
  };

  componentDidMount = () => {
    const postId = this.props.match.params.postId;

    init_post_data(postId).then(res => {
      if (res.data.error) {
      } else {
        this.setState({ post: res.data, loading: false });
      }
    });
  };

  remove = () => {
    const postId = this.props.match.params.postId;
    const token = isAuthenticated().token;
    deletePost(postId, token).then(res => {
      console.log(" " + res);
    });
  };
  renderPost = post => {
    const posterId = post.postedBy ? post.postedBy._id : "";
    const posterName = post.postedBy ? post.postedBy.name.first : "Unkown";
    const { loading } = this.state;
    const photoUrl = post._id
    ? `${process.env.REACT_APP_API_URL}/posts/photo/${post._id}?${new Date().getTime()}`
    : food;

    if (loading)
      return (
        <div>
          <Loading />
        </div>
      );

    return (
      
      <div>
        <div className="content">
          <h2 className="display-2 mt-5 mb-3">{post.title}</h2>
          <div>{new Date(post.created).toDateString()}</div>
          <img
            className="ui avatar image"
            src={faker.internet.avatar()}
            alt={photoUrl}
          />
          <Link to={`/user/${posterId}`}> {posterName + " "}</Link>
        </div>
        <div>
        <Image
            size="medium"
            src={photoUrl}
            onError={e => {
              e.target.src = food;
            }}
            alt={food}
          />
         <LikeButton  post={post}/>
           <div className="content">
            <span className="right floated">
              <i className="heart outline like icon" />

              {post.rating + " rating "}
              <hr />

              {post.body}
              <hr />
            </span>
            <Button.Group className="mb-5" floated="right">
              <Link to={`/`}>
                <Button className="mr-5" color="blue">
                  Back
                </Button>{" "}
              </Link>
              {isAuthenticated() && isAuthenticated().user._id === posterId && (
                <>
                  <Link to={`/posts/edit/${post._id}`}>
                    <Button className="mr-5" color="green">
                      Edit Post
                    </Button>{" "}
                  </Link>

                  <Button color="red" className="mr-5" onClick={this.remove}>
                    Delete Post
                  </Button>
                </>
              )}
            </Button.Group>
          </div>
        </div>
        <div />
      </div>
    );
  };

  render() {
    return <div className="container">{this.renderPost(this.state.post)}</div>;
  }
}

export default viewPost;
