import { Component } from "react";
import { Button, Col, Divider, Modal, Row, Space, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import ReactHtmlParser from "react-html-parser";
import {
  deleteExperience,
  getExperiences,
} from "../../../../../repository/WorkerRepo";
import { AxiosResponse } from "axios";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
interface IProps {
  data: any;
  setExperiences?: (x: any) => void;
  editData: () => void;
}
interface IState {}
class ExperienceInfo extends Component<IProps, IState> {
  reloadExperience() {
    getExperiences()
      .then((res: AxiosResponse<any>) => {
        const ordered = res.data
          .sort((a: any, b: any) => {
            return moment(a.joinDate).isAfter(b.joinDate) ? -1 : 1;
          })
          .map((a: any) => {
            a.editMode = false;
            return a;
          });
        this.props.setExperiences?.(ordered);
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
              {moment(data.joinDate).format("MMM YYYY")} -
              {(data.isPresent && "Present") ||
                moment(data.endDate).format("MMM YYYY")}
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
                      deleteExperience(data.id).then(
                        (res: AxiosResponse<any>) => {
                          this.reloadExperience();
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
        <Typography.Title level={4}>{data.positionTitle}</Typography.Title>
        <Typography.Text>{data.organizationName}</Typography.Text>

        <Row style={{ marginTop: 20 }}>
          <Col span={6}>
            <Typography.Text>Industry</Typography.Text>
          </Col>
          <Col span={18}>
            : <Typography.Text>{data.industry}</Typography.Text>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Typography.Text>Specialization</Typography.Text>
          </Col>
          <Col span={18}>
            : <Typography.Text>{data.specializationName}</Typography.Text>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Typography.Text>Role</Typography.Text>
          </Col>
          <Col span={18}>
            : <Typography.Text>{data.jobRoleName}</Typography.Text>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Typography.Text>Position Level</Typography.Text>
          </Col>
          <Col span={18}>
            : <Typography.Text>{data.positionLevel}</Typography.Text>
          </Col>
        </Row>
        {data.country && (
          <>
            <Row>
              <Col span={6}>
                <Typography.Text>Country</Typography.Text>
              </Col>
              <Col span={18}>
                : <Typography.Text>{data.country}</Typography.Text>
              </Col>
            </Row>
          </>
        )}
        {data.jobDescription && (
          <>
            <Typography.Title level={3} style={{ marginTop: 30 }}>
              Description of work:
            </Typography.Title>
            {ReactHtmlParser(data.jobDescription)}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  setExperiences: (payload: any) =>
    dispatch({
      type: "SET_EXPERIENCE",
      payload,
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ExperienceInfo));
