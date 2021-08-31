import { faArrowLeft, faChevronRight, faImages, faMapMarkerAlt, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb, Card, Col, List, Row, Form, Typography, Input, Select, Button, Space, Divider } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import { Link } from "react-router-dom";

export interface JobFormProps {}

export interface JobFormState {}

class JobForm extends React.Component<JobFormProps, JobFormState> {
    componentDidMount() {
        window.document.title = "Apply Job | KerjaApp";
    }
    render() {
        return (
            <div className="page-job-form">
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
                            <Breadcrumb.Item>
                                <Link to="/">Deskripsi Pekerjaan</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Lamar</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row style={{ marginTop: 15 }}>
                    <Col span={24}>
                        <div className="bg-header">
                            <Row align="middle">
                                <Col span={6} style={{ textAlign: "center", paddingTop: 50, paddingBottom: 50 }}>
                                    <Avatar size={90} />
                                </Col>
                                <Col span={18}>
                                    <Typography.Title level={5}>Lorem Boutique</Typography.Title>
                                    <div>
                                        <Typography.Text>Loren ipsum</Typography.Text>
                                    </div>
                                    <Typography.Text>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: 5 }} />
                                        Jakarta, Indonesia
                                    </Typography.Text>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <Row gutter={[20, 20]} style={{ marginTop: 15 }}>
                    <Col span={8}>
                        <Typography.Title level={5}>See more another job by</Typography.Title>
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
                                <List.Item>
                                    <Card style={{ width: "100%", borderRadius: 20 }} bodyStyle={{ borderRadius: 20 }}>
                                        <Row align="middle" gutter={20}>
                                            <Col span={8} style={{ textAlign: "center" }}>
                                                <Avatar size={64} />
                                            </Col>
                                            <Col span={14}>
                                                <Typography.Title level={5}>Lorem Boutique</Typography.Title>
                                                <div>
                                                    <Typography.Text>Loren ipsum</Typography.Text>
                                                </div>
                                                <Typography.Text>
                                                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: 5 }} />
                                                    Jakarta, Indonesia
                                                </Typography.Text>
                                            </Col>
                                            <Col span={2}>
                                                <FontAwesomeIcon icon={faChevronRight} />
                                            </Col>
                                        </Row>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col span={16}>
                        <Card style={{ width: "100%", borderRadius: 20 }} bodyStyle={{ borderRadius: 20 }}>
                            <Form layout="vertical">
                                <Form.Item label="Your e-mail">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Phone Number">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Location">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="How many years' experience do you have as a Fashion designer?">
                                    <Select>
                                        <Select.Option value="demo">Demo</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Describe yourself">
                                    <Input.TextArea rows={5} />
                                </Form.Item>
                                <Form.Item label="Upload Files">
                                    <Space>
                                        <Button>
                                            <FontAwesomeIcon icon={faImages} />
                                        </Button>
                                        <Button>
                                            <FontAwesomeIcon icon={faPaperclip} />
                                        </Button>
                                    </Space>
                                </Form.Item>
                                <Divider />
                                <Form.Item style={{ textAlign: "right" }}>
                                    <Button type="primary">Submit</Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default JobForm;
