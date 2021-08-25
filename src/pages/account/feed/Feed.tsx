import {
  faBookmark,
  faCaretDown,
  faComments,
  faEllipsisV,
  faForward,
  faImage,
  faMapMarkerAlt,
  faPaperPlane,
  faReplyAll,
  faShare,
  faSmile,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Button,
  Card,
  Col,
  Comment,
  Divider,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

export interface FeedProps {}

export interface FeedState {}

class Feed extends React.Component<FeedProps, FeedState> {
  render() {
    return (
      <div className="profile-feed">
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
                <Typography.Title level={4} className="blue-primary">
                  20 Posts
                </Typography.Title>
              </div>
              <Divider style={{ marginTop: 7 }} />
              <div>
                <Space align="baseline">
                  <Typography.Text>
                    <FontAwesomeIcon icon={faThumbsUp} /> 350
                  </Typography.Text>
                  <Typography.Text>
                    <FontAwesomeIcon icon={faComments} /> 350
                  </Typography.Text>
                  <Typography.Text>
                    <FontAwesomeIcon icon={faShare} /> 350
                  </Typography.Text>
                </Space>
              </div>
            </Card>
          </Col>
          <Col span={17}>
            <Card
              className="feed-card"
              style={{ width: "100%", marginTop: 15 }}
            >
              {/* header posting  */}
              <Row justify="space-between" style={{ marginBottom: 10 }}>
                <Col span={20}>
                  <Row>
                    <Col flex="55px">
                      <Avatar size={45} shape="circle" />
                    </Col>
                    <Col flex="auto">
                      <Link
                        to={"/profile/ "}
                        style={{ color: "rgba(0, 0, 0, 0.85)" }}
                      >
                        <span style={{ display: "block", fontWeight: 500 }}>
                          asdf asdf
                        </span>
                      </Link>
                      <sub
                        style={{
                          fontSize: 10,
                          position: "relative",
                          bottom: 4,
                        }}
                      >
                        {moment().format("DD MMMM YYYY HH:mm")}
                      </sub>
                    </Col>
                  </Row>
                </Col>
                <Col span={4} style={{ textAlign: "right" }}>
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item key="set-post:1" onClick={() => {}}>
                          Edit
                        </Menu.Item>
                        <Menu.Item
                          key="set-post:2"
                          onClick={() => {
                            Modal.confirm({
                              title: "Confirmation",
                              content: "Are your sure to delete this post?",
                              onOk: () => {},
                            });
                          }}
                        >
                          Delete
                        </Menu.Item>
                      </Menu>
                    }
                  >
                    <FontAwesomeIcon icon={faEllipsisV} color="grey" />
                  </Dropdown>
                </Col>
              </Row>
              {/*e: header posting  */}

              {/* the posting  */}
              <Typography.Paragraph style={{ margin: "0 0 20px" }}>
                lipsum
              </Typography.Paragraph>
              {/* e: the posting  */}

              {/* likes button  */}
              <Row justify="space-between">
                <Col span={12}>
                  <Space>
                    <Typography.Text>0 Comments</Typography.Text>
                    <Button
                      type="link"
                      icon={
                        <FontAwesomeIcon
                          icon={faThumbsUp}
                          style={{ marginRight: 5 }}
                        />
                      }
                    >
                      4
                    </Button>
                    <Avatar.Group size="small">
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
                      <Tooltip title="Ant User" placement="top">
                        <Avatar style={{ backgroundColor: "#87d068" }} />
                      </Tooltip>
                      <Avatar style={{ backgroundColor: "#1890ff" }} />
                    </Avatar.Group>
                  </Space>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <Space align="end">
                    <Button
                      type="link"
                      icon={
                        <FontAwesomeIcon
                          icon={faShare}
                          style={{ marginRight: 5 }}
                        />
                      }
                    >
                      Share
                    </Button>
                    <Button
                      type="link"
                      icon={
                        <FontAwesomeIcon
                          icon={faBookmark}
                          style={{ marginRight: 5 }}
                        />
                      }
                    >
                      Archive
                    </Button>
                    <Button
                      type="link"
                      icon={
                        <FontAwesomeIcon
                          icon={faPaperPlane}
                          style={{ marginRight: 5 }}
                        />
                      }
                    >
                      Send
                    </Button>
                  </Space>
                </Col>
              </Row>
              {/* e: likes button  */}
              <Divider style={{ margin: "7px 0" }} />
              <Comment
                key={2}
                style={{ padding: 0 }}
                actions={[
                  <Button
                    type="link"
                    icon={
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        style={{ marginRight: 5 }}
                      />
                    }
                  >
                    Suka
                  </Button>,
                  <Button
                    type="link"
                    icon={
                      <FontAwesomeIcon
                        icon={faReplyAll}
                        style={{ marginRight: 5 }}
                      />
                    }
                  >
                    Balas
                  </Button>,
                ]}
                author={
                  <Space align="baseline">
                    <Link
                      to={"/profile/"}
                      style={{ color: "rgba(0, 0, 0, 0.85)" }}
                    >
                      <strong>asdfasdf asdfasdf</strong>
                    </Link>
                    <strong>.</strong>
                    <span>{moment().fromNow()}</span>
                  </Space>
                }
                avatar={<Avatar />}
                content={<p>asdf</p>}
              ></Comment>
              <Divider style={{ margin: "7px 0 24px" }} />
              <Form.Item style={{ marginBottom: 15 }}>
                <Input
                  onChange={(e: any) => {
                    this.setState({
                      comment: e.target.value,
                    });
                  }}
                  suffix={
                    <Space>
                      <FontAwesomeIcon
                        icon={faSmile}
                        style={{ color: "grey" }}
                      />
                      <FontAwesomeIcon
                        icon={faImage}
                        style={{ color: "grey" }}
                      />
                    </Space>
                  }
                  style={{ borderRadius: 20 }}
                  size="large"
                  placeholder="Write comment..."
                />
              </Form.Item>
            </Card>
            <div
              style={{ width: "100%", textAlign: "center", paddingTop: "20px" }}
            >
              Lainnya <FontAwesomeIcon icon={faCaretDown} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Feed;
