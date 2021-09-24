import { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Button, Col, Form, Input, Modal, Row, Space } from "antd";
import { Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
    getLogout,
    //   getProfile,
    //   postProfile,
} from "../../../repository/AuthRepo";
// import { AxiosResponse } from "axios";

interface Iprops {
    switchEditMode: () => void;
    t: (x: any) => void;
    logout?: () => void;
}
interface IState {
    formData: any;
    editMode: boolean;
    editPassword: boolean;
    pageReady: boolean;
}
class ProfileForm extends Component<Iprops, IState> {
    state = {
        pageReady: false,
        editMode: false,
        editPassword: false,
        formData: {
            username: "",
            email: "",
            country: "",
            region: "",
            enableNotification: true,
            firstName: "",
            lastName: "",
            phone: "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    };
    componentDidMount() {
        // getProfile()
        //   .then((res: AxiosResponse<any>) => {
        //     this.setState({
        //       formData: res.data,
        //     });
        //   })
        //   .catch((error) => {
        //     Modal.error({
        //       title: `${this.props.t?.("notif.failed")}`,
        //       // content : error.response.data.message
        //       content: error.response?.data?.message || error.message || "-",
        //     });
        //   })
        //   .finally(() => {
        //     this.setState({ pageReady: true });
        //   });
    }
    render() {
        // if (this.state.pageReady === false) {
        //     return (
        //         <div
        //             style={{
        //                 width: "100%",
        //                 height: "100%",
        //                 flex: 1,
        //                 justifyContent: "center",
        //                 alignContent: "center",
        //                 display: "flex",
        //             }}
        //         >
        //             <Spin style={{ alignSelf: "center" }} tip="Loading..." />
        //         </div>
        //     );
        // }
        return (
            <>
                <Form layout="vertical">
                    <Formik
                        initialValues={this.state.formData}
                        onSubmit={(values, { setSubmitting }) => {
                            Modal.confirm({
                                title: "info!",
                                content: "You must re-login after change these information\n do you wish to continue?",
                                onOk: () => {
                                    // postProfile(values)
                                    //   .then((res: AxiosResponse<any>) => {
                                    //     notification.success({
                                    //       message: "Success",
                                    //     });
                                    //     this.props.switchEditMode();
                                    //     setTimeout(() => {
                                    //       this.props.logout?.();
                                    //     }, 2000);
                                    //   })
                                    //   .catch((error: any) => {
                                    //     Modal.error({
                                    //       title: `${this.props.t?.("notif.failed")}`,
                                    //       // content : error.response.data.message
                                    //       content:
                                    //         error.response?.data?.message || error.message || "-",
                                    //     });
                                    //   })
                                    //   .finally(() => {
                                    //     setSubmitting(false);
                                    //   });
                                },
                            });
                        }}
                    >
                        {({ errors, touched, values, handleChange, handleBlur, setFieldValue, setFieldTouched, handleSubmit, isSubmitting, dirty }) => (
                            <>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            label={`Current Password`}
                                            validateStatus={errors.currentPassword && touched.currentPassword ? "error" : ""}
                                            help={errors.currentPassword && touched.currentPassword ? errors.currentPassword : null}
                                        >
                                            <Input.Password
                                                name="currentPassword"
                                                defaultValue={values.currentPassword}
                                                onChange={(e) => {
                                                    setFieldValue("currentPassword", e.target.value);
                                                    setFieldTouched("currentPassword");
                                                }}
                                                onBlur={handleBlur}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label={`New Password`}
                                            validateStatus={errors.newPassword && touched.newPassword ? "error" : ""}
                                            help={errors.newPassword && touched.newPassword ? errors.newPassword : null}
                                        >
                                            <Input.Password
                                                name="newPassword"
                                                defaultValue={values.newPassword}
                                                onChange={(e) => {
                                                    setFieldValue("newPassword", e.target.value);
                                                    setFieldTouched("newPassword");
                                                }}
                                                onBlur={handleBlur}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label={`Password Confirmation`}
                                            validateStatus={errors.confirmPassword && touched.confirmPassword ? "error" : ""}
                                            help={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : null}
                                        >
                                            <Input.Password
                                                name="confirmPassword"
                                                defaultValue={values.confirmPassword}
                                                onChange={(e) => {
                                                    setFieldValue("confirmPassword", e.target.value);
                                                    setFieldTouched("confirmPassword");
                                                }}
                                                onBlur={handleBlur}
                                            />
                                        </Form.Item>

                                        <Form.Item>
                                            <Button
                                                type="link"
                                                onClick={() => {
                                                    this.setState({ editPassword: false });
                                                    setFieldValue("currentPassword", "");
                                                    setFieldValue("newPassword", "");
                                                    setFieldValue("confirmPassword", "");
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Space direction="horizontal">
                                    <Button type="primary" loading={isSubmitting} onClick={() => handleSubmit()}>
                                        <FontAwesomeIcon icon={faSave} style={{ marginRight: 5 }} />
                                        Save
                                    </Button>
                                    <Button type="default" onClick={() => this.props.switchEditMode()}>
                                        <FontAwesomeIcon icon={faTimes} style={{ marginRight: 5 }} />
                                        Cancel
                                    </Button>
                                </Space>
                            </>
                        )}
                    </Formik>
                </Form>
            </>
        );
    }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
    logout: async () => {
        try {
            await getLogout();
        } catch (error) {
        } finally {
            window.location.hash = "/";
        }
        return dispatch({ type: "LOGOUT" });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ProfileForm));
