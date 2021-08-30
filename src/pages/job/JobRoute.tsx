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
                    <Route exact path="/job" component={Job} />
                    <Route exact path="/job/job-detail" component={JobDetail} />
                </Switch>
            </Router>
        );
    }
}

export default JobRoute;
