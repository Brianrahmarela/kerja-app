import { faCamera, faMapMarkerAlt, faPencilAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Col, Menu, Modal, Row, Typography, Upload } from "antd";
import { AxiosResponse } from "axios";
import moment from "moment";
import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AppConfig } from "../../config/Config";
import { encodeHashUserId } from "../../config/Util";
import { getMe } from "../../repository/UserRepo";
import { getHeaderPersonal } from "../../repository/WorkerRepo";
import imageCompression from "browser-image-compression";
import { getBgProfile } from "../../repository/AuthRepo";

export interface MenuHeaderProps {
    t?: (x: any) => any;
    currentUser?: any;
    setCurrentUser?: (x: any) => void;
}

export interface MenuHeaderState {
    personalInfo: any;
    pageReady: boolean;
    bgProfile: string;
}

class MenuHeader extends React.Component<MenuHeaderProps, MenuHeaderState> {
    state = {
        personalInfo: null as any,
        pageReady: false,
        bgProfile: "",
    };
    componentDidMount() {
        if (this.props.currentUser !== null) {
            this.getData();
        }
        getBgProfile().then((res: AxiosResponse<any>) => {
            this.setState({ bgProfile: res.data });
        });
    }
    componentDidUpdate(prevProps: any) {
        if (prevProps.currentUser == null && this.props.currentUser !== prevProps.currentUser) {
            this.getData();
        }
    }
    getData() {
        const encodedId = encodeHashUserId(this.props.currentUser?.id);

        getHeaderPersonal(encodedId)
            .then((res: AxiosResponse<any>) => {
                const { data } = res;
                const newData = {
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    jobTitle: data.jobTitle || "",
                    email: data.email || "",
                    phoneNumber: data.phoneNumber || "",
                    country: data.country || "",
                    region: data.region || "",
                    photo: data.photo || "",
                    follower: data.follower || 0,
                    following: data.following || 0,
                    percentage: data.percentage || 0,
                };
                this.setState({ personalInfo: newData });
            })
            .catch((error) => {
                Modal.error({
                    title: `${this.props.t?.("notif.failed")}`,
                    content: error.response?.data?.message || error.message || "-",
                });
            })
            .finally(() => {
                this.setState({ pageReady: true });
            });
    }
    render() {
        const { personalInfo, bgProfile } = this.state;
        console.log(bgProfile);
        return (
            <div className="profile-header" style={{ marginBottom: 20, marginTop: 20 }}>
                <Row className="bg-cover" style={{ backgroundImage: bgProfile ? `url(${bgProfile})` : "`url(https://images7.alphacoders.com/411/thumb-1920-411820.jpg)" }}>
                    <Col xs={24} sm={6}>
                        <div className="avatar-wrapper">
                            <div className="avatar-border">
                                <Avatar size={140} src={personalInfo?.photo} />
                                <Upload
                                    listType="picture"
                                    accept="image/*"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    customRequest={async (option: any) => {
                                        const compressed: any = await imageCompression(option.file, {
                                            maxSizeMB: 0.5,
                                            maxWidthOrHeight: 1200,
                                            useWebWorker: true,
                                        });

                                        const metadata = {
                                            name: option.file.name,
                                            mimeType: option.file.type,
                                        };

                                        const form = new FormData();
                                        form.append(
                                            "metadata",
                                            new Blob([JSON.stringify(metadata)], {
                                                type: "application/json",
                                            })
                                        );
                                        form.append("file", compressed, compressed.name);
                                        const request = new XMLHttpRequest();
                                        request.open("POST", AppConfig.url.postPhotoProfile);
                                        const token = localStorage.getItem("token");
                                        request.setRequestHeader("Authorization", "Bearer " + token);

                                        request.addEventListener("load", function () {
                                            if (request.status === 200) {
                                                option.onSuccess(request.response);
                                            } else {
                                                const error = new Error("Some error");
                                                option.onError({ error });
                                            }
                                        });
                                        request.send(form);
                                    }}
                                    onChange={(e: any) => {
                                        if (e.file.status === "done") {
                                            console.log("selesai", e.file.response);
                                            getMe()
                                                .then((res: AxiosResponse<any>) => {
                                                    this.props.setCurrentUser?.(res.data);
                                                })
                                                .catch((error: any) => {
                                                    Modal.error({
                                                        title: "Error!",
                                                        content: error?.response?.message || error?.message || "",
                                                    });
                                                });
                                            this.setState({
                                                personalInfo: {
                                                    ...this.state.personalInfo,
                                                    photo: AppConfig.baseUrlApi + "/thrm-media/v1/file?forceImage=true&source-id=karirapp-profile&id=" + e.file.response.id,
                                                },
                                            });
                                        }
                                    }}
                                >
                                    <Button size="large" shape={"circle"} type="primary" danger icon={<FontAwesomeIcon icon={faCamera} />} style={{ opacity: 0.6, top: -45, right: -5 }} />
                                </Upload>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={10}>
                        <div className="name-wrapper">
                            <div style={{ position: "absolute", bottom: 15 }}>
                                <Typography.Title level={2}>
                                    {personalInfo?.firstName} {personalInfo?.lastName}
                                </Typography.Title>
                                <span>Join on {moment(personalInfo?.createdAt).format("ll")}</span>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={8} style={{ position: "relative" }}>
                        <Button type="link" style={{ position: "absolute", bottom: 15, right: 15 }}>
                            <Upload
                                listType="picture"
                                accept="image/*"
                                className="avatar-uploader"
                                showUploadList={false}
                                customRequest={async (option: any) => {
                                    const compressed: any = await imageCompression(option.file, {
                                        maxSizeMB: 0.5,
                                        maxWidthOrHeight: 1200,
                                        useWebWorker: true,
                                    });

                                    const metadata = {
                                        name: option.file.name,
                                        mimeType: option.file.type,
                                    };

                                    const form = new FormData();
                                    form.append(
                                        "metadata",
                                        new Blob([JSON.stringify(metadata)], {
                                            type: "application/json",
                                        })
                                    );
                                    form.append("file", compressed, compressed.name);
                                    const request = new XMLHttpRequest();
                                    request.open("POST", AppConfig.url.postBgProfile);
                                    const token = localStorage.getItem("token");
                                    request.setRequestHeader("Authorization", "Bearer " + token);

                                    request.addEventListener("load", function () {
                                        if (request.status === 200) {
                                            option.onSuccess(request.response);
                                        } else {
                                            const error = new Error("Some error");
                                            option.onError({ error });
                                        }
                                    });
                                    request.send(form);
                                }}
                                onChange={(e: any) => {
                                    if (e.file.status === "done") {
                                        console.log("selesai", e.file.response);
                                        getMe()
                                            .then((res: AxiosResponse<any>) => {
                                                this.props.setCurrentUser?.(res.data);
                                            })
                                            .catch((error: any) => {
                                                Modal.error({
                                                    title: "Error!",
                                                    content: error?.response?.message || error?.message || "",
                                                });
                                            });
                                        this.setState({
                                            bgProfile: e.file.response,
                                        });
                                    }
                                }}
                            >
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </Upload>
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col {...{ sm: { offset: 5, span: 9 }, xs: { offset: 0, span: 12 } }} className="underline">
                        <Menu mode="horizontal">
                            <Menu.Item key="location" icon={<FontAwesomeIcon icon={faMapMarkerAlt} />}>
                                {personalInfo?.region || "-"}
                            </Menu.Item>
                            <Menu.Item key="follower" icon={<FontAwesomeIcon icon={faUsers} />}>
                                {personalInfo?.follower || 0} follower
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col {...{ sm: { span: 10 }, xs: { span: 12 } }} className="underline">
                        <div
                            style={{
                                width: "100%",
                            }}
                        >
                            <div style={{ marginLeft: "auto" }}>
                                <Menu mode="horizontal" style={{ justifyContent: "flex-end" }}>
                                    <Menu.Item key="about">
                                        <Link to={"/account/"}>Post</Link>
                                    </Menu.Item>
                                    <Menu.Item key="setting">
                                        <Link to={"/account/my-profile"}>About me</Link>
                                    </Menu.Item>
                                    <Menu.Item key="me">
                                        <Link to={"/account/my-network"}>My Network</Link>
                                    </Menu.Item>
                                </Menu>
                            </div>
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

const mapDispatchToProps = (dispatch: any) => ({
    setCurrentUser: (payload: any) =>
        dispatch({
            type: "SET_CURRENT_USER",
            payload,
        }),
});
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(MenuHeader));
