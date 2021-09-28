import { Form, Tabs, Tag, Input, Row, Button, Card, PageHeader, Breadcrumb, Slider, Checkbox, Select, AutoComplete, InputNumber, Col } from "antd";
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
  pagination: any;
  posisiValue: string[];
  gajiValue: number;
  lokasiValue: string[];
}
class JobAlertSettings extends React.Component<JobProps, JobState> {
  state: JobState = {
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
    posisiValue: [],
    gajiValue: 500000,
    lokasiValue: [],
  };
  onSearch = (val: string) => {
    console.log("val Posisi:", val);
    this.addSearch(val);
    // this.clearSearch();
  }
  addSearch(val: string) {
    this.setState((prevState) => ({
      posisiValue: [...(prevState.posisiValue ?? []), val],
    }));
  }
  onSearchLokasi = (val: string) => {
    console.log("val Lokasi:", val);
    this.addSearchLokasi(val);
  }
  addSearchLokasi(val: string) {
    this.setState((prevState) => ({
      lokasiValue: [...(prevState.lokasiValue ?? []), val],
    }));
  }
  onChange = (value: any) => {
    this.setState({
      gajiValue: value,
    });
  };
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
  };
  renderTitle = (title: string) => (
    <span>
      {title}
      <a
        style={{ float: 'right' }}
        href="/jobs"
        target="_blank"
        rel="noopener noreferrer"
      >
        more
      </a>
    </span>
  );
  renderItem = (title: string) => ({
    value: title,
    label: (
      <div>
        {title}
      </div>
    ),
  });
  log(e: any) {
    console.log(e);
  }
  options = [
    {
      label: this.renderTitle('Pencarian Populer'),
      options: [this.renderItem('Staff'), this.renderItem('Fashion Designer'), this.renderItem('Manager'), this.renderItem('Senior Merchandiser'), this.renderItem('Pattern Maker'), this.renderItem('Marketing'),],
    },
  ];
  renderTitleLokasi = (title: string) => (
    <span>
      {title}
      <a
        style={{ float: 'right' }}
        href="/jobs"
        target="_blank"
        rel="noopener noreferrer"
      >
        more
      </a>
    </span>
  );
  renderItemLokasi = (title: string) => ({
    value: title,
    label: (
      <div>
        {title}
      </div>
    ),
  });

  optionsLokasi = [
    {
      label: this.renderTitleLokasi('Lokasi Populer'),
      options: [this.renderItem('Jakarta'), this.renderItem('Bogor'), this.renderItem('Bekasi'), this.renderItem('Tangerang'), this.renderItem('Depok'), this.renderItem('Bandung'),],
    },
  ];

  render() {
    // const { currentUser } = this.props;
    const { posisiValue } = this.state;
    console.log('posisiValue: ', posisiValue);
    const { gajiValue } = this.state;
    console.log('gajiValue slider: ', gajiValue);
    const { lokasiValue } = this.state;
    console.log('lokasiValue: ', lokasiValue);

    return (
      <div className="job-alert-settings">
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
        <Row style={{ outline: 'none', borderStyle: 'none' }}>
          <Tabs defaultActiveKey="1" onChange={this.callback}
            tabBarGutter={24} centered
          >
            <TabPane tab="Jobs Alert" key="1" >
              <div style={{ marginTop: 15, }}>
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
                            {/* <Input value={values.position} name="position" onBlur={handleBlur} onChange={handleChange} placeholder="exp. Marketing Officer" /> */}
                            <AutoComplete
                              dropdownClassName="certain-category-search-dropdown"
                              dropdownMatchSelectWidth={500}
                              options={this.options}
                            >
                              <Input.Search size="middle" placeholder="exp. Marketing Officer" onSearch={this.onSearch} name="position" onBlur={handleBlur} />
                            </AutoComplete>
                            <Row style={{ marginTop: 16 }}>

                              {posisiValue.map((tag: any, i) =>
                              (
                                <Tag closable onClose={this.log} key={i}>
                                  {tag}
                                </Tag>
                              )
                              )}
                            </Row>
                          </Form.Item>
                          <Form.Item label="Gaji">
                            {/* <Slider defaultValue={5000000} step={1000000} min={0} max={30000000} /> */}
                            <Row>
                              <Col span={24}>
                                <Slider
                                  defaultValue={500000}

                                  step={1000000} min={0} max={60000000}
                                  onChange={this.onChange}
                                  value={typeof gajiValue === 'number' ? gajiValue : 0}
                                // style={{ color: "red" }}
                                />
                              </Col>
                              <Col span={24}>
                                <InputNumber
                                  min={1}
                                  max={60000000}
                                  style={{ width: 100 }}
                                  value={gajiValue}
                                  onChange={this.onChange}
                                />
                              </Col>
                            </Row>
                          </Form.Item>
                          <Form.Item>
                            {
                              gajiValue > 30000000 ? (
                                <Checkbox
                                  checked={true}
                                  onChange={this.onChange}
                                >
                                  Diatas 30jt
                                </Checkbox>
                              ) : (
                                <Checkbox
                                  checked={false}
                                // onChange={this.onChange}
                                >
                                  Diatas 30jt
                                </Checkbox>
                              )
                            }
                            {/* <Checkbox
                              checked={values.salaryAbove30 === "true"}
                              onChange={(e) => {
                                setFieldValue("salaryAbove:30", e.target.checked);
                              }}
                            >
                              Diatas 30jt
                            </Checkbox> */}
                          </Form.Item>
                          <Form.Item label="Lokasi">
                            {/* <Input value={values.location} name="location" onBlur={handleBlur} onChange={handleChange}></Input> */}
                            <AutoComplete
                              dropdownClassName="certain-category-search-dropdown"
                              dropdownMatchSelectWidth={500}
                              options={this.optionsLokasi}
                            >
                              <Input.Search size="middle" placeholder="DKI Jakarta" onSearch={this.onSearchLokasi} name="lokasi" onBlur={handleBlur} />
                            </AutoComplete>
                            <Row style={{ marginTop: 16 }}>

                              {lokasiValue.map((tag: any, i) =>
                              (
                                <Tag closable onClose={this.log} key={i}>
                                  {tag}
                                </Tag>
                              )
                              )}
                            </Row>
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
                            <Button type="primary" onClick={() => handleSubmit()} className="savebtn">
                              Save
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

