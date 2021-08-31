import { faBookmark, faCartPlus, faRocket, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Input, Progress, Rate, Row, Select, Space, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
const { Slide } = require("react-slideshow-image");
export interface LearningProps {}

export interface LearningState {}

class Learning extends React.Component<LearningProps, LearningState> {
    render() {
        return (
            <div className="learning-page">
                <Row justify="center" align="bottom" className="bg-cover">
                    <Col className="header-form" span={24}>
                        <div>
                            <Typography.Title>Upgrade Skill-mu Sekarang!</Typography.Title>
                            <Space>
                                <Select placeholder="Pilih kelas">
                                    <Select.Option value="demo">Demo</Select.Option>
                                </Select>
                                <Input style={{ width: 350 }}></Input>
                                <Button type="primary">Cari</Button>
                            </Space>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Typography.Title level={3}>popular</Typography.Title>
                    </Col>
                    <Col span={24}>
                        <Slide slidesToShow={4}>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((value: any) => (
                                <div style={{ padding: 5 }}>
                                    <Card style={{ width: "100%", padding: 0 }} bodyStyle={{ padding: 0 }}>
                                        <Row>
                                            <Col span={24}>
                                                <img src="https://images7.alphacoders.com/411/thumb-1920-411820.jpg" alt="" style={{ width: "100%" }} />
                                            </Col>
                                        </Row>
                                        <Row justify="space-between" align="top" style={{ padding: 20 }}>
                                            <Col span={20}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, se</Col>
                                            <Col span={4} style={{ textAlign: "right" }}>
                                                <FontAwesomeIcon icon={faRocket} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={24} style={{ paddingLeft: 20 }}>
                                                <Typography.Text style={{ fontSize: 10 }}>4.5</Typography.Text> <Rate allowHalf defaultValue={2.5} style={{ fontSize: 12 }} />{" "}
                                                <Typography.Text style={{ fontSize: 10 }}>(242)</Typography.Text>
                                            </Col>
                                        </Row>
                                        <Row justify="space-between" align="bottom" style={{ padding: 20 }}>
                                            <Col span={10} className="blue-primary">
                                                Rp. 237.999
                                            </Col>
                                            <Col span={14} style={{ textAlign: "right" }}>
                                                <Space>
                                                    <Link to="">
                                                        <FontAwesomeIcon icon={faBookmark} className="blue-primary" />
                                                    </Link>
                                                    <Link to="">
                                                        <FontAwesomeIcon icon={faShare} className="blue-primary" />
                                                    </Link>
                                                    <Link to="">
                                                        <FontAwesomeIcon icon={faCartPlus} className="blue-primary" />
                                                    </Link>
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Card>
                                </div>
                            ))}
                        </Slide>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Typography.Title level={3}>Kelas saya</Typography.Title>
                    </Col>
                    <Col span={24}>
                        <Slide slidesToShow={4}>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((value: any) => (
                                <div style={{ padding: 5 }}>
                                    <Card style={{ width: "100%", padding: 0 }} bodyStyle={{ padding: 0 }}>
                                        <Row>
                                            <Col span={24}>
                                                <img src="https://images7.alphacoders.com/411/thumb-1920-411820.jpg" alt="" style={{ width: "100%" }} />
                                            </Col>
                                        </Row>
                                        <Row justify="space-between" align="top" style={{ padding: 20 }}>
                                            <Col span={20}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, se</Col>
                                            <Col span={4} style={{ textAlign: "right" }}>
                                                <FontAwesomeIcon icon={faRocket} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={24} style={{ paddingLeft: 20 }}>
                                                <Typography.Text style={{ fontSize: 10 }}>Bernard Simbolon</Typography.Text> | <Typography.Text style={{ fontSize: 10 }}>4.5</Typography.Text>{" "}
                                                <Rate allowHalf defaultValue={2.5} style={{ fontSize: 12 }} /> <Typography.Text style={{ fontSize: 10 }}>(242)</Typography.Text>
                                            </Col>
                                        </Row>
                                        <Row justify="space-between" align="bottom" style={{ padding: 20 }}>
                                            <Col span={24} className="blue-primary">
                                                <Progress size="small" percent={30} />
                                            </Col>
                                            <Col span={24} style={{ paddingTop: 20 }}>
                                                <Button type="primary">Lanjutkan Kelas</Button>
                                            </Col>
                                        </Row>
                                    </Card>
                                </div>
                            ))}
                        </Slide>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Learning;
