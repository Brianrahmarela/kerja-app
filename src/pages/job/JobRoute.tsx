import React from "react";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import JobDetail from "./job-detail/JobDetail";
import JobForm from "./job-form/JobForm";
import Job from "./job/Job";
import MyJobApplication from "./my-job-application/MyJobApplication";

import MyJobsApplied from "./my-jobs/MyJobsApplied";
import JobAlertSettings from "./my-jobs/my-jobs-component/JobAlertSettings";
import AppliedJobDetail from "./applied-job-detail/AppliedJobDetail";

export interface JobRouteProps { }

export interface JobRouteState { }

class JobRoute extends React.Component<JobRouteProps, JobRouteState> {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/job" component={Job} />
                    <Route exact path="/job/job-detail/:jobid" component={JobDetail} />
                    <Route exact path="/job/apply/:jobid" component={JobForm} />
                    <Route exact path="/job/my-job-application" component={MyJobApplication} />

                    <Route exact path="/job/my-jobs-applied" component={MyJobsApplied} />
                    <Route exact path="/job/my-jobs-applied/job-alert-settings" component={JobAlertSettings} />
                    <Route exact path="/job/my-jobs-applied/job-detail/:jobid" component={AppliedJobDetail} />
                </Switch>
            </Router>
        );
    }
}

export default JobRoute;
