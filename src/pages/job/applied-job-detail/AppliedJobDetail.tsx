// import { faBookmark, faCheck, faMapMarkerAlt, faPlus, faShare } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb, Button, Col, Divider, PageHeader, Row, Space, Typography, Form } from "antd";
import { AxiosResponse } from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { getJobVacationDetail } from "../../../repository/JobRepo";
// import ReactHtmlParser from "react-html-parser";
// import { encodeHashUserId } from "../../../config/Util";

import SvgResume from "../../../assets/svg/resume-icon.svg";
import MyResume from "./applied-job-detail-component/MyResume";

export interface AppliedJobDetailProps {
  match: any;
}
export interface AppliedJobDetailState {
  id: number;
};

const { Text } = Typography;
class AppliedJobDetail extends React.Component<AppliedJobDetailProps, AppliedJobDetailState> {
  state = {
    id: 0,

  };
  componentDidMount() {
    window.document.title = "Job Detail | KerjaApp";
    this.getData();
  }
  getData() {
    const jobid = this.props.match.params.jobid;
    getJobVacationDetail(jobid).then((res: AxiosResponse<any>) => {
      this.setState(res.data);
    });
  }
  render() {
    // const { organization } = this.state;
    return (
      <div className="applied-job-detail">
        <PageHeader
          className="site-page-header"
          onBack={() => null}
          // title="Title"
          subTitle={<Breadcrumb>
            <Breadcrumb.Item>
              <Link to={`/job/my-jobs-applied`} >My Jobs</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item >Applied Jobs Detail</Breadcrumb.Item>
          </Breadcrumb>}
          style={{ margin: "28px 0px 25.5px 0px", padding: 0 }}
        />
        <Row gutter={[20, 15]} style={{ marginTop: 15, }}>
          <Col span={24}>
            <Divider style={{ margin: "4px 0px", padding: 0 }} />

            <Row style={{ marginTop: 22, marginBottom: 30 }} align="middle">
              <Col style={{ marginRight: 9 }}>
                <img style={{ padding: 0, margin: 0 }} src={SvgResume} alt="myLastappliedjob" height={22} />
              </Col>
              <Col>
                <Text className="subtitlejob">My Resume</Text>
              </Col>
            </Row>
            <Form>
              <MyResume />

              <Row>
                <Space size={12}>
                  <Col>
                    <Button type="primary" htmlType="submit" style={{ padding: '7px 22px 7px 5.6px', height: 44, borderRadius: 10, backgroundColor: 'green', borderStyle: 'none' }} className="searchLearning">
                      <Row align="middle" justify="start">
                        <Text style={{ color: 'white', fontSize: 16, }}>Interview</Text>
                      </Row>
                    </Button>
                  </Col>
                  <Col>
                    <Button type="primary" htmlType="reset" style={{ padding: '7px 22px 7px 5.6px', height: 44, borderRadius: 10, backgroundColor: 'red', borderStyle: 'none' }} className="searchLearning">
                      <Row align="middle" justify="start">
                        {/* <Image src={IconUndo} preview={false} height={24} style={{ marginRight: 10.4 }} /> */}
                        <Text style={{ color: 'white', fontSize: 16, }}>x Cancel Application</Text>
                      </Row>
                    </Button>
                  </Col>
                </Space>
              </Row>
            </Form>

          </Col>


        </Row>
      </div>
    );
  }
}

export default AppliedJobDetail;
