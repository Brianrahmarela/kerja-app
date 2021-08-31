import { faBookmark, faFilter, faSearch, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Card, Checkbox, Col, Form, Input, Row, Slider, Space, Typography } from "antd";
import React from "react";

export interface JobProps {}

export interface JobState {}

class Job extends React.Component<JobProps, JobState> {
    componentDidMount() {
        window.document.title = "Job | KerjaApp";
    }
    render() {
        return (
            <>
                <Row gutter={15} style={{ marginTop: 15 }}>
                    <Col span={16}>
                        <Row justify="space-around">
                            <Col span={12}>
                                <Typography.Text>Rekomendasi Untukmu, Sheila</Typography.Text>
                            </Col>
                            <Col span={12} style={{ textAlign: "right" }}>
                                <FontAwesomeIcon icon={faBookmark} /> My Job
                            </Col>
                        </Row>
                        <Row gutter={[20, 15]} style={{ marginTop: 15 }}>
                            <Col span={24}>
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
                                        <Col span={6} style={{ textAlign: "center" }}>
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
                            <Col span={24}>
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
                                        <Col span={6} style={{ textAlign: "center" }}>
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
                            <Col span={24}>
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
                                        <Col span={6} style={{ textAlign: "center" }}>
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
                            <Col span={24}>
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
                                        <Col span={6} style={{ textAlign: "center" }}>
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
                            <Col span={24}>
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
                                        <Col span={6} style={{ textAlign: "center" }}>
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
                    </Col>
                    <Col span={8}>
                        <div>
                            <FontAwesomeIcon icon={faFilter} style={{ marginRight: 10 }} />
                            Filter Pencarian
                        </div>
                        <div style={{ marginTop: 15 }}>
                            <Card>
                                <Form layout="vertical">
                                    <Form.Item label="Posisi">
                                        <Input prefix={<FontAwesomeIcon icon={faSearch} />}></Input>
                                    </Form.Item>
                                    <Form.Item label="Gaji">
                                        <Slider min={1} max={20} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Checkbox>Diatas 20jt</Checkbox>
                                    </Form.Item>
                                    <Form.Item label="Lokasi">
                                        <Input></Input>
                                    </Form.Item>
                                    <Form.Item label="Status Pekerjaan">
                                        <Input></Input>
                                    </Form.Item>
                                    <Form.Item style={{ textAlign: "right" }}>
                                        <Button type="primary">Cari</Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </>
        );
    }
}

export default Job;
