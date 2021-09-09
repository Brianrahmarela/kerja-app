import React, { Component } from 'react'
import ProductExplore from '../../../assets/image/product-explore.svg';
import IlusProductExplore from '../../../assets/image/ilus-product-explore.svg';
import { Typography, Image, Row, Col, } from 'antd';
const { Title, Text } = Typography;

export class ProductExp extends Component {
  render() {
    return (
      <div className="containerImgExp">
        <Image
          src={ProductExplore}
          preview={false}
          id="productexplore"
        />

        <Row justify="center" style={{ paddingTop: 30 }}>

          <Col span={24}>

            <Title className="titleproductexp">Product Explanation</Title>
          </Col>
          <Col span={24}>

            <Row justify="center">
              <div className="stroketitle"></div>
            </Row>
          </Col>
        </Row>
        {/* </Row> */}
        <Row justify="center">
          <Col xs={20} lg={16} xl={16} xxl={15} className="textproductexp" style={{ marginBottom: 10 }}>

            <Text >
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.

            </Text>
          </Col>

        </Row>
        <Row justify="center">
          <Col xs={20} lg={16} xl={16} xxl={15} className="textproductexp" >

            <Text>
              Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie.
            </Text>
          </Col>

        </Row>

        <Row justify="center">

          <Image
            src={IlusProductExplore}
            preview={false}
            id="ilusproductexplore"
          // height={416.71}
          />
        </Row>
      </div>
    )
  }
}

export default ProductExp
