import { Grid, Image, Popup } from "semantic-ui-react";

import restau from "../../images/restau.png";
import hotel from "../../images/hotel.png";
import massage from "../../images/massage.png";
import car_repair from "../../images/car_repair.png";
import shopping from "../../images/shopping.png";
import dentist from "../../images/dentist.png";
import hopital from "../../images/hopitals.png";
import elect from "../../images/elect.png";

import React, { Component } from "react";
import Category from "./category";

class Categories extends Component {
  render() {
    return (
      <div>
        <Grid columns={4} celled>
          <Grid.Row>
            <Grid.Column>
              <Category src={restau} title="restaurants" />
            </Grid.Column>
            <Grid.Column>
              <Category src={hotel} title="Hotels" />
            </Grid.Column>
            <Grid.Column>
              <Category src={massage} title="Beauty & Spas" />
            </Grid.Column>
            <Grid.Column>
              <Category src={car_repair} title="Auto Repair" />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Category src={shopping} title="Coming Soon" />
            </Grid.Column>
            <Grid.Column>
              <Category src={dentist} title="Coming Soon" />
              {/*Dentists*/}
            </Grid.Column>
            <Grid.Column>
              <Category src={hopital} title="Coming Soon" />{" "}
              {/*Health & Medical*/}
            </Grid.Column>
            <Grid.Column>
              <Category src={elect} title="Coming Soon" /> {/*Electricians*/}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Categories;
