import React, { Component } from 'react';
import { Row, Col, Typography } from 'antd';
const { Text } = Typography;
export class FooterMenu extends Component {
  render() {
    return (
      <div>
        <Row justify='center' style={{ marginTop: 52, color: 'white' }}>
          <Col span={1} md={1} lg={1}></Col>
          <Col span={4} xs={24} md={7} lg={7} style={{ fontFamily: 'Open Sans', fontSize: 18, textAlign: 'left', marginBottom: 20 }} className="footerleft">
            <Row >
              <Text style={{ color: "white" }}>FIND US</Text>
            </Row>
            <Row>
              <Text style={{ color: "white" }}>Call Center :</Text>
            </Row>
            <Row>
              <Text style={{ color: "white" }}>+6282118600088</Text>
            </Row>
            <Row>
              <Text style={{ color: "white" }}>Email</Text>
            </Row>
            <Row>
              <Text style={{ color: "white" }}>info@talenthrm.com</Text>
            </Row>
          </Col>
          <Col span={8} xs={24} md={11} lg={11} style={{ fontFamily: 'Open Sans', fontSize: 18, color: "white", textAlign: 'left', marginBottom: 20 }} className="footercenter">
            <Row>
              <Text style={{ color: "white" }}>Address</Text>
            </Row>
            <Row>
              <Text style={{ color: "white" }}>Menara office</Text>
            </Row>
            <Row>
              <Text style={{ color: "white" }}>Sahid Sudirman Residence, Unit LG/03/Off</Text>
            </Row>
            <Row>
              <Text style={{ color: "white" }}>Jl. Jendral Sudirman No. 86 RT.10/RW.11,</Text>
            </Row>
            <Row>
              <Text style={{ color: "white" }}>Karet Tengsin, Jakarta Pusat – 10220</Text>
            </Row>
          </Col>
          <Col span={4} xs={24} md={5} lg={5} style={{ fontFamily: 'Open Sans', fontSize: 18, color: "white", textAlign: 'left', marginBottom: 20 }} className="footerright">
            <Row>
              <Text style={{ color: "white" }}>Hours</Text>
            </Row>
            <Row>
              <Text style={{ color: "white" }}>Monday—Friday:</Text>
            </Row>
            <Row>
              <Text style={{ color: "white" }}>9:00AM–5:00PM</Text>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: 47 }} justify='center'>
          <Col span={1}>
          </Col>
          <Col >
            <Text style={{ fontFamily: 'Open Sans', fontWeight: 300, color: "white" }} className="copyright">Copyright © KerjaApp. Trademarks belong to their respective owners. All rights reserved.Persyaratan | Layanan | Kebijakan KerjaApp</Text>
          </Col>
        </Row>
      </div>
    )
  }
}

export default FooterMenu
