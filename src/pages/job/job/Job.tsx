import { faBookmark, faCircleNotch, faFilter, faSearch, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Checkbox, Col, Form, Input, List, Row, Select, Slider, Space, Spin, Typography } from "antd";
import { AxiosResponse } from "axios";
import { Formik } from "formik";
import moment from "moment";
import React from "react";
import { withTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroller";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import { encodeHashUserId } from "../../../config/Util";
import { getSearchJob } from "../../../repository/JobRepo";
import SvgTime from "../../../assets/svg/time.svg";

// var CurrencyFormat = require("react-currency-format");
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
                "appliedon": "10/08/2021",
                "position": "Full time",
                "status": "On Process",
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
        const { pagination, jobs } = this.state;
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
        return (
            <div className="job-page">
                <Row gutter={15} style={{ marginTop: 15 }} justify="space-around" align="middle">
                    <Col span={16}>
                        <Row align="middle">
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
                    <Col span={8} style={{ textAlign: "right" }}>
                        {/* <FontAwesomeIcon icon={faBookmark} /> My Job */}
                        <Search
                            placeholder=""
                            allowClear
                            enterButton="Search Job"
                            size="middle"
                            onSearch={this.onSearch}
                            suffix={<FontAwesomeIcon icon={faSearch} />}
                        />
                    </Col>
                </Row>
                <Row gutter={15} style={{ marginTop: 15 }}>
                    <Col span={16}>
                        <Row justify="space-around">
                            <Col span={12}>
                                <Row align="middle">
                                    <Space size={9}>
                                        <Col>
                                            <img style={{ padding: 0, margin: 0, }}
                                                src={SvgTime}
                                                alt="logohamburger"
                                                id="logohamburger"
                                                height={22}
                                            />
                                        </Col>
                                        <Col>
                                            <Text style={{ fontSize: 18, color: "#53575E" }}>My Last Applied Job </Text>
                                        </Col>
                                    </Space>
                                </Row>
                            </Col>
                            <Col span={12} style={{ textAlign: "right" }}>
                                <FontAwesomeIcon icon={faBookmark} /> My Job
                            </Col>
                        </Row>
                        <Row gutter={[20, 15]} style={{ marginTop: 15 }}>
                            <Col span={24}>
                                <InfiniteScroll initialLoad={true} pageStart={0} loadMore={this.loadMore} hasMore={!this.state.loading && this.state.hasMore} useWindow={true}>
                                    <List
                                        dataSource={jobs || []}
                                        split={false}
                                        locale={{
                                            emptyText: <Card>No Post</Card>,
                                        }}
                                        renderItem={(job: any, i: number) => (

                                            <div>
                                                <List.Item key={job.id} style={{ padding: 0, marginBottom: 15, width: "100%", }}>
                                                    <Card style={{ width: "100%" }}>
                                                        <Row justify="space-between">
                                                            <Col span={4}>
                                                                <p>{job.Jobtitle}</p>

                                                            </Col>
                                                            <Col span={4}>
                                                                <p>{job.company}</p>

                                                            </Col>
                                                            <Col span={4}>
                                                                <p>{job.appliedon}</p>

                                                            </Col>
                                                            <Col span={4}>
                                                                <p>{job.position}</p>

                                                            </Col>
                                                            <Col span={4}>
                                                                <p>{job.status}</p>

                                                            </Col>

                                                            {/* <p>{job.id}</p> */}
                                                        </Row>
                                                    </Card>
                                                </List.Item>
                                            </div>

                                        )}
                                    >
                                        {this.state.loading && this.state.hasMore && <Spin indicator={<FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />} />}
                                    </List>
                                </InfiniteScroll>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <div>
                            <FontAwesomeIcon icon={faFilter} style={{ marginRight: 10 }} />
                            Filter Pencarian
                        </div>
                        <div style={{ marginTop: 15 }}>
                            <Card>
                                <Form layout="vertical">
                                    <Formik
                                        initialValues={this.state.pagination}
                                        onSubmit={(values, { resetForm, setSubmitting }) => {
                                            this.setState(
                                                {
                                                    jobs: [],
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
                                                    <Input value={values.position} name="position" prefix={<FontAwesomeIcon icon={faSearch} />} onBlur={handleBlur} onChange={handleChange} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Job));

