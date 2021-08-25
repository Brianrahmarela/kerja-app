import { Button, Col, Form, Input, Row, Typography } from "antd";
import React from "react";
import logo from "./../../assets/svg/logo-header.svg";
import bgResetPassword from "./../../assets/svg/bg-reset-password.svg";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { withTranslation } from "react-i18next";

export interface ResetPasswordProps {
  t: (x: any) => any;
}

export interface ResetPasswordState {}

class ResetPassword extends React.Component<
  ResetPasswordProps,
  ResetPasswordState
> {
  state = {
    form: {
      newPassword: "",
      confirmPassword: "",
    },
  };
  render() {
    const { t } = this.props;
    return (
      <div className="reset-password-page">
        <div
          style={{
            position: "absolute",
            height: "100vh",
            width: "100vw",
            backgroundImage: `url(${bgResetPassword})`,
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            backgroundPositionY: "100%",
          }}
        ></div>
        <div className="header">
          <Row>
            <Col span={24}>
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
            </Col>
          </Row>
        </div>
        <div className="title">
          <Typography.Title level={4}>
            {t("resetPassword:title")}
          </Typography.Title>
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
                  <Form.Item
                    label={
                      <span className="blue-primary">
                        {t("resetPassword:newPassword")}
                      </span>
                    }
                    validateStatus={
                      errors.newPassword && touched.newPassword ? "error" : ""
                    }
                    help={
                      errors.newPassword && touched.newPassword
                        ? errors.newPassword
                        : null
                    }
                  >
                    <Input.Password
                      size="large"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder={t("resetPassword:placeholderNewPassword")}
                    />
                  </Form.Item>
                  <Form.Item
                    label={
                      <span className="blue-primary">
                        {t("resetPassword:confirmPassword")}
                      </span>
                    }
                    validateStatus={
                      errors.newPassword && touched.newPassword ? "error" : ""
                    }
                    help={
                      errors.newPassword && touched.newPassword
                        ? errors.newPassword
                        : null
                    }
                  >
                    <Input.Password
                      size="large"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder={t(
                        "resetPassword:placeholderConfirmPassword"
                      )}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Row justify="center" gutter={[20, 20]}>
                      <Col sm={24} lg={8}>
                        <Button size="large" href="#/" style={{ width: 200 }}>
                          {t("resetPassword:cancel")}
                        </Button>
                      </Col>
                      <Col sm={24} lg={8}>
                        <Button
                          type="primary"
                          size="large"
                          style={{ width: 200 }}
                        >
                          {t("resetPassword:reset")}
                        </Button>
                      </Col>
                    </Row>
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

export default withTranslation()(ResetPassword);
