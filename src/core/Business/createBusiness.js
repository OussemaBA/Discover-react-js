import { Form, Grid, Image, Button } from "semantic-ui-react";
import React, { Component } from "react";
import { isAuthenticated } from "../common/index";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Progress } from "reactstrap";

class createBusiness extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id:'',
      businessName: "",
      city: "",
      state: "",
      categories: "",
      businessPhone: "",
      zip: "",
      webAddress: "",
      streetAddress: "",
      photo: null,
      loaded: 0,

      businessNameError: null,
      cityError: null,
      stateError: null,
      categoriesError: null,
      businessPhoneError: null,
      zipError: null,
      webAddressError: null,
      streetAddressError: null
    };
    this.submitNewBusiness = this.submitNewBusiness.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.postPicture = this.postPicture.bind(this);

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
        `${process.env.REACT_APP_API_URL}/biz/photo/${this.state._id}`,
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
        //  this.setState({ redirectoProfile: false });
        }
      })
      .catch(e => {
        console.log("error:",e)
        toast.error(" Network Error");
      });
  }

//******Information Handler**********/


  clearForm() {
    this.setState({
      businessName: "",
      city: "",
      state: "",
      categories: "",
      businessPhone: "",
      zip: "",
      webAddress: "",
      streetAddress: "",

      businessNameError: null,
      cityError: null,
      stateError: null,
      categoriesError: null,
      businessPhoneError: null,
      zipError: null,
      webAddressError: null,
      streetAddressError: null
    });
  }

  submitNewBusiness(event) {
    event.preventDefault();

    let error = false;

    if (this.state.businessName === "") {
      this.setState({
        businessNameError: {
          content: "Business Name is required",
          pointing: "below"
        }
      });
      error = true;
    } else {
      this.setState({ businessNameError: null });
      error = false;
    }
    if (this.state.city === "") {
      this.setState({
        cityError: {
          content: "City is required",
          pointing: "below"
        }
      });
      error = true;
    } else {
      this.setState({ cityError: false });

      error = false;
    }
    if (this.state.state === "") {
      this.setState({
        stateError: {
          content: "State is required",
          pointing: "below"
        }
      });
      error = true;
    } else {
      this.setState({ stateError: false });
      error = false;
    }
    if (this.state.categories === "") {
      this.setState({
        categoriesError: {
          content: "add at lease one category",
          pointing: "below"
        }
      });
      error = true;
    } else {
      this.setState({ categoriesError: false });
      error = false;
    }
    if (this.state.businessPhone === "") {
      this.setState({
        businessPhoneError: {
          content: "Business Phone is required",
          pointing: "below"
        }
      });
      error = true;
    } else {
      this.setState({ businessPhoneError: false });
      error = false;
    }
    if (this.state.zip === "") {
      this.setState({
        zipError: {
          content: "Zip is required",
          pointing: "below"
        }
      });
      error = true;
    } else {
      this.setState({ zipError: false });
      error = false;
    }

    if (error) {
      this.setState({ formError: true });
      return;
    } else {
      const {
        businessName,
        city,
        state,
        categories,
        businessPhone,
        zip
      } = this.state
      const token = isAuthenticated().token;
      const userId = isAuthenticated().user._id;
  
      const post = {
        businessName,
        city,
        state,
        categories,
        businessPhone,
        zip,
        claimedBy:userId
      };
      axios
        .post(`${process.env.REACT_APP_API_URL}/biz/new/`, post, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          console.log(res)
          if (
            res.data.message !== undefined &&
            res.data.message !== "success"
            ) {
            toast.error("Error Occured");
            this.setState({ error: res.data.message });
          } else {
            console.log(res.data._id)
            toast.success(" Business Created successfully");
            this.setState({ _id:res.data._id });
           
          }
        });    }
  }

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
  render() {

    const {
      businessNameError,
      cityError,
      stateError,
      categoriesError,
      businessPhoneError,
      zipError,
      loaded,
      photo
    } = this.state;
    let src = photo === null ? "https://react.semantic-ui.com/images/wireframe/square-image.png" : photo
       return (
      <Grid padded="vertically" className="ml-2">
                <ToastContainer />

        <Grid.Row columns={3}>
          <Grid.Column />
          <Grid.Column>
            <Image
              className="mb-2 ml-5"
              src={src}
              size="medium"
              circular
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
              <label className="bmd-label-floating">Upload Business Picture</label>
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
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={3}>
          <Grid.Column>
            <Form>
              <Form.Input
                error={businessNameError}
                fluid
                label="Business Name"
                placeholder="Business Name"
                onChange={e => this.setState({ businessName: e.target.value })}
                value={this.state.businessName}
              />{" "}
              <Form.Input
                error={cityError}
                fluid
                label="City"
                placeholder="Sfax 2"
                onChange={e => this.setState({ city: e.target.value })}
                value={this.state.city}
              />{" "}
              <Form.Input
                error={stateError}
                fluid
                label="State"
                placeholder="Tunisia"
                onChange={e => this.setState({ state: e.target.value })}
                value={this.state.state}
              />
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Input
                  error={zipError}
                  fluid
                  label="Zip"
                  placeholder="3013"
                  onChange={e => this.setState({ zip: e.target.value })}
                  value={this.state.zip}
                />{" "}
                <Form.Input
                  error={categoriesError}
                  fluid
                  label="Categories"
                  placeholder="	Burgers,Pizza,BreakFast... "
                  onChange={e => this.setState({ categories: e.target.value })}
                  value={this.state.categories}
                />{" "}
                <Form.Input
                  error={businessPhoneError}
                  fluid
                  label="Business Phone"
                  placeholder="(+216)99 999 999"
                  onChange={e =>
                    this.setState({ businessPhone: e.target.value })
                  }
                  value={this.state.businessPhone}
                />{" "}
              </Form>
            </Grid.Column>
          </Grid.Column>
          <Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Input
                  fluid
                  label="Street Address"
                  placeholder="Manzel Chaker Street klm 2.5"
                  onChange={e =>
                    this.setState({ streetAddress: e.target.value })
                  }
                  value={this.state.streetAddress}
                />{" "}
                <Form.Input
                  fluid
                  label="Web Address"
                  placeholder="http://www.companyAddress.com"
                  onChange={e => this.setState({ webAddress: e.target.value })}
                  value={this.state.webAddress}
                />
              </Form>
            </Grid.Column>{" "}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={3}>
          <Grid.Column />
          <Grid.Column />

          <Button.Group>
            <Button onClick={this.clearForm}>Cancel</Button>
            <Button.Or />
            <Button color="brown" onClick={this.submitNewBusiness}>
              Submit
            </Button>
          </Button.Group>
        </Grid.Row>
      </Grid>
    );
  }
}

export default createBusiness;
