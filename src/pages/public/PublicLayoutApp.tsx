import { Layout } from "antd";
import { Component } from "react";
import { withTranslation } from "react-i18next";
import { Route } from "react-router-dom";
import PublicHeader from "../../common/PublicHeader";
interface IProps {
    component: any;
    path: string;
}
interface IState {}
class PublicLayoutApp extends Component<IProps, IState> {
    componentDidMount() {}
    render() {
        const { ...rest } = this.props;
        return (
            <>
                <Layout className="dashboard">
                    <PublicHeader location={this.props.path} />
                    <Layout.Content className="body">
                        <Route {...rest} render={(props) => <Component {...props} />} />
                    </Layout.Content>
                </Layout>
            </>
        );
    }
}

export default withTranslation()(PublicLayoutApp);
