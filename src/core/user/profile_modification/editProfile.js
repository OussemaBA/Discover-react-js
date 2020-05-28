import React, { Component } from "react";
import { init_user_data, updateUser } from "../userApi";
import { isAuthenticated } from "../../common/index";
import ModForm from "../Sign/form";
import { Redirect } from "react-router-dom";
import FormData from "form-data";
import axios from "axios";
import { Progress } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultImg from "../../../images/avatar.png";

////////////////////////////////////////////////////
/////////////////Editing Information///////////////
///////////no Client side  validation/////////////
//////////////////////*_*////////////////////////

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      first: "",
      middle: "",
      last: "",
      email: "",
      redirectoProfile: false,
      error: "",
      photo: null,
      loaded: 0,
      about: ""
    };
    this.postUpdateinfo = this.postUpdateinfo.bind(this);
    this.updateProfilePicture = this.updateProfilePicture.bind(this);
  }

  //***handleChange****** */

  handleChange = field => event => {
    const value =
      field === "photo" ? event.target.files[0] : event.target.value;
    this.setState({ [field]: value });

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

  postUpdateinfo(event) {
    event.preventDefault();

    const { first, middle, last, email, password, about } = this.state;

    const user = {
      name: {
        first,
        middle,
        last
      },
      email,
      password,
      about
    };
    const token = isAuthenticated().token;

    axios
      .put(`${process.env.REACT_APP_API_URL}/user/info/${this.userId}`, user, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (
          res.data.message !== "undefined" &&
          res.data.message !== "success"
        ) {
          toast.error("Error Occured ");
          this.setState({ error: res.data.message });
        } else {
          toast.success("Information  Updated");
          updateUser(user);
        }
      })
      ;
  }

  updateProfilePicture(event) {
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
        `${process.env.REACT_APP_API_URL}/user/avatar/${this.userId}`,
        data,
        config
      )
      .then(res => {
        if (
          res.data.message !== "undefined" &&
          res.data.message !== "success"
        ) {
          toast.error("upload fail");
          this.setState({ redirectoProfile: false, error: res.data.message });
        } else {
          toast.success("Photo Uploaded");
          this.setState({ redirectoProfile: false });
        }
      })
      .catch(e => {
        toast.error(" Network Error");
      });
  }

  componentDidMount() {
    this.userId = this.props.match.params.userId;

    init_user_data(this.userId)
      .then(res => {
        const data = res.data;
        if (typeof data.message === "undefined") {
          // no error detected
          this.setState({
            id: data._id,
            first: data.name.first,
            middle: data.name.middle,
            last: data.name.last,
            email: data.email,
            about: data.about
          });
        } else {
          this.setState({ redirectoProfile: false, error: data.message });
        }
      })
      .catch(e => {
        toast.error(" Network Error");
      });
  }

  render() {
    const { redirectoProfile, id, first, about } = this.state;
    const photoUrl = id
      ? `${process.env.REACT_APP_API_URL}/user/avatar/${
          this.userId
        }?${new Date().getTime()}`
      : defaultImg;

    if (redirectoProfile) {
      return <Redirect to={`/user/${id}`} />;
    }
    return (
      <div className="container">
        <div className="form-group">
          <ToastContainer />
        </div>

        <div className="row">
          <div className="col-md-6">
            <img
              style={{ height: "150px", width: "auto" }}
              className="img-thumbnail"
              src={photoUrl}
              alt={first}
              onError={i => (i.target.src = `defaultImg`)}
            />
            <ModForm
              type={"Edit Personal Information"}
              {...this.state}
              handleChange={this.handleChange}
              postUpdateinfo={this.postUpdateinfo}
              onUpload={this.onUpload}
            />
            <Progress
              max="100"
              color="info"
              value={this.state.loaded}
              style={{ height: "25px" }}
            >
              {Math.round(this.state.loaded, 2)}%
            </Progress>
            <div className="form-group">
              <label className="bmd-label-floating">
                change profile Picture
              </label>
              <input
                onChange={this.handleChange("photo")}
                type="file"
                className="form-control"
                accept="image/*"
              />
              <button
                type="text"
                className="form-control"
                onClick={this.updateProfilePicture}
                    >
                Upload
              </button>
              <button
                type="text"
                onClick={() => this.setState({ redirectoProfile: true })}
                className="form-control"
              >
                Back to profile
              </button>
            </div>
          </div>
          <div className="col-md-6">
          <label className="bmd-label-floating">
                About Me
              </label>
            <textarea
              onChange={this.handleChange("about")}
              type="text"
              className="form-control"
              value={about}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfile;
