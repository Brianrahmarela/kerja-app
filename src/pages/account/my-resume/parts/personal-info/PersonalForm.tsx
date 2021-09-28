import { Component } from "react";
import { Button, DatePicker, Divider, Form, Input, InputNumber, Modal, notification, Select, Space, Spin } from "antd";
import { Formik } from "formik";
import moment from "moment";
import * as yup from "yup";
import { getPersonal, postPersonal } from "../../../../../repository/WorkerRepo";
import { AxiosResponse } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
interface IProps {
    switchEditMode: () => void;
    t?: (x: any) => void;
}
interface IState {
    formData: any;
    pageReady: boolean;
}
export default class PersonalForm extends Component<IProps, IState> {
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
            subdistrict: "",
            postalcode: "",
            identityType: "ID_CARD",
            identityNo: "",
        },
        pageReady: false,
    };
    componentDidMount() {
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
                    hobbies: data.hobbies || "",
                    subdistrict: data.subdistrict || "",
                    postalcode: data.postalcode || undefined,
                    identityType: data.identityType || "ID_CARD",
                    identityNo: data.identityNo || undefined,
                };
                this.setState({ formData: newData });
            })
            .catch((error) => {
                Modal.error({
                    title: `${this.props.t?.("notif.failed")}`,
                    // content : error.response.data.message
                    content: error.response?.data?.message || error.message || "-",
                });
            })
            .finally(() => {
                this.setState({ pageReady: true });
            });
    }
    render() {
        if (this.state.pageReady === false) {
            return (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        flex: 1,
                        justifyContent: "center",
                        alignContent: "center",
                        display: "flex",
                    }}
                >
                    <Spin style={{ alignSelf: "center" }} tip="Loading..." />
                </div>
            );
        }
        return (
            <div>
                <Divider />
                <Form {...{ wrapperCol: { span: 18 }, labelCol: { span: 6 } }}>
                    <Formik
                        enableReinitialize
                        initialValues={this.state.formData}
                        validationSchema={yup.object().shape({
                            firstName: yup.string().required("This field is required"),
                            lastName: yup.string().required("This field is required"),
                            gender: yup.string().required("This field is required"),
                            email: yup.string().email().required("This field is required"),
                            phoneNumber: yup.string().required("This field is required"),
                            nationality: yup.string().required("This field is required"),
                            country: yup.string().required("This field is required"),
                            region: yup.string().required("This field is required"),
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            const payload: any = { ...values };
                            console.log(values.dateOfBirth);
                            payload.dateOfBirth = moment(values.dateOfBirth).toDate();
                            payload.postalcode = values.postalcode ? Number(values.postalcode) : 0;
                            postPersonal(payload)
                                .then((res: any) => {
                                    notification.success({
                                        message: "Success",
                                    });
                                    this.props.switchEditMode();
                                    Modal.info({
                                        title: "info!",
                                        content: "information will change after reload this page or re-login",
                                    });
                                })
                                .catch((error) => {
                                    Modal.error({
                                        title: `${this.props.t?.("notif.failed")}`,
                                        // content : error.response.data.message
                                        content: error.response?.data?.message || error.message || "-",
                                    });
                                })
                                .finally(() => {
                                    setSubmitting(false);
                                });
                        }}
                    >
                        {({ values, setFieldTouched, setFieldValue, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                            <>
                                <Form.Item
                                    label={
                                        <>
                                            First Name <span className="required">*</span>
                                        </>
                                    }
                                    validateStatus={errors.firstName && touched.firstName ? "error" : ""}
                                    help={errors.firstName && touched.firstName ? errors.firstName : null}
                                >
                                    <Input name="firstName" value={values.firstName} onChange={handleChange} onBlur={handleBlur} />
                                </Form.Item>
                                <Form.Item
                                    label={
                                        <>
                                            Last Name <span className="required">*</span>
                                        </>
                                    }
                                    validateStatus={errors.lastName && touched.lastName ? "error" : ""}
                                    help={errors.lastName && touched.lastName ? errors.lastName : null}
                                >
                                    <Input name="lastName" value={values.lastName} onChange={handleChange} onBlur={handleBlur} />
                                </Form.Item>
                                <Form.Item
                                    label={
                                        <>
                                            Place of Birth <span className="required">*</span>
                                        </>
                                    }
                                    validateStatus={errors.placeOfBirth && touched.placeOfBirth ? "error" : ""}
                                    help={errors.placeOfBirth && touched.placeOfBirth ? errors.placeOfBirth : null}
                                >
                                    <Input name="placeOfBirth" value={values.placeOfBirth} onChange={handleChange} onBlur={handleBlur} />
                                </Form.Item>
                                <Form.Item
                                    label={
                                        <>
                                            Date of Birth <span className="required">*</span>
                                        </>
                                    }
                                    validateStatus={errors.dateOfBirth && touched.dateOfBirth ? "error" : ""}
                                    help={errors.dateOfBirth && touched.dateOfBirth ? errors.dateOfBirth : null}
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
                                <Form.Item
                                    label={
                                        <>
                                            Gender <span className="required">*</span>
                                        </>
                                    }
                                    validateStatus={errors.gender && touched.gender ? "error" : ""}
                                    help={errors.gender && touched.gender ? errors.gender : null}
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
                                <Form.Item
                                    label={
                                        <>
                                            Email <span className="required">*</span>
                                        </>
                                    }
                                    validateStatus={errors.email && touched.email ? "error" : ""}
                                    help={errors.email && touched.email ? errors.email : null}
                                >
                                    <Input name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                </Form.Item>
                                <Form.Item
                                    label={
                                        <>
                                            Mobile Number <span className="required">*</span>
                                        </>
                                    }
                                    validateStatus={errors.phoneNumber && touched.phoneNumber ? "error" : ""}
                                    help={errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : null}
                                >
                                    <Input.Group compact>
                                        <Select value={62}>
                                            <Select.Option value={62}>+62</Select.Option>
                                        </Select>
                                        <Input name="phoneNumber" style={{ width: "70%" }} value={values.phoneNumber} onChange={handleChange} onBlur={handleBlur} />
                                    </Input.Group>
                                </Form.Item>
                                <Form.Item
                                    label="Other Phone Number"
                                    validateStatus={errors.otherPhoneNumber && touched.otherPhoneNumber ? "error" : ""}
                                    help={errors.otherPhoneNumber && touched.otherPhoneNumber ? errors.otherPhoneNumber : null}
                                >
                                    <Input name="otherPhoneNumber" value={values.otherPhoneNumber} onChange={handleChange} onBlur={handleBlur} />
                                </Form.Item>
                                <Form.Item
                                    label={
                                        <>
                                            Nationality <span className="required">*</span>
                                        </>
                                    }
                                    validateStatus={errors.nationality && touched.nationality ? "error" : ""}
                                    help={errors.nationality && touched.nationality ? errors.nationality : null}
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
                                <Form.Item
                                    label={
                                        <>
                                            Country <span className="required">*</span>
                                        </>
                                    }
                                    validateStatus={errors.country && touched.country ? "error" : ""}
                                    help={errors.country && touched.country ? errors.country : null}
                                >
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
                                            State/Region <span className="required">*</span>
                                        </>
                                    }
                                    validateStatus={errors.region && touched.region ? "error" : ""}
                                    help={errors.region && touched.region ? errors.region : null}
                                >
                                    <Select
                                        showSearch
                                        defaultValue={values.region}
                                        value={values.region}
                                        style={{ width: "100%" }}
                                        onChange={(e: any) => {
                                            setFieldValue("region", e);
                                            setFieldTouched("region", true);
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
                                <Form.Item label="Address" validateStatus={errors.address && touched.address ? "error" : ""} help={errors.address && touched.address ? errors.address : null}>
                                    <Input.TextArea name="address" value={values.address} onChange={handleChange} onBlur={handleBlur} />
                                </Form.Item>
                                <Form.Item label="Postal Code" validateStatus={errors.postalcode && touched.postalcode ? "error" : ""} help={errors.postalcode && touched.postalcode ? errors.postalcode : null}>
                                    <InputNumber name="postalcode" value={values.postalcode} onChange={handleChange} onBlur={handleBlur} />
                                </Form.Item>
                                <Form.Item
                                    label="Identification No"
                                    validateStatus={errors.identityNo && touched.identityNo ? "error" : ""}
                                    help={errors.identityNo && touched.identityNo ? errors.identityNo : null}
                                >
                                    <Space>
                                        <Select
                                            value={values.identityType}
                                            onChange={(e: any) => {
                                                setFieldValue("identityType", e);
                                                setFieldTouched("identityType", true);
                                            }}
                                        >
                                            <Select.Option value="ID_CARD">ID CARD</Select.Option>
                                            <Select.Option value="DRIVER_LICENSE">DRIVER LICENSE</Select.Option>
                                            <Select.Option value="PASSPORT">PASSPORT</Select.Option>
                                        </Select>
                                        <Input name="identityNo" value={values.identityNo} onChange={handleChange} onBlur={handleBlur} />
                                    </Space>
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                                    <Space direction="horizontal">
                                        <Button type="primary" loading={isSubmitting} onClick={() => handleSubmit()}>
                                            <FontAwesomeIcon icon={faSave} style={{ marginRight: 5 }} />
                                            Save
                                        </Button>
                                        <Button type="default" loading={isSubmitting} onClick={() => this.props.switchEditMode()}>
                                            <FontAwesomeIcon icon={faTimes} style={{ marginRight: 5 }} />
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

const countries = [
    "Indonesia",
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia Hercegovina",
    "Botswana",
    "Bouvet Island",
    "Brazil",
    "British Indian Ocean Territory",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Christmas Island",
    "Cocos (Keeling) Islands",
    "Colombia",
    "Comoros",
    "Congo",
    "Cook Islands",
    "Costa Rica",
    "Cote D'ivoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor",
    "Ecuador",
    "Egypt",
    "EL Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Falkland Islands (Malvinas)",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "French Guiana",
    "French Polynesia",
    "French Southern Territories",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Heard and Mc Donald Islands",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea (North)",
    "Korea (South)",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libyan Arab Jamahiriya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macau",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Martinique",
    "Mauritania",
    "Mauritius",
    "Mayotte",
    "Mexico",
    "Micronesia",
    "Monaco",
    "Mongolia",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Nambia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "Netherlands Antilles",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Niue",
    "Norfolk Island",
    "Northern Mariana Islands",
    "Norway",
    "Oman",
    "Others",
    "Pakistan",
    "Palau",
    "Palestinian Territory, Occupied",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Pitcairn",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Republic Of Moldova",
    "Reunion",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts And Nevis",
    "Saint Lucia",
    "Saint Vincent and The Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Georgia And South Sandwich Islands",
    "Spain",
    "Sri Lanka",
    "St. Helena",
    "St. Pierre and Miquelon",
    "Sudan",
    "Suriname",
    "Svalbard and Jan Mayen Islands",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "TOGO",
    "Tokelau",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks and Caicos Islands",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "United States Minor Outlying Islands",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City State (Holy See)",
    "Venezuela",
    "Vietnam",
    "Virgin Islands (British)",
    "Virgin Islands (U.S.)",
    "Wallis and Futuna Islands",
    "Western Sahara",
    "Yemen",
    "Yugoslavia",
    "Zaire",
    "Zambia",
    "Zimbabwe",
];

const regions = [
    "Aceh",
    "Bali",
    "Bengkulu",
    "Papua",
    "Jakarta Raya",
    "Jambi",
    "Jawa Barat",
    "Jawa Tengah",
    "Jawa Timur",
    "Kalimantan Barat",
    "Kalimantan Selatan",
    "Kalimantan Tengah",
    "Kalimantan Timur",
    "Lampung",
    "Maluku",
    "Nusa Tenggara Barat",
    "Nusa Tenggara Timur",
    "Riau",
    "Sulawesi Selatan",
    "Sulawesi Tengah",
    "Sulawesi Tenggara",
    "Sulawesi Utara",
    "Sumatera Barat",
    "Sumatera Selatan",
    "Sumatera Utara",
    "Yogyakarta",
    "Bangka Belitung",
    "Banten",
    "Gorontalo",
    "Maluku Utara",
    "Kepulauan Riau",
    "Papua Barat",
    "Sulawesi Barat",
    "Kalimantan Utara",
];
