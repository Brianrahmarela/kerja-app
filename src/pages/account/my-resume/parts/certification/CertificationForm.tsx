import { Component } from "react";
import {
  Divider,
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  AutoComplete,
  Space,
  Button,
  Modal,
} from "antd";
import { DefaultEditor } from "react-simple-wysiwyg";
import { Formik } from "formik";
import * as yup from "yup";
import {
  getCertifications,
  postCertification,
} from "../../../../../repository/WorkerRepo";
import { AxiosResponse } from "axios";
import moment from "moment";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
interface IProps {
  data: any;
  closeForm: () => void;
  setCertifications?: (x: any) => void;
}
interface IState {
  positionOptions: any[];
}
class CertificationForm extends Component<IProps, IState> {
  state = {
    positionOptions: [],
  };
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
        this.props.setCertifications?.(ordered);
      })
      .catch((error) => {});
  }
  render() {
    return (
      <div>
        <Divider />
        <Form {...{ wrapperCol: { span: 18 }, labelCol: { span: 6 } }}>
          <Formik
            initialValues={this.props.data}
            validationSchema={yup.object().shape({
              institutionName: yup.string().required("This field is required"),
              title: yup.string().required("This field is required"),
              publisherName: yup.string().required("This field is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              postCertification(values)
                .then((res: AxiosResponse<any>) => {
                  this.reloadCertification();
                  this.props.closeForm();
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
              setFieldTouched,
              setFieldValue,
              handleChange,
              handleBlur,
              isSubmitting,
              handleSubmit,
            }) => (
              <>
                <Form.Item
                  label={
                    <>
                      Institution <span className="required">*</span>
                    </>
                  }
                  validateStatus={
                    errors.institutionName && touched.institutionName
                      ? "error"
                      : ""
                  }
                  help={
                    errors.institutionName && touched.institutionName
                      ? errors.institutionName
                      : null
                  }
                >
                  <AutoComplete
                    defaultValue={values.institutionName}
                    onSearch={(e) => {
                      // getInstitutionName(e).then((res: AxiosResponse<any>) => {
                      //   this.setState({ positionOptions: res.data });
                      // });
                    }}
                    onSelect={(e) => {
                      setFieldValue("institutionName", e);
                      setFieldTouched("institutionName", true);
                    }}
                    onChange={(e) => {
                      setFieldValue("institutionName", e);
                      setFieldTouched("institutionName", true);
                    }}
                  >
                    {this.state.positionOptions.map((val: string) => (
                      <AutoComplete.Option key={val} value={val}>
                        {val}
                      </AutoComplete.Option>
                    ))}
                  </AutoComplete>
                </Form.Item>
                <Form.Item
                  label={
                    <>
                      Title<span className="required">*</span>
                    </>
                  }
                  validateStatus={errors.title && touched.title ? "error" : ""}
                  help={errors.title && touched.title ? errors.title : null}
                >
                  <Input
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
                <Form.Item label="Description">
                  <Input.TextArea
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></Input.TextArea>
                </Form.Item>
                <Form.Item
                  label={
                    <>
                      Publiser Name<span className="required">*</span>
                    </>
                  }
                  validateStatus={errors.title && touched.title ? "error" : ""}
                  help={errors.title && touched.title ? errors.title : null}
                >
                  <Input
                    name="publisherName"
                    value={values.publisherName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
                <Form.Item label="Publihser Phone">
                  <Input
                    name="publisherPhone"
                    value={values.publisherPhone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
                <Form.Item label="Publisher Email">
                  <Input
                    name="publisherEmail"
                    value={values.publisherEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
                <Form.Item label="Website">
                  <Input
                    name="website"
                    value={values.website}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
                <Form.Item label="Certificate Valid Date">
                  <Row gutter={15} align="middle">
                    <Col>
                      <DatePicker
                        name="validDate"
                        onChange={(e) => {
                          setFieldValue("validDate", e);
                          setFieldTouched("validDate", true);
                        }}
                      ></DatePicker>
                    </Col>
                    <Col>
                      <DatePicker
                        name="expiredDate"
                        onChange={(e) => {
                          setFieldValue("expiredDate", e);
                          setFieldTouched("expiredDate", true);
                        }}
                      ></DatePicker>
                    </Col>
                    <Col>
                      <Checkbox
                        onChange={(e) => {
                          setFieldValue("neverExpired", e.target.checked);
                          setFieldTouched("neverExpired", true);
                        }}
                      >
                        Never Expired
                      </Checkbox>
                    </Col>
                  </Row>
                </Form.Item>

                <Form.Item label="Additional Information">
                  <DefaultEditor
                    value={values.additionalInfo}
                    style={{ height: 300 }}
                    onChange={(e) => {
                      const { target }: any = e;
                      console.log(e);
                      setFieldValue(`additionalInfo`, target.value);
                      setFieldTouched(`additionalInfo`, true);
                    }}
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
                      onClick={() => this.props.closeForm()}
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
)(withTranslation()(CertificationForm));
