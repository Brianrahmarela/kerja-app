import React, { Component } from 'react';
import { Layout, Menu, Drawer, Avatar, Button, Row, Col, Input, Badge, Image, Typography, Space, Divider, Tooltip } from 'antd';
import { Link, } from "react-router-dom";
import logoHeader from "../assets/svg/logo-kerjaapp.svg";
import logoMobile from "../assets/svg/logo-mobile.svg";
import HamburgerIcon from "../assets/svg/hamburger-icon.svg";
import IconNotif from "../assets/svg/header-notification.svg";
import SvgSettings from "../assets/svg/SvgSettings";
import SvgBeranda from "../assets/svg/SvgBeranda";
import SvgJobs from "../assets/svg/SvgJobs";
import SvgLearning from "../assets/svg/SvgLearning";
import SvgCommunication from "../assets/svg/SvgCommunication";
import SvgMyWork from "../assets/svg/SvgMyWork";
import SvgLogOut from "../assets/svg/SvgLogOut";
import SvgSearch from "../assets/svg/SvgSearch";
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

          {/* DESKTOP MENU*/}
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['0']} className="mobilehidden2">
            <Row justify="space-between">
              <Col md={9} lg={6} xl={8} style={{ marginLeft: 26, backgroundColor: "turquoise" }} >
                <Row>
                  <Space size={10}>

                    <Col md={12} xl={4}>
                      <Menu.Item key="1">
                        <Link to="/home">
                          <Avatar shape="square" size="large" icon={<img src={logoHeader} alt="logokerjaapp" />} className="logo" />
                        </Link>
                      </Menu.Item>

                    </Col>
                    <Col md={12} xl={20}>
                      <Menu.Item key="2">
                        <Search placeholder="Search job" onSearch={this.onSearch} height={80} style={{ lineHeight: 80, marginTop: 17 }} id="searchbtn" />
                      </Menu.Item>

                    </Col>
                  </Space>
                </Row>
              </Col>

              <Col >
                <Row justify="end">
                  <Col span={14} style={{ marginRight: 26, backgroundColor: "violet" }} className="tablethidden2">
                    <Row>
                      <Space size={20}>
                        <div className="svg-hover-menu" >
                          <Menu.Item key="3">
                            <Link to="/home" style={{ fontFamily: 'Poppins' }}>
                              <Row justify="start" align="middle">
                                <Space size={20}>
                                  <Col >
                                    {/* <SvgBeranda /> */}
                                  </Col>
                                  <Col >
                                    Beranda
                                  </Col>
                                </Space>
                              </Row>

                            </Link>
                          </Menu.Item>
                        </div>

                        <Menu.Item key="4">
                          <Link to="/job">
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
                          <Link to="/my-work">
                            My Work
                          </Link>
                        </Menu.Item>
                      </Space>

                    </Row>
                  </Col>

                  <Col style={{ marginRight: 26, backgroundColor: "yellow" }}>
                    <Row>

                      <Row align="middle">
                        <Space size={14}>
                          <div className="svg-hover-menu" >
                            <Menu.Item key="5" style={{ padding: 0, marginLeft: 34 }} className="logout">
                              <Link to="/settings" style={{ fontFamily: 'Poppins' }}>
                                <Row justify="start" align="middle">
                                  <SvgSettings fill="#686E7B" />
                                </Row>
                              </Link>
                            </Menu.Item>
                          </div>
                          {/* <Button type="text" onClick={this.onClickSettings}><Avatar shape="circle" style={{ backgroundColor: "transparent", margin: 0, padding: 0 }} size="small" icon={<Image src={IconSettings} preview={false} height={21} />} /></Button> */}

                          <Badge count={2} >
                            <Avatar shape="circle" style={{ backgroundColor: "transparent", margin: 0, padding: 0 }} size="small" icon={<Image src={IconNotif} preview={false} height={21} />} />
                          </Badge>
                        </Space>


                        <Avatar shape="circle" style={{ backgroundColor: "transparent", marginLeft: 22, padding: 0 }} size="large" icon={<Image src={HeaderAvatar} preview={false} />} />
                        <Text style={{ color: "#2b9be6", fontFamily: "Poppins", fontWeight: 400, fontSize: 15, marginLeft: 17 }}>Hei Sheila!</Text>
                      </Row>
                    </Row>
                  </Col>
                </Row>
              </Col>


            </Row>
          </Menu>

          {/* MOBILE MENU*/}
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['0']} className="drawerhidden2">
            {/* <div className=""> */}
            <Menu.Item key="0">

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
                      <Link to="/home" style={{ fontFamily: 'Poppins' }}>
                        <Row justify="start" align="middle">
                          <Space size={14}>
                            <Col >
                              <SvgBeranda />
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
                              <SvgJobs />
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
                              <SvgLearning />
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
                              <SvgCommunication />
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
                    <Menu.Item key="5" style={{ padding: 0, marginLeft: 24 }} >
                      <Link to="/mywork" style={{ fontFamily: 'Poppins' }}>
                        <Row justify="start" align="middle">
                          <Space size={14}>
                            <Col >
                              <SvgMyWork fill="#686E7B" />
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
                <div className="svg-hover-menu-logout" >
                  <Menu.Item key="5" style={{ padding: 0, marginLeft: 34 }} className="logout">
                    <Link to="/logout" style={{ fontFamily: 'Poppins' }}>
                      <Row justify="start" align="middle">
                        <Space size={14}>
                          <Col >
                            <SvgLogOut fill="#E83232" />
                          </Col>
                          <Col >
                            Log Out
                          </Col>
                        </Space>
                      </Row>
                    </Link>
                  </Menu.Item>
                </div>
              </Drawer>
            </Menu.Item>

            <Row justify="space-between" >
              <Col style={{ marginLeft: 3 }}>
                <Row align="middle">
                  <Col>

                    <Button type="default" onClick={this.showDrawer} className="btnmobile">
                      <img style={{ padding: 0, margin: 0, }}
                        src={HamburgerIcon}
                        alt="logohamburger"
                        id="logohamburger"
                        height={22}
                      />
                    </Button>
                  </Col>
                  <Col>
                    <Avatar shape="square" size="default" icon={<img src={logoHeader} alt="logokerjaapp" />} className="logomobilehome" />
                  </Col>
                </Row>
              </Col>
              <Col style={{ marginRight: 20 }}>
                <Row align="middle">
                  <Space size={10}>

                    <Col>
                      <Tooltip title="search">
                        <Button shape="circle" icon={<SvgSearch />} size="large" style={{ boxShadow: 'none', border: '0 solid', backgroundColor: 'transparent', }} />
                      </Tooltip>
                    </Col>
                    <Col>
                      <Badge count={2} >
                        <Avatar shape="circle" style={{ backgroundColor: "transparent", margin: 0, padding: 0 }} size="small" icon={<Image src={IconNotif} preview={false} height={21} />} />
                      </Badge>

                    </Col>
                    <Col>

                      {/* <Avatar shape="circle" style={{ backgroundColor: "transparent", marginLeft: 22, padding: 0 }} size="large" icon={<Image src={HeaderAvatar} preview={false} />} /> */}
                    </Col>
                  </Space>
                </Row>
              </Col>
            </Row>
            {/* </div> */}


          </Menu>
        </Header>

      </Row>

    )
  }
}

export default HeaderV2
