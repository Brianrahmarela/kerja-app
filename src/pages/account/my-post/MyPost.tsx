import { faComment, faImages, faNewspaper, faShare, faThumbsUp, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Card, Col, Divider, Input, Row, Space, Typography } from "antd";
import { AxiosResponse } from "axios";
import React from "react";
import { connect } from "react-redux";
import { encodeHashUserId } from "../../../config/Util";
import { getHeaderPersonal, getSidePersonal } from "../../../repository/WorkerRepo";
import NewPost from "../../home/posts/NewPost";
import Posts from "./posts/Posts";

interface MyPostProps {
    isEdited?: boolean;
    setEditedPost?: (x: any) => void;
    currentUser?: any;
}

interface MyPostState {
    showUploader?: boolean;
    personalInfo: any;
}

class MyPost extends React.Component<MyPostProps, MyPostState> {
    state = {
        isEdited: false,
        showUploader: false,
        personalInfo: null as any,
    };
    componentDidMount() {}
    componentDidUpdate(prevProps: any) {
        if (this.props.currentUser !== prevProps.currentUser) {
            this.getData();
        }
    }
    getData() {
        const encodedId = encodeHashUserId(this.props.currentUser?.id);

        getSidePersonal(encodedId)
            .then((res: AxiosResponse<any>) => {
                const { data } = res;
                const newData = {
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    jobTitle: data.jobTitle || "",
                    company: data.company || "",
                    likes: data.likes || 0,
                    posts: data.posts || 0,
                    comments: data.comments || 0,
                    follower: data.follower || 0,
                    following: data.following || 0,
                };

                this.setState({ personalInfo: newData });
            })
            .catch((error) => {})
            .finally(() => {});
    }
    render() {
        const { currentUser } = this.props;
        const { personalInfo } = this.state;
        return (
            <>
                <Row gutter={[20, 20]}>
                    <Col span={8}>
                        <Card>
                            <Row align="middle" justify="center">
                                <Col span={8} style={{ marginTop: 15 }}>
                                    <Avatar size={100} src={currentUser?.photo} />
                                </Col>
                            </Row>
                            <Row align="middle" justify="center">
                                <Col span={24} style={{ textAlign: "center", marginTop: 20 }}>
                                    <Typography.Title level={5}>
                                        {currentUser?.firstName} {currentUser?.lastName}
                                    </Typography.Title>
                                    <Typography.Text>
                                        {personalInfo?.jobTitle} di {personalInfo?.company}
                                    </Typography.Text>
                                    <div style={{ marginTop: 20 }}>
                                        <Typography.Text className="blue-primary" style={{ fontSize: 18 }}>
                                            {personalInfo?.posts} Posts
                                        </Typography.Text>
                                    </div>
                                    <Divider />
                                    <Space>
                                        <Button type="text" icon={<FontAwesomeIcon icon={faThumbsUp} style={{ marginRight: 5 }} />}>
                                            {personalInfo?.likes || 0}
                                        </Button>
                                        <Button type="text" icon={<FontAwesomeIcon icon={faComment} style={{ marginRight: 5 }} />}>
                                            {personalInfo?.comments || 0}
                                        </Button>
                                        <Button type="text" icon={<FontAwesomeIcon icon={faShare} style={{ marginRight: 5 }} />}>
                                            {personalInfo?.shared || 0}
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={16}>
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
                                    <Avatar size={50} src={currentUser?.photo} />
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
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyPost);
