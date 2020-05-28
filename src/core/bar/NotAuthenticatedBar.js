

import React from "react";
import {
  Container,
 
  Image,
  
  Menu,
 
  Sticky

} from "semantic-ui-react";
import dd from "../../images/testing.png";
import { Link} from "react-router-dom";


const NotAuthenticatedBar = () => (
  <div>
<Sticky>
      <Menu attached="top" tabular header inverted>      
      <Container>
      <Menu.Item as="a" header>
        <Link to="/">
          <Image size="mini" src={dd} style={{ marginRight: "1.5em" }} />
          
          </Link>
          <Link to="/">

          My Company Name
  </Link>
        </Menu.Item>

        <Menu.Item as="a" header>
          <Link to="/signin">
            Sign In {" "}
          </Link>{" "}
        </Menu.Item>

        <Menu.Item as="a" header>
          <Link to="/signup">
            Sign up{" "}
          </Link>{" "}
        </Menu.Item>

      </Container>
    </Menu>
    </Sticky>
  </div>
);

export default NotAuthenticatedBar;
