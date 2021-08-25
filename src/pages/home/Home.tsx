import {
  faBookmark,
  faCaretDown,
  faEllipsisV,
  faImage,
  faPaperPlane,
  faPlus,
  faReplyAll,
  faShare,
  faSmile,
  faThumbsUp,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Affix,
  Avatar,
  Button,
  Card,
  Col,
  Comment,
  Divider,
  Dropdown,
  Form,
  Input,
  List,
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

export interface HomeProps {}

export interface HomeState {}

class Home extends React.Component<HomeProps, HomeState> {
  state = { form: {} };
  render() {
    return (
      <div className="home-page">
        <Row gutter={15}>
          <Col xs={0} sm={0} md={0} lg={7}>
            <Typography.Title
              level={4}
              className="blue-primary"
              style={{ marginTop: 12 }}
            >
              Rekomendasi
            </Typography.Title>
            <Divider style={{ marginBottom: 5 }}></Divider>
            <Card className="recommendation-widget" bordered={false}>
              <List
                header="People"
                footer={
                  <>
                    <Link to="">
                      Lainnya <FontAwesomeIcon icon={faCaretDown} />
                    </Link>
                  </>
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
                renderItem={(item) => (
                  <List.Item style={{ alignItems: "flex-start" }}>
                    <Col flex={"40px"} style={{ paddingLeft: 0 }}>
                      <Avatar size={"large"}></Avatar>
                    </Col>
                    <Col flex="auto">
                      <Row justify="space-between" align="top">
                        <Col>
                          <div>Silviana Juli</div>
                          <div
                            className="grey-primary"
                            style={{ fontSize: 12 }}
                          >
                            CEO Kopi Jawa
                          </div>
                          <div
                            className="grey-primary"
                            style={{ fontSize: 10 }}
                          >
                            73 rb Pengikut
                          </div>
                        </Col>
                        <Col>
                          <Button
                            type="link"
                            style={{ fontSize: 12 }}
                            icon={
                              <FontAwesomeIcon
                                icon={faUserPlus}
                                style={{ marginRight: 5 }}
                              />
                            }
                          >
                            Ikuti
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </List.Item>
                )}
              />
            </Card>
            <Card className="community-widget" bordered={false}>
              <List
                header="Komunitas"
                footer={
                  <>
                    <Link to="">
                      Lainnya <FontAwesomeIcon icon={faCaretDown} />
                    </Link>
                  </>
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
                renderItem={(item) => (
                  <List.Item style={{ alignItems: "flex-start" }}>
                    <Col flex={"40px"} style={{ paddingLeft: 0 }}>
                      <Avatar size={"large"}></Avatar>
                    </Col>
                    <Col flex="auto">
                      <Row justify="space-between" align="top">
                        <Col>
                          <div>Silviana Juli</div>
                          <div
                            className="grey-primary"
                            style={{ fontSize: 10 }}
                          >
                            73 rb Pengikut
                          </div>
                        </Col>
                        <Col>
                          <Button
                            type="link"
                            style={{ fontSize: 12 }}
                            icon={
                              <FontAwesomeIcon
                                icon={faPlus}
                                style={{ marginRight: 5 }}
                              />
                            }
                          >
                            Gabung
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={17}>
            <Row>
              <Col span={24}>
                <Space>
                  <Avatar size="large"></Avatar>
                  <Avatar size="large"></Avatar>
                  <Avatar size="large"></Avatar>
                  <Avatar size="large"></Avatar>
                  <Avatar size="large"></Avatar>
                  <Avatar size="large"></Avatar>
                </Space>
              </Col>
            </Row>
            <Divider />
            <Card className="dashbord-card" style={{ width: "100%" }}>
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
          </Col>
        </Row>
        <Affix offsetBottom={20}>
          <Button
            shape="circle"
            size="large"
            type="primary"
            style={{ position: "fixed", bottom: 20, right: 20 }}
            icon={<FontAwesomeIcon icon={faPlus} />}
          />
        </Affix>
      </div>
    );
  }
}

export default Home;
