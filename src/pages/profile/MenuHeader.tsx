import { faMapMarkerAlt, faPencilAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Col, Menu, Row, Typography } from "antd";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { encodeHashUserId } from "../../config/Util";

export interface MenuHeaderProps {
    currentUser?: any;
}

export interface MenuHeaderState {}

class MenuHeader extends React.Component<MenuHeaderProps, MenuHeaderState> {
    render() {
        return (
            <div className="profile-header">
                <Row className="bg-cover">
                    <Col span={6}>
                        <div className="avatar-wrapper">
                            <div className="avatar-border">
                                <Avatar size={140} />
                            </div>
                        </div>
                    </Col>
                    <Col span={10}>
                        <div className="name-wrapper">
                            <div style={{ position: "absolute", bottom: 15 }}>
                                <Typography.Title level={2} style={{ color: "white" }}>
                                    Shila on 7
                                </Typography.Title>
                                <Typography.Text style={{ color: "white" }}>fashin designer</Typography.Text>
                                <span style={{ color: "white" }}>join on 21 2020</span>
                            </div>
                        </div>
                    </Col>
                    <Col span={8} style={{ position: "relative" }}>
                        <Button type="link" style={{ position: "absolute", bottom: 15, right: 15 }}>
                            <FontAwesomeIcon icon={faPencilAlt} style={{ color: "white" }} />
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col offset={5} span={8} className="underline">
                        <Menu mode="horizontal">
                            <Menu.Item key="location" icon={<FontAwesomeIcon icon={faMapMarkerAlt} />}>
                                Jakarta Indonesia
                            </Menu.Item>
                            <Menu.Item key="follower" icon={<FontAwesomeIcon icon={faUsers} />}>
                                90 networks
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={11} className="underline">
                        <div
                            style={{
                                width: "100%",
                            }}
                        >
                            <div style={{ marginLeft: "auto" }}>
                                <Menu mode="horizontal" style={{ justifyContent: "flex-end" }}>
                                    <Menu.Item key="location">
                                        <Link to={"/profile/feed/" + encodeHashUserId(this.props.currentUser.id)}>Post</Link>
                                    </Menu.Item>
                                    <Menu.Item key="profile">
                                        <Link to={"/profile/work/" + encodeHashUserId(this.props.currentUser.id)}>My Work</Link>
                                    </Menu.Item>
                                    <Menu.Item key="network">
                                        <Link to={"/profile/connection/" + encodeHashUserId(this.props.currentUser.id)}>My Network</Link>
                                    </Menu.Item>
                                    <Menu.Item key="me">
                                        <Link to={"/profile/" + encodeHashUserId(this.props.currentUser.id)}>About Me</Link>
                                    </Menu.Item>
                                </Menu>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    currentUser: state.account.currentUser,
});

const mapDispatchToProps = (dispatch: any) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(MenuHeader);
