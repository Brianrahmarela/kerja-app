import { Component } from "react";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import Connection from "./connection/Connection";
import Feed from "./feed/Feed";
import MenuHeader from "./MenuHeader";
import MyProfile from "./profile/Profile";
import Work from "./work/Work";

interface IProps {}
interface IState {}
class AccountRoute extends Component<IProps, IState> {
  componentDidMount() {
    window.document.title = "Job | KerjaApp";
  }
  render() {
    return (
      <div className="container">
        <MenuHeader />
        <Router>
          <Switch>
            <Route exact path="/profile/work/:userHashId" component={Work} />
            <Route
              exact
              path="/profile/connection/:userHashId"
              component={Connection}
            />
            <Route exact path="/profile/feed/:userHashId" component={Feed} />
            <Route exact path="/profile/:userHashId" component={MyProfile} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default AccountRoute;
