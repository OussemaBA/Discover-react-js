import food from "../../images/food.jpg";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import faker from "faker";
import { Image, Header, Rating, Icon, Grid, Popup } from "semantic-ui-react";
import ReadMoreReact from "read-more-react";

import React, { Component } from "react";
import LikeButton from "./LikeButton";

class card extends Component {
  componentDidMount() {}

  render() {
    const photoUrl = this.props._id
      ? `${process.env.REACT_APP_API_URL}/posts/photo/${
          this.props._id
        }?${new Date().getTime()}`
      : food;
    return (
      <div className="ui  card">
        <div className="content">
          <div className="right floated meta">
            {new Date(this.props.created).toDateString()}
          </div>
          <img
            className="ui avatar image"
            src={faker.internet.avatar()}
            alt={""}
          />
          <Link to={`/user/${this.props.posterId}`}>
            {" "}
            {this.props.posterName + " "}
          </Link>
          <hr />
          <Link
            to={{
              pathname: "/BizPage",
              state: { _id: this.props.business_id._id }
            }}
          >
            <Header color="teal" as="h5" textAlign="center">
              {" "}
              {this.props.business_id.businessName + " rating "}
            </Header>
          </Link>
        </div>
        <div className="image">
          <Image
            src={photoUrl}
            onError={e => {
              e.target.src = food;
            }}
            alt={food}
          />
        </div>

        <div className="content">
          <Rating defaultRating={this.props.rating} maxRating={5} disabled />

          <ReadMoreReact
            text={this.props.body}
            min={200}
            ideal={225}
            max={250}
            readMoreText="***Continue reading***"
          />
        </div>
        <div className="extra content">
          <div className="ui large transparent left icon input">
            <LikeButton post={this.props.post} />
          </div>
          <Popup
            wide
            trigger={
              <Button circular icon="share" floated="right"/>
            }
            on="click"
          >
            <Grid divided columns="equal">
              <Grid.Column>
                <Popup
                  trigger={<Button circular color="Twitter" icon="twitter"  color='twitter' />}
                  content="Not implemented Yet"
                  position="top center"
                  size="tiny"
                  inverted
                />
              </Grid.Column>
              <Grid.Column>
                <Popup
                  trigger={<Button circular color="facebook" icon="facebook" />}
                  content="Not implemented Yet"
                  position="top center"
                  size="tiny"
                  inverted
                />
              </Grid.Column>
            </Grid>
          </Popup>
        </div>
      </div>
    );
  }
}

export default card;
