import React, { Component } from 'react'
import { withTranslation } from "react-i18next";
import SvgEmailSettings from '../../../../assets/svg/email-settings.svg';
import SvgDone from '../../../../assets/svg/done-icon.svg';
import { Button, Form, Input, Row, Typography, Col, Modal, Space } from "antd";
import { Formik } from "formik";

export interface EmailAlertSettingsProps {
  t: (x: any) => any;
}
export interface EmailAlertSettingsState {
  form: any;
  visible: boolean;
}
const { Text, Paragraph } = Typography;

export class EmailAlertSettings extends Component<EmailAlertSettingsProps, EmailAlertSettingsState>  {

  state: EmailAlertSettingsState = {
    form: {
      emailVal: "",

    },
    visible: false,
  };
  handleChange = (e: any) => {
    console.log('onChange', e.target.value);
  };
  setVisible(arg: boolean) {
    console.log(arg);
    this.setState({ visible: arg });
  }

  render() {
    return (
      <div className="email-alert-settings">
        <Row justify="center">
          <Col>

            <Row justify="center" >
              <img src={SvgEmailSettings} alt="svgemailsettings" className="emailIcon"
              />
            </Row>
            <Row justify="center" className="marginParagraph">
              <Col span={16}>
                <Paragraph style={{ textAlign: "center", color: "#53575E", fontFamily: "Open Sans" }}>The newest Job information relevant to your filter will be sent to your email, <Text className="textEmail">sheilayuli@kerjaapp.com.</Text> Want to change your e-mail for this notification? Ignore this if you don't want to change it</Paragraph>
              </Col>
            </Row>
            <Row justify="center">
              <Col span={16}>

                <Form >
                  <Formik
                    initialValues={this.state.form}
                    onSubmit={
                      (values) => {
                        console.log('For data', values);
                        // this.setState(
                        //   {
                        //     form: {
                        //       ...this.state.form,
                        //       ...values,
                        //     },
                        //   }
                        // );
                      }
                    }
                  >
                    {({ values, handleSubmit }) => (
                      <>
                        <Form.Item>
                          <Input type="email" value={values.email} name="email" onChange={this.handleChange} placeholder="Type your e-mail" />
                        </Form.Item>
                        <Form.Item style={{ textAlign: "center" }}>
                          {/* <Button type="primary" onClick={() => handleSubmit()} className="savebtn">
                            Save e-mail
                          </Button> */}
                          <Button type="primary" onClick={() => this.setVisible(true)} className="savebtn">
                            Save e-mail
                          </Button>
                          <Modal
                            // title="Modal 1000px width"
                            centered
                            visible={this.state.visible}
                            onOk={() => this.setVisible(false)}
                            onCancel={() => this.setVisible(false)}
                            width={622}
                            footer={null}
                            style={{ backgroundColor: "none" }}
                          // bodyStyle={{ borderRadius: 200, backgroundColor: "crimson", }}
                          >
                            <Row justify="center" style={{ margin: '35px 0px' }} >
                              <Col xs={0} md={24}>
                                <Row justify="center">
                                  <Space size={20} direction="vertical" style={{
                                    textAlign: "center", fontSize: 23, fontFamily: "Open Sans", fontWeight: 600, color: "#639164",
                                  }} >
                                    <Row justify="center">
                                      <img src={SvgDone} alt="svgemailsettings"
                                      />
                                    </Row>
                                    <Row>
                                      Successfully Saved Your Email
                                    </Row>
                                  </Space>
                                </Row>
                              </Col>
                              <Col xs={24} md={0}>
                                <Row justify="center">
                                  <Space size={20} direction="vertical" style={{
                                    textAlign: "center", fontSize: 17, fontFamily: "Open Sans", fontWeight: 600, color: "#639164",
                                  }} >
                                    <Row justify="center">
                                      <img src={SvgDone} alt="svgemailsettings"
                                      />
                                    </Row>
                                    <Row>
                                      Successfully Saved Your Email
                                    </Row>
                                  </Space>
                                </Row>
                              </Col>
                            </Row>


                          </Modal>
                        </Form.Item>
                      </>
                    )}

                  </Formik>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>


      </div>
    )
  }
}

export default withTranslation()(EmailAlertSettings);

