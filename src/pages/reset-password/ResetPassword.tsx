import { Button, Col, Form, Input, Modal, Row, Typography } from "antd";
import React from "react";
import logo from "./../../assets/svg/logo-header.svg";
import bgResetPassword from "./../../assets/svg/bg-reset-password.svg";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { withTranslation } from "react-i18next";
import { postResetPassword } from "../../repository/AuthRepo";
import { AxiosResponse } from "axios";

export interface ResetPasswordProps {
  t: (x: any) => any;
  match: any;
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
  componentDidMount() {
    window.document.title = "Reset Password | KerjaApp";
  }
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
                newPassword: yup
                  .string()
                  .required(`${t("resetPassword:error.newPassword")}`),
                confirmPassword: yup
                  .string()
                  .oneOf(
                    [yup.ref("newPassword"), null],
                    `${t("resetPassword:error.confirmPasswordSame")}`
                  )
                  .required(`${t("resetPassword:error.confirmPassword")}`),
              })}
              onSubmit={(values, { setSubmitting }) => {
                const payload: any = { ...values };
                payload.resetKey = this.props.match.params.resetKey;
                postResetPassword(payload)
                  .then((res: AxiosResponse<any>) => {
                    Modal.success({
                      title: `${this.props.t("notif.success")}`,
                      content: `${this.props.t("resetPassword:success")}`,
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
                      name="newPassword"
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
                      errors.confirmPassword && touched.confirmPassword
                        ? "error"
                        : ""
                    }
                    help={
                      errors.confirmPassword && touched.confirmPassword
                        ? errors.confirmPassword
                        : null
                    }
                  >
                    <Input.Password
                      size="large"
                      name="confirmPassword"
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
                          onClick={() => handleSubmit()}
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
