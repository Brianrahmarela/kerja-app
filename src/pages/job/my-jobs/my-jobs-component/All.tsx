import { Col, Row, Typography, Divider, Button, Card, List, Space, Avatar, Badge, } from "antd";
import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import SvgLainnya from "../../../../assets/svg/lainnya-icon.svg";
import SvgApplicant from "../../../../assets/svg/applicant-icon.svg";
import SvgQuickView from "../../../../assets/svg/quick-view-icon.svg";
import AvaApplied from "../../../../assets/image/avatar-applied.png";
import SvgNotifJobAlert from "../../../../assets/svg/notif-job-alert-settings.svg";
import { Link } from "react-router-dom";

const { Text } = Typography;
export interface JobProps {
  currentUser?: any;
}
export interface JobState {
  hasMore: boolean;
  loading: boolean;
  scrolled: boolean;
  allJobs: any[];
  pagination: any;
}
class All extends React.Component<JobProps, JobState> {
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
        "status": "Interview",
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
        "status": "On Hold",
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
        "status": "Rejected",
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
        "status": "Medical",
      },
      {
        "id": 7,
        "Jobtitle": "Fashion Designer",
        "company": "Lorem Ipsum",
        "applicant": "123 Applicant",
        "position": "Full time",
        "appliedOn": "45 minutes ago",
        "postedOn": "5 hours ago",
        "salary": "Rp. 3.000.000 - Rp. 5.000.000",
        "status": "On Boarding",
      },
      {
        "id": 8,
        "Jobtitle": "Fashion Designer",
        "company": "Lorem Ipsum",
        "applicant": "123 Applicant",
        "position": "Full time",
        "appliedOn": "45 minutes ago",
        "postedOn": "5 hours ago",
        "salary": "Rp. 3.000.000 - Rp. 5.000.000",
        "status": "Test",
      },
      {
        "id": 9,
        "Jobtitle": "Fashion Designer",
        "company": "Lorem Ipsum",
        "applicant": "123 Applicant",
        "position": "Full time",
        "appliedOn": "45 minutes ago",
        "postedOn": "5 hours ago",
        "salary": "Rp. 3.000.000 - Rp. 5.000.000",
        "status": "Completed",
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

  };

  componentDidMount() {
    window.document.title = "Job | KerjaApp";
  }

  loadMore = (e: any) => {
    const { pagination, } = this.state;
    this.setState({
      loading: true,
    });

    this.setState({
      pagination: {
        ...pagination,
        page: e,
      },
    });
  };

  render() {
    const { allJobs } = this.state;
    return (
      <div >
        <Row justify="end">
          <Col xs={12} md={5} lg={0}>
            <Link to={`/job/my-jobs-applied/job-alert-settings`} >

              <Button type="link" block style={{ padding: 0, margin: 0, }}><img
                src={SvgNotifJobAlert}
                alt="jobalertsettings"
                height={16}
                style={{ marginRight: 9, }}
              />
                Job Alert Settings</Button>
            </Link>
          </Col>
        </Row>
        <Row style={{ marginTop: 22, marginBottom: 30 }} align="middle">

          <Text className="subtitlejob">All Jobs</Text>
        </Row>
        <InfiniteScroll initialLoad={true} pageStart={0} loadMore={this.loadMore} hasMore={!this.state.loading && this.state.hasMore} useWindow={true} >
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
                      <Col xs={0} md={5} lg={4}>
                        <span className="avatar-item">
                          <Badge count={1} className="badgeApplied">
                            <Avatar shape="square" src={AvaApplied} size={{ xs: 0, sm: 91, md: 117, lg: 131, xl: 131, xxl: 131 }}
                            />
                          </Badge>
                        </span>
                      </Col>
                      <Col xs={24} md={19} lg={20}>
                        <Row justify="space-between" >
                          {/* <Col xs={24} md={24} lg={18} style={{ backgroundColor: "yellow" }}> */}
                          <Col xs={24} md={24} lg={18} >
                            <Row align="middle" >

                              <Col xs={24} md={7} style={{ marginRight: 15, marginBottom: 5 }}>
                                <Text className="jobTitleList">{job.Jobtitle}</Text>
                              </Col>
                              <Col className="gapLine" xs={0} md={1}>|</Col>
                              <Col xs={24} md={4} style={{ marginBottom: 5 }}>
                                <Text>{job.company}</Text>
                              </Col>
                              <Col className="gapLine" xs={0} md={1}>|</Col>
                              <Col xs={24} md={5} style={{ marginBottom: 5 }}>
                                <Row>
                                  <Col>
                                    <img
                                      src={SvgApplicant}
                                      alt="SvgAaplicant"
                                      height={10}
                                      style={{ marginRight: 9, }}
                                    />
                                  </Col>
                                  <Col >
                                    <Text>{job.applicant}</Text>
                                  </Col>
                                </Row>
                              </Col>
                              <Col className="gapLine" xs={0} md={1}>|</Col>
                              <Col xs={24} md={4} style={{ marginBottom: 5 }}>
                                <Text>{job.position}</Text>
                              </Col>

                            </Row>
                          </Col>
                          {/* <Col md={4} lg={3} style={{ backgroundColor: "red" }}><Button type="link" block style={{ padding: 0, margin: 0, }}><img */}
                          <Col md={4} lg={3} ><Button type="link" block style={{ padding: 0, margin: 0, }}><img
                            src={SvgQuickView}
                            alt="jobalertsettings"
                            height={10}
                            style={{ marginRight: 9, }}
                          />
                            Quick View</Button></Col>
                        </Row>
                        <Divider style={{ margin: '15px 0px', padding: 0, }} />
                        <Row style={{ marginBottom: 5 }}>
                          <Col>
                            <Text style={{ fontWeight: 600, }}>Applied On</Text> <Text style={{ marginLeft: 15, marginRight: 15 }}>: </Text> {job.appliedOn}
                          </Col>

                        </Row>
                        <Row style={{ marginBottom: 5 }}>
                          <Col>
                            <Text style={{ fontWeight: 600 }}>Posted On</Text> <Text style={{ marginLeft: 20, marginRight: 15 }}>: </Text> {job.postedOn}
                          </Col>
                        </Row>
                        <Row justify="space-between" style={{ marginBottom: 5 }}>
                          <Col style={{ marginBottom: 15 }}>
                            <Text style={{ fontWeight: 600 }}>Salary</Text> <Text style={{ marginLeft: 49, marginRight: 15, }}>: </Text>
                            <Text style={{ color: "#2C9BE6" }}>
                              {job.salary}
                            </Text>
                          </Col>
                          <Col>
                            <Row align="middle">
                              {
                                job.status === "Applied" ? (
                                  <Button type="default" className="btnmobilemylast" style={{ backgroundColor: "#EFEFEF", color: "#53575E", border: '0px' }} >{job.status}</Button>
                                ) : job.status === "Interview" ? (
                                  <Button type="default" className="btnmobilemylast" style={{ backgroundColor: "#639164", color: "white", border: '0px' }} >{job.status}</Button>
                                ) : job.status === "Rejected" ? (
                                  <Button type="default" className="btnmobilemylast" style={{ backgroundColor: "#FF0E0E", color: "white", border: '0px' }} >{job.status}</Button>
                                ) : job.status === "Completed" ? (
                                  <Button type="default" className="btnmobilemylast" style={{ backgroundColor: "#52c31b", color: "white", border: '0px' }} >{job.status}</Button>
                                ) : (
                                  <Button type="default" className="btnmobilemylast" style={{ backgroundColor: "#2C9BE6", color: "white", border: '0px' }} >{job.status}</Button>
                                )
                              }
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

      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  currentUser: state.account.currentUser,
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(All));

