import { Component } from "react";
import {
  AutoComplete,
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  InputNumber,
  Modal,
  Row,
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
import {
  getLanguages,
  postLanguage,
} from "../../../../../repository/WorkerRepo";
import { AxiosResponse } from "axios";
interface IProps {
  switchEditMode: () => void;
}
interface IState {
  pageReady: boolean;
  editMode: boolean;
  languageOptions: any[];
  languageForm: any[];
}
export default class LanguageForm extends Component<IProps, IState> {
  state = {
    pageReady: false,
    editMode: false,
    languageOptions: [] as any[],
    languageForm: [
      {
        language: "",
        spokenRate: 0,
        writtenRate: 0,
        primaryLang: false,
      },
    ],
  };
  componentDidMount() {
    getLanguages()
      .then((res: AxiosResponse<any>) => {
        this.setState({ languageForm: res.data });
      })
      .catch((error) => {})
      .finally(() => {});
  }
  render() {
    console.log("asdf");
    return (
      <div>
        <Divider />
        <Form layout="vertical">
          <Formik
            enableReinitialize
            initialValues={this.state.languageForm}
            validationSchema={yup.array().of(
              yup.object().shape({
                language: yup.string().required("This field is required"),
                spokenRate: yup
                  .number()
                  .positive("Must positif number")
                  .max(10, "Max 10")
                  .required("This field is required"),
                writtenRate: yup
                  .number()
                  .positive("Must positif number")
                  .max(10, "Max 10")
                  .required("This field is required"),
              })
            )}
            onSubmit={(values, { setSubmitting }) => {
              postLanguage(values)
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
                        const languages = [...values];
                        languages.push({
                          language: "",
                          spokenRate: 0,
                          writtenRate: 0,
                          primaryLang: false,
                        });
                        this.setState({ languageForm: languages });
                      }}
                    >
                      Add
                    </Button>
                  </Col>
                </Row>
                <Form.Item style={{ marginBottom: 0 }}>
                  <Row gutter={15}>
                    <Col span={7}>
                      <div>
                        <label htmlFor="">Language</label>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div>
                        <label htmlFor="">Spoken</label>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div>
                        <label htmlFor="">Written</label>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div>
                        <label htmlFor=""> &nbsp;</label>
                      </div>
                    </Col>
                    <Col span={3}>
                      <div>
                        <label htmlFor="">&nbsp; </label>
                      </div>
                    </Col>
                  </Row>
                </Form.Item>
                {values.map((language: any, index: number) => (
                  <Form.Item
                    key={index}
                    validateStatus={
                      (errors[index]?.language && touched[index]?.language) ||
                      (errors[index]?.spokenRate &&
                        touched[index]?.spokenRate) ||
                      (errors[index]?.writtenRate &&
                        touched[index]?.writtenRate)
                        ? "error"
                        : ""
                    }
                  >
                    <Row gutter={15}>
                      <Col span={7}>
                        <AutoComplete
                          value={language.language}
                          onSearch={(e) => {
                            // getLanguageName(e).then(
                            //   (res: AxiosResponse<any>) => {
                            //     this.setState({ languageOptions: res.data });
                            //   }
                            // );
                          }}
                          onSelect={(e) => {
                            setFieldValue(`${index}.language`, e);
                            setFieldTouched(`${index}.language`, true);
                          }}
                          onChange={(e) => {
                            setFieldValue(`${index}.language`, e);
                            setFieldTouched(`${index}.language`, true);
                          }}
                        >
                          {this.state.languageOptions.map((val: string) => (
                            <AutoComplete.Option key={val} value={val}>
                              {val}
                            </AutoComplete.Option>
                          ))}
                        </AutoComplete>
                      </Col>
                      <Col span={4}>
                        <InputNumber
                          max={10}
                          min={0}
                          name="spokenRate"
                          value={language.spokenRate}
                          defaultValue={language.spokenRate}
                          onChange={(e) => {
                            setFieldValue(`${index}.spokenRate`, e);
                            setFieldTouched(`${index}.spokenRate`);
                          }}
                        />
                      </Col>
                      <Col span={4}>
                        <InputNumber
                          max={10}
                          min={0}
                          name="writtenRate"
                          value={language.writtenRate}
                          defaultValue={language.writtenRate}
                          onChange={(e) => {
                            setFieldValue(`${index}.writtenRate`, e);
                            setFieldTouched(`${index}.writtenRate`);
                          }}
                        />
                      </Col>
                      <Col span={4}>
                        <Checkbox
                          checked={language.primaryLang}
                          onChange={(e) => {
                            values.forEach((val, index2: number) => {
                              setFieldValue(`${index2}.primaryLang`, false);
                            });
                            setFieldValue(
                              `${index}.primaryLang`,
                              e.target.checked
                            );
                            setFieldTouched(`${index}.primaryLang`);
                          }}
                        >
                          Primary
                        </Checkbox>
                      </Col>
                      <Col span={3}>
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
