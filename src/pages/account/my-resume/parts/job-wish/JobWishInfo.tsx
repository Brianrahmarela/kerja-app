import { Component } from "react";
import { Col, Divider, Modal, Row, Typography } from "antd";
import { getJobWish } from "../../../../../repository/WorkerRepo";
import { AxiosResponse } from "axios";
interface IProps {
  t?: (x: any) => void;
}
interface IState {
  jobWishData: any;
  pageReady: boolean;
}
export default class JobWishInfo extends Component<IProps, IState> {
  state = {
    pageReady: false,
    jobWishData: {
      id: null,
      currency: null,
      salary: 0,
      location: null,
      trainingDevelopment: null,
      benefit: null,
    },
  };
  componentDidMount() {
    getJobWish()
      .then((res: AxiosResponse<any>) => {
        const { data } = res;
        const newData = {
          currency: data.currency || "IDR",
          salary: data.salary || 0,
          location: data.location || "",
          trainingDevelopment: data.trainingDevelopment || "",
          benefit: data.benefit || "",
        };
        this.setState({ jobWishData: newData });
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
    const { jobWishData } = this.state;
    return (
      <div>
        <Divider />

        <Row style={{ marginTop: 20 }}>
          <Col span={8}>
            <Typography.Text>Expected Salary</Typography.Text>
          </Col>
          <Col span={16}>
            :{" "}
            <Typography.Text>
              {jobWishData.currency}{" "}
              {jobWishData.salary
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </Typography.Text>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Typography.Text>Preferred Work Location </Typography.Text>
          </Col>
          <Col span={16}>
            : <Typography.Text>{jobWishData.location}</Typography.Text>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Typography.Text>Benefit Wish</Typography.Text>
          </Col>
          <Col span={16}>
            : <Typography.Text>{jobWishData.benefit}</Typography.Text>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Typography.Text>Training and Development</Typography.Text>
          </Col>
          <Col span={16}>
            :{" "}
            <Typography.Text>{jobWishData.trainingDevelopment}</Typography.Text>
          </Col>
        </Row>
      </div>
    );
  }
}
