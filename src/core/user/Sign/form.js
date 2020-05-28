import React from "react";
import { Link } from "react-router-dom";

const form = props => {
  return (
    <div className="container">
      <div
        className="alert alert-info"
        style={{ display: props.open ? "" : "none" }}
      >
        new Account is successfully created.{" "}
        <Link to="/signin">Signin</Link>
      </div>

      <h2 className="mt-5 mb-5">{props.type} </h2>
      <div
        className="alert alert-danger"
        role="alert"
        style={{ display: props.error ? "" : "none" }}
      >
        {props.error}
      </div>
      <form>
        <div className="form-group">
          <label className="bmd-label-floating">First</label>
          <input
            onChange={props.handleChange("first")}
            type="text"
            className="form-control"
            value={props.first}
          />
        </div>
        <div className="form-group">
          <label className="bmd-label-floating">Middle</label>
          <input
            onChange={props.handleChange("middle")}
            type="text"
            className="form-control"
            value={props.middle}
          />
        </div>
        <div className="form-group">
          <label className="bmd-label-floating">Last</label>
          <input
            onChange={props.handleChange("last")}
            type="text"
            className="form-control"
            value={props.last}
          />
        </div>
        <div className="form-group">
          <label className="bmd-label-floating"> Email</label>
          <input
            onChange={props.handleChange("email")}
            type="email"
            className="form-control"
            value={props.email}
          />
        </div>
        {!(props.type === "Edit Personal Information") ? (
          <> 
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
              onClick={props.postSignUpUserData}
              className="btn btn-raised btn-primary"
            >
              Submit
            </button>
          </>
        ) : (
          <>
          

            <button
              onClick={props.postUpdateinfo}
              className="btn btn-raised btn-primary"
            >
              Update
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default form;
