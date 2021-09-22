import { faCircleNotch, faSearch, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Image, Col, Input, List, Row, Space, Spin, Typography, Divider } from "antd";
import { AxiosResponse } from "axios";
import moment from "moment";
import React from "react";
import { withTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroller";
import { connect } from "react-redux";

import { getSearchJob } from "../../../repository/JobRepo";
import SvgTime from "../../../assets/svg/time.svg";
import SvgMyJob from "../../../assets/svg/my-job.svg";
import SvgPlace from "../../../assets/svg/place-icon.svg";
import SvgSaved from "../../../assets/svg/saved-icon.svg";
import SvgShare from "../../../assets/svg/share-icon.svg";
import ImgRecomendation from "../../../assets/image/img-recomendation.png";
import SvgLainnya from "../../../assets/svg/lainnya-icon.svg";


import JobEvent from "./job-component/JobEvent";

const { Search } = Input;
const { Text } = Typography;

export interface JobProps {
    currentUser?: any;
}

export interface JobState {
    hasMore: boolean;
    loading: boolean;
    scrolled: boolean;
    jobs: any[];
    jobsRecomendation: any[];
    pagination: any;
    valSearch: any;
}

class Job extends React.Component<JobProps, JobState> {
    state = {
        hasMore: true,
        loading: false,
        scrolled: false,
        jobs: [
            {
                "id": 1,
                "Jobtitle": "Fashion Designer",
                "company": "Lorem Ipsum",
                "appliedon": "45 minutes ago",
                "position": "Full time",
                "status": "Interview",
            },
            {
                "id": 2,
                "Jobtitle": "Merchandiser",
                "company": "Colin Fashion",
                "appliedon": "10/ 08/ 21",
                "position": "Full time",
                "status": "On Process",
            },
            {
                "id": 3,
                "Jobtitle": "Fashion Pattern",
                "company": "Salvadore Salie",
                "appliedon": "10/ 08/ 21",
                "position": "Full time",
                "status": "On Process",
            },
            {
                "id": 4,
                "Jobtitle": "Creative Designer",
                "company": "Hijabers Fashion Ind ...",
                "appliedon": "10/ 08/ 21",
                "position": "Full time",
                "status": "On Process",
            },
            {
                "id": 5,
                "Jobtitle": "Fashion Designer",
                "company": "Lorem Ipsum",
                "appliedon": "10/ 08/ 21",
                "position": "Full time",
                "status": "On Process",
            }
        ] as any[],
        jobsRecomendation: [
            {
                "id": 1,
                "Jobtitle": "Fashion Designer",
                "name": "Salvadore Salie",
                "place": "DKI Jakarta",
                "status": "Penuh Waktu / Kontrak",
                "gaji": "Rp 3.000.000 - Rp 5.000.000",
                "time": "2 h",
            },
            {
                "id": 2,
                "Jobtitle": "Fashion Tes",
                "name": "Saliem",
                "place": "Depok",
                "status": "Magang",
                "gaji": "Rp 1.000.000 - Rp 2.000.000",
                "time": "3 days ago",

            },
            {
                "id": 3,
                "Jobtitle": "Developer",
                "name": "No 3",
                "place": "Papua",
                "status": "Magang",
                "gaji": "Rp 5000.000 - Rp 1.000.000",
                "time": "2 days ago",

            },
            {
                "id": 4,
                "Jobtitle": "Tes 4",
                "name": "no 4",
                "place": "Depok",
                "status": "Kontrak",
                "gaji": "Rp 9.000.000 - Rp 2.000.000",
                "time": "0 days ago",

            }
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
    }
    componentDidMount() {
        window.document.title = "Job | KerjaApp";
    }
    loadMore = (e: any) => {
        // const { pagination, jobs, jobsRecomendation } = this.state;
        const { pagination, jobs, } = this.state;
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
                let newPostingList: any[] = res.data.content?.concat(jobs) as any[];
                newPostingList = newPostingList.sort((a: any, b: any) => moment(b.createdAt).diff(moment(a.createdAt)));
                this.setState({
                    jobs: newPostingList,
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
        const { jobs } = this.state;
        const { jobsRecomendation } = this.state;
        return (
            <div className="job-page">
                <Row style={{ marginTop: 15 }} justify="space-around" align="middle">
                    <Col xs={24} md={13}>
                        <Row align="middle" style={{ marginBottom: 10 }}>
                            <Space size={9}>
                                <Col>
                                    <Text className="JobTitle">Hi, </Text>
                                </Col>
                                <Col>
                                    <Text className="JobTitle2">Sheyla! {currentUser?.firstName}</Text>{currentUser?.firstName}
                                </Col>
                            </Space>
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
                <Row style={{ marginTop: 22 }}>
                    <Col md={16} xl={13}>
                        <Row justify="space-around" style={{ marginBottom: 26 }} className="marginbtmmobile">
                            <Col xs={15} md={12}>
                                <Row align="middle" >
                                    {/* <Space size={9}> */}
                                    <Col style={{ marginRight: 9 }}>
                                        <img style={{ padding: 0, margin: 0, }}
                                            src={SvgTime}
                                            alt="myLastappliedjob"
                                            height={22}
                                        />
                                    </Col>
                                    <Col>
                                        <Text className="subtitlejob">My Last Applied Job </Text>
                                    </Col>
                                    {/* </Space> */}
                                </Row>
                            </Col>
                            <Col xs={9} md={12} style={{ textAlign: "right" }}>
                                <Row align="middle" justify="end">
                                    <Col>
                                        <Button type="primary" icon={<img src={SvgMyJob} alt="logokerjaapp" style={{ marginRight: 7, }} />} className="txtmyjob">
                                            My Job
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 15 }}>

                            <Col md={24}>
                                {/* TABLET & DESKTOP  */}
                                <InfiniteScroll initialLoad={true} pageStart={0} loadMore={this.loadMore} hasMore={!this.state.loading && this.state.hasMore} useWindow={true} className="mobilehiddenmylast">
                                    <Card className="titlemylastapplied">

                                        {/* <Row justify="space-between" style={{ backgroundColor: "green" }}> */}
                                        <Row justify="space-between" >

                                            <Col xs={0} md={4} >
                                                Job Title

                                            </Col>
                                            <Col xs={0} md={4} >
                                                Company

                                            </Col>
                                            <Col xs={0} md={4} >
                                                Applied On

                                            </Col>
                                            <Col xs={0} md={4} >
                                                Position

                                            </Col>
                                            <Col xs={0} md={4} >
                                                Status

                                            </Col>
                                        </Row>
                                    </Card>
                                    <List
                                        dataSource={jobs || []}
                                        split={false}
                                        locale={{
                                            emptyText: <Card>No Post</Card>,
                                        }}
                                        renderItem={(job: any, i: number) => (
                                            <div>
                                                {/* `{console.log(job)}` */}
                                                <List.Item key={job.id} style={{ padding: 0, marginBottom: 15, width: "100%", }}>
                                                    <Card style={{ width: "100%", fontFamily: "Open Sans", fontSize: 12, color: "#53575E" }} className="listmylastapplied">
                                                        <Row justify="space-between" >
                                                            <Col xs={0} md={4} >
                                                                {/* <p>{job}</p> */}
                                                                <p>{job.Jobtitle}</p>

                                                            </Col>
                                                            <Col xs={0} md={4} >
                                                                <p>{job.company}</p>

                                                            </Col>
                                                            <Col xs={0} md={4} >
                                                                <p>{job.appliedon}</p>

                                                            </Col>
                                                            <Col xs={0} md={4} >
                                                                <p>{job.position}</p>

                                                            </Col>
                                                            <Col xs={0} md={4} >
                                                                {job.status === "Interview" ? (


                                                                    <Button type="default" className="btnmobilemylast" style={{ backgroundColor: "green", color: "white" }}>{job.status}</Button>

                                                                ) : (



                                                                    <Button type="primary" className="btnmobilemylast">{job.status}</Button>


                                                                )

                                                                }

                                                            </Col>

                                                        </Row>
                                                    </Card>
                                                </List.Item>
                                            </div>
                                        )}
                                    >
                                        {this.state.loading && this.state.hasMore && <Spin indicator={<FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />} />}
                                    </List>
                                    <Button type="link" block style={{ marginBottom: 49, marginTop: 22 }}>
                                        <Space size={9} style={{ color: "#53575E", }}>
                                            Lainnya
                                            <img style={{ padding: 0, margin: 0, }}
                                                src={SvgLainnya}
                                                alt="share"
                                                height={5}
                                            />
                                        </Space>
                                    </Button>
                                </InfiniteScroll>

                                {/* MOBILE VIEW */}
                                <InfiniteScroll initialLoad={true} pageStart={0} loadMore={this.loadMore} hasMore={!this.state.loading && this.state.hasMore} useWindow={true} className="mobileshowmylast">
                                    <List
                                        dataSource={jobs || []}
                                        split={false}
                                        locale={{
                                            emptyText: <Card>No Post</Card>,
                                        }}
                                        renderItem={(job: any, i: number) => (
                                            <div>
                                                {/* `{console.log(job)}` */}
                                                <List.Item key={job.id} style={{ padding: 0, marginBottom: 15, width: "100%", }}>
                                                    <Card style={{ width: "100%", fontFamily: "Open Sans", color: "#53575E" }} className="listmylastapplied">
                                                        <Row justify="space-between" >
                                                            <Col xs={24} md={4} >
                                                                {/* <p>{job}</p> */}
                                                                <p>Job Title: {job.Jobtitle}</p>
                                                            </Col>
                                                            <Col xs={24} md={4} >
                                                                <p>Company: {job.company}</p>
                                                            </Col>
                                                            <Col xs={24} md={4} >
                                                                <p>Applied On: {job.appliedon}</p>
                                                            </Col>
                                                            <Col xs={24} md={4} >
                                                                <p>Position: {job.position}</p>
                                                            </Col>
                                                            <Col xs={24} md={4} >
                                                                {job.status === "Interview" ? (
                                                                    <Row align="middle">
                                                                        <Space size={9}>
                                                                            <Col>
                                                                                <p>Status: </p>
                                                                            </Col>
                                                                            <Col>
                                                                                <Button type="default" className="btnmobilemylast" style={{ backgroundColor: "green", color: "white" }}>{job.status}</Button>
                                                                            </Col>
                                                                        </Space>
                                                                    </Row>
                                                                ) : (
                                                                    <Row align="middle">
                                                                        <Space size={9}>
                                                                            <Col>
                                                                                <p>Status: </p>
                                                                            </Col>
                                                                            <Col>
                                                                                <Button type="primary" className="btnmobilemylast" >{job.status}</Button>
                                                                            </Col>
                                                                        </Space>
                                                                    </Row>
                                                                )
                                                                }
                                                            </Col>
                                                        </Row>
                                                    </Card>
                                                </List.Item>
                                            </div>
                                        )}
                                    >
                                        {this.state.loading && this.state.hasMore && <Spin indicator={<FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />} />}
                                    </List>
                                    <Button type="link" block style={{ marginBottom: 49, marginTop: 22 }}>
                                        <Space size={9} style={{ color: "#53575E", }}>

                                            Lainnya
                                            <img style={{ padding: 0, margin: 0, }}
                                                src={SvgLainnya}
                                                alt="share"
                                                height={5}
                                            />
                                        </Space>

                                    </Button>
                                </InfiniteScroll>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={1} xl={1}></Col>
                    <Col md={7} xl={10}>
                        <div>
                            {/* <FontAwesomeIcon icon={faFilter} style={{ marginRight: 10 }} /> */}
                            {/* Filter Pencarian */}
                            <Text className="subtitlejob">Recommendation Job</Text>
                        </div>
                        {/* <Row style={{ padding: '15px 0px 0px 0px', backgroundColor: "greenyellow", }} > */}
                        <Row style={{ padding: '15px 0px 0px 0px', }} >
                            <InfiniteScroll initialLoad={true} pageStart={0} loadMore={this.loadMore} hasMore={!this.state.loading && this.state.hasMore} useWindow={true}>
                                <List
                                    dataSource={jobsRecomendation || []}
                                    split={false}
                                    locale={{
                                        emptyText: <Card>No Post</Card>,
                                    }}
                                    renderItem={(jobRecomendation: any, i: number) => (
                                        <Space direction="vertical" style={{ paddingRight: 10, paddingBottom: 10, fontFamily: 'Open Sans' }}>
                                            <Card style={{ width: 187, height: '100%', borderRadius: 8 }} bordered={true} className="cardRecomen">
                                                <Space size={12} direction="vertical">
                                                    <Row justify="space-between">
                                                        <Col span={19}>
                                                            <Row style={{ fontSize: 13, fontWeight: 600 }}>
                                                                {jobRecomendation.Jobtitle}
                                                            </Row>
                                                            <Row style={{ fontSize: 11, color: "#53575E" }}>
                                                                {jobRecomendation.name}
                                                            </Row>
                                                        </Col>
                                                        <Col span={5}><Image src={ImgRecomendation} preview={false} /></Col>
                                                    </Row>
                                                    <Divider style={{ margin: 0, padding: 0, }} />
                                                    <Row>
                                                        <Space size={6}>
                                                            <Col>
                                                                <img style={{ padding: 0, margin: 0, }}
                                                                    src={SvgPlace}
                                                                    alt="place"
                                                                    height={13}
                                                                />
                                                            </Col>
                                                            <Col style={{ color: '#53575E', fontSize: 10, paddingTop: 2 }}>
                                                                {jobRecomendation.place}
                                                            </Col>
                                                        </Space>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Row >
                                                                <Text style={{ color: '#53575E', fontSize: 10, }}>
                                                                    Status Pekerjaan :
                                                                </Text>
                                                            </Row>
                                                            <Row style={{ color: '#2C9BE6', fontSize: 10 }}>
                                                                {jobRecomendation.status}
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ color: '#53575E', fontSize: 10 }}>
                                                        <Row>
                                                            Gaji :
                                                        </Row>
                                                        <Row>
                                                            <Text style={{ color: '#2C9BE6', fontSize: 10 }}>
                                                                {jobRecomendation.gaji}
                                                            </Text>
                                                        </Row>
                                                    </Row>

                                                    <Row justify="space-between">
                                                        <Col style={{ fontSize: 10, fontWeight: 300 }}>
                                                            {jobRecomendation.time}

                                                        </Col>
                                                        <Col>
                                                            <Row >
                                                                <Space size={9}>
                                                                    <Col>
                                                                        <img style={{ padding: 0, margin: 0, }}
                                                                            src={SvgSaved}
                                                                            alt="saved"
                                                                            height={16}
                                                                        />
                                                                    </Col>
                                                                    <Col>
                                                                        <img style={{ padding: 0, margin: 0, }}
                                                                            src={SvgShare}
                                                                            alt="share"
                                                                            height={16}
                                                                        />
                                                                    </Col>
                                                                </Space>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Space>
                                            </Card>
                                        </Space>
                                    )}
                                >
                                    {this.state.loading && this.state.hasMore && <Spin indicator={<FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />} />}
                                </List>
                                <Button type="link" block style={{ marginBottom: 49, marginTop: 22 }}>
                                    <Space size={9} style={{ color: "#53575E", }}>

                                        Lainnya
                                        <img style={{ padding: 0, margin: 0, }}
                                            src={SvgLainnya}
                                            alt="share"
                                            height={5}
                                        />
                                    </Space>

                                </Button>
                            </InfiniteScroll>

                        </Row>
                    </Col>
                </Row>
                <JobEvent />
                {/* <Row gutter={15} style={{ marginTop: 15 }} justify="start" align="middle">
                    <Col>
                        <Text style={{ fontSize: 18, color: "#53575E", fontWeight: 500 }}>Job Event</Text>
                    </Col>
                </Row> */}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    currentUser: state.account.currentUser,
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Job));

