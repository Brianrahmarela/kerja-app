import { faMapMarkerAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Card, Col, Row, Space, Typography } from "antd";
import React from "react";

interface OrganizationProps {}

interface OrganizationState {}

class Organization extends React.Component<OrganizationProps, OrganizationState> {
    render() {
        return (
            <Card id="organization" style={{ marginTop: 20 }}>
                <Row justify="space-between">
                    <Col span={20}>
                        <Typography.Title level={4}>Organization</Typography.Title>
                    </Col>
                    <Col span={4} style={{ textAlign: "right" }}>
                        <Button type="text" icon={<FontAwesomeIcon icon={faPencilAlt} />}></Button>
                    </Col>
                </Row>
                <Row gutter={[20, 20]}>
                    <Col span={12}>
                        <Row>
                            <Col span={3}>
                                <Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            </Col>
                            <Col span={21}>
                                <Space>
                                    <Typography.Text strong>Institute Kesenian Jakarta</Typography.Text>
                                    <Typography.Text> 2014 - 2016</Typography.Text>
                                </Space>
                                <Space>
                                    <Typography.Text>Magister Of Art</Typography.Text>|<Typography.Text>Fashion Design (Fashion Stylist)</Typography.Text>|<Typography.Text>3.40 / 4.00</Typography.Text>
                                </Space>
                                <Space>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                    <Typography.Text> Jakarta, Indonesia</Typography.Text> |<Typography.Text>Fashion, Industry</Typography.Text>
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={3}>
                                <Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            </Col>
                            <Col span={21}>
                                <Space>
                                    <Typography.Text strong>Institute Kesenian Jakarta</Typography.Text>
                                    <Typography.Text> 2014 - 2016</Typography.Text>
                                </Space>
                                <Space>
                                    <Typography.Text>Magister Of Art</Typography.Text>|<Typography.Text>Fashion Design (Fashion Stylist)</Typography.Text>|<Typography.Text>3.40 / 4.00</Typography.Text>
                                </Space>
                                <Space>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                    <Typography.Text> Jakarta, Indonesia</Typography.Text> |<Typography.Text>Fashion, Industry</Typography.Text>
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={3}>
                                <Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            </Col>
                            <Col span={21}>
                                <Space>
                                    <Typography.Text strong>Institute Kesenian Jakarta</Typography.Text>
                                    <Typography.Text> 2014 - 2016</Typography.Text>
                                </Space>
                                <Space>
                                    <Typography.Text>Magister Of Art</Typography.Text>|<Typography.Text>Fashion Design (Fashion Stylist)</Typography.Text>|<Typography.Text>3.40 / 4.00</Typography.Text>
                                </Space>
                                <Space>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                    <Typography.Text> Jakarta, Indonesia</Typography.Text> |<Typography.Text>Fashion, Industry</Typography.Text>
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={3}>
                                <Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            </Col>
                            <Col span={21}>
                                <Space>
                                    <Typography.Text strong>Institute Kesenian Jakarta</Typography.Text>
                                    <Typography.Text> 2014 - 2016</Typography.Text>
                                </Space>
                                <Space>
                                    <Typography.Text>Magister Of Art</Typography.Text>|<Typography.Text>Fashion Design (Fashion Stylist)</Typography.Text>|<Typography.Text>3.40 / 4.00</Typography.Text>
                                </Space>
                                <Space>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                    <Typography.Text> Jakarta, Indonesia</Typography.Text> |<Typography.Text>Fashion, Industry</Typography.Text>
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default Organization;
