import { Component } from "react";
import { Button, Col, Divider, Modal, Row, Space, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import {
  deleteEducation,
  getEducations,
} from "../../../../../repository/WorkerRepo";
import { AxiosResponse } from "axios";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
interface IProps {
  data: any;
  setEducations?: (x: any) => void;
  editData: () => void;
}
interface IState {}
class EducationInfo extends Component<IProps, IState> {
  reloadEducation() {
    getEducations()
      .then((res: AxiosResponse<any>) => {
        const ordered = res.data
          .sort((a: any, b: any) => {
            return moment(a.graduationDate).isAfter(b.graduationDate) ? -1 : 1;
          })
          .map((a: any) => {
            a.editMode = false;
            return a;
          });
        this.props.setEducations?.(ordered);
      })
      .catch((error) => {});
  }
  render() {
    const { data } = this.props;
    return (
      <div>
        <Divider />
        <Row justify="space-between">
          <Col>
            <Typography.Text>
              {data.graduationDate &&
                moment(data.graduationDate).format("MMM YYYY")}
            </Typography.Text>
          </Col>
          <Col>
            <Space>
              <Button
                size="small"
                type="primary"
                style={{ backgroundColor: "#12e29b", borderColor: "#12e29b" }}
                icon={
                  <FontAwesomeIcon icon={faEdit} style={{ marginRight: 5 }} />
                }
                onClick={() => this.props.editData()}
              >
                Edit
              </Button>
              <Button
                size="small"
                danger
                type="primary"
                onClick={() => {
                  Modal.confirm({
                    title: "Are you sure want to delete this data?",
                    onOk: () => {
                      deleteEducation(data.id).then(
                        (res: AxiosResponse<any>) => {
                          this.reloadEducation();
                        }
                      );
                    },
                  });
                }}
                icon={
                  <FontAwesomeIcon icon={faTrash} style={{ marginRight: 5 }} />
                }
              >
                Delete
              </Button>
            </Space>
          </Col>
        </Row>
        <Typography.Title level={4}>{data.instituteName}</Typography.Title>
        <Typography.Text>
          {data.qualification} {(data.major && " in " + data.major) || ""} |{" "}
          {data.location}
        </Typography.Text>
        {data.major && (
          <>
            <Row style={{ marginTop: 20 }}>
              <Col span={6}>
                <Typography.Text>Major</Typography.Text>
              </Col>
              <Col span={18}>
                : <Typography.Text>{data.major}</Typography.Text>
              </Col>
            </Row>
          </>
        )}
        {data.score > 0 && (
          <>
            <Row>
              <Col span={6}>
                <Typography.Text>CGPA</Typography.Text>
              </Col>
              <Col span={18}>
                : <Typography.Text>{data.score} / 4.0</Typography.Text>
              </Col>
            </Row>
          </>
        )}
        {data.grade && (
          <>
            <Row>
              <Col span={6}>
                <Typography.Text>Grade</Typography.Text>
              </Col>
              <Col span={18}>
                : <Typography.Text>{data.grade}</Typography.Text>
              </Col>
            </Row>
          </>
        )}
        {data.additionalInfo && (
          <>
            <Typography.Title level={4} style={{ marginTop: 20 }}>
              Additional Information:
            </Typography.Title>
            {ReactHtmlParser(data.additionalInfo)}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  setEducations: (payload: any) =>
    dispatch({
      type: "SET_EXPERIENCE",
      payload,
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(EducationInfo));
