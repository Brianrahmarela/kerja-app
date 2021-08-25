import {
  faMapMarkerAlt,
  faPencilAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Col, Menu, Row, Typography } from "antd";
import React from "react";

export interface MenuHeaderProps {}

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
                <Typography.Text style={{ color: "white" }}>
                  fashin designer
                </Typography.Text>
                <span style={{ color: "white" }}>join on 21 2020</span>
              </div>
            </div>
          </Col>
          <Col span={8} style={{ position: "relative" }}>
            <Button
              type="link"
              style={{ position: "absolute", bottom: 15, right: 15 }}
            >
              <FontAwesomeIcon icon={faPencilAlt} style={{ color: "white" }} />
            </Button>
          </Col>
        </Row>
        <Row>
          <Col offset={5} span={8} className="underline">
            <Menu mode="horizontal">
              <Menu.Item
                key="location"
                icon={<FontAwesomeIcon icon={faMapMarkerAlt} />}
              >
                Jakarta Indonesia
              </Menu.Item>
              <Menu.Item
                key="follower"
                icon={<FontAwesomeIcon icon={faUsers} />}
              >
                90 networks
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={11} className="underline">
            <div
              style={{
                width: "100%",
                textAlign: "right",
              }}
            >
              <div style={{ width: 380, marginLeft: "auto" }}>
                <Menu mode="horizontal">
                  <Menu.Item key="location">Post</Menu.Item>
                  <Menu.Item key="profile">My Work</Menu.Item>
                  <Menu.Item key="network">My Network</Menu.Item>
                  <Menu.Item key="me">About Me</Menu.Item>
                </Menu>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MenuHeader;
