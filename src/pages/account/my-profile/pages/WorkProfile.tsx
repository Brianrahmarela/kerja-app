import React from "react";
import Appreciation from "./work-profile/Appreciation";
import Biografi from "./work-profile/Biografi";
import Education from "./work-profile/Education";
import Experience from "./work-profile/Experience";
import Language from "./work-profile/Language";
import Organization from "./work-profile/Organization";
import Skill from "./work-profile/Skill";

interface WorkProfileProps {}

interface WorkProfileState {}

class WorkProfile extends React.Component<WorkProfileProps, WorkProfileState> {
    hashChange() {
        var hash = window.location.hash.substr(1);
        var result = hash.split("&").reduce(function (res: any, item) {
            var parts = item.split("=");
            res[parts[0]] = parts[1];
            return res;
        }, {});
        const part: any = document.getElementById(result["/account/my-profile/work?section"]);
        console.log(result);
        if (part) {
            window.scrollTo({
                top: part.offsetTop + 350,
                behavior: "smooth",
            });
        } else {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    }
    componentDidMount() {
        this.hashChange();
        window.addEventListener("hashchange", this.hashChange, false);
    }
    componentWillUnmount() {
        window.removeEventListener("hashchange", this.hashChange);
    }
    render() {
        return (
            <>
                <Biografi />
                <Appreciation />
                <Education />
                <Experience />
                <Skill />
                <Language />
                <Organization />
            </>
        );
    }
}

export default WorkProfile;
