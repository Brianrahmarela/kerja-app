import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import {
  Button,
  Card,
  Col,
  Collapse,
  DatePicker,
  Input,
  Row,
  Select,
  Space,
  Timeline,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import moment from "moment";

interface Iprops {
  t: (x: any) => void;
}
interface IState {}
class MyEvent extends Component<Iprops, IState> {
  render() {
    return (
      <Card
        className="event-card"
        title={
          <>
            <div>
              <Space>
                <DatePicker
                  picker="year"
                  defaultValue={moment()}
                  style={{ width: 90 }}
                ></DatePicker>
                <Button shape="round" type="primary">
                  All
                </Button>
                <Button shape="round" icon={<LeftOutlined />}></Button>
                <Button shape="round" type="default">
                  Jan
                </Button>
                <Button shape="round" type="default">
                  Feb
                </Button>
                <Button shape="round" type="default">
                  Mar
                </Button>
                <Button shape="round" type="default">
                  Apr
                </Button>
                <Button shape="round" type="default">
                  Mei
                </Button>
                <Button shape="round" type="default">
                  Jun
                </Button>
                <Button shape="round" type="default">
                  Jul
                </Button>
                <Button shape="round" type="default">
                  Aug
                </Button>
                <Button shape="round" type="default">
                  Sep
                </Button>
                <Button shape="round" type="default">
                  OKt
                </Button>
                <Button shape="round" type="default">
                  Nov
                </Button>
                <Button shape="round" type="default">
                  Des
                </Button>
                <Button shape="round" icon={<RightOutlined />}></Button>
              </Space>
            </div>
          </>
        }
      >
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          <Col span={16}>
            <Input
              prefix={<FontAwesomeIcon icon={faSearch} />}
              placeholder="Search Event"
              style={{ borderRadius: 32, width: "90%" }}
            />
          </Col>
          <Col span={8} style={{ textAlign: "right" }}>
            <Space>
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
            <Timeline mode="left" className="event-timeline">
              <Timeline.Item
                label={
                  <Button
                    type="primary"
                    shape="round"
                    style={{
                      backgroundColor: "#12A3E2",
                      borderColor: "#12A3E2",
                    }}
                  >
                    2 Maret
                  </Button>
                }
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Row gutter={15}>
                    <Col span={4}>
                      <Button
                        type="primary"
                        shape="round"
                        style={{
                          backgroundColor: "#76B1CB",
                          borderColor: "#76B1CB",
                        }}
                      >
                        07:00 - 09:00{" "}
                      </Button>
                    </Col>
                    <Col span={20}>
                      <Collapse
                        className="timeline-collapse"
                        expandIconPosition="right"
                      >
                        <Collapse.Panel header="This is panel header 1" key="1">
                          {
                            "it can be found as a welcome guest in many households across the world"
                          }
                        </Collapse.Panel>
                      </Collapse>
                    </Col>
                  </Row>

                  <Row gutter={15}>
                    <Col span={4}>
                      <Button
                        type="primary"
                        shape="round"
                        style={{
                          backgroundColor: "#76B1CB",
                          borderColor: "#76B1CB",
                        }}
                      >
                        07:00 - 09:00{" "}
                      </Button>
                    </Col>
                    <Col span={20}>
                      <Collapse
                        className="timeline-collapse"
                        expandIconPosition="right"
                      >
                        <Collapse.Panel header="This is panel header 1" key="1">
                          {
                            "it can be found as a welcome guest in many households across the world"
                          }
                        </Collapse.Panel>
                      </Collapse>
                    </Col>
                  </Row>
                </Space>
              </Timeline.Item>
            </Timeline>
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
)(withTranslation()(MyEvent));
