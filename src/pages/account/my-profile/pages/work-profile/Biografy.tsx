import { faPencilAlt, faPlusSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Descriptions, Form, Input, InputNumber, message, Modal, Row, Select, Skeleton, Space, Tag, Typography } from "antd";
import { AxiosResponse } from "axios";
import { Formik } from "formik";
import React from "react";
import { hobbies } from "../../../../../assets/data/hobbies";
import { getBiografy, postBiografy } from "../../../../../repository/WorkerRepo";
var CurrencyFormat = require("react-currency-format");

interface BiografyProps {}

interface BiografyState {
    showForm: boolean;
    pageReady: boolean;
    location: string;
    hobby: string;
    formData: any;
}

class Biografy extends React.Component<BiografyProps, BiografyState> {
    state = {
        showForm: false,
        pageReady: false,
        location: "",
        hobby: "",
        formData: {
            description: "",
            currency: "IDR",
            minSalary: 0,
            maxSalary: 0,
            preferedLocation: [],
            currentAddress: "",
            idCardAddress: "",
            identities: [],
            hobbies: [],
        },
    };
    componentDidMount() {
        this.getData();
    }
    getData() {
        this.setState({ pageReady: false });
        getBiografy()
            .then((res: AxiosResponse<any>) => {
                const { data } = res;
                const formData = {
                    description: data.description,
                    currency: "IDR",
                    minSalary: data.minSalary,
                    maxSalary: data.maxSalary,
                    preferedLocation: (data.preferedLocation && data.preferedLocation.split(",")) || [],
                    currentAddress: data.currentAddress,
                    idCardAddress: data.idCardAddress,
                    identities: data.identities || [],
                    hobbies: (data.hobbies && data.hobbies.split(",")) || [],
                };
                this.setState({ formData });
            })
            .catch((e: any) => {
                message.error({ content: e.response?.data?.message || e.message || "-" });
            })
            .finally(() => {
                this.setState({ pageReady: true });
            });
    }
    render() {
        const { showForm, pageReady, formData } = this.state;
        return (
            <>
                <Card id="biografi">
                    <Row justify="space-between">
                        <Col span={20}>
                            <Typography.Title level={4}>Biografy</Typography.Title>
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
                        <Typography.Paragraph>{formData?.description}</Typography.Paragraph>
                    </Skeleton>
                    <Skeleton active loading={pageReady === false} title>
                        <Descriptions column={1}>
                            <Descriptions.Item label="Expected Salary">
                                <span>{formData.currency}</span>
                                <CurrencyFormat value={formData.minSalary} displayType={"text"} thousandSeparator={true} renderText={(value: any) => <>{value}</>} />
                                <span> - </span>
                                <CurrencyFormat value={formData.maxSalary} displayType={"text"} thousandSeparator={true} renderText={(value: any) => <>{value}</>} />
                            </Descriptions.Item>
                            <Descriptions.Item label="Prefered Work Location">{formData.preferedLocation.join(", ")}</Descriptions.Item>
                            <Descriptions.Item label="Current Address">{formData.currentAddress}</Descriptions.Item>
                            <Descriptions.Item label="KTP Address">{formData.currentAddress}</Descriptions.Item>
                            {formData.identities.map((v: any, i: number) => (
                                <>
                                    <Descriptions.Item key={i} label={v.identityType}>
                                        {v.identityNo}
                                    </Descriptions.Item>
                                </>
                            ))}

                            <Descriptions.Item label="Hobbies">
                                <div style={{ width: "100%" }}>
                                    {formData.hobbies.map((v: any, i: number) => (
                                        <Tag>{v}</Tag>
                                    ))}
                                </div>
                            </Descriptions.Item>
                        </Descriptions>
                    </Skeleton>
                </Card>
                {showForm && this.renderForm()}
            </>
        );
    }
    renderForm() {
        const { showForm, location, hobby, formData } = this.state;
        return (
            <>
                <Form layout="vertical">
                    <Formik
                        enableReinitialize
                        initialValues={formData}
                        onSubmit={(values, { setSubmitting }) => {
                            const payload: any = { ...values };
                            payload.preferedLocation = values.preferedLocation.join(",");
                            payload.hobbies = values.hobbies.join(",");
                            console.log(payload);
                            postBiografy(payload)
                                .then((res: AxiosResponse<any>) => {
                                    this.getData();
                                    this.setState({
                                        showForm: false,
                                    });
                                })
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
                        {({ errors, touched, values, handleChange, handleBlur, setFieldValue, setFieldTouched, handleSubmit, isSubmitting, dirty }) => (
                            <>
                                <Modal
                                    visible={showForm}
                                    onCancel={() => {
                                        this.setState({
                                            showForm: false,
                                        });
                                    }}
                                    title="Decribe your self"
                                    onOk={() => handleSubmit()}
                                    width={800}
                                    className="biografi-modal"
                                >
                                    <Row>
                                        <Col span={24}>
                                            <Form.Item
                                                label="Describe your self"
                                                labelCol={{ span: 24 }}
                                                validateStatus={errors.description && touched.description ? "error" : ""}
                                                help={errors.description && touched.description ? errors.description : null}
                                            >
                                                <Input.TextArea name="description" value={values.description} onChange={handleChange} onBlur={handleBlur} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item
                                                label={
                                                    <>
                                                        Montly Salary <span className="required">*</span>
                                                    </>
                                                }
                                                labelCol={{ span: 24 }}
                                                validateStatus={errors.minSalary && touched.minSalary ? "error" : ""}
                                                help={errors.minSalary && touched.minSalary ? errors.minSalary : null}
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
                                                    <InputNumber
                                                        style={{ width: 200 }}
                                                        value={values.minSalary}
                                                        onChange={(e) => {
                                                            setFieldValue("minSalary", e);
                                                            setFieldTouched("minSalary", true);
                                                        }}
                                                    />
                                                    <InputNumber
                                                        style={{ width: 200 }}
                                                        value={values.maxSalary}
                                                        onChange={(e) => {
                                                            setFieldValue("maxSalary", e);
                                                            setFieldTouched("maxSalary", true);
                                                        }}
                                                    />
                                                </Space>
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item
                                                label={
                                                    <>
                                                        Prefered location <span className="required">*</span>
                                                    </>
                                                }
                                                labelCol={{ span: 24 }}
                                                validateStatus={errors.preferedLocation && touched.preferedLocation ? "error" : ""}
                                                help={errors.preferedLocation && touched.preferedLocation ? errors.preferedLocation : null}
                                            >
                                                <Input
                                                    name="location"
                                                    value={location}
                                                    onChange={(e) => {
                                                        this.setState({ location: e.target.value });
                                                    }}
                                                    onPressEnter={(e: any) => {
                                                        const newLocations: string[] = [...values.preferedLocation];
                                                        console.log(e.target?.value);
                                                        newLocations.push(e.target?.value);
                                                        setFieldValue("preferedLocation", newLocations);
                                                        this.setState({ location: "" });
                                                    }}
                                                    onBlur={handleBlur}
                                                />
                                                <br />
                                                <br />
                                                {values.preferedLocation.map((val: any, i: number) => {
                                                    return <Tag key={i}>{val}</Tag>;
                                                })}
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item
                                                label="Current Address"
                                                labelCol={{ span: 24 }}
                                                validateStatus={errors.currentAddress && touched.currentAddress ? "error" : ""}
                                                help={errors.currentAddress && touched.currentAddress ? errors.currentAddress : null}
                                            >
                                                <Input.TextArea name="currentAddress" value={values.currentAddress} onChange={handleChange} onBlur={handleBlur} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item
                                                label="KTP Address"
                                                labelCol={{ span: 24 }}
                                                validateStatus={errors.idCardAddress && touched.idCardAddress ? "error" : ""}
                                                help={errors.idCardAddress && touched.idCardAddress ? errors.idCardAddress : null}
                                            >
                                                <Input.TextArea name="idCardAddress" value={values.idCardAddress} onChange={handleChange} onBlur={handleBlur} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item
                                                label={
                                                    <>
                                                        Identities <span className="required">*</span>
                                                    </>
                                                }
                                                labelCol={{ span: 24 }}
                                                validateStatus={errors.identities && touched.identities ? "error" : ""}
                                                help={errors.identities && touched.identities ? errors.identities : null}
                                            >
                                                <Button
                                                    type="primary"
                                                    icon={<FontAwesomeIcon icon={faPlusSquare} style={{ marginRight: 5 }} />}
                                                    onClick={() => {
                                                        const identities: any[] = [...values.identities];
                                                        identities.push({
                                                            identityNo: "",
                                                            identityType: "ID_CARD",
                                                        });
                                                        this.setState({
                                                            formData: {
                                                                ...values,
                                                                identities,
                                                            },
                                                        });
                                                    }}
                                                >
                                                    Add
                                                </Button>
                                                {values.identities.map((id: any, index: number) => (
                                                    <>
                                                        <Row gutter={15}>
                                                            <Col span={8}>
                                                                <Select
                                                                    value={id.identityType}
                                                                    onChange={(e) => {
                                                                        setFieldValue(`identities.${index}.identityType`, e);
                                                                        setFieldTouched(`identities.${index}.identityType`, true);
                                                                    }}
                                                                >
                                                                    <Select.Option value={"ID_CARD"}>KTP</Select.Option>
                                                                    <Select.Option value={"DRIVING_LISENCE"}>SIM</Select.Option>
                                                                    <Select.Option value={"PASSPORT"}>PASSPORT</Select.Option>
                                                                </Select>
                                                            </Col>
                                                            <Col span={10}>
                                                                <Input
                                                                    name="identityNo"
                                                                    value={id.identityNo}
                                                                    onChange={(e) => {
                                                                        setFieldValue(`identities.${index}.identityNo`, e.target.value);
                                                                        setFieldTouched(`identities.${index}.identityNo`, true);
                                                                    }}
                                                                />
                                                            </Col>
                                                            <Col span={4}>
                                                                <Button
                                                                    danger
                                                                    type="primary"
                                                                    icon={<FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: 5 }} />}
                                                                    onClick={() => {
                                                                        Modal.confirm({
                                                                            content: "Are your sure want to delete this data?",
                                                                            onOk: () => {
                                                                                values.identities.splice(index, 1);
                                                                                setFieldValue("identities", values);
                                                                            },
                                                                        });
                                                                    }}
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </>
                                                ))}
                                            </Form.Item>
                                        </Col>

                                        <Col span={24}>
                                            <Form.Item
                                                label={
                                                    <>
                                                        Hobbies <span className="required">*</span>
                                                    </>
                                                }
                                                labelCol={{ span: 24 }}
                                                validateStatus={errors.hobbies && touched.hobbies ? "error" : ""}
                                                help={errors.hobbies && touched.hobbies ? errors.hobbies : null}
                                            >
                                                <Select
                                                    mode="multiple"
                                                    allowClear
                                                    style={{ width: "100%" }}
                                                    placeholder="Please select"
                                                    defaultValue={values.hobbies}
                                                    value={values.hobbies}
                                                    onChange={(e) => {
                                                        console.log(`selected ${e}`);
                                                        setFieldValue("hobbies", e);
                                                    }}
                                                >
                                                    {hobbies.map((v: any, i: number) => (
                                                        <Select.Option key={i} value={v}>
                                                            {v}
                                                        </Select.Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Modal>
                            </>
                        )}
                    </Formik>
                </Form>
            </>
        );
    }
}

export default Biografy;
