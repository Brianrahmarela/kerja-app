import { faCaretDown, faPlus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Affix, Avatar, Button, Card, Col, Divider, List, Row, Space, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Posts from "./posts/Posts";

export interface HomeProps {}

export interface HomeState {}

class Home extends React.Component<HomeProps, HomeState> {
    state = { form: {} };
    render() {
        return (
            <div className="home-page">
                <Row gutter={15}>
                    <Col xs={0} sm={0} md={0} lg={7}>
                        <Typography.Title level={4} className="blue-primary" style={{ marginTop: 12 }}>
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
                                                    <div className="grey-primary" style={{ fontSize: 12 }}>
                                                        CEO Kopi Jawa
                                                    </div>
                                                    <div className="grey-primary" style={{ fontSize: 10 }}>
                                                        73 rb Pengikut
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <Button type="link" style={{ fontSize: 12 }} icon={<FontAwesomeIcon icon={faUserPlus} style={{ marginRight: 5 }} />}>
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
                                                    <div className="grey-primary" style={{ fontSize: 10 }}>
                                                        73 rb Pengikut
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <Button type="link" style={{ fontSize: 12 }} icon={<FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />}>
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
                        <Posts />
                    </Col>
                </Row>
                <Affix offsetBottom={20}>
                    <Button shape="circle" size="large" type="primary" style={{ position: "fixed", bottom: 20, right: 20 }} icon={<FontAwesomeIcon icon={faPlus} />} />
                </Affix>
            </div>
        );
    }
}

export default Home;
