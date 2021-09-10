import React from "react";
import { withTranslation } from "react-i18next";
import bgLanding from '../../../assets/image/img-bg-landing.svg';
import { Image, Typography, Row, Col, Button, Space } from 'antd';
import IlusPeople from '../../../assets/image/ilus-people.svg';
import Banner from '../part/Banner';
import ProductExp from '../part/ProductExp';
import ProductFeatures from '../part/ProductFeatures';
import CustomerStories from '../part/CustomerStories';

const { Title, Text } = Typography;
export interface ContainerProps {
  t: (x: any) => any;
}
export interface ContainerState {
  pageReady: boolean;
}
export class Container extends React.Component<ContainerProps, ContainerState>{
  render() {
    const { t } = this.props;

    return (
      <div>
        <Image style={{ padding: 0, margin: "0px 0px 70px 0px", }}
          src={bgLanding}
          preview={false}
          id="imglanding"
        />
        <Row className="rowtextlanding">
          <Col xs={12} sm={7} md={7} lg={10} xl={7} xxl={7}>
            <Title id="titlelanding" style={{ fontFamily: 'Poppins' }}>{t("landing:title")}</Title>
          </Col>
          <Col xs={12} xl={17} xxl={17}></Col>
          <Row style={{ marginTop: 20 }}>
            <Space size={24.3} direction="vertical">
              <Col xs={17} md={10} sm={13} lg={11} span={9}>
                <Text id="subtitlelanding">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </Text>
              </Col>
              <Col>
                <div className="site-button-ghost-wrapper">
                  <Button type="primary" ghost style={{ fontFamily: 'Poppins', fontWeight: 400, borderRadius: 8, }} id="btnmulai">
                    {t("landing:start")}
                  </Button>
                </div>
              </Col>
            </Space>
          </Row>
        </Row>
        <Row className="rowiluspeoplelanding">
          <Image style={{ padding: 0, margin: 0, }}
            src={IlusPeople}
            preview={false}
            id="iluspeople"
            height={542.84}
          />
        </Row>
        <Banner />
        <ProductExp />
        <ProductFeatures />
        <CustomerStories t={t} />
      </div>
    )
  }
}

export default withTranslation()(Container);

