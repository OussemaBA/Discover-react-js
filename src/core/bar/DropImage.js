import React, { Component } from "react";
import { Dropdown, Image } from "semantic-ui-react";
import faker from "faker";
import { Redirect } from "react-router-dom";
import { isAuthenticated, signout } from "../common";

const trigger = (
  <span>
    <Image avatar src={faker.internet.avatar()} /> {faker.name.findName()}
  </span>
);

const options = [
  {
    key: "user"
  },
  { key: 1, text: "Your Profile", value: 1 },
  { key: 2, text: "Your Followers", value: 2, disabled: true },
  { key: 3, text: "Find people", value: 3 },
  { key: 4, text: "Reviews", value: 4 , disabled: true},
  { key: 5, text: "Help", value: 5, disabled: true },
  { key: 6, text: "Settings", value: 6, disabled: true },
  { key: 7, text: "Sign Out", value: 7 }
];

class DropImage extends Component {
  constructor() {
    super();
    this.state = {
      value: null,
      text: "",
      redirection: "/"
    };
  }
  handleChange = (e, { value }) => {
    this.setState({ value, text: e.target.textContent });
    const { user } = isAuthenticated();

    switch (value) {
      case 1:
        return this.setState({ redirection: `/user/${user._id}` });

      case 2:
        return this.setState({ redirection: `/user/${user._id}` });
      case 3:
        return this.setState({ redirection: "/findpeople" });
      case 4:
        return this.setState({ redirection: "/" });
      case 5:
        return this.setState({ redirection: "/" });
      case 6:
        return this.setState({ redirection: "/" });
      case 7: {
        return signout(() => {
          this.setState({ redirection: "/signout" });
        });
      }
      default:
        return this.setState({ redirection: "/" });
    }
  };

  render() {
    const {  redirection } = this.state;
    return (
      <div>
        <Redirect to={redirection} />
        <Dropdown
          position="right"
          trigger={trigger}
          options={options}
          onChange={this.handleChange}
          value={this.state.value}
        />
      </div>
    );
  }
}

export default DropImage;
