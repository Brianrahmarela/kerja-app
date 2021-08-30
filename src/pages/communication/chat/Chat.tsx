import { faArrowLeft, faEllipsisH, faImages, faPaperclip, faPaperPlane, faPhone, faSearch, faSmile, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Card, Col, Input, List, Row, Space, Typography } from "antd";
import moment from "moment";
import React from "react";
import "react-chat-elements/dist/main.css";
const { ChatList, MessageList, Input: InputChat, Button: ButtonChat, Navbar, SystemMessage, MessageBox } = require("react-chat-elements");
// MessageBox component
export interface ChatProps {}

export interface ChatState {}

class Chat extends React.Component<ChatProps, ChatState> {
    render() {
        return (
            <Card className="chat-component">
                <Row>
                    <Col span={9} className="chatlist">
                        <Row justify="space-between" className="top-chatlist">
                            <Col>
                                <Space>
                                    <Button type="link">
                                        <FontAwesomeIcon icon={faArrowLeft} />
                                    </Button>
                                    <Typography.Text>Chat</Typography.Text>
                                </Space>
                            </Col>
                            <Col>
                                <Space>
                                    <Button type="link">
                                        <FontAwesomeIcon icon={faVideo} />
                                    </Button>
                                    <Button type="link">
                                        <FontAwesomeIcon icon={faPhone} />
                                    </Button>

                                    <Button type="link">
                                        <FontAwesomeIcon icon={faEllipsisH} />
                                    </Button>
                                </Space>
                            </Col>
                        </Row>
                        <Row className="search-chatlist">
                            <Col span={24}>
                                <Input prefix={<FontAwesomeIcon icon={faSearch} />} style={{ borderRadius: 20 }}></Input>
                            </Col>
                        </Row>
                        <ChatList
                            className="chat-list"
                            dataSource={[
                                {
                                    avatar: "https://facebook.github.io/react/img/logo.svg",
                                    alt: "Reactjs",
                                    title: "Facebook",
                                    subtitle: "What are you doing?",
                                    date: new Date(),
                                    unread: 0,
                                },
                                {
                                    avatar: "https://facebook.github.io/react/img/logo.svg",
                                    alt: "Reactjs",
                                    title: "Facebook",
                                    subtitle: "What are you doing?",
                                    date: new Date(),
                                    unread: 0,
                                },
                                {
                                    avatar: "https://facebook.github.io/react/img/logo.svg",
                                    alt: "Reactjs",
                                    title: "Facebook",
                                    subtitle: "What are you doing?",
                                    date: new Date(),
                                    unread: 0,
                                },
                                {
                                    avatar: "https://facebook.github.io/react/img/logo.svg",
                                    alt: "Reactjs",
                                    title: "Facebook",
                                    subtitle: "What are you doing?",
                                    date: new Date(),
                                    unread: 0,
                                },
                                {
                                    avatar: "https://facebook.github.io/react/img/logo.svg",
                                    alt: "Reactjs",
                                    title: "Facebook",
                                    subtitle: "What are you doing?",
                                    date: new Date(),
                                    unread: 0,
                                },
                                {
                                    avatar: "https://facebook.github.io/react/img/logo.svg",
                                    alt: "Reactjs",
                                    title: "Facebook",
                                    subtitle: "What are you doing?",
                                    date: new Date(),
                                    unread: 0,
                                },
                                {
                                    avatar: "https://facebook.github.io/react/img/logo.svg",
                                    alt: "Reactjs",
                                    title: "Facebook",
                                    subtitle: "What are you doing?",
                                    date: new Date(),
                                    unread: 0,
                                },
                                {
                                    avatar: "https://facebook.github.io/react/img/logo.svg",
                                    alt: "Reactjs",
                                    title: "Facebook",
                                    subtitle: "What are you doing?",
                                    date: new Date(),
                                    unread: 0,
                                },
                                {
                                    avatar: "https://facebook.github.io/react/img/logo.svg",
                                    alt: "Reactjs",
                                    title: "Facebook",
                                    subtitle: "What are you doing?",
                                    date: new Date(),
                                    unread: 0,
                                },
                                {
                                    avatar: "https://facebook.github.io/react/img/logo.svg",
                                    alt: "Reactjs",
                                    title: "Facebook",
                                    subtitle: "What are you doing?",
                                    date: new Date(),
                                    unread: 0,
                                },
                                {
                                    avatar: "https://facebook.github.io/react/img/logo.svg",
                                    alt: "Reactjs",
                                    title: "Facebook",
                                    subtitle: "What are you doing?",
                                    date: new Date(),
                                    unread: 0,
                                },
                                {
                                    avatar: "https://facebook.github.io/react/img/logo.svg",
                                    alt: "Reactjs",
                                    title: "Facebook",
                                    subtitle: "What are you doing?",
                                    date: new Date(),
                                    unread: 0,
                                },
                                {
                                    avatar: "https://facebook.github.io/react/img/logo.svg",
                                    alt: "Reactjs",
                                    title: "Facebook",
                                    subtitle: "What are you doing?",
                                    date: new Date(),
                                    unread: 0,
                                },
                                {
                                    avatar: "https://facebook.github.io/react/img/logo.svg",
                                    alt: "Reactjs",
                                    title: "Facebook",
                                    subtitle: "What are you doing?",
                                    date: new Date(),
                                    unread: 0,
                                },
                                {
                                    avatar: "https://facebook.github.io/react/img/logo.svg",
                                    alt: "Reactjs",
                                    title: "Facebook",
                                    subtitle: "What are you doing?",
                                    date: new Date(),
                                    unread: 0,
                                },
                                {
                                    avatar: "https://facebook.github.io/react/img/logo.svg",
                                    alt: "Reactjs",
                                    title: "Facebook",
                                    subtitle: "What are you doing? tesr",
                                    date: new Date(),
                                    unread: 0,
                                },
                            ]}
                        />
                    </Col>
                    <Col span={15}>
                        <Navbar
                            left={
                                <Row>
                                    <Col flex="32px">
                                        <Avatar></Avatar>
                                    </Col>
                                    <Col flex="auto">
                                        <div>
                                            <Typography.Text strong style={{ paddingLeft: 10 }}>
                                                test
                                            </Typography.Text>
                                        </div>
                                        <div style={{ marginTop: -8 }}>
                                            <Typography.Text style={{ paddingLeft: 10, fontSize: 10 }}>test</Typography.Text>
                                        </div>
                                    </Col>
                                </Row>
                            }
                            right={
                                <div>
                                    <Space>
                                        <Button type="default" shape="circle">
                                            <FontAwesomeIcon icon={faVideo} />
                                        </Button>
                                        <Button type="default" shape="circle">
                                            <FontAwesomeIcon icon={faPhone} />
                                        </Button>

                                        <Button type="default" shape="circle">
                                            <FontAwesomeIcon icon={faEllipsisH} />
                                        </Button>
                                    </Space>
                                </div>
                            }
                        />

                        <div className="message-list">
                            <MessageBox
                                position={"left"}
                                type={"photo"}
                                title="Me"
                                text={"react.svg"}
                                data={{
                                    uri: "https://facebook.github.io/react/img/logo.svg",
                                    status: {
                                        click: false,
                                        loading: 0,
                                    },
                                }}
                            />
                            <SystemMessage text={moment().format("ll").toString()} />
                            <MessageBox
                                position={"right"}
                                type={"photo"}
                                title="Me"
                                text={"react.svg"}
                                data={{
                                    uri: "https://facebook.github.io/react/img/logo.svg",
                                    status: {
                                        click: false,
                                        loading: 0,
                                    },
                                }}
                            />
                            <MessageBox
                                position={"left"}
                                title="Dia"
                                type={"text"}
                                text={"You can use the Input in conjunction with Tooltip component to create a Numeric Input, which can provide a good experience for extra-long content display."}
                            />
                            <MessageBox
                                position={"left"}
                                title="Dia"
                                type={"text"}
                                text={"You can use the Input in conjunction with Tooltip component to create a Numeric Input, which can provide a good experience for extra-long content display."}
                            />
                            <MessageBox
                                position={"right"}
                                title="Me"
                                type={"text"}
                                text={"You can use the Input in conjunction with Tooltip component to create a Numeric Input, which can provide a good experience for extra-long content display."}
                            />
                            <MessageBox position={"right"} title="Me" type={"text"} text={"You can use the Input in conjunction with Tooltip d."} status="read" />
                            <MessageBox
                                position={"left"}
                                type={"text"}
                                title="Dia"
                                titleColor={"#ffb3b3"}
                                status="waiting"
                                text={"Example of creating a search box by grouping a standard input with a search button."}
                            />
                        </div>
                        <div style={{ width: "100%", paddingTop: 15, paddingBottom: 15, borderTop: "1px solid #f0f0f0" }}>
                            <Row justify="space-around" align="middle">
                                <Col flex="50px" style={{ textAlign: "center" }}>
                                    <Button type="link" shape="circle">
                                        <FontAwesomeIcon icon={faImages} style={{ fontSize: 20 }} />
                                    </Button>
                                </Col>
                                <Col flex="50px" style={{ textAlign: "center" }}>
                                    <Button type="link" shape="circle">
                                        <FontAwesomeIcon icon={faSmile} style={{ fontSize: 20 }} />
                                    </Button>
                                </Col>
                                <Col flex="50px" style={{ textAlign: "center" }}>
                                    <Button type="link" shape="circle">
                                        <FontAwesomeIcon icon={faPaperclip} style={{ fontSize: 20 }} />
                                    </Button>
                                </Col>
                                <Col flex="auto">
                                    <Input style={{ borderRadius: 10, width: "100%" }}></Input>
                                </Col>
                                <Col flex="50px" style={{ textAlign: "center" }}>
                                    <Button type="primary" shape="circle">
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default Chat;
