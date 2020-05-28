import axios from "axios";
import React from 'react'
import { Dimmer, Loader, Image, Segment ,Grid} from 'semantic-ui-react'
//*****FUNCTION DEFINITION*********/

function authenticate(jwt, next) {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(jwt));
  }
  next();
}

const isAuthenticated = () => {
  if (typeof window == "undefined") return false;

  if (localStorage.getItem("jwt"))
    return JSON.parse(localStorage.getItem("jwt"));
  else return false;
};

const signout = async next => {
  if (typeof window !== "undefined") localStorage.removeItem("jwt");
  await axios.post(process.env.REACT_APP_API_URL + "/signout");
  next();
  }


function isActive(history, path) {
  if (history.location.pathname === path) return { color: "#ff9900" };
  else return { color: "#ffffff" };
}



const Loading = () => (
  <div>
   <Segment>
      <Dimmer  active inverted >
        <Loader size='large'>Loading</Loader>
      </Dimmer>
      
      <Grid columns={2} padded>
      <Grid.Column>
        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
      </Grid.Column>
      <Grid.Column>
        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
      </Grid.Column>
    </Grid>
     </Segment>

  </div>
)

export {
  isAuthenticated,
  authenticate,
  signout,
  isActive,
  Loading
};
