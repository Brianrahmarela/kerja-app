import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row, Typography, Divider, Button, Card, List, Spin, Space, Avatar, Badge, } from "antd";

import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

import SvgBookmark from "../../../../assets/svg/bookmark-icon.svg";
import InfiniteScroll from "react-infinite-scroller";
import SvgLainnya from "../../../../assets/svg/lainnya-icon.svg";
import SvgApplicant from "../../../../assets/svg/applicant-icon.svg";
import SvgQuickView from "../../../../assets/svg/quick-view-icon.svg";
import AvaApplied from "../../../../assets/image/avatar-applied.png";


const { Text } = Typography;

export interface JobProps {
  currentUser?: any;
}

export interface JobState {
  hasMore: boolean;
  loading: boolean;
  scrolled: boolean;
  bookmarkJob: any[];
  pagination: any;
}

class Bookmark extends React.Component<JobProps, JobState> {
  state = {
    hasMore: true,
    loading: false,
    scrolled: false,
    bookmarkJob: [
      {
        "id": 1,
        "Jobtitle": "Fashion Designer",
        "company": "Lorem Ipsum",
        "applicant": "123 Applicant",
        "position": "Full time",
        "appliedOn": "45 minutes ago",
        "postedOn": "5 hours ago",
        "salary": "Rp. 3.000.000 - Rp. 5.000.000",
        "status": "Bookmark",
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
        "status": "Bookmark",

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
        "status": "Bookmark",

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
        "status": "Bookmark",

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
        "status": "Bookmark",

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
        "status": "Bookmark",

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
    const { bookmarkJob } = this.state;
    return (
      <div >

        <Row style={{ marginTop: 22, marginBottom: 30 }} align="middle">
          <Col style={{ marginRight: 9 }}>
            <img style={{ padding: 0, margin: 0, }}
              src={SvgBookmark}
              alt="myLastappliedjob"
              height={22}
            />
          </Col>
          <Col>
            <Text className="subtitlejob">Bookmark Job</Text>
          </Col>
        </Row>
        <InfiniteScroll initialLoad={true} pageStart={0} loadMore={this.loadMore} hasMore={!this.state.loading && this.state.hasMore} useWindow={true} className="mobilehiddenmylast">
          <List
            dataSource={bookmarkJob || []}
            split={false}
            locale={{
              emptyText: <Card>No Post</Card>,
            }}
            renderItem={(job: any, i: number) => (
              <div>
                <List.Item key={job.id} style={{ padding: 0, marginBottom: 15, width: "100%", }}>
                  <Card style={{ borderRadius: 8, }} bordered={true} className="cardApplied">

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
                              <Button type="text" block style={{ padding: 0, margin: 0, }}><img
                                src={SvgBookmark}
                                alt="svgbookmark"
                                height={10}
                                style={{ marginRight: 9, }}
                              />
                                <Text>{job.status}</Text></Button>
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

      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  currentUser: state.account.currentUser,
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Bookmark));

