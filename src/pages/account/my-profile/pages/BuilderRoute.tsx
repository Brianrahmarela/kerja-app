import React from "react";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import Create from "./builder/Create";

interface BuilderRouteProps {}

interface BuilderRouteState {}

class BuilderRoute extends React.Component<BuilderRouteProps, BuilderRouteState> {
    render() {
        return (
            <>
                <Router>
                    <Switch>
                        <Switch>
                            <Route path="/account/my-profile/builder" component={Create} />
                        </Switch>
                    </Switch>
                </Router>
            </>
        );
    }
}

export default BuilderRoute;
