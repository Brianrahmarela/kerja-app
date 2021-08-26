import { faBookmark, faEllipsisV, faPaperPlane, faPlus, faShare, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Card, Col, Divider, Dropdown, Image, Menu, Modal, Row, Space, Tooltip, Typography } from "antd";
import moment from "moment";
import React from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import Comments from "./comments/Comments";

export interface PostItemProps {
    postData: any;
}
export interface PostItemState {}
class PostItem extends React.Component<PostItemProps, PostItemState> {
    render() {
        const { postData } = this.props;
        return (
            <Card className="dashbord-card" style={{ width: "100%" }}>
                {/* header posting  */}
                <Row justify="space-between" style={{ marginBottom: 10 }}>
                    <Col span={20}>
                        <Row>
                            <Col flex="55px">
                                <Avatar size={45} src={postData.photo} shape="circle" />
                            </Col>
                            <Col flex="auto">
                                <Link to={"/profile/ "} style={{ color: "rgba(0, 0, 0, 0.85)" }}>
                                    <span style={{ display: "block", fontWeight: 500 }}>
                                        {postData.firstName} {postData.lastName}
                                    </span>
                                </Link>
                                <sub
                                    style={{
                                        fontSize: 10,
                                        position: "relative",
                                        bottom: 4,
                                    }}
                                >
                                    {moment(postData.updatedAt).format("DD MMMM YYYY HH:mm")}
                                </sub>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={4} style={{ textAlign: "right" }}>
                        <Dropdown
                            overlay={
                                <Menu>
                                    <Menu.Item key="set-post:1" onClick={() => {}}>
                                        Edit
                                    </Menu.Item>
                                    <Menu.Item
                                        key="set-post:2"
                                        onClick={() => {
                                            Modal.confirm({
                                                title: "Confirmation",
                                                content: "Are your sure to delete this post?",
                                                onOk: () => {},
                                            });
                                        }}
                                    >
                                        Delete
                                    </Menu.Item>
                                </Menu>
                            }
                        >
                            <FontAwesomeIcon icon={faEllipsisV} color="grey" />
                        </Dropdown>
                    </Col>
                </Row>
                {/*e: header posting  */}

                {/* the posting  */}
                <Typography.Paragraph style={{ margin: "0 0 10px" }}>{postData.post}</Typography.Paragraph>
                {/* e: the posting  */}
                {postData.postType === "MEDIA" && this.renderMedia(postData)}

                {/* likes button  */}
                <Row justify="space-between">
                    <Col span={12}>
                        <Space>
                            <Typography.Text>{postData.commentCount} Comments</Typography.Text>
                            <Button type="link" icon={<FontAwesomeIcon icon={faThumbsUp} style={{ marginRight: 5 }} />}>
                                {postData.likeCount}
                            </Button>
                            <Avatar.Group size="small">
                                <Avatar src={postData.photo} />
                                <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
                                <Tooltip title="Ant User" placement="top">
                                    <Avatar style={{ backgroundColor: "#87d068" }} />
                                </Tooltip>
                                <Avatar style={{ backgroundColor: "#1890ff" }} />
                            </Avatar.Group>
                        </Space>
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                        <Space align="end">
                            <Button type="link" icon={<FontAwesomeIcon icon={faShare} style={{ marginRight: 5 }} />}>
                                Share
                            </Button>
                            <Button type="link" icon={<FontAwesomeIcon icon={faBookmark} style={{ marginRight: 5 }} />}>
                                Archive
                            </Button>
                            <Button type="link" icon={<FontAwesomeIcon icon={faPaperPlane} style={{ marginRight: 5 }} />}>
                                Send
                            </Button>
                        </Space>
                    </Col>
                </Row>
                {/* e: likes button  */}
                <Divider style={{ margin: "7px 0" }} />
                <Comments postData={postData} />
                <Divider style={{ margin: "7px 0 24px" }} />
            </Card>
        );
    }

    renderMedia = (e: any) => {
        console.log(e.medias);
        if (e.medias.length > 1) {
            const a = e.medias.map((v: any, i: number) => {
                if (i === 0) {
                    return (
                        <Col key={i + e.id} span={24}>
                            {e.medias[i].mediaType.indexOf("image") !== -1 ? (
                                <Image style={{ maxHeight: 600, width: "100%" }} src={e.medias[i].url} />
                            ) : (
                                <ReactPlayer width={"100%"} controls style={{ backgroundColor: "grey" }} light={e.medias[i].url + "&thumb=true"} url={[{ src: e.medias[i].url, type: e.medias[i].type }]} />
                            )}
                        </Col>
                    );
                }
                if (i > 3) {
                    return null;
                }
                if (i === 3) {
                    return (
                        <Col key={i + e.id} span={8} style={{ position: "relative" }}>
                            <div
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "grey",
                                    zIndex: 2,
                                    position: "absolute",
                                    opacity: 0.5,
                                    color: "white",
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: 25,
                                }}
                                onClick={() =>
                                    this.setState({
                                        showPreview: true,
                                        mediaDataPreview: e.medias,
                                    })
                                }
                            >
                                <FontAwesomeIcon icon={faPlus} style={{ fontSize: 25 }} /> More
                            </div>
                            {e.medias[i].mediaType.indexOf("image") !== -1 ? (
                                <Image src={e.medias[i].url} />
                            ) : (
                                <ReactPlayer
                                    width={"100%"}
                                    height={125}
                                    controls
                                    style={{ backgroundColor: "grey" }}
                                    light={e.medias[i].url + "&thumb=true"}
                                    url={[{ src: e.medias[i].url, type: e.medias[i].mediaType }]}
                                />
                            )}
                        </Col>
                    );
                } else {
                    return (
                        <Col key={i + e.id} span={8}>
                            {e.medias[i].mediaType.indexOf("image") !== -1 ? (
                                <Image src={e.medias[i].url} />
                            ) : (
                                <ReactPlayer
                                    width={"100%"}
                                    height={125}
                                    controls
                                    style={{ backgroundColor: "grey" }}
                                    light={e.medias[i].url + "&thumb=true"}
                                    url={[{ src: e.medias[i].url, type: e.medias[i].mediaType }]}
                                />
                            )}
                        </Col>
                    );
                }
            });
            return (
                <Row gutter={[5, 5]} justify="center" align="middle">
                    <Image.PreviewGroup>{a}</Image.PreviewGroup>
                </Row>
            );
        } else {
            if (e.medias[0].mediaType.indexOf("image") !== -1) {
                return <Image src={e.medias[0].url} />;
            }
            return <ReactPlayer controls={true} light={e.medias[0].url + "&thumb=true"} url={[{ src: e.medias[0].url, type: e.medias[0].mediaType }]} />;
        }
    };
}

export default PostItem;
