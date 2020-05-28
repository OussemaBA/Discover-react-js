import Card from "./card";
import React, { Component } from "react";
import axios from "axios";
import { Header } from "semantic-ui-react";
import { Loading } from "../common/index";
import Columns from "react-columns";

class Posts extends Component {
  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/posts`).then(res => {
      if (typeof res.data.message === "undefined") {
        console.log(res.data);
        this.setState({ posts: res.data.posts, loading: false });
      }
    });
  }

  constructor() {
    super();
    this.state = {
      posts: [],
      loading: true
    };
  }

  render() {
    const { posts, loading } = this.state;

    if (loading) return <Loading />;

    return (
      <div>
        <Header className="center aligned" as="h3" style={{ fontSize: "2em" }}>
          Recent Activity
        </Header>

        <Columns columns={4} gap="10px">
          {posts.map((post, i) => {
            const posterId = post.postedBy ? post.postedBy._id : "";
            const posterName = post.postedBy
              ? post.postedBy.name.first
              : "Unkown";
            return (
              <div className="mt-5 ml-2 mr-1" key={i}>
                {post !== null && (
                  <Card {...post} posterId={posterId} posterName={posterName} post={post} />
                )}
              </div>
            );
          })}
        </Columns>
      </div>
    );
  }
}

export default Posts;
