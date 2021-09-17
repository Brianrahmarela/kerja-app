import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, Input, Modal, Row, Typography } from "antd";
import { Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import bgForgotPassword from "./../../assets/svg/bg-forgot-password.svg";
import logo from "./../../assets/svg/logo-header.svg";
import * as yup from "yup";
import { withTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import { AppConfig } from "../../config/Config";
import { postForgotPassword } from "../../repository/AuthRepo";
import { AxiosResponse } from "axios";
export interface ForgotPasswordProps {
    t: (x: any) => any;
}

export interface ForgotPasswordState {}

class ForgotPassword extends React.Component<ForgotPasswordProps, ForgotPasswordState> {
    state = {
        form: {
            email: "",
            recaptcha: "",
        },
    };
    componentDidMount() {
        window.document.title = "Forgot Password | KerjaApp";
    }
    render() {
        const { t } = this.props;
        return (
            <div className="forgot-password-page">
                <div
                    style={{
                        position: "absolute",
                        height: "100vh",
                        width: "100vw",
                        backgroundImage: `url(${bgForgotPassword})`,
                        backgroundSize: "100%",
                        backgroundRepeat: "no-repeat",
                        backgroundPositionY: "100%",
                    }}
                ></div>
                <div className="header">
                    <Row>
                        <Col span={3}>
                            <div className="header-left">
                                <Link to="/">
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </Link>
                            </div>
                        </Col>
                        <Col span={18}>
                            <div style={{ padding: 50 }} className="logo-wrapper">
                                <Link to="/" className="logo-wrapper">
                                    <img alt="logo" src={logo} style={{ width: 50, height: 50, marginRight: 5 }} />
                                    <span className="blue-primary" style={{ fontSize: 34, lineHeight: 0.5, fontWeight: 500 }}>
                                        KerjaApp
                                    </span>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="title">
                    <Typography.Title level={4}>{t("forgotPassword:title")}</Typography.Title>
                    <Typography.Text>{t("forgotPassword:subtitle")}</Typography.Text>
                </div>
                <div className="form">
                    <Form layout="vertical">
                        <Formik
                            initialValues={this.state.form}
                            validationSchema={yup.object().shape({
                                email: yup
                                    .string()
                                    .email()
                                    .required(`${t("forgotPassword:error.email")}`),
                                recaptcha: yup.string().required(`${t("forgotPassword:error.recaptcha")}`),
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                postForgotPassword(values)
                                    .then((res: AxiosResponse<any>) => {
                                        Modal.success({
                                            title: `${this.props.t("notif.success")}`,
                                            content: `${this.props.t("forgotPassword:success")}`,
                                            onOk: () => {
                                                window.location.hash = "/login";
                                                Modal.destroyAll();
                                            },
                                        });
                                    })
                                    .catch((error) => {
                                        Modal.error({
                                            title: `${this.props.t("notif.failed")}`,
                                            content: error.response?.data?.message || error.message,
                                            onOk: () => {
                                                Modal.destroyAll();
                                            },
                                        });
                                    })
                                    .finally(() => {
                                        setSubmitting(false);
                                    });
                            }}
                        >
                            {({ errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, isSubmitting }) => (
                                <>
                                    <Row gutter={15} justify="start" align="middle">
                                        <Col sm={24} lg={24} xl={18}>
                                            <Form.Item style={{ textAlign: "left" }} validateStatus={errors.email && touched.email ? "error" : ""} help={errors.email && touched.email ? errors.email : null}>
                                                <Input size="large" name="email" onBlur={handleBlur} onChange={handleChange} placeholder="your@email.com" />
                                            </Form.Item>
                                        </Col>
                                        <Col sm={24} lg={24} xl={6}>
                                            <Form.Item validateStatus={errors.recaptcha && touched.recaptcha ? "error" : ""} help={errors.recaptcha && touched.recaptcha ? errors.recaptcha : null}>
                                                <ReCAPTCHA
                                                    size="normal"
                                                    sitekey={AppConfig.recaptchaKey}
                                                    onChange={(v: any) => {
                                                        setFieldValue("recaptcha", v);
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Form.Item style={{ textAlign: "center", marginTop: 60 }}>
                                        <Button type="primary" size="large" style={{ width: 200 }} onClick={() => handleSubmit()}>
                                            Masuk
                                        </Button>
                                    </Form.Item>
                                    <Form.Item style={{ textAlign: "center" }}>
                                        {t("forgotPassword:question")}? <Link to="/register">{t("forgotPassword:registerLink")}</Link> {t("forgotPassword:or")}{" "}
                                        <Link to="/login">{t("forgotPassword:loginLink")}</Link>
                                    </Form.Item>
                                </>
                            )}
                        </Formik>
                    </Form>
                </div>
            </div>
        );
    }
}

export default withTranslation()(ForgotPassword);
