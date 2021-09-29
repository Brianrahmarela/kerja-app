import { faCaretDown, faMapMarkerAlt, faPencilAlt, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AutoComplete, Avatar, Button, Card, Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select, Skeleton, Space, Timeline, Typography } from "antd";
import { Formik } from "formik";
import React from "react";
import { getExperiences, getPositionTitles, postExperience } from "../../../../../repository/WorkerRepo";
import * as yup from "yup";
import moment from "moment";
import { AxiosResponse } from "axios";
import { specifications } from "../../../../../assets/data/specifications";
import { countries } from "../../../../../assets/data/countries";
import { industries } from "../../../../../assets/data/industries";
import { positionLevels } from "../../../../../assets/data/position-level";
import { DefaultEditor } from "react-simple-wysiwyg";

interface ExperienceProps {}

interface ExperienceState {
    showForm: boolean;
    pageReady: boolean;
    formData: any;
    positionOptions: any[];
    experiences: any[];
}

class Experience extends React.Component<ExperienceProps, ExperienceState> {
    state = {
        showForm: false,
        pageReady: false,
        formData: {
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
        },
        positionOptions: [] as any[],
        experiences: [] as any[],
    };
    componentDidMount() {
        this.getData();
    }
    getData() {
        this.setState({ pageReady: false });
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
                this.setState({
                    experiences: ordered,
                });
            })
            .catch((error) => {})
            .finally(() => {
                this.setState({ pageReady: true });
            });
    }
    render() {
        const { showForm, experiences, pageReady } = this.state;
        return (
            <>
                <Card id="experience" style={{ marginTop: 20 }}>
                    <Row justify="space-between">
                        <Col span={20}>
                            <Typography.Title level={4}>Experience</Typography.Title>
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
                    <Skeleton active loading={pageReady === false} title>
                        <Timeline style={{ marginTop: 20 }}>
                            {experiences.map((v: any, i: number) => (
                                <Timeline.Item dot={<Avatar size={35} src={""} />}>
                                    <div style={{ paddingLeft: 20 }}>
                                        <Space>
                                            <Typography.Text strong>{v.positionTitle}</Typography.Text>
                                            <Typography.Text> 1 thn, 6 bulan</Typography.Text>
                                        </Space>
                                        <Space>
                                            <Typography.Text>{v.organizationName}</Typography.Text>|<Typography.Text>Full time</Typography.Text>|
                                            <Typography.Text>
                                                {moment(v.joinDate).format("MMM YYYY")} - {(v.isPresent && "Present") || moment(v.endDate).format("MMM YYYY")}
                                            </Typography.Text>
                                            |
                                            <Typography.Text>
                                                {v.currency} {v.monthlySalary} / month
                                            </Typography.Text>
                                        </Space>
                                        <Space>
                                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                                            <Typography.Text> {v.country}</Typography.Text> |<Typography.Text>{v.specializationName}</Typography.Text>
                                        </Space>
                                    </div>
                                </Timeline.Item>
                            ))}
                        </Timeline>
                        {experiences.length > 5 && (
                            <div style={{ width: "100%", textAlign: "center", padding: 5 }}>
                                <Button type="text" size="small">
                                    Lainnya <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: 5 }} />
                                </Button>
                            </div>
                        )}
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
                                positionTitle: yup.string().required("Field is required").nullable(),
                                organizationName: yup.string().required("Field is required").nullable(),
                                joinDate: yup.mixed().required("Field is required"),
                                endDate: yup.mixed().when("present", {
                                    is: false,
                                    then: yup
                                        .mixed()
                                        .required()
                                        .when(["joinDate", "endDate", "present"], {
                                            is: (joinDate: any, endDate: any) => {
                                                console.log(moment(joinDate).isAfter(moment(endDate)));
                                                return moment(joinDate).isAfter(moment(endDate));
                                            },

                                            then: yup.mixed().test("invalid", "Must bigger than", () => false),
                                        }),
                                }),
                                specializationName: yup.mixed().required("Field is required"),
                                jobRoleName: yup.mixed().required("Field is required"),
                                industry: yup.mixed().required("Field is required"),
                                positionLevel: yup.mixed().required("Field is required"),
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                values.monthlySalary = Number(values.monthlySalary);
                                postExperience(values)
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
                            {({ values, errors, touched, setFieldTouched, setFieldValue, isSubmitting, handleSubmit, handleBlur, handleChange }) => (
                                <>
                                    {console.log(errors)}
                                    <Form.Item
                                        label={
                                            <>
                                                Position Title <span className="required">*</span>
                                            </>
                                        }
                                        validateStatus={errors.positionTitle && touched.positionTitle ? "error" : ""}
                                        help={errors.positionTitle && touched.positionTitle ? errors.positionTitle : null}
                                    >
                                        <AutoComplete
                                            defaultValue={values.positionTitle}
                                            onSearch={(e) => {
                                                getPositionTitles(e).then((res: AxiosResponse<any>) => {
                                                    this.setState({ positionOptions: res.data });
                                                });
                                            }}
                                            onSelect={(e) => {
                                                setFieldValue("positionTitle", e);
                                                setFieldTouched("positionTitle", true);
                                            }}
                                            onChange={(e) => {
                                                setFieldValue("positionTitle", e);
                                                setFieldTouched("positionTitle", true);
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
                                                Company Name <span className="required">*</span>
                                            </>
                                        }
                                        validateStatus={errors.organizationName && touched.organizationName ? "error" : ""}
                                        help={errors.organizationName && touched.organizationName ? errors.organizationName : null}
                                    >
                                        <AutoComplete
                                            defaultValue={values.organizationName}
                                            onSearch={(e) => {
                                                getPositionTitles(e).then((res: AxiosResponse<any>) => {
                                                    this.setState({ positionOptions: res.data });
                                                });
                                            }}
                                            onSelect={(e) => {
                                                setFieldValue("organizationName", e);
                                                setFieldTouched("organizationName", true);
                                            }}
                                            onChange={(e) => {
                                                setFieldValue("organizationName", e);
                                                setFieldTouched("organizationName", true);
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
                                                Joined Duration <span className="required">*</span>
                                            </>
                                        }
                                        validateStatus={(errors.joinDate && touched.joinDate) || errors.endDate ? "error" : ""}
                                        help={(errors.joinDate && touched.joinDate) || errors.endDate ? "This field is required" : null}
                                    >
                                        <Row gutter={10} justify={"start"} align="middle">
                                            <Col>
                                                <DatePicker
                                                    picker="month"
                                                    format="MMM-YYYY"
                                                    value={values.joinDate ? moment(values.joinDate) : undefined}
                                                    placeholder="Start Date"
                                                    onChange={(e) => {
                                                        setFieldValue("joinDate", e);
                                                        setFieldTouched("joinDate", true);
                                                    }}
                                                />
                                            </Col>
                                            <Col>
                                                <DatePicker
                                                    disabled={values.present}
                                                    format="MMM-YYYY"
                                                    picker="month"
                                                    value={values.endDate ? moment(values.endDate) : undefined}
                                                    placeholder="End Date"
                                                    onChange={(e) => {
                                                        setFieldValue("endDate", e);
                                                        setFieldTouched("endDate", true);
                                                    }}
                                                />
                                            </Col>
                                            <Col>
                                                <Checkbox
                                                    defaultChecked={values.present}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setFieldValue("endDate", undefined);
                                                        }

                                                        setFieldValue("present", e.target.checked);
                                                        setFieldTouched("present", true);
                                                    }}
                                                >
                                                    Present
                                                </Checkbox>
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                    <Form.Item
                                        label={
                                            <>
                                                Specialization <span className="required">*</span>
                                            </>
                                        }
                                        validateStatus={errors.specializationName && touched.specializationName ? "error" : ""}
                                        help={errors.specializationName && touched.specializationName ? errors.specializationName : null}
                                    >
                                        <Select
                                            showSearch
                                            defaultValue={values.specializationName}
                                            value={values.specializationName}
                                            style={{ width: "100%" }}
                                            onChange={(e: any) => {
                                                setFieldValue("specializationName", e);
                                                setFieldTouched("specializationName");
                                            }}
                                            filterOption={(input, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Select.Option value="">--:OPTION:--</Select.Option>
                                            {specifications.map((val: any) => (
                                                <Select.Option key={val.label} value={val.label}>
                                                    {val.label}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label={
                                            <>
                                                Role <span className="required">*</span>
                                            </>
                                        }
                                        validateStatus={errors.jobRoleName && touched.jobRoleName ? "error" : ""}
                                        help={errors.jobRoleName && touched.jobRoleName ? errors.jobRoleName : null}
                                    >
                                        <Select
                                            showSearch
                                            defaultValue={values.jobRoleName}
                                            value={values.jobRoleName}
                                            style={{ width: "100%" }}
                                            onChange={(e: any) => {
                                                setFieldValue("jobRoleName", e);
                                                setFieldTouched("jobRoleName");
                                            }}
                                            filterOption={(input, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Select.Option value="">--:OPTION:--</Select.Option>
                                            {specifications
                                                .find((e: any) => e.label === values.specializationName)
                                                ?.options.map((val: string) => (
                                                    <Select.Option key={val.toUpperCase()} value={val.toUpperCase()}>
                                                        {val}
                                                    </Select.Option>
                                                ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="Country" validateStatus={errors.country && touched.country ? "error" : ""} help={errors.country && touched.country ? errors.country : null}>
                                        <Select
                                            showSearch
                                            defaultValue={values.country}
                                            value={values.country}
                                            style={{ width: "100%" }}
                                            onChange={(e: any) => {
                                                setFieldValue("country", e);
                                                setFieldTouched("country");
                                            }}
                                            filterOption={(input, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Select.Option value="">--:OPTION:--</Select.Option>
                                            {countries.map((val: string) => (
                                                <Select.Option key={val.toUpperCase()} value={val.toUpperCase()}>
                                                    {val}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label={
                                            <>
                                                Industry <span className="required">*</span>
                                            </>
                                        }
                                        validateStatus={errors.industry && touched.industry ? "error" : ""}
                                        help={errors.industry && touched.industry ? errors.industry : null}
                                    >
                                        <Select
                                            showSearch
                                            defaultValue={values.industry}
                                            value={values.industry}
                                            style={{ width: "100%" }}
                                            onChange={(e: any) => {
                                                setFieldValue("industry", e);
                                                setFieldTouched("industry");
                                            }}
                                            filterOption={(input, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Select.Option value="">--:OPTION:--</Select.Option>
                                            {industries.map((val: string) => (
                                                <Select.Option key={val.toUpperCase()} value={val.toUpperCase()}>
                                                    {val}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label={
                                            <>
                                                Position Level <span className="required">*</span>
                                            </>
                                        }
                                        validateStatus={errors.positionLevel && touched.positionLevel ? "error" : ""}
                                        help={errors.positionLevel && touched.positionLevel ? errors.positionLevel : null}
                                    >
                                        <Select
                                            showSearch
                                            defaultValue={values.positionLevel}
                                            value={values.positionLevel}
                                            style={{ width: "100%" }}
                                            onChange={(e: any) => {
                                                setFieldValue("positionLevel", e);
                                                setFieldTouched("positionLevel");
                                            }}
                                            filterOption={(input, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Select.Option value="">--:OPTION:--</Select.Option>
                                            {positionLevels.map((val: string) => (
                                                <Select.Option key={val.toUpperCase()} value={val.toUpperCase()}>
                                                    {val}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label="Montly Salary"
                                        validateStatus={errors.monthlySalary && touched.monthlySalary ? "error" : ""}
                                        help={errors.monthlySalary && touched.monthlySalary ? errors.monthlySalary : null}
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
                                            <Input defaultValue={values.monthlySalary} name="monthlySalary" onChange={handleChange} onBlur={handleBlur} />
                                        </Space>
                                    </Form.Item>
                                    <Form.Item label="Job Description">
                                        <DefaultEditor
                                            value={values.jobDescription}
                                            style={{ height: 300 }}
                                            onChange={(e) => {
                                                const { target }: any = e;
                                                console.log(e);
                                                setFieldValue(`jobDescription`, target.value);
                                                setFieldTouched(`jobDescription`, true);
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

export default Experience;
