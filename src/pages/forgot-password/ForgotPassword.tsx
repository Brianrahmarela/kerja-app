import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import bgForgotPassword from "./../../assets/svg/bg-forgot-password.svg";
import logo from "./../../assets/svg/logo-header.svg";
import * as yup from "yup";
import { withTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import { AppConfig } from "../../config/Config";
export interface ForgotPasswordProps {
  t: (x: any) => any;
}

export interface ForgotPasswordState {}

class ForgotPassword extends React.Component<
  ForgotPasswordProps,
  ForgotPasswordState
> {
  state = {
    form: {
      email: "",
    },
  };
  onCaptchaChange() {}
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
                  <img
                    alt="logo"
                    src={logo}
                    style={{ width: 30, height: 30, marginRight: 5 }}
                  />
                  <span
                    className="blue-primary"
                    style={{ fontSize: 24, lineHeight: 0.5, fontWeight: 500 }}
                  >
                    KerjaApp
                  </span>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
        <div className="title">
          <Typography.Title level={4}>
            {t("forgotPassword:title")}
          </Typography.Title>
          <Typography.Text>{t("forgotPassword:subtitle")}</Typography.Text>
        </div>
        <div className="form">
          <Form layout="vertical">
            <Formik
              initialValues={this.state.form}
              validationSchema={yup.object().shape({
                username: yup.string().required("Username is required"),
                password: yup.string().required("Username is required"),
              })}
              onSubmit={(values, { setSubmitting }) => {}}
            >
              {({
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
              }) => (
                <>
                  <Row gutter={15} justify="center" align="middle">
                    <Col sm={24} lg={24} xl={18}>
                      <Form.Item
                        validateStatus={
                          errors.email && touched.email ? "error" : ""
                        }
                        help={
                          errors.email && touched.email ? errors.email : null
                        }
                      >
                        <Input
                          size="large"
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="your@email.com"
                        />
                      </Form.Item>
                    </Col>
                    <Col sm={24} lg={24} xl={6}>
                      <ReCAPTCHA
                        size="normal"
                        sitekey={AppConfig.recaptchaKey}
                        onChange={this.onCaptchaChange}
                      />
                    </Col>
                  </Row>
                  <Form.Item style={{ textAlign: "center", marginTop: 60 }}>
                    <Button type="primary" size="large" style={{ width: 200 }}>
                      Masuk
                    </Button>
                  </Form.Item>
                  <Form.Item style={{ textAlign: "center" }}>
                    {t("forgotPassword:question")}?{" "}
                    <Link to="/register">
                      {t("forgotPassword:registerLink")}
                    </Link>{" "}
                    {t("forgotPassword:or")}{" "}
                    <Link to="/register">{t("forgotPassword:loginLink")}</Link>
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
