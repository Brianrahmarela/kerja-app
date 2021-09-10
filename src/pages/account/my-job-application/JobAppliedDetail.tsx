import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  faDownload,
  faPaperclip,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Col, Divider, Row, Space, Typography } from "antd";
import React, { Component } from "react";

export default class JobAppliedDetail extends Component {
  render() {
    return (
      <Card
        style={{ width: "100%" }}
        title={
          <>
            <ArrowLeftOutlined
              style={{ cursor: "pointer" }}
              onClick={() =>
                (window.location.hash = "/app/profile/my-job-application")
              }
            />
          </>
        }
        extra={
          <Space>
            <Button
              size="small"
              type="primary"
              style={{ backgroundColor: "#12D4E2", borderColor: "#12D4E2" }}
              icon={
                <FontAwesomeIcon
                  icon={faDownload}
                  style={{ marginRight: 5, marginLeft: 5 }}
                />
              }
            ></Button>

            <Button
              size="small"
              type="primary"
              style={{ backgroundColor: "#C1C0BA", borderColor: "#C1C0BA" }}
              icon={
                <FontAwesomeIcon icon={faTrash} style={{ marginRight: 5 }} />
              }
            >
              Withdraw
            </Button>
          </Space>
        }
      >
        <Col>
          <Typography.Title level={4}>System Architect</Typography.Title>
          <Typography.Text>Great Eastern Life (GELINDO) </Typography.Text>
        </Col>
        <Row justify="space-between">
          <Col>
            <Button size="large" type="link">
              <FontAwesomeIcon icon={faPaperclip} style={{ marginRight: 5 }} />{" "}
              Submit Application
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Row style={{ marginTop: 20 }}>
              <Col span={6}>
                <Typography.Text>Received on</Typography.Text>
              </Col>
              <Col span={18}>
                : <Typography.Text>s</Typography.Text>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Typography.Text>Number of Applicant</Typography.Text>
              </Col>
              <Col span={18}>
                : <Typography.Text>s</Typography.Text>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Typography.Text>Role</Typography.Text>
              </Col>
              <Col span={18}>
                : <Typography.Text>s</Typography.Text>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Typography.Text>Position Level</Typography.Text>
              </Col>
              <Col span={18}>
                : <Typography.Text>s</Typography.Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider />
        <div>
          <strong>
            <Typography.Link>Posted 1 hour ago</Typography.Link>
          </strong>
        </div>
        <div>
          <Button
            type="primary"
            style={{
              backgroundColor: "#606770",
              borderColor: "#606770",
              borderRadius: 10,
              fontSize: 21,
              height: 50,
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            Job Description
          </Button>
          <div>
            <Typography.Title level={4}>Responsibilities</Typography.Title>
            <ul>
              <li>
                • Plan and design soil instrumentation and site investigation.
              </li>
              <li>
                • Coordinate, supervise and manage the site investigation work.
              </li>
              <li>
                • Carry out C&S design and geotechnical design (stability and
                stress analysis).
              </li>
              <li>
                • Carry out interpretation and assessment on ground improvement
                works.
              </li>
              <li>
                • Prepare GIR, design report and make submissions to relevant
                authorities.
              </li>
              <li>• Prepare tender documents, technical specification.</li>
              <li>
                • Ensure all engineering works comply with all relevant
                statutory standards, regulations and Codes of Practice.
              </li>
            </ul>
            <Typography.Title level={4}>Requierment</Typography.Title>
            <ul>
              <li>
                • Plan and design soil instrumentation and site investigation.
              </li>
              <li>
                • Coordinate, supervise and manage the site investigation work.
              </li>
              <li>
                • Carry out C&S design and geotechnical design (stability and
                stress analysis).
              </li>
              <li>
                • Carry out interpretation and assessment on ground improvement
                works.
              </li>
              <li>
                • Prepare GIR, design report and make submissions to relevant
                authorities.
              </li>
              <li>• Prepare tender documents, technical specification.</li>
              <li>
                • Ensure all engineering works comply with all relevant
                statutory standards, regulations and Codes of Practice.
              </li>
            </ul>
          </div>
          <div>
            <Typography.Title level={5}>
              Additional Information
            </Typography.Title>
            <Row justify="center">
              <Col span={4}>
                <strong>Career Level</strong>
              </Col>
              <Col span={20}>: Senior Executive </Col>
            </Row>
            <Row justify="center">
              <Col span={4}>
                <strong>Qualification</strong>
              </Col>
              <Col span={20}>: Senior Executive </Col>
            </Row>
            <Row justify="center">
              <Col span={4}>
                <strong>Years of Experience</strong>
              </Col>
              <Col span={20}>: Senior Executive </Col>
            </Row>
            <Row justify="center">
              <Col span={4}>
                <strong>Job Type</strong>
              </Col>
              <Col span={20}>: Job Specializations </Col>
            </Row>
          </div>
          <Divider />
          <div>
            <Button
              type="primary"
              size="large"
              style={{
                backgroundColor: "#606770",
                borderColor: "#606770",
                borderRadius: 10,
                fontSize: 21,
                height: 50,
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              Company Overview
            </Button>
            <Typography.Title level={5}>Overview</Typography.Title>
            <Typography.Paragraph>
              Surbana Jurong is one of the largest Asia-based urban and
              infrastructure consulting firms. Leveraging technology and
              creativity, Surbana Jurong provides best-in-class consultancy
              solutions across the entire value chain of the urbanisation,
              industrialisation and infrastructure domains. Headquartered in
              Singapore, the Surbana Jurong Group has a global workforce of over
              16,000 employees in more than 120 offices across over 40 countries
              in Asia, Australia, UK, the Middle East, Africa and the Americas,
              and an annual turnover of around S$1.7 billion. Surbana Jurong has
              a track record of close to 70 years, and has built more than a
              million homes in Singapore, crafted master plans for more than 30
              countries and developed over 100 industrial parks globally.
              Surbana Jurong’s motto ‘Building Cities, Shaping Lives’ reflects
              its belief that development is more than just steel and concrete.
              Surbana Jurong creates spaces and designs infrastructure where
              people live, work and play, shaping cities into homes with
              sustainable jobs where communities and businesses can flourish.
            </Typography.Paragraph>
          </div>
          <div>
            <Typography.Title level={5}>
              Additional Information
            </Typography.Title>
            <Row justify="center">
              <Col span={4}>
                <strong>Career Level</strong>
              </Col>
              <Col span={20}>: Senior Executive </Col>
            </Row>
            <Row justify="center">
              <Col span={4}>
                <strong>Qualification</strong>
              </Col>
              <Col span={20}>: Senior Executive </Col>
            </Row>
            <Row justify="center">
              <Col span={4}>
                <strong>Years of Experience</strong>
              </Col>
              <Col span={20}>: Senior Executive </Col>
            </Row>
            <Row justify="center">
              <Col span={4}>
                <strong>Job Type</strong>
              </Col>
              <Col span={20}>: Job Specializations </Col>
            </Row>
          </div>
        </div>
      </Card>
    );
  }
}
