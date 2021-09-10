import { Component } from "react";
import {
  Divider,
  Form,
  Input,
  Select,
  Space,
  Button,
  Col,
  Row,
  Modal,
  notification,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from "formik";
import * as yup from "yup";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { PlusOutlined } from "@ant-design/icons";
import { getJobWish, postJobWish } from "../../../../../repository/WorkerRepo";
import { AxiosResponse } from "axios";
interface IProps {
  switchEditMode: () => void;
}
interface IState {
  formData: any;
}
export default class JobWishForm extends Component<IProps, IState> {
  state = {
    formData: {
      id: null,
      currency: "IDR",
      salary: 0,
      location: [""],
      trainingDevelopment: "",
      benefit: "",
    },
  };
  componentDidMount() {
    getJobWish()
      .then((res: AxiosResponse<any>) => {
        const { data } = res;
        const newData = {
          id: data.id || null,
          currency: data.currency || "IDR",
          salary: data.salary || 0,
          location: data?.location?.split(",") || [""],
          trainingDevelopment: data.trainingDevelopment || "",
          benefit: data.benefit || "",
        };
        this.setState({ formData: newData });
      })
      .catch((error) => {
        Modal.error({
          title: `Error`,
          // content : error.response.data.message
          content: error.response?.data?.message || error.message || "-",
        });
      })
      .finally(() => {});
  }
  render() {
    return (
      <div>
        <Divider />
        <Form {...{ wrapperCol: { span: 18 }, labelCol: { span: 6 } }}>
          <Formik
            enableReinitialize
            initialValues={this.state.formData}
            validationSchema={yup.object().shape({
              currency: yup.string().required(),
              salary: yup
                .number()
                .positive("Must positif number")
                .required("This field is required"),
              location: yup
                .array()
                .of(yup.string().required("This field is required")),
            })}
            onSubmit={(values, { setSubmitting }) => {
              const payload: any = { ...values };
              payload.location = values.location.join(",");
              payload.salary = Number(values.salary);

              postJobWish(payload)
                .then((res: AxiosResponse<any>) => {
                  notification.success({
                    message: "Success",
                  });
                  this.props.switchEditMode();
                })
                .catch((error) => {
                  Modal.error({
                    title: `Error`,
                    // content : error.response.data.message
                    content:
                      error.response?.data?.message || error.message || "-",
                  });
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
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldTouched,
              setFieldValue,
            }) => (
              <>
                {console.log(values)}
                <Form.Item
                  label={
                    <>
                      Montly Salary <span className="required">*</span>
                    </>
                  }
                  validateStatus={
                    errors.salary && touched.salary ? "error" : ""
                  }
                  help={errors.salary && touched.salary ? errors.salary : null}
                >
                  <Space>
                    <Select
                      value={values.currency}
                      onChange={(e) => {
                        console.log(e);
                        setFieldValue("currency", e);
                        setFieldTouched("currency");
                      }}
                    >
                      <Select.Option value={"IDR"}> IDR</Select.Option>
                      <Select.Option value={"USD"}> USD</Select.Option>
                      <Select.Option value={"AUD"}> AUD</Select.Option>
                      <Select.Option value={"MYR"}> MYR</Select.Option>
                      <Select.Option value={"SGD"}> SGD</Select.Option>
                      <Select.Option value={"PHP"}> PHP</Select.Option>
                      <Select.Option value={"INR"}> INR</Select.Option>
                      <Select.Option value={"THB"}> THB</Select.Option>
                      <Select.Option value={"HKD"}> HKD</Select.Option>
                      <Select.Option value={"EUR"}> EUR</Select.Option>
                      <Select.Option value={"CNY"}> CNY</Select.Option>
                      <Select.Option value={"JPY"}> JPY</Select.Option>
                      <Select.Option value={"GBP"}> GBP</Select.Option>
                      <Select.Option value={"VND"}> VND</Select.Option>
                      <Select.Option value={"BDT"}> BDT</Select.Option>
                      <Select.Option value={"NZD"}> NZD</Select.Option>
                    </Select>
                    <Input
                      defaultValue={values.salary}
                      value={values.salary}
                      name="salary"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Space>
                </Form.Item>
                <Form.Item
                  label={
                    <>
                      Prefered Location <span className="required">*</span>
                    </>
                  }
                  validateStatus={
                    errors.location && touched.location ? "error" : ""
                  }
                  help={
                    errors.location && touched.location
                      ? "Please fill empty field"
                      : null
                  }
                >
                  {values.location.map((val: any, index, number) => {
                    return (
                      <Row key={index} style={{ marginBottom: 15 }}>
                        <Col span={24}>
                          <Input
                            name="location"
                            value={val}
                            onChange={(e) => {
                              setFieldValue(
                                `location.${index}`,
                                e.target.value
                              );
                            }}
                            onBlur={handleBlur}
                          />
                        </Col>
                      </Row>
                    );
                  })}
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      const newLocation = [...values.location];
                      newLocation.push("");
                      setFieldValue("location", newLocation);
                    }}
                  ></Button>
                </Form.Item>
                <Form.Item
                  label="Training & Development"
                  validateStatus={
                    errors.trainingDevelopment && touched.trainingDevelopment
                      ? "error"
                      : ""
                  }
                  help={
                    errors.trainingDevelopment && touched.trainingDevelopment
                      ? errors.trainingDevelopment
                      : null
                  }
                >
                  <Input.TextArea
                    name="trainingDevelopment"
                    value={values.trainingDevelopment}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
                <Form.Item
                  label="Benefit Wish"
                  validateStatus={
                    errors.benefit && touched.benefit ? "error" : ""
                  }
                  help={
                    errors.benefit && touched.benefit ? errors.benefit : null
                  }
                >
                  <Input.TextArea
                    name="benefit"
                    value={values.benefit}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
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
