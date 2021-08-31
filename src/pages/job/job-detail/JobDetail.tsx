import { faArrowLeft, faBookmark, faCheck, faMailBulk, faMapMarkerAlt, faPhone, faPlus, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Breadcrumb, Button, Card, Col, Divider, Row, Space, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export interface JobDetailProps {}

export interface JobDetailState {}

class JobDetail extends React.Component<JobDetailProps, JobDetailState> {
    componentDidMount() {
        window.document.title = "Job Detail | KerjaApp";
    }
    render() {
        return (
            <div className="page-job-detail">
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
                            <Breadcrumb.Item>Deskripsi Pekerjaan</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row gutter={[20, 15]} style={{ marginTop: 15 }}>
                    <Col span={8}>
                        <Card bodyStyle={{ padding: 0, borderRadius: 20 }} style={{ borderRadius: 20 }}>
                            <div className="bg-cover-left">
                                <Avatar size={100} style={{ marginBottom: 20 }} />
                                <Typography.Title level={5}>Lorem Boutique</Typography.Title>
                                <Typography.Text>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: 5 }} />
                                    Jakarta, Indonesia
                                </Typography.Text>
                                <div style={{ marginTop: 15 }}>
                                    <Button icon={<FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />}>Ikuti</Button>
                                </div>
                            </div>
                            <div style={{ padding: 24 }}>
                                <Typography.Title level={5}>Tentang Perusahaan</Typography.Title>

                                <Typography.Paragraph>
                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                                    accusam et justo duo dolores et ea rebum. Stet clita.
                                </Typography.Paragraph>
                                <div>
                                    <Typography.Text>
                                        <FontAwesomeIcon icon={faMailBulk} style={{ marginRight: 5 }} />
                                        loremboutique.com
                                    </Typography.Text>
                                </div>
                                <div>
                                    <Typography.Text>
                                        <FontAwesomeIcon icon={faPhone} style={{ marginRight: 5 }} />
                                        0878112233445
                                    </Typography.Text>
                                </div>
                                <div>
                                    <Typography.Text>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: 5 }} />
                                        Jl. Tebet Raya No.38, Jakarta Selatan, DKI Jakarta
                                    </Typography.Text>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span={16}>
                        <Card bodyStyle={{ padding: 0, borderRadius: 20 }} style={{ borderRadius: 20 }}>
                            <div className="bg-cover-right"></div>
                            <div className="right-content">
                                <Avatar size={100} style={{ marginBottom: 20 }} />
                                <Row align="bottom">
                                    <Col span={12}>
                                        <Typography.Title level={5}>Lorem Boutique</Typography.Title>
                                        <Typography.Text>
                                            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: 5 }} />
                                            Jakarta, Indonesia
                                        </Typography.Text>
                                        <div style={{ marginTop: 15 }}>
                                            <Button icon={<FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />}>Ikuti</Button>
                                        </div>
                                    </Col>
                                    <Col span={12}>
                                        <Space>
                                            <Button type="primary" icon={<FontAwesomeIcon icon={faShare} style={{ marginRight: 5 }} />}>
                                                Bagikan
                                            </Button>
                                            <Button type="primary" icon={<FontAwesomeIcon icon={faBookmark} style={{ marginRight: 5 }} />}>
                                                Arsip
                                            </Button>
                                            <Button type="primary" icon={<FontAwesomeIcon icon={faCheck} style={{ marginRight: 5 }} />}>
                                                Lamar
                                            </Button>
                                        </Space>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Typography.Title level={5} style={{ marginTop: 30 }}>
                                            Lorem Boutique
                                        </Typography.Title>
                                        <ul>
                                            <li>Minimum Bachelor Degree majoring Fashion Design or Fashion Merchandising from reputable university</li>
                                            <li>Minimum 1 years experiences in fashion retail industry Having graphic design skills (Illustrator, Photoshop)</li>
                                            <li>Good interpersonal with excellent coordination skill</li>
                                            <li>
                                                Up-to-date in Fashion Trends● Active, Creative and Used to tight time schedule● Excellent skill in Fashion Design, Fabrics, Textille, Graphics Design and Pattern
                                                Making● Understand Production Planning Process, Mood Board, Sample
                                            </li>
                                        </ul>
                                    </Col>
                                    <Col span={24}>
                                        <Typography.Title level={5} style={{ marginTop: 30 }}>
                                            Lorem Boutique
                                        </Typography.Title>
                                        <Row>
                                            <Col span={12}>
                                                <ul>
                                                    <li>Minimum Bachelor Degree majoring Fashion Design or Fashion Merchandising from reputable university</li>
                                                    <li>Minimum 1 years experiences in fashion retail industry Having graphic design skills (Illustrator, Photoshop)</li>
                                                    <li>Good interpersonal with excellent coordination skill</li>
                                                </ul>
                                            </Col>
                                            <Col span={12}>
                                                <ul>
                                                    <li>Minimum Bachelor Degree majoring Fashion Design or Fashion Merchandising from reputable university</li>
                                                    <li>Minimum 1 years experiences in fashion retail industry Having graphic design skills (Illustrator, Photoshop)</li>
                                                    <li>Good interpersonal with excellent coordination skill</li>
                                                </ul>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                            <Divider style={{ margin: 0 }} />
                            <div className="footer-content">
                                <Row align="bottom" style={{ textAlign: "right" }}>
                                    <Col span={24}>
                                        <Space>
                                            <Button type="link" icon={<FontAwesomeIcon icon={faShare} style={{ marginRight: 5 }} />}>
                                                Bagikan
                                            </Button>
                                            <Button type="link" icon={<FontAwesomeIcon icon={faBookmark} style={{ marginRight: 5 }} />}>
                                                Arsip
                                            </Button>
                                            <Button type="primary" icon={<FontAwesomeIcon icon={faCheck} style={{ marginRight: 5 }} />}>
                                                Lamar
                                            </Button>
                                        </Space>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default JobDetail;
