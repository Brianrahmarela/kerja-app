import { faBriefcase, faGraduationCap, faPencilRuler, faLanguage, faCertificate, faHands, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Menu } from "antd";
import { Component } from "react";
interface Iprops {
    t?: (x: any) => void;
}
interface IState {}
export default class Side extends Component<Iprops, IState> {
    render() {
        return (
            <Card className="account-card">
                <Menu theme="light" mode="vertical" style={{ borderRight: 0 }}>
                    <Menu.Item key="about" onClick={() => (window.location.hash = "/account/my-resume/personal-info")} icon={<FontAwesomeIcon icon={faUser} />}>
                        Personal Info
                    </Menu.Item>
                    <Menu.Item key="exp" onClick={() => (window.location.hash = "/account/my-resume/experience")} icon={<FontAwesomeIcon icon={faBriefcase} />}>
                        Experience
                    </Menu.Item>
                    <Menu.Item key="edu" onClick={() => (window.location.hash = "/account/my-resume/education")} icon={<FontAwesomeIcon icon={faGraduationCap} />}>
                        Education
                    </Menu.Item>
                    <Menu.Item key="skill" onClick={() => (window.location.hash = "/account/my-resume/skill")} icon={<FontAwesomeIcon icon={faPencilRuler} />}>
                        Skill
                    </Menu.Item>

                    <Menu.Item key="lang" onClick={() => (window.location.hash = "/account/my-resume/language")} icon={<FontAwesomeIcon icon={faLanguage} />}>
                        Language
                    </Menu.Item>
                    <Menu.Item key="cert" onClick={() => (window.location.hash = "/account/my-resume/certification")} icon={<FontAwesomeIcon icon={faCertificate} />}>
                        Certification
                    </Menu.Item>
                    <Menu.Item key="wish" onClick={() => (window.location.hash = "/account/my-resume/job-wish")} icon={<FontAwesomeIcon icon={faHands} />}>
                        Job Wish
                    </Menu.Item>
                </Menu>
            </Card>
        );
    }
}
