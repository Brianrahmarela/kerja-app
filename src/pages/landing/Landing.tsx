import { Button, Col, Row } from "antd";
import React from "react";
import { withTranslation } from "react-i18next";

export interface LandingPageProps {
    t: (x: any) => any;
}

export interface LandingPageState {
    ready: boolean;
    change: string;
}

class LandingPage extends React.Component<LandingPageProps, LandingPageState> {
    state = {
        ready: false,
        change: "",
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
