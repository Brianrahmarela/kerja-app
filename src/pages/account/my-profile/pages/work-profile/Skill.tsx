import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Card, Col, Rate, Row, Space, Typography } from "antd";
import React from "react";

interface SkillProps {}

interface SkillState {}

class Skill extends React.Component<SkillProps, SkillState> {
    render() {
        return (
            <>
                <Card id="skill" style={{ marginTop: 20 }}>
                    <Row justify="space-between">
                        <Col span={20}>
                            <Typography.Title level={4}>Skills</Typography.Title>
                        </Col>
                        <Col span={4} style={{ textAlign: "right" }}>
                            <Button type="text" icon={<FontAwesomeIcon icon={faPencilAlt} />}></Button>
                        </Col>
                    </Row>
                    <Row gutter={[20, 20]}>
                        <Col span={10}>
                            <Card>
                                <Typography.Title level={5}>Fashion Design</Typography.Title>
                                <Space>
                                    <Typography.Text>2.5</Typography.Text>
                                    <Rate allowHalf defaultValue={2.5} />
                                </Space>
                            </Card>
                        </Col>
                        <Col span={10}>
                            <Card>
                                <Typography.Title level={5}>Fashion Design</Typography.Title>
                                <Space>
                                    <Typography.Text>2.5</Typography.Text>
                                    <Rate allowHalf defaultValue={2.5} />
                                </Space>
                            </Card>
                        </Col>
                        <Col span={10}>
                            <Card>
                                <Typography.Title level={5}>Fashion Design</Typography.Title>
                                <Space>
                                    <Typography.Text>2.5</Typography.Text>
                                    <Rate allowHalf defaultValue={2.5} />
                                </Space>
                            </Card>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 30 }}>
                        <Col span={20}>
                            <Typography.Title level={4}>Interpersonal Skills</Typography.Title>
                        </Col>
                    </Row>
                    <Row gutter={[20, 20]}>
                        <Col span={10}>
                            <Card>
                                <Typography.Title level={5}>Fashion Design</Typography.Title>
                                <Space>
                                    <Typography.Text>2.5</Typography.Text>
                                    <Rate allowHalf defaultValue={2.5} />
                                </Space>
                            </Card>
                        </Col>
                        <Col span={10}>
                            <Card>
                                <Typography.Title level={5}>Fashion Design</Typography.Title>
                                <Space>
                                    <Typography.Text>2.5</Typography.Text>
                                    <Rate allowHalf defaultValue={2.5} />
                                </Space>
                            </Card>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 30 }}>
                        <Col span={20}>
                            <Typography.Title level={4}>Languange</Typography.Title>
                        </Col>
                    </Row>
                    <div style={{ marginBottom: 20 }}>
                        <Space>
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <Typography.Text>Indonesia</Typography.Text>
                            <Typography.Text>2.5</Typography.Text>
                            <Rate allowHalf defaultValue={2.5} />
                        </Space>
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <Space>
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <Typography.Text>Indonesia</Typography.Text>
                            <Typography.Text>2.5</Typography.Text>
                            <Rate allowHalf defaultValue={2.5} />
                        </Space>
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <Space>
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <Typography.Text>Indonesia</Typography.Text>
                            <Typography.Text>2.5</Typography.Text>
                            <Rate allowHalf defaultValue={2.5} />
                        </Space>
                    </div>
                </Card>
            </>
        );
    }
}

export default Skill;
