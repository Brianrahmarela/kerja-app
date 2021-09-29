import { faMapMarkerAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Card, Col, Form, Input, Modal, Row, Space, Typography } from "antd";
import { Formik } from "formik";
import React from "react";

interface OrganizationProps {}

interface OrganizationState {
    showForm: boolean;
}

class Organization extends React.Component<OrganizationProps, OrganizationState> {
    state = {
        showForm: false,
    };
    render() {
        const { showForm } = this.state;
        return (
            <>
                <Card id="organization" style={{ marginTop: 20 }}>
                    <Row justify="space-between">
                        <Col span={20}>
                            <Typography.Title level={4}>Organization</Typography.Title>
                        </Col>
                        <Col span={4} style={{ textAlign: "right" }}>
                            <Button
                                type="text"
                                icon={<FontAwesomeIcon icon={faPencilAlt} />}
                                onClick={() => {
                                    this.setState({
                                        showForm: true,
                                    });
                                }}
                            ></Button>
                        </Col>
                    </Row>
                    <Row gutter={[20, 20]}>
                        <Col span={12}>
                            <Row>
                                <Col span={3}>
                                    <Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                </Col>
                                <Col span={21}>
                                    <Space>
                                        <Typography.Text strong>Institute Kesenian Jakarta</Typography.Text>
                                        <Typography.Text> 2014 - 2016</Typography.Text>
                                    </Space>
                                    <Space>
                                        <Typography.Text>Magister Of Art</Typography.Text>|<Typography.Text>Fashion Design (Fashion Stylist)</Typography.Text>|<Typography.Text>3.40 / 4.00</Typography.Text>
                                    </Space>
                                    <Space>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                                        <Typography.Text> Jakarta, Indonesia</Typography.Text> |<Typography.Text>Fashion, Industry</Typography.Text>
                                    </Space>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row>
                                <Col span={3}>
                                    <Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                </Col>
                                <Col span={21}>
                                    <Space>
                                        <Typography.Text strong>Institute Kesenian Jakarta</Typography.Text>
                                        <Typography.Text> 2014 - 2016</Typography.Text>
                                    </Space>
                                    <Space>
                                        <Typography.Text>Magister Of Art</Typography.Text>|<Typography.Text>Fashion Design (Fashion Stylist)</Typography.Text>|<Typography.Text>3.40 / 4.00</Typography.Text>
                                    </Space>
                                    <Space>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                                        <Typography.Text> Jakarta, Indonesia</Typography.Text> |<Typography.Text>Fashion, Industry</Typography.Text>
                                    </Space>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row>
                                <Col span={3}>
                                    <Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                </Col>
                                <Col span={21}>
                                    <Space>
                                        <Typography.Text strong>Institute Kesenian Jakarta</Typography.Text>
                                        <Typography.Text> 2014 - 2016</Typography.Text>
                                    </Space>
                                    <Space>
                                        <Typography.Text>Magister Of Art</Typography.Text>|<Typography.Text>Fashion Design (Fashion Stylist)</Typography.Text>|<Typography.Text>3.40 / 4.00</Typography.Text>
                                    </Space>
                                    <Space>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                                        <Typography.Text> Jakarta, Indonesia</Typography.Text> |<Typography.Text>Fashion, Industry</Typography.Text>
                                    </Space>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row>
                                <Col span={3}>
                                    <Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                </Col>
                                <Col span={21}>
                                    <Space>
                                        <Typography.Text strong>Institute Kesenian Jakarta</Typography.Text>
                                        <Typography.Text> 2014 - 2016</Typography.Text>
                                    </Space>
                                    <Space>
                                        <Typography.Text>Magister Of Art</Typography.Text>|<Typography.Text>Fashion Design (Fashion Stylist)</Typography.Text>|<Typography.Text>3.40 / 4.00</Typography.Text>
                                    </Space>
                                    <Space>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                                        <Typography.Text> Jakarta, Indonesia</Typography.Text> |<Typography.Text>Fashion, Industry</Typography.Text>
                                    </Space>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
                {showForm && this.renderForm()}
            </>
        );
    }
    renderForm() {
        const { showForm } = this.state;
        return (
            <>
                <Modal
                    visible={showForm}
                    closable={false}
                    onCancel={() => {
                        this.setState({
                            showForm: false,
                        });
                    }}
                    width={800}
                >
                    <Form layout="vertical">
                        <Formik
                            enableReinitialize
                            initialValues={{
                                description: "",
                                currency: "IDR",
                                salary: 0,
                                locations: [],
                                likes: [],
                                hobbies: [],
                            }}
                            onSubmit={() => {}}
                        >
                            {({ errors, touched, values, handleChange, handleBlur, setFieldValue, setFieldTouched, handleSubmit, isSubmitting, dirty }) => (
                                <>
                                    <Row gutter={[20, 20]}>
                                        <Col span={24}>
                                            <Form.Item
                                                label="Describe your self"
                                                validateStatus={errors.description && touched.description ? "error" : ""}
                                                help={errors.description && touched.description ? errors.description : null}
                                            >
                                                <Input.TextArea name="description" value={values.description} onChange={handleChange} onBlur={handleBlur} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </>
                            )}
                        </Formik>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default Organization;
