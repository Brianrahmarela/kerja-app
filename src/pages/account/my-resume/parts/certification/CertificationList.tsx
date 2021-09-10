import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Row, Typography } from "antd";
import React, { Component } from "react";
import CertificationInfo from "./CertificationInfo";
import CertificationForm from "./CertificationForm";
import { AxiosResponse } from "axios";
import { getCertifications } from "../../../../../repository/WorkerRepo";
import moment from "moment";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
interface IProps {
  switchEditMode: () => void;
  setCertifications?: (x: any) => void;
  certificationList?: any[];
}
interface IState {
  pageReady: boolean;
}
class CertificationList extends Component<IProps, IState> {
  state = {
    pageReady: false,
  };
  componentDidMount() {
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
        this.props.setCertifications?.(ordered);
      })
      .catch((error) => {})
      .finally(() => {
        this.setState({ pageReady: true });
      });
  }
  render() {
    return (
      <Card className="account-card">
        <Row justify="space-between">
          <Col>
            <Typography.Title level={5}>Certifications</Typography.Title>
          </Col>
          <Col>
            <Button
              icon={
                <FontAwesomeIcon
                  icon={faPlusSquare}
                  style={{ marginRight: 5 }}
                />
              }
              onClick={() => {
                const emptyData: any = {
                  institutionName: "",
                  institutionId: undefined,
                  title: "",
                  description: "",
                  publisherName: "",
                  publisherPhone: "",
                  publisherAddress: "",
                  publisherEmail: "",
                  website: "",
                  validDate: undefined,
                  expiredDate: undefined,
                  neverExpired: true,
                  additionalInfo: "",
                  editMode: true,
                };
                const newList = [...(this.props.certificationList as any[])];

                newList.unshift(emptyData);
                this.props.setCertifications?.(newList);
              }}
            >
              Add
            </Button>
          </Col>
        </Row>
        {this.props.certificationList?.map((val: any, index: number) => {
          if (val.editMode) {
            return (
              <CertificationForm
                key={index}
                data={val}
                closeForm={() => {
                  const cloneList = [
                    ...(this.props.certificationList as any[]),
                  ];
                  // hapus jika id masih kosong
                  if (cloneList[index].id) {
                    cloneList[index].editMode = false;
                  } else {
                    cloneList.splice(0, 1);
                  }
                  console.log(cloneList);
                  this.props.setCertifications?.(cloneList);
                }}
              />
            );
          } else {
            return (
              <CertificationInfo
                key={index}
                data={val}
                editData={() => {
                  const cloneList = [
                    ...(this.props.certificationList as any[]),
                  ];
                  cloneList[index].editMode = true;
                  this.props.setCertifications?.(cloneList);
                }}
              />
            );
          }
        })}
      </Card>
    );
  }
}

const mapStateToProps = (state: any) => ({
  certificationList: state.worker.certificationList,
});

const mapDispatchToProps = (dispatch: any) => ({
  setCertifications: (payload: any) =>
    dispatch({
      type: "SET_CERTIFICATION",
      payload,
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(CertificationList));
