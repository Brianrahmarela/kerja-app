import { Component } from "react";
import {
  AutoComplete,
  Button,
  Col,
  Divider,
  Form,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import { Formik } from "formik";
import * as yup from "yup";
import { DeleteOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { getSkills, postSkill } from "../../../../../repository/WorkerRepo";
import { AxiosResponse } from "axios";
interface IProps {
  switchEditMode: () => void;
}
interface IState {
  pageReady: boolean;
  editMode: boolean;
  skillOptions: any[];
  skillForm: any[];
}
export default class EducationForm extends Component<IProps, IState> {
  state = {
    pageReady: false,
    editMode: false,
    skillOptions: [] as any[],
    skillForm: [
      {
        skillName: "",
        level: "BEGINNER",
        id: undefined,
      },
    ],
  };
  componentDidMount() {
    getSkills()
      .then((res: AxiosResponse<any>) => {
        this.setState({ skillForm: res.data });
      })
      .catch((error) => {})
      .finally(() => {});
  }
  render() {
    return (
      <div>
        <Divider />
        <Form layout="vertical">
          <Formik
            enableReinitialize
            initialValues={this.state.skillForm}
            validationSchema={yup.array().of(
              yup.object().shape({
                skillName: yup.string().required("This field is required"),
              })
            )}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              postSkill(values)
                .then((res: AxiosResponse<any>) => {
                  this.props.switchEditMode();
                })
                .finally(() => {
                  setSubmitting(false);
                });
            }}
          >
            {({
              values,
              errors,
              touched,
              setFieldTouched,
              setFieldValue,
              handleChange,
              handleBlur,
              isSubmitting,
              handleSubmit,
              setValues,
            }) => (
              <>
                <Row style={{ marginBottom: 15 }}>
                  <Col>
                    <Button
                      type="primary"
                      icon={
                        <FontAwesomeIcon
                          icon={faPlusSquare}
                          style={{ marginRight: 5 }}
                        />
                      }
                      onClick={() => {
                        const skills = [...values];
                        skills.push({
                          id: undefined,
                          skillName: "",
                          level: "BEGINNER",
                        });
                        this.setState({ skillForm: skills });
                      }}
                    >
                      Add
                    </Button>
                  </Col>
                </Row>
                <Row justify="start" gutter={15}>
                  <Col span={10}>Skill Name</Col>
                  <Col span={10}>Level</Col>
                  <Col span={4}></Col>
                </Row>
                {values.map((skill: any, index: number) => (
                  <Form.Item
                    key={index}
                    help={errors[index]?.skillName}
                    validateStatus={
                      errors[index]?.skillName && touched[index]?.skillName
                        ? "error"
                        : ""
                    }
                  >
                    <Row gutter={15}>
                      <Col span={10}>
                        <AutoComplete
                          value={skill.skillName}
                          onSearch={(e) => {
                            // getSkillName(e).then((res: AxiosResponse<any>) => {
                            //   this.setState({ skillOptions: res.data });
                            // });
                          }}
                          onSelect={(e) => {
                            setFieldValue(`${index}.skillName`, e);
                            setFieldTouched(`${index}.skillName`, true);
                          }}
                          onChange={(e) => {
                            setFieldValue(`${index}.skillName`, e);
                            setFieldTouched(`${index}.skillName`, true);
                          }}
                        >
                          {this.state.skillOptions.map((val: string) => (
                            <AutoComplete.Option key={val} value={val}>
                              {val}
                            </AutoComplete.Option>
                          ))}
                        </AutoComplete>
                      </Col>
                      <Col span={8}>
                        <Select
                          value={skill.level}
                          onChange={(e) => {
                            setFieldValue(`${index}.level`, e);
                            setFieldTouched(`${index}.level`, true);
                          }}
                        >
                          <Select.Option value={"BEGINNER"}>
                            BEGINNER
                          </Select.Option>
                          <Select.Option value={"INTERMEDIATE"}>
                            INTERMEDIATE
                          </Select.Option>
                          <Select.Option value={"ADVANCE"}>
                            ADVANCE
                          </Select.Option>
                        </Select>
                      </Col>
                      <Col span={4}>
                        <Button
                          icon={<DeleteOutlined />}
                          onClick={() => {
                            Modal.confirm({
                              content:
                                "Are your sure want to delete this data?",
                              onOk: () => {
                                values.splice(index, 1);
                                setValues(values);
                              },
                            });
                          }}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                ))}
                <Form.Item>
                  <Space direction="horizontal">
                    <Button
                      type="primary"
                      loading={isSubmitting}
                      onClick={() => handleSubmit()}
                    >
                      <FontAwesomeIcon
                        icon={faSave}
                        style={{ marginRight: 5 }}
                      />
                      Save
                    </Button>
                    <Button
                      type="default"
                      onClick={() => this.props.switchEditMode()}
                    >
                      <FontAwesomeIcon
                        icon={faTimes}
                        style={{ marginRight: 5 }}
                      />
                      Cancel
                    </Button>
                  </Space>
                </Form.Item>
              </>
            )}
          </Formik>
        </Form>
      </div>
    );
  }
}
