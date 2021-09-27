import React from "react";
import { Avatar, Button, Card, Checkbox, Col, Form, Input, Row, Steps, Typography, Upload } from "antd";
import { Formik } from "formik";
import { DefaultEditor } from "react-simple-wysiwyg";

interface CreateProps {}

interface CreateState {}

class Create extends React.Component<CreateProps, CreateState> {
    render() {
        return (
            <div className="select-info-page">
                <Typography.Title level={3}>Create New</Typography.Title>
                <Steps size="small" current={0}>
                    <Steps.Step title="Personal Details" />
                    <Steps.Step title="Choose Template" />
                    <Steps.Step title="Preview & Finish" />
                </Steps>
                <br />
                <br />

                <Row>
                    <Col span={24}>
                        <Form layout="vertical">
                            <Formik initialValues={{ firstName: "" }} onSubmit={() => {}}>
                                {({ errors, touched, values, handleChange, handleBlur, setFieldValue, setFieldTouched, handleSubmit, isSubmitting, dirty }) => (
                                    <div>
                                        <Card>
                                            <Row gutter={[20, 20]}>
                                                <Col span={24}>
                                                    <Form.Item validateStatus={errors.firstName && touched.firstName ? "error" : ""} help={errors.firstName && touched.firstName ? errors.firstName : null}>
                                                        <div style={{ width: "100%", textAlign: "center" }}>
                                                            <div style={{ marginBottom: 10 }}>
                                                                <Avatar size={120} src="https://images7.alphacoders.com/411/thumb-1920-411820.jpg" />
                                                            </div>
                                                            <Upload>
                                                                <Button>Change Photo</Button>
                                                            </Upload>
                                                        </div>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={[20, 20]}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="First Name"
                                                        validateStatus={errors.firstName && touched.firstName ? "error" : ""}
                                                        help={errors.firstName && touched.firstName ? errors.firstName : null}
                                                    >
                                                        <Input bordered={false} readOnly value={"asdf"} suffix={<Checkbox checked />} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Last Name"
                                                        validateStatus={errors.firstName && touched.firstName ? "error" : ""}
                                                        help={errors.firstName && touched.firstName ? errors.firstName : null}
                                                    >
                                                        <Input bordered={false} readOnly value={"asdf"} suffix={<Checkbox checked />} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={[20, 20]}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="E-mail Link"
                                                        validateStatus={errors.firstName && touched.firstName ? "error" : ""}
                                                        help={errors.firstName && touched.firstName ? errors.firstName : null}
                                                    >
                                                        <Input bordered={false} readOnly value={"asdf"} suffix={<Checkbox checked />} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Phone Number"
                                                        validateStatus={errors.firstName && touched.firstName ? "error" : ""}
                                                        help={errors.firstName && touched.firstName ? errors.firstName : null}
                                                    >
                                                        <Input bordered={false} readOnly value={"asdf"} suffix={<Checkbox checked />} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={[20, 20]}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Country"
                                                        validateStatus={errors.firstName && touched.firstName ? "error" : ""}
                                                        help={errors.firstName && touched.firstName ? errors.firstName : null}
                                                    >
                                                        <Input bordered={false} readOnly value={"asdf"} suffix={<Checkbox checked />} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Location"
                                                        validateStatus={errors.firstName && touched.firstName ? "error" : ""}
                                                        help={errors.firstName && touched.firstName ? errors.firstName : null}
                                                    >
                                                        <Input bordered={false} readOnly value={"asdf"} suffix={<Checkbox checked />} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={[20, 20]}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Date a Birth"
                                                        validateStatus={errors.firstName && touched.firstName ? "error" : ""}
                                                        help={errors.firstName && touched.firstName ? errors.firstName : null}
                                                    >
                                                        <Input bordered={false} readOnly value={"asdf"} suffix={<Checkbox checked />} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        label="Place of Birth"
                                                        validateStatus={errors.firstName && touched.firstName ? "error" : ""}
                                                        help={errors.firstName && touched.firstName ? errors.firstName : null}
                                                    >
                                                        <Input bordered={false} readOnly value={"asdf"} suffix={<Checkbox checked />} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={[20, 20]}>
                                                <Col span={24}>
                                                    <Form.Item
                                                        label="Address"
                                                        validateStatus={errors.firstName && touched.firstName ? "error" : ""}
                                                        help={errors.firstName && touched.firstName ? errors.firstName : null}
                                                    >
                                                        <Input bordered={false} readOnly value={"asdf"} suffix={<Checkbox checked />} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Card>
                                        <br />
                                        <Typography.Title level={3}>Profile Description</Typography.Title>
                                        <Card>
                                            <Row>
                                                <Col span={24}>
                                                    <DefaultEditor value={""} style={{ height: 300 }} onChange={(e) => {}} />
                                                </Col>
                                            </Row>
                                        </Card>
                                        <br />
                                        <Typography.Title level={3}>Education</Typography.Title>
                                    </div>
                                )}
                            </Formik>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Create;
