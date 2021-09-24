import { faCaretDown, faMapMarkerAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Card, Col, List, Row, Skeleton, Space, Typography } from "antd";
import React from "react";

interface EducationProps {}

interface EducationState {}

class Education extends React.Component<EducationProps, EducationState> {
    render() {
        return (
            <>
                <Card id="education" style={{ marginTop: 20 }}>
                    <Row justify="space-between">
                        <Col span={20}>
                            <Typography.Title level={4}>Education</Typography.Title>
                        </Col>
                        <Col span={4} style={{ textAlign: "right" }}>
                            <Button type="text" icon={<FontAwesomeIcon icon={faPencilAlt} />}></Button>
                        </Col>
                    </Row>
                    <List
                        itemLayout="horizontal"
                        loadMore={
                            <div style={{ width: "100%", textAlign: "center", padding: 5 }}>
                                <Button type="text" size="small">
                                    Lainnya <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: 5 }} />
                                </Button>
                            </div>
                        }
                        dataSource={[
                            "Racing car sprays burning fuel into crowd.",
                            "Japanese princess to wed commoner.",
                            "Australian walks 100km after outback crash.",
                            "Man charged over missing wedding girl.",
                            "Los Angeles battles huge wildfires.",
                        ]}
                        renderItem={(item) => (
                            <List.Item style={{ width: "100%" }}>
                                <Skeleton loading={false} title={true} active={false}>
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
                                                <Typography.Text>Magister Of Art</Typography.Text>|<Typography.Text>Fashion Design (Fashion Stylist)</Typography.Text>|
                                                <Typography.Text>3.40 / 4.00</Typography.Text>
                                            </Space>
                                            <Space>
                                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                                <Typography.Text> Jakarta, Indonesia</Typography.Text> |<Typography.Text>Fashion, Industry</Typography.Text>
                                            </Space>
                                        </Col>
                                    </Row>
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </Card>
            </>
        );
    }
}

export default Education;
