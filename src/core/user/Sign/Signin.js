import React, { Component } from "react";
import axios from "axios";
import InForm from "./form_signin";
import { Redirect } from "react-router";
import  {authenticate} from '../../common/index';


class Signin extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      error: "",
      redirectTo: false
    };
  }

  handleChange = field => event => {
    this.setState({ [field]: event.target.value });
  };

  postSignInUserData = event => {
    
    event.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password
    };

    axios.post(process.env.REACT_APP_API_URL  + "/signin", user).then(res => {
      const message = res.data.message;
      const data = res.data;

      
      if ((message!=="success" ||  typeof message === "undefined")) this.setState({ error:message });
      else{
          
        authenticate(data, () => {
          this.setState({ redirectTo: true });
        });
      }
    });
  };

  render() {
    const { redirectTo } = this.state;
    if (redirectTo) {
      return <Redirect to="/home" />;
    }
    return (
      <div >
        <InForm
          {...this.state}
          handleChange={this.handleChange}
          postSignInUserData={this.postSignInUserData}
        />
      </div>
    );
  }
}

export default Signin;
