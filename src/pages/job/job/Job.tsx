import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Input, List, Row, Space, Spin, Typography } from "antd";
import { AxiosResponse } from "axios";
import moment from "moment";
import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getMyApplicationJob } from "../../../repository/JobRepo";
import SvgTime from "../../../assets/svg/time.svg";
import SvgMyJob from "../../../assets/svg/my-job.svg";
import SvgLainnya from "../../../assets/svg/lainnya-icon.svg";

import JobEvent from "./job-component/JobEvent";
import JobRecommendation from "./job-component/JobRecommendation";

const { Search } = Input;
const { Text } = Typography;
export interface JobProps {
    currentUser?: any;
}
export interface JobState {
    hasMore: boolean;
    loading: boolean;
    scrolled: boolean;
    jobApplications: any[];
    pagination: any;
    valSearch: any;
}
class Job extends React.Component<JobProps, JobState> {
    state = {
        hasMore: true,
        loading: false,
        scrolled: false,
        jobApplications: [] as any[],
        pagination: {
            page: 1,
            total: 0,
        },
        valSearch: "",
    };
    onSearch = (valSearch: string) => {
        console.log("val search:", valSearch);
    };
    componentDidMount() {
        window.document.title = "Job | KerjaApp";
        this.loadMore(1);
    }
    loadMore = (e: any) => {
        // const { pagination, jobs, jobsRecomendation } = this.state;
        const { pagination, jobApplications } = this.state;
        this.setState({
            loading: true,
        });

        this.setState({
            pagination: {
                ...pagination,
                page: e,
            },
        });

        getMyApplicationJob(pagination)
            .then((res: AxiosResponse<any>) => {
                let newPostingList: any[] = res.data.content?.concat(jobApplications) as any[];
                newPostingList = newPostingList.sort((a: any, b: any) => moment(b.createdAt).diff(moment(a.createdAt)));
                this.setState({
                    jobApplications: newPostingList,
                    hasMore: newPostingList.length < res.data.total,
                    pagination: {
                        ...pagination,
                        total: res.data.total,
                    },
                });
            })
            .catch((e) => {
                console.log(e.response);
                this.setState({ hasMore: false });
            })
            .finally(() => {
                this.setState({
                    loading: false,
                });
            });
    };
    render() {
        const { currentUser } = this.props;
        const { jobApplications } = this.state;
        return (
            <div className="job-page">
                <Row style={{ marginTop: 64 }} justify="space-around" align="middle">
                    <Col xs={24} md={13}>
                        <Row align="middle" style={{ marginBottom: 10 }}>
                            <Space size={9}>
                                <Col>
                                    <Text className="JobTitle">Hi, </Text>
                                </Col>
                                <Col>
                                    <Text className="JobTitle2">{currentUser?.firstName}</Text>
                                    {" " + currentUser?.lastName}!
                                </Col>
                            </Space>
                        </Row>
                    </Col>
                    <Col xs={24} md={10} style={{ textAlign: "right" }}>
                        <Search placeholder="Search" enterButton allowClear onSearch={this.onSearch} />
                    </Col>
                </Row>
                <Row style={{ marginTop: 22 }} gutter={[20, 20]}>
                    <Col sm={24} md={16} xl={16}>
                        <Row justify="space-around" style={{ marginBottom: 26 }} className="marginbtmmobile">
                            <Col xs={15} md={12}>
                                <Row align="middle">
                                    <Col style={{ marginRight: 9 }}>
                                        <img style={{ padding: 0, margin: 0 }} src={SvgTime} alt="myLastappliedjob" height={22} />
                                    </Col>
                                    <Col>
                                        <Text className="subtitlejob">My Last Applied Job </Text>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={9} md={12} style={{ textAlign: "right" }}>
                                <Row align="middle" justify="end">
                                    <Col>
                                        <Link to={`/job/my-jobs-applied`}>
                                            {" "}
                                            <Button type="primary" icon={<img src={SvgMyJob} alt="logokerjaapp" style={{ marginRight: 7 }} />} className="txtmyjob">
                                                My Jobs
                                            </Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>
                            <Col span={24}>
                                {/* TABLET & DESKTOP  */}
                                <Card className="titlemylastapplied">
                                    <Row justify="space-between">
                                        <Col xs={0} md={4}>
                                            Job Title
                                        </Col>
                                        <Col xs={0} md={4}>
                                            Company
                                        </Col>
                                        <Col xs={0} md={4}>
                                            Applied On
                                        </Col>
                                        <Col xs={0} md={4}>
                                            Position
                                        </Col>
                                        <Col xs={0} md={4}>
                                            Status
                                        </Col>
                                    </Row>
                                </Card>
                                <List
                                    footer={
                                        this.state.hasMore && (
                                            <Button type="link" block style={{ marginBottom: 49, marginTop: 22 }}>
                                                <Space size={9} style={{ color: "#53575E" }}>
                                                    Lainnya
                                                    <img style={{ padding: 0, margin: 0 }} src={SvgLainnya} alt="share" height={5} />
                                                </Space>
                                            </Button>
                                        )
                                    }
                                    dataSource={jobApplications || []}
                                    split={false}
                                    locale={{
                                        emptyText: <Card>No Post</Card>,
                                    }}
                                    renderItem={(job: any, i: number) => (
                                        <>
                                            <List.Item key={job.id} style={{ padding: 0, marginBottom: 15, width: "100%" }}>
                                                <Card style={{ width: "100%", fontFamily: "Open Sans", fontSize: 12, color: "#53575E" }} className="listmylastapplied">
                                                    <Row justify="space-between">
                                                        <Col xs={0} md={4}>
                                                            <p>{job.jobName}</p>
                                                        </Col>
                                                        <Col xs={0} md={4}>
                                                            <p>{job.companyName}</p>
                                                        </Col>
                                                        <Col xs={0} md={4}>
                                                            <p>{moment(job.createdAt).format("ll")}</p>
                                                        </Col>
                                                        <Col xs={0} md={4}>
                                                            <p>{job.positionLevel}</p>
                                                        </Col>
                                                        <Col xs={0} md={4}>
                                                            {job.status === "Interview" ? (
                                                                <Button type="default" className="btnmobilemylast" style={{ backgroundColor: "green", color: "white" }}>
                                                                    {job.status}
                                                                </Button>
                                                            ) : (
                                                                <Button type="primary" className="btnmobilemylast">
                                                                    {job.status}
                                                                </Button>
                                                            )}
                                                        </Col>
                                                        <Col xs={24} md={0}>
                                                            <Row>
                                                                <Col>
                                                                    <p className="listtitleMobile">Job Title :</p>
                                                                </Col>
                                                                <Col>
                                                                    <p> {job.jobName}</p>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col xs={24} md={0}>
                                                            <Row>
                                                                <Col>
                                                                    <p className="listtitleMobile">Company :</p>
                                                                </Col>
                                                                <Col>
                                                                    <p> {job.companyName}</p>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col xs={24} md={0}>
                                                            <Row>
                                                                <Col>
                                                                    <p className="listtitleMobile">Applied On :</p>
                                                                </Col>
                                                                <Col>
                                                                    <p> {moment(job.createdAt).format("ll")}</p>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col xs={24} md={0}>
                                                            <Row>
                                                                <Col>
                                                                    <p className="listtitleMobile">Position :</p>
                                                                </Col>
                                                                <Col>
                                                                    <p> {job.positionLevel}</p>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col xs={24} md={0}>
                                                            {job.status === "Interview" ? (
                                                                <Row align="middle">
                                                                    <Col style={{ marginRight: 3 }}>
                                                                        <p className="listtitleMobile">Status : </p>
                                                                    </Col>
                                                                    <Col>
                                                                        <Button type="default" className="btnmobilemylast" style={{ backgroundColor: "green", color: "white", border: "0px" }}>
                                                                            {job.status}
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            ) : (
                                                                <Row align="middle">
                                                                    <Col style={{ marginRight: 3 }}>
                                                                        <p className="listtitleMobile">Status: </p>
                                                                    </Col>
                                                                    <Col>
                                                                        <Button type="primary" className="btnmobilemylast">
                                                                            {job.status}
                                                                        </Button>
                                                                    </Col>
                                                                </Row>
                                                            )}
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </List.Item>
                                        </>
                                    )}
                                >
                                    {this.state.loading && this.state.hasMore && <Spin indicator={<FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />} />}
                                </List>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={24} md={8} xl={8}>
                        <JobRecommendation />
                    </Col>
                </Row>
                <JobEvent />
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    currentUser: state.account.currentUser,
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Job));
