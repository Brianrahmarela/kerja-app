import { faArrowLeft, faMapMarkerAlt, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb, Card, Col, Row, Form, Typography, Input, Select, Button, Space, Divider, Modal, Upload } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import JobList from "./job-list/JobList";
import { withTranslation } from "react-i18next";
import { getJobVacationDetail, postJobApplication } from "../../../repository/JobRepo";
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
    jobData: any;
}

class JobForm extends React.Component<JobFormProps, JobFormState> {
    state = {
        form: {
            email: "",
            phone: "",
            location: "",
            experience: "0",
            description: "",
            files: [] as any[],
        },
        resume: null as any,
        jobData: null as any,
    };
    componentDidMount() {
        window.document.title = "Apply Job | KerjaApp";
        getMyResume().then((res: AxiosResponse<any>) => this.setState({ resume: res.data }));
        const jobid = this.props.match.params.jobid;
        getJobVacationDetail(jobid).then((res: AxiosResponse<any>) => {
            this.setState({ jobData: res.data });
        });
    }

    render() {
        const jobid = this.props.match.params.jobid;
        return (
            <div className="page-job-form">
                <Row>
                    <Col>
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <Link to="/home">
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to="/job">Lowongan Pekerjaan</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <Link to={"/job/job-detail/" + jobid}>Deskripsi Pekerjaan</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>Lamar</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row style={{ marginTop: 15 }}>
                    <Col span={24}>
                        <div className="bg-header">
                            <Row align="middle">
                                <Col span={5} style={{ textAlign: "center", paddingTop: 50, paddingBottom: 50 }}>
                                    <Avatar size={90} />
                                </Col>
                                <Col span={19}>
                                    <Typography.Title level={3}>{this.state.jobData?.jobName}</Typography.Title>
                                    <div>
                                        <Typography.Text>{this.state.jobData?.jobType.replace("_", " ")}</Typography.Text>
                                    </div>
                                    <Typography.Text>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: 5 }} />
                                        {this.state.jobData?.location.split(",").join(", ")}
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
                                    onSubmit={(values, { setSubmitting, resetForm, setFieldValue }) => {
                                        const { personalInfo, experiences, educations, skills, certifications, languages } = this.state.resume;
                                        console.log(this.state.resume);
                                        const payload: any = {
                                            jobVacationId: jobid,
                                            email: values.email,
                                            phone: values.phone,
                                            location: values.email,
                                            experience: Number(values.experience),
                                            additionalInfo: values.description,
                                            files: values.files.map((v: any) => {
                                                return AppConfig.baseUrlApi + "/thrm-media/v1/file?forceImage=true&source-id=karirapp-employer&id=" + v.response.id;
                                            }),
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
                                                        files: [],
                                                    },
                                                });
                                                resetForm();
                                                setFieldValue("files", []);
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
                                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting, setFieldTouched, resetForm }) => (
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
                                                    fileList={this.state.form.files}
                                                    // action={AppConfig.url.postJobApplicationAttachment}
                                                    // headers={{
                                                    //     Authorization: "Bearer " + token,
                                                    // }}
                                                    customRequest={async (option: any) => {
                                                        const metadata = {
                                                            name: option.file.name,
                                                            mimeType: option.file.type,
                                                        };

                                                        const form = new FormData();
                                                        form.append(
                                                            "metadata",
                                                            new Blob([JSON.stringify(metadata)], {
                                                                type: "application/json",
                                                            })
                                                        );
                                                        form.append("file", option.file, option.file.name);
                                                        const request = new XMLHttpRequest();
                                                        const token = window.localStorage.getItem("token");
                                                        request.open("POST", AppConfig.url.postJobApplicationAttachment);
                                                        request.setRequestHeader("Authorization", "Bearer " + token);

                                                        request.addEventListener("load", function () {
                                                            if (request.status === 200) {
                                                                option.onSuccess(request.response);
                                                            } else {
                                                                const error = new Error("Some error");
                                                                option.onError({ error });
                                                            }
                                                        });
                                                        request.send(form);
                                                    }}
                                                    onChange={(e: any) => {
                                                        console.log(e.fileList);
                                                        setFieldValue("files", e.fileList);
                                                        this.setState({
                                                            form: {
                                                                ...this.state.form,
                                                                files: e.fileList,
                                                            },
                                                        });
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
