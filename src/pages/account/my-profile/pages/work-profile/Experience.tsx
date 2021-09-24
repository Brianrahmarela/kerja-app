import { faCaretDown, faMapMarkerAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Card, Col, Row, Skeleton, Space, Timeline, Typography } from "antd";
import React from "react";

interface ExperienceProps {}

interface ExperienceState {}

class Experience extends React.Component<ExperienceProps, ExperienceState> {
    render() {
        return (
            <>
                <Card id="experience" style={{ marginTop: 20 }}>
                    <Row justify="space-between">
                        <Col span={20}>
                            <Typography.Title level={4}>Experience</Typography.Title>
                        </Col>
                        <Col span={4} style={{ textAlign: "right" }}>
                            <Button type="text" icon={<FontAwesomeIcon icon={faPencilAlt} />}></Button>
                        </Col>
                    </Row>
                    <Timeline style={{ marginTop: 20 }}>
                        <Timeline.Item dot={<Avatar size={35} src="https://images7.alphacoders.com/411/thumb-1920-411820.jpg" />}>
                            <div style={{ paddingLeft: 20 }}>
                                <Space>
                                    <Typography.Text strong>Fashion Designer </Typography.Text>
                                    <Typography.Text> 1 thn, 6 bulan</Typography.Text>
                                </Space>
                                <Space>
                                    <Typography.Text>Shqueen</Typography.Text>|<Typography.Text>Full time</Typography.Text>|<Typography.Text>Jan, 2020 - Present</Typography.Text>|
                                    <Typography.Text>IDR 7.000.000 / month</Typography.Text>
                                </Space>
                                <Space>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                    <Typography.Text> Jakarta, Indonesia</Typography.Text> |<Typography.Text>Fashion, Industry</Typography.Text>
                                </Space>
                                <ul style={{ paddingLeft: 20, marginTop: 20 }}>
                                    <li>Merancang koleksi produk baru dengan hand-sketch dan mempresentasikan mood board</li>
                                    <li>Dapat memberikan ide dan mengembangkan produk untuk trend pasar.</li>
                                    <li>Memiliki kemampuan untuk perpaduan warna.</li>
                                    <li>Memiliki kemampuan tracking dan desain baju memiliki nilai jual.</li>
                                    <li>Memiliki kemampuan tracking dan desain baju memiliki nilai jual</li>
                                </ul>
                            </div>
                        </Timeline.Item>
                        <Timeline.Item dot={<Avatar size={35} src="https://images7.alphacoders.com/411/thumb-1920-411820.jpg" />}>
                            <div style={{ paddingLeft: 20 }}>
                                <Space>
                                    <Typography.Text strong>Fashion Designer </Typography.Text>
                                    <Typography.Text> 1 thn, 6 bulan</Typography.Text>
                                </Space>
                                <Space>
                                    <Typography.Text>Shqueen</Typography.Text>|<Typography.Text>Full time</Typography.Text>|<Typography.Text>Jan, 2020 - Present</Typography.Text>|
                                    <Typography.Text>IDR 7.000.000 / month</Typography.Text>
                                </Space>
                                <Space>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                    <Typography.Text> Jakarta, Indonesia</Typography.Text> |<Typography.Text>Fashion, Industry</Typography.Text>
                                </Space>
                                <ul style={{ paddingLeft: 20, marginTop: 20 }}>
                                    <li>Merancang koleksi produk baru dengan hand-sketch dan mempresentasikan mood board</li>
                                    <li>Dapat memberikan ide dan mengembangkan produk untuk trend pasar.</li>
                                    <li>Memiliki kemampuan untuk perpaduan warna.</li>
                                    <li>Memiliki kemampuan tracking dan desain baju memiliki nilai jual.</li>
                                    <li>Memiliki kemampuan tracking dan desain baju memiliki nilai jual</li>
                                </ul>
                            </div>
                        </Timeline.Item>
                        <Timeline.Item dot={<Avatar size={35} src="https://images7.alphacoders.com/411/thumb-1920-411820.jpg" />}>
                            <div style={{ paddingLeft: 20 }}>
                                <Space>
                                    <Typography.Text strong>Fashion Designer </Typography.Text>
                                    <Typography.Text> 1 thn, 6 bulan</Typography.Text>
                                </Space>
                                <Space>
                                    <Typography.Text>Shqueen</Typography.Text>|<Typography.Text>Full time</Typography.Text>|<Typography.Text>Jan, 2020 - Present</Typography.Text>|
                                    <Typography.Text>IDR 7.000.000 / month</Typography.Text>
                                </Space>
                                <Space>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                    <Typography.Text> Jakarta, Indonesia</Typography.Text> |<Typography.Text>Fashion, Industry</Typography.Text>
                                </Space>
                                <ul style={{ paddingLeft: 20, marginTop: 20 }}>
                                    <li>Merancang koleksi produk baru dengan hand-sketch dan mempresentasikan mood board</li>
                                    <li>Dapat memberikan ide dan mengembangkan produk untuk trend pasar.</li>
                                    <li>Memiliki kemampuan untuk perpaduan warna.</li>
                                    <li>Memiliki kemampuan tracking dan desain baju memiliki nilai jual.</li>
                                    <li>Memiliki kemampuan tracking dan desain baju memiliki nilai jual</li>
                                </ul>
                            </div>
                        </Timeline.Item>
                        <Timeline.Item dot={<Avatar size={35} src="https://images7.alphacoders.com/411/thumb-1920-411820.jpg" />}>
                            <div style={{ paddingLeft: 20 }}>
                                <Skeleton title={false} active></Skeleton>
                            </div>
                        </Timeline.Item>
                    </Timeline>
                    <div style={{ width: "100%", textAlign: "center", padding: 5 }}>
                        <Button type="text" size="small">
                            Lainnya <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: 5 }} />
                        </Button>
                    </div>
                </Card>
            </>
        );
    }
}

export default Experience;
