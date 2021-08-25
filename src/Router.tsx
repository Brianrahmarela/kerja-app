import React from "react";
import "./App.less";
import { Route, HashRouter, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { AppConfig } from "./config/Config";
import { io } from "socket.io-client";
import LandingPage from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import Registration from "./pages/register/Registration";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import ResetPassword from "./pages/reset-password/ResetPassword";
import Logout from "./pages/logout/Logout";
import LayoutApp from "./common/LayoutApp";
import Home from "./pages/home/Home";
import AccountRoute from "./pages/account/AccountRoute";

const Page404 = React.lazy(() => import("./pages/errors/Page404"));
interface IProps {
  history?: any;
  token?: string;
}
interface IState {
  socket: any;
  token: any;
}

class Router extends React.Component<IProps, IState> {
  state = {
    socket: null as any,
    token: "",
  };

  componentWillMount() {
    this.setState(
      {
        token: this.props.token,
      },
      () => {
        this.preparingData();
      }
    );
  }

  preparingData() {
    //  if token exist initial socket
    if (this.props.token && this.state.socket === null) {
      const socketio = io(AppConfig.baseUrlWs, {
        path: "/ws/notification",
        query: {
          token: this.state.token,
        },
      });
      this.setState(
        {
          socket: socketio,
        },
        () => {
          socketio.on("chat message", function (msg: any) {
            console.log(msg);
          });
          socketio.on("board-notif", (e: any) => {
            console.log(e);
          });
        }
      );
    }
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Registration} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route
            exact
            path="/reset-password/:resetKey"
            component={ResetPassword}
          />
          <Route exact path="/logout" component={Logout} />
          <LayoutApp path="/home" component={Home} />
          <LayoutApp path="/profile" component={AccountRoute} />

          {/* <Route exact path="/registration" component={Registration} />
          <LayoutApp path="/home" component={Home} />
          <LayoutApp path="/profile/:slug" component={Profile} />
          <LayoutApp path="/account" component={Account} />
          <LayoutApp path="/connection" component={ConnectionRoute} />
          <LayoutApp path="/job" component={Job} />
          <LayoutApp path="/event" component={Event} />
          <LayoutApp path="/media" component={Media} />
          <LayoutApp path="/notification" component={Notification} />
          <LayoutApp path="/post/:postId" component={SinglePost} />
          <Route
            exact
            path="/activation/:activationKey"
            component={Activation}
          /> */}
          {/* <Route exact path="/forgot-password" component={ForgotPassword} /> */}
          {/* <Route exact path="/forgot-password" component={ForgotPassword} />
                  <Route exact path="/reset-password/:resetcode" component={ResetPassword} />
                  <Route exact path="/form/:formCode" component={FormAttemp} />
                <PrivateRoute path="/app" component={Dashboard} /> */}
          <Route component={Page404} />
        </Switch>
      </HashRouter>
    );
  }
}

const mapStateToProps = (state: any) => ({
  token: state.account.token,
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Router));
