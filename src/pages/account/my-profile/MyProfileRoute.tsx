import { Affix, Col, Menu, Row } from "antd";
import React from "react";
import { Route, HashRouter as Router, Switch, Link } from "react-router-dom";
import Builder from "./pages/BuilderRoute";
import PersonalInfo from "./pages/PersonalInfo";
import WorkProfile from "./pages/WorkProfile";

interface MyProfileRouteProps {}

interface MyProfileRouteState {}

class MyProfileRoute extends React.Component<MyProfileRouteProps, MyProfileRouteState> {
    render() {
        return (
            <>
                <Row className="profile-page" gutter={[20, 20]}>
                    <Col span={8}>
                        <Affix offsetTop={80}>
                            <Menu defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} mode="inline" theme="light" inlineCollapsed={false} className="floating-menu">
                                <Menu.Item key="personal">
                                    <Link to="/account/my-profile">Personal</Link>
                                </Menu.Item>
                                <Menu.SubMenu
                                    key="sub1"
                                    title="Work Profile"
                                    onTitleClick={() => {
                                        window.location.hash = "#/account/my-profile/work";
                                    }}
                                >
                                    <Menu.Item
                                        key="biografi"
                                        onClick={() => {
                                            window.location.hash = "#/account/my-profile/work?section=biografi";
                                        }}
                                    >
                                        Biografi
                                    </Menu.Item>
                                    <Menu.Item
                                        key="appreciation"
                                        onClick={() => {
                                            window.location.hash = "#/account/my-profile/work?section=appreciation";
                                        }}
                                    >
                                        Appreciation
                                    </Menu.Item>
                                    <Menu.Item
                                        key="experience"
                                        onClick={() => {
                                            window.location.hash = "#/account/my-profile/work?section=experience";
                                        }}
                                    >
                                        Experience
                                    </Menu.Item>
                                    <Menu.Item
                                        key="education"
                                        onClick={() => {
                                            window.location.hash = "#/account/my-profile/work?section=education";
                                        }}
                                    >
                                        Education
                                    </Menu.Item>
                                    <Menu.Item
                                        key="skill"
                                        onClick={() => {
                                            window.location.hash = "#/account/my-profile/work?section=skill";
                                        }}
                                    >
                                        Skills
                                    </Menu.Item>
                                    <Menu.Item
                                        key="organization"
                                        onClick={() => {
                                            window.location.hash = "#/account/my-profile/work?section=organization";
                                        }}
                                    >
                                        Organization
                                    </Menu.Item>
                                </Menu.SubMenu>
                                <Menu.Item key="3">
                                    <Link to="/account/my-profile/builder">Resume Builder</Link>
                                </Menu.Item>
                            </Menu>
                        </Affix>
                    </Col>
                    <Col span={16}>
                        <Router>
                            <Switch>
                                <Switch>
                                    <Route exact path="/account/my-profile" component={PersonalInfo} />
                                    <Route exact path="/account/my-profile/work" component={WorkProfile} />
                                    <Route path="/account/my-profile/builder" component={Builder} />
                                </Switch>
                            </Switch>
                        </Router>
                    </Col>
                </Row>
            </>
        );
    }
}

export default MyProfileRoute;
