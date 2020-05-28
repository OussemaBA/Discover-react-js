import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Divider
} from "semantic-ui-react";
import { forgotPassword } from "./ApiCalls";
import {Link} from "react-router-dom"

class ForgotPasswordForm extends Component {
  state = {
    email: "",
    error: "",
    message:"",
    errorMessage:false,
    successMessage:false
  };

  forgotPassword = e => {
    e.preventDefault();
    this.setState({ message: "", error: "" });
    forgotPassword(this.state.email).then(res => {
      

            if (res.data.error) {
        console.log(res.data.error);
        this.setState({ error: res.data.error ,errorMessage:true,successMessage:false});
      } else if (res.data.message){
        console.log(res.data.message);
        this.setState({ message: res.data.message,successMessage:true ,errorMessage:false});
      }
    }) 
  };

  handleChange = field => event => {
    this.setState({ email: event.target.value });
  };
  render() {
    const { error,message ,errorMessage,successMessage} = this.state;
    return (
      <Grid 
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
      {console.log("errorMessage === true",errorMessage === true)}
      <Grid.Column style={{ maxWidth: 500}}>
          <Header as="h2" color="teal" textAlign="center">
            Reset Your Password
          </Header>
          <Form>
            <Segment>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                onChange={this.handleChange('email')}
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
              <Button onClick={this.forgotPassword}>Submit</Button>
            </Segment>
          </Form>
          <Divider horizontal> Or</Divider>
          <Grid>
            <Grid.Column floated="left" width={7}>
            Not Registered?   <Link to="/signup">Register now</Link>
            </Grid.Column>
            <Grid.Column floated="right" width={7}>
            you have an account ? <Link to="/signin">Log in</Link> 
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    );
  }
}

export default ForgotPasswordForm;
