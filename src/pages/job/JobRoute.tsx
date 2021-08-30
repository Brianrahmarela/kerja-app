import React from "react";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import Job from "./Job";

export interface JobRouteProps {}

export interface JobRouteState {}

class JobRoute extends React.Component<JobRouteProps, JobRouteState> {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/job" component={Job} />
                </Switch>
            </Router>
        );
    }
}

export default JobRoute;
