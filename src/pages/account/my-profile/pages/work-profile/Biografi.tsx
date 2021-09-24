import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Descriptions, Row, Tag, Typography } from "antd";
import React from "react";

interface BiografiProps {}

interface BiografiState {}

class Biografi extends React.Component<BiografiProps, BiografiState> {
    render() {
        return (
            <>
                <Card id="biografi">
                    <Row justify="space-between">
                        <Col span={20}>
                            <Typography.Title level={4}>Biografi</Typography.Title>
                        </Col>
                        <Col span={4} style={{ textAlign: "right" }}>
                            <Button type="text" icon={<FontAwesomeIcon icon={faPencilAlt} />}></Button>
                        </Col>
                    </Row>

                    <Typography.Paragraph>
                        Helloo, im talented on … lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
                        vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                    </Typography.Paragraph>
                    <Descriptions column={1}>
                        <Descriptions.Item label="Expected Salary">2000-20000</Descriptions.Item>
                        <Descriptions.Item label="Prefered Work Location">Prepaid</Descriptions.Item>
                        <Descriptions.Item label="Current Address">18:00:00</Descriptions.Item>
                        <Descriptions.Item label="KTP Address">$80.00</Descriptions.Item>
                        <Descriptions.Item label="Things I Like">
                            <Tag>Tag 1</Tag>
                            <Tag>Renang</Tag>
                            <Tag>Renang</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Hobbies">
                            <Tag>Tag 1</Tag>
                            <Tag>Renang</Tag>
                            <Tag>Renang</Tag>
                            <Tag>Renang</Tag>
                            <Tag>Renang</Tag>
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            </>
        );
    }
}

export default Biografi;
