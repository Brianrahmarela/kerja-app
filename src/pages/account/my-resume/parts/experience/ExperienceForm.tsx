import React, { Component } from "react";
import {
  AutoComplete,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import { DefaultEditor } from "react-simple-wysiwyg";
import {
  getExperiences,
  getPositionTitles,
  postExperience,
} from "../../../../../repository/WorkerRepo";
import { AxiosResponse } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Formik } from "formik";
import * as yup from "yup";
interface IProps {
  data: any;
  closeForm: () => void;
  setExperiences?: (x: any) => void;
}
interface IState {
  positionOptions: any[];
}
class ExperienceForm extends Component<IProps, IState> {
  state = {
    positionOptions: [],
  };
  reloadExperience() {
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
        this.props.setExperiences?.(ordered);
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
              positionTitle: yup
                .string()
                .required("Field is required")
                .nullable(),
              organizationName: yup
                .string()
                .required("Field is required")
                .nullable(),
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

                    then: yup
                      .mixed()
                      .test("invalid", "Must bigger than", () => false),
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
                .then((res: AxiosResponse<any>) => {
                  this.reloadExperience();
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
                {console.log(errors)}
                <Form.Item
                  label={
                    <>
                      Position Title <span className="required">*</span>
                    </>
                  }
                  validateStatus={
                    errors.positionTitle && touched.positionTitle ? "error" : ""
                  }
                  help={
                    errors.positionTitle && touched.positionTitle
                      ? errors.positionTitle
                      : null
                  }
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
                  validateStatus={
                    errors.organizationName && touched.organizationName
                      ? "error"
                      : ""
                  }
                  help={
                    errors.organizationName && touched.organizationName
                      ? errors.organizationName
                      : null
                  }
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
                  validateStatus={
                    (errors.joinDate && touched.joinDate) || errors.endDate
                      ? "error"
                      : ""
                  }
                  help={
                    (errors.joinDate && touched.joinDate) || errors.endDate
                      ? "This field is required"
                      : null
                  }
                >
                  <Row gutter={10} justify={"start"} align="middle">
                    <Col>
                      <DatePicker
                        picker="month"
                        format="MMM-YYYY"
                        value={
                          values.joinDate ? moment(values.joinDate) : undefined
                        }
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
                        value={
                          values.endDate ? moment(values.endDate) : undefined
                        }
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
                  validateStatus={
                    errors.specializationName && touched.specializationName
                      ? "error"
                      : ""
                  }
                  help={
                    errors.specializationName && touched.specializationName
                      ? errors.specializationName
                      : null
                  }
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
                    filterOption={(input, option: any) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
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
                  validateStatus={
                    errors.jobRoleName && touched.jobRoleName ? "error" : ""
                  }
                  help={
                    errors.jobRoleName && touched.jobRoleName
                      ? errors.jobRoleName
                      : null
                  }
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
                    filterOption={(input, option: any) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Select.Option value="">--:OPTION:--</Select.Option>
                    {specifications
                      .find((e: any) => e.label === values.specializationName)
                      ?.options.map((val: string) => (
                        <Select.Option
                          key={val.toUpperCase()}
                          value={val.toUpperCase()}
                        >
                          {val}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Country"
                  validateStatus={
                    errors.country && touched.country ? "error" : ""
                  }
                  help={
                    errors.country && touched.country ? errors.country : null
                  }
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
                    filterOption={(input, option: any) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Select.Option value="">--:OPTION:--</Select.Option>
                    {countries.map((val: string) => (
                      <Select.Option
                        key={val.toUpperCase()}
                        value={val.toUpperCase()}
                      >
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
                  validateStatus={
                    errors.industry && touched.industry ? "error" : ""
                  }
                  help={
                    errors.industry && touched.industry ? errors.industry : null
                  }
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
                    filterOption={(input, option: any) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Select.Option value="">--:OPTION:--</Select.Option>
                    {industries.map((val: string) => (
                      <Select.Option
                        key={val.toUpperCase()}
                        value={val.toUpperCase()}
                      >
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
                  validateStatus={
                    errors.positionLevel && touched.positionLevel ? "error" : ""
                  }
                  help={
                    errors.positionLevel && touched.positionLevel
                      ? errors.positionLevel
                      : null
                  }
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
                    filterOption={(input, option: any) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Select.Option value="">--:OPTION:--</Select.Option>
                    {positionLevels.map((val: string) => (
                      <Select.Option
                        key={val.toUpperCase()}
                        value={val.toUpperCase()}
                      >
                        {val}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Montly Salary"
                  validateStatus={
                    errors.monthlySalary && touched.monthlySalary ? "error" : ""
                  }
                  help={
                    errors.monthlySalary && touched.monthlySalary
                      ? errors.monthlySalary
                      : null
                  }
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
                    <Input
                      defaultValue={values.monthlySalary}
                      name="monthlySalary"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
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
)(withTranslation()(ExperienceForm));

const specifications: any[] = [
  {
    label: " Actuarial Science/Statistics",
    options: ["Actuarial", "Statistician/Mathematician", "Others"],
  },
  {
    label: " Advertising/Media Planning",
    options: [
      "Advertising Executive/Account Manager",
      "Consultant",
      "Copywriter",
      "Creative",
      "Management",
      "Media Planning",
      "Supervisor/Team Lead",
      "Others",
    ],
  },
  {
    label: " Agriculture/Forestry/Fisheries",
    options: [
      "Agriculture/Plantation",
      "Fisheries",
      "Forestry",
      "Management",
      "Others",
    ],
  },
  {
    label: " Architecture/Interior Design",
    options: [
      "Architect",
      "Draughtsman/Design Drafter",
      "Interior Designer",
      "Management",
      "Town Planner",
      "Others",
    ],
  },
  {
    label: " Arts/Creative/Graphics Design",
    options: [
      "Animator",
      "Design Drafter",
      "Desktop Publishing Artist",
      "Fashion Designer",
      "Floral Designer",
      "Graphics Designer",
      "Industrial/Product Designer",
      "Management",
      "Multimedia Designer",
      "Photographer",
      "Supervisor/Team Lead",
      "Visual Merchandiser",
      "Web Designer",
      "Others",
    ],
  },
  {
    label: " Aviation/Aircraft Maintenance",
    options: [
      "Aerospace Engineer ",
      "Aircraft Maintenance",
      "Airline Ticketing",
      "Airport Operation",
      "Flight Attendant",
      "Management",
      "Pilot",
      "Others",
    ],
  },
  {
    label: " Banking/Financial Services",
    options: [
      "Actuarial",
      "Analyst",
      "Claims/Settlement",
      "Corporate Banking",
      "Credit Management",
      "Economist",
      "Financial Planning/Wealth Management",
      "Internal Audit",
      "Loan/Mortgage",
      "Management",
      "Regulatory Compliance",
      "Retail Banking/Branch Operation",
      "Risk Management",
      "Treasury Management",
      "Underwriter (Insurance)",
      "Others",
    ],
  },
  {
    label: " Biomedical",
    options: [
      "Clinical Laboratory Assistant/Technician",
      "Laboratory Assistant",
      "Researcher/Scientist",
      "Sales Executive/Account Manager",
      "Others",
    ],
  },
  {
    label: " Biotechnology",
    options: [
      "Laboratory Assistant",
      "Management",
      "Quality Control/Assurance",
      "Researcher/Scientist",
      "Supervisor/Team Lead",
      "Others",
    ],
  },
  {
    label: " Chemistry",
    options: [
      "Chemist/Researcher",
      "Laboratory Assistant",
      "Management",
      "Supervisor/Team Lead",
      "Others",
    ],
  },
  {
    label: " Clerical/Administrative Support",
    options: [
      "Administrative Executive",
      "Clerk",
      "Contracts Administration",
      "Data Entry Personnel",
      "Management",
      "Receptionist",
      "Others",
    ],
  },
  {
    label: " Corporate Strategy/Top Management",
    options: [
      "Chief Executive Officer (CEO)/Managing Director",
      "Chief Financial Officer (CFO)",
      "Chief Operation Officer (COO)",
      "Chief Technology Officer (CTO)",
      "Regional/Country Manager",
      "Others",
    ],
  },
  {
    label: " Customer Service",
    options: [
      "Call Centre Executive",
      "Customer Service - General",
      "Management",
      "Supervisor/Team Lead",
      "Others",
    ],
  },
  {
    label: " Digital Marketing",
    options: [
      "Brand Management",
      "Business Development",
      "Marketing Executive",
      "Others",
    ],
  },
  {
    label: " E-commerce",
    options: [
      "Business Development",
      "Marketing Executive",
      "Software Engineer/Programmer",
      "Others",
    ],
  },
  {
    label: " Education",
    options: [
      "Childcare",
      "Education Counselor",
      "Instructional Designer",
      "Kindergarten Teacher",
      "Lecturer",
      "Librarian",
      "Management",
      "Primary/Secondary Teacher",
      "Professor",
      "Researcher",
      "School Principal",
      "Others",
    ],
  },
  {
    label: " Engineering - Chemical",
    options: [
      "Chemical Engineer",
      "Consultant",
      "Laboratory Assistant",
      "Management",
      "Process Engineer",
      "Product Management",
      "Project Management",
      "Quality Control/Assurance",
      "R&D Engineer",
      "Supervisor/Team Lead",
      "Technical Writer",
      "Technician/Support",
      "Others",
    ],
  },
  {
    label: " Engineering - Civil/Construction/Structural",
    options: [
      "Civil Engineer",
      "Civil/Structural Drafter",
      "Clerk of Works/Site Supervisor",
      "Contracts Management",
      "Environmental, Health & Safety Engineer",
      "Foreman/Technician",
      "Land Surveyor",
      "Management",
      "Project Management",
      "Quality Control/Assurance",
      "Site Engineer",
      "Structural Engineer",
      "Supervisor/Team Lead",
      "Others",
    ],
  },
  {
    label: " Engineering - Electrical",
    options: [
      "CAD-CAM/Electrical Drafter",
      "Electrical Engineer",
      "Electrical Technician/Support",
      "Management",
      "Mechatronics Engineer",
      "Process Engineer",
      "Product Management",
      "Project Management",
      "Quality Control/Assurance",
      "R&D Engineer",
      "Supervisor/Team Lead",
      "Technical Writer",
      "Test Engineer",
      "Others",
    ],
  },
  {
    label: " Engineering - Electronics/Communication",
    options: [
      "CAD-CAM/Electronics Drafter",
      "Electronics Engineer",
      "Electronics Technician/Support",
      "Management",
      "Mechatronics Engineer",
      "Process Engineer",
      "Product Management",
      "Project Management",
      "Quality Control/Assurance",
      "R&D Engineer",
      "SMT Engineer",
      "Supervisor/Team Lead",
      "Technical Writer",
      "Telecommunication Engineer",
      "Test Engineer",
      "Others",
    ],
  },
  {
    label: " Engineering - Environmental/Health/Safety",
    options: [
      "Consultant",
      "Environmental, Health & Safety Engineer",
      "Management",
      "Quality Control/Assurance",
      "R&D Engineer",
      "Supervisor/Team Lead",
      "Technical Writer",
      "Technician/Support",
      "Others",
    ],
  },
  {
    label: " Engineering - Industrial",
    options: ["Industrial/Production Engineer"],
  },
  {
    label: " Engineering - Mechanical/Automotive",
    options: [
      "Automotive Engineer",
      "CAD-CAM/Mechanical Drafter",
      "Management",
      "Mechanical Engineer",
      "Mechatronics Engineer",
      "Process Engineer",
      "Product Management",
      "Project Management",
      "Quality Control/Assurance",
      "R&D Engineer",
      "Supervisor/Team Lead",
      "Technical Writer",
      "Technician/Support",
      "Test Engineer",
      "Others",
    ],
  },
  {
    label: " Engineering - Oil/Gas",
    options: [
      "CAD-CAM/Drafter",
      "Drilling/Well Engineer",
      "Facilities Engineer",
      "Management",
      "Process Engineer",
      "Production Engineer",
      "Project Management",
      "Quality Control/Assurance",
      "R&D Engineer",
      "Reservoir/Petroleum Engineer",
      "Supervisor/Team Lead",
      "Technical Writer",
      "Technician/Support",
      "Others",
    ],
  },
  {
    label: " Engineering - Others",
    options: [
      "Aerospace Engineer",
      "Agricultural Engineer",
      "Biological Engineer",
      "Consultant",
      "Management",
      "Marine/Naval Engineer",
      "Metallurgical Engineer",
      "Nuclear Engineer",
      "R&D Engineer",
      "Supervisor/Team Lead",
      "Technical Writer",
      "Technician/Support",
      "Others",
    ],
  },
  {
    label: " Entertainment/Performing Arts",
    options: [
      "Actor",
      "Cameraman",
      "Dancer",
      "Management",
      "Model",
      "Musician",
      "Producer (Film, TV, Radio, Records)",
      "Singer",
      "Writer (Film, TV, Radio)",
      "Others",
    ],
  },
  {
    label: " Finance - Audit/Taxation",
    options: [
      "Auditing",
      "Management",
      "Receivership/Liquidation",
      "Taxation",
      "Others",
    ],
  },
  {
    label: " Finance - Corporate Finance/Investment/Merchant Banking",
    options: [
      "Company Secretary",
      "Enterprise Risk Management",
      "Equity/Stock analysis",
      "Funds Management/Investment",
      "Investment Banking",
      "Investor Relations",
      "Management",
      "Stockbroking",
      "Treasury/Corporate Finance",
      "Others",
    ],
  },
  {
    label: " Finance - General/Cost Accounting ",
    options: [
      "Basic Accounting/Bookkeeping/Accounts Executive",
      "Financial Accounting & Reporting",
      "Management",
      "Management/Cost Accounting/Business Analyst",
      "Others",
    ],
  },
  {
    label: " Food Technology/Nutritionist",
    options: [
      "Consultant",
      "Dietitian/Nutritionist",
      "Food Technologist/Scientist",
      "Laboratory Assistant",
      "Management",
      "Quality Control/Assurance",
      "Others",
    ],
  },
  {
    label: " Food/Beverage/Restaurant Service",
    options: [
      "Barista",
      "Bartender",
      "Chef",
      "Food Preparation/Kitchen Hand",
      "Management",
      "Restaurant Waiter",
      "Supervisor/Team Lead",
      "Others",
    ],
  },
  {
    label: " General Work (Housekeeper, Driver, Dispatch, Messenger, etc)",
    options: [
      "Air Conditioning Technician",
      "Automotive Technician",
      "Babysitter",
      "Brick Layer",
      "Carpenter",
      "Dispatcher",
      "Driver",
      "Electrician",
      "General Worker",
      "Housekeeper",
      "Janitor",
      "Landscaping/Gardening",
      "Maid",
      "Management",
      "Painter",
      "Plumber",
      "Tailor",
      "Others",
    ],
  },
  {
    label: " Geology/Geophysics",
    options: [
      "Geologist",
      "Geophysicist",
      "Laboratory Assistant",
      "Management",
      "Mining and Geological Engineer",
      "Researcher",
      "Others",
    ],
  },
  {
    label: " Healthcare - Doctor/Diagnosis",
    options: [
      "Anesthesiologist",
      "Cardiologist",
      "Dental Surgeon",
      "Gynecologist",
      "Ophthalmologist",
      "Other Medical specialist",
      "Pediatrician",
      "Physician/General Practitioner",
      "Psychiatrist",
      "Surgeon",
      "Urologist",
      "Veterinarian",
    ],
  },
  {
    label: " Healthcare - Nurse/Medical Support &amp; Assistant",
    options: [
      "Chiropractor",
      "Clinical Laboratory Assistant/Technician",
      "Management",
      "Medical Examiner",
      "Medical Officer/Paramedic",
      "Medical Transcriptionist",
      "Medical/Clinical Research",
      "Midwife",
      "Nurse",
      "Optometrist",
      "Other Therapist",
      "Pathologist",
      "Physiotherapist",
      "Radiographer",
      "Sonographer",
      "Others",
    ],
  },
  {
    label: " Healthcare - Pharmacy",
    options: [
      "Laboratory Assistant",
      "Management",
      "Pharmacist",
      "Pharmacy Technician",
      "Quality Control/Assurance",
      "Researcher",
      "Others",
    ],
  },
  {
    label: " Hotel Management/Tourism Services",
    options: [
      "Casino Dealer",
      "Casino Operation",
      "Cruise Operation",
      "Front Office",
      "Hotel Concierge",
      "Hotel Housekeeping",
      "Hotel Manager",
      "Management",
      "Supervisor/Team Lead",
      "Ticketing",
      "Tour Guide",
      "Travel Coordinator/Agent",
      "Others",
    ],
  },
  {
    label: " Human Resources",
    options: [
      "Compensation & Benefits",
      "Employee/Labour Relation",
      "General HR",
      "Health & Safety",
      "Management",
      "Organizational Development/Change Management",
      "Payroll Officer",
      "Recruitment/Staffing",
      "Others",
    ],
  },
  {
    label: " IT/Computer - Hardware",
    options: [
      "Computer Hardware Engineer",
      "Consultant",
      "IT Trainer",
      "Management",
      "Product Management",
      "Project Management",
      "Quality Control/Assurance",
      "Supervisor/Team Lead",
      "Technical Support",
      "Technical Writer",
      "Technician",
      "Others",
    ],
  },
  {
    label: " IT/Computer - Network/System/Database Admin",
    options: [
      "Database Administrator",
      "Infrastructure Security",
      "IT Auditor",
      "IT Executive/MIS",
      "IT Trainer",
      "Management",
      "Network/System Engineer",
      "Product Management",
      "Project Management",
      "Quality Control/Assurance",
      "Supervisor/Team Lead",
      "System Administrator",
      "Technical Writer",
      "Others",
    ],
  },
  {
    label: " IT/Computer - Software",
    options: [
      "Data Scientist",
      "Functional Consultant/Business Analyst",
      "IT Auditor",
      "Management",
      "Product Management",
      "Project Management",
      "Researcher",
      "Software Architect",
      "Software Engineer/Programmer",
      "Software Quality Assurance",
      "Software Security",
      "Software/Application Trainer",
      "Supervisor/Team Lead",
      "System Analyst",
      "Technical Writer",
      "UI/UX Designer",
      "Others",
    ],
  },
  {
    label: " Journalist/Editor",
    options: [
      "Editor",
      "Journalist/Writer",
      "Management",
      "Researcher",
      "Supervisor/Team Lead",
      "Translator",
      "Others",
    ],
  },
  {
    label: " Law/Legal Services",
    options: [
      "Chambering Student/Intern",
      "Company Secretary",
      "Compliance Officer",
      "Contracts Management",
      "Corporate Governance Officer",
      "Law Clerk",
      "Lawyer",
      "Legal Assistant/Paralegal",
      "Management",
      "Patent/Trademark Attorney",
      "Others",
    ],
  },
  {
    label: " Logistics/Supply Chain",
    options: [
      "Analyst/Consultant",
      "Freight Forwarding",
      "Logistics",
      "Management",
      "Shipping ",
      "Shipping Operation",
      "Supervisor/Team Lead",
      "Supply Chain",
      "Warehouse",
      "Others",
    ],
  },
  {
    label: " Maintenance/Repair (Facilities &amp; Machinery)",
    options: [
      "Building/Facilities Maintenance",
      "Machinery Maintenance",
      "Management",
      "Supervisor/Team Lead",
      "Others",
    ],
  },
  {
    label: " Manufacturing/Production Operations",
    options: [
      "CAD-CAM/Drafter",
      "Industrial/Product Designer",
      "Management",
      "Mold Designer",
      "Precision Machinist",
      "Process Engineer",
      "Production Technician/Operator",
      "Project Management",
      "R&D Engineer",
      "Supervisor/Team Lead",
      "Technical Writer",
      "Test Engineer",
      "Toolmaker/Machinist",
      "Welder",
      "Others",
    ],
  },
  {
    label: " Marketing/Business Development",
    options: [
      "Brand Management",
      "Business Development",
      "Event Management",
      "Management",
      "Market Research",
      "Marketing Executive",
      "Product Management",
      "Others",
    ],
  },
  {
    label: " Merchandising",
    options: [
      "Merchandiser",
      "Merchandising Manager",
      "Visual Merchandiser",
      "Others",
    ],
  },
  {
    label: " Personal Care/Beauty/Fitness Service",
    options: [
      "Beautician/Makeup Artist",
      "Fitness Instructor",
      "Hair Dresser",
      "Management",
      "Massage Therapist",
      "Others",
    ],
  },
  {
    label: " Process Design &amp; Control/Instrumentation",
    options: ["Control System Engineer", "Instrumentation Engineer"],
  },
  {
    label: " Property/Real Estate",
    options: [
      "Analyst/Consultant",
      "Management",
      "Property Development",
      "Property Leasing",
      "Property Management",
      "Property Sales",
      "Property Valuation",
      "Real Estate Negotiator",
      "Others",
    ],
  },
  {
    label: " Public Relations/Communications",
    options: ["Marketing Communication", "Public Relations"],
  },
  {
    label: " Publishing/Printing",
    options: ["Management", "Printing Machine Operator/Technician", "Others"],
  },
  {
    label: " Purchasing/Inventory/Material &amp; Warehouse Management",
    options: [
      "Analyst/Consultant",
      "Inventory Control",
      "Management",
      "Material Planner",
      "Purchasing",
      "Supervisor/Team Lead",
      "Warehouse",
      "Others",
    ],
  },
  {
    label: " Quality Control/Assurance",
    options: ["Quality Control/Assurance"],
  },
  {
    label: " Quantity Surveying",
    options: ["Quantity Surveyor"],
  },
  {
    label: " Sales - Corporate",
    options: [
      "Distributor/Channel Sales",
      "Management",
      "Pre Sales Consultant",
      "Regional Sales",
      "Sales Executive/Account Manager ",
      "Sales Support Coordinator",
      "Supervisor/Team Lead",
      "Others",
    ],
  },
  {
    label: " Sales - Engineering/Technical/IT",
    options: [
      "Management",
      "Pre Sales Consultant",
      "Sales Engineer",
      "Sales Executive/Account Manager",
      "Supervisor/Team Lead",
      "Others",
    ],
  },
  {
    label: " Sales - Financial Services (Insurance, Unit Trust, etc)",
    options: [
      "Financial Services Consultant",
      "Insurance Agent",
      "Management",
      "Sales Agent (Other financial services)",
      "Supervisor/Team Lead",
      "Others",
    ],
  },
  {
    label: " Sales - Retail/General",
    options: [
      "Cashier",
      "Management",
      "Sales Executive",
      "Supervisor/Team Lead",
      "Others",
    ],
  },
  {
    label: " Sales - Telesales/Telemarketing",
    options: [
      "Management",
      "Sales Support Coordinator",
      "Supervisor/Team Lead",
      "Telesales Consultant",
      "Telesales Executive/Account Manager",
      "Others",
    ],
  },
  {
    label: " Science &amp; Technology/Laboratory",
    options: [
      "Laboratory Assistant",
      "Management",
      "Quality Control/Assurance",
      "Researcher/Scientist",
      "Supervisor/Team Lead",
      "Others",
    ],
  },
  {
    label: " Secretarial/Executive &amp; Personal Assistant",
    options: ["Management", "Secretary/Personal Assistant", "Others"],
  },
  {
    label: " Security/Armed Forces/Protective Services",
    options: [
      "Fire Fighter",
      "Lifeguard",
      "Management",
      "Police Officer",
      "Security Officer",
      "Soldier/Army",
      "Others",
    ],
  },
  {
    label: " Social &amp; Counselling Service",
    options: ["Counselor", "Management", "Social Worker", "Others"],
  },
  {
    label: " Technical &amp; Helpdesk Support",
    options: ["IT Support/Helpdesk"],
  },
  {
    label: " Training &amp; Development",
    options: ["Training & Development"],
  },
  {
    label: "Other",
    options: ["Others"],
  },
];

const industries = [
  "Accounting / Audit / Tax Services",
  "Advertising / Marketing / Promotion / PR",
  "Aerospace / Aviation / Airline",
  "Agricultural / Plantation / Poultry / Fisheries",
  "Architectural Services / Interior Designing",
  "Arts / Design / Fashion",
  "Automobile / Automotive Ancillary / Vehicle",
  "Banking / Financial Services",
  "BioTechnology / Pharmaceutical / Clinical research",
  "Call Center / IT-Enabled Services / BPO",
  "Chemical / Fertilizers / Pesticides",
  "Computer / Information Technology (Hardware)",
  "Computer / Information Technology (Software)",
  "Construction / Building / Engineering",
  "Consulting (Business &amp; Management)",
  "Consulting (IT, Science, Engineering &amp; Technical)",
  "Consumer Products / FMCG",
  "Electrical &amp; Electronics",
  "Entertainment / Media",
  "Environment / Health / Safety",
  "Exhibitions / Event management / MICE",
  "Food &amp; Beverage / Catering / Restaurant",
  "General &amp; Wholesale Trading",
  "Grooming / Beauty / Fitness",
  "Heavy Industrial / Machinery / Equipment",
  "Human Resources Management / Consulting",
  "Manufacturing / Production",
  "Non-Profit Organisation / Social Services / NGO",
  "Oil / Gas / Petroleum",
  "Polymer / Plastic / Rubber / Tyres",
  "Printing / Publishing",
  "Property / Real Estate",
  "Repair &amp; Maintenance Services",
  "Science &amp; Technology",
  "Security / Law Enforcement",
  "Semiconductor/Wafer Fabrication",
  "Stockbroking / Securities",
  "Transportation / Logistics",
];

const positionLevels = [
  "CEO / GM / Director / Senior Manager",
  "Manager / Assistant Manager",
  "Supervisor / Coordinator",
  "Staff (non-management &amp; non-supervisor)",
  "Fresh Grad / Less than 1 year experience",
];

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
