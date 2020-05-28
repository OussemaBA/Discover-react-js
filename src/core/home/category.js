import React, { Component } from "react";
import { Dimmer, Header, Image } from "semantic-ui-react";
import { getDatafromDataBase } from "./HomeApi";
import { Redirect } from "react-router-dom";
export default class Category extends Component {
  state = { result: [], active: "", redirect: false };

  handleShow = () => this.setState({ active: true });
  handleHide = () => this.setState({ active: false });

  clickHander = event => {
    if (this.props.title !== "Coming Soon")
      getDatafromDataBase(this.props.title).then(res => {
        this.setState({ result: res.data, redirect: true });
      
      });
  };

  render() {
    const { active, result, redirect } = this.state;
    const content = (
      <div>
        <Header as="h2" inverted>
          {this.props.title}
        </Header>
      </div>
    );
    if (redirect)
      return (
        <Redirect
          to={{
            pathname: "/exploreByCategory",
            state: { bizs: result, title: this.props.title }
          }}
        />
      );
    return (
      <Dimmer.Dimmable
      onClick={this.clickHander}
        as={Image}
        dimmed={active}
        dimmer={{ active, content }}
        onMouseEnter={this.handleShow}
        onMouseLeave={this.handleHide}
        size="medium"
        src={this.props.src}
      />
    );
  }
}
