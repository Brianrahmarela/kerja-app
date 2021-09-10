import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Row, Typography } from "antd";
import { Component } from "react";
import PersonalInfo from "./PersonalInfo";
import PersonalForm from "./PersonalForm";
interface IProps {}
interface IState {
  editMode: boolean;
}
export default class PersonalList extends Component<IProps, IState> {
  state = {
    editMode: false,
  };
  switchEditMode() {
    this.setState({ editMode: !this.state.editMode });
  }
  render() {
    return (
      <Card className="account-card">
        <Row justify="space-between">
          <Col>
            <Typography.Title level={5}>About me</Typography.Title>
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
          <PersonalForm switchEditMode={() => this.switchEditMode()} />
        )}
        {this.state.editMode === false && <PersonalInfo />}
      </Card>
    );
  }
}
