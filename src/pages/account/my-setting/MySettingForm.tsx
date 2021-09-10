import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Form, Button, Select, Space, Switch, Card } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { Formik } from "formik";
import React from "react";

interface MySettingFormProps {}

interface MySettingFormState {
    form: any;
}

class MySettingForm extends React.Component<MySettingFormProps, MySettingFormState> {
    state = {
        form: {
            searchable: true,
            seeConnection: "ALL",
            allowedPrivacy: [] as any[],
            notification: "",
            language: "id",
        },
    };
    render() {
        return (
            <>
                <Card>
                    <Form {...{ wrapperCol: { span: 16 }, labelCol: { span: 5 } }}>
                        <Formik
                            enableReinitialize
                            initialValues={this.state.form}
                            onSubmit={(values, { setSubmitting }) => {
                                // const payload: any = { ...values };
                                // payload.allowedPrivacy = JSON.stringify(values.allowedPrivacy);
                                // postPrivacySetting(payload)
                                //     .then((res: AxiosResponse<any>) => {
                                //         notification.success({
                                //             message: "Success",
                                //         });
                                //         this.props.switchEditMode();
                                //     })
                                //     .catch((error) => {
                                //         Modal.error({
                                //             title: `Error`,
                                //             // content : error.response.data.message
                                //             content: error.response?.data?.message || error.message || "-",
                                //         });
                                //     })
                                //     .finally(() => {
                                //         setSubmitting(false);
                                //     });
                            }}
                        >
                            {({ values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, setFieldTouched, setFieldValue }) => (
                                <>
                                    <Form.Item label="Language" validateStatus={errors.language && touched.language ? "error" : ""} help={errors.language && touched.language ? errors.language : null}>
                                        <Select
                                            value={values.language}
                                            onChange={(e) => {
                                                console.log(e);
                                                setFieldValue("language", e);
                                                setFieldTouched("language");
                                            }}
                                        >
                                            <Select.Option value={"en"}> English</Select.Option>
                                            <Select.Option value={"id"}> Indonesia</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label="Profile viewing options"
                                        validateStatus={errors.allowedPrivacy && touched.allowedPrivacy ? "error" : ""}
                                        help={errors.allowedPrivacy && touched.allowedPrivacy ? errors.allowedPrivacy : null}
                                    >
                                        <Col>
                                            <Checkbox
                                                checked={values.allowedPrivacy.indexOf("name") !== -1}
                                                value="name"
                                                onChange={(e) => {
                                                    const cloned = { ...values };
                                                    const index = cloned.allowedPrivacy.indexOf(e.target.value);
                                                    if (index === -1 && e.target.checked) {
                                                        cloned.allowedPrivacy.push(e.target.value);
                                                    } else if (index !== -1 && e.target.checked === false) {
                                                        cloned.allowedPrivacy.splice(index, 1);
                                                    }
                                                    setFieldValue("allowedPrivacy", cloned.allowedPrivacy);
                                                }}
                                            >
                                                Name
                                            </Checkbox>
                                        </Col>
                                        <Col>
                                            <Checkbox
                                                checked={values.allowedPrivacy.indexOf("email") !== -1}
                                                value="email"
                                                onChange={(e) => {
                                                    const cloned = { ...values };
                                                    const index = cloned.allowedPrivacy.indexOf(e.target.value);
                                                    if (index === -1 && e.target.checked) {
                                                        cloned.allowedPrivacy.push(e.target.value);
                                                    } else if (index !== -1 && e.target.checked === false) {
                                                        cloned.allowedPrivacy.splice(index, 1);
                                                    }
                                                    setFieldValue("allowedPrivacy", cloned.allowedPrivacy);
                                                }}
                                            >
                                                Email
                                            </Checkbox>
                                        </Col>
                                        <Col>
                                            <Checkbox
                                                checked={values.allowedPrivacy.indexOf("age") !== -1}
                                                value="age"
                                                onChange={(e) => {
                                                    const cloned = { ...values };
                                                    const index = cloned.allowedPrivacy.indexOf(e.target.value);
                                                    if (index === -1 && e.target.checked) {
                                                        cloned.allowedPrivacy.push(e.target.value);
                                                    } else if (index !== -1 && e.target.checked === false) {
                                                        cloned.allowedPrivacy.splice(index, 1);
                                                    }
                                                    setFieldValue("allowedPrivacy", cloned.allowedPrivacy);
                                                }}
                                            >
                                                Age
                                            </Checkbox>
                                        </Col>
                                        <Col>
                                            <Checkbox
                                                checked={values.allowedPrivacy.indexOf("lastJob") !== -1}
                                                value="lastJob"
                                                onChange={(e) => {
                                                    const cloned = { ...values };
                                                    const index = cloned.allowedPrivacy.indexOf(e.target.value);
                                                    if (index === -1 && e.target.checked) {
                                                        cloned.allowedPrivacy.push(e.target.value);
                                                    } else if (index !== -1 && e.target.checked === false) {
                                                        cloned.allowedPrivacy.splice(index, 1);
                                                    }
                                                    setFieldValue("allowedPrivacy", cloned.allowedPrivacy);
                                                }}
                                            >
                                                Last Job
                                            </Checkbox>
                                        </Col>
                                        <Col>
                                            <Checkbox
                                                checked={values.allowedPrivacy.indexOf("phoneNo") !== -1}
                                                value="phoneNo"
                                                onChange={(e) => {
                                                    const cloned = { ...values };
                                                    const index = cloned.allowedPrivacy.indexOf(e.target.value);
                                                    if (index === -1 && e.target.checked) {
                                                        cloned.allowedPrivacy.push(e.target.value);
                                                    } else if (index !== -1 && e.target.checked === false) {
                                                        cloned.allowedPrivacy.splice(index, 1);
                                                    }
                                                    setFieldValue("allowedPrivacy", cloned.allowedPrivacy);
                                                }}
                                            >
                                                Phone No
                                            </Checkbox>
                                        </Col>
                                        <Col>
                                            <Checkbox
                                                checked={values.allowedPrivacy.indexOf("country") !== -1}
                                                value="country"
                                                onChange={(e) => {
                                                    const cloned = { ...values };
                                                    const index = cloned.allowedPrivacy.indexOf(e.target.value);
                                                    if (index === -1 && e.target.checked) {
                                                        cloned.allowedPrivacy.push(e.target.value);
                                                    } else if (index !== -1 && e.target.checked === false) {
                                                        cloned.allowedPrivacy.splice(index, 1);
                                                    }
                                                    setFieldValue("allowedPrivacy", cloned.allowedPrivacy);
                                                }}
                                            >
                                                Country
                                            </Checkbox>
                                        </Col>
                                        <Col>
                                            <Checkbox
                                                checked={values.allowedPrivacy.indexOf("education") !== -1}
                                                value="education"
                                                onChange={(e) => {
                                                    const cloned = { ...values };
                                                    const index = cloned.allowedPrivacy.indexOf(e.target.value);
                                                    if (index === -1 && e.target.checked) {
                                                        cloned.allowedPrivacy.push(e.target.value);
                                                    } else if (index !== -1 && e.target.checked === false) {
                                                        cloned.allowedPrivacy.splice(index, 1);
                                                    }
                                                    setFieldValue("allowedPrivacy", cloned.allowedPrivacy);
                                                }}
                                            >
                                                Last Education
                                            </Checkbox>
                                        </Col>
                                        <Col>
                                            <Checkbox
                                                checked={values.allowedPrivacy.indexOf("address") !== -1}
                                                value="address"
                                                onChange={(e) => {
                                                    const cloned = { ...values };
                                                    const index = cloned.allowedPrivacy.indexOf(e.target.value);
                                                    if (index === -1 && e.target.checked) {
                                                        cloned.allowedPrivacy.push(e.target.value);
                                                    } else if (index !== -1 && e.target.checked === false) {
                                                        cloned.allowedPrivacy.splice(index, 1);
                                                    }
                                                    setFieldValue("allowedPrivacy", cloned.allowedPrivacy);
                                                }}
                                            >
                                                Resident Address
                                            </Checkbox>
                                        </Col>
                                        <Col>
                                            <Checkbox
                                                checked={values.allowedPrivacy.indexOf("workLoc") !== -1}
                                                value="workLoc"
                                                onChange={(e) => {
                                                    const cloned = { ...values };
                                                    const index = cloned.allowedPrivacy.indexOf(e.target.value);
                                                    if (index === -1 && e.target.checked) {
                                                        cloned.allowedPrivacy.push(e.target.value);
                                                    } else if (index !== -1 && e.target.checked === false) {
                                                        cloned.allowedPrivacy.splice(index, 1);
                                                    }
                                                    setFieldValue("allowedPrivacy", cloned.allowedPrivacy);
                                                }}
                                            >
                                                Work Location
                                            </Checkbox>
                                        </Col>
                                        <Col>
                                            <Checkbox
                                                checked={values.allowedPrivacy.indexOf("gender") !== -1}
                                                value="gender"
                                                onChange={(e) => {
                                                    const cloned = { ...values };
                                                    const index = cloned.allowedPrivacy.indexOf(e.target.value);
                                                    if (index === -1 && e.target.checked) {
                                                        cloned.allowedPrivacy.push(e.target.value);
                                                    } else if (index !== -1 && e.target.checked === false) {
                                                        cloned.allowedPrivacy.splice(index, 1);
                                                    }
                                                    setFieldValue("allowedPrivacy", cloned.allowedPrivacy);
                                                }}
                                            >
                                                Gender
                                            </Checkbox>
                                        </Col>
                                    </Form.Item>
                                    <Form.Item
                                        label="Who can see your connections"
                                        validateStatus={errors.seeConnection && touched.seeConnection ? "error" : ""}
                                        help={errors.seeConnection && touched.seeConnection ? errors.seeConnection : null}
                                    >
                                        <Select
                                            value={values.seeConnection}
                                            onChange={(e: any) => {
                                                setFieldValue("seeConnection", e);
                                                setFieldTouched("seeConnection", true);
                                            }}
                                        >
                                            <Select.Option value={"ALL"}>All</Select.Option>
                                            <Select.Option value={"ONLY_FOLLOWER"}>Only My Follower</Select.Option>
                                            <Select.Option value={"ONLY_ME"}>Only Me</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label="Searchable"
                                        validateStatus={errors.searchable && touched.searchable ? "error" : ""}
                                        help={errors.searchable && touched.searchable ? errors.searchable : null}
                                    >
                                        <Switch
                                            checked={values.searchable}
                                            onChange={(e) => {
                                                setFieldValue("searchable", e);
                                                setFieldTouched("searchable", true);
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                                        <Space direction="horizontal">
                                            <Button type="primary" loading={isSubmitting} onClick={() => handleSubmit()}>
                                                <FontAwesomeIcon icon={faSave} style={{ marginRight: 5 }} />
                                                Save
                                            </Button>
                                        </Space>
                                    </Form.Item>
                                </>
                            )}
                        </Formik>
                    </Form>
                </Card>
            </>
        );
    }
}

export default MySettingForm;
