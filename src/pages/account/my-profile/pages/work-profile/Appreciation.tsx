import { faCaretDown, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, List, Row, Skeleton, Typography } from "antd";
import React from "react";
const { Slide } = require("react-slideshow-image");

interface AppreciationProps {}

interface AppreciationState {}

class Appreciation extends React.Component<AppreciationProps, AppreciationState> {
    render() {
        return (
            <>
                <Card id="appreciation" style={{ marginTop: 20 }}>
                    <Row justify="space-between">
                        <Col span={20}>
                            <Typography.Title level={4}>Appreciation</Typography.Title>
                        </Col>
                        <Col span={4} style={{ textAlign: "right" }}>
                            <Button type="text" icon={<FontAwesomeIcon icon={faPencilAlt} />}></Button>
                        </Col>
                    </Row>
                    <Slide slidesToShow={4}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((value: any) => (
                            <div style={{ padding: 5 }}>
                                <Card style={{ width: "100%", padding: 0 }} bodyStyle={{ padding: 0 }}>
                                    <Row>
                                        <Col span={24}>
                                            <img src="https://images7.alphacoders.com/411/thumb-1920-411820.jpg" alt="" style={{ width: "100%" }} />
                                        </Col>
                                    </Row>
                                </Card>
                            </div>
                        ))}
                    </Slide>
                    <List
                        itemLayout="horizontal"
                        loadMore={
                            <div style={{ width: "100%", textAlign: "center", padding: 5 }}>
                                <Button type="text" size="small">
                                    Lainnya <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: 5 }} />
                                </Button>
                            </div>
                        }
                        dataSource={[
                            "Racing car sprays burning fuel into crowd.",
                            "Japanese princess to wed commoner.",
                            "Australian walks 100km after outback crash.",
                            "Man charged over missing wedding girl.",
                            "Los Angeles battles huge wildfires.",
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                <Skeleton loading={false} title={true} active={false}>
                                    <List.Item.Meta
                                        title={<a href="https://ant.design">{item}</a>}
                                        description="Dec, 2015                                                honor issuer29th All Japan Model United Nations Managing Office"
                                    />
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </Card>
            </>
        );
    }
}

export default Appreciation;
