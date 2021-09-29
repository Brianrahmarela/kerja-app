import { Component } from "react";
import { Divider, Typography } from "antd";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { getSkills } from "../../../../../repository/WorkerRepo";
import { AxiosResponse } from "axios";
interface IProps {
    setSkills?: (x: any) => void;
    skillList?: any[];
}
interface IState {
    beginner: any[];
    intermediate: any[];
    advance: any[];
}
class SkillInfo extends Component<IProps, IState> {
    state = {
        beginner: [],
        intermediate: [],
        advance: [],
    };
    componentDidMount() {
        getSkills()
            .then((res: AxiosResponse<any>) => {
                const ordered = res.data.map((a: any) => {
                    a.editMode = false;
                    return a;
                });
                this.setState({
                    beginner: res.data.filter((val: any) => val.level === "BEGINNER").map((val: any) => val.skillName),
                    intermediate: res.data.filter((val: any) => val.level === "INTERMEDIATE").map((val: any) => val.skillName),
                    advance: res.data.filter((val: any) => val.level === "ADVANCE").map((val: any) => val.skillName),
                });
                this.props.setSkills?.(ordered);
            })
            .catch((error) => {})
            .finally(() => {});
    }
    render() {
        const skillLIst: any = [];
        if (this.state.beginner.length > 0) {
            skillLIst.push(this.state.beginner.join(","));
        }
        if (this.state.intermediate.length > 0) {
            skillLIst.push(this.state.intermediate.join(","));
        }
        if (this.state.advance.length > 0) {
            skillLIst.push(this.state.advance.join(","));
        }
        return (
            <div>
                <Divider />
                {skillLIst.map((val: any, index: number) => (
                    <div key={index} className={index % 2 === 0 ? "even" : "odd"} style={{ padding: 10 }}>
                        <Typography.Title level={4}>BEGINNER</Typography.Title>
                        <Typography.Text>{val}</Typography.Text>
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    skillList: state.worker.skillList,
});

const mapDispatchToProps = (dispatch: any) => ({
    setSkills: (payload: any) =>
        dispatch({
            type: "SET_EXPERIENCE",
            payload,
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(SkillInfo));
