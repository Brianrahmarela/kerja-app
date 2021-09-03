import React from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

export interface LandingPageProps {
    t: (x: any) => any;
}

export interface LandingPageState {}

class LandingPage extends React.Component<LandingPageProps, LandingPageState> {
    state = { ready: false };
    render() {
        const { t } = this.props;
        return <div className="landing-page">{t("landing:title")}</div>;
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => ({
    setToken: async (payload: any) =>
        await dispatch({
            type: "SET_TOKEN",
            payload,
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(LandingPage));
