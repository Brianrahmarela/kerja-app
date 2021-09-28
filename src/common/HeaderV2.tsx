import { Component } from "react";
import { Layout, Menu, Drawer, Avatar, Button, Row, Col, Input, Badge, Image, Typography, Space, Divider } from "antd";
import { Link } from "react-router-dom";
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
import SearchIcon from "../assets/svg/search-icon-header.svg";
import LogoHeaderMobile from "../assets/svg/logo-header.svg";
import logo from "./../assets/svg/logo-header.svg";
import { getLogout } from "../repository/AuthRepo";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

const { Header } = Layout;
const { Text } = Typography;

export interface IProps {
    currentUser: any;
    logout: () => void;
}
export interface TopMenuState {
    pageReady: boolean;
    menu: any;
    visible: boolean;
    valSearch: any;
}
export class HeaderV2 extends Component<IProps, TopMenuState> {
    state = {
        pageReady: false,
        visible: false,
        valSearch: "",
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
    };
    onChangeHandle = (e: any) => {
        this.setState({ valSearch: e.target.value });
    };

    onClickSettings = (e: any) => {
        console.log(e, "onClickSettings works");
    };

    render() {
        const { currentUser } = this.props;

        return (
            <Row className="header2">
                <Header style={{ position: "fixed", zIndex: 2, width: "100%", padding: 0, margin: 0, fontFamily: "Poppins" }}>
                    {/* TABLET & DESKTOP MENU*/}
                    <Menu theme="light" mode="horizontal" defaultSelectedKeys={["0"]} className="mobilehidden2">
                        <Row justify="space-between">
                            <Col md={10} lg={8} xl={8} xxl={8} style={{ marginLeft: 26 }}>
                                <Row gutter={20}>
                                    <Col xs={12}>
                                        <Link to="/home" className="logo-wrapper">
                                            <img alt="logo" src={logo} style={{ width: 40, height: 40, marginRight: 5 }} />
                                            <span className="blue-primary" style={{ fontSize: 30, lineHeight: 0.5, fontWeight: 500 }}>
                                                KerjaApp
                                            </span>
                                        </Link>
                                    </Col>
                                    <Col xs={12}>
                                        <div style={{ display: "block" }}>
                                            <Input placeholder="Cari Pekerjaan" prefix={<img src={SearchIcon} alt="share" height={19} />} onChange={this.onChangeHandle} />
                                        </div>
                                    </Col>
                                </Row>
                            </Col>

                            <Col md={13} lg={15} xl={15} xxl={15}>
                                <Row justify="end">
                                    <Col lg={15} xl={12} xxl={12} style={{ marginRight: 26 }} className="tablethidden2">
                                        <Row justify="end">
                                            <Space size={20}>
                                                <div className="svg-hover-menu">
                                                    <Menu.Item key="3">
                                                        <Link to="/home" style={{ fontFamily: "Poppins" }}>
                                                            <Row justify="start" align="middle">
                                                                Beranda
                                                            </Row>
                                                        </Link>
                                                    </Menu.Item>
                                                </div>

                                                <Menu.Item key="4">
                                                    <Link to="/job">Jobs</Link>
                                                </Menu.Item>

                                                <Menu.Item key="5">
                                                    <Link to="/learning">Learning</Link>
                                                </Menu.Item>

                                                <Menu.Item key="6">
                                                    <Link to="/communication">Communication</Link>
                                                </Menu.Item>

                                                <Menu.Item key="7">
                                                    <Link to="/my-work">My Work</Link>
                                                </Menu.Item>

                                                <div className="svg-hover-menu">
                                                    <Menu.Item key="5" style={{ padding: 0 }} className="settings">
                                                        <Link to="/settings" style={{ fontFamily: "Poppins" }}>
                                                            <Row align="middle">
                                                                <SvgSettings fill="#686E7B" />
                                                            </Row>
                                                        </Link>
                                                    </Menu.Item>
                                                </div>

                                                <Badge count={2}>
                                                    <Avatar shape="circle" style={{ backgroundColor: "transparent" }} size="small" icon={<Image src={IconNotif} preview={false} height={21} />} />
                                                </Badge>
                                                <Menu.Item key="avatar">
                                                    <Link to="/account">
                                                        <Avatar
                                                            shape="circle"
                                                            style={{ backgroundColor: "transparent", marginLeft: 5 }}
                                                            size="large"
                                                            icon={<Image src={currentUser?.photo || ""} preview={false} />}
                                                        />
                                                    </Link>
                                                </Menu.Item>
                                                <Menu.Item key="avatar">
                                                    <Link to="/account">
                                                        <Text style={{ color: "#2b9be6", fontFamily: "Poppins", fontWeight: 400, fontSize: 15 }}>Hi, {currentUser?.firstName}</Text>
                                                    </Link>
                                                </Menu.Item>
                                            </Space>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Menu>

                    {/* MOBILE - TABLET MENU*/}
                    <Menu theme="light" mode="horizontal" defaultSelectedKeys={["0"]} className="drawerhidden2">
                        <Menu.Item key="0">
                            <Drawer
                                title={<img style={{ padding: 0, margin: 0 }} src={logoMobile} alt="logoheader" id="logoheader" height={26} />}
                                placement="right"
                                onClose={this.onClose}
                                visible={this.state.visible}
                                headerStyle={{ padding: "65px 115px 19px 33px" }}
                                bodyStyle={{ padding: "40px 0 20px 0px" }}
                                style={{ listStyleType: "none" }}
                            >
                                <Space size={43} direction="vertical" style={{ marginLeft: 12 }}>
                                    <div className="svg-hover-menu">
                                        <Menu.Item key="2" style={{ padding: 0, marginLeft: 24 }}>
                                            <Link to="/home" style={{ fontFamily: "Poppins" }}>
                                                <Row justify="start" align="middle">
                                                    <Space size={14}>
                                                        <Col>
                                                            <SvgBeranda />
                                                        </Col>
                                                        <Col>Beranda</Col>
                                                    </Space>
                                                </Row>
                                            </Link>
                                        </Menu.Item>
                                    </div>
                                    <div className="svg-hover-menu">
                                        <Menu.Item key="3" style={{ padding: 0, marginLeft: 24 }}>
                                            <Link to="/job" style={{ fontFamily: "Poppins" }}>
                                                <Row justify="start" align="middle">
                                                    <Space size={14}>
                                                        <Col>
                                                            <SvgJobs />
                                                        </Col>
                                                        <Col>Jobs</Col>
                                                    </Space>
                                                </Row>
                                            </Link>
                                        </Menu.Item>
                                    </div>
                                    <div className="svg-hover-menu">
                                        <Menu.Item key="4" style={{ padding: 0, marginLeft: 24 }}>
                                            <Link to="/learning" style={{ fontFamily: "Poppins" }}>
                                                <Row justify="start" align="middle">
                                                    <Space size={14}>
                                                        <Col>
                                                            <SvgLearning />
                                                        </Col>
                                                        <Col>Learning</Col>
                                                    </Space>
                                                </Row>
                                            </Link>
                                        </Menu.Item>
                                    </div>
                                    <div className="svg-hover-menu">
                                        <Menu.Item key="5" style={{ padding: 0, marginLeft: 24 }}>
                                            <Link to="/communication" style={{ fontFamily: "Poppins" }}>
                                                <Row justify="start" align="middle">
                                                    <Space size={14}>
                                                        <Col>
                                                            <SvgCommunication />
                                                        </Col>
                                                        <Col>Communication</Col>
                                                    </Space>
                                                </Row>
                                            </Link>
                                        </Menu.Item>
                                    </div>
                                    <div className="svg-hover-menu">
                                        <Menu.Item key="5" style={{ padding: 0, marginLeft: 24 }}>
                                            <Link to="/my-work" style={{ fontFamily: "Poppins" }}>
                                                <Row justify="start" align="middle">
                                                    <Space size={14}>
                                                        <Col>
                                                            <SvgMyWork fill="#686E7B" />
                                                        </Col>
                                                        <Col>My Work</Col>
                                                    </Space>
                                                </Row>
                                            </Link>
                                        </Menu.Item>
                                    </div>
                                </Space>
                                <Divider />
                                <div className="svg-hover-menu-logout">
                                    <Menu.Item key="5" style={{ padding: 0, marginLeft: 34 }} className="logout">
                                        <Link to="/logout" style={{ fontFamily: "Poppins" }} onClick={() => this.props.logout()}>
                                            <Row justify="start" align="middle">
                                                <Space size={14}>
                                                    <Col>
                                                        <SvgLogOut fill="#E83232" />
                                                    </Col>
                                                    <Col>Log Out</Col>
                                                </Space>
                                            </Row>
                                        </Link>
                                    </Menu.Item>
                                </div>
                            </Drawer>
                        </Menu.Item>

                        <Row justify="space-between">
                            <Col xs={8} md={12} style={{ marginLeft: 3 }}>
                                <Row align="middle">
                                    <Col>
                                        <Button type="default" onClick={this.showDrawer} className="btnmobile">
                                            <img style={{ padding: 0, margin: 0 }} src={HamburgerIcon} alt="logohamburger" id="logohamburger" height={22} />
                                        </Button>
                                    </Col>
                                    <Col>
                                        {/* <Avatar shape="square" size="default" icon={<img src={logoHeader} alt="logokerjaapp" />} className="logomobilehome" /> */}
                                        <Avatar shape="square" size="small" icon={<img src={LogoHeaderMobile} alt="logoheadermobile" />} className="logomobilehomenotext" />
                                    </Col>
                                    <Col xs={0} md={2}></Col>
                                    <Col xs={0} md={14}>
                                        {/* <Search placeholder="Search job" onSearch={this.onSearch} height={80} style={{ lineHeight: 80, marginTop: 17, marginLeft: 10 }} id="searchbtn" /> */}
                                        <Input placeholder="Cari Pekerjaan" prefix={<img src={SearchIcon} alt="share" height={19} />} style={{ borderRadius: 5 }} onChange={this.onChangeHandle} />
                                    </Col>
                                </Row>
                            </Col>
                            {/* <Col xs={6} md={8} style={{ marginRight: 20, backgroundColor: "red" }}> */}
                            <Col xs={15} md={8} style={{ textAlign: "right", paddingRight: 20 }}>
                                {/* <Row align="middle" justify="end" style={{ backgroundColor: "grey" }}> */}
                                <Space style={{ height: 64 }} size={20}>
                                    <div className="search">
                                        <div>
                                            <Input type="text" placeholder="Search . . ." onChange={this.onChangeHandle} />
                                        </div>
                                    </div>
                                    <Badge count={2}>
                                        <Avatar shape="circle" style={{ backgroundColor: "transparent", margin: 0, padding: 0 }} size="small" icon={<Image src={IconNotif} preview={false} height={21} />} />
                                    </Badge>

                                    <Link to="/account">
                                        <Avatar shape="circle" style={{ backgroundColor: "transparent", padding: 0 }} size="large" icon={<Image src={currentUser?.photo || ""} preview={false} />} />
                                    </Link>
                                </Space>
                            </Col>
                        </Row>
                    </Menu>
                </Header>
            </Row>
        );
    }
}

const mapStateToProps = (state: any) => ({
    currentUser: state.account.currentUser,
});

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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HeaderV2));
