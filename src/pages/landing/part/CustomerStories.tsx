import React, { Component } from 'react'
import { Card, Row, Col, Typography, Rate, Button, Image, } from 'antd';
import "react-slideshow-image/dist/styles.css";
import Customer01 from "../../../assets/image/customer-01.png";
import Customer02 from "../../../assets/image/customer-02.png";
import Customer03 from "../../../assets/image/customer-03.png";
import BtnGooglePlay from "../../../assets/svg/btn-google-play.svg";
import BtnAppStore from "../../../assets/svg/btn-app-store.svg";
import CloudBottom from "../../../assets/image/cloud-bottom.svg";
// import Prev from "../../../assets/svg/prev.svg";
// import Next from "../../../assets/svg/next.svg";
import { Url } from 'url';
const { Slide } = require("react-slideshow-image");
const { Title, Text } = Typography;
interface ImgCustomerProps {
  t: (x: any) => any;
  url?: Url;
}

interface ImgCustomerState {
  url: object[];
  // prevArrow: any;
  // nextArrow: any;
  // valSlide: Number;
}
export class CustomerStories extends Component<ImgCustomerProps, ImgCustomerState> {
  state: ImgCustomerState = {
    url: [
      {
        name: "Raymond",
        jabatan: "Product Manager di PT Asri Jaya",
        url: Customer01,
        value: 4.6,
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,",
      },
      {
        name: "Erlangga Y",
        jabatan: "Freelancer di PT Kencana",
        url: Customer02,
        value: 4.5,
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,"
      },
      {
        name: "Sheila Yuli",
        jabatan: "HR di PT Tulip",
        url: Customer03,
        value: 4.9,
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,"
      }
    ],
    // prevArrow: <div style={{ width: "30px", marginRight: "-30px" }}><Image src={Prev} preview={false} style={{ padding: 5, }} width={54} /></div>,
    // nextArrow: <div style={{ width: "30px", marginLeft: "-50px" }}><Image src={Next} preview={false} style={{ padding: 5, }} width={54} /></div>
    // valSlide: 1,
  }

  render() {
    // const { valSlide } = this.state;
    // const { prevArrow } = this.state;
    // const { nextArrow } = this.state;
    const { t } = this.props;

    return (
      <>
        <div className="containerImgCus">
          <Row justify="center" style={{ paddingTop: 30 }}>
            <Col span={24}>
              <Title className="titleproductexp">Customer Stories</Title>
            </Col>
            <Col span={24}>
              <Row justify="center">
                <div className="stroketitle"></div>
              </Row>
            </Col>
          </Row>

          <Row justify="center" style={{ marginBottom: 30 }}>
            <Col xs={2} md={1} lg={1} xxl={4}></Col>
            <Col xs={20} md={22} lg={22} xxl={16}>
              {window.matchMedia('(max-width: 767px)').matches ? (

                <Slide slidesToShow={1} >
                  {this.state.url.map((item: any, i) => (
                    <div key={i} className="each-slide">
                      <Row>
                        <Col xs={24} md={8}>
                          <Card style={{ textAlign: "center", marginBottom: 20, padding: 0 }} className="cardcus" bordered={false} >
                            <Row >
                              <Col span={24}>
                                <img src={item.url} alt="imagecus" className="imgslidecus" />
                              </Col>
                            </Row>
                            <Row >
                              <Col span={24}>
                                <Title style={{ fontFamily: "Open Sans", fontWeight: 500, }} id="nameslidecus">{item.name}</Title>
                              </Col>
                            </Row>
                            <Row style={{ padding: 0, marginTop: 9 }}>
                              <Col span={24}>
                                <Text style={{ fontFamily: "Open Sans", fontWeight: 500 }} className="jabatancus">{item.jabatan}</Text>
                              </Col>
                            </Row>
                            <Row justify="center" align="middle">
                              <Col >
                                <Text style={{ fontSize: 17, marginRight: 15 }}>{item.value}</Text>
                                <Rate allowHalf value={item.value} />
                              </Col>
                            </Row>
                            <Row justify="space-between" align="bottom" style={{ marginTop: 27 }}>
                              <Col span={24}>
                                <Text style={{ fontFamily: "Open Sans", fontWeight: 500 }} className="descriptioncus">{item.description}</Text>
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </Slide>
              ) : window.matchMedia('(max-width: 992px)').matches ? (

                <Slide slidesToShow={2} >
                  {this.state.url.map((item: any, i) => (
                    <div key={i} className="each-slide">
                      <Row>
                        <Col xs={24} md={12}>
                          <Card style={{ textAlign: "center", marginBottom: 20, marginTop: 20, padding: 0 }} className="cardcus" bordered={false} >
                            <Row >
                              <Col span={24}>
                                <img src={item.url} alt="imagecus" />
                              </Col>
                            </Row>
                            <Row style={{ marginTop: 25 }}>
                              <Col span={24}>
                                <Title style={{ fontSize: 30, fontFamily: "Open Sans", fontWeight: 500, padding: 0, margin: 0 }}>{item.name}</Title>
                              </Col>
                            </Row>
                            <Row style={{ padding: 0, marginTop: 9 }}>
                              <Col span={24}>
                                <Text style={{ fontSize: 15, fontFamily: "Open Sans", fontWeight: 500 }} className="blue-primary">{item.jabatan}</Text>
                              </Col>
                            </Row>
                            <Row justify="center" align="middle">
                              <Col >
                                <Text style={{ fontSize: 17, marginRight: 15 }}>{item.value}</Text>
                                <Rate allowHalf value={item.value} />
                              </Col>
                            </Row>
                            <Row justify="space-between" align="bottom" style={{ marginTop: 27 }}>
                              <Col span={24}>
                                <Text style={{ fontSize: 15, fontFamily: "Open Sans", fontWeight: 500 }}>{item.description}</Text>
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </Slide>
              ) : (

                <Slide slidesToShow={3} >
                  {this.state.url.map((item: any, i) => (
                    <div key={i} className="each-slide">
                      <Row>
                        <Col xs={24} md={8}>
                          <Card style={{ textAlign: "center", marginBottom: 20, marginTop: 20, padding: 0 }} className="cardcus" bordered={false} >
                            <Row >
                              <Col span={24}>
                                <img src={item.url} alt="imagecus" />
                              </Col>
                            </Row>
                            <Row style={{ marginTop: 25 }}>
                              <Col span={24}>
                                <Title style={{ fontSize: 30, fontFamily: "Open Sans", fontWeight: 500, padding: 0, margin: 0 }}>{item.name}</Title>
                              </Col>
                            </Row>
                            <Row style={{ padding: 0, marginTop: 9 }}>
                              <Col span={24}>
                                <Text style={{ fontSize: 15, fontFamily: "Open Sans", fontWeight: 500 }} className="blue-primary">{item.jabatan}</Text>
                              </Col>
                            </Row>
                            <Row justify="center" align="middle">
                              <Col >
                                <Text style={{ fontSize: 17, marginRight: 15 }}>{item.value}</Text>
                                <Rate allowHalf value={item.value} />
                              </Col>
                            </Row>
                            <Row justify="space-between" align="bottom" style={{ marginTop: 27 }}>
                              <Col span={24}>
                                <Text style={{ fontSize: 15, fontFamily: "Open Sans", fontWeight: 500 }}>{item.description}</Text>
                              </Col>
                            </Row>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </Slide>
              )
              }
            </Col>
            <Col xs={2} md={1} lg={1} xxl={4}></Col>
          </Row>

          <Row style={{ paddingTop: 30, }} justify="center" >
            <Title className="titleunduh" style={{ fontFamily: 'Poppins', fontWeight: 500, margin: 0, padding: 0 }}>{t("landing:downloadNow")}</Title>
          </Row>
          <Row style={{ paddingTop: 5, marginBottom: 30, }} justify="center" >
            <Text style={{ fontFamily: 'Open Sans', fontWeight: 400, textAlign: 'center', margin: 0, padding: 0 }} className="textunduh">{t("landing:textdownloadNow")}</Text>
          </Row>

          <Row justify="center" align="middle">
            <Col style={{ margin: '0px 20px 20px 20px' }}>
              <Button type="primary" style={{ padding: 10, borderRadius: 10, backgroundColor: 'black', borderStyle: 'none' }} className="btngoogle">
                <Row align="middle" justify="start">
                  <Image src={BtnGooglePlay} preview={false} style={{ marginRight: 10.4 }} />
                </Row>
              </Button>
            </Col>
            <Col style={{ margin: '0px 20px 20px 20px' }}>
              <Button type="primary" style={{ padding: 10, borderRadius: 10, backgroundColor: 'black', borderStyle: 'none' }} className="btnappstore">
                <Row align="middle" justify="start">
                  <Image src={BtnAppStore} preview={false} style={{ marginRight: 10.4 }} />
                </Row>
              </Button>
            </Col>
          </Row>
          <Image style={{ padding: 0, margin: "0px 0px 0 0px", }}
            src={CloudBottom}
            preview={false}
            id="imgcust"
          />
        </div>

      </>
    )
  }
}

export default CustomerStories
