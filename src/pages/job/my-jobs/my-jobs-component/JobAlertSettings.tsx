import { faSearch, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Tabs, Input, Row, Button, Card, PageHeader, Breadcrumb, Slider, Checkbox, Select, } from "antd";
import { Formik } from "formik";

import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

import { Link } from "react-router-dom";

import RelevantJobs from '../my-jobs-component/RelevantJobs';

const { TabPane } = Tabs;

export interface JobProps {
  currentUser?: any;
}

export interface JobState {
  hasMore: boolean;
  loading: boolean;
  scrolled: boolean;
  // appliedJobs: any[];
  pagination: any;
  valSearch: any;
}

class JobAlertSettings extends React.Component<JobProps, JobState> {
  state = {
    hasMore: true,
    loading: false,
    scrolled: false,
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

    // getSearchJob(pagination)
    //   .then((res: AxiosResponse<any>) => {
    //     let newPostingList: any[] = res.data.content?.concat(appliedJobs) as any[];
    //     newPostingList = newPostingList.sort((a: any, b: any) => moment(b.createdAt).diff(moment(a.createdAt)));
    //     this.setState({
    //       appliedJobs: newPostingList,
    //       hasMore: newPostingList.length < res.data.total,
    //       pagination: {
    //         ...pagination,
    //         total: res.data.total,
    //       },
    //     });
    //   })
    //   .catch((e) => {
    //     console.log(e.response);
    //     this.setState({ hasMore: false });
    //   })
    //   .finally(() => {
    //     this.setState({
    //       loading: false,
    //     });
    //   });
  };
  render() {
    // const { currentUser } = this.props;
    // const { appliedJobs } = this.state;
    // const { jobsRecomendation } = this.state;
    return (
      <div className="job-page">
        <PageHeader
          className="site-page-header"
          onBack={() => null}
          // title="Title"
          subTitle={<Breadcrumb>
            <Breadcrumb.Item>
              <Link to={`/job/my-jobs-applied`} >My Jobs</Link>

            </Breadcrumb.Item>
            <Breadcrumb.Item >Jobs Alert Settings</Breadcrumb.Item>
          </Breadcrumb>}
          style={{ margin: "28px 0px 25.5px 0px", padding: 0 }}
        />


        <Row >
          {/* <Row > */}
          {/* <Col > */}
          <Tabs defaultActiveKey="1" onChange={this.callback}
            tabBarGutter={24} centered id="bordertab"
          >

            <TabPane tab="Jobs Alert" key="1" >
              <div style={{ marginTop: 15 }}>
                <Card>
                  <Form layout="vertical">
                    <Formik
                      initialValues={this.state.pagination}
                      onSubmit={(values, { resetForm, setSubmitting }) => {
                        this.setState(
                          {
                            // appliedJobs: [],
                            pagination: {
                              ...this.state.pagination,
                              ...values,
                              page: 1,
                              total: 0,
                            },
                          },
                          () => {
                            this.loadMore(1);
                          }
                        );
                      }}
                    >
                      {({ values, handleBlur, handleChange, setFieldValue, errors, handleSubmit }) => (
                        <>
                          <Form.Item label="Posisi">
                            <Input value={values.position} name="position" suffix={<FontAwesomeIcon icon={faSearch} />} onBlur={handleBlur} onChange={handleChange} placeholder="exp. Marketing Officer" />
                          </Form.Item>
                          <Form.Item label="Gaji">
                            <Slider defaultValue={3000000} step={1000000} min={0} max={20000000} />
                          </Form.Item>
                          <Form.Item>
                            <Checkbox
                              checked={values.salaryAbove20 === "true"}
                              onChange={(e) => {
                                setFieldValue("salaryAbove:20", e.target.checked);
                              }}
                            >
                              Diatas 20jt
                            </Checkbox>
                          </Form.Item>
                          <Form.Item label="Lokasi">
                            <Input value={values.location} name="location" onBlur={handleBlur} onChange={handleChange}></Input>
                          </Form.Item>
                          <Form.Item label="Status Pekerjaan">
                            <Select
                              value={values.status}
                              onChange={(e) => {
                                setFieldValue("status", e);
                              }}
                            >
                              <Select.Option value="">ALL</Select.Option>
                              <Select.Option value="FULL_TIME">FULL TIME</Select.Option>
                              <Select.Option value="PART_TIME">PART TIME</Select.Option>
                              <Select.Option value="INTERNSHIP">INTERNSHIP</Select.Option>
                            </Select>
                          </Form.Item>
                          <Form.Item style={{ textAlign: "right" }}>
                            <Button type="primary" onClick={() => handleSubmit()}>
                              Cari
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Formik>
                  </Form>
                </Card>
              </div>
              <RelevantJobs />
            </TabPane>
            <TabPane tab="Email Alert Settings" key="2">
              {/* <Row style={{ marginTop: 22, backgroundColor: "yellow" }} align="middle"> */}


              email
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(JobAlertSettings));

