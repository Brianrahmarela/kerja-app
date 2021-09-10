import { Component } from "react";
import { Divider, Typography } from "antd";
import { getLanguages } from "../../../../../repository/WorkerRepo";
import { AxiosResponse } from "axios";
interface IProps {}
interface IState {
  listLanguages: any[];
}
export default class LanguageInfo extends Component<IProps, IState> {
  state = {
    listLanguages: [] as any[],
  };
  componentDidMount() {
    getLanguages()
      .then((res: AxiosResponse<any>) => {
        this.setState({
          listLanguages: res.data,
        });
      })
      .catch((error) => {})
      .finally(() => {});
  }
  render() {
    return (
      <div>
        <Divider />
        <Typography.Text>
          Proficiency level: 0 - Poor, 10 - Excellent
        </Typography.Text>
        <div style={{ marginBottom: 15 }}></div>
        {this.state.listLanguages.map((lang: any, index: number) => {
          return (
            <div
              key={index}
              className={index % 2 === 0 ? "even" : "odd"}
              style={{ padding: 15 }}
            >
              <Typography.Title level={4}>
                {lang.language} {lang.primary && `(PRIMARY)`}
              </Typography.Title>
              <Typography.Text>
                Spoken: {lang.spokenRate}, Written : {lang.writtenRate}
              </Typography.Text>
            </div>
          );
        })}
      </div>
    );
  }
}
