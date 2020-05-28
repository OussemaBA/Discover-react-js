import { isAuthenticated } from "../common/index";
import NotAuthenticatedBar from "./NotAuthenticatedBar";
import AuthenticatedBar from "./AuthenticatedBar";



import React, { Component } from 'react';

class upbar extends Component {
  
  

  render() {
    return (
      <div>
      {!isAuthenticated()&& <NotAuthenticatedBar />}
      {isAuthenticated()&& <AuthenticatedBar />}
      </div>
    );
  }
}

export default upbar;