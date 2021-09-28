import { faCaretRight, faCircleNotch, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Card, Col, Divider, List, Row, Space, Spin, Typography } from "antd";
import { AxiosResponse } from "axios";
import moment from "moment";
import React from "react";

import SvgSaved from "../../../../assets/svg/saved-icon.svg";
import SvgShare from "../../../../assets/svg/share-icon.svg";
import { getSearchJob } from "../../../../repository/JobRepo";
import { encodeHashUserId } from "../../../../config/Util";
var CurrencyFormat = require("react-currency-format");
const { Text } = Typography;

interface JobRecommendationProps {}

interface JobRecommendationState {
    jobsRecomendation: any[];
    pagination: any;
    loading: boolean;
}

class JobRecommendation extends React.Component<JobRecommendationProps, JobRecommendationState> {
    state = {
        loading: false,
        jobsRecomendation: [] as any[],
        pagination: {
            page: 1,
            total: 0,
            position: "",
            location: "",
            status: "",
            salary: "",
            salaryAbove20: "",
            size: 4,
        },
    };
    componentDidMount() {
        this.getJobRecommendation(1);
    }
    getJobRecommendation = (e: any) => {
        // const { pagination, jobs, jobsRecomendation } = this.state;
        const { pagination, jobsRecomendation } = this.state;
        this.setState({
            loading: true,
        });

        this.setState({
            pagination: {
                ...pagination,
                page: e,
                size: 4,
            },
        });

        getSearchJob(pagination)
            .then((res: AxiosResponse<any>) => {
                let newPostingList: any[] = res.data.content?.concat(jobsRecomendation) as any[];
                newPostingList = newPostingList.sort((a: any, b: any) => moment(b.createdAt).diff(moment(a.createdAt)));
                this.setState({
                    jobsRecomendation: newPostingList,
                    pagination: {
                        ...pagination,
                        total: res.data.total,
                    },
                });
            })
            .catch((e) => {
                console.log(e.response);
            })
            .finally(() => {
                this.setState({
                    loading: false,
                });
            });
    };
    render() {
        const { jobsRecomendation } = this.state;
        return (
            <>
                <div>
                    {/* Filter Pencarian */}
                    <Text className="subtitlejob">Recommendation Job</Text>
                </div>
                <List
                    dataSource={jobsRecomendation || []}
                    footer={
                        <Button type="link" href="#/public/job-search" block style={{ marginTop: 22 }}>
                            <Space>
                                Lainnya
                                <FontAwesomeIcon icon={faCaretRight} />
                            </Space>
                        </Button>
                    }
                    split={false}
                    locale={{
                        emptyText: <Card>No Data</Card>,
                    }}
                    renderItem={(jobRecomendation: any, i: number) => (
                        <List.Item key={i}>
                            <Card style={{ width: "100%" }}>
                                <Row justify="space-between" onClick={() => (window.location.hash = "/job/job-detail/" + encodeHashUserId(jobRecomendation.id))} style={{ cursor: "pointer" }}>
                                    <Col xs={20} md={19}>
                                        <Row className="jobtitleMobile">{jobRecomendation.jobName}</Row>
                                        <Row className="jobrecomenMobile">{jobRecomendation.organization.name}</Row>
                                    </Col>
                                    <Col xs={4} md={5}>
                                        <Avatar size={50} src={jobRecomendation.organization.logo} />
                                    </Col>
                                </Row>
                                <Divider />

                                <div className="placeMobile">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: 5 }} /> <span>{jobRecomendation.location.split(",").join(", ")}</span>
                                </div>
                                <Row justify="start">
                                    <Col md={24} style={{ marginRight: 5 }}>
                                        <Row>
                                            <Typography.Text className="statusMobile">Status Pekerjaan :</Typography.Text>
                                        </Row>
                                    </Col>
                                    <Col md={24}>
                                        <Row className="statusvalMobile">{jobRecomendation.jobType}</Row>
                                    </Col>
                                </Row>
                                <Row justify="start" style={{ color: "#53575E", fontSize: 10 }} align="top">
                                    <Col md={24} style={{ marginRight: 5 }}>
                                        <Row>
                                            <Typography.Text className="statusMobile">Gaji :</Typography.Text>
                                        </Row>
                                    </Col>
                                    {jobRecomendation.showSalary && (
                                        <Col md={24}>
                                            <Row className="statusvalMobile">
                                                <CurrencyFormat value={jobRecomendation.salaryMin} displayType={"text"} thousandSeparator={true} renderText={(value: any) => <>{value}</>} />
                                                <span> - </span>
                                                <CurrencyFormat value={jobRecomendation.salaryMax} displayType={"text"} thousandSeparator={true} renderText={(value: any) => <>{value}</>} />
                                            </Row>
                                        </Col>
                                    )}
                                </Row>

                                <Row justify="space-between" style={{ marginTop: 20 }}>
                                    <Col className="timeMobile">{jobRecomendation.time}</Col>
                                    <Col>
                                        <Row>
                                            <Space size={9}>
                                                <Col>
                                                    <img src={SvgSaved} alt="saved" className="btnsaveMobile" />
                                                </Col>
                                                <Col>
                                                    <img src={SvgShare} alt="share" className="btnsaveMobile" />
                                                </Col>
                                            </Space>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card>
                        </List.Item>
                    )}
                >
                    {this.state.loading && <Spin indicator={<FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />} />}
                </List>
            </>
        );
    }
}

export default JobRecommendation;
