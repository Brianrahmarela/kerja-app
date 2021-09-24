import { faImages, faNewspaper, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Card, Col, Divider, Input, Row, Space, Typography } from "antd";
import React from "react";
import { connect } from "react-redux";
import PeopleRecommendation from "./people-recommendation/PeopleRecomendation";
import NewPost from "./posts/NewPost";
import Posts from "./posts/Posts";

export interface HomeProps {
    isEdited?: boolean;
    setEditedPost?: (x: any) => void;
}

export interface HomeState {}

class Home extends React.Component<HomeProps, HomeState> {
    componentDidMount() {
        window.document.title = "Home | KerjaApp";
    }
    render() {
        return (
            <div className="home-page">
                <Row gutter={15}>
                    <Col xs={0} sm={0} md={0} lg={7}>
                        <Typography.Title level={4} className="blue-primary" style={{ marginTop: 12 }}>
                            Rekomendasi
                        </Typography.Title>
                        <Divider style={{ marginBottom: 5 }}></Divider>
                        <PeopleRecommendation />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={17}>
                        <Card
                            style={{ marginBottom: 20 }}
                            onClick={() => {
                                this.props.setEditedPost?.({
                                    isEdited: true,
                                    editedPost: {
                                        post: "",
                                        postType: "TEXT",
                                        privacyStatus: "FRIENDS",
                                        medias: [],
                                        longitude: 0.0,
                                        latitude: 0.0,
                                    },
                                });
                            }}
                        >
                            <Row>
                                <Col span={4} style={{ textAlign: "center" }}>
                                    <Avatar size={65} src="http://localhost:7777/api/thrm-media/v1/file?forceImage=true&source-id=karirapp-bg-profile&id=rOBDR3xXzjv2jObwjqJgvL2o4b0YVa" />
                                </Col>
                                <Col span={20}>
                                    <Input style={{ height: 65, borderRadius: 10 }} placeholder="Write something..." readOnly />
                                    <Row justify="space-between" align="middle" style={{ padding: 20, paddingBottom: 0 }}>
                                        <Col
                                            style={{
                                                verticalAlign: "middle",
                                                alignContent: "center",
                                                display: "flex",
                                            }}
                                            onClick={() => {
                                                this.setState({
                                                    showUploader: true,
                                                    postType: "MEDIA",
                                                });
                                            }}
                                        >
                                            <Space>
                                                <FontAwesomeIcon icon={faImages} style={{ fontSize: 20 }} />
                                                <span>Foto/Gambar</span>
                                            </Space>
                                        </Col>
                                        <Col
                                            style={{
                                                verticalAlign: "middle",
                                                alignContent: "center",
                                                display: "flex",
                                            }}
                                        >
                                            <Space>
                                                <FontAwesomeIcon icon={faVideo} style={{ fontSize: 20 }} />
                                                <span>Video</span>
                                            </Space>
                                        </Col>
                                        <Col
                                            style={{
                                                verticalAlign: "middle",
                                                alignContent: "center",
                                                display: "flex",
                                            }}
                                        >
                                            <Space>
                                                <FontAwesomeIcon icon={faNewspaper} style={{ fontSize: 20 }} />
                                                <span>Write Articel</span>
                                            </Space>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>

                        <Posts />
                    </Col>
                </Row>

                {this.props.isEdited && <NewPost visible={this.props.isEdited} />}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    isEdited: state.post.isEdited,
});

const mapDispatchToProps = (dispatch: any) => ({
    setEditedPost: (payload: any) =>
        dispatch({
            type: "SET_EDIT_POST",
            payload,
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
