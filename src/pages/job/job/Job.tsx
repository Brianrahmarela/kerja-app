import { faBookmark, faCircleNotch, faFilter, faSearch, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Card, Checkbox, Col, Form, Input, List, Row, Slider, Space, Spin, Typography } from "antd";
import { AxiosResponse } from "axios";
import moment from "moment";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Link } from "react-router-dom";
import { encodeHashUserId } from "../../../config/Util";
import { getSearchJob } from "../../../repository/JobRepo";

export interface JobProps {}

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
            q: "",
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
        const { jobs } = this.state;
        return (
            <div className="job-page">
                <Row gutter={15} style={{ marginTop: 15 }}>
                    <Col span={16}>
                        <Row justify="space-around">
                            <Col span={12}>
                                <Typography.Text>Rekomendasi Untukmu, Sheila</Typography.Text>
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
                                                    <Row justify="space-around">
                                                        <Col span={18}>
                                                            <div>
                                                                <Link to={"/job/job-detail/" + encodeHashUserId(job.id)}>
                                                                    <Typography.Text>{job.jobName}</Typography.Text>
                                                                </Link>
                                                            </div>
                                                            <div>
                                                                <Typography.Text>{job.jobName}</Typography.Text>
                                                            </div>
                                                            <div>
                                                                <Typography.Text>Jl. Tebet Raya No.38, Jakarta Selatan, DKI Jakarta</Typography.Text>
                                                            </div>
                                                            <div>
                                                                <Typography.Text>Status Pekerjaan : Penuh waktu / Kontrak</Typography.Text>
                                                            </div>
                                                            <div>
                                                                <Typography.Text>Gaji : Rp 3.000.000 - Rp 5.000.000</Typography.Text>
                                                            </div>
                                                        </Col>
                                                        <Col span={6} style={{ textAlign: "center" }}>
                                                            <Avatar size={65} />
                                                        </Col>
                                                    </Row>
                                                    <div style={{ textAlign: "right" }}>
                                                        <Space>
                                                            <Typography.Text>Diposting 2 jam yang lalu</Typography.Text>
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
                                    <Form.Item label="Posisi">
                                        <Input prefix={<FontAwesomeIcon icon={faSearch} />}></Input>
                                    </Form.Item>
                                    <Form.Item label="Gaji">
                                        <Slider min={1} max={20} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Checkbox>Diatas 20jt</Checkbox>
                                    </Form.Item>
                                    <Form.Item label="Lokasi">
                                        <Input></Input>
                                    </Form.Item>
                                    <Form.Item label="Status Pekerjaan">
                                        <Input></Input>
                                    </Form.Item>
                                    <Form.Item style={{ textAlign: "right" }}>
                                        <Button type="primary">Cari</Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Job;
