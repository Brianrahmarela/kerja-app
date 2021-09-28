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
import SvgLainnya from "../../../../assets/svg/lainnya-icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

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
                id: 1,
                Jobtitle: "Fashion Designer",
                name: "Salvadore Salie",
                place: "DKI Jakarta",
                status: "Penuh Waktu / Kontrak",
                gaji: "Rp 3.000.000 - Rp 5.000.000",
                time: "3 j",
                schedule: "August, 16 2021",
                title: "JOB FAIR : INDONESIA CAREER EXPO SEMARANG",
                text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod",
            },
            {
                id: 2,
                Jobtitle: "Fashion Tes",
                name: "Saliem",
                place: "Depok",
                status: "Magang",
                gaji: "Rp 1.000.000 - Rp 2.000.000",
                time: "3 j",
                schedule: "Sep, 17 2021",
                title: "JOB FAIR : INDONESIA CAREER EXPO SEMARANG",
                text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod",
            },
            {
                id: 3,
                Jobtitle: "Developer",
                name: "No 3",
                place: "Papua",
                status: "Magang",
                gaji: "Rp 5000.000 - Rp 1.000.000",
                time: "3 j",
                schedule: "Sep, 18 2021",
                title: "JOB FAIR : INDONESIA CAREER EXPO SEMARANG",
                text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod",
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
        ellipsis: true,
    };

    componentDidMount() {
        window.document.title = "Job | KerjaApp";
    }
    loadMore = (e: any) => {
        // const { pagination, jobEvent, } = this.state;
        const { pagination } = this.state;
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
            <div>
                <Row gutter={15} style={{ marginTop: 15 }} justify="start" align="middle">
                    <Col>
                        <Text className="subtitlejob">Job Event</Text>
                    </Col>
                </Row>
                <Row gutter={[20, 20]}>
                    {jobEvent.map((v: any, i: number) => (
                        <Col xs={24} sm={24} md={8} lg={8} key={i}>
                            <Card bordered={true} className="cardEvent">
                                <Space direction="vertical">
                                    <Row>
                                        <Col span={24}>
                                            <Image style={{ padding: 0, margin: "0px" }} wrapperStyle={{ width: "100%" }} src={Banner1} preview={false} />
                                        </Col>
                                    </Row>
                                    <Row justify="space-between">
                                        <Col span={22} style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.4 }}>
                                            {v.title}
                                        </Col>
                                        <Col span={2} style={{ fontSize: 12, fontWeight: 300, textAlign: "right" }}>
                                            {v.time}
                                        </Col>
                                    </Row>
                                    <Divider style={{ margin: 0, padding: 0 }} />
                                    <Row style={{ fontSize: 12, color: "#53575E" }}>
                                        <Paragraph ellipsis={ellipsis ? { rows: 4, expandable: true, symbol: "See more" } : false}>{v.text}</Paragraph>
                                    </Row>
                                    <Row align="middle">
                                        <Space size={9}>
                                            <Col>
                                                <img style={{ padding: 0, margin: 0 }} src={SvgCalendar} alt="place" height={14} />
                                            </Col>
                                            <Col style={{ color: "#53575E", fontSize: 12, paddingTop: 4 }}>{v.schedule}</Col>
                                        </Space>
                                    </Row>

                                    <Row justify="space-between" align="middle">
                                        <Col>
                                            <Space size={9}>
                                                <Col>
                                                    <img style={{ padding: 0, margin: 0 }} src={SvgPlace} alt="place" height={13} />
                                                </Col>
                                                <Col style={{ color: "#53575E", fontSize: 12, paddingTop: 4 }}>{v.place}</Col>
                                            </Space>
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Space size={9}>
                                                    <Col>
                                                        <img style={{ padding: 0, margin: 0 }} src={SvgSaved} alt="saved" height={16} />
                                                    </Col>
                                                    <Col>
                                                        <img style={{ padding: 0, margin: 0 }} src={SvgShare} alt="share" height={16} />
                                                    </Col>
                                                    <Col>
                                                        <Button type="primary" className="btndaftar">
                                                            Daftar
                                                        </Button>
                                                    </Col>
                                                </Space>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Space>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: "center" }}>
                        <Button type="link" href="#/public/job-search" block style={{ marginTop: 22 }}>
                            <Space>
                                Lainnya
                                <FontAwesomeIcon icon={faCaretRight} />
                            </Space>
                        </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(JobEvent));
