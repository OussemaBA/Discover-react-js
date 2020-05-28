import React, { Component } from "react";
import { Button, Popup } from "semantic-ui-react";
import Signin from "./Signin";

class PopupSignIn extends Component {
  
  constructor(props){
    super(props)
    this.state={
       shown:false
 
 
      }
    }



  

  render() {
 
    return (
      <Popup
        wide
        trigger={
          <Button as="a" inverted={!this.props.fixed}
          onClick={this.togglePopUp}>
            Log in
          </Button>
        }
        content={ <Signin/>}
        on="click"
      >
      
      </Popup>
    );
  }
}

export default PopupSignIn;
