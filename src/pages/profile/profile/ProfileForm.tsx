import { Col, DatePicker, Form, Input, Modal, Row } from "antd";
import { Formik } from "formik";
import React from "react";

export interface ProfileFormProps {}

export interface ProfileFormState {
  form: any;
}

class ProfileForm extends React.Component<ProfileFormProps, ProfileFormState> {
  state = {
    form: {
      firstName: "",
      lastName: "",
      job: "",
      dateOfBirth: undefined,
      placeOfBirth: "",
      phoneNumber: "",
      country: "",
      location: "",
      address: "",
      relationship: "",
      gender: "",
      website: "",
      email: "",
      socialMedia: "",
      religion: "",
      hobby: "",
    },
  };
  render() {
    return (
      <div className="profile-form">
        <Form layout="vertical">
          <Formik
            initialValues={this.state.form}
            onSubmit={(values, { setSubmitting }) => {
              Modal.confirm({
                title: "info!",
                content:
                  "You must re-login after change these information\n do you wish to continue?",
                onOk: () => {},
              });
            }}
          >
            {({
              errors,
              touched,
              values,
              handleChange,
              handleBlur,
              setFieldValue,
              setFieldTouched,
              handleSubmit,
              isSubmitting,
              dirty,
            }) => (
              <>
                <Row gutter={20}>
                  <Col span={12}>
                    <Form.Item
                      label="First Name"
                      validateStatus={
                        errors.firstName && touched.firstName ? "error" : ""
                      }
                      help={
                        errors.firstName && touched.firstName
                          ? errors.firstName
                          : null
                      }
                    >
                      <Input
                        name="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Last Name"
                      validateStatus={
                        errors.lastName && touched.lastName ? "error" : ""
                      }
                      help={
                        errors.lastName && touched.lastName
                          ? errors.lastName
                          : null
                      }
                    >
                      <Input
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={24}>
                    <Form.Item
                      label="Your Job Now"
                      validateStatus={errors.job && touched.job ? "error" : ""}
                      help={errors.job && touched.job ? errors.job : null}
                    >
                      <Input
                        name="job"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.job}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={12}>
                    <Form.Item
                      label="Date a Birth"
                      validateStatus={
                        errors.dateOfBirth && touched.dateOfBirth ? "error" : ""
                      }
                      help={
                        errors.dateOfBirth && touched.dateOfBirth
                          ? errors.dateOfBirth
                          : null
                      }
                    >
                      <DatePicker
                        picker="month"
                        format="MMM-YYYY"
                        placeholder="Start Date"
                        style={{ width: "100%" }}
                        onChange={(e) => {
                          setFieldValue("joinDate", e);
                          setFieldTouched("joinDate", true);
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Place of Birth"
                      validateStatus={
                        errors.placeOfBirth && touched.placeOfBirth
                          ? "error"
                          : ""
                      }
                      help={
                        errors.placeOfBirth && touched.placeOfBirth
                          ? errors.placeOfBirth
                          : null
                      }
                    >
                      <Input
                        name="placeOfBirth"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.placeOfBirth}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={24}>
                    <Form.Item
                      label="Address"
                      validateStatus={
                        errors.address && touched.address ? "error" : ""
                      }
                      help={
                        errors.address && touched.address
                          ? errors.address
                          : null
                      }
                    >
                      <Input
                        name="address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={12}>
                    <Form.Item
                      label="Country"
                      validateStatus={
                        errors.country && touched.country ? "error" : ""
                      }
                      help={
                        errors.country && touched.country
                          ? errors.country
                          : null
                      }
                    >
                      <Input
                        name="country"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.country}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Location"
                      validateStatus={
                        errors.placeOfBirth && touched.placeOfBirth
                          ? "error"
                          : ""
                      }
                      help={
                        errors.placeOfBirth && touched.placeOfBirth
                          ? errors.placeOfBirth
                          : null
                      }
                    >
                      <Input
                        name="placeOfBirth"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.placeOfBirth}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={24}>
                    <Form.Item
                      label="Telephone"
                      validateStatus={
                        errors.phoneNumber && touched.phoneNumber ? "error" : ""
                      }
                      help={
                        errors.phoneNumber && touched.phoneNumber
                          ? errors.phoneNumber
                          : null
                      }
                    >
                      <Input
                        name="phoneNumber"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phoneNumber}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={12}>
                    <Form.Item
                      label="Relationship Status"
                      validateStatus={
                        errors.country && touched.country ? "error" : ""
                      }
                      help={
                        errors.country && touched.country
                          ? errors.country
                          : null
                      }
                    >
                      <Input
                        name="country"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.country}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Gender"
                      validateStatus={
                        errors.placeOfBirth && touched.placeOfBirth
                          ? "error"
                          : ""
                      }
                      help={
                        errors.placeOfBirth && touched.placeOfBirth
                          ? errors.placeOfBirth
                          : null
                      }
                    >
                      <Input
                        name="placeOfBirth"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.placeOfBirth}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={24}>
                    <Form.Item
                      label="Website Link"
                      validateStatus={
                        errors.phoneNumber && touched.phoneNumber ? "error" : ""
                      }
                      help={
                        errors.phoneNumber && touched.phoneNumber
                          ? errors.phoneNumber
                          : null
                      }
                    >
                      <Input
                        name="phoneNumber"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phoneNumber}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={24}>
                    <Form.Item
                      label="E-mail Link"
                      validateStatus={
                        errors.phoneNumber && touched.phoneNumber ? "error" : ""
                      }
                      help={
                        errors.phoneNumber && touched.phoneNumber
                          ? errors.phoneNumber
                          : null
                      }
                    >
                      <Input
                        name="phoneNumber"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phoneNumber}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={24}>
                    <Form.Item
                      label="Social Media Link"
                      validateStatus={
                        errors.phoneNumber && touched.phoneNumber ? "error" : ""
                      }
                      help={
                        errors.phoneNumber && touched.phoneNumber
                          ? errors.phoneNumber
                          : null
                      }
                    >
                      <Input
                        name="phoneNumber"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phoneNumber}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={24}>
                    <Form.Item
                      label="Religion"
                      validateStatus={
                        errors.phoneNumber && touched.phoneNumber ? "error" : ""
                      }
                      help={
                        errors.phoneNumber && touched.phoneNumber
                          ? errors.phoneNumber
                          : null
                      }
                    >
                      <Input
                        name="phoneNumber"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phoneNumber}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20}>
                  <Col span={24}>
                    <Form.Item
                      label="Interest / Hobby"
                      validateStatus={
                        errors.phoneNumber && touched.phoneNumber ? "error" : ""
                      }
                      help={
                        errors.phoneNumber && touched.phoneNumber
                          ? errors.phoneNumber
                          : null
                      }
                    >
                      <Input
                        name="phoneNumber"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phoneNumber}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}
          </Formik>
        </Form>
      </div>
    );
  }
}

export default ProfileForm;
