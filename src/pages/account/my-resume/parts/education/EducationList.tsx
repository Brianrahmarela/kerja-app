import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Row, Typography } from "antd";
import React, { Component } from "react";
import EducationInfo from "./EducationInfo";
import EducationForm from "./EducationForm";
import { AxiosResponse } from "axios";
import { getEducations } from "../../../../../repository/WorkerRepo";
import moment from "moment";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
interface IProps {
  switchEditMode: () => void;
  setEducations?: (x: any) => void;
  experienceList?: any[];
}
interface IState {
  pageReady: boolean;
}
class EducationList extends Component<IProps, IState> {
  state = {
    pageReady: false,
  };
  componentDidMount() {
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
            <Typography.Title level={5}>Educations</Typography.Title>
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
                  instituteName: "",
                  graduationDate: undefined,
                  qualification: "",
                  location: "",
                  fieldOfStudy: "",
                  major: "",
                  grade: "",
                  score: 0.0,
                  additionalInfo: "",
                  editMode: true,
                };
                const newList = [...(this.props.experienceList as any[])];

                newList.unshift(emptyData);
                this.props.setEducations?.(newList);
              }}
            >
              Add
            </Button>
          </Col>
        </Row>
        {this.props.experienceList?.map((val: any, index: number) => {
          if (val.editMode) {
            return (
              <EducationForm
                key={index}
                data={val}
                closeForm={() => {
                  const cloneList = [...(this.props.experienceList as any[])];
                  // hapus jika id masih kosong
                  if (cloneList[index].id) {
                    cloneList[index].editMode = false;
                  } else {
                    cloneList.splice(0, 1);
                  }
                  console.log(cloneList);
                  this.props.setEducations?.(cloneList);
                }}
              />
            );
          } else {
            return (
              <EducationInfo
                key={index}
                data={val}
                editData={() => {
                  const cloneList = [...(this.props.experienceList as any[])];
                  cloneList[index].editMode = true;
                  this.props.setEducations?.(cloneList);
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
  experienceList: state.worker.experienceList,
});

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
)(withTranslation()(EducationList));
