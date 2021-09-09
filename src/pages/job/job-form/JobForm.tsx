import { faArrowLeft, faImages, faMapMarkerAlt, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb, Card, Col, Row, Form, Typography, Input, Select, Button, Space, Divider, Modal, Upload } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import JobList from "./job-list/JobList";
import { withTranslation } from "react-i18next";
import { postJobApplication } from "../../../repository/JobRepo";
import { AxiosResponse } from "axios";
import { getMyResume } from "../../../repository/WorkerRepo";
import { AppConfig } from "../../../config/Config";

export interface JobFormProps {
    match: any;
    t: (x: any) => any;
}

export interface JobFormState {
    form: any;
    resume: any;
}

class JobForm extends React.Component<JobFormProps, JobFormState> {
    state = {
        form: {
            email: "",
            phone: "",
            location: "",
            experience: "0",
            description: "",
            files: "",
        },
        resume: null as any,
    };
    componentDidMount() {
        window.document.title = "Apply Job | KerjaApp";
        const jobid = this.props.match.params.jobid;
        getMyResume().then((res: AxiosResponse<any>) => this.setState({ resume: res.data }));
    }

    render() {
        return (
            <div className="page-job-form">
                <Row>
                    <Col>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/">
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/">Lowongan Pekerjaan</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/">Deskripsi Pekerjaan</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Lamar</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row style={{ marginTop: 15 }}>
                    <Col span={24}>
                        <div className="bg-header">
                            <Row align="middle">
                                <Col span={6} style={{ textAlign: "center", paddingTop: 50, paddingBottom: 50 }}>
                                    <Avatar size={90} />
                                </Col>
                                <Col span={18}>
                                    <Typography.Title level={5}>Lorem Boutique</Typography.Title>
                                    <div>
                                        <Typography.Text>Loren ipsum</Typography.Text>
                                    </div>
                                    <Typography.Text>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: 5 }} />
                                        Jakarta, Indonesia
                                    </Typography.Text>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <Row gutter={[20, 20]} style={{ marginTop: 15 }}>
                    <Col span={8}>
                        <Typography.Title level={5}>See more another job by</Typography.Title>
                        <JobList />
                    </Col>
                    <Col span={16}>
                        <Card style={{ width: "100%", borderRadius: 20 }} bodyStyle={{ borderRadius: 20 }}>
                            <Form layout="vertical">
                                <Formik
                                    enableReinitialize
                                    initialValues={this.state.form}
                                    validationSchema={yup.object().shape({
                                        email: yup.string().required(`${this.props.t("login:error.username")}`),
                                        phone: yup.string().required(`${this.props.t("login:error.password")}`),
                                        location: yup.string().required(`${this.props.t("login:error.recaptcha")}`),
                                        experience: yup.string().required(`${this.props.t("login:error.recaptcha")}`),
                                        description: yup.string().required(`${this.props.t("login:error.recaptcha")}`),
                                        // files: yup.string().required(`${this.props.t("login:error.recaptcha")}`),
                                    })}
                                    onSubmit={(values, { setSubmitting, resetForm }) => {
                                        const jobid = this.props.match.params.jobid;
                                        const { personalInfo, experiences, educations, skills, certifications, languages } = this.state.resume;
                                        console.log(this.state.resume);
                                        const payload: any = {
                                            jobVacationId: jobid,
                                            email: values.email,
                                            phone: values.phone,
                                            location: values.email,
                                            experience: Number(values.experience),
                                            additionalInfo: values.description,
                                            files: null,
                                            expectedSalary: 0,
                                            negotiable: false,
                                            availability: "",
                                            personalInfo,
                                            experiences,
                                            educations,
                                            skills,
                                            certifications,
                                            languages,
                                        };
                                        console.log(payload);
                                        postJobApplication(payload)
                                            .then((res: AxiosResponse<any>) => {
                                                console.log(values);
                                                Modal.success({
                                                    title: "sukses",
                                                });
                                                this.setState({
                                                    form: {
                                                        email: "",
                                                        phone: "",
                                                        location: "",
                                                        experience: "0",
                                                        description: "",
                                                        files: "",
                                                    },
                                                });
                                                resetForm();
                                            })
                                            .catch((error) => {
                                                console.log(error.response);
                                                Modal.error({
                                                    title: `${this.props.t("common:notif.failed")}`,
                                                    content: error.response?.data?.message || error.message,
                                                });
                                            })
                                            .finally(() => {
                                                setSubmitting(false);
                                            });
                                    }}
                                >
                                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, setFieldTouched }) => (
                                        <>
                                            <Form.Item label="Your e-mail" validateStatus={errors.email && touched.email ? "error" : ""} help={errors.email && touched.email ? errors.email : null}>
                                                <Input name="email" value={values.email} onBlur={handleBlur} onChange={handleChange} placeholder="email" />
                                            </Form.Item>
                                            <Form.Item label="Phone Number" validateStatus={errors.phone && touched.phone ? "error" : ""} help={errors.phone && touched.phone ? errors.phone : null}>
                                                <Input name="phone" value={values.phone} onBlur={handleBlur} onChange={handleChange} placeholder="phone" />
                                            </Form.Item>
                                            <Form.Item label="Location" validateStatus={errors.location && touched.location ? "error" : ""} help={errors.location && touched.location ? errors.location : null}>
                                                <Input name="location" value={values.location} onBlur={handleBlur} onChange={handleChange} placeholder="location" />
                                            </Form.Item>
                                            <Form.Item
                                                label="How many years' experience do you have as a Fashion designer?"
                                                validateStatus={errors.experience && touched.experience ? "error" : ""}
                                                help={errors.experience && touched.experience ? errors.experience : null}
                                            >
                                                <Select
                                                    value={values.experience}
                                                    placeholder="email"
                                                    onChange={(e: any) => {
                                                        setFieldValue("experience", e);
                                                        setFieldTouched("experience", true);
                                                    }}
                                                >
                                                    <Select.Option value="0">Less than 1 year</Select.Option>
                                                    <Select.Option value="1">More than 1 year</Select.Option>
                                                    <Select.Option value="2">More than 2 years</Select.Option>
                                                    <Select.Option value="5">More than 5 years</Select.Option>
                                                    <Select.Option value="10">More than 10 years</Select.Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                label="Describe yourself"
                                                validateStatus={errors.description && touched.description ? "error" : ""}
                                                help={errors.description && touched.description ? errors.description : null}
                                            >
                                                <Input.TextArea rows={5} name="description" value={values.description} onBlur={handleBlur} onChange={handleChange} placeholder="description" />
                                            </Form.Item>
                                            <Form.Item label="Upload Files">
                                                <Upload
                                                    action={AppConfig.baseUrlApi + "/ka-employer/v1/include-file"}
                                                    onChange={({ file, fileList }) => {
                                                        if (file.status !== "uploading") {
                                                            console.log(file, fileList);
                                                        }
                                                    }}
                                                >
                                                    <Space>
                                                        <Button>
                                                            <FontAwesomeIcon icon={faPaperclip} />
                                                        </Button>
                                                    </Space>
                                                </Upload>
                                            </Form.Item>
                                            <Divider />
                                            <Form.Item style={{ textAlign: "right" }}>
                                                <Button type="primary" onClick={() => handleSubmit()}>
                                                    Submit
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Formik>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withTranslation()(JobForm);
