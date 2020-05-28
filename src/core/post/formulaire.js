import React from "react";

const form = props => {
  return (
    <div className="container">
      <div
        className="alert alert-danger"
        role="alert"
        style={{ display: props.error ? "" : "none" }}
      >
        {props.error}
      </div>
      <form>
        <div className="form-group">
          <label className="bmd-label-floating">Title</label>
          <input
            onChange={props.handleChange("title")}
            type="text"
            className="form-control"
            value={props.title}
          />

          <label className="bmd-label-floating"> Body</label>
          <div className="col-md-6">
            <textarea
              onChange={props.handleChange("body")}
              type="text"
              className="form-control"
              value={props.body}
            />
            <button
              onClick={props.postData}
              className="btn btn-raised btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default form;
