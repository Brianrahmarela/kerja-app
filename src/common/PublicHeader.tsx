import { Button, Col, Input, Layout, Row, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import logo from "./../assets/svg/logo-header.svg";

interface PublicHeaderProps {
    location: any;
}

interface PublicHeaderState {
    selectedMenu: string;
}

class PublicHeader extends React.Component<PublicHeaderProps, PublicHeaderState> {
    state = { selectedMenu: "1" };
    componentDidMount() {
        this.changeMenu();
    }
    componentDidUpdate(prevProps: any) {
        if (this.props.location !== prevProps.location) {
            this.changeMenu();
        }
    }
    changeMenu() {
        switch (this.props.location) {
            case "/job":
                this.setState({
                    selectedMenu: "2",
                });
                break;
            case "/learning":
                this.setState({
                    selectedMenu: "3",
                });
                break;
            case "/communication":
                this.setState({
                    selectedMenu: "4",
                });
                break;
            default:
                this.setState({
                    selectedMenu: "1",
                });
                break;
        }
    }
    render() {
        return (
            <Layout.Header>
                <div className="app-header">
                    <Row className="header " justify="space-between" align="middle">
                        <Col xs={16} sm={18} md={10} lg={9} xl={8} xxl={6}>
                            <Row gutter={20}>
                                <Col style={{ paddingTop: 15 }} xs={3} sm={2} md={4} lg={10} xl={9}>
                                    <div className="logo-wrapper">
                                        <Link to="/" className="logo-wrapper">
                                            <img alt="logo" src={logo} style={{ width: 30, height: 30, marginRight: 5 }} />
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
                                <Col xs={20} sm={21} md={20} lg={14} xl={15}>
                                    <Input placeholder="Search" style={{ borderRadius: 20 }} />
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={8} sm={6} md={14} lg={15} xl={16} xxl={18}>
                            <Row>
                                {/* menu large desktop  */}
                                <Col span={24} className="menu-large">
                                    <div className="main-menu">
                                        <Row justify="end">
                                            <Col flex="auto">
                                                <div style={{ textAlign: "right", height: 64 }}>
                                                    <Space>
                                                        <Button shape="round" type="primary" href="#/login">
                                                            Login
                                                        </Button>

                                                        <Button shape="round" type="ghost" href="#/register">
                                                            Register
                                                        </Button>
                                                        <Button shape="round" type="link" href="#/employer">
                                                            Employer
                                                        </Button>
                                                    </Space>
                                                </div>
                                            </Col>
                                        </Row>
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

export default PublicHeader;
