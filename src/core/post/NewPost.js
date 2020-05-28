import React, { Component } from "react";
import { isAuthenticated } from "../common/index";
import FormData from "form-data";
import axios from "axios";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StarRatings from "react-star-ratings";

import Form from "./formulaire";

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id:"",
      title: "",
      rating: 0,
      body: "",
      user: {},
      loaded: 0,
      loading: true,
      photo:null,
    };
    this.postInfo = this.postInfo.bind(this);
    this.postPicture = this.postPicture.bind(this);
    this.changeRating = this.changeRating.bind(this);
  }

  postPicture(event) {
    event.preventDefault();

    const token = isAuthenticated().token;

    const data = new FormData();

    data.append("file", this.state.photo);

    var config = {
      onUploadProgress: ProgressEvent => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
        });
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/posts/photo/${this.state._id}`,
        data,
        config
      )
      .then(res => {
        if (
          res.data.message !== "undefined" &&
          res.data.message !== "success"
        ) {
          toast.error("upload fail");
          this.setState({ error: res.data.message });
        } else {
          toast.success("Photo Uploaded");
          this.setState({ redirectoProfile: false });
        }
      })
      .catch(e => {
        toast.error(" Network Error");
      });
  }
  //***handleChange****** */

  handleChange = field => event => {
    if (field === "photo") {
      let file = event.target.files[0];
      let size = 1500000; // ???MB do the math
      if (file.size > size) {
        event.target.value = null;
        toast.error(" is Too large , please pick a small One .");
      } else {
        this.setState({ [field]: file });
      }
    } else {
      let value = event.target.value;
      this.setState({ [field]: value });
    }
  };

  postInfo(event) {
    event.preventDefault();
    
    const {_id} =  this.props.location.state
    const { title, body, rating } = this.state;
    const token = isAuthenticated().token;
    const userId = isAuthenticated().user._id;

    const post = {
      business_id:_id,
      title,
      body,
      rating,
      postedBy:userId
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/posts/new/${userId}`, post, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (
          res.data.message !== undefined &&
          res.data.message !== "success"
          ) {
          toast.error("Error Occured");
          this.setState({ error: res.data.message });
        } else {
          toast.success(" Post Created, NOW PLEASE UPLOAD A FILE");
           this.setState({ _id:res.data._id });
        }
      });
  }

 

  changeRating(newRating) {
    this.setState({
      rating: newRating
    });
  }

 
  
  render() {
    const { rating, loaded } = this.state;
    return (
      <div>
      
        <div className="form-group">
          <ToastContainer />
        </div>
        <h2 className="mt-5 mb-5 ml-2">New Post </h2>

        <div className="row">
          <div className="col-md-6 ml-2 ">
            <StarRatings
              rating={rating }
              starRatedColor="blue"
              changeRating={this.changeRating}
              numberOfStars={6}
              name="rating"
            />
            <Form
              {...this.state}
              handleChange={this.handleChange}
              postData={this.postInfo}
            />

            <div className="form-group ml-3">
              <Progress
                max="100"
                color="info"
                value={loaded}
                style={{ height: "25px" }}
              >
                {Math.round(loaded, 2)}%
              </Progress>
              <label className="bmd-label-floating">Upload Post Picture</label>
              <input
                onChange={this.handleChange("photo")}
                type="file"
                className="form-control"
                accept="image/*"
              />
              <button
                type="text"
                className="form-control"
                onClick={this.postPicture}
              >
                Upload
              </button>
              <hr/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewPost;
