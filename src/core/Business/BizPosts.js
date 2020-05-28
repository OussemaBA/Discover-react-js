import React, { Component } from "react";
import { Item} from "semantic-ui-react";
import faker from "faker";
import LikeButton from "../post/LikeButton";
class BizPost extends Component {
  render() {
    const post = this.props.post;
    return (
      <Item>
        <Item.Image size="small" src={faker.image.business()} />
        <Item.Content>
          <Item.Header as="a">{post.title}</Item.Header>

          <Item.Description>
            {" "}
            <span className="cinema">{post.body}</span>
          </Item.Description>
          <div className="float-right">
              <LikeButton post={post}/>
              </div>
        </Item.Content>
      </Item>
    );
  }
}

export default BizPost;
