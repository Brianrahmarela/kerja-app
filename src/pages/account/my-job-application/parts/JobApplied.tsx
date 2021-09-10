import {
  faDownload,
  faEye,
  faPaperclip,
  faStopwatch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Row, Space, Typography } from "antd";
import { Component } from "react";
interface IProps {}
interface IState {
  pagination: any;
}
export default class JobApplied extends Component<IProps, IState> {
  render() {
    return (
      <Card style={{ width: "100%" }}>
        <Row justify="space-between">
          <Col>
            <Typography.Title level={4}>System Architect</Typography.Title>
            <Typography.Text>Great Eastern Life (GELINDO) </Typography.Text>
          </Col>
          <Col>
            <Space>
              <Button
                size="small"
                type="primary"
                style={{ backgroundColor: "#12D4E2", borderColor: "#12D4E2" }}
                icon={
                  <FontAwesomeIcon
                    icon={faDownload}
                    style={{ marginRight: 5, marginLeft: 5 }}
                  />
                }
              ></Button>
              <Button
                size="small"
                type="primary"
                style={{ backgroundColor: "#12E29B", borderColor: "#12E29B" }}
                icon={
                  <FontAwesomeIcon icon={faEye} style={{ marginRight: 5 }} />
                }
                onClick={() => {
                  window.location.hash = "/app/profile/my-job-application/1";
                }}
              >
                View
              </Button>
              <Button
                size="small"
                type="primary"
                style={{ backgroundColor: "#C1C0BA", borderColor: "#C1C0BA" }}
                icon={
                  <FontAwesomeIcon icon={faTrash} style={{ marginRight: 5 }} />
                }
              >
                Withdraw
              </Button>
            </Space>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Row style={{ marginTop: 20 }}>
              <Col span={6}>
                <Typography.Text>Received on</Typography.Text>
              </Col>
              <Col span={18}>
                : <Typography.Text>s</Typography.Text>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Typography.Text>Number of Applicant</Typography.Text>
              </Col>
              <Col span={18}>
                : <Typography.Text>s</Typography.Text>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Typography.Text>Role</Typography.Text>
              </Col>
              <Col span={18}>
                : <Typography.Text>s</Typography.Text>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Typography.Text>Position Level</Typography.Text>
              </Col>
              <Col span={18}>
                : <Typography.Text>s</Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row justify="space-between" align="middle">
          <Col
            style={{
              marginTop: 20,
              verticalAlign: "middle",
              alignContent: "center",
              display: "flex",
            }}
          >
            <FontAwesomeIcon
              icon={faStopwatch}
              style={{ marginRight: 5, fontSize: 16 }}
            />
            <Typography.Text style={{ fontSize: 12 }}>
              Applied on 11 January 2021 17:30 PM
            </Typography.Text>
          </Col>
          <Col>
            <Space>
              <Button size="large" type="link">
                <FontAwesomeIcon
                  icon={faPaperclip}
                  style={{ marginRight: 5 }}
                />{" "}
                Submit Application
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
    );
  }
}
