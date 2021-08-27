import { faArrowLeft, faEllipsisH, faPhone, faSearch, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Col, Input, List, Row, Space, Typography } from "antd";
import moment from "moment";
import React from "react";

export interface ChatProps {}

export interface ChatState {}

class Chat extends React.Component<ChatProps, ChatState> {
    render() {
        return (
            <Row>
                <Col span={7}>
                    <List
                        header={
                            <>
                                <Row justify="space-between">
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
                                            <Space>
                                                <Button type="link">
                                                    <FontAwesomeIcon icon={faEllipsisH} />
                                                </Button>
                                            </Space>
                                        </Space>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Input prefix={<FontAwesomeIcon icon={faSearch} />} style={{ borderRadius: 20 }}></Input>
                                    </Col>
                                </Row>
                            </>
                        }
                        size="small"
                        split={false}
                        dataSource={[
                            "Racing car sprays burning fuel into crowd.",
                            "Japanese princess to wed commoner.",
                            "Australian walks 100km after outback crash.",
                            "Man charged over missing wedding girl.",
                            "Los Angeles battles huge wildfires.",
                        ]}
                        renderItem={() => (
                            <List.Item style={{ alignItems: "flex-start" }}>
                                <Col flex={"50px"} style={{ paddingLeft: 0 }}>
                                    <Avatar size={"large"}></Avatar>
                                </Col>
                                <Col flex="auto">
                                    <Row justify="space-between" align="top" style={{ width: "100%" }}>
                                        <Col>
                                            <div>Silviana Juli</div>
                                            <div className="grey-primary" style={{ fontSize: 10 }}>
                                                73 rb Pengikut
                                            </div>
                                        </Col>
                                        <Col>{moment().format("ll")}</Col>
                                    </Row>
                                </Col>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col span={17}></Col>
            </Row>
        );
    }
}

export default Chat;
