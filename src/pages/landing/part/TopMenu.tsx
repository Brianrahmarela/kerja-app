import { Layout, Menu } from "antd";
// import { faBars, faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Route, Switch, Link } from "react-router-dom";

import HamburgerIcon from "../../../assets/svg/hamburger-icon.svg";
import ToTop from "../../../assets/svg/totop.svg";
import FooterMenu from "../part/FooterMenu";
import { BackTop, Image, Row, Col, Drawer, Button, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { withTranslation } from "react-i18next";
import logo from "./../../../assets/svg/logo-header.svg";
import SvgLandingLogin from "../../../assets/svg/SvgLandingLogin";
import SvgLandingSignUp from "../../../assets/svg/SvgLandingSignUp";
import SvgLandingArrow from "../../../assets/svg/SvgLandingArrow";

// import logo from "../../../assets/svg/logo-header.svg";

const Container = React.lazy(() => import("./Container"));

export interface TopMenuProps {
    judul: string;
    i18n: any;
}
export interface TopMenuState {
    pageReady: boolean;
    menu: any;
    visible: boolean;
    language: string;
}

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

class TopMenu extends React.Component<TopMenuProps, TopMenuState> {
    state = {
        pageReady: false,
        visible: false,
        language: "Indonesia",
        menu: (
            <Menu>
                <Menu.Item onClick={() => this.changeLanguage("en")}>English</Menu.Item>
            </Menu>
        ),
    };
    changeLanguage(lang: string) {
        this.props.i18n.changeLanguage(lang);
        if (lang === "id") {
            this.setState({ language: "Indonesia" });
            localStorage.setItem("lang", "id");
        } else {
            this.setState({ language: "English" });
            localStorage.setItem("lang", "en");
        }
    }
    componentDidMount() {
        const lang = localStorage.getItem("lang") || "id";
        if (lang === "id") {
            this.changeLanguage("id");
        } else {
            this.changeLanguage("en");
        }
    }
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

    render() {
        return (
            <>
                {/* <h1>{this.props.judul}</h1> */}
                <Layout>
                    <BackTop>
                        <Row justify="center" align="middle">
                            <Col className="totopbtn">
                                <Image src={ToTop} preview={false} style={{ padding: 5 }} />
                            </Col>
                        </Row>
                    </BackTop>
                    <Header style={{ position: "fixed", zIndex: 2, width: "100%", padding: 0, margin: 0 }}>
                        <Menu theme="light" mode="horizontal" defaultSelectedKeys={["0"]} className="mobilehidden">
                            <Menu.Item key="1" className="logo-home">
                                <Link to="/">
                                    <div className="logo-wrapper">
                                        <img alt="logo" src={logo} style={{ width: 30, height: 30, marginRight: 5 }} />
                                        <span
                                            className="blue-primary text-logo"
                                            style={{
                                                fontSize: 18,
                                                lineHeight: 0.5,
                                                fontWeight: 500,
                                            }}
                                        >
                                            KerjaApp
                                        </span>
                                    </div>
                                </Link>
                            </Menu.Item>
                            <SubMenu key="2" style={{ fontFamily: "Poppins" }} icon={<DownOutlined />} title={this.state.language}>
                                <Menu.Item
                                    key="English"
                                    onClick={() => {
                                        this.changeLanguage("en");
                                    }}
                                >
                                    English
                                </Menu.Item>
                                <Menu.Item
                                    key="Indo"
                                    onClick={() => {
                                        this.changeLanguage("id");
                                    }}
                                >
                                    Indonesia
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item key="3">
                                <Link to="/login" style={{ fontFamily: "Poppins" }}>
                                    Login
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to="/signup" style={{ fontFamily: "Poppins" }}>
                                    Sign Up
                                </Link>
                            </Menu.Item>
                        </Menu>
                        <Menu theme="light" mode="horizontal" defaultSelectedKeys={["2"]}>
                            <Menu.Item key="0">
                                <div className="drawerhidden">
                                    <Button type="primary" onClick={this.showDrawer} className="btnmobile">
                                        <img style={{ padding: 0, margin: 0 }} src={HamburgerIcon} alt="logohamburger" id="logohamburger" height={22} />
                                    </Button>

                                    <Drawer
                                        title={
                                            <Link to="/">
                                                <div className="logo-wrapper">
                                                    <img alt="logo" src={logo} style={{ width: 45, height: 45, marginRight: 5 }} />
                                                    <span
                                                        className="blue-primary text-logo"
                                                        style={{
                                                            fontSize: 28,
                                                            lineHeight: 0.5,
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        KerjaApp
                                                    </span>
                                                </div>
                                            </Link>
                                        }
                                        placement="right"
                                        onClose={this.onClose}
                                        visible={this.state.visible}
                                        headerStyle={{ padding: "65px 115px 19px 33px" }}
                                        bodyStyle={{ padding: "40px 0 20px 0px" }}
                                        style={{ listStyleType: "none" }}
                                        className="drawer-landing"
                                    >
                                        <Space size={43} direction="vertical" style={{ marginLeft: 12 }}>
                                            <div className="svg-hover-submenu">
                                                {/* <SubMenu key="sub1" icon={<img src={ArrowDown} alt="arrowdown" style={{ marginLeft: 3, marginRight: 6, padding: 0 }} height={14} />} title="Indonesia" className="submenu"> */}
                                                <SubMenu
                                                    key="sub1"
                                                    icon={
                                                        <span>
                                                            <SvgLandingArrow />
                                                        </span>
                                                    }
                                                    title="Indonesia"
                                                    className="submenu"
                                                    style={{ marginRight: 14, marginLeft: 3 }}
                                                >
                                                    <Menu.Item key="1" style={{ marginLeft: 5 }}>
                                                        English
                                                    </Menu.Item>
                                                </SubMenu>
                                            </div>
                                            <div className="svg-hover-menu">
                                                <Menu.Item key="2" style={{ padding: 0, marginLeft: 24 }}>
                                                    <Link to="/login" style={{ fontFamily: "Poppins" }}>
                                                        <Row justify="start" align="middle">
                                                            <Space size={14}>
                                                                <Col>
                                                                    <SvgLandingLogin />
                                                                </Col>
                                                                <Col>Login</Col>
                                                            </Space>
                                                        </Row>
                                                    </Link>
                                                </Menu.Item>
                                            </div>
                                            <div className="svg-hover-menu">
                                                <Menu.Item key="3" style={{ padding: 0, marginLeft: 24 }}>
                                                    <Link to="/register" style={{ fontFamily: "Poppins" }}>
                                                        <Row justify="start" align="middle">
                                                            <Space size={14}>
                                                                <Col>
                                                                    <SvgLandingSignUp />
                                                                </Col>
                                                                <Col>Sign Up</Col>
                                                            </Space>
                                                        </Row>
                                                    </Link>
                                                </Menu.Item>
                                            </div>
                                        </Space>
                                    </Drawer>
                                </div>
                            </Menu.Item>
                        </Menu>
                    </Header>

                    <Content className="site-layout" style={{ padding: 0, marginTop: 64 }}>
                        <div className="site-layout-background" style={{ margin: 0, padding: 0, minHeight: 380 }}>
                            <React.Suspense fallback={<div>Loading...</div>}>
                                <Switch>
                                    <Route exact path="/" component={() => <Container />} />
                                    <Route path="/signup" component={() => <h1>Sign Up</h1>} />
                                </Switch>
                            </React.Suspense>
                        </div>
                    </Content>
                    <Footer style={{ width: "100vw", textAlign: "center", padding: 20, backgroundColor: "#00B9FF" }}>
                        <FooterMenu />
                    </Footer>
                </Layout>
            </>
        );
    }
}

export default withTranslation()(TopMenu);
