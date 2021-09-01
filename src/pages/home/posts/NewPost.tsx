import { faFile, faGlobe, faImages, faPhotoVideo, faSmile, faUserLock, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row, Select, Typography, Avatar, Modal, Input, Space, Button } from "antd";
import { AxiosResponse } from "axios";
import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { AppConfig } from "../../../config/Config";
import { postFeed } from "../../../repository/FeedRepo";

export interface NewPostProps {
    visible: boolean;
    setVisible: () => void;
    postList?: any[];
    pagination: any;
    setPostList?: (x: any) => void;
}

export interface NewPostState {
    form: any;
    loading: boolean;
}

class NewPost extends React.Component<NewPostProps, NewPostState> {
    state = {
        loading: false,
        form: {
            post: "",
            postType: "TEXT",
            publicStatus: "FRIENDS",
            medias: [],
        },
    };
    postStatus = () => {
        const { post, postType, publicStatus, medias } = this.state.form;
        const payload: any = {
            post,
            postType,
            publicStatus,
            medias: medias.map((v: any) => {
                return {
                    url: AppConfig.baseUrlApi + "/media/v1/file?source-id=karirapp-post&id=" + v.response.id,
                    mediaType: v.type,
                };
            }),
        };
        this.setState({
            loading: true,
        });
        postFeed(payload)
            .then((res: AxiosResponse<any>) => {
                this.props.setVisible();
                this.props.setPostList?.({
                    postList: [res.data].concat(this.props.postList),
                    pagination: {
                        ...this.props.pagination,
                        total: this.props.pagination + 1,
                    },
                });
            })

            .then(() => {
                this.setState({
                    form: {
                        post: "",
                        postType: "TEXT",
                        publicStatus: "FRIENDS",
                        medias: [],
                    },
                });
            })
            .finally(() => {
                this.setState({
                    loading: false,
                });
            });
    };
    render() {
        const { visible } = this.props;
        return (
            <>
                <Modal
                    visible={visible}
                    title="Buat Postingan"
                    footer={[
                        <Row justify="space-between">
                            <Col span={16} style={{ textAlign: "left" }}>
                                <Space>
                                    <Button type="link" icon={<FontAwesomeIcon icon={faImages} style={{ color: "grey", fontSize: 18 }} />}></Button>
                                    <Button type="link" icon={<FontAwesomeIcon icon={faPhotoVideo} style={{ color: "grey", fontSize: 18 }} />}></Button>
                                    <Button type="link" icon={<FontAwesomeIcon icon={faSmile} style={{ color: "grey", fontSize: 18 }} />}></Button>
                                    <Button type="link" icon={<FontAwesomeIcon icon={faFile} style={{ color: "grey", fontSize: 18 }} />}></Button>
                                </Space>
                            </Col>
                            <Col span={8}>
                                <Button type="primary" loading={this.state.loading} disabled={this.state.loading} onClick={() => this.postStatus()}>
                                    Post
                                </Button>
                            </Col>
                        </Row>,
                    ]}
                >
                    <Row justify="space-between" align="top">
                        <Col span={16}>
                            <Row align="middle">
                                <Col flex={"70px"}>
                                    <Avatar size={50} />
                                </Col>
                                <Col flex={"auto"}>
                                    <Typography.Title level={5} style={{ marginBottom: 0 }}>
                                        shela on 7
                                    </Typography.Title>
                                    <Typography.Text className="blue-primary" style={{ fontSize: 10 }}>
                                        shela on 7
                                    </Typography.Text>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={8} style={{ textAlign: "right" }}>
                            <Select
                                value="FRIENDS"
                                size="small"
                                onChange={(e) =>
                                    this.setState({
                                        form: {
                                            ...this.state.form,
                                            publicStatus: e,
                                        },
                                    })
                                }
                            >
                                <Select.Option value={"PUBLIC"}>
                                    <FontAwesomeIcon icon={faGlobe} style={{ marginRight: 5 }} />
                                    Public
                                </Select.Option>
                                <Select.Option value={"FRIENDS"}>
                                    <FontAwesomeIcon icon={faUsers} style={{ marginRight: 5 }} />
                                    Friends
                                </Select.Option>
                                <Select.Option value={"ONLY_ME"}>
                                    <FontAwesomeIcon icon={faUserLock} style={{ marginRight: 5 }} />
                                    Only Me
                                </Select.Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Input.TextArea
                                style={{ marginTop: 20, border: 0 }}
                                placeholder="Apa yang anda pikirkan?"
                                onChange={(e) =>
                                    this.setState({
                                        form: {
                                            ...this.state.form,
                                            post: e.target.value,
                                        },
                                    })
                                }
                            ></Input.TextArea>
                        </Col>
                    </Row>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = (state: any) => ({
    currentUser: state.account.currentUser,
    postList: state.post.postList,
    pagination: state.post.pagination,
});

const mapDispatchToProps = (dispatch: any) => ({
    setPostList: (payload: any) =>
        dispatch({
            type: "SET_POST_LIST",
            payload,
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(NewPost));
