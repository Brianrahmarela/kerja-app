import { faArrowLeft, faBookmark, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb, Card, Checkbox, Col, List, Row, Space, Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import { Link } from "react-router-dom";

export interface MyJobApplicationProps {}

export interface MyJobApplicationState {}

class MyJobApplication extends React.Component<MyJobApplicationProps, MyJobApplicationState> {
    componentDidMount() {
        window.document.title = "My Job Application | KerjaApp";
    }
    render() {
        return (
            <div className="my-job-application-page">
                <Row>
                    <Col>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/">
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/">Lowongan Pekerjaan</Link>
                            </Breadcrumb.Item>

                            <Breadcrumb.Item>My Jobs</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row style={{ marginTop: 15 }}>
                    <Col span={24}>
                        <div style={{ textAlign: "right" }}>
                            <Checkbox>Select All</Checkbox>
                        </div>
                        <List
                            dataSource={[
                                "Racing car sprays burning fuel into crowd.",
                                "Japanese princess to wed commoner.",
                                "Australian walks 100km after outback crash.",
                                "Man charged over missing wedding girl.",
                                "Los Angeles battles huge wildfires.",
                            ]}
                            split={false}
                            bordered={false}
                            renderItem={(item) => (
                                <List.Item style={{ width: "100%" }}>
                                    <Row style={{ width: "100%" }} align="middle">
                                        <Col flex="50px">
                                            <Checkbox />
                                        </Col>
                                        <Col flex="auto">
                                            <Card>
                                                <Row justify="space-around">
                                                    <Col span={18}>
                                                        <div>
                                                            <Typography.Text>Fashion Designer</Typography.Text>
                                                        </div>
                                                        <div>
                                                            <Typography.Text>Lorem Boutique</Typography.Text>
                                                        </div>
                                                        <div>
                                                            <Typography.Text>Jl. Tebet Raya No.38, Jakarta Selatan, DKI Jakarta</Typography.Text>
                                                        </div>
                                                        <div>
                                                            <Typography.Text>Status Pekerjaan : Penuh waktu / Kontrak</Typography.Text>
                                                        </div>
                                                        <div>
                                                            <Typography.Text>Gaji : Rp 3.000.000 - Rp 5.000.000</Typography.Text>
                                                        </div>
                                                    </Col>
                                                    <Col span={6} style={{ textAlign: "right" }}>
                                                        <Avatar size={65} />
                                                    </Col>
                                                </Row>
                                                <div style={{ textAlign: "right" }}>
                                                    <Space>
                                                        <Typography.Text>Diposting 2 jam yang lalu</Typography.Text>
                                                        <span>|</span>
                                                        <div>
                                                            <FontAwesomeIcon icon={faBookmark} style={{ marginRight: 10 }} />
                                                            Arsip
                                                        </div>
                                                        <span>|</span>
                                                        <div>
                                                            <FontAwesomeIcon icon={faShare} style={{ marginRight: 10 }} />
                                                            Bagikan
                                                        </div>
                                                    </Space>
                                                </div>
                                            </Card>
                                        </Col>
                                    </Row>
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default MyJobApplication;
