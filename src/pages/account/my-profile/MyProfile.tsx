import { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Button, Card, Col, Row, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import ProfileForm from "./ProfileForm";
import ProfileInfo from "./ProfileInfo";

interface Iprops {
    t: (x: any) => void;
}
interface IState {
    editMode: boolean;
}
class MyProfile extends Component<Iprops, IState> {
    state = {
        editMode: false,
    };
    switchEditMode() {
        this.setState({ editMode: !this.state.editMode });
    }
    render() {
        return (
            <Card className="account-card">
                <Row justify="space-between" style={{ marginBottom: 20 }}>
                    <Col>
                        <Typography.Title level={5}>My Account</Typography.Title>
                    </Col>
                    {this.state.editMode === false && (
                        <Col>
                            <Button href="#/account/my-resume" icon={<FontAwesomeIcon icon={faEdit} style={{ marginRight: 5 }} />}>
                                Edit
                            </Button>
                        </Col>
                    )}
                </Row>
                {this.state.editMode && <ProfileForm switchEditMode={() => this.switchEditMode()} />}
                {this.state.editMode === false && <ProfileInfo switchEditMode={() => this.switchEditMode()} />}
            </Card>
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(MyProfile));
