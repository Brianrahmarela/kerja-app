import { Col, Row, Typography, Button, Card, List, Space, Avatar, } from "antd";
import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import SvgLainnya from "../../../../assets/svg/lainnya-icon.svg";
import ImgLovely from "../../../../assets/image/lovely.svg";
import SvgLocGrey from "../../../../assets/svg/location-grey.svg";
import ImgSalvadore from "../../../../assets/image/salvadore.svg";
import ImgColin from "../../../../assets/image/colin.svg";
import SvgFilter from "../../../../assets/svg/filter-icon.svg";
import SvgSaved from "../../../../assets/svg/saved-icon.svg";
import SvgShare from "../../../../assets/svg/share-icon.svg";

const { Text } = Typography;
export interface JobProps {
  currentUser?: any;
}
export interface JobState {
  hasMore: boolean;
  loading: boolean;
  scrolled: boolean;
  relevantJobs: any[];
  pagination: any;
}
class RelevantJobs extends React.Component<JobProps, JobState> {
  state = {
    hasMore: true,
    loading: false,
    scrolled: false,
    relevantJobs: [
      {
        "id": 1,
        "Jobtitle": "Pattern Maker",
        "company": "Lovely Prom Indonesia",
        "address": "Jl. Pisangan Baru Tengah, Jakarta Timur, DKI Jakarta",
        "status": "Magang / Paruh Waktu",
        "gaji": "",
        "image": `${ImgLovely}`,
        "waktu": "Diposting 2 jam yang lalu"
      },
      {
        "id": 2,
        "Jobtitle": "Fashion Journalist",
        "company": "Salvadore Salie",
        "address": "Jl. Kebon Kacang Raya Blok E35 No.9, Jakarta Pusat, DKI Jakarta",
        "status": "Penuh waktu / Kontrak",
        "gaji": "Rp 4.000.000 - Rp 6.000.000",
        "image": `${ImgSalvadore}`,
        "waktu": "Diposting kemarin"
      },
      {
        "id": 3,
        "Jobtitle": "Merchandiser",
        "company": "Colin Fashion",
        "address": "Jl. Menteng Atas Dalam No.23, Jakarta Selatan, DKI Jakarta",
        "status": "Penuh waktu / Kontrak",
        "gaji": "Rp 3.500.000 - Rp 6.000.000",
        "image": `${ImgColin}`,
        "waktu": "Diposting kemarin"
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

  handleClickArsip = (e: any) => {
    console.log("Arsip Value Clicked! ", e);
  }
  handleClickBagikan = (e: any) => {
    console.log("Bagikan Value Clicked! ", e);
  }

  render() {
    const { relevantJobs } = this.state;
    return (
      <div >
        <Row style={{ marginTop: 63.5, marginBottom: 30 }} align="middle">
          <Col style={{ marginRight: 9 }}>
            <img style={{ padding: 0, margin: 0, }}
              src={SvgFilter}
              alt="myLastappliedjob"
              height={18}
            />
          </Col>
          <Col>
            <Text className="subtitlejob">Relevant Jobs</Text>
          </Col>
        </Row>
        <InfiniteScroll initialLoad={true} pageStart={0} loadMore={this.loadMore} hasMore={!this.state.loading && this.state.hasMore} useWindow={true} >
          <List
            dataSource={relevantJobs || []}
            split={false}
            locale={{
              emptyText: <Card>No Post</Card>,
            }}
            renderItem={(job: any, i: number) => (
              <div>
                <List.Item key={job.id} style={{ padding: 0, marginBottom: 15, width: "100%", }}>
                  <Card style={{ borderRadius: 8, }} bordered={true} className="cardRelevant">
                    <Row justify="space-between" style={{ fontFamily: "Open Sans" }}>

                      {/* <Col xs={24} md={20} style={{ backgroundColor: "honeydew" }}> */}
                      <Col xs={24} md={20} >
                        <Row justify="space-between" >
                          {/* <Col xs={24} md={24} lg={18} style={{ backgroundColor: "yellow" }}> */}
                          <Col xs={24} md={24} lg={18} >
                            <Row align="middle" >
                              <Col xs={24} md={24} style={{ marginRight: 15, marginBottom: 2 }}>
                                <Text className="jobTitleList">{job.Jobtitle}</Text>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Row style={{ marginBottom: 10 }}>
                          <Col style={{ fontSize: 15 }}>
                            {job.company}
                          </Col>
                        </Row>
                        {/* <Space size={3} direction="vertical"> */}

                        {/* <Row style={{ marginBottom: 8, backgroundColor: "teal" }}> */}
                        <Row style={{ marginBottom: 8, }}>
                          <Col style={{ marginRight: 9, }}>
                            <img style={{ padding: 0, margin: 0, }}
                              src={SvgLocGrey}
                              alt="share"
                              height={14.6}
                              className="imgList"
                            /></Col>
                          {/* <Col xs={21} md={22} style={{ marginRight: 9, backgroundColor: "grey" }}> */}
                          <Col xs={21} md={22} style={{ marginRight: 9, }}>
                            {job.address}
                          </Col>
                        </Row>
                        <Row justify="space-between" style={{ marginBottom: 6 }}>
                          <Col>
                            <Text style={{}}>Status Pekerjaan : </Text>
                            <Text style={{ color: "#2C9BE6", fontWeight: 600 }}>
                              {job.status}
                            </Text>
                          </Col>
                        </Row>
                        <Row style={{ marginBottom: 18 }}>
                          {
                            job.gaji === "" ? (
                              <Col>
                                {job.gaji}
                              </Col>
                            ) : (
                              <Col>
                                <Text >Gaji</Text> : {job.gaji}
                              </Col>
                            )
                          }
                        </Row>
                        {/* </Space> */}

                      </Col>
                      {/* <Col xs={0} md={3} style={{ backgroundColor: "green" }}> */}
                      <Col xs={0} md={3} >
                        <Row justify="end">
                          <Col>

                            <Avatar shape="square" src={job.image} className="imgList" size={{ xs: 0, sm: 0, md: 81, lg: 89, xl: 89, xxl: 89 }}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    {/* <Row justify="end" style={{ backgroundColor: "yellow" }}> */}
                    <Row justify="end">
                      <Col xs={24} md={8} lg={6} style={{ marginBottom: 5, }} >

                        <Row justify="end" >
                          <Button type="link" block style={{ margin: 0, padding: 0 }}>
                            <Row justify="end">

                              <Col>
                                <Text>{job.waktu}</Text>
                              </Col>
                            </Row>
                          </Button>

                        </Row>
                      </Col>

                      <Col xs={6} md={4} lg={3} style={{ marginLeft: 12 }}>
                        <Row justify="space-between">
                          <Col className="gapLine" >
                            <Row justify="center">
                              |
                            </Row>
                          </Col>
                          <Col>
                            <Button type="link" block onClick={this.handleClickArsip} style={{ margin: 0, padding: 0 }}>
                              <Row justify="end">
                                <Col>
                                  <img src={SvgSaved} alt="SvgAaplicant" height={14} style={{ marginRight: 9 }} />
                                </Col>
                                <Col>
                                  <Text>Arsip</Text>
                                </Col>
                              </Row>
                            </Button>
                          </Col>
                          <Col>
                          </Col>
                        </Row>
                      </Col>
                      <Col xs={9} md={4} lg={3}>
                        <Row justify="end">
                          <Col className="gapLine" md={1}>
                            <Row justify="start">
                              |
                            </Row>
                          </Col>
                          <Col md={20}>
                            <Button type="link" block onClick={this.handleClickBagikan} style={{ margin: 0, padding: 0 }}>
                              <Row justify="end">
                                <Col>
                                  <img src={SvgShare} alt="SvgAaplicant" height={14} style={{ marginRight: 9 }} />

                                </Col>
                                <Col>
                                  <Text className="footerList">Bagikan</Text>

                                </Col>
                              </Row>
                            </Button>

                          </Col>
                          <Col>
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(RelevantJobs));

