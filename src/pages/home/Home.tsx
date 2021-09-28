import { faImages, faNewspaper, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Affix, Avatar, Card, Col, Divider, Input, Row, Space, Typography } from "antd";
import React from "react";
import { connect } from "react-redux";
import PeopleRecommendation from "./people-recommendation/PeopleRecomendation";
import NewPost from "./posts/NewPost";
import Posts from "./posts/Posts";

export interface HomeProps {
    isEdited?: boolean;
    setEditedPost?: (x: any) => void;
    currentUser: any;
}

export interface HomeState {
    showUploader: boolean;
    postType: string;
}

class Home extends React.Component<HomeProps, HomeState> {
    state = {
        showUploader: false,
        postType: "TEXT",
    };

    render() {
        const { currentUser } = this.props;

        return (
            <div className="home-page">
                <Row gutter={15}>
                    <Col xs={0} sm={0} md={0} lg={7}>
                        <Affix offsetTop={80}>
                            <Typography.Title level={4} className="blue-primary" style={{ marginTop: 12 }}>
                                Rekomendasi
                            </Typography.Title>
                            <Divider style={{ marginBottom: 5 }}></Divider>
                            <PeopleRecommendation />
                        </Affix>
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
                                <Col xs={0} sm={4} style={{ textAlign: "center" }}>
                                    <Avatar size={65} src={currentUser?.photo} />
                                </Col>
                                <Col xs={24} sm={20}>
                                    <Input style={{ height: 65, borderRadius: 10 }} placeholder="Write something..." readOnly />
                                    <Row justify="space-between" align="middle" style={{ padding: 20, paddingBottom: 0 }}>
                                        <Col xs={0} sm={8} style={{ textAlign: "center" }}>
                                            <Space style={{ margin: "auto" }}>
                                                <FontAwesomeIcon icon={faImages} style={{ fontSize: 20 }} />

                                                <span>Foto/Gambar</span>
                                            </Space>
                                        </Col>
                                        <Col xs={8} sm={0} style={{ textAlign: "center" }}>
                                            <FontAwesomeIcon icon={faImages} style={{ fontSize: 20 }} />
                                        </Col>

                                        <Col xs={0} sm={8} style={{ textAlign: "center" }}>
                                            <Space style={{ margin: "auto" }}>
                                                <FontAwesomeIcon icon={faImages} style={{ fontSize: 20 }} />

                                                <span>Video</span>
                                            </Space>
                                        </Col>
                                        <Col xs={8} sm={0} style={{ textAlign: "center" }}>
                                            <FontAwesomeIcon icon={faVideo} style={{ fontSize: 20 }} />
                                        </Col>
                                        <Col xs={0} sm={8} style={{ textAlign: "center" }}>
                                            <Space style={{ margin: "auto" }}>
                                                <FontAwesomeIcon icon={faNewspaper} style={{ fontSize: 20 }} />

                                                <span>Write Articel</span>
                                            </Space>
                                        </Col>
                                        <Col xs={8} sm={0} style={{ textAlign: "center" }}>
                                            <FontAwesomeIcon icon={faNewspaper} style={{ fontSize: 20 }} />
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
    currentUser: state.account.currentUser,
});

const mapDispatchToProps = (dispatch: any) => ({
    setEditedPost: (payload: any) =>
        dispatch({
            type: "SET_EDIT_POST",
            payload,
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
