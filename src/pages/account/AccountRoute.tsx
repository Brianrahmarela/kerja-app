import { Component } from "react";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import MenuHeader from "./MenuHeader";
import MyEvent from "./my-event/MyEvent";
import JobAppliedDetail from "./my-job-application/JobAppliedDetail";
import MyJobApplication from "./my-job-application/MyJobApplication";
import MyProfile from "./my-profile/MyProfile";
import MyResume from "./my-resume/MyResume";
import MySettingForm from "./my-setting/MySettingForm";

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
                        <Switch>
                            <Route exact path="/account" component={MyProfile} />
                            <Route path="/account/my-resume" component={MyResume} />
                            <Route exact path="/account/settings" component={MySettingForm} />
                            <Route exact path="/account/my-job-application" component={MyJobApplication} />
                            <Route exact path="/account/my-job-application/:id" component={JobAppliedDetail} />
                            <Route exact path="/account/my-event" component={MyEvent} />
                        </Switch>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default AccountRoute;
