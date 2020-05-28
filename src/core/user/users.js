import { Component } from "react";
import { users_list, UsersCards } from "./userApi";

class users extends Component {
  componentDidMount() {
    users_list().then(res => {
      if (typeof res.data.message === "undefined") {
        this.setState({ users: res.data.users });
      } 
    });
  }

  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  render() {
    const { users } = this.state;

  return UsersCards(users);
  }
}

export default users;


