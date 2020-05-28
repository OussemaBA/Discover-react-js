import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Posts from "../post/allPosts";
import image from "../../images/ballon.jpg";
import { isAuthenticated } from "../common/index";
import {
  Button,
  Container,
  Grid,
  Header,
  Icon,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Transition
} from "semantic-ui-react";
import DropImage from "../bar/DropImage";
import PopupSignIn from "../user/Sign/popup_signin";
import Categories from "./Categories";
import SearchBar from "./SearchBar";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container>
    <Header
      as="h1"
      content="Discover"
      inverted
      style={{
        fontSize: mobile ? "2em" : "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: mobile ? "1.5em" : "3em"
      }}
    />

    <Header
      as="h6"
      content="Behold ! The Power Of Discover"
      inverted
      style={{
        fontSize: mobile ? "1.5em" : "1.7em",
        fontWeight: "normal",
        marginTop: mobile ? "0.5em" : "1.5em"
      }}
    />
    <SearchBar />
  </Container>
);

HomepageHeading.propTypes = {
  mobile: PropTypes.bool
};

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
const divStyle = {
  backgroundImage: `url(${image})`,
  backgroundSize: "cover"
};

class DesktopContainer extends Component {
  state = {
    redirectTo: null
  };

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed, redirectTo } = this.state;

    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }
    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <div style={divStyle}>
            <Segment
              textAlign="center"
              style={{ minHeight: 700, padding: "1em 0em" }}
              vertical
            >
              <Menu 
                fixed={fixed ? "top" : null}
                inverted={!fixed}
                secondary={!fixed}
                size="large"
              >
                <Container >
                  <Menu.Item as="a">
                    <Link to="/business/explore">Write a review</Link>{" "}
                  </Menu.Item>

                  <Menu.Item as="a">Nearby event</Menu.Item>
                  <Menu.Item as="a">
                    <Link to="/business/new">Claim a Business</Link>
                  </Menu.Item>
                </Container>

                {isAuthenticated() ? (
                  <Menu.Item>
                    <DropImage />
                  </Menu.Item>
                ) : (
                  <>
                    <Menu.Item >
                      <PopupSignIn fixed={fixed} />

                      <Button
                        onClick={() => this.setState({ redirectTo: "/signup" })}
                        as="a"
                        inverted={!fixed}
                        primary={fixed}
                        style={{ marginLeft: "0.5em" }}
                      >
                        Sign Up
                      </Button>
                    </Menu.Item>
                  </>
                )}
              </Menu>
              <HomepageHeading />
            </Segment>
          </div>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends Component {
  state = {
    redirectTo: null
  };

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened, redirectTo } = this.state;
    const { fixed } = this.state;

    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }
    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as="a" active>
            Home
          </Menu.Item>
          <Menu.Item as="a">Work</Menu.Item>
          <Menu.Item as="a">Company</Menu.Item>
          <Menu.Item as="a">Careers</Menu.Item>
          {isAuthenticated() ? (
            <Menu.Item>
              <DropImage />
            </Menu.Item>
          ) : (
            <>
              <Menu.Item className="mr-5 mt-1">
                <Link to="/signin" style={{ marginLeft: "0.5em" }}>
                  Sign In
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/signup" style={{ marginLeft: "0.5em" }}>
                  Sign Up
                </Link>
              </Menu.Item>
            </>
          )}
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 350, padding: "1em 0em" }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  {isAuthenticated() ? (
                    <Menu.Item>
                      <DropImage />
                    </Menu.Item>
                  ) : (
                    <>
                      <Menu.Item className="mr-5 mt-1">
                        <PopupSignIn fixed={fixed} />

                        <Button
                          onClick={() =>
                            this.setState({ redirectTo: "/signup" })
                          }
                          as="a"
                          inverted
                          style={{ marginLeft: "0.5em" }}
                        >
                          Sign Up
                        </Button>
                      </Menu.Item>
                    </>
                  )}
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageHeading mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Header as="h1" style={{ fontSize: "2em" }}>
              Categories
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <Categories />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment>
      <Posts />
    </Segment>
    <Segment style={{ padding: "8em 0em" }} vertical>
      <Container textAlign="center">
        <Header as="h3" style={{ fontSize: "2em" }}>
          Our Company Mobile Apps{" "}
        </Header>
        <p style={{ fontSize: "1.33em" }}>Comming Soon ..</p>
        <Button as="a" size="large">
          Read More
        </Button>
      </Container>
    </Segment>
    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="About" />
              <List link inverted>
                <List.Item as="a">Sitemap</List.Item>
                <List.Item as="a">Contact Us</List.Item>
                <List.Item as="a">Privacy Policy</List.Item>
                <List.Item as="a">Terms of Service</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Services" />
              <List link inverted>
                <List.Item as="a">Banana Pre-Order</List.Item>
                <List.Item as="a">DNA FAQ</List.Item>
                <List.Item as="a">How To Access</List.Item>
                <List.Item as="a">Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as="h4" inverted>
                For Business Owners{" "}
              </Header>
              <List link inverted>
                <List.Item as="a">Claim your Business Page</List.Item>
                <List.Item as="a">Advertise on Yelp our Company</List.Item>
                <List.Item as="a">Business Success Stories</List.Item>
                <List.Item as="a">FAQ</List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
);
export default HomepageLayout;
