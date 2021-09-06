import { Button, Col, Row } from "antd";
import React from "react";
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
        const { t } = this.props;

        return (
            <div className="landing-page">
                <Row>
                    <Col>
                        <div>{t("landing:topMenu")}</div>
                    </Col>
                </Row>
                <div className="color-style">{t("landing:title")}</div>
                <Button
                    onClick={() => {
                        this.postForm("asdf");
                    }}
                >
                    ini button
                </Button>
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
