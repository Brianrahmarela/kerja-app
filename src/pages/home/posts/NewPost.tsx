import { faFile, faGlobe, faImages, faMapMarkerAlt, faPhotoVideo, faSearch, faSmile, faTimes, faUserLock, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row, Select, Typography, Avatar, Modal, Input, Space, Button, Upload, List } from "antd";
import { AxiosResponse } from "axios";
import imageCompression from "browser-image-compression";
import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { AppConfig } from "../../../config/Config";
import { postFeed } from "../../../repository/FeedRepo";

export interface NewPostProps {
    visible: boolean;
    postList?: any[];
    pagination?: any;
    setPostList?: (x: any) => void;
    setEditedPost?: (x: any) => void;
    editedPost?: any;
    currentUser?: any;
}

export interface NewPostState {
    form: any;
    loading: boolean;
    showUploader: boolean;
    pickLocation: boolean;
    uploadingProgress: number;
}

class NewPost extends React.Component<NewPostProps, NewPostState> {
    state = {
        loading: false,
        showUploader: false,
        pickLocation: false,
        uploadingProgress: 0,
        form: {
            post: "",
            postType: "TEXT",
            privacyStatus: "FRIENDS",
            medias: [],
            longitude: 0.0,
            latitude: 0.0,
        },
    };
    componentDidMount() {
        this.setState({
            form: {
                ...this.props.editedPost,
                medias: this.props.editedPost.medias.map((v: any, i: number) => {
                    return {
                        ...v,
                        type: v.mediaType,
                    };
                }),
            },
            showUploader: this.props.editedPost?.postType === "MEDIA" ? true : false,
        });
    }

    postStatus = () => {
        const { post, postType, privacyStatus, medias, longitude, latitude } = this.state.form;
        const payload: any = {
            post,
            postType,
            privacyStatus,
            medias: medias.map((v: any) => {
                return {
                    url: AppConfig.baseUrlApi + "/thrm-media/v1/file?source-id=karirapp-post&id=" + v.response.id,
                    mediaType: v.type,
                    name: v.name,
                };
            }),
            longitude,
            latitude,
        };
        this.setState({
            loading: true,
        });
        postFeed(payload)
            .then((res: AxiosResponse<any>) => {
                this.props.setEditedPost?.({
                    isEdited: false,
                    editedPost: {
                        post: "",
                        postType: "TEXT",
                        privacyStatus: "FRIENDS",
                        medias: [],
                        longitude: 0.0,
                        latitude: 0.0,
                    },
                });
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
                        privacyStatus: "FRIENDS",
                        medias: [],
                        longitude: 0.0,
                        latitude: 0.0,
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
        const { visible, currentUser } = this.props;
        return (
            <>
                <Modal
                    visible={visible}
                    title="Buat Postingan"
                    onCancel={() => {
                        this.setState(
                            {
                                form: {
                                    post: "",
                                    postType: "TEXT",
                                    privacyStatus: "FRIENDS",
                                    medias: [],
                                    longitude: 0.0,
                                    latitude: 0.0,
                                },
                            },
                            () => {
                                this.props.setEditedPost?.({
                                    isEdited: false,
                                    editedPost: {
                                        post: "",
                                        postType: "TEXT",
                                        privacyStatus: "FRIENDS",
                                        medias: [],
                                        longitude: 0.0,
                                        latitude: 0.0,
                                    },
                                });
                            }
                        );
                    }}
                    footer={[
                        <Row justify="space-between">
                            <Col span={16} style={{ textAlign: "left" }}>
                                <Space>
                                    <Button
                                        type="link"
                                        icon={<FontAwesomeIcon icon={faImages} style={{ color: "grey", fontSize: 18 }} />}
                                        onClick={() => {
                                            this.setState({
                                                showUploader: true,
                                                form: {
                                                    ...this.state.form,
                                                    postType: "MEDIA",
                                                },
                                            });
                                        }}
                                    ></Button>
                                    <Button
                                        type="link"
                                        icon={<FontAwesomeIcon icon={faPhotoVideo} style={{ color: "grey", fontSize: 18 }} />}
                                        onClick={() => {
                                            this.setState({
                                                showUploader: true,
                                                form: {
                                                    ...this.state.form,
                                                    postType: "MEDIA",
                                                },
                                            });
                                        }}
                                    ></Button>
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
                        <Col span={15}>
                            <Row align="middle">
                                <Col flex={"70px"}>
                                    <Avatar size={50} src={currentUser?.photo || ""} />
                                </Col>
                                <Col flex={"auto"}>
                                    <Typography.Title level={5} style={{ marginBottom: 0 }}>
                                        {currentUser.firstName} {currentUser.lastName}
                                    </Typography.Title>
                                    <Typography.Text
                                        className="blue-primary"
                                        style={{ fontSize: 10, cursor: "pointer" }}
                                        onClick={() => {
                                            this.setState({
                                                pickLocation: true,
                                            });
                                        }}
                                    >
                                        Tambah Lokasi
                                    </Typography.Text>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={9} style={{ textAlign: "right" }}>
                            <Select
                                value={this.state.form.privacyStatus}
                                size="small"
                                onChange={(e) =>
                                    this.setState({
                                        form: {
                                            ...this.state.form,
                                            privacyStatus: e,
                                        },
                                    })
                                }
                            >
                                <Select.Option value={"PUBLIC"}>
                                    <FontAwesomeIcon icon={faGlobe} style={{ marginRight: 5, color: "grey" }} />
                                    Public
                                </Select.Option>
                                <Select.Option value={"FRIENDS"}>
                                    <FontAwesomeIcon icon={faUsers} style={{ marginRight: 5, color: "grey" }} />
                                    Friends
                                </Select.Option>
                                <Select.Option value={"ONLY_ME"}>
                                    <FontAwesomeIcon icon={faUserLock} style={{ marginRight: 5, color: "grey" }} />
                                    Only Me
                                </Select.Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Input.TextArea
                                value={this.state.form.post}
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
                    {this.state.showUploader && (
                        <div style={{ marginTop: 10 }}>
                            <div style={{ textAlign: "right" }}>
                                <Button
                                    type="link"
                                    icon={<FontAwesomeIcon icon={faTimes} style={{ color: "grey" }} />}
                                    onClick={() => {
                                        this.setState({
                                            showUploader: false,
                                            form: {
                                                ...this.state.form,
                                                medias: [],
                                            },
                                        });
                                    }}
                                />
                            </div>
                            <Upload
                                listType="picture-card"
                                accept="video/*,image/*"
                                fileList={this.state.form.medias}
                                customRequest={async (option: any) => {
                                    // console.log('compressing...')
                                    const _this = this;
                                    _this.setState({ uploadingProgress: 0, loading: true });
                                    console.log(option);

                                    const metadata = {
                                        name: option.file.name,
                                        mimeType: option.file.type,
                                    };
                                    _this.setState({ uploadingProgress: 5 });
                                    const form = new FormData();

                                    if (option.file.type.indexOf("image") !== -1) {
                                        const compressed: any = await imageCompression(option.file, {
                                            maxSizeMB: 0.5,
                                            maxWidthOrHeight: 1200,
                                            useWebWorker: true,
                                        });
                                        form.append("file", compressed, compressed.name);
                                    } else {
                                        form.append("file", option.file, option.file.name);
                                    }
                                    // console.log('compressed ', compressed, option)
                                    form.append(
                                        "metadata",
                                        new Blob([JSON.stringify(metadata)], {
                                            type: "application/json",
                                        })
                                    );

                                    const request = new XMLHttpRequest();
                                    request.open("POST", AppConfig.url.postStatusPhoto);
                                    const token = window.localStorage.getItem("token");
                                    request.setRequestHeader("Authorization", "Bearer " + token);
                                    request.upload.addEventListener("progress", function (e) {
                                        // upload progress as percentage
                                        let percent_completed = Math.floor((e.loaded / e.total) * 100);
                                        _this.setState({
                                            uploadingProgress: percent_completed,
                                        });
                                        option.onProgress({ percent: percent_completed });
                                    });
                                    request.addEventListener("load", function () {
                                        if (request.status === 200) {
                                            console.log(request);
                                            option.onSuccess(request.response);
                                        } else {
                                            const error = new Error("Some error");
                                            option.onError({ error });
                                        }
                                    });
                                    request.send(form);
                                }}
                                onChange={(e: any) => {
                                    console.log(e);

                                    this.setState({
                                        form: {
                                            ...this.state.form,
                                            medias: e.fileList,
                                        },
                                        loading: false,
                                    });
                                }}
                            >
                                <Button icon={<FontAwesomeIcon icon={faPhotoVideo} style={{ color: "grey" }} />} />
                            </Upload>
                        </div>
                    )}
                </Modal>
                {this.state.pickLocation && this.renderPickLocation()}
            </>
        );
    }

    renderPickLocation() {
        return (
            <Modal
                visible={this.state.pickLocation}
                title={<div style={{ textAlign: "center" }}>Cari Lokasi</div>}
                onCancel={() =>
                    this.setState({
                        pickLocation: false,
                    })
                }
            >
                <Input placeholder="Cari" prefix={<FontAwesomeIcon icon={faSearch} />} style={{ width: "100%", borderRadius: 20, color: "grey" }} />
                <List
                    dataSource={[
                        {
                            title: "Ant Design Title 1",
                        },
                        {
                            title: "Ant Design Title 2",
                        },
                        {
                            title: "Ant Design Title 3",
                        },
                        {
                            title: "Ant Design Title 4",
                        },
                    ]}
                    size="small"
                    renderItem={(item: any, i: number) => (
                        <List.Item key={i}>
                            <List.Item.Meta avatar={<Avatar shape="square" icon={<FontAwesomeIcon icon={faMapMarkerAlt} />} />} title={<div>{item.title}</div>} description="Ant Design, a design language  " />
                        </List.Item>
                    )}
                ></List>
            </Modal>
        );
    }
}

const mapStateToProps = (state: any) => ({
    currentUser: state.account.currentUser,
    postList: state.post.postList,
    pagination: state.post.pagination,
    editedPost: state.post.editedPost,
});

const mapDispatchToProps = (dispatch: any) => ({
    setPostList: (payload: any) =>
        dispatch({
            type: "SET_POST_LIST",
            payload,
        }),
    setEditedPost: (payload: any) =>
        dispatch({
            type: "SET_EDIT_POST",
            payload,
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(NewPost));
