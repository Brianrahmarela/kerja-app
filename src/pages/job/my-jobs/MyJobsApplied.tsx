import { faSearch, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tabs, Col, Input, Row, Typography, Divider, Button } from "antd";
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
  jobs: any[];
  jobsRecomendation: any[];
  pagination: any;
  valSearch: any;
}

class MyJobsApplied extends React.Component<JobProps, JobState> {
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
  callback(key: any) {
    console.log(key);
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
    // const { currentUser } = this.props;
    // const { jobs } = this.state;
    // const { jobsRecomendation } = this.state;
    return (
      <div className="job-page">
        <Row style={{ marginTop: 64 }} justify="space-around" align="middle">
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

        <Row justify="space-between">
          <Col style={{ backgroundColor: "honeydew" }}>
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
            }>
              <TabPane tab="All" key="1">
                All
              </TabPane>
              <TabPane tab="Applied" key="2">
                <Row style={{ marginTop: 22, backgroundColor: "yellow" }} align="middle">
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
                AppliedAppliedAppliedAppliedAppliedAppliedAppliedAppliedAppliedAppliedAppliedAppliedAppliedAppliedAppliedAppliedAppliedAppliedAppliedAppliedAppliedAppliedAppliedAppliedAppliedApplied
              </TabPane>
              <TabPane tab="On-Progress" key="3">
                On-Progress
              </TabPane>
              <TabPane tab="Accepted" key="4">
                Accepted
              </TabPane>
              <TabPane tab="Closed" key="5">
                Closed
              </TabPane>
              <TabPane tab="Bookmark" key="6">
                Bookmark
              </TabPane>
              <TabPane tab="xx" key="7">


              </TabPane>
            </Tabs>


          </Col>


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

