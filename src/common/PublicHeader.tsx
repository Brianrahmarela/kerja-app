import { Button, Col, Layout, Row, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import logo from "./../assets/svg/logo-header.svg";

interface PublicHeaderProps {
    location: any;
}

interface PublicHeaderState {}

class PublicHeader extends React.Component<PublicHeaderProps, PublicHeaderState> {
    render() {
        return (
            <Layout.Header>
                <div className="app-header">
                    <Row className="header " justify="space-between" align="middle">
                        <Col xs={5} sm={11} md={10} lg={9} xl={8} xxl={6}>
                            <Row gutter={20}>
                                <Col span={24}>
                                    <div className="logo-wrapper-no-auth">
                                        <Link to="/" className="logo-wrapper-no-auth">
                                            <img alt="logo" src={logo} style={{ width: 40, height: 40, marginRight: 5 }} />
                                            <span
                                                className="blue-primary text-logo "
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
                            </Row>
                        </Col>
                        <Col xs={19} sm={13} md={14} lg={15} xl={16} xxl={18}>
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
                                                            I'm Employer
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
