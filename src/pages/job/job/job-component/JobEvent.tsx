
import { Button, Card, Image, Col, List, Row, Space, Typography, Divider } from "antd";
import React from "react";
import { withTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroller";
import { connect } from "react-redux";
import SvgPlace from "../../../../assets/svg/place-icon.svg";
import SvgSaved from "../../../../assets/svg/saved-icon.svg";
import SvgShare from "../../../../assets/svg/share-icon.svg";
import Banner1 from "../../../../assets/image/banner1-job-event.png";
import SvgCalendar from "../../../../assets/svg/calendar-icon.svg";

const { Paragraph, Text } = Typography;

export interface JobProps {
  currentUser?: any;
}

export interface JobState {
  hasMore: boolean;
  loading: boolean;
  scrolled: boolean;
  jobEvent: any[];
  pagination: any;
  ellipsis: boolean;
}

class JobEvent extends React.Component<JobProps, JobState> {
  state = {
    hasMore: true,
    loading: false,
    scrolled: false,
    jobEvent: [
      {
        "id": 1,
        "Jobtitle": "Fashion Designer",
        "name": "Salvadore Salie",
        "place": "DKI Jakarta",
        "status": "Penuh Waktu / Kontrak",
        "gaji": "Rp 3.000.000 - Rp 5.000.000",
        "time": "3 j",
        "schedule": "August, 16 2021",
        "title": "JOB FAIR : INDONESIA CAREER EXPO SEMARANG",
        "text": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod",
      },
      {
        "id": 2,
        "Jobtitle": "Fashion Tes",
        "name": "Saliem",
        "place": "Depok",
        "status": "Magang",
        "gaji": "Rp 1.000.000 - Rp 2.000.000",
        "time": "3 j",
        "schedule": "Sep, 17 2021",
        "title": "JOB FAIR : INDONESIA CAREER EXPO SEMARANG",
        "text": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod",
      },
      {
        "id": 3,
        "Jobtitle": "Developer",
        "name": "No 3",
        "place": "Papua",
        "status": "Magang",
        "gaji": "Rp 5000.000 - Rp 1.000.000",
        "time": "3 j",
        "schedule": "Sep, 18 2021",
        "title": "JOB FAIR : INDONESIA CAREER EXPO SEMARANG",
        "text": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod",
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
    ellipsis: true


  };

  componentDidMount() {
    window.document.title = "Job | KerjaApp";
  }
  loadMore = (e: any) => {
    // const { pagination, jobEvent, } = this.state;
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
    const { jobEvent, ellipsis } = this.state;
    return (
      <div className="job-page">
        <Row gutter={15} style={{ marginTop: 15 }} justify="start" align="middle">
          <Col>
            <Text style={{ fontSize: 18, color: "#53575E", fontWeight: 500 }}>Job Event</Text>
          </Col>
        </Row>
        <Row style={{ padding: '15px 0px 0px 0px', }} >
          <InfiniteScroll initialLoad={true} pageStart={0} loadMore={this.loadMore} hasMore={!this.state.loading && this.state.hasMore} useWindow={true}>
            <List
              dataSource={jobEvent || []}
              split={false}
              locale={{
                emptyText: <Card>No Post</Card>,
              }}
              renderItem={(jobEvent: any, i: number) => (
                <Space direction="vertical" style={{ paddingRight: 30, paddingBottom: 10, fontFamily: 'Open Sans' }}>
                  <Card style={{ width: 293, height: '100%', borderRadius: 10, margin: 0, padding: 0 }} bordered={true} className="cardEvent">
                    <Space size={12} direction="vertical">
                      <Row>
                        <Image style={{ padding: 0, margin: "0px" }} src={Banner1} preview={false} />

                      </Row>
                      <Row justify="space-between" >
                        <Col span={22} style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.4 }}>
                          {jobEvent.title}
                        </Col>
                        <Col span={2} style={{ fontSize: 12, fontWeight: 300, textAlign: "right" }}>{jobEvent.time}</Col>
                      </Row>
                      <Divider style={{ margin: 0, padding: 0, }} />
                      <Row style={{ fontSize: 12, color: "#53575E" }}>
                        <Paragraph ellipsis={ellipsis ? { rows: 4, expandable: true, symbol: 'See more' } : false} >
                          {jobEvent.text}

                        </Paragraph>
                      </Row>
                      <Row align="middle">
                        <Space size={9}>

                          <Col >
                            <img style={{ padding: 0, margin: 0, }}
                              src={SvgCalendar}
                              alt="place"
                              height={14}
                            />
                          </Col>
                          <Col style={{ color: '#53575E', fontSize: 12, paddingTop: 4 }}>
                            {jobEvent.schedule}
                          </Col>
                        </Space>
                      </Row>

                      <Row justify="space-between" align="middle">
                        <Col >
                          <Space size={9}>

                            <Col>
                              <img style={{ padding: 0, margin: 0, }}
                                src={SvgPlace}
                                alt="place"
                                height={13}
                              />
                            </Col>
                            <Col style={{ color: '#53575E', fontSize: 12, paddingTop: 4 }}>
                              {jobEvent.place}
                            </Col>
                          </Space>
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
                              <Col>

                                <Button type="primary" className="btndaftar">Daftar</Button>
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
              {/* {this.state.loading && this.state.hasMore && <Spin indicator={<FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />} />} */}
            </List>
          </InfiniteScroll>

        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  currentUser: state.account.currentUser,
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(JobEvent));

