import { Button, Col, Divider, Form, Input, Modal, Row } from "antd";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { postLogin } from "../../repository/AuthRepo";
import { AxiosResponse } from "axios";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import bgLogin from "./../../assets/svg/bg-login.svg";
import logo from "./../../assets/svg/logo-header.svg";
import googleLogo from "./../../assets/image/google.png";
import facebookLogo from "./../../assets/image/facebook.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { AppConfig } from "../../config/Config";
export interface LoginProps {
  t: (x: any) => any;
}

export interface LoginState {}

class Login extends React.Component<LoginProps, LoginState> {
  state = {
    form: {
      username: "",
      password: "",
    },
  };
  onCaptchaChange() {}
  render() {
    const { t } = this.props;
    return (
      <div className="login-page">
        <Row>
          <Col xs={0} sm={0} lg={12}>
            <div className="header-left">
              <Link to="/">
                <FontAwesomeIcon icon={faArrowLeft} />
              </Link>
            </div>
            <div
              style={{
                height: "100vh",
                width: "100%",
                backgroundImage: `url(${bgLogin})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPositionX: "13%",
              }}
            ></div>
          </Col>
          <Col xs={24} sm={24} lg={12} className="right-section">
            <div className="header-right">
              <div className="logo-wrapper">
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
            </div>
            <div className="title">{t("login:title")}</div>
            <div className="form">
              <Form layout="vertical">
                <Formik
                  initialValues={this.state.form}
                  validationSchema={yup.object().shape({
                    username: yup.string().required("Username is required"),
                    password: yup.string().required("Username is required"),
                  })}
                  onSubmit={(values, { setSubmitting }) => {
                    postLogin(values)
                      .then((res: AxiosResponse<any>) => {})
                      .catch((error) => {
                        console.log(error.response);
                        Modal.error({
                          title: `${this.props.t("common:notif.failed")}`,
                          // content : error.response.data.message
                          content:
                            error.response?.data?.message || error.message,
                        });
                      })
                      .finally(() => {
                        setSubmitting(false);
                      });
                  }}
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
                      <Form.Item
                        label={
                          <span className="blue-primary">
                            {t("login:username")}
                          </span>
                        }
                        validateStatus={
                          errors.username && touched.username ? "error" : ""
                        }
                        help={
                          errors.username && touched.username
                            ? errors.username
                            : null
                        }
                      >
                        <Input
                          size="large"
                          name="username"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="your@email.com"
                        />
                      </Form.Item>
                      <Form.Item
                        label={
                          <span className="blue-primary">
                            {t("login:password")}
                          </span>
                        }
                        validateStatus={
                          errors.password && touched.password ? "error" : ""
                        }
                        help={
                          errors.password && touched.password
                            ? errors.password
                            : null
                        }
                      >
                        <Input.Password
                          size="large"
                          name="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="********"
                        />
                      </Form.Item>
                      <Form.Item label=" ">
                        <Row style={{ marginBottom: 70 }}>
                          <Col sm={24} lg={24} xl={18}>
                            <ReCAPTCHA
                              size="normal"
                              sitekey={AppConfig.recaptchaKey}
                              onChange={this.onCaptchaChange}
                            />
                          </Col>
                          <Col sm={24} lg={24} xl={6}>
                            <Link
                              to="/forgot-password"
                              className="blue-primary"
                            >
                              {t("login:forgotPassword")}
                            </Link>
                          </Col>
                        </Row>
                      </Form.Item>
                      <Form.Item style={{ textAlign: "center" }}>
                        <Button
                          type="primary"
                          size="large"
                          style={{ width: 200 }}
                        >
                          {t("login:buttonLogin")}
                        </Button>
                      </Form.Item>
                      <Divider plain>atau masuk dengan</Divider>
                      <Form.Item>
                        <Row gutter={25}>
                          <Col span={12} style={{ textAlign: "right" }}>
                            <Button
                              type="primary"
                              ghost
                              size="large"
                              style={{ width: "100%" }}
                              icon={
                                <img
                                  alt="google"
                                  src={googleLogo}
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    marginRight: 5,
                                  }}
                                />
                              }
                            >
                              Google
                            </Button>
                          </Col>
                          <Col span={12}>
                            <Button
                              type="primary"
                              ghost
                              size="large"
                              style={{ width: "100%" }}
                              icon={
                                <img
                                  alt="google"
                                  src={facebookLogo}
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    marginRight: 5,
                                  }}
                                />
                              }
                            >
                              Facebook
                            </Button>
                          </Col>
                        </Row>
                      </Form.Item>
                      <Form.Item style={{ textAlign: "center" }}>
                        {t("login:doesnothave")}?{" "}
                        <Link to="/register">{t("login:registerLink")}</Link>
                      </Form.Item>
                    </>
                  )}
                </Formik>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => ({
  setToken: (payload: any) =>
    dispatch({
      type: "SET_TOKEN",
      payload,
    }),
  setCurrentUser: (x: any) =>
    dispatch({ type: "SET_CURRENT_USER", payload: x }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Login));
