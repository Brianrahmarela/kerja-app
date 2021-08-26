import {
  faAddressCard,
  faBell,
  faBook,
  faBriefcase,
  faCaretDown,
  faCog,
  faComments,
  faHamburger,
  faHome,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Input, List, Menu, Popover, Row, Space, Typography } from "antd";
import { Layout } from "antd";
import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getLogout } from "../repository/AuthRepo";
import logo from "./../assets/svg/logo-header.svg";

export interface HeaderProps {
  location: any;
  logout: () => void;
}

export interface HeaderState { }

class Header extends React.Component<HeaderProps, HeaderState> {
  state = { ready: false };
  onSearch() { }
  render() {
    return (
      <Layout.Header>
        <div className="app-header">
          <Row className="header " justify="space-between" align="middle">
            <Col xs={22} sm={22} md={10} lg={9} xl={8} xxl={6}>
              <Row gutter={20}>
                <Col
                  style={{ paddingTop: 15 }}
                  xs={3}
                  sm={2}
                  md={4}
                  lg={10}
                  xl={9}
                >
                  <div className="logo-wrapper">
                    <Link to="/" className="logo-wrapper">
                      <img
                        alt="logo"
                        src={logo}
                        style={{ width: 30, height: 30, marginRight: 5 }}
                      />
                      <span
                        className="blue-primary text-logo"
                        style={{
                          fontSize: 24,
                          lineHeight: 0.5,
                          fontWeight: 500,
                        }}
                      >
                        KerjaApp
                      </span>
                    </Link>
                  </div>
                </Col>
                <Col xs={21} sm={21} md={20} lg={14} xl={15}>
                  <Input.Search
                    placeholder="Search"
                    onSearch={this.onSearch}
                    style={{ paddingTop: 15 }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={2} sm={2} md={14} lg={15} xl={16} xxl={18}>
              <Row>
                {/* menu large desktop  */}
                <Col xs={0} sm={0} md={0} lg={0} xl={24} className="menu-large">
                  <div className="main-menu">
                    <Row justify="end">
                      <Col flex="auto">
                        <div style={{ textAlign: "right", height: 64 }}>
                          <div style={{ width: 495, marginLeft: "auto" }}>
                            <Menu
                              theme="light"
                              mode="horizontal"
                              defaultSelectedKeys={["1"]}
                            >
                              <Menu.Item key="1">Beranda</Menu.Item>
                              <Menu.Item key="2">Jobs</Menu.Item>
                              <Menu.Item key="3">Learning</Menu.Item>
                              <Menu.Item key="4">Communication</Menu.Item>
                              <Menu.Item key="5">My Work</Menu.Item>
                            </Menu>
                          </div>
                        </div>
                      </Col>
                      <Col flex="155px">
                        <div style={{ textAlign: "right", height: 64 }}>
                          <Space align="end">
                            <Popover
                              placement="topRight"
                              content={
                                <List
                                  bordered={false}
                                  dataSource={[
                                    "Racing car sprays burning fuel into crowd.",
                                    "Japanese princess to wed commoner.",
                                    "Australian walks 100km after outback crash.",
                                    "Man charged over missing wedding girl.",
                                    "Los Angeles battles huge wildfires.",
                                  ]}
                                  renderItem={(item) => (
                                    <List.Item>
                                      <Typography.Text mark>
                                        [ITEM]
                                      </Typography.Text>{" "}
                                      {item}
                                    </List.Item>
                                  )}
                                />
                              }
                            >
                              <div className="icon-menu">
                                <FontAwesomeIcon
                                  icon={faBell}
                                  style={{ fontSize: 21 }}
                                />
                              </div>
                            </Popover>
                            <div style={{ width: 100, textAlign: "center" }}>
                              <Typography.Text>Hi, User</Typography.Text>
                            </div>
                            <Popover
                              overlayClassName="popover-setting"
                              placement="topRight"
                              content={
                                <List
                                  bordered={false}
                                  dataSource={["Setting", "Logout"]}
                                  renderItem={(item) => (
                                    <>
                                      {item === "Setting" && (
                                        <List.Item>
                                          <FontAwesomeIcon
                                            icon={faCog}
                                            style={{
                                              marginRight: 5,
                                            }}
                                          />
                                          {item}
                                        </List.Item>
                                      )}
                                      {item === "Logout" && (
                                        <List.Item
                                          onClick={() => this.props.logout?.()}
                                        >
                                          <FontAwesomeIcon
                                            icon={faSignOutAlt}
                                            style={{
                                              marginRight: 5,
                                            }}
                                          />
                                          {item}
                                        </List.Item>
                                      )}
                                    </>
                                  )}
                                />
                              }
                            >
                              <div style={{ height: "100%", width: "100%" }}>
                                <FontAwesomeIcon
                                  icon={faCog}
                                  style={{ fontSize: 21 }}
                                />
                              </div>
                            </Popover>
                          </Space>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                {/* menu desktop  */}
                <Col xs={0} sm={0} md={0} lg={24} xl={0}>
                  <div className="main-menu">
                    <div style={{ width: 600, marginLeft: "auto" }}>
                      <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={["1"]}
                      >
                        <Menu.Item key="1">Beranda</Menu.Item>
                        <Menu.Item key="2">Jobs</Menu.Item>
                        <Menu.Item key="3">Learning</Menu.Item>
                        <Menu.Item key="4">Communication</Menu.Item>
                        <Menu.Item key="5">My Work</Menu.Item>
                        <Menu.SubMenu
                          key="6"
                          title={
                            <FontAwesomeIcon
                              icon={faCaretDown}
                              style={{ width: 30 }}
                            />
                          }
                        >
                          <Menu.Item
                            key="notif"
                            icon={<FontAwesomeIcon icon={faBell} />}
                          >
                            Notification
                          </Menu.Item>
                          <Menu.Item
                            key="setting"
                            icon={<FontAwesomeIcon icon={faCog} />}
                          >
                            Settings
                          </Menu.Item>
                          <Menu.Item
                            key="logout"
                            icon={<FontAwesomeIcon icon={faSignOutAlt} />}
                            onClick={() => this.props.logout?.()}
                          >
                            Logout
                          </Menu.Item>
                        </Menu.SubMenu>
                      </Menu>
                    </div>
                  </div>
                </Col>
                {/* middle menu */}
                <Col xs={0} sm={0} md={24} lg={0} xl={0}>
                  <div className="main-menu-middle">
                    <div style={{ width: 350, marginLeft: "auto" }}>
                      <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={["1"]}
                      >
                        <Menu.Item key="1">
                          <FontAwesomeIcon icon={faHome} />
                        </Menu.Item>
                        <Menu.Item key="2">
                          <FontAwesomeIcon icon={faBriefcase} />
                        </Menu.Item>
                        <Menu.Item key="3">
                          <FontAwesomeIcon icon={faBook} />
                        </Menu.Item>
                        <Menu.Item key="4">
                          <FontAwesomeIcon icon={faComments} />
                        </Menu.Item>
                        <Menu.Item key="5">
                          <FontAwesomeIcon icon={faAddressCard} />
                        </Menu.Item>
                        <Menu.SubMenu
                          key="caret"
                          title={
                            <FontAwesomeIcon
                              icon={faCaretDown}
                              style={{ width: 30 }}
                            />
                          }
                        >
                          <Menu.Item
                            key="notif"
                            icon={<FontAwesomeIcon icon={faBell} />}
                          >
                            Notification
                          </Menu.Item>
                          <Menu.Item
                            key="setting"
                            icon={<FontAwesomeIcon icon={faCog} />}
                          >
                            Settings
                          </Menu.Item>
                          <Menu.Item
                            key="logout"
                            icon={<FontAwesomeIcon icon={faSignOutAlt} />}
                            onClick={() => this.props.logout?.()}
                          >
                            Logout
                          </Menu.Item>
                        </Menu.SubMenu>
                      </Menu>
                    </div>
                  </div>
                </Col>
                {/* menu mobile  */}
                <Col xs={24} sm={24} md={0} lg={0} xl={0}>
                  <div className="account-menu-mobile">
                    <Popover
                      placement="topRight"
                      content={
                        <Menu
                          theme="light"
                          mode="vertical"
                          style={{ border: 0, width: "100%" }}
                          defaultSelectedKeys={["1"]}
                        >
                          <Menu.Item key="1">Beranda</Menu.Item>
                          <Menu.Item key="2">Jobs</Menu.Item>
                          <Menu.Item key="3">Learning</Menu.Item>
                          <Menu.Item key="4">Communication</Menu.Item>
                          <Menu.Item key="5">My Work</Menu.Item>
                          <Menu.Divider />
                          <Menu.Item key="notif">Notification</Menu.Item>
                          <Menu.Item key="setting">Settings</Menu.Item>
                          <Menu.Item
                            key="logout"
                            onClick={() => this.props.logout?.()}
                          >
                            Logout
                          </Menu.Item>
                        </Menu>
                      }
                    >
                      <div className="icon-menu">
                        <FontAwesomeIcon
                          icon={faHamburger}
                          style={{ fontSize: 21 }}
                        />
                      </div>
                    </Popover>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Layout.Header>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => ({
  logout: async () => {
    try {
      await getLogout();
    } catch (error) {
    } finally {
      window.location.hash = "/login";
    }
    return dispatch({ type: "LOGOUT" });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Header));
