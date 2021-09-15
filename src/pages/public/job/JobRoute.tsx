import React from "react";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import JobDetail from "./job-detail/JobDetail";
import Job from "./job/Job";

export interface JobRouteProps {}

export interface JobRouteState {}

class JobRoute extends React.Component<JobRouteProps, JobRouteState> {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/public/job-search" component={Job} />
                    <Route exact path="/public/job-detail/:slug" component={JobDetail} />
                </Switch>
            </Router>
        );
    }
}

export default JobRoute;
