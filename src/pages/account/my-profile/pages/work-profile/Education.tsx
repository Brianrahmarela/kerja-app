import { faCaretDown, faMapMarkerAlt, faPencilAlt, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AutoComplete, Avatar, Button, Card, Col, DatePicker, Form, Input, InputNumber, List, Modal, Row, Select, Skeleton, Space, Typography } from "antd";
import { Formik } from "formik";
import moment from "moment";
import React from "react";
import { DefaultEditor } from "react-simple-wysiwyg";
import { getEducations, postEducation } from "../../../../../repository/WorkerRepo";
import * as yup from "yup";
import { AxiosResponse } from "axios";
import { qualifications } from "../../../../../assets/data/qualification";
import { countries } from "../../../../../assets/data/countries";
import { grades } from "../../../../../assets/data/grades";
import { fieldOfStudies } from "../../../../../assets/data/field-of-study";

interface EducationProps {}

interface EducationState {
    pageReady: boolean;
    showForm: boolean;
    formData: any;
    positionOptions: any[];
    educations: any[];
}

class Education extends React.Component<EducationProps, EducationState> {
    state = {
        pageReady: false,
        showForm: false,
        formData: {
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
        },
        positionOptions: [] as any[],
        educations: [] as any[],
    };
    componentDidMount() {
        this.getData();
    }
    getData() {
        this.setState({ pageReady: false });
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
                this.setState({ educations: ordered });
            })
            .catch((error) => {})
            .finally(() => {
                this.setState({ pageReady: true });
            });
    }
    render() {
        const { showForm, educations, pageReady } = this.state;
        return (
            <>
                <Card id="education" style={{ marginTop: 20 }}>
                    <Row justify="space-between">
                        <Col span={20}>
                            <Typography.Title level={4}>Education</Typography.Title>
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

                    <Skeleton active loading={pageReady == false} title>
                        <List
                            itemLayout="horizontal"
                            loadMore={
                                <div style={{ width: "100%", textAlign: "center", padding: 5 }}>
                                    <Button type="text" size="small">
                                        Lainnya <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: 5 }} />
                                    </Button>
                                </div>
                            }
                            dataSource={educations}
                            renderItem={(item: any, i: number) => (
                                <List.Item key={i} style={{ width: "100%" }}>
                                    <Row style={{ width: "100%" }}>
                                        <Col span={3}>
                                            <Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        </Col>
                                        <Col span={21}>
                                            <div>
                                                <Space>
                                                    <Typography.Text strong>{item.instituteName}</Typography.Text>
                                                    <Typography.Text> {moment(item.graduationDate).format("ll")} </Typography.Text>
                                                </Space>
                                            </div>
                                            <div>
                                                <Space>
                                                    <Typography.Text>{item.qualification}</Typography.Text>|<Typography.Text>{item.major}</Typography.Text>
                                                </Space>
                                            </div>
                                            <Typography.Text>{item.score} / 4.00</Typography.Text>
                                            <div>
                                                <Space>
                                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                                    <Typography.Text> {item.location} </Typography.Text>
                                                </Space>
                                            </div>
                                        </Col>
                                    </Row>
                                </List.Item>
                            )}
                        />
                    </Skeleton>
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
                                instituteName: yup.string().required("This field is required"),
                                graduationDate: yup.string().required("This field is required"),
                                qualification: yup.string().required("This field is required"),
                                location: yup.string().required("This field is required"),
                                fieldOfStudy: yup.string().required("This field is required"),
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                console.log(values);
                                postEducation(values)
                                    .then((res: AxiosResponse<any>) => {})
                                    .catch((error) => {
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
                            {({ values, errors, touched, setFieldTouched, setFieldValue, isSubmitting, handleSubmit, handleBlur, handleChange }) => (
                                <>
                                    <Form.Item
                                        label={
                                            <>
                                                Institution/University <span className="required">*</span>
                                            </>
                                        }
                                        validateStatus={errors.instituteName && touched.instituteName ? "error" : ""}
                                        help={errors.instituteName && touched.instituteName ? errors.instituteName : null}
                                    >
                                        <AutoComplete
                                            defaultValue={values.instituteName}
                                            onSearch={(e) => {
                                                // getPositionTitles(e).then((res: AxiosResponse<any>) => {
                                                //   this.setState({ positionOptions: res.data });
                                                // });
                                            }}
                                            onSelect={(e) => {
                                                setFieldValue("instituteName", e);
                                                setFieldTouched("instituteName", true);
                                            }}
                                            onChange={(e) => {
                                                setFieldValue("instituteName", e);
                                                setFieldTouched("instituteName", true);
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
                                                Graduation Date <span className="required">*</span>
                                            </>
                                        }
                                        validateStatus={errors.graduationDate && touched.graduationDate ? "error" : ""}
                                        help={errors.graduationDate && touched.graduationDate ? errors.graduationDate : null}
                                    >
                                        <DatePicker
                                            picker="month"
                                            value={(values.graduationDate && moment(values.graduationDate)) || undefined}
                                            onChange={(e) => {
                                                setFieldValue("graduationDate", moment(e));
                                                setFieldTouched("graduationDate", true);
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label={
                                            <>
                                                Qualification <span className="required">*</span>
                                            </>
                                        }
                                        validateStatus={errors.qualification && touched.qualification ? "error" : ""}
                                        help={errors.qualification && touched.qualification ? errors.qualification : null}
                                    >
                                        <Select
                                            showSearch
                                            defaultValue={values.qualification}
                                            value={values.qualification}
                                            style={{ width: "100%" }}
                                            onChange={(e: any) => {
                                                setFieldValue("qualification", e);
                                                setFieldTouched("qualification");
                                            }}
                                            filterOption={(input, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Select.Option value="">--:OPTION:--</Select.Option>
                                            {qualifications.map((val: any) => (
                                                <Select.Option key={val} value={val}>
                                                    {val}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label={
                                            <>
                                                Location <span className="required">*</span>
                                            </>
                                        }
                                        validateStatus={errors.location && touched.location ? "error" : ""}
                                        help={errors.location && touched.location ? errors.location : null}
                                    >
                                        <Select
                                            showSearch
                                            defaultValue={values.location}
                                            value={values.location}
                                            style={{ width: "100%" }}
                                            onChange={(e: any) => {
                                                setFieldValue("location", e);
                                                setFieldTouched("location");
                                            }}
                                            filterOption={(input, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Select.Option value="">--:OPTION:--</Select.Option>
                                            {countries.map((val: any) => (
                                                <Select.Option key={val} value={val}>
                                                    {val}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label={
                                            <>
                                                Field of Study <span className="required">*</span>
                                            </>
                                        }
                                        validateStatus={errors.fieldOfStudy && touched.fieldOfStudy ? "error" : ""}
                                        help={errors.fieldOfStudy && touched.fieldOfStudy ? errors.fieldOfStudy : null}
                                    >
                                        <Select
                                            showSearch
                                            defaultValue={values.fieldOfStudy}
                                            value={values.fieldOfStudy}
                                            style={{ width: "100%" }}
                                            onChange={(e: any) => {
                                                setFieldValue("fieldOfStudy", e);
                                                setFieldTouched("fieldOfStudy");
                                            }}
                                            filterOption={(input, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Select.Option value="">--:OPTION:--</Select.Option>
                                            {fieldOfStudies.map((val: any) => (
                                                <Select.Option key={val} value={val}>
                                                    {val}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="Major">
                                        <Input value={values.major} name="major" onChange={handleChange} onBlur={handleBlur} />
                                    </Form.Item>
                                    <Form.Item label="Grade">
                                        <Select
                                            showSearch
                                            defaultValue={values.grade}
                                            value={values.grade}
                                            style={{ width: "100%" }}
                                            onChange={(e: any) => {
                                                setFieldValue("grade", e);
                                                setFieldTouched("grade");
                                            }}
                                            filterOption={(input, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Select.Option value="">--:OPTION:--</Select.Option>
                                            {grades.map((val: any) => (
                                                <Select.Option key={val} value={val}>
                                                    {val}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="Score">
                                        <InputNumber
                                            step="0.1"
                                            max={4}
                                            min={0}
                                            name="score"
                                            value={values.score}
                                            defaultValue={values.score}
                                            onChange={(e) => {
                                                setFieldValue("score", e);
                                                setFieldTouched("score");
                                            }}
                                        />
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

export default Education;
