import { Component } from "react";
import { Col, Divider, Modal, Row, Typography } from "antd";
import { getPrivacySetting } from "../../../../../repository/WorkerRepo";
import { AxiosResponse } from "axios";
interface IProps {
  t?: (x: any) => void;
}
interface IState {
  privacySettingData: any;
  pageReady: boolean;
}
export default class PrivacySettingInfo extends Component<IProps, IState> {
  state = {
    pageReady: false,
    privacySettingData: {
      currency: "IDR",
      searchable: "",
      seeConnection: "",
      allowedPrivacy: "[]",
      notification: "",
      language: "en",
    },
  };
  componentDidMount() {
    getPrivacySetting()
      .then((res: AxiosResponse<any>) => {
        const { data } = res;
        const newData = {
          currency: data.currency || "IDR",
          searchable: data.searchable || 0,
          seeConnection: data.seeConnection || "",
          notification: data.notification || "",
          allowedPrivacy: data.allowedPrivacy || "[]",
          language: data.language || "en",
        };
        this.setState({ privacySettingData: newData });
      })
      .catch((error) => {
        Modal.error({
          title: `Error`,
          // content : error.response.data.message
          content: error.response?.data?.message || error.message || "-",
        });
      })
      .finally(() => {
        this.setState({ pageReady: true });
      });
  }
  render() {
    const { privacySettingData } = this.state;
    return (
      <div>
        <Divider />

        <Row style={{ marginTop: 20 }}>
          <Col span={8}>
            <Typography.Text>Language</Typography.Text>
          </Col>
          <Col span={16}>
            : <Typography.Text>{privacySettingData.language} </Typography.Text>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Typography.Text>Profile viewing options</Typography.Text>
          </Col>
          <Col span={16}>
            :{" "}
            <Typography.Text>
              {(privacySettingData.allowedPrivacy &&
                JSON.parse(privacySettingData.allowedPrivacy).join(",")) ||
                ""}
            </Typography.Text>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Typography.Text>Who can see your connections</Typography.Text>
          </Col>
          <Col span={16}>
            :{" "}
            <Typography.Text>
              {privacySettingData.seeConnection}
            </Typography.Text>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Typography.Text>Seachable</Typography.Text>
          </Col>
          <Col span={16}>
            :{" "}
            <Typography.Text>
              {privacySettingData.searchable ? "Yes" : "No"}
            </Typography.Text>
          </Col>
        </Row>
      </div>
    );
  }
}
