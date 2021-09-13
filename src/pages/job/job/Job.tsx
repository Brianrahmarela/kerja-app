import { faBookmark, faCircleNotch, faFilter, faSearch, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Card, Checkbox, Col, Form, Input, List, Row, Select, Slider, Space, Spin, Tag, Typography } from "antd";
import { AxiosResponse } from "axios";
import { Formik } from "formik";
import moment from "moment";
import React from "react";
import { withTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroller";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { encodeHashUserId } from "../../../config/Util";
import { getSearchJob } from "../../../repository/JobRepo";
var CurrencyFormat = require("react-currency-format");
export interface JobProps {
    currentUser?: any;
}

export interface JobState {
    hasMore: boolean;
    loading: boolean;
    scrolled: boolean;
    jobs: any[];
    pagination: any;
}

class Job extends React.Component<JobProps, JobState> {
    state = {
        hasMore: true,
        loading: false,
        scrolled: false,
        jobs: [] as any[],
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
                <Row gutter={15} style={{ marginTop: 15 }}>
                    <Col span={16}>
                        <Row justify="space-around">
                            <Col span={12}>
                                <Typography.Text>Rekomendasi Untukmu, {currentUser?.firstName}</Typography.Text>
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
                                            <List.Item key={job.id + i} style={{ padding: 0, marginBottom: 15, width: "100%" }}>
                                                <Card style={{ width: "100%" }}>
                                                    <Link to={"/job/job-detail/" + encodeHashUserId(job.id)}>
                                                        <Row justify="space-around">
                                                            <Col span={18}>
                                                                <div>
                                                                    <Typography.Text>{job.jobName}</Typography.Text>
                                                                </div>
                                                                <div>
                                                                    <Typography.Title level={5}>{job.organization.name}</Typography.Title>
                                                                </div>
                                                                <div>
                                                                    {job.location.split(",").map((v: string) => (
                                                                        <Tag>{v}</Tag>
                                                                    ))}
                                                                </div>
                                                                <div style={{ marginTop: 5 }}>
                                                                    <Typography.Text>Status Pekerjaan : {job.jobType.replace("_", " ")}</Typography.Text>
                                                                </div>
                                                                {job.showSalary && (
                                                                    <Space>
                                                                        <Typography.Text>
                                                                            Gaji :{" "}
                                                                            <CurrencyFormat
                                                                                value={job.salaryMin}
                                                                                displayType={"text"}
                                                                                thousandSeparator={true}
                                                                                prefix={"Rp."}
                                                                                renderText={(value: any) => <>{value}</>}
                                                                            />
                                                                            <span> - </span>
                                                                            <CurrencyFormat
                                                                                value={job.salaryMax}
                                                                                displayType={"text"}
                                                                                thousandSeparator={true}
                                                                                prefix={"Rp."}
                                                                                renderText={(value: any) => <>{value}</>}
                                                                            />
                                                                        </Typography.Text>
                                                                    </Space>
                                                                )}
                                                            </Col>
                                                            <Col span={6} style={{ textAlign: "center" }}>
                                                                <Avatar size={65} src={job.organization.logo} />
                                                            </Col>
                                                        </Row>
                                                    </Link>
                                                    <div style={{ textAlign: "right" }}>
                                                        <Space>
                                                            <Typography.Text>Diposting {moment(job.publishDate).fromNow()}</Typography.Text>
                                                            <span>|</span>
                                                            <div>
                                                                <FontAwesomeIcon icon={faBookmark} style={{ marginRight: 10 }} />
                                                                Arsip
                                                            </div>
                                                            <span>|</span>
                                                            <div>
                                                                <FontAwesomeIcon icon={faShare} style={{ marginRight: 10 }} />
                                                                Bagikan
                                                            </div>
                                                        </Space>
                                                    </div>
                                                </Card>
                                            </List.Item>
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
