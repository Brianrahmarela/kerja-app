import { faChevronRight, faCircleNotch, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Card, Col, List, Row, Spin, Typography } from "antd";
import { AxiosResponse } from "axios";
import moment from "moment";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Link } from "react-router-dom";
import { encodeHashUserId } from "../../../../config/Util";
import { getSearchJob } from "../../../../repository/JobRepo";

interface JobListProps {}

interface JobListState {
    hasMore: boolean;
    loading: boolean;
    scrolled: boolean;
    jobs: any[];
    pagination: any;
}

class JobList extends React.Component<JobListProps, JobListState> {
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
            <InfiniteScroll initialLoad={true} pageStart={0} loadMore={this.loadMore} hasMore={!this.state.loading && this.state.hasMore} useWindow={true}>
                <List
                    dataSource={jobs || []}
                    split={false}
                    locale={{
                        emptyText: <Card>No Post</Card>,
                    }}
                    renderItem={(job: any, i: number) => (
                        <List.Item key={job.id + job.jobName + i} style={{ padding: 0, marginBottom: 15, width: "100%" }}>
                            <Link to={"/job/job-detail/" + encodeHashUserId(job.id)} style={{ width: "100%" }}>
                                <Card style={{ width: "100%", borderRadius: 20 }} bodyStyle={{ borderRadius: 20, paddingLeft: 10, paddingRight: 10 }}>
                                    <Row align="middle" gutter={20}>
                                        <Col xs={5} sm={4} md={7} style={{ textAlign: "center", position: "relative" }}>
                                            <Avatar size={64} src={job.organization.logo} />
                                        </Col>
                                        <Col xs={17} sm={17} md={14}>
                                            <Typography.Title style={{ fontSize: 14 }}>{job.jobName}</Typography.Title>
                                            <div>
                                                <Typography.Text>{job.positionLevel}</Typography.Text>
                                            </div>
                                            <Typography.Text style={{ fontSize: 10 }}>
                                                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: 5 }} />
                                                {job.location.split(",").join(", ")}
                                            </Typography.Text>
                                        </Col>
                                        <Col xs={2} sm={1} md={3}>
                                            <FontAwesomeIcon icon={faChevronRight} />
                                        </Col>
                                    </Row>
                                </Card>
                            </Link>
                        </List.Item>
                    )}
                >
                    {this.state.loading && this.state.hasMore && <Spin indicator={<FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />} />}
                </List>
            </InfiniteScroll>
        );
    }
}

export default JobList;
