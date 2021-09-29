import { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Button, Col, Form, Row, Typography } from "antd";
// import { getProfile } from "../../../repository/UserRepo";

interface Iprops {
    t?: (x: any) => void;
    currentUser?: any;
    switchEditMode: () => void;
}
interface IState {
    formData: any;
    editMode: boolean;
    pageReady: boolean;
}
class ProfileForm extends Component<Iprops, IState> {
    state = {
        pageReady: false,
        editMode: false,
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
        const { currentUser } = this.props;
        return (
            <>
                <Form layout="vertical">
                    <>
                        <Row>
                            <Col span={6}>
                                <Typography.Text>Username</Typography.Text>
                            </Col>
                            <Col span={18}>
                                : <Typography.Text>{currentUser?.username} </Typography.Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <Typography.Text>Email</Typography.Text>
                            </Col>
                            <Col span={18}>
                                : <Typography.Text>{currentUser?.email || "-"} </Typography.Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <Typography.Text>Name</Typography.Text>
                            </Col>
                            <Col span={18}>
                                :{" "}
                                <Typography.Text>
                                    {currentUser?.firstName} {currentUser?.lastName}{" "}
                                </Typography.Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <Typography.Text>Password</Typography.Text>
                            </Col>
                            <Col span={18}>
                                : <Typography.Text>************ </Typography.Text>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col span={24} style={{ marginTop: 30 }}>
                                <Form.Item label="Change Password">
                                    <Button onClick={() => this.props.switchEditMode()}>Change password</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                </Form>
            </>
        );
    }
}

const mapStateToProps = (state: any) => ({
    currentUser: state.account.currentUser,
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ProfileForm));
