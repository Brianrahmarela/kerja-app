import { faCaretDown, faPencilAlt, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AutoComplete, Button, Card, Checkbox, Col, DatePicker, Form, Input, List, Modal, Row, Skeleton, Space, Typography } from "antd";
import { Formik } from "formik";
import * as yup from "yup";
import React from "react";
import { AxiosResponse } from "axios";
import { DefaultEditor } from "react-simple-wysiwyg";
import { getCertifications, postCertification } from "../../../../../repository/WorkerRepo";
import moment from "moment";
const { Slide } = require("react-slideshow-image");

interface AppreciationProps {}

interface AppreciationState {
    pageReady: boolean;
    showForm: boolean;
    formData: any;
    positionOptions: any[];
    certifications: any[];
}

class Appreciation extends React.Component<AppreciationProps, AppreciationState> {
    state = {
        pageReady: false,
        showForm: false,
        certifications: [] as any[],
        formData: {
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
        },
        positionOptions: [] as any[],
    };
    componentDidMount() {
        this.getData();
    }
    getData() {
        this.setState({ pageReady: false });
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
                this.setState({ certifications: ordered });
            })
            .catch((error) => {})
            .finally(() => {
                this.setState({ pageReady: true });
            });
    }
    render() {
        const { showForm, certifications } = this.state;
        return (
            <>
                <Card id="appreciation" style={{ marginTop: 20 }}>
                    <Row justify="space-between">
                        <Col span={20}>
                            <Typography.Title level={4}>Appreciation</Typography.Title>
                        </Col>
                        <Col span={4} style={{ textAlign: "right" }}>
                            <Button
                                type="text"
                                icon={<FontAwesomeIcon icon={faPencilAlt} />}
                                onClick={() => {
                                    this.setState({
                                        showForm: true,
                                    });
                                }}
                            ></Button>
                        </Col>
                    </Row>
                    <Slide slidesToShow={4}>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((value: any) => (
                            <div style={{ padding: 5 }}>
                                <Card style={{ width: "100%", padding: 0 }} bodyStyle={{ padding: 0 }}>
                                    <Row>
                                        <Col span={24}>
                                            <img src="https://images7.alphacoders.com/411/thumb-1920-411820.jpg" alt="" style={{ width: "100%" }} />
                                        </Col>
                                    </Row>
                                </Card>
                            </div>
                        ))}
                    </Slide>
                    <List
                        itemLayout="horizontal"
                        loadMore={
                            <div style={{ width: "100%", textAlign: "center", padding: 5 }}>
                                <Button type="text" size="small">
                                    Lainnya <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: 5 }} />
                                </Button>
                            </div>
                        }
                        dataSource={certifications}
                        renderItem={(item) => (
                            <List.Item>
                                <Skeleton loading={false} title={true} active={false}>
                                    <List.Item.Meta
                                        title={item.title}
                                        description={
                                            <>
                                                {moment(item.validDate).format("ll")} - {item.publisherName}{" "}
                                            </>
                                        }
                                    />
                                </Skeleton>
                            </List.Item>
                        )}
                    />
                </Card>
                {showForm && this.renderForm()}
            </>
        );
    }
    renderForm() {
        const { showForm, formData } = this.state;
        return (
            <>
                <Modal
                    visible={showForm}
                    closable={false}
                    onCancel={() => {
                        this.setState({
                            showForm: false,
                        });
                    }}
                    width={800}
                >
                    <Form {...{ wrapperCol: { span: 18 }, labelCol: { span: 6 } }}>
                        <Formik
                            initialValues={formData}
                            validationSchema={yup.object().shape({
                                institutionName: yup.string().required("This field is required"),
                                title: yup.string().required("This field is required"),
                                publisherName: yup.string().required("This field is required"),
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                postCertification(values)
                                    .then((res: AxiosResponse<any>) => {})
                                    .catch((error: any) => {
                                        Modal.error({
                                            title: `Error`,
                                            // content : error.response.data.message
                                            content: error.response?.data?.message || error.message || "-",
                                        });
                                    })
                                    .finally(() => {
                                        setSubmitting(false);
                                    });
                            }}
                        >
                            {({ values, errors, touched, setFieldTouched, setFieldValue, handleChange, handleBlur, isSubmitting, handleSubmit }) => (
                                <>
                                    <Form.Item
                                        label={
                                            <>
                                                Institution <span className="required">*</span>
                                            </>
                                        }
                                        validateStatus={errors.institutionName && touched.institutionName ? "error" : ""}
                                        help={errors.institutionName && touched.institutionName ? errors.institutionName : null}
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
                                        <Input name="title" value={values.title} onChange={handleChange} onBlur={handleBlur} />
                                    </Form.Item>
                                    <Form.Item label="Description">
                                        <Input.TextArea name="description" value={values.description} onChange={handleChange} onBlur={handleBlur}></Input.TextArea>
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
                                        <Input name="publisherName" value={values.publisherName} onChange={handleChange} onBlur={handleBlur} />
                                    </Form.Item>
                                    <Form.Item label="Publihser Phone">
                                        <Input name="publisherPhone" value={values.publisherPhone} onChange={handleChange} onBlur={handleBlur} />
                                    </Form.Item>
                                    <Form.Item label="Publisher Email">
                                        <Input name="publisherEmail" value={values.publisherEmail} onChange={handleChange} onBlur={handleBlur} />
                                    </Form.Item>
                                    <Form.Item label="Website">
                                        <Input name="website" value={values.website} onChange={handleChange} onBlur={handleBlur} />
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
                                            <Button type="primary" loading={isSubmitting} onClick={() => handleSubmit()}>
                                                <FontAwesomeIcon icon={faSave} style={{ marginRight: 5 }} />
                                                Save
                                            </Button>
                                        </Space>
                                    </Form.Item>
                                </>
                            )}
                        </Formik>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default Appreciation;
