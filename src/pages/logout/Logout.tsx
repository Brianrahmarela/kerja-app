import { Button, Layout, Typography } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import logo from "./../../assets/svg/logo-header.svg";
import React from "react";
import bgLogout from "./../../assets/svg/bg-logout.svg";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export interface LogoutProps {
  t: (x: any) => any;
}

export interface LogoutState {}

class Logout extends React.Component<LogoutProps, LogoutState> {
  render() {
    const { t } = this.props;
    return (
      <Layout className="layout logout-page">
        <Header className="header">
          <div className="logo-wrapper">
            <Link to="/" className="logo-wrapper">
              <img
                alt="logo"
                src={logo}
                style={{ width: 30, height: 30, marginRight: 5 }}
              />
              <span
                className="blue-primary"
                style={{ fontSize: 24, lineHeight: 0.5, fontWeight: 500 }}
              >
                KerjaApp
              </span>
            </Link>
          </div>
        </Header>
        <Content>
          <div className="site-layout-content">
            <div
              style={{
                position: "absolute",
                height: "calc(100vh - 64px)",
                width: "100%",
                backgroundImage: `url(${bgLogout})`,
                backgroundSize: "97%",
                backgroundPositionX: "center",
                backgroundRepeat: "no-repeat",
                backgroundPositionY: "98%",
              }}
            ></div>
            <div className="title">
              <Typography.Title level={1} style={{}}>
                {t("logout:title")}
              </Typography.Title>
              <Typography.Title
                level={1}
                className="blue-primary"
                style={{ marginBottom: 50, fontSize: 50 }}
              >
                KerjaApp
              </Typography.Title>
              <Typography.Text style={{ fontSize: 16 }}>
                {t("logout:subtitle")}
              </Typography.Text>
            </div>
            <div className="button">
              <Button
                type="primary"
                size="large"
                href="#/login"
                style={{ width: 150 }}
              >
                {t("logout:login")}
              </Button>
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default withTranslation()(Logout);
