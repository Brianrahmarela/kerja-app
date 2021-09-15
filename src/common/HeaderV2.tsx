import React, { Component } from 'react';
import { Layout, Menu, Drawer, Avatar, Button, Row, Col, Input, Badge, Image, Typography, Space, Divider } from 'antd';
import { Link, } from "react-router-dom";
import logoHeader from "../assets/svg/logo-kerjaapp.svg";
import logoMobile from "../assets/svg/logo-mobile.svg";
import HamburgerIcon from "../assets/svg/hamburger-icon.svg";
import IconNotif from "../assets/svg/header-notification.svg";
import IconSettings from "../assets/svg/header-settings.svg";
import SvgSettings from "../assets/svg/SvgSettings";
import SvgBeranda from "../assets/svg/SvgBeranda";
import SvgJobs from "../assets/svg/SvgJobs";
import SvgLearning from "../assets/svg/SvgLearning";
import SvgCommunication from "../assets/svg/SvgCommunication";
import SvgMyWork from "../assets/svg/SvgMyWork";
import HeaderAvatar from "../assets/image/header-avatar.png";
// import Icon from '@ant-design/icons';


const { Search } = Input;
const { Header, } = Layout;
const { Text, } = Typography;
// const { SubMenu } = Menu;

export interface TopMenuState {
  pageReady: boolean;
  menu: any;
  visible: boolean;
  valSearch: "",

}

export class HeaderV2 extends Component {
  state = {
    pageReady: false,
    visible: false,
    menu: (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            English
          </a>
        </Menu.Item>
      </Menu>
    ),
  };

  setVisible(arg: boolean) {
    console.log(arg);
    this.setState({ visible: arg });
  }
  showDrawer = () => {
    this.setVisible(true);
  };
  onClose = () => {
    this.setVisible(false);
  };
  onSearch = (valSearch: string) => {
    console.log(valSearch);
  }
  onClickSettings = (e: any) => {
    console.log(e, "onClickSettings works");
  }


  render() {
    return (
      <Row >


        <Header style={{ position: 'fixed', zIndex: 2, width: '100%', padding: 0, margin: 0, fontFamily: "Poppins" }} >

          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['0']} className="mobilehidden2">
            <Row justify="space-between">
              <Col style={{ marginLeft: 26 }}>
                <Menu.Item key="1">
                  <Link to="/">
                    <Avatar shape="square" size="large" icon={<img src={logoHeader} alt="logokerjaapp" />} className="logo" />
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Search placeholder="Search job" onSearch={this.onSearch} height={80} width={200} style={{ lineHeight: 80, marginTop: 17 }} id="searchbtn" />
                </Menu.Item>

              </Col>
              <Col style={{ marginRight: 26 }}>
                <Row>


                  <Space size={20}>
                    <div className="svg-hover-menu" >
                      <Menu.Item key="3">
                        <Link to="/login" style={{ fontFamily: 'Poppins' }}>
                          <Row justify="start" align="middle">
                            <Space size={20}>
                              <Col >
                                <SvgSettings fill="#686E7B" />
                              </Col>
                              <Col >
                                Beranda
                              </Col>
                            </Space>
                          </Row>

                        </Link>
                      </Menu.Item>
                    </div>

                    {/* 
                    <Menu.Item key="3" >
                      <NavLink to="/" activeClassName="your-active-class" className="link">
                        <div>

                          <SvgSettings fill="grey" className="svg-class" />Beranda
                        </div>
                      </NavLink>
                    </Menu.Item> */}


                    <Menu.Item key="4">
                      <Link to="/jobs">
                        Jobs
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                      <Link to="/learning">
                        Learning
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="6">
                      <Link to="/communication">
                        Communication
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="7">
                      <Link to="/mywork">
                        My Work

                      </Link>
                    </Menu.Item>
                  </Space>

                  <Row align="middle">

                    <Button type="text" onClick={this.onClickSettings}><Avatar shape="circle" style={{ backgroundColor: "transparent", margin: 0, padding: 0 }} size="small" icon={<Image src={IconSettings} preview={false} height={21} />} /></Button>
                    <Badge count={2} >
                      <Avatar shape="circle" style={{ backgroundColor: "transparent", margin: 0, padding: 0 }} size="small" icon={<Image src={IconNotif} preview={false} height={21} />} />
                    </Badge>
                    <Avatar shape="circle" style={{ backgroundColor: "transparent", marginLeft: 22, padding: 0 }} size="large" icon={<Image src={HeaderAvatar} preview={false} />} />
                    <Text style={{ color: "#2b9be6", fontFamily: "Poppins", fontWeight: 400, fontSize: 15, marginLeft: 17 }}>Hei Sheila!</Text>
                  </Row>
                </Row>

              </Col>

            </Row>
          </Menu>

          {/* MOBILE MENU*/}
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} >
            <Menu.Item key="0">

              <div className="drawerhidden2">
                <Button type="default" onClick={this.showDrawer} className="btnmobile">
                  {/* <FontAwesomeIcon icon={faBars} style={{ fontSize: 21 }} /> */}
                  <img style={{ padding: 0, margin: 0, }}
                    src={HamburgerIcon}
                    alt="logohamburger"
                    id="logohamburger"
                    height={22}

                  />
                </Button>
                <Drawer title={<img style={{ padding: 0, margin: 0, }}
                  src={logoMobile}
                  alt="logoheader"
                  id="logoheader"
                  height={26}
                />} placement="right" onClose={this.onClose} visible={this.state.visible} headerStyle={{ padding: '65px 115px 19px 33px' }}
                  bodyStyle={{ padding: '40px 0 20px 0px', }} style={{ listStyleType: 'none', }}>
                  <Space size={43} direction="vertical" style={{ marginLeft: 12 }}>
                    <div className="svg-hover-menu">
                      <Menu.Item key="2" style={{ padding: 0, marginLeft: 24 }}>
                        <Link to="/" style={{ fontFamily: 'Poppins' }}>
                          <Row justify="start" align="middle">
                            <Space size={14}>
                              <Col >
                                <SvgBeranda stroke="#686E7B" />
                              </Col>
                              <Col >
                                Beranda
                              </Col>
                            </Space>
                          </Row>
                        </Link>
                      </Menu.Item>
                    </div>
                    <div className="svg-hover-menu" >
                      <Menu.Item key="3" style={{ padding: 0, marginLeft: 24 }}>
                        <Link to="/jobs" style={{ fontFamily: 'Poppins' }}>
                          <Row justify="start" align="middle">
                            <Space size={14}>
                              <Col >
                                <SvgJobs stroke="#686E7B" />
                              </Col>
                              <Col >
                                Jobs
                              </Col>
                            </Space>
                          </Row>

                        </Link>
                      </Menu.Item>
                    </div>
                    <div className="svg-hover-menu" >
                      <Menu.Item key="4" style={{ padding: 0, marginLeft: 24 }}>
                        <Link to="/learning" style={{ fontFamily: 'Poppins' }}>
                          <Row justify="start" align="middle">
                            <Space size={14}>
                              <Col >
                                <SvgLearning stroke="#686E7B" />
                              </Col>
                              <Col >
                                Learning
                              </Col>
                            </Space>
                          </Row>
                        </Link>
                      </Menu.Item>
                    </div>
                    <div className="svg-hover-menu" >
                      <Menu.Item key="5" style={{ padding: 0, marginLeft: 24 }}>
                        <Link to="/communication" style={{ fontFamily: 'Poppins' }}>
                          <Row justify="start" align="middle">
                            <Space size={14}>
                              <Col >
                                <SvgCommunication stroke="#686E7B" />
                              </Col>
                              <Col >
                                Communication
                              </Col>
                            </Space>
                          </Row>
                        </Link>
                      </Menu.Item>
                    </div>
                    <div className="svg-hover-menu" >
                      <Menu.Item key="5" style={{ padding: 0, marginLeft: 24 }}>
                        <Link to="/mywork" style={{ fontFamily: 'Poppins' }}>
                          <Row justify="start" align="middle">
                            <Space size={14}>
                              <Col >
                                <SvgMyWork stroke="#686E7B" fill="#686E7B" />
                              </Col>
                              <Col >
                                My Work
                              </Col>
                            </Space>
                          </Row>
                        </Link>
                      </Menu.Item>
                    </div>
                  </Space>
                  <Divider />

                </Drawer>
              </div>
            </Menu.Item>
          </Menu>
        </Header>

      </Row>

    )
  }
}

export default HeaderV2
