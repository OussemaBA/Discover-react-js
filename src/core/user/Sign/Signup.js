import React, { Component } from "react";
import axios from "axios";
import Form from "./form";


class Signup extends Component {
  constructor() {
    super();
    this.state = {
      first: "",
      middle: "",
      last: "",
      email: "",
      password: "",
      error: "",
      open: false
    };
  }

  handleChange = field => event => {
    this.setState({ [field]: event.target.value });
  };

  postSignUpUserData = event => {
    event.preventDefault();

    const { first, middle, last, email, password } = this.state;

    const user = {
      name: {
        first,
        middle,
        last
      },
      email,
      password
    };

    axios.post(process.env.REACT_APP_API_URL + "/signup", user)
    .then(res => {
      const error = res.data.message;
      if (error !== "d") this.setState({ error });
      else
        this.setState({
          first: "",
          middle: "",
          last: "",
          email: "",
          password: "",
          error: "",
          open: true
        });
    });
  };

  render() {
    return (
      <div>
        <Form
          type={"Sign Up"}
          {...this.state}
          handleChange={this.handleChange}
          postSignUpUserData={this.postSignUpUserData}
        />
      </div>
    );
  }
}

export default Signup;
