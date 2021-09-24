import { Card, Col, Form, Input, Row, Tag, Button } from "antd";
import { Formik } from "formik";
import React from "react";

interface PersonalInfoProps {}

interface PersonalInfoState {
    formData: any;
}

class PersonalInfo extends React.Component<PersonalInfoProps, PersonalInfoState> {
    state = { formData: {} as any };
    componentDidMount() {
        console.log("focus");
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    render() {
        const { formData } = this.state;
        return (
            <>
                <Card>
                    <Form layout="vertical">
                        <Formik initialValues={formData} onSubmit={() => {}}>
                            {({ errors, touched, values, handleChange, handleBlur, setFieldValue, setFieldTouched, handleSubmit, isSubmitting, dirty }) => (
                                <>
                                    <Row gutter={[20, 20]}>
                                        <Col span={12}>
                                            <Form.Item
                                                label="First Name"
                                                validateStatus={errors.newPassword && touched.newPassword ? "error" : ""}
                                                help={errors.newPassword && touched.newPassword ? errors.newPassword : null}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Last Name"
                                                validateStatus={errors.newPassword && touched.newPassword ? "error" : ""}
                                                help={errors.newPassword && touched.newPassword ? errors.newPassword : null}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[20, 20]}>
                                        <Col span={24}>
                                            <Form.Item
                                                label="Your Job Now"
                                                validateStatus={errors.newPassword && touched.newPassword ? "error" : ""}
                                                help={errors.newPassword && touched.newPassword ? errors.newPassword : null}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[20, 20]}>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Date a Birth"
                                                validateStatus={errors.newPassword && touched.newPassword ? "error" : ""}
                                                help={errors.newPassword && touched.newPassword ? errors.newPassword : null}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Place of Birth"
                                                validateStatus={errors.newPassword && touched.newPassword ? "error" : ""}
                                                help={errors.newPassword && touched.newPassword ? errors.newPassword : null}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[20, 20]}>
                                        <Col span={24}>
                                            <Form.Item
                                                label="Telephone"
                                                validateStatus={errors.newPassword && touched.newPassword ? "error" : ""}
                                                help={errors.newPassword && touched.newPassword ? errors.newPassword : null}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[20, 20]}>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Country"
                                                validateStatus={errors.newPassword && touched.newPassword ? "error" : ""}
                                                help={errors.newPassword && touched.newPassword ? errors.newPassword : null}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Location"
                                                validateStatus={errors.newPassword && touched.newPassword ? "error" : ""}
                                                help={errors.newPassword && touched.newPassword ? errors.newPassword : null}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[20, 20]}>
                                        <Col span={24}>
                                            <Form.Item
                                                label="Address"
                                                validateStatus={errors.newPassword && touched.newPassword ? "error" : ""}
                                                help={errors.newPassword && touched.newPassword ? errors.newPassword : null}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[20, 20]}>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Relationship Status"
                                                validateStatus={errors.newPassword && touched.newPassword ? "error" : ""}
                                                help={errors.newPassword && touched.newPassword ? errors.newPassword : null}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Gender"
                                                validateStatus={errors.newPassword && touched.newPassword ? "error" : ""}
                                                help={errors.newPassword && touched.newPassword ? errors.newPassword : null}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[20, 20]}>
                                        <Col span={24}>
                                            <Form.Item
                                                label="Website Link"
                                                validateStatus={errors.newPassword && touched.newPassword ? "error" : ""}
                                                help={errors.newPassword && touched.newPassword ? errors.newPassword : null}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[20, 20]}>
                                        <Col span={24}>
                                            <Form.Item
                                                label="E-mail Link"
                                                validateStatus={errors.newPassword && touched.newPassword ? "error" : ""}
                                                help={errors.newPassword && touched.newPassword ? errors.newPassword : null}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[20, 20]}>
                                        <Col span={24}>
                                            <Form.Item
                                                label="Social Media Link"
                                                validateStatus={errors.newPassword && touched.newPassword ? "error" : ""}
                                                help={errors.newPassword && touched.newPassword ? errors.newPassword : null}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[20, 20]}>
                                        <Col span={24}>
                                            <Form.Item
                                                label="Religion"
                                                validateStatus={errors.newPassword && touched.newPassword ? "error" : ""}
                                                help={errors.newPassword && touched.newPassword ? errors.newPassword : null}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[20, 20]}>
                                        <Col span={24}>
                                            <Form.Item
                                                label="Interest / Hobby"
                                                validateStatus={errors.newPassword && touched.newPassword ? "error" : ""}
                                                help={errors.newPassword && touched.newPassword ? errors.newPassword : null}
                                            >
                                                <Tag closable>Movies</Tag>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[20, 20]}>
                                        <Col span={24}>
                                            <Form.Item>
                                                <Button type="primary">Submit</Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </>
                            )}
                        </Formik>
                    </Form>
                </Card>
            </>
        );
    }
}

export default PersonalInfo;
