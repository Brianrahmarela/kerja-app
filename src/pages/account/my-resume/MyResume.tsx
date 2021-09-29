import { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Col, Row } from "antd";
import Side from "./parts/Side";
import { Route, HashRouter as Router, Switch } from "react-router-dom";
import ExperienceList from "./parts/experience/ExperienceList";
import EducationList from "./parts/education/EducationList";
import Skill from "./parts/skill/Skill";
import Language from "./parts/language/Language";
import CertificationList from "./parts/certification/CertificationList";
import JobWish from "./parts/job-wish/JobWish";
import PrivacySetting from "./parts/privacy-setting/PrivacySetting";
import Personal from "./parts/personal-info/Personal";

interface Iprops {
    t: (x: any) => void;
}
interface IState {}
class MyResume extends Component<Iprops, IState> {
    render() {
        return (
            <Row gutter={10}>
                <Col span={6}>
                    <Side />
                </Col>
                <Col span={18}>
                    <Router>
                        <Switch>
                            <Route exact path="/account/my-resume" component={Personal} />
                            <Route exact path="/account/my-resume/experience" component={ExperienceList} />
                            <Route exact path="/account/my-resume/education" component={EducationList} />
                            <Route exact path="/account/my-resume/skill" component={Skill} />
                            <Route exact path="/account/my-resume/language" component={Language} />
                            <Route exact path="/account/my-resume/certification" component={CertificationList} />
                            <Route exact path="/account/my-resume/job-wish" component={JobWish} />
                            <Route exact path="/account/my-resume/personal-info" component={Personal} />
                            <Route exact path="/account/my-resume/privacy-setting" component={PrivacySetting} />
                            <Route exact path="/account/my-resume/old" component={MyResume} />
                        </Switch>
                    </Router>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(MyResume));
