import React from "react";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import Learning from "./learning/Learning";

export interface LearningRouteProps {}

export interface LearningRouteState {}

class LearningRoute extends React.Component<LearningRouteProps, LearningRouteState> {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/learning" component={Learning} />
                </Switch>
            </Router>
        );
    }
}

export default LearningRoute;
