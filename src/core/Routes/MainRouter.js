import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Singup from "../user/Sign/Signup";
import Signin from "../user/Sign/Signin";
import Profile from "../user/profile";
import Users from "../user/users";
import EditProfile from "../user/profile_modification/editProfile";
import FindPeople from "../user/FindPeople";
import NewPost from "../post/NewPost";
import PrivateRoute from "../common/PrivateRoute";
import HomepageLayout from "../home/homeLayout";
import home from "../home/home";
import Upbar from "../bar/upbar";
import ViewPost from "../post/viewPost";
import UpdatePost from "../post/updatePost";
import createBusiness from "../Business/createBusiness";
import ExploreBusiness from "../Business/exploreBusiness";
import BizPage from "../Business/BizPage";
import ForgotPasswordForm from "../user/form_forgetPassword";
import resetPasswordForm from "../user/form_resetPassword";
import ExploreByCategory from "../Business/exploreByCategory";

class MainRouter extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={HomepageLayout} />
        <Route path="/signout" exact component={HomepageLayout} />
        <Upbar />
        <Switch>
          <Route
            exact
            path="/reset-password/:resetPasswordToken"
            component={resetPasswordForm}
          />
      
          <Route path="/forgetPassword" exact component={ForgotPasswordForm} />
          <Route path="/BizPage" exact component={BizPage} />
          <PrivateRoute path="/business/new" exact component={createBusiness} />
          <Route path="/signup" exact component={Singup} />
          <Route path="/business/explore" exact component={ExploreBusiness} />
          <Route path="/exploreByCategory" exact component={ExploreByCategory} />
          <PrivateRoute path="/home" exact component={home} />
          <Route path="/signin" exact component={Signin} />
          <PrivateRoute path="/user/:userId" exact component={Profile} />
          <Route path="/users" exact component={Users} />
          <PrivateRoute path="/findpeople" exact component={FindPeople} />
          <PrivateRoute path="/post/create" exact component={NewPost} />
          <PrivateRoute
            path="/user/edit/:userId"
            exact
            component={EditProfile}
          />
          <PrivateRoute path="/posts/:postId" exact component={ViewPost} />
          <PrivateRoute
            path="/posts/edit/:postId"
            exact
            component={UpdatePost}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(MainRouter);
