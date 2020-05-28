import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import { remove } from "../userApi";
import { Redirect } from "react-router-dom";


import { isAuthenticated, signout } from "../../common";

class DeleteModal extends Component {
  state = { open: false ,redirect:false};

  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
  };

  close = () => this.setState({ open: false });
  yesHandler = () => {
    const token = isAuthenticated().token;
    const userId=this.props.userId;
    remove(userId, token);

    signout(() => {
        this.setState({ redirect: true });
        this.close();
    });
  };
  render() {
    const { open, closeOnEscape, closeOnDimmerClick ,redirect} = this.state;

    if (redirect) {
        return <Redirect to="/" />;
      }
  
    return (
      <div>
        
        
        <Button color='red' onClick={this.closeConfigShow(true, false)} >Delete </Button>

        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close}
          style={{ background: "none", marginTop: "15%" }}
        >
          <Modal.Header>Delete Your Account</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete your account</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              No
            </Button>
            <Button
              onClick={this.yesHandler}
              positive
              labelPosition="right"
              icon="checkmark"
              content="Yes"
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default DeleteModal;
