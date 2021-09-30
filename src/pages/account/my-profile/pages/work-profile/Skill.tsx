import { faPencilAlt, faPlusSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AutoComplete, Button, Card, Col, Form, Modal, Row, Select, Skeleton, Typography } from "antd";
import { AxiosResponse } from "axios";
import { Formik } from "formik";
import React from "react";
import { getSkills, postSkill } from "../../../../../repository/WorkerRepo";
import * as yup from "yup";

interface SkillProps {}

interface SkillState {
    pageReady: boolean;
    showForm: boolean;
    beginner: any[];
    intermediate: any[];
    advance: any[];
    skillOptions: any[];
    formData: any[];
}

class Skill extends React.Component<SkillProps, SkillState> {
    state = {
        pageReady: false,
        showForm: false,
        beginner: [],
        intermediate: [],
        advance: [],
        formData: [
            {
                skillName: "",
                level: "BEGINNER",
                id: undefined,
            },
        ] as any[],
        skillOptions: [],
    };
    componentDidMount() {
        this.getData();
    }
    getData() {
        this.setState({
            pageReady: false,
        });
        getSkills()
            .then((res: AxiosResponse<any>) => {
                const ordered = res.data.map((a: any) => {
                    a.editMode = false;
                    return a;
                });
                this.setState({
                    formData: ordered,
                    beginner: res.data.filter((val: any) => val.level === "BEGINNER").map((val: any) => val.skillName),
                    intermediate: res.data.filter((val: any) => val.level === "INTERMEDIATE").map((val: any) => val.skillName),
                    advance: res.data.filter((val: any) => val.level === "ADVANCE").map((val: any) => val.skillName),
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
        const { showForm, beginner, intermediate, advance, pageReady } = this.state;
        const skillLIst: any = [];
        if (beginner.length > 0) {
            skillLIst.push(beginner.join(","));
        }
        if (intermediate.length > 0) {
            skillLIst.push(intermediate.join(","));
        }
        if (advance.length > 0) {
            skillLIst.push(advance.join(","));
        }

        return (
            <>
                <Card id="skill" style={{ marginTop: 20 }}>
                    <Row justify="space-between">
                        <Col span={20}>
                            <Typography.Title level={4}>Skills</Typography.Title>
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
                    <Row gutter={[20, 20]} style={{ marginTop: 20 }}>
                        <Skeleton active loading={pageReady === false}>
                            {beginner.length > 0 && (
                                <Col span={24} style={{ padding: 10 }}>
                                    <Typography.Title level={5}>BEGINNER</Typography.Title>
                                    <Typography.Text>{beginner.join(", ")}</Typography.Text>
                                </Col>
                            )}
                            {intermediate.length > 0 && (
                                <Col span={24} style={{ padding: 10 }}>
                                    <Typography.Title level={5}>INTERMEDIATE</Typography.Title>
                                    <Typography.Text>{intermediate}</Typography.Text>
                                </Col>
                            )}
                            {advance.length > 0 && (
                                <Col span={24} style={{ padding: 10 }}>
                                    <Typography.Title level={5}>ADVANCE</Typography.Title>
                                    <Typography.Text>{advance}</Typography.Text>
                                </Col>
                            )}
                        </Skeleton>
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
                                skillName: yup.string().required("This field is required"),
                            })
                        )}
                        onSubmit={(values, { setSubmitting }) => {
                            console.log(values);
                            postSkill(values)
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
                        {({ values, errors, touched, setFieldTouched, setFieldValue, handleChange, handleBlur, isSubmitting, handleSubmit, setValues }: any) => (
                            <>
                                <Modal
                                    visible={showForm}
                                    title="Fill your skill"
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
                                                    const skills: any[] = [...values];
                                                    skills.push({
                                                        id: undefined,
                                                        skillName: "",
                                                        level: "BEGINNER",
                                                    });
                                                    this.setState({ formData: skills });
                                                }}
                                            >
                                                Add
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row justify="start" gutter={15}>
                                        <Col span={10}>Skill Name</Col>
                                        <Col span={10}>Level</Col>
                                        <Col span={4}></Col>
                                    </Row>
                                    {values.map((skill: any, index: number) => (
                                        <Form.Item key={index} help={errors[index]?.skillName} validateStatus={errors[index]?.skillName && touched[index]?.skillName ? "error" : ""}>
                                            <Row gutter={15}>
                                                <Col span={10}>
                                                    <AutoComplete
                                                        value={skill.skillName}
                                                        onSearch={(e) => {
                                                            // getSkillName(e).then((res: AxiosResponse<any>) => {
                                                            //   this.setState({ skillOptions: res.data });
                                                            // });
                                                        }}
                                                        onSelect={(e) => {
                                                            setFieldValue(`${index}.skillName`, e);
                                                            setFieldTouched(`${index}.skillName`, true);
                                                        }}
                                                        onChange={(e) => {
                                                            setFieldValue(`${index}.skillName`, e);
                                                            setFieldTouched(`${index}.skillName`, true);
                                                        }}
                                                    >
                                                        {this.state.skillOptions.map((val: string) => (
                                                            <AutoComplete.Option key={val} value={val}>
                                                                {val}
                                                            </AutoComplete.Option>
                                                        ))}
                                                    </AutoComplete>
                                                </Col>
                                                <Col span={8}>
                                                    <Select
                                                        value={skill.level}
                                                        onChange={(e) => {
                                                            setFieldValue(`${index}.level`, e);
                                                            setFieldTouched(`${index}.level`, true);
                                                        }}
                                                    >
                                                        <Select.Option value={"BEGINNER"}>BEGINNER</Select.Option>
                                                        <Select.Option value={"INTERMEDIATE"}>INTERMEDIATE</Select.Option>
                                                        <Select.Option value={"ADVANCE"}>ADVANCE</Select.Option>
                                                    </Select>
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
                                                                    values.splice(index, 1);
                                                                    setValues(values);
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

export default Skill;
