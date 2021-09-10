import { Component } from "react";
import { Button, Col, Divider, Modal, Row, Space, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { withTranslation } from "react-i18next";
import {
  deleteCertification,
  getCertifications,
} from "../../../../../repository/WorkerRepo";
import moment from "moment";
import { AxiosResponse } from "axios";
interface IProps {
  data: any;
  setSertifications?: (x: any) => void;
  editData: () => void;
}
interface IState {}
class CertificationInfo extends Component<IProps, IState> {
  reloadCertification() {
    getCertifications()
      .then((res: AxiosResponse<any>) => {
        const ordered = res.data
          .sort((a: any, b: any) => {
            return moment(a.joinDate).isAfter(b.joinDate) ? -1 : 1;
          })
          .map((a: any) => {
            a.editMode = false;
            return a;
          });
        this.props.setSertifications?.(ordered);
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
            <Typography.Text></Typography.Text>
          </Col>
          <Col>
            <Space>
              <Button
                icon={
                  <FontAwesomeIcon icon={faEdit} style={{ marginRight: 5 }} />
                }
                onClick={() => this.props.editData()}
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  Modal.confirm({
                    title: "Are you sure want to delete this data?",
                    onOk: () => {
                      deleteCertification(data.id).then(
                        (res: AxiosResponse<any>) => {
                          this.reloadCertification();
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
        <Typography.Title level={4}>{data.title}</Typography.Title>
        <Typography.Text>{data.institutionName}</Typography.Text>
        {data.valiDate && (
          <>
            <Row style={{ marginTop: 20 }}>
              <Col span={6}>
                <Typography.Text>Valid From</Typography.Text>
              </Col>
              <Col span={18}>
                : <Typography.Text>{data.validDate}</Typography.Text>
              </Col>
            </Row>
          </>
        )}
        {data.expiredDate && (
          <>
            <Row>
              <Col span={6}>
                <Typography.Text>Valid Until</Typography.Text>
              </Col>
              <Col span={18}>
                :{" "}
                <Typography.Text>
                  {data.neverExpired ? "Never Expired" : data.expiredDate}
                </Typography.Text>
              </Col>
            </Row>
          </>
        )}
        <Row>
          <Col span={6}>
            <Typography.Text>Certified By</Typography.Text>
          </Col>
          <Col span={18}>
            : <Typography.Text>{data.publisherName}</Typography.Text>
          </Col>
        </Row>
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
  setSertifications: (payload: any) =>
    dispatch({
      type: "SET_CERTIFICATION",
      payload,
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(CertificationInfo));
