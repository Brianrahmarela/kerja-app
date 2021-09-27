import { faCommentDots, faMapMarkerAlt, faSearch, faUnlock, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Card, Col, Input, List, Row, Space, Tabs, Typography } from "antd";
import React from "react";

interface MyNetworkProps {}

interface MyNetworkState {}

class MyNetwork extends React.Component<MyNetworkProps, MyNetworkState> {
    render() {
        return (
            <>
                <Row className="my-network-page">
                    <Col span={24}>
                        <Tabs defaultActiveKey="1" centered>
                            <Tabs.TabPane tab="My Network" key="1">
                                <div className="category-network">
                                    <Space>
                                        <Button type="default">All Network</Button>
                                        <Button type="default">Birthdays</Button>
                                        <Button type="default">Work</Button>
                                        <Button type="default">Highschool</Button>
                                        <Button type="default">Current City</Button>
                                        <Button type="default">Hometown</Button>
                                        <Button type="default">Following</Button>
                                    </Space>
                                </div>
                                <Card style={{ marginTop: 20 }}>
                                    <Row>
                                        <Col span={24} style={{ textAlign: "right" }}>
                                            <Space>
                                                <Input suffix={<FontAwesomeIcon icon={faSearch} />}></Input>
                                                <Button type="primary">Cari</Button>
                                            </Space>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <List
                                                style={{ marginTop: 20 }}
                                                bordered={false}
                                                dataSource={[
                                                    "Racing car sprays burning fuel into crowd.",
                                                    "Japanese princess to wed commoner.",
                                                    "Australian walks 100km after outback crash.",
                                                    "Man charged over missing wedding girl.",
                                                    "Los Angeles battles huge wildfires.",
                                                ]}
                                                renderItem={(item: any, i: number) => (
                                                    <List.Item
                                                        key={i}
                                                        style={{ width: "100%" }}
                                                        actions={[
                                                            <Button type="primary" icon={<FontAwesomeIcon icon={faUnlock} style={{ marginRight: 5 }} />}>
                                                                Accept
                                                            </Button>,
                                                            <Button type="primary" icon={<FontAwesomeIcon icon={faCommentDots} style={{ marginRight: 5 }} />}>
                                                                Message
                                                            </Button>,
                                                        ]}
                                                    >
                                                        <Col xs={24} sm={6} md={5} lg={4} style={{ textAlign: "center", padding: 10 }}>
                                                            <Avatar
                                                                size={100}
                                                                src="http://localhost:7777/api/thrm-media/v1/file?forceImage=true&source-id=karirapp-bg-profile&id=rOBDR3xXzjv2jObwjqJgvL2o4b0YVa"
                                                            ></Avatar>
                                                        </Col>
                                                        <Col flex="auto">
                                                            <Typography.Title level={5}>Loreano Donald</Typography.Title>
                                                            <Space>
                                                                <Typography.Text className="job">Fashion Stylst di Shqueen</Typography.Text>
                                                                <span className="space">|</span>
                                                                <Typography.Text>
                                                                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: 5 }} />
                                                                    Fashion Stylst di Shqueen
                                                                </Typography.Text>
                                                            </Space>
                                                            <div style={{ marginBottom: 15 }}>
                                                                <Typography.Text className="grey-primary" style={{ fontSize: 12 }}>
                                                                    <FontAwesomeIcon icon={faUsers} style={{ marginRight: 5 }} />
                                                                    Diikuti oleh Deviana Anggun, Saga Human, Fira Saraswati, Kila Huiganies, Harold Lectar, and 40 other
                                                                </Typography.Text>
                                                            </div>
                                                        </Col>
                                                    </List.Item>
                                                )}
                                            />
                                        </Col>
                                    </Row>
                                </Card>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Network Request" key="2">
                                <Space>
                                    <Button type="default">All Network</Button>
                                    <Button type="default">Birthdays</Button>
                                    <Button type="default">Work</Button>
                                    <Button type="default">Highschool</Button>
                                    <Button type="default">Current City</Button>
                                    <Button type="default">Hometown</Button>
                                    <Button type="default">Following</Button>
                                </Space>
                            </Tabs.TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </>
        );
    }
}

export default MyNetwork;
