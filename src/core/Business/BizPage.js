import React, { Component } from "react";
import map from "../../images/map.jpeg";
import axios from "axios";
import { isAuthenticated } from "../common/index";
import {
  Grid,
  
  Card,
  Image,
  
  Header,
 
  List,
 
  Rating,
  Item
} from "semantic-ui-react";
import BizPost from "./BizPosts";

class BizPage extends Component {
  state = {
    bizs: []
  };
  componentDidMount() {
    const id = this.props.location.state._id;

    axios
      .get(`${process.env.REACT_APP_API_URL}/biz/${id}`, {
        headers: {
          Authorization: `Bearer ${isAuthenticated().token}`
        }
      })
      .then(res => {
        this.setState({ bizs: res.data });
      });
  }

  render() {
    const { bizs } = this.state;
    return (
      <Grid className="ml-2">
        <Grid.Row>
          <Grid.Column>Computer Row 4</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Card.Group itemsPerRow={3}>
              <Card>
                <Card.Content>
                  <Card.Header>Location</Card.Header>
                </Card.Content>
                <Image src={map} size="small" style={{ width: "100%" }} />
                <Card.Content>
                  <List>
                    <List.Item icon="phone" content="+216 95 498 055" />
                    <List.Item
                      icon="marker"
                      content="Avenue Habib Bourguiba, Tunis 1001 Tunisia"
                    />
                    <List.Item
                      icon="linkify"
                      content={
                        <a href="http://www.facebook.com">www.facebook.com</a>
                      }
                    />
                  </List>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>Details</Card.Header>

                  <List>
                    <List.Item icon="phone" content="+216 95 498 055" />
                    <List.Item
                      icon="marker"
                      content={
                        <div>
                          <Header as="h6" color="green">
                            Hours
                          </Header>
                          <pre>
                            <strong style={{ color: "#072FB9" }}> Mon </strong>{" "}
                            11:00 am - 12:00 am <br />
                            <strong style={{ color: "#072FB9" }}>
                              {" "}
                              Tue{" "}
                            </strong>{" "}
                            11:00 am - 12:00 am
                            <br />
                            <strong style={{ color: "#072FB9" }}>
                              {" "}
                              Wed{" "}
                            </strong>{" "}
                            11:00 am - 12:00 am <br />
                            <strong style={{ color: "#072FB9" }}>
                              {" "}
                              Thu{" "}
                            </strong>{" "}
                            11:00 am - 12:00 am{" "}
                            <strong style={{ color: "#12E328" }}>
                              {" "}
                              Open now{" "}
                            </strong>
                            <br />
                            <strong style={{ color: "#072FB9" }}>
                              {" "}
                              Fri{" "}
                            </strong>{" "}
                            11:00 am - 5:00 pm <br />
                            <strong style={{ color: "#072FB9" }}>
                              {" "}
                              Sat{" "}
                            </strong>{" "}
                            <strong style={{ color: "#FF0606" }}>
                              {" "}
                              Closed{" "}
                            </strong>{" "}
                            <br />
                            <strong style={{ color: "#072FB9" }}>
                              {" "}
                              Sun{" "}
                            </strong>{" "}
                            11:00 am - 12:00 am
                          </pre>
                        </div>
                      }
                    />
                    <List.Item
                      icon="clock outline"
                      content={
                        <pre>
                          Good For{" "}
                          <strong style={{ color: "#FF0606" }}>
                            {" "}
                            Lunch, Dinner, Late Night, Dessert{" "}
                          </strong>{" "}
                          <br />
                          Parking{" "}
                          <strong style={{ color: "#FF0606" }}>
                            Street{" "}
                          </strong>{" "}
                          <br />
                          Bike Parking{" "}
                          <strong style={{ color: "#FF0606" }}>
                            {" "}
                            Yes{" "}
                          </strong>{" "}
                          <br />
                          Good for Kids{" "}
                          <strong style={{ color: "#FF0606" }}>
                            Yes{" "}
                          </strong>{" "}
                          <br />
                          Good for Groups{" "}
                          <strong style={{ color: "#FF0606" }}>
                            {" "}
                            Yes{" "}
                          </strong>{" "}
                          <br />
                          Attire{" "}
                          <strong style={{ color: "#FF0606" }}>
                            {" "}
                            Casual{" "}
                          </strong>{" "}
                          <br />
                          Ambience{" "}
                          <strong style={{ color: "#FF0606" }}>
                            {" "}
                            Casual, Touristy, Classy{" "}
                          </strong>{" "}
                          <br />
                          Noise Level{" "}
                          <strong style={{ color: "#FF0606" }}>
                            {" "}
                            Average{" "}
                          </strong>
                          <br />
                          Alcohol{" "}
                          <strong style={{ color: "#FF0606" }}>
                            Full Bar{" "}
                          </strong>{" "}
                          <br />
                          Outdoor Seating{" "}
                          <strong style={{ color: "#FF0606" }}> Yes </strong>
                        </pre>
                      }
                    />
                  </List>
                </Card.Content>
              </Card>

              <Card>
                <Card.Content>
                  <Card.Header>Ratings and reviews</Card.Header>
                  <br />
                  <List>
                    <List.Item
                      icon="users"
                      content={
                        <div>
                          <Rating defaultRating={4} maxRating={5} disabled />{" "}
                          418 reviews
                        </div>
                      }
                    />
                    <List.Item
                      icon="trophy"
                      content={" #1  of 281 Restaurants in Tunis"}
                    />
                  </List>
                </Card.Content>
                <Card.Content>
                  <List>
                    <List.Item>RATINGS</List.Item>
                    <br />
                    <List.Item
                      icon="food"
                      content={
                        <pre>
                          Food{" "}
                          <Rating defaultRating={4} maxRating={5} disabled />{" "}
                        </pre>
                      }
                    />
                    <List.Item
                      icon="currency"
                      content={
                        <pre>
                          Value{" "}
                          <Rating defaultRating={4} maxRating={5} disabled />{" "}
                        </pre>
                      }
                    />
                    <List.Item
                      icon="clock outline"
                      content={
                        <pre>
                          Atmosphere{" "}
                          <Rating defaultRating={4} maxRating={5} disabled />{" "}
                        </pre>
                      }
                    />
                    <List.Item
                      icon="hourglass half"
                      content={
                        <pre>
                          Service{" "}
                          <Rating defaultRating={4} maxRating={5} disabled />{" "}
                        </pre>
                      }
                    />
                  </List>
                </Card.Content>
              </Card>
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <hr />
            <Item.Group divided>
              {bizs.map(biz => {
                return (
                    <BizPost post={biz} key={biz._id}/>
                );
              })}
            </Item.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>Computer Row 1</Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default BizPage;
