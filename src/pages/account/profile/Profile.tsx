import {
  faEdit,
  faMapMarked,
  faMapMarkerAlt,
  faPencilAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Menu, Row, Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import ProfileForm from "./ProfileForm";

export interface ProfileProps {}

export interface ProfileState {}

class Profile extends React.Component<ProfileProps, ProfileState> {
  state = { ready: false };
  render() {
    return (
      <div className="profile-page">
        <Row gutter={15}>
          <Col span={7}>
            <Card style={{ textAlign: "center", marginTop: 15 }}>
              <div>
                <Avatar size={80} />
              </div>
              <div>
                <Typography.Title level={3}>Sheila Larasati</Typography.Title>
              </div>
              <div>
                <Typography.Text>Fashion Designer di Shqueen</Typography.Text>
              </div>
              <div>
                <Typography.Text>
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> Jakarta, Indonesia
                </Typography.Text>
              </div>
            </Card>
          </Col>
          <Col span={17}>
            <Card style={{ textAlign: "center", marginTop: 15 }}>
              <ProfileForm />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Profile;
