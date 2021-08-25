import {
  faCaretDown,
  faComment,
  faMapMarkerAlt,
  faPencilAlt,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Button,
  Card,
  Carousel,
  Col,
  List,
  Row,
  Space,
  Tag,
  Timeline,
  Typography,
} from "antd";
import React from "react";
import { Link } from "react-router-dom";

export interface WorkProps {}

export interface WorkState {}

class Work extends React.Component<WorkProps, WorkState> {
  render() {
    return (
      <div className="profile-work">
        <Row gutter={[15, 15]}>
          <Col span={24}>
            <Card>
              {/* header posting  */}
              <Row justify="space-between" style={{ marginBottom: 10 }}>
                <Col span={20}>
                  <Typography.Title level={4}>About Me</Typography.Title>
                </Col>
                <Col span={4} style={{ textAlign: "right" }}>
                  <FontAwesomeIcon icon={faPencilAlt} color="grey" />
                </Col>
              </Row>
              {/*e: header posting  */}
              <Row>
                <Col span={24}>
                  <Typography.Paragraph>
                    Helloo, im talented on … lorem ipsum dolor sit amet,
                    consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam
                    voluptua. At vero eos et accusam et justo duo dolores et ea
                    rebum. Stet clita kasd gubergren, no sea takimata sanctus
                    est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                  </Typography.Paragraph>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={24}>
            <Card>
              {/* header posting  */}
              <Row justify="space-between" style={{ marginBottom: 10 }}>
                <Col span={20}>
                  <Typography.Title level={4}>6 Appreciation</Typography.Title>
                </Col>
                <Col span={4} style={{ textAlign: "right" }}>
                  <FontAwesomeIcon icon={faPencilAlt} color="grey" />
                </Col>
              </Row>
              {/*e: header posting  */}
              <Row>
                <Col span={24}>
                  <Carousel afterChange={() => {}}>
                    <div>
                      <h3
                        style={{
                          height: "160px",
                          color: "#fff",
                          lineHeight: "160px",
                          textAlign: "center",
                          background: "#364d79",
                        }}
                      >
                        1
                      </h3>
                    </div>
                    <div>
                      <h3
                        style={{
                          height: "160px",
                          color: "#fff",
                          lineHeight: "160px",
                          textAlign: "center",
                          background: "#364d79",
                        }}
                      >
                        2
                      </h3>
                    </div>
                    <div>
                      <h3
                        style={{
                          height: "160px",
                          color: "#fff",
                          lineHeight: "160px",
                          textAlign: "center",
                          background: "#364d79",
                        }}
                      >
                        3
                      </h3>
                    </div>
                    <div>
                      <h3
                        style={{
                          height: "160px",
                          color: "#fff",
                          lineHeight: "160px",
                          textAlign: "center",
                          background: "#364d79",
                        }}
                      >
                        4
                      </h3>
                    </div>
                  </Carousel>
                  <List
                    footer={
                      <div style={{ width: "100%", textAlign: "center" }}>
                        <Link to="">
                          Lainnya <FontAwesomeIcon icon={faCaretDown} />
                        </Link>
                      </div>
                    }
                    split={true}
                    dataSource={[
                      "Racing car sprays burning fuel into crowd.",
                      "Japanese princess to wed commoner.",
                      "Australian walks 100km after outback crash.",
                      "Man charged over missing wedding girl.",
                      "Los Angeles battles huge wildfires.",
                    ]}
                    renderItem={(item: any) => (
                      <List.Item style={{ alignItems: "flex-start" }}>
                        <List.Item.Meta
                          title="1st Place, Ginting & Reksodiputro Annual Essay Competition 2015"
                          description="2015 honor issuerGinting & Reksodiputro in Association with Allen & Overy"
                        />
                      </List.Item>
                    )}
                  ></List>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col span={16}>
            <Card>
              {/* header posting  */}
              <Row justify="space-between" style={{ marginBottom: 10 }}>
                <Col span={20}>
                  <Typography.Title level={4}>Experience</Typography.Title>
                </Col>
                <Col span={4} style={{ textAlign: "right" }}>
                  <FontAwesomeIcon icon={faPencilAlt} color="grey" />
                </Col>
              </Row>
              <Timeline>
                <Timeline.Item>
                  <div>
                    <Typography.Title level={4}>
                      Fashion Designer
                    </Typography.Title>
                  </div>
                  <div>
                    <Typography.Text>Shqueen</Typography.Text> |
                    <Typography.Text>fulltime</Typography.Text> |
                    <Typography.Text>Jan, 2020 - Present</Typography.Text>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      style={{ marginRight: 5 }}
                    />
                    <span>Jakarta Indonesia</span>
                  </div>
                  <div>
                    <ul>
                      <li>
                        Merancang koleksi produk baru dengan hand-sketch dan
                        mempresentasikan mood board
                      </li>
                      <li>
                        Dapat memberikan ide dan mengembangkan produk untuk
                        trend pasar.
                      </li>
                      <li> Memiliki kemampuan untuk perpaduan warna.</li>
                      <li>
                        Memiliki kemampuan tracking dan desain baju memiliki
                        nilai jual.
                      </li>
                      <li>
                        Memiliki kemampuan tracking dan desain baju memiliki
                        nilai jua
                      </li>
                    </ul>
                  </div>
                </Timeline.Item>
                <Timeline.Item>
                  Solve initial network problems 2015-09-01
                </Timeline.Item>
                <Timeline.Item
                  dot={<FontAwesomeIcon icon={faPencilAlt} color="grey" />}
                  color="red"
                >
                  Technical testing 2015-09-01
                </Timeline.Item>
                <Timeline.Item>
                  Network problems being solved 2015-09-01
                </Timeline.Item>
              </Timeline>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Row justify="space-between" style={{ marginBottom: 10 }}>
                <Col span={20}>
                  <Typography.Title level={4}>Education</Typography.Title>
                </Col>
                <Col span={4} style={{ textAlign: "right" }}>
                  <FontAwesomeIcon icon={faPencilAlt} color="grey" />
                </Col>
              </Row>
              <div>
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
                      style={{
                        alignItems: "flex-start",
                        paddingLeft: 0,
                        paddingRight: 0,
                      }}
                    >
                      <Row style={{ width: "100%" }}>
                        <Col span={8}>
                          <Avatar size={64} src={item.avatar} />
                        </Col>
                        <Col span={16}>
                          <Typography.Title level={5}>
                            Leo nardo
                          </Typography.Title>
                          <div>
                            <Typography.Text>
                              Fashion Stylst di Shqueen
                            </Typography.Text>{" "}
                          </div>
                          <div>
                            <span
                              className="grey-primary"
                              style={{ fontSize: 12 }}
                            >
                              2001-2002
                            </span>
                          </div>
                        </Col>
                      </Row>
                    </List.Item>
                  )}
                />
              </div>
            </Card>
          </Col>
          <Col span={24}>
            <Card>
              <Row justify="space-between" style={{ marginBottom: 10 }}>
                <Col span={20}>
                  <Typography.Title level={4}>Skill</Typography.Title>
                </Col>
                <Col span={4} style={{ textAlign: "right" }}>
                  <FontAwesomeIcon icon={faPencilAlt} color="grey" />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Tag color="#f50">#f50</Tag>
                  <Tag color="#2db7f5">#2db7f5</Tag>
                  <Tag color="#87d068">#87d068</Tag>
                  <Tag color="#108ee9">#108ee9</Tag>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Card className="recommendation-widget" bordered={false}>
              <List
                header="Maybe You Know"
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
                renderItem={(item) => (
                  <List.Item style={{ alignItems: "flex-start" }}>
                    <Col flex={"60px"} style={{ paddingLeft: 0 }}>
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
          </Col>
        </Row>
      </div>
    );
  }
}

export default Work;
