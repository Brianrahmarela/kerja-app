import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Form, Button, Select, Space, Switch, Card, message, Modal } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { AxiosResponse } from "axios";
import { Formik } from "formik";
import React from "react";
import { getUserSetting, postUserSetting } from "../../../repository/UserRepo";

interface MySettingFormProps {}

interface MySettingFormState {
    form: any;
}

class MySettingForm extends React.Component<MySettingFormProps, MySettingFormState> {
    state = {
        form: {
            searchable: true,
            seeConnection: "ALL",
            allowedPrivacy: [] as any,
            notification: "",
            language: "id",
        },
    };
    componentDidMount() {
        this.getData();
    }

    getData() {
        getUserSetting().then((res: AxiosResponse<any>) => {
            this.setState({
                form: {
                    ...res.data,
                    allowedPrivacy: res.data.allowedPrivacy ? JSON.parse(res.data.allowedPrivacy) : [],
                },
            });
        });
    }
    render() {
        return (
            <>
                <Card>
                    <Form {...{ wrapperCol: { span: 16 }, labelCol: { span: 5 } }}>
                        <Formik
                            enableReinitialize
                            initialValues={this.state.form}
                            onSubmit={(values, { setSubmitting }) => {
                                const payload: any = { ...values };
                                payload.allowedPrivacy = JSON.stringify(values.allowedPrivacy);
                                postUserSetting(payload)
                                    .then((res: AxiosResponse<any>) => {
                                        this.getData();
                                    })
                                    .catch((error) => {
                                        Modal.error({
                                            title: `Error`,
                                            // content : error.response.data.message
                                            content: error.response?.data?.message || error.message || "-",
                                        });
                                    })
                                    .finally(() => {
                                        setSubmitting(false);
                                    });
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
                                                    const allowedPrivacy: any[] = cloned.allowedPrivacy;
                                                    const index = allowedPrivacy.indexOf(e.target.value);

                                                    if (index === -1 && e.target.checked) {
                                                        allowedPrivacy.push(e.target.value);
                                                    } else if (index !== -1 && e.target.checked === false) {
                                                        allowedPrivacy.splice(index, 1);
                                                    }
                                                    setFieldValue("allowedPrivacy", allowedPrivacy);
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
                                                    const allowedPrivacy: any[] = cloned.allowedPrivacy;
                                                    const index = allowedPrivacy.indexOf(e.target.value);

                                                    if (index === -1 && e.target.checked) {
                                                        allowedPrivacy.push(e.target.value);
                                                    } else if (index !== -1 && e.target.checked === false) {
                                                        allowedPrivacy.splice(index, 1);
                                                    }
                                                    setFieldValue("allowedPrivacy", allowedPrivacy);
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
                                                    const allowedPrivacy: any[] = cloned.allowedPrivacy;
                                                    const index = allowedPrivacy.indexOf(e.target.value);

                                                    if (index === -1 && e.target.checked) {
                                                        allowedPrivacy.push(e.target.value);
                                                    } else if (index !== -1 && e.target.checked === false) {
                                                        allowedPrivacy.splice(index, 1);
                                                    }
                                                    setFieldValue("allowedPrivacy", allowedPrivacy);
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
                                                    const allowedPrivacy: any[] = cloned.allowedPrivacy;
                                                    const index = allowedPrivacy.indexOf(e.target.value);

                                                    if (index === -1 && e.target.checked) {
                                                        allowedPrivacy.push(e.target.value);
                                                    } else if (index !== -1 && e.target.checked === false) {
                                                        allowedPrivacy.splice(index, 1);
                                                    }
                                                    setFieldValue("allowedPrivacy", allowedPrivacy);
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
                                                    const allowedPrivacy: any[] = cloned.allowedPrivacy;
                                                    const index = allowedPrivacy.indexOf(e.target.value);

                                                    if (index === -1 && e.target.checked) {
                                                        allowedPrivacy.push(e.target.value);
                                                    } else if (index !== -1 && e.target.checked === false) {
                                                        allowedPrivacy.splice(index, 1);
                                                    }
                                                    setFieldValue("allowedPrivacy", allowedPrivacy);
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
                                                    const allowedPrivacy: any[] = cloned.allowedPrivacy;
                                                    const index = allowedPrivacy.indexOf(e.target.value);

                                                    if (index === -1 && e.target.checked) {
                                                        allowedPrivacy.push(e.target.value);
                                                    } else if (index !== -1 && e.target.checked === false) {
                                                        allowedPrivacy.splice(index, 1);
                                                    }
                                                    setFieldValue("allowedPrivacy", allowedPrivacy);
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
                                                    const allowedPrivacy: any[] = cloned.allowedPrivacy;
                                                    const index = allowedPrivacy.indexOf(e.target.value);

                                                    if (index === -1 && e.target.checked) {
                                                        allowedPrivacy.push(e.target.value);
                                                    } else if (index !== -1 && e.target.checked === false) {
                                                        allowedPrivacy.splice(index, 1);
                                                    }
                                                    setFieldValue("allowedPrivacy", allowedPrivacy);
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
                                                    const allowedPrivacy: any[] = cloned.allowedPrivacy;
                                                    const index = allowedPrivacy.indexOf(e.target.value);

                                                    if (index === -1 && e.target.checked) {
                                                        allowedPrivacy.push(e.target.value);
                                                    } else if (index !== -1 && e.target.checked === false) {
                                                        allowedPrivacy.splice(index, 1);
                                                    }
                                                    setFieldValue("allowedPrivacy", allowedPrivacy);
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
                                                    const allowedPrivacy: any[] = cloned.allowedPrivacy;
                                                    const index = allowedPrivacy.indexOf(e.target.value);

                                                    if (index === -1 && e.target.checked) {
                                                        allowedPrivacy.push(e.target.value);
                                                    } else if (index !== -1 && e.target.checked === false) {
                                                        allowedPrivacy.splice(index, 1);
                                                    }
                                                    setFieldValue("allowedPrivacy", allowedPrivacy);
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
                                                    const allowedPrivacy: any[] = cloned.allowedPrivacy;
                                                    const index = allowedPrivacy.indexOf(e.target.value);

                                                    if (index === -1 && e.target.checked) {
                                                        allowedPrivacy.push(e.target.value);
                                                    } else if (index !== -1 && e.target.checked === false) {
                                                        allowedPrivacy.splice(index, 1);
                                                    }
                                                    setFieldValue("allowedPrivacy", allowedPrivacy);
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
