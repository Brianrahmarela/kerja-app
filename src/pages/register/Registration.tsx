import { Button, Col, Form, Input, Modal, Row } from "antd";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import bgRegistration from "./../../assets/svg/bg-login.svg";
import logo from "./../../assets/svg/logo-header.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { AppConfig } from "../../config/Config";
import { postRegister } from "../../repository/AuthRepo";
import { AxiosResponse } from "axios";
export interface RegistrationProps {
  t: (x: any) => any;
}

export interface RegistrationState {}

class Registration extends React.Component<
  RegistrationProps,
  RegistrationState
> {
  state = {
    form: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      password: "",
      recaptcha: "",
    },
  };
  componentDidMount() {
    window.document.title = "Registration | KerjaApp";
  }
  render() {
    const { t } = this.props;
    return (
      <div className="registration-page">
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
                backgroundImage: `url(${bgRegistration})`,
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
            <div className="title">{t("register:title")}</div>
            <div className="form">
              <Form layout="vertical">
                <Formik
                  initialValues={this.state.form}
                  validationSchema={yup.object().shape({
                    email: yup
                      .string()
                      .email()
                      .required(`${t("register:error.email")}`),
                    firstName: yup
                      .string()
                      .required(`${t("register:error.firstName")}`),
                    lastName: yup
                      .string()
                      .required(`${t("register:error.lastName")}`),
                    phone: yup
                      .string()
                      .required(`${t("register:error.phone")}`),
                    password: yup
                      .string()
                      .required(`${t("register:error.password")}`),
                    recaptcha: yup
                      .string()
                      .required(`${t("register:error.recaptcha")}`),
                  })}
                  onSubmit={(values, { setSubmitting }) => {
                    postRegister(values)
                      .then((res: AxiosResponse<any>) => {
                        Modal.success({
                          title: `${this.props.t("notif.success")}`,
                          content: `${this.props.t("register:success")}`,
                          onOk: () => {
                            window.location.hash = "/login";
                            Modal.destroyAll();
                          },
                        });
                      })
                      .catch((error) => {
                        Modal.error({
                          title: `${this.props.t("notif.failed")}`,
                          content:
                            error.response?.data?.message || error.message,
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
                  {({
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting,
                  }) => (
                    <>
                      <Form.Item
                        label={
                          <span className="blue-primary">
                            {t("register:email")}
                          </span>
                        }
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
                      <Form.Item
                        label={
                          <span className="blue-primary">
                            {t("register:fullName")}
                          </span>
                        }
                        style={{ marginBottom: 0 }}
                      >
                        <Row gutter={20}>
                          <Col xs={24} sm={24} lg={12}>
                            <Form.Item
                              validateStatus={
                                errors.firstName && touched.firstName
                                  ? "error"
                                  : ""
                              }
                              help={
                                errors.firstName && touched.firstName
                                  ? errors.firstName
                                  : null
                              }
                            >
                              <Input
                                size="large"
                                name="firstName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder={t("register:firstName")}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} lg={12}>
                            <Form.Item
                              validateStatus={
                                errors.lastName && touched.lastName
                                  ? "error"
                                  : ""
                              }
                              help={
                                errors.lastName && touched.lastName
                                  ? errors.lastName
                                  : null
                              }
                            >
                              <Input
                                size="large"
                                name="lastName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder={t("register:lastName")}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Form.Item>
                      <Form.Item
                        label={
                          <span className="blue-primary">
                            {t("register:phontNumber")}
                          </span>
                        }
                        validateStatus={
                          errors.phone && touched.phone ? "error" : ""
                        }
                        help={
                          errors.phone && touched.phone ? errors.phone : null
                        }
                      >
                        <Input
                          size="large"
                          name="phone"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder={t("register:phoneCode")}
                        />
                      </Form.Item>
                      <Form.Item
                        label={
                          <span className="blue-primary">
                            {t("register:password")}
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
                      <Form.Item
                        style={{ textAlign: "center" }}
                        validateStatus={
                          errors.recaptcha && touched.recaptcha ? "error" : ""
                        }
                        help={
                          errors.recaptcha && touched.recaptcha
                            ? errors.recaptcha
                            : null
                        }
                      >
                        <div style={{ maxWidth: 304, margin: "auto" }}>
                          <ReCAPTCHA
                            size="normal"
                            sitekey={AppConfig.recaptchaKey}
                            onChange={(v: any) => {
                              setFieldValue("recaptcha", v);
                            }}
                          />
                        </div>
                      </Form.Item>
                      <Form.Item style={{ textAlign: "center" }}>
                        <Button
                          type="primary"
                          size="large"
                          style={{ width: 200 }}
                          onClick={() => handleSubmit()}
                        >
                          Masuk
                        </Button>
                      </Form.Item>

                      <Form.Item style={{ textAlign: "center" }}>
                        {t("register:haveaccount")}?{" "}
                        <Link to="/login">{t("register:loginLink")}</Link>
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
)(withTranslation()(Registration));
