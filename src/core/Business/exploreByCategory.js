import { Header, Image, Card, Icon, Button } from "semantic-ui-react";
import React, { Component } from "react";
import { FetchBuz } from "./BizApi";
import { Link } from "react-router-dom";
import { Loading } from "../common";

import faker from "faker";

class ExploreByCategory extends Component {
  render() {
    const { bizs, title } = this.props.location.state;

    return (
      <div>
        <Header as="h1">The Best {title}</Header>

        <Card.Group itemsPerRow={2} className="ml-2 mr-2">
          {bizs.map(biz => {
            let src =
              biz.photo === undefined
                ? faker.image.business()
                : `${process.env.REACT_APP_API_URL}/biz/photo/${biz._id}}`;
            return (
              <Card>
                <Image src={src} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>
                    {" "}
                    <Link
                      to={{ pathname: "/BizPage", state: { _id: biz._id } }}
                    >
                      {biz.businessName}
                    </Link>
                  </Card.Header>
                  <Card.Meta>{"City: " + biz.city}</Card.Meta>
                  <Card.Meta>{"State: " + biz.state}</Card.Meta>

                  <Card.Description>
                    {"Phone:" + biz.businessPhone}
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div>
                    <Icon name="user" />
                    10 Reviews
                  </div>
                  <Link
                    to={{ pathname: "/post/create", state: { _id: biz._id } }}
                  >
                    <Button
                      animated
                      floated="right"
                      color="brown "
                      style={{ width: "40%" }}
                    >
                      <Button.Content visible>Rate</Button.Content>
                      <Button.Content hidden>
                        <Icon name="arrow right" />
                      </Button.Content>
                    </Button>
                  </Link>
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
      </div>
    );
  }
}

export default ExploreByCategory;
