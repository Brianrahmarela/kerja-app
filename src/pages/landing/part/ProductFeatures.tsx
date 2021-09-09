import React, { Component, } from 'react'
import { Card, Row, Col, Typography, } from 'antd';

import IlusProduct1 from '../../../assets/svg/ilus-product1.svg';
import IlusProduct2 from '../../../assets/svg/ilus-product2.svg';
import IlusProduct3 from '../../../assets/svg/ilus-product3.svg';
const { Meta } = Card;
const { Title, } = Typography;

export class ProductFeatures extends Component {
  render() {
    return (
      <div>
        {/* ProductFeatures */}
        <Row justify="center" style={{ paddingTop: 30 }}>

          <Col span={24}>

            <Title className="titleproductexp">Product Features</Title>
          </Col>
          <Col span={24}>

            <Row justify="center">
              <div className="stroketitle"></div>
            </Row>
          </Col>
        </Row>
        <Row justify="center">
          {/* <Col xs={{ span: 20, offset: 4 }} lg={{ span: 6, offset: 2 }}> */}
          {/* <Col xs={{ span: 16, offset: 4 }} sm={{ span: 16, offset: 7 }}
            md={{ span: 10, offset: 2 }} lg={{ span: 6, offset: 1 }} xxl={{ span: 6, offset: 2 }} style={{ backgroundColor: "whitesmoke" }}> */}
          <Col >
            <Card
              hoverable
              style={{ width: 220, border: '2px solid #3FB6F5', borderRadius: 27, textAlign: "center", paddingTop: 20 }}
              cover={<img alt="example" src={IlusProduct1} height={224.28} />}
              className="spaceCardProduct"
            >
              <Meta title="1. Find Your Jobs" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor " />
            </Card>
          </Col>
          <Col >
            <Card
              hoverable
              style={{ width: 220, border: '2px solid #3FB6F5', borderRadius: 27, textAlign: "center", paddingTop: 20 }}
              cover={<img alt="example" src={IlusProduct2} height={224.28} />}
              className="spaceCardProduct"
            >
              <Meta title="2. Find Your Jobs" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor " />
            </Card>
          </Col>
          <Col >
            <Card
              hoverable
              style={{ width: 220, border: '2px solid #3FB6F5', borderRadius: 27, textAlign: "center", paddingTop: 60 }}
              cover={<img alt="example" src={IlusProduct3} height={184.28} />}
            >
              <Meta title="3. Find Your Jobs" description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor " />
            </Card>
          </Col>
        </Row>
        <Row justify="center" style={{ backgroundColor: "black" }}>
          {/* <Space size={72}> */}
          {/* <Col xs={24} lg={8}>

           
          </Col>
          <Col xs={24} lg={8}>

         
          </Col>
          <Col xs={24} lg={8}>

            
          </Col> */}
          {/* </Space> */}
        </Row>
      </div>
    )
  }
}

export default ProductFeatures
