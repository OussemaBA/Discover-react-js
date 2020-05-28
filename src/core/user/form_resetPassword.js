import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import { resetPassword } from "./ApiCalls";

class resetPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      message: "",
      error: "",
      errorMessage: false,
      successMessage: false
    };
  }

  resetPassword = e => {
    e.preventDefault();
    this.setState({ message: "", error: "" });

    resetPassword({
      newPassword: this.state.newPassword,
      resetPasswordLink: this.props.match.params.resetPasswordToken
    }).then(res => {
      if (res.data.error) {
        console.log(res.data.error);
        this.setState({
          error: res.data.error,
          errorMessage: true,
          successMessage: false
        });
      } else if (res.data.message) {
        console.log(res.data.message);
        this.setState({
          message: res.data.message,
          successMessage: true,
          errorMessage: false
        });
      }
    });
  };

  handleChange = () => event => {
    this.setState({ newPassword: event.target.value });
  };
  render() {
    const { error, message, errorMessage, successMessage } = this.state;
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 500 }}>
          <Header as="h2" color="teal" textAlign="center">
            New Password
          </Header>
          <Form>
            <Segment>
              <Form.Input
                fluid
                icon="key"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange("email")}
              />

              <Form.Input
                fluid
                icon="key"
                iconPosition="left"
                placeholder="Re-enter Password"
                onChange={this.handleChange("email")}
              />
              {errorMessage === true ? (
                <Message
                  error
                  visible={errorMessage}
                  header="Error "
                  content={error}
                />
              ) : (
                <Message
                  success
                  visible={successMessage}
                  header="Success"
                  content={message}
                />
              )}
              <Button onClick={this.resetPassword}>Submit</Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default resetPasswordForm;
