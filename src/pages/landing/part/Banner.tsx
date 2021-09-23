import React, { Component } from 'react'
import "react-slideshow-image/dist/styles.css";
import { Carousel, Col, Image, Row, } from "antd";
import Banner01 from '../../../assets/image/banner-01.png';
import Banner02 from '../../../assets/image/banner-02.png';
import Banner03 from '../../../assets/image/banner-03.png';

export interface BannerProps {
  t: (x: any) => any;
}
export interface BannerState {
  pageReady: boolean;
  slideImages: [];
}
export class Banner extends Component {
  render() {
    return (
      <div className="bannertop">
        <Carousel arrows={true} style={{ marginTop: 30, paddingBottom: 10 }}>
          <Row justify="center">
            <Col>
              <Image src={Banner01} alt="Banner01" preview={false} className="bannerimg" />
            </Col>
          </Row>
          <Row justify="center">
            <Col>
              <Image src={Banner02} alt="Banner02" preview={false} className="bannerimg" />
            </Col>
          </Row>
          <Row justify="center">
            <Col>
              <Image src={Banner03} alt="Banner03" preview={false} className="bannerimg" />
            </Col>
          </Row>
        </Carousel>
      </div>
    )
  }
}

export default Banner
