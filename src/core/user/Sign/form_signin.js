import React from "react";
import {Link} from "react-router-dom"
const form = props => {
  return (
    <div className="container">
     

      <h2 className="mt-5 mb-5">Sign in </h2>
      
      <div className="alert alert-danger" role="alert" style={{display:props.error ? "" :"none"}}>
        {props.error}
      </div>
      <form>

        <div className="form-group">
          <label className="bmd-label-floating"> Email</label>
          <input
            onChange={props.handleChange("email")}
            type="email"
            className="form-control"
            value={props.email}
          />
        </div>
        <div className="form-group">
          <label className="bmd-label-floating"> Password</label>
          <input
            onChange={props.handleChange("password")}
            type="password"
            className="form-control"
            value={props.password}
          />
        </div>
        <button
          onClick={props.postSignInUserData}
          className="btn btn-raised btn-primary"
        >
          Login
        </button>

     
       <div>
       Forgot your password?  <Link to="/forgetPassword">Click here</Link>
      </div>
      </form>
    </div>
  );
};

export default form;
