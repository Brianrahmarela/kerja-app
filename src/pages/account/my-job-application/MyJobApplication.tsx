import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Button, Card, Col, Input, Row, Select, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import JobApplied from "./parts/JobApplied";

interface Iprops {
  t: (x: any) => void;
}
interface IState {}
class MyJobApplication extends Component<Iprops, IState> {
  render() {
    return (
      <Card className="account-card">
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <Col>
            <Space>
              <Button type="primary" shape="round">
                Active Application (4)
              </Button>
              <Button type="default" shape="round">
                Archive Application (28)
              </Button>
            </Space>
          </Col>
          <Col>
            <Space>
              <Input
                prefix={<FontAwesomeIcon icon={faSearch} />}
                placeholder="Search job"
                style={{ borderRadius: 32 }}
              ></Input>
              <FontAwesomeIcon
                icon={faCalendarAlt}
                style={{ marginRight: 5 }}
              />
              <Select value="" style={{ borderRadius: 30 }}>
                <Select.Option value="">Date Submitted</Select.Option>
              </Select>
            </Space>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <JobApplied />
          </Col>
        </Row>
      </Card>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(MyJobApplication));
