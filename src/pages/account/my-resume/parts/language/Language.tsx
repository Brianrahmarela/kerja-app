import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Row, Typography } from "antd";
import { Component } from "react";
import LanguageInfo from "./LanguageInfo";
import LanguageForm from "./LanguageForm";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
interface IProps {
  switchEditMode: () => void;
}
interface IState {
  editMode: boolean;
}
class LanguageList extends Component<IProps, IState> {
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
            <Typography.Title level={5}>Languages</Typography.Title>
          </Col>
          {this.state.editMode === false && (
            <Col>
              <Button
                onClick={() => this.switchEditMode()}
                icon={
                  <FontAwesomeIcon icon={faEdit} style={{ marginRight: 5 }} />
                }
              >
                Edit
              </Button>
            </Col>
          )}
        </Row>
        {this.state.editMode && (
          <LanguageForm switchEditMode={() => this.switchEditMode()} />
        )}
        {this.state.editMode === false && <LanguageInfo />}
      </Card>
    );
  }
}

const mapStateToProps = (state: any) => ({
  experienceList: state.worker.experienceList,
});

const mapDispatchToProps = (dispatch: any) => ({
  setLanguages: (payload: any) =>
    dispatch({
      type: "SET_EXPERIENCE",
      payload,
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(LanguageList));
