import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Descriptions, Form, Input, InputNumber, Modal, Row, Select, Space, Tag, Typography } from "antd";
import { Formik } from "formik";
import React from "react";

interface BiografiProps {}

interface BiografiState {
    showForm: boolean;
    location: string;
    like: string;
    hobby: string;
}

class Biografi extends React.Component<BiografiProps, BiografiState> {
    state = {
        showForm: false,
        location: "",
        like: "",
        hobby: "",
    };
    render() {
        const { showForm } = this.state;
        return (
            <>
                <Card id="biografi">
                    <Row justify="space-between">
                        <Col span={20}>
                            <Typography.Title level={4}>Biografi</Typography.Title>
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
                {showForm && this.renderForm()}
            </>
        );
    }
    renderForm() {
        const { showForm, location, like, hobby } = this.state;
        return (
            <>
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
                                <Modal
                                    visible={showForm}
                                    onCancel={() => {
                                        this.setState({
                                            showForm: false,
                                        });
                                    }}
                                    title="Decribe your self"
                                    onOk={() => handleSubmit()}
                                    width={800}
                                >
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
                                        <Col span={24}>
                                            <Form.Item
                                                label={
                                                    <>
                                                        Montly Salary <span className="required">*</span>
                                                    </>
                                                }
                                                validateStatus={errors.salary && touched.salary ? "error" : ""}
                                                help={errors.salary && touched.salary ? errors.salary : null}
                                            >
                                                <Space>
                                                    <Select
                                                        value={values.currency}
                                                        onChange={(e) => {
                                                            console.log(e);
                                                            setFieldValue("currency", e);
                                                            setFieldTouched("currency");
                                                        }}
                                                    >
                                                        <Select.Option value={"IDR"}> IDR</Select.Option>
                                                        <Select.Option value={"USD"}> USD</Select.Option>
                                                        <Select.Option value={"AUD"}> AUD</Select.Option>
                                                        <Select.Option value={"MYR"}> MYR</Select.Option>
                                                        <Select.Option value={"SGD"}> SGD</Select.Option>
                                                        <Select.Option value={"PHP"}> PHP</Select.Option>
                                                        <Select.Option value={"INR"}> INR</Select.Option>
                                                        <Select.Option value={"THB"}> THB</Select.Option>
                                                        <Select.Option value={"HKD"}> HKD</Select.Option>
                                                        <Select.Option value={"EUR"}> EUR</Select.Option>
                                                        <Select.Option value={"CNY"}> CNY</Select.Option>
                                                        <Select.Option value={"JPY"}> JPY</Select.Option>
                                                        <Select.Option value={"GBP"}> GBP</Select.Option>
                                                        <Select.Option value={"VND"}> VND</Select.Option>
                                                        <Select.Option value={"BDT"}> BDT</Select.Option>
                                                        <Select.Option value={"NZD"}> NZD</Select.Option>
                                                    </Select>
                                                    <InputNumber
                                                        style={{ width: 200 }}
                                                        onChange={(e) => {
                                                            setFieldValue("salary", e);
                                                            setFieldTouched("salary", true);
                                                        }}
                                                    />
                                                    <InputNumber
                                                        style={{ width: 200 }}
                                                        onChange={(e) => {
                                                            setFieldValue("salary", e);
                                                            setFieldTouched("salary", true);
                                                        }}
                                                    />
                                                </Space>
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item
                                                label={
                                                    <>
                                                        Prefered location <span className="required">*</span>
                                                    </>
                                                }
                                                validateStatus={errors.locations && touched.locations ? "error" : ""}
                                                help={errors.locations && touched.locations ? errors.locations : null}
                                            >
                                                <Input
                                                    name="location"
                                                    value={location}
                                                    onChange={(e) => {
                                                        this.setState({ location: e.target.value });
                                                    }}
                                                    onPressEnter={(e: any) => {
                                                        const newLocations: string[] = [...values.locations];
                                                        console.log(e.target?.value);
                                                        newLocations.push(e.target?.value);
                                                        setFieldValue("locations", newLocations);
                                                        this.setState({ location: "" });
                                                    }}
                                                    onBlur={handleBlur}
                                                />
                                                <br />
                                                <br />
                                                {values.locations.map((val: any, i: number) => {
                                                    return <Tag key={i}>{val}</Tag>;
                                                })}
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item
                                                label="Current Address"
                                                validateStatus={errors.description && touched.description ? "error" : ""}
                                                help={errors.description && touched.description ? errors.description : null}
                                            >
                                                <Input.TextArea name="description" value={values.description} onChange={handleChange} onBlur={handleBlur} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item
                                                label="KTP Address"
                                                validateStatus={errors.description && touched.description ? "error" : ""}
                                                help={errors.description && touched.description ? errors.description : null}
                                            >
                                                <Input.TextArea name="description" value={values.description} onChange={handleChange} onBlur={handleBlur} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item
                                                label={
                                                    <>
                                                        Think I likes <span className="required">*</span>
                                                    </>
                                                }
                                                validateStatus={errors.locations && touched.locations ? "error" : ""}
                                                help={errors.locations && touched.locations ? errors.locations : null}
                                            >
                                                <Input
                                                    name="like"
                                                    value={like}
                                                    onChange={(e) => {
                                                        this.setState({ like: e.target.value });
                                                    }}
                                                    onPressEnter={(e: any) => {
                                                        const newLikes: string[] = [...values.likes];
                                                        console.log(e.target?.value);
                                                        newLikes.push(e.target?.value);
                                                        setFieldValue("likes", newLikes);
                                                        this.setState({ like: "" });
                                                    }}
                                                    onBlur={handleBlur}
                                                />
                                                <br />
                                                <br />
                                                {values.likes.map((val: any, i: number) => {
                                                    return <Tag key={i}>{val}</Tag>;
                                                })}
                                            </Form.Item>
                                        </Col>

                                        <Col span={24}>
                                            <Form.Item
                                                label={
                                                    <>
                                                        Hobbies <span className="required">*</span>
                                                    </>
                                                }
                                                validateStatus={errors.hobbies && touched.hobbies ? "error" : ""}
                                                help={errors.hobbies && touched.hobbies ? errors.hobbies : null}
                                            >
                                                <Input
                                                    name="hobby"
                                                    value={hobby}
                                                    onChange={(e) => {
                                                        this.setState({ hobby: e.target.value });
                                                    }}
                                                    onPressEnter={(e: any) => {
                                                        const newHobbies: string[] = [...values.hobbies];
                                                        console.log(e.target?.value);
                                                        newHobbies.push(e.target?.value);
                                                        setFieldValue("hobbies", newHobbies);
                                                        this.setState({ hobby: "" });
                                                    }}
                                                    onBlur={handleBlur}
                                                />
                                                <br />
                                                <br />
                                                {values.hobbies.map((val: any, i: number) => {
                                                    return <Tag key={i}>{val}</Tag>;
                                                })}
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Modal>
                            </>
                        )}
                    </Formik>
                </Form>
            </>
        );
    }
}

export default Biografi;
