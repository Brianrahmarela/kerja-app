import { Component } from "react";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import MenuHeader from "./MenuHeader";
import MyNetwork from "./my-network/MyNetwork";
import MyPost from "./my-post/MyPost";
import MyProfileRoute from "./my-profile/MyProfileRoute";
import MyResume from "./my-resume/MyResume";

interface IProps {}
interface IState {}
class AccountRoute extends Component<IProps, IState> {
    componentDidMount() {
        window.document.title = "Job | KerjaApp";
    }
    render() {
        return (
            <div className="container profile-page">
                <MenuHeader />
                <Router>
                    <Switch>
                        <Switch>
                            <Route exact path="/account" component={MyPost} />
                            <Route path="/account/my-profile" component={MyProfileRoute} />
                            <Route path="/account/my-network" component={MyNetwork} />
                            <Route path="/account/my-resume" component={MyResume} />
                        </Switch>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default AccountRoute;
