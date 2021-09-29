import { Card, Col, Form, Input, Row, Button, message, DatePicker, Select } from "antd";
import { AxiosResponse } from "axios";
import { Formik } from "formik";
import moment from "moment";
import React from "react";
import { getPersonal, postPersonal } from "../../../../repository/WorkerRepo";
import { countries } from "./../../../../assets/data/countries";
import { regions } from "./../../../../assets/data/cities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { hobbies } from "./../../../../assets/data/hobbies";
interface PersonalInfoProps {}

interface PersonalInfoState {
    formData: any;
    pageReady: boolean;
}

class PersonalInfo extends React.Component<PersonalInfoProps, PersonalInfoState> {
    state = {
        formData: {
            firstName: "",
            lastName: "",
            placeOfBirth: "",
            dateOfBirth: undefined,
            gender: "",
            email: "",
            phoneNumber: "",
            otherPhoneNumber: "",
            nationality: "",
            country: "",
            region: "",
            address: "",
            province: "",
            city: "",
            relition: "",
            website: "",
            hobbies: "",
            subdistrict: "",
            postalcode: "",
            identityType: "ID_CARD",
            identityNo: "",
        } as any,
        pageReady: false,
    };
    componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        getPersonal()
            .then((res: AxiosResponse<any>) => {
                const { data } = res;
                const newData = {
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    placeOfBirth: data.placeOfBirth || "",
                    dateOfBirth: (data.dateOfBirth && data.dateOfBirth !== "0001-01-01T00:00:00Z" && moment(data.dateOfBirth)) || undefined,
                    gender: data.gender || "",
                    email: data.email || "",
                    phoneNumber: data.phoneNumber || "",
                    otherPhoneNumber: data.otherPhoneNumber || "",
                    nationality: data.nationality || "",
                    country: data.country || "",
                    region: data.region || "",
                    address: data.address || undefined,
                    province: data.province || "",
                    city: data.city || "",
                    website: data.website || "",
                    hobbies: (data.hobbies && data.hobbies.split(",")) || [],
                    marritalStatus: data.marritalStatus || "",
                    subdistrict: data.subdistrict || "",
                    socialmedia: data.socialmedia || "",
                    religion: data.religion || "",
                    postalcode: data.postalcode || undefined,
                    identityType: data.identityType || "ID_CARD",
                    identityNo: data.identityNo || undefined,
                };
                this.setState({ formData: newData });
            })
            .catch((e: any) => {
                message.error({ content: e.response?.data?.message || e.message || "-" });
            })
            .finally(() => {
                this.setState({ pageReady: true });
            });
    }
    render() {
        const { formData } = this.state;
        return (
            <>
                <Card>
                    <Form layout="vertical">
                        <Formik
                            enableReinitialize
                            initialValues={formData}
                            onSubmit={(values, { setSubmitting }) => {
                                const payload: any = { ...values };
                                console.log(values.dateOfBirth);
                                payload.dateOfBirth = moment(values.dateOfBirth).toDate();
                                payload.postalcode = values.postalcode ? Number(values.postalcode) : 0;
                                payload.hobbies = values.hobbies.join(",");
                                postPersonal(payload)
                                    .then((res: any) => {
                                        message.success("Saved");
                                    })
                                    .catch((e) => {
                                        message.error(e.response?.data?.message || e.message || "-");
                                    })
                                    .finally(() => {
                                        setSubmitting(false);
                                    });
                            }}
                        >
                            {({ errors, touched, values, handleChange, handleBlur, setFieldValue, setFieldTouched, handleSubmit, isSubmitting, dirty }) => (
                                <>
                                    <Row gutter={[20, 20]}>
                                        <Col span={12}>
                                            <Form.Item
                                                label="First Name"
                                                validateStatus={errors.firstName && touched.firstName ? "error" : ""}
                                                help={errors.firstName && touched.firstName ? errors.firstName : null}
                                            >
                                                <Input name="firstName" value={values.firstName} onChange={handleChange} onBlur={handleBlur} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Last Name" validateStatus={errors.lastName && touched.lastName ? "error" : ""} help={errors.lastName && touched.lastName ? errors.lastName : null}>
                                                <Input name="lastName" value={values.lastName} onChange={handleChange} onBlur={handleBlur} />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={[20, 20]}>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Date a Birth"
                                                validateStatus={errors.placeOfBirth && touched.placeOfBirth ? "error" : ""}
                                                help={errors.placeOfBirth && touched.placeOfBirth ? errors.placeOfBirth : null}
                                            >
                                                <DatePicker
                                                    value={values.dateOfBirth}
                                                    onChange={(e) => {
                                                        console.log(e);
                                                        setFieldTouched("dateOfBirth", true);
                                                        setFieldValue("dateOfBirth", e);
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Place of Birth"
                                                validateStatus={errors.newPassword && touched.newPassword ? "error" : ""}
                                                help={errors.newPassword && touched.newPassword ? errors.newPassword : null}
                                            >
                                                <Input name="placeOfBirth" value={values.placeOfBirth} onChange={handleChange} onBlur={handleBlur} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[20, 20]}>
                                        <Col span={24}>
                                            <Form.Item
                                                label="Telephone"
                                                validateStatus={errors.newPassword && touched.newPassword ? "error" : ""}
                                                help={errors.newPassword && touched.newPassword ? errors.newPassword : null}
                                            >
                                                <Input.Group compact>
                                                    <Select value={62}>
                                                        <Select.Option value={62}>+62</Select.Option>
                                                    </Select>
                                                    <Input name="phoneNumber" style={{ width: "80%" }} value={values.phoneNumber} onChange={handleChange} onBlur={handleBlur} />
                                                </Input.Group>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[20, 20]}>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Country"
                                                validateStatus={errors.newPassword && touched.newPassword ? "error" : ""}
                                                help={errors.newPassword && touched.newPassword ? errors.newPassword : null}
                                            >
                                                <Select
                                                    showSearch
                                                    defaultValue={values.nationality}
                                                    value={values.nationality}
                                                    style={{ width: "100%" }}
                                                    onChange={(e: any) => {
                                                        setFieldValue("nationality", e);
                                                        setFieldTouched("nationality");
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
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Location" validateStatus={errors.region && touched.region ? "error" : ""} help={errors.region && touched.region ? errors.region : null}>
                                                <Select
                                                    showSearch
                                                    defaultValue={values.region}
                                                    value={values.region}
                                                    style={{ width: "100%" }}
                                                    onChange={(e: any) => {
                                                        setFieldValue("region", e);
                                                        setFieldTouched("region");
                                                    }}
                                                    filterOption={(input, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                >
                                                    <Select.Option value="">--:OPTION:--</Select.Option>
                                                    {regions.map((val: string) => (
                                                        <Select.Option key={val.toUpperCase()} value={val.toUpperCase()}>
                                                            {val}
                                                        </Select.Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[20, 20]}>
                                        <Col span={24}>
                                            <Form.Item label="Address" validateStatus={errors.address && touched.address ? "error" : ""} help={errors.address && touched.address ? errors.address : null}>
                                                <Input name="address" value={values.address} onChange={handleChange} onBlur={handleBlur} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[20, 20]}>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Relationship Status"
                                                validateStatus={errors.marritalStatus && touched.marritalStatus ? "error" : ""}
                                                help={errors.marritalStatus && touched.marritalStatus ? errors.marritalStatus : null}
                                            >
                                                <Select
                                                    value={values.marritalStatus}
                                                    onChange={(e: any) => {
                                                        setFieldValue("marritalStatus", e);
                                                        setFieldTouched("marritalStatus");
                                                    }}
                                                >
                                                    <Select.Option value="">--:OPTION:--</Select.Option>
                                                    <Select.Option value="SINGLE">Single</Select.Option>
                                                    <Select.Option value="MARRIED">Married</Select.Option>
                                                    <Select.Option value="DIVORCED">Divorced</Select.Option>
                                                    <Select.Option value="WIDOWED">Widowed</Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Gender"
                                                validateStatus={errors.newPassword && touched.newPassword ? "error" : ""}
                                                help={errors.newPassword && touched.newPassword ? errors.newPassword : null}
                                            >
                                                <Select
                                                    value={values.gender}
                                                    onChange={(e: any) => {
                                                        setFieldValue("gender", e);
                                                        setFieldTouched("gender");
                                                    }}
                                                >
                                                    <Select.Option value="">--:OPTION:--</Select.Option>
                                                    <Select.Option value="MALE">Male</Select.Option>
                                                    <Select.Option value="FEMALE">Female</Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[20, 20]}>
                                        <Col span={24}>
                                            <Form.Item
                                                label="Website Link"
                                                validateStatus={errors.newPassword && touched.newPassword ? "error" : ""}
                                                help={errors.newPassword && touched.newPassword ? errors.newPassword : null}
                                            >
                                                <Input name="address" value={values.address} onChange={handleChange} onBlur={handleBlur} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[20, 20]}>
                                        <Col span={24}>
                                            <Form.Item label="E-mail Link" validateStatus={errors.email && touched.email ? "error" : ""} help={errors.email && touched.email ? errors.email : null}>
                                                <Input name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[20, 20]}>
                                        <Col span={24}>
                                            <Form.Item
                                                label="One of your Social Media Link"
                                                validateStatus={errors.socialmedia && touched.socialmedia ? "error" : ""}
                                                help={errors.socialmedia && touched.socialmedia ? errors.socialmedia : null}
                                            >
                                                <Input name="socialmedia" value={values.socialmedia} onChange={handleChange} onBlur={handleBlur} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[20, 20]}>
                                        <Col span={24}>
                                            <Form.Item label="Religion" validateStatus={errors.religion && touched.religion ? "error" : ""} help={errors.religion && touched.religion ? errors.religion : null}>
                                                <Select
                                                    value={values.religion}
                                                    onChange={(e: any) => {
                                                        setFieldValue("religion", e);
                                                        setFieldTouched("religion");
                                                    }}
                                                >
                                                    <Select.Option value="">--:OPTION:--</Select.Option>
                                                    <Select.Option value="ISLAM">Islam</Select.Option>
                                                    <Select.Option value="KATHOLIK">Katholik</Select.Option>
                                                    <Select.Option value="NASRANI">Nasrani</Select.Option>
                                                    <Select.Option value="HINDU">Hindu</Select.Option>
                                                    <Select.Option value="BHUDA">Bhuda</Select.Option>
                                                    <Select.Option value="KONGHUCU">Kong hu cu</Select.Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[20, 20]}>
                                        <Col span={24}>
                                            <Form.Item
                                                label="Interest / Hobby"
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
                                    <Row gutter={[20, 20]}>
                                        <Col span={24}>
                                            <Form.Item>
                                                <Button type="primary" loading={isSubmitting} onClick={() => handleSubmit()}>
                                                    <FontAwesomeIcon icon={faSave} style={{ marginRight: 5 }} />
                                                    Save
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </>
                            )}
                        </Formik>
                    </Form>
                </Card>
            </>
        );
    }
}

export default PersonalInfo;
