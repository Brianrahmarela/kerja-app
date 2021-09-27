import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tabs, Col, Input, Row, Typography, Divider, Button, Card, List, Space, Avatar, Badge } from "antd";
import { AxiosResponse } from "axios";
import moment from "moment";
import React from "react";
import { withTranslation } from "react-i18next";
// import InfiniteScroll from "react-infinite-scroller";
import { connect } from "react-redux";

import { getSearchJob } from "../../../repository/JobRepo";
import SvgTime from "../../../assets/svg/time.svg";
import SvgNotifJobAlert from "../../../assets/svg/notif-job-alert-settings.svg";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import SvgLainnya from "../../../assets/svg/lainnya-icon.svg";
import SvgApplicant from "../../../assets/svg/applicant-icon.svg";
import SvgQuickView from "../../../assets/svg/quick-view-icon.svg";
import AvaApplied from "../../../assets/image/avatar-applied.png";

import Bookmark from "./my-jobs-component/Bookmark";
import All from "./my-jobs-component/All";

const { Search } = Input;
const { Text } = Typography;
const { TabPane } = Tabs;

export interface JobProps {
    currentUser?: any;
}

export interface JobState {
    hasMore: boolean;
    loading: boolean;
    scrolled: boolean;
    appliedJobs: any[];
    pagination: any;
    valSearch: any;
}

class MyJobsApplied extends React.Component<JobProps, JobState> {
    state = {
        hasMore: true,
        loading: false,
        scrolled: false,
        appliedJobs: [
            {
                id: 1,
                Jobtitle: "Fashion Designer",
                company: "Lorem Ipsum",
                applicant: "123 Applicant",
                position: "Full time",
                appliedOn: "45 minutes ago",
                postedOn: "5 hours ago",
                salary: "Rp. 3.000.000 - Rp. 5.000.000",
                status: "Applied",
            },
            {
                id: 2,
                Jobtitle: "Fashion Designer",
                company: "Lorem Ipsum",
                applicant: "123 Applicant",
                position: "Full time",
                appliedOn: "45 minutes ago",
                postedOn: "5 hours ago",
                salary: "Rp. 3.000.000 - Rp. 5.000.000",
                status: "Applied",
            },
            {
                id: 3,
                Jobtitle: "Fashion Designer",
                company: "Lorem Ipsum",
                applicant: "123 Applicant",
                position: "Full time",
                appliedOn: "45 minutes ago",
                postedOn: "5 hours ago",
                salary: "Rp. 3.000.000 - Rp. 5.000.000",
                status: "Applied",
            },
            {
                id: 4,
                Jobtitle: "Fashion Designer",
                company: "Lorem Ipsum",
                applicant: "123 Applicant",
                position: "Full time",
                appliedOn: "45 minutes ago",
                postedOn: "5 hours ago",
                salary: "Rp. 3.000.000 - Rp. 5.000.000",
                status: "Applied",
            },
            {
                id: 5,
                Jobtitle: "Fashion Designer",
                company: "Lorem Ipsum",
                applicant: "123 Applicant",
                position: "Full time",
                appliedOn: "45 minutes ago",
                postedOn: "5 hours ago",
                salary: "Rp. 3.000.000 - Rp. 5.000.000",
                status: "Applied",
            },
            {
                id: 6,
                Jobtitle: "Fashion Designer",
                company: "Lorem Ipsum",
                applicant: "123 Applicant",
                position: "Full time",
                appliedOn: "45 minutes ago",
                postedOn: "5 hours ago",
                salary: "Rp. 3.000.000 - Rp. 5.000.000",
                status: "Applied",
            },
        ] as any[],

        pagination: {
            page: 1,
            total: 0,
            position: "",
            location: "",
            status: "",
            salary: "",
            salaryAbove20: "",
        },
        valSearch: "",
    };
    onSearch = (valSearch: string) => {
        console.log("val search:", valSearch);
    };
    componentDidMount() {
        window.document.title = "Job | KerjaApp";
    }
    callback(key: any) {
        console.log(key);
    }
    loadMore = (e: any) => {
        // const { pagination, jobs, jobsRecomendation } = this.state;
        const { pagination, appliedJobs } = this.state;
        this.setState({
            loading: true,
        });

        this.setState({
            pagination: {
                ...pagination,
                page: e,
            },
        });

        getSearchJob(pagination)
            .then((res: AxiosResponse<any>) => {
                let newPostingList: any[] = res.data.content?.concat(appliedJobs) as any[];
                newPostingList = newPostingList.sort((a: any, b: any) => moment(b.createdAt).diff(moment(a.createdAt)));
                this.setState({
                    appliedJobs: newPostingList,
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
        // const { currentUser } = this.props;
        const { appliedJobs } = this.state;
        // const { jobsRecomendation } = this.state;
        return (
            <div className="my-job-applied">
                <Row style={{ marginTop: 64, marginBottom: 25.5 }} justify="space-around" align="middle">
                    <Col xs={24} md={13}>
                        <Row align="middle" style={{ marginBottom: 10 }}>
                            <Text className="JobTitle">My Jobs</Text>
                        </Row>
                    </Col>
                    <Col md={1}></Col>
                    <Col md={10} style={{ textAlign: "right" }}>
                        {/* <FontAwesomeIcon icon={faBookmark} /> My Job */}

                        <Search
                            placeholder=""
                            allowClear
                            enterButton="Search Job"
                            // size="middle"
                            onSearch={this.onSearch}
                            suffix={<FontAwesomeIcon icon={faSearch} />}
                        />
                    </Col>
                </Row>
                <Divider style={{ margin: "12px 0px", padding: 0 }} />

                <Row>
                    {/* <Row > */}
                    {/* <Col > */}
                    <Tabs
                        defaultActiveKey="2"
                        onChange={this.callback}
                        tabBarExtraContent={
                            <Link to={`/job/my-jobs-applied/job-alert-settings`}>
                                <Row>
                                    <Col xs={0} md={24}>
                                        <Button type="link" block style={{ padding: 0, margin: 0 }}>
                                            <img src={SvgNotifJobAlert} alt="jobalertsettings" height={16} style={{ marginRight: 9 }} />
                                            Job Alert Settings
                                        </Button>
                                    </Col>
                                </Row>
                            </Link>
                        }
                        tabBarGutter={24}
                    >
                        <TabPane
                            tab={
                                <Button type="ghost" className="btntabMyJob">
                                    All
                                </Button>
                            }
                            key="1"
                        >
                            <All />
                        </TabPane>
                        <TabPane
                            tab={
                                <Button type="ghost" className="btntabMyJob">
                                    Applied
                                </Button>
                            }
                            key="2"
                        >
                            {/* <Row style={{ marginTop: 22, backgroundColor: "yellow" }} align="middle"> */}
                            <Row justify="end">
                                <Col xs={12} md={0}>
                                    <Link to={`/home`}>
                                        <Button type="link" block style={{ padding: 0, margin: 0 }}>
                                            <img src={SvgNotifJobAlert} alt="jobalertsettings" height={16} style={{ marginRight: 9 }} />
                                            Job Alert Settings
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: 22, marginBottom: 30 }} align="middle">
                                <Col style={{ marginRight: 9 }}>
                                    <img style={{ padding: 0, margin: 0 }} src={SvgTime} alt="myLastappliedjob" height={22} />
                                </Col>
                                <Col>
                                    <Text className="subtitlejob">Applied Job</Text>
                                </Col>
                            </Row>
                            <InfiniteScroll initialLoad={true} pageStart={0} loadMore={this.loadMore} hasMore={!this.state.loading && this.state.hasMore} useWindow={true}>
                                <List
                                    dataSource={appliedJobs || []}
                                    split={false}
                                    locale={{
                                        emptyText: <Card>No Post</Card>,
                                    }}
                                    renderItem={(job: any, i: number) => (
                                        <div>
                                            <List.Item key={job.id} style={{ padding: 0, marginBottom: 15, width: "100%" }}>
                                                <Card style={{ borderRadius: 8, border: "0.1px solid #2C9BE6" }} bordered={true} className="cardApplied">
                                                    <Row justify="space-between" style={{ fontFamily: "Open Sans" }}>
                                                        <Col xs={0} md={4}>
                                                            <span className="avatar-item">
                                                                <Badge count={1} className="badgeApplied">
                                                                    <Avatar shape="square" src={AvaApplied} size={{ xs: 0, sm: 91, md: 91, lg: 131, xl: 131, xxl: 131 }} />
                                                                </Badge>
                                                            </span>
                                                        </Col>
                                                        <Col xs={24} md={20}>
                                                            <Row justify="space-between">
                                                                {/* <Col xs={24} md={24} lg={18} style={{ backgroundColor: "yellow" }}> */}
                                                                <Col xs={24} md={24} lg={18}>
                                                                    <Row align="middle">
                                                                        <Col xs={24} md={7} style={{ marginRight: 15, marginBottom: 5 }}>
                                                                            <Text className="jobTitleList">{job.Jobtitle}</Text>
                                                                        </Col>
                                                                        <Col className="gapLine" xs={0} md={1}>
                                                                            |
                                                                        </Col>
                                                                        <Col xs={24} md={4} style={{ marginBottom: 5 }}>
                                                                            <Text>{job.company}</Text>
                                                                        </Col>
                                                                        <Col className="gapLine" xs={0} md={1}>
                                                                            |
                                                                        </Col>
                                                                        <Col xs={24} md={5} style={{ marginBottom: 5 }}>
                                                                            <Row>
                                                                                <Col>
                                                                                    <img src={SvgApplicant} alt="SvgAaplicant" height={10} style={{ marginRight: 9 }} />
                                                                                </Col>
                                                                                <Col>
                                                                                    <Text>{job.applicant}</Text>
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                        <Col className="gapLine" xs={0} md={1}>
                                                                            |
                                                                        </Col>
                                                                        <Col xs={24} md={4} style={{ marginBottom: 5 }}>
                                                                            <Text>{job.position}</Text>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                {/* <Col md={4} lg={3} style={{ backgroundColor: "red" }}><Button type="link" block style={{ padding: 0, margin: 0, }}><img */}
                                                                <Col md={4} lg={3}>
                                                                    <Button type="link" block style={{ padding: 0, margin: 0 }}>
                                                                        <img src={SvgQuickView} alt="quickview" height={10} style={{ marginRight: 9 }} />
                                                                        Quick View
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                            <Divider style={{ margin: "15px 0px", padding: 0 }} />
                                                            <Row style={{ marginBottom: 5 }}>
                                                                <Col>
                                                                    <Text style={{ fontWeight: 600 }}>Applied On</Text> <Text style={{ marginLeft: 15, marginRight: 15 }}>: </Text> {job.appliedOn}
                                                                </Col>
                                                            </Row>
                                                            <Row style={{ marginBottom: 5 }}>
                                                                <Col>
                                                                    <Text style={{ fontWeight: 600 }}>Posted On</Text> <Text style={{ marginLeft: 20, marginRight: 15 }}>: </Text> {job.postedOn}
                                                                </Col>
                                                            </Row>
                                                            <Row justify="space-between" style={{ marginBottom: 5 }}>
                                                                <Col style={{ marginBottom: 15 }}>
                                                                    <Text style={{ fontWeight: 600 }}>Salary</Text> <Text style={{ marginLeft: 49, marginRight: 15 }}>: </Text>
                                                                    <Text style={{ color: "#2C9BE6" }}>{job.salary}</Text>
                                                                </Col>
                                                                <Col>
                                                                    <Row align="middle">
                                                                        <Button type="default" className="btnmobilemylast" style={{ backgroundColor: "#EFEFEF", color: "#53575E", border: "0px" }}>
                                                                            {job.status}
                                                                        </Button>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            </List.Item>
                                        </div>
                                    )}
                                >
                                    {/* {this.state.loading && this.state.hasMore && <Spin indicator={<FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />} />} */}
                                </List>
                                <Button type="link" block style={{ marginBottom: 49, marginTop: 22 }}>
                                    <Space size={9} style={{ color: "#53575E" }}>
                                        Lainnya
                                        <img style={{ padding: 0, margin: 0 }} src={SvgLainnya} alt="share" height={5} />
                                    </Space>
                                </Button>
                            </InfiniteScroll>
                        </TabPane>
                        <TabPane
                            tab={
                                <Button type="ghost" className="btntabMyJob">
                                    On-Progress
                                </Button>
                            }
                            key="3"
                        >
                            On-Progress Content
                        </TabPane>
                        <TabPane
                            tab={
                                <Button type="ghost" className="btntabMyJob">
                                    Accepted
                                </Button>
                            }
                            key="4"
                        >
                            Accepted Content
                        </TabPane>
                        <TabPane
                            tab={
                                <Button type="ghost" className="btntabMyJob">
                                    Closed
                                </Button>
                            }
                            key="5"
                        >
                            Closed Content
                        </TabPane>
                        <TabPane
                            tab={
                                <Button type="ghost" className="btntabMyJob">
                                    Bookmark
                                </Button>
                            }
                            key="6"
                        >
                            <Bookmark />
                        </TabPane>
                    </Tabs>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    currentUser: state.account.currentUser,
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(MyJobsApplied));
