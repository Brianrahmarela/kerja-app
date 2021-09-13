import { faArrowLeft, faBookmark, faCheck, faGlobe, faMailBulk, faMapMarkerAlt, faPhone, faPlus, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Breadcrumb, Button, Card, Col, Divider, Row, Space, Typography } from "antd";
import { AxiosResponse } from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { getJobVacationDetail } from "../../../repository/JobRepo";
import ReactHtmlParser from "react-html-parser";
import { encodeHashUserId } from "../../../config/Util";

export interface JobDetailProps {
    match: any;
}

export interface JobDetailState {
    id: number;
    jobName: string;
    specialization: string;
    positionLevel: string;
    role: string;
    photoRequired: boolean;
    jobType: string;
    skill: string;
    salaryMin: number;
    salaryMax: number;
    showSalary: boolean;
    status: string;
    publishDate: any;
    expiredDate: any;
    jobDetail: string;
    gender: string;
    allAge: boolean;
    ageMin: number;
    ageMax: number;
    education: string;
    educationMajor: string;
    grade: string;
    gradeAbove: number;
    marritalStatus: string;
    location: string;
    longitude: string;
    latitude: string;
    experienced: boolean;
    experienceYear: number;
    freshGraduate: boolean;
    contactEmail: string;
    userId: number;
    tnc: string;
    organization: {
        description: string;
        name: string;
        logo: string;
        address: string;
        longitude: string;
        latitude: string;
        industry: string;
        organtizationMember: string;
        phone: string;
        status: string;
        email: string;
        taxId: string;
        province: string;
        city: string;
        country: string;
    };
}

class JobDetail extends React.Component<JobDetailProps, JobDetailState> {
    state = {
        id: 0,
        jobName: "",
        specialization: "",
        positionLevel: "",
        role: "",
        photoRequired: false,
        jobType: "",
        skill: "",
        salaryMin: 0,
        salaryMax: 0,
        showSalary: false,
        status: "",
        publishDate: "0001-01-01T00:00:00Z",
        expiredDate: "0001-01-01T00:00:00Z",
        jobDetail: "",
        gender: "",
        allAge: false,
        ageMin: 0,
        ageMax: 0,
        education: "",
        educationMajor: "",
        grade: "",
        gradeAbove: 0,
        marritalStatus: "",
        location: "",
        longitude: "",
        latitude: "",
        experienced: false,
        experienceYear: 0,
        freshGraduate: false,
        contactEmail: "",
        userId: 0,
        tnc: "",
        organization: {
            description: "-",
            name: "",
            logo: "",
            address: "-",
            longitude: "",
            latitude: "",
            industry: "",
            organtizationMember: "",
            phone: "-",
            status: "",
            email: "-",
            taxId: "",
            province: "",
            city: "",
            country: "",
            website: "-",
        },
    };
    componentDidMount() {
        window.document.title = "Job Detail | KerjaApp";
        this.getData();
    }
    getData() {
        const jobid = this.props.match.params.jobid;
        getJobVacationDetail(jobid).then((res: AxiosResponse<any>) => {
            this.setState(res.data);
        });
    }
    render() {
        const { organization } = this.state;
        return (
            <div className="page-job-detail">
                <Row>
                    <Col>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/home">
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/job">Lowongan Pekerjaan</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Deskripsi Pekerjaan</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row gutter={[20, 15]} style={{ marginTop: 15 }}>
                    <Col span={8}>
                        <Card bodyStyle={{ padding: 0, borderRadius: 20 }} style={{ borderRadius: 20 }}>
                            <div className="bg-cover-left">
                                <Avatar size={100} style={{ marginBottom: 20 }} src={organization.logo} />
                                <Typography.Title level={4}>{organization.name}</Typography.Title>
                                <Typography.Text>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: 5 }} />
                                    {organization.province}, {organization.country}
                                </Typography.Text>
                                <div style={{ marginTop: 15 }}>
                                    <Button icon={<FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />}>Ikuti</Button>
                                </div>
                            </div>
                            <div style={{ padding: 24 }}>
                                <Typography.Title level={4}>Tentang Perusahaan</Typography.Title>

                                <Typography.Paragraph>{organization.description}</Typography.Paragraph>
                                <div>
                                    <Typography.Text>
                                        <FontAwesomeIcon icon={faMailBulk} style={{ marginRight: 5 }} />
                                        {(organization.email && <a href={"email:" + organization.email}>{organization.email}</a>) || "-"}
                                    </Typography.Text>
                                </div>
                                <div>
                                    <Typography.Text>
                                        <FontAwesomeIcon icon={faPhone} style={{ marginRight: 5 }} />
                                        {(organization.phone && <a href={"tel:" + organization.phone}>{organization.phone}</a>) || "-"}
                                    </Typography.Text>
                                </div>
                                <div>
                                    <Typography.Text>
                                        <FontAwesomeIcon icon={faGlobe} style={{ marginRight: 5 }} />
                                        {(organization.website && (
                                            <a href={"http://" + organization.website} target="_blank" rel="noreferrer">
                                                {organization.website}
                                            </a>
                                        )) ||
                                            "-"}
                                    </Typography.Text>
                                </div>
                                <div>
                                    <Typography.Text>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: 5 }} />
                                        {organization.address || "-"}
                                    </Typography.Text>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span={16}>
                        <Card bodyStyle={{ padding: 0, borderRadius: 20 }} style={{ borderRadius: 20 }}>
                            <div className="bg-cover-right"></div>
                            <div className="right-content">
                                <Avatar size={100} style={{ marginBottom: 20 }} src={organization.logo} />
                                <Row align="bottom">
                                    <Col span={12}>
                                        <Typography.Title level={5}>{this.state.jobName}</Typography.Title>
                                        <Typography.Title level={4}>{organization.name}</Typography.Title>
                                        <Typography.Text>
                                            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: 5 }} />
                                            {this.state.location.split(",").join(", ")}
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
                                            <Button type="primary" href={"#/job/apply/" + encodeHashUserId(this.state.id)} icon={<FontAwesomeIcon icon={faCheck} style={{ marginRight: 5 }} />}>
                                                Lamar
                                            </Button>
                                        </Space>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Typography.Title level={5} style={{ marginTop: 30 }}>
                                            Job Detail
                                        </Typography.Title>
                                        <div>{ReactHtmlParser(this.state.jobDetail)}</div>
                                    </Col>
                                    <Col span={24}>
                                        <Typography.Title level={5} style={{ marginTop: 30 }}>
                                            Spesification
                                        </Typography.Title>
                                        <Row>
                                            <Col span={12}>
                                                <div>
                                                    <Typography.Text strong>Jenis Pekerjaan</Typography.Text>: {this.state.jobType.replace("_", " ")}
                                                </div>

                                                <div>
                                                    <Typography.Text strong>Status Pernikahan</Typography.Text>: {this.state.marritalStatus.replace("_", " ")}
                                                </div>
                                            </Col>
                                            <Col span={12}>
                                                <div>
                                                    <Typography.Text strong>Jenis Pekerjaan</Typography.Text>: {this.state.jobType.replace("_", " ")}
                                                </div>

                                                <div>
                                                    <Typography.Text strong>Status Pernikahan</Typography.Text>: {this.state.marritalStatus.replace("_", " ")}
                                                </div>
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
                                            <Button type="primary" href={"#/job/apply/" + encodeHashUserId(this.state.id)} icon={<FontAwesomeIcon icon={faCheck} style={{ marginRight: 5 }} />}>
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
