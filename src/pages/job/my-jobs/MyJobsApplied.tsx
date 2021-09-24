import { faSearch, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tabs, Col, Input, Row, Typography, Divider, Button, Card, List, Spin, Space, Avatar, Badge, } from "antd";
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
  allJobs: any[];
  pagination: any;
  valSearch: any;
}

class MyJobsApplied extends React.Component<JobProps, JobState> {
  state = {
    hasMore: true,
    loading: false,
    scrolled: false,
    allJobs: [
      {
        "id": 1,
        "Jobtitle": "Fashion Designer",
        "company": "Lorem Ipsum",
        "applicant": "123 Applicant",
        "position": "Full time",
        "appliedOn": "45 minutes ago",
        "postedOn": "5 hours ago",
        "salary": "Rp. 3.000.000 - Rp. 5.000.000",
        "status": "Applied",
      },
      {
        "id": 2,
        "Jobtitle": "Fashion Designer",
        "company": "Lorem Ipsum",
        "applicant": "123 Applicant",
        "position": "Full time",
        "appliedOn": "45 minutes ago",
        "postedOn": "5 hours ago",
        "salary": "Rp. 3.000.000 - Rp. 5.000.000",
        "status": "Applied",

      },
      {
        "id": 3,
        "Jobtitle": "Fashion Designer",
        "company": "Lorem Ipsum",
        "applicant": "123 Applicant",
        "position": "Full time",
        "appliedOn": "45 minutes ago",
        "postedOn": "5 hours ago",
        "salary": "Rp. 3.000.000 - Rp. 5.000.000",
        "status": "Applied",

      },
      {
        "id": 4,
        "Jobtitle": "Fashion Designer",
        "company": "Lorem Ipsum",
        "applicant": "123 Applicant",
        "position": "Full time",
        "appliedOn": "45 minutes ago",
        "postedOn": "5 hours ago",
        "salary": "Rp. 3.000.000 - Rp. 5.000.000",
        "status": "Applied",

      },
      {
        "id": 5,
        "Jobtitle": "Fashion Designer",
        "company": "Lorem Ipsum",
        "applicant": "123 Applicant",
        "position": "Full time",
        "appliedOn": "45 minutes ago",
        "postedOn": "5 hours ago",
        "salary": "Rp. 3.000.000 - Rp. 5.000.000",
        "status": "Applied",

      },
      {
        "id": 6,
        "Jobtitle": "Fashion Designer",
        "company": "Lorem Ipsum",
        "applicant": "123 Applicant",
        "position": "Full time",
        "appliedOn": "45 minutes ago",
        "postedOn": "5 hours ago",
        "salary": "Rp. 3.000.000 - Rp. 5.000.000",
        "status": "Applied",

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
  callback(key: any) {
    console.log(key);
  }
  loadMore = (e: any) => {
    // const { pagination, jobs, jobsRecomendation } = this.state;
    const { pagination, allJobs, } = this.state;
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
        let newPostingList: any[] = res.data.content?.concat(allJobs) as any[];
        newPostingList = newPostingList.sort((a: any, b: any) => moment(b.createdAt).diff(moment(a.createdAt)));
        this.setState({
          allJobs: newPostingList,
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
    const { allJobs } = this.state;
    // const { jobsRecomendation } = this.state;
    return (
      <div className="job-page">
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
        <Divider style={{ margin: '12px 0px', padding: 0, }} />

        {/* <Row style={{ backgroundColor: "honeydew" }}> */}
        <Row >
          {/* <Col > */}
          <Tabs defaultActiveKey="2" onChange={this.callback} tabBarExtraContent={
            <Link to={`/home`} >

              <Button type="link" block style={{ padding: 0, margin: 0, }}><img
                src={SvgNotifJobAlert}
                alt="jobalertsettings"
                height={16}
                style={{ marginRight: 9, }}
              />
                Job Alert Settings</Button>
            </Link>
          }
            tabBarGutter={24}
          >
            <TabPane tab={<Button type="ghost" className="btntabMyJob">All</Button>} key="1" >
              All content
            </TabPane>
            <TabPane tab={<Button type="ghost" className="btntabMyJob">Applied</Button>} key="2">
              {/* <Row style={{ marginTop: 22, backgroundColor: "yellow" }} align="middle"> */}
              <Row style={{ marginTop: 22, marginBottom: 30 }} align="middle">
                <Col style={{ marginRight: 9 }}>
                  <img style={{ padding: 0, margin: 0, }}
                    src={SvgTime}
                    alt="myLastappliedjob"
                    height={22}
                  />
                </Col>
                <Col>
                  <Text className="subtitlejob">Applied Job</Text>
                </Col>
              </Row>
              <InfiniteScroll initialLoad={true} pageStart={0} loadMore={this.loadMore} hasMore={!this.state.loading && this.state.hasMore} useWindow={true} className="mobilehiddenmylast">
                <List
                  dataSource={allJobs || []}
                  split={false}
                  locale={{
                    emptyText: <Card>No Post</Card>,
                  }}
                  renderItem={(job: any, i: number) => (
                    <div>
                      <List.Item key={job.id} style={{ padding: 0, marginBottom: 15, width: "100%", }}>
                        <Card style={{ borderRadius: 8, border: '0.1px solid #2C9BE6', }} bordered={true} className="cardApplied">

                          <Row justify="space-between" style={{ fontFamily: "Open Sans" }}>
                            <Col span={4} >
                              <span className="avatar-item">
                                <Badge count={1} className="badgeApplied">
                                  <Avatar shape="square" src={AvaApplied} size={131} />
                                </Badge>
                              </span>
                            </Col>
                            <Col span={20} >
                              <Row justify="space-between" >
                                <Col>
                                  <Row align="middle">
                                    <Space size={15}>
                                      <Col>
                                        <Text className="jobTitleList">{job.Jobtitle}</Text>
                                      </Col>
                                      <Col className="gapLine">|</Col>
                                      <Col>
                                        <Text>{job.company}</Text>
                                      </Col>
                                      <Col className="gapLine">|</Col>
                                      <Col>
                                        <Row>
                                          <Col>
                                            <img
                                              src={SvgApplicant}
                                              alt="SvgAaplicant"
                                              height={10}
                                              style={{ marginRight: 9, }}
                                            />
                                          </Col>
                                          <Col>
                                            <Text>{job.applicant}</Text>
                                          </Col>
                                        </Row>
                                      </Col>
                                      <Col className="gapLine">|</Col>
                                      <Col>
                                        <Text>{job.position}</Text>
                                      </Col>
                                    </Space>
                                  </Row>
                                </Col>
                                <Col><Button type="link" block style={{ padding: 0, margin: 0, }}><img
                                  src={SvgQuickView}
                                  alt="jobalertsettings"
                                  height={10}
                                  style={{ marginRight: 9, }}
                                />
                                  Quick View</Button></Col>
                              </Row>
                              <Divider style={{ margin: '8px 0px', padding: 0, }} />
                              <Row style={{ marginBottom: 9 }}>
                                <Col>
                                  <Text style={{ fontWeight: 600, }}>Applied On</Text> <Text style={{ marginLeft: 15, marginRight: 15 }}>: </Text> {job.appliedOn}
                                </Col>

                              </Row>
                              <Row style={{ marginBottom: 9 }}>
                                <Col>
                                  <Text style={{ fontWeight: 600 }}>Posted On</Text> <Text style={{ marginLeft: 21, marginRight: 15 }}>: </Text> {job.postedOn}
                                </Col>
                              </Row>
                              <Row justify="space-between" style={{ marginBottom: 9 }}>
                                <Col>
                                  <Text style={{ fontWeight: 600 }}>Salary</Text> <Text style={{ marginLeft: 48, marginRight: 15, }}>: </Text>
                                  <Text style={{ color: "#2C9BE6" }}>
                                    {job.salary}
                                  </Text>
                                </Col>
                                <Col>
                                  <Row align="middle">
                                    <Button type="default" className="btnmobilemylast" style={{ backgroundColor: "#EFEFEF", color: "#53575E", border: '0px' }} >{job.status}</Button>
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
            </TabPane>
            <TabPane tab={<Button type="ghost" className="btntabMyJob">On-Progress</Button>} key="3">
              On-Progress Content
            </TabPane>
            <TabPane tab={<Button type="ghost" className="btntabMyJob">Accepted</Button>} key="4">
              Accepted Content
            </TabPane>
            <TabPane tab={<Button type="ghost" className="btntabMyJob">Closed</Button>} key="5">
              Closed Content
            </TabPane>
            <TabPane tab={<Button type="ghost" className="btntabMyJob">Bookmark</Button>} key="6">
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

