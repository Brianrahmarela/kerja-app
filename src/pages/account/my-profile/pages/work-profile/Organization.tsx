import { faMapMarkerAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button, Card, Col, Form, Input, Modal, Row, Skeleton, Space, Typography } from "antd";
import { AxiosResponse } from "axios";
import { Formik } from "formik";
import moment from "moment";
import React from "react";
import { getOrganizations } from "../../../../../repository/WorkerRepo";

interface OrganizationProps {}

interface OrganizationState {
    showForm: boolean;
    pageReady: boolean;
    organizations: any[];
}

class Organization extends React.Component<OrganizationProps, OrganizationState> {
    state = {
        showForm: false,
        pageReady: false,
        organizations: [] as any[],
    };
    componentDidMount() {
        this.getData();
    }
    getData() {
        this.setState({ pageReady: false });
        getOrganizations()
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
                    organizations: ordered,
                });
            })
            .catch((error) => {})
            .finally(() => {
                this.setState({ pageReady: true });
            });
    }
    render() {
        const { showForm, pageReady, organizations } = this.state;
        return (
            <>
                <Card id="organization" style={{ marginTop: 20 }}>
                    <Row justify="space-between">
                        <Col span={20}>
                            <Typography.Title level={4}>Organization</Typography.Title>
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
                            <Skeleton active loading={pageReady === false} title>
                                {organizations.map((v: any, i: number) => (
                                    <Row style={{ marginBottom: 15 }}>
                                        <Col span={3}>
                                            <Avatar size={50} src={v.logo} />
                                        </Col>
                                        <Col span={21}>
                                            <div>
                                                <Space>
                                                    <Typography.Text strong>{v.name}</Typography.Text>
                                                    <Typography.Text>
                                                        {" "}
                                                        {moment(v.joinDate).format("YYYY")} - {(v.present && "present") || moment(v.endDate).format("YYYY")}
                                                    </Typography.Text>
                                                </Space>
                                            </div>

                                            <Space>
                                                <Typography.Text>{v.membership}</Typography.Text>
                                            </Space>
                                        </Col>
                                    </Row>
                                ))}
                            </Skeleton>
                        </Col>
                    </Row>
                </Card>
                {showForm && this.renderForm()}
            </>
        );
    }
    renderForm() {
        const { showForm } = this.state;
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
                    <Form layout="vertical">
                        <Formik
                            enableReinitialize
                            initialValues={{
                                description: "",
                                currency: "IDR",
                                salary: 0,
                                locations: [],
                                likes: [],
                                hobbies: [],
                            }}
                            onSubmit={() => {}}
                        >
                            {({ errors, touched, values, handleChange, handleBlur, setFieldValue, setFieldTouched, handleSubmit, isSubmitting, dirty }) => (
                                <>
                                    <Row gutter={[20, 20]}>
                                        <Col span={24}>
                                            <Form.Item
                                                label="Describe your self"
                                                validateStatus={errors.description && touched.description ? "error" : ""}
                                                help={errors.description && touched.description ? errors.description : null}
                                            >
                                                <Input.TextArea name="description" value={values.description} onChange={handleChange} onBlur={handleBlur} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </>
                            )}
                        </Formik>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default Organization;
