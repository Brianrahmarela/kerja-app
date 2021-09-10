import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Row, Typography } from "antd";
import React, { Component } from "react";
import ExperienceInfo from "./ExperienceInfo";
import ExperienceForm from "./ExperienceForm";
import { AxiosResponse } from "axios";
import { getExperiences } from "../../../../../repository/WorkerRepo";
import moment from "moment";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
interface IProps {
  switchEditMode: () => void;
  setExperiences?: (x: any) => void;
  experienceList?: any[];
}
interface IState {
  pageReady: boolean;
}
class ExperienceList extends Component<IProps, IState> {
  state = {
    pageReady: false,
  };
  componentDidMount() {
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
            <Typography.Title level={5}>Experiences</Typography.Title>
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
                  positionTitle: "",
                  organizationName: "",
                  organizationId: undefined,
                  joinDate: undefined,
                  endDate: undefined,
                  present: false,
                  specializationName: "",
                  jobRoleName: "",
                  country: "",
                  industry: "",
                  positionLevel: "",
                  monthlySalary: 0,
                  currency: "IDR",
                  jobDescription: "",
                  editMode: true,
                };
                const newList = [...(this.props.experienceList as any[])];

                newList.unshift(emptyData);
                this.props.setExperiences?.(newList);
              }}
            >
              Add
            </Button>
          </Col>
        </Row>
        {this.props.experienceList?.map((val: any, index: number) => {
          if (val.editMode) {
            return (
              <ExperienceForm
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
                  this.props.setExperiences?.(cloneList);
                }}
              />
            );
          } else {
            return (
              <ExperienceInfo
                key={index}
                data={val}
                editData={() => {
                  const cloneList = [...(this.props.experienceList as any[])];
                  cloneList[index].editMode = true;
                  this.props.setExperiences?.(cloneList);
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
  setExperiences: (payload: any) =>
    dispatch({
      type: "SET_EXPERIENCE",
      payload,
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ExperienceList));
