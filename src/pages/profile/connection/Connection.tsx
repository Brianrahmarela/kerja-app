import {
  faCaretDown,
  faComment,
  faFilter,
  faMapMarkerAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  List,
  Menu,
  Row,
  Space,
  Typography,
} from "antd";
import React from "react";
import { Link } from "react-router-dom";

export interface ConnectionProps {}

export interface ConnectionState {}

class Connection extends React.Component<ConnectionProps, ConnectionState> {
  render() {
    return (
      <div className="profile-connection">
        <Row>
          <Col span={24}>
            <Card style={{ marginTop: 15 }}>
              {/* header posting  */}
              <Row justify="space-between" style={{ marginBottom: 10 }}>
                <Col span={20}>
                  <Typography.Title level={4}>My Network</Typography.Title>
                </Col>
                <Col span={4} style={{ textAlign: "right" }}>
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item key="set-post:1" onClick={() => {}}>
                          Edit
                        </Menu.Item>
                        <Menu.Item key="set-post:2" onClick={() => {}}>
                          Delete
                        </Menu.Item>
                      </Menu>
                    }
                  >
                    <Button>
                      <FontAwesomeIcon
                        icon={faFilter}
                        color="grey"
                        style={{ marginRight: 5 }}
                      />{" "}
                      Filter
                    </Button>
                  </Dropdown>
                </Col>
              </Row>
              {/*e: header posting  */}
              <List
                footer={
                  <div style={{ width: "100%", textAlign: "center" }}>
                    <Link to="">
                      Lainnya <FontAwesomeIcon icon={faCaretDown} />
                    </Link>
                  </div>
                }
                size="small"
                split={false}
                dataSource={[
                  "Racing car sprays burning fuel into crowd.",
                  "Japanese princess to wed commoner.",
                  "Australian walks 100km after outback crash.",
                  "Man charged over missing wedding girl.",
                  "Los Angeles battles huge wildfires.",
                ]}
                renderItem={(item: any) => (
                  <List.Item
                    style={{ alignItems: "flex-start" }}
                    extra={
                      <Space>
                        <Button
                          icon={
                            <FontAwesomeIcon
                              icon={faUsers}
                              style={{ marginRight: 5 }}
                            />
                          }
                        >
                          Unfollow
                        </Button>
                        <Button
                          icon={
                            <FontAwesomeIcon
                              icon={faComment}
                              style={{ marginRight: 5 }}
                            />
                          }
                        >
                          Message
                        </Button>
                      </Space>
                    }
                  >
                    <Row style={{ width: "100%" }}>
                      <Col span={3}>
                        <Avatar size={64} src={item.avatar} />
                      </Col>
                      <Col span={21}>
                        <Typography.Title level={4}>Leo nardo</Typography.Title>
                        <div>
                          <Typography.Text>
                            Fashion Stylst di Shqueen
                          </Typography.Text>{" "}
                          |{" "}
                          <FontAwesomeIcon
                            icon={faMapMarkerAlt}
                            style={{ marginRight: 5 }}
                          />
                          <Typography.Text>Jakarta, Indonesia</Typography.Text>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            icon={faUsers}
                            className="grey-primary"
                            style={{ marginRight: 5 }}
                          />
                          <span
                            className="grey-primary"
                            style={{ fontSize: 12 }}
                          >
                            asdflkj
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Connection;
