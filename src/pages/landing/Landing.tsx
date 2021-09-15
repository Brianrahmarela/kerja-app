// import { Button, Col, Row } from "antd";
import React from "react";
import { Helmet } from "react-helmet";
import { withTranslation } from "react-i18next";
import TopMenu from "./part/TopMenu";

export interface LandingPageProps {
    t: (x: any) => any;
}
export interface LandingPageState {
    ready: boolean;
    title: string;
}
class LandingPage extends React.Component<LandingPageProps, LandingPageState> {
    state = {
        ready: false,
        title: "ini title dari landing page",
    };
    componentDidMount() {
        window.document.title = "KerjaApp";
    }
    postForm(e: string) {
        console.log("post");
    }
    render() {
        // const { t } = this.props;

        return (
            <div className="landing-page">
                <Helmet>
                    <title>KerjaApp - Situs Lowongan Kerja terpercaya dan terlengkap di indonesia</title>
                    <meta name="description" content={"Situs Lowongan Kerja terpercaya dan terlengkap di indonesia. Cari dan telusuri lowongan kerja dan temukan kesempatan kariermu di situs kerjaapp.com"} />
                </Helmet>
                {/* <div className="color-style">{t("landing:title")}</div> */}
                <TopMenu judul={this.state.title} />
            </div>
        );
    }
}

// const mapStateToProps = () => ({});

// const mapDispatchToProps = (dispatch: any) => ({
//     setToken: async (payload: any) =>
//         await dispatch({
//             type: "SET_TOKEN",
//             payload,
//         }),
// });
export default withTranslation()(LandingPage);
// export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(LandingPage));
