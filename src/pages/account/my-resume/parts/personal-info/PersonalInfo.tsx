import { Component } from "react";
import { Col, Divider, Modal, Row, Spin, Typography } from "antd";
import { AxiosResponse } from "axios";
import { getPersonal } from "../../../../../repository/WorkerRepo";
import moment from "moment";
interface IProps {
    t?: (x: any) => void;
}
interface IState {
    personalInfo: any;
    pageReady: boolean;
}
export default class PersonalInfo extends Component<IProps, IState> {
    state = {
        pageReady: false,
        personalInfo: {
            formData: {
                firstName: "",
                lastName: "",
                placeOfBirth: "",
                dateOfBirth: "",
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
        },
    };
    componentDidMount() {
        getPersonal()
            .then((res: AxiosResponse<any>) => {
                const { data } = res;
                const newData = {
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    placeOfBirth: data.placeOfBirth || "",
                    dateOfBirth: data.dateOfBirth || "-",
                    gender: data.gender || "",
                    email: data.email || "",
                    phoneNumber: data.phoneNumber || "",
                    otherPhoneNumber: data.otherPhoneNumber || "",
                    nationality: data.nationality || "",
                    country: data.country || "",
                    region: data.region || "",
                    address: data.address || "",
                    province: data.province || "",
                    city: data.city || "",
                    subdistrict: data.subdistrict || "",
                    postalcode: data.postalcode || "",
                    identityType: data.identityType || "ID_CARD",
                    identityNo: data.identityNo || "",
                };
                this.setState({ personalInfo: newData });
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
        const { personalInfo, pageReady }: any = this.state;
        if (pageReady === false) {
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
                <Row>
                    <Col span={6}>
                        <Typography.Text>Name</Typography.Text>
                    </Col>
                    <Col span={18}>
                        : <Typography.Text>{personalInfo.firstName + " " + personalInfo.lastName}</Typography.Text>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Typography.Text>Gender</Typography.Text>
                    </Col>
                    <Col span={18}>
                        : <Typography.Text>{personalInfo.gender}</Typography.Text>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Typography.Text>Contact</Typography.Text>
                    </Col>
                    <Col span={18}>
                        : <Typography.Text>{personalInfo.phoneNumber}</Typography.Text>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Typography.Text>Email</Typography.Text>
                    </Col>
                    <Col span={18}>
                        : <Typography.Text>{personalInfo.email}</Typography.Text>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Typography.Text>Birth of Date</Typography.Text>
                    </Col>
                    <Col span={18}>
                        :{" "}
                        <Typography.Text>
                            {personalInfo.placeOfBirth || "-"}, {personalInfo.dateOfBirth ? moment(personalInfo.dateOfBirth).format("ll") : "-"}
                        </Typography.Text>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Typography.Text>Address</Typography.Text>
                    </Col>
                    <Col span={18}>
                        : <Typography.Text>{personalInfo.address}</Typography.Text>
                    </Col>
                </Row>
            </div>
        );
    }
}
