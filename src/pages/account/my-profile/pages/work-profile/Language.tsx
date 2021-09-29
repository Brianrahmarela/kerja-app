import { faPencilAlt, faPlusSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AutoComplete, Avatar, Button, Card, Checkbox, Col, Form, InputNumber, Modal, Rate, Row, Skeleton, Typography } from "antd";
import { AxiosResponse } from "axios";
import { Formik } from "formik";
import React from "react";
import { getLanguages, postLanguage } from "../../../../../repository/WorkerRepo";
import * as yup from "yup";

interface LanguageProps {}

interface LanguageState {
    pageReady: boolean;
    showForm: boolean;
    languages: any[];
    formData: any[];
    languageOptions: any[];
}

class Language extends React.Component<LanguageProps, LanguageState> {
    state = {
        pageReady: false,
        showForm: false,
        languages: [] as any[],
        languageOptions: [] as any[],
        formData: [
            {
                language: "",
                spokenRate: 0,
                writtenRate: 0,
                primaryLang: false,
            },
        ],
    };
    componentDidMount() {
        this.getData();
    }
    getData() {
        this.setState({
            pageReady: false,
        });
        getLanguages()
            .then((res: AxiosResponse<any>) => {
                this.setState({
                    formData: res.data,
                    languages: res.data,
                });
            })
            .catch((error) => {})
            .finally(() => {
                this.setState({
                    pageReady: true,
                });
            });
    }
    render() {
        const { showForm, pageReady } = this.state;
        return (
            <>
                <Card id="skill" style={{ marginTop: 20 }}>
                    <Row justify="space-between">
                        <Col span={20}>
                            <Typography.Title level={4}>Languages</Typography.Title>
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
                    <Row gutter={[20, 20]}>
                        <Col span={24}>
                            <Skeleton active loading={pageReady === false} avatar title>
                                {this.state.languages.map((lang: any, index: number) => {
                                    return (
                                        <div key={index} className={index % 2 === 0 ? "even" : "odd"} style={{ padding: 15 }}>
                                            <Typography.Title level={4}>
                                                <Avatar src="https://lipis.github.io/flag-icon-css/flags/4x3/id.svg" /> {lang.language} {lang.primary && `(PRIMARY)`}
                                            </Typography.Title>
                                            <Typography.Paragraph>
                                                Spoken: <Rate allowHalf value={lang.spokenRate / 2} disabled /> <span className="ant-rate-text">{lang.spokenRate}</span>
                                            </Typography.Paragraph>
                                            <Typography.Paragraph>
                                                Written : <Rate allowHalf value={lang.writtenRate / 2} disabled /> <span className="ant-rate-text">{lang.writtenRate}</span>
                                            </Typography.Paragraph>
                                        </div>
                                    );
                                })}
                            </Skeleton>
                        </Col>
                    </Row>
                </Card>
                {showForm && this.renderForm()}
            </>
        );
    }
    renderForm() {
        const { showForm, formData } = this.state;
        return (
            <>
                <Form layout="vertical">
                    <Formik
                        enableReinitialize
                        initialValues={formData}
                        validationSchema={yup.array().of(
                            yup.object().shape({
                                language: yup.string().required("This field is required"),
                                spokenRate: yup.number().positive("Must positif number").max(10, "Max 10").required("This field is required"),
                                writtenRate: yup.number().positive("Must positif number").max(10, "Max 10").required("This field is required"),
                            })
                        )}
                        onSubmit={(values, { setSubmitting }) => {
                            postLanguage(values)
                                .then((res: AxiosResponse<any>) => {
                                    this.setState({
                                        showForm: false,
                                    });
                                    this.getData();
                                })
                                .finally(() => {
                                    setSubmitting(false);
                                });
                        }}
                    >
                        {({ errors, touched, values, handleChange, handleBlur, setFieldValue, setFieldTouched, handleSubmit, isSubmitting, dirty }) => (
                            <>
                                <Modal
                                    visible={showForm}
                                    title="Your language skill"
                                    onCancel={() => {
                                        this.setState({
                                            showForm: false,
                                        });
                                    }}
                                    okText="Save"
                                    onOk={() => handleSubmit()}
                                    width={800}
                                >
                                    <Row style={{ marginBottom: 15 }}>
                                        <Col>
                                            <Button
                                                type="primary"
                                                icon={<FontAwesomeIcon icon={faPlusSquare} style={{ marginRight: 5 }} />}
                                                onClick={() => {
                                                    const languages = [...values];
                                                    languages.push({
                                                        language: "",
                                                        spokenRate: 0,
                                                        writtenRate: 0,
                                                        primaryLang: false,
                                                    });
                                                    this.setState({ formData: languages });
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
                                                (errors[index]?.spokenRate && touched[index]?.spokenRate) ||
                                                (errors[index]?.writtenRate && touched[index]?.writtenRate)
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
                                                            setFieldValue(`${index}.primaryLang`, e.target.checked);
                                                            setFieldTouched(`${index}.primaryLang`);
                                                        }}
                                                    >
                                                        Primary
                                                    </Checkbox>
                                                </Col>
                                                <Col span={3}>
                                                    <Button
                                                        danger
                                                        type="primary"
                                                        icon={<FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: 5 }} />}
                                                        onClick={() => {
                                                            Modal.confirm({
                                                                content: "Are your sure want to delete this data?",
                                                                onOk: () => {
                                                                    values.splice(index, 1);
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
                                </Modal>
                            </>
                        )}
                    </Formik>
                </Form>
            </>
        );
    }
}

export default Language;
