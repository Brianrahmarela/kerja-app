import { Component } from "react";
import {
  AutoComplete,
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
} from "antd";
import { DefaultEditor } from "react-simple-wysiwyg";
import { Formik } from "formik";
import * as yup from "yup";
import {
  getEducations,
  postEducation,
} from "../../../../../repository/WorkerRepo";
import { AxiosResponse } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
interface IProps {
  data: any;
  closeForm: () => void;
  setEducations?: (x: any) => void;
}
interface IState {}
class EducationForm extends Component<IProps, IState> {
  state = {
    positionOptions: [],
  };
  reloadEducation() {
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
        this.props.setEducations?.(ordered);
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
              instituteName: yup.string().required("This field is required"),
              graduationDate: yup.string().required("This field is required"),
              qualification: yup.string().required("This field is required"),
              location: yup.string().required("This field is required"),
              fieldOfStudy: yup.string().required("This field is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              postEducation(values)
                .then((res: AxiosResponse<any>) => {
                  this.reloadEducation();
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
              isSubmitting,
              handleSubmit,
              handleBlur,
              handleChange,
            }) => (
              <>
                <Form.Item
                  label={
                    <>
                      Institution/University <span className="required">*</span>
                    </>
                  }
                  validateStatus={
                    errors.instituteName && touched.instituteName ? "error" : ""
                  }
                  help={
                    errors.instituteName && touched.instituteName
                      ? errors.instituteName
                      : null
                  }
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
                  validateStatus={
                    errors.graduationDate && touched.graduationDate
                      ? "error"
                      : ""
                  }
                  help={
                    errors.graduationDate && touched.graduationDate
                      ? errors.graduationDate
                      : null
                  }
                >
                  <DatePicker
                    picker="month"
                    value={
                      (values.graduationDate &&
                        moment(values.graduationDate)) ||
                      undefined
                    }
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
                  validateStatus={
                    errors.qualification && touched.qualification ? "error" : ""
                  }
                  help={
                    errors.qualification && touched.qualification
                      ? errors.qualification
                      : null
                  }
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
                    filterOption={(input, option: any) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
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
                  validateStatus={
                    errors.location && touched.location ? "error" : ""
                  }
                  help={
                    errors.location && touched.location ? errors.location : null
                  }
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
                    filterOption={(input, option: any) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Select.Option value="">--:OPTION:--</Select.Option>
                    {locations.map((val: any) => (
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
                  validateStatus={
                    errors.fieldOfStudy && touched.fieldOfStudy ? "error" : ""
                  }
                  help={
                    errors.fieldOfStudy && touched.fieldOfStudy
                      ? errors.fieldOfStudy
                      : null
                  }
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
                    filterOption={(input, option: any) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
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
                  <Input
                    value={values.major}
                    name="major"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
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
                    filterOption={(input, option: any) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
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
const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({
  setExperiences: (payload: any) =>
    dispatch({
      type: "SET_EXPERIENCE",
      payload,
    }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(EducationForm));
const grades = ["CGPA/Percentage", "Incomplete", "On-going"];
const qualifications = [
  "SMU",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree/Post Graduate Degree",
  "Doctorate",
];
const fieldOfStudies = [
  "Advertising/Media",
  "Agriculture/Aquaculture/Forestry",
  "Airline Operation/Airport Management",
  "Architecture",
  "Art/Design/Creative Multimedia",
  "Biology",
  "BioTechnology",
  "Business Studies/Administration/Management",
  "Chemistry",
  "Commerce",
  "Computer Science/Information Technology",
  "Dentistry",
  "Economics",
  "Journalism",
  "Education/Teaching/Training",
  "Engineering (Aviation/Aeronautics/Astronautics)",
  "Engineering (Bioengineering/Biomedical)",
  "Engineering (Chemical)",
  "Engineering (Civil)",
  "Engineering (Computer/Telecommunication)",
  "Engineering (Electrical/Electronic)",
  "Engineering (Environmental/Health/Safety)",
  "Engineering (Industrial)",
  "Engineering (Marine)",
  "Engineering (Material Science)",
  "Engineering (Mechanical)",
  "Engineering (Mechatronic/Electromechanical)",
  "Engineering (Metal Fabrication/Tool &amp; Die/Welding)",
  "Engineering (Mining/Mineral)",
  "Engineering (Others)",
  "Engineering (Petroleum/Oil/Gas)",
  "Finance/Accountancy/Banking",
  "Food &amp; Beverage Services Management",
  "Food Technology/Nutrition/Dietetics",
  "Geographical Science",
  "Geology/Geophysics",
  "History",
  "Hospitality/Tourism/Hotel Management",
  "Human Resource Management",
  "Humanities/Liberal Arts",
  "Logistic/Transportation",
  "Law",
  "Library Management",
  "Linguistics/Languages",
  "Mass Communications",
  "Mathematics",
  "Medical Science",
  "Medicine",
  "Maritime Studies",
  "Marketing",
  "Music/Performing Arts Studies",
  "Nursing",
  "Optometry",
  "Personal Services",
  "Pharmacy/Pharmacology",
  "Philosophy",
  "Physical Therapy/Physiotherapy",
  "Physics",
  "Political Science",
  "Property Development/Real Estate Management",
  "Protective Services &amp; Management",
  "Psychology",
  "Quantity Survey",
  "Science &amp; Technology",
  "Secretarial",
  "Social Science/Sociology",
  "Sports Science &amp; Management",
  "Textile/Fashion Design",
  "Urban Studies/Town Planning",
  "Veterinary",
  "Others",
];

const locations = [
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
  "Indonesia",
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
