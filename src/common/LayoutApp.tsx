import { Layout } from "antd";
import { AxiosResponse } from "axios";
import moment from "moment";
import { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { getMe } from "../repository/UserRepo";
import Header from "./Header";
interface IProps {
    component: any;
    path: string;
    setCurrentUser: (x: any) => void;
}
interface IState {}
class LayoutApp extends Component<IProps, IState> {
    componentDidMount() {
        getMe().then((res: AxiosResponse<any>) => {
            this.props.setCurrentUser(res.data);
        });
    }
    render() {
        const token = window.localStorage.getItem("token");
        const expiredAt = window.localStorage.getItem("expiredAt");
        // if (!token || (!expiredAt && Number(expiredAt) < moment().valueOf())) {
        //     window.location.hash = "/login";
        // }
        const { ...rest } = this.props;
        return (
            <>
                <Layout className="dashboard">
                    <Header location={this.props.path} />
                    <Layout.Content className="body">
                        <Route {...rest} render={(props) => <Component {...props} />} />
                    </Layout.Content>
                </Layout>
            </>
        );
    }
}

const mapStateToProps = (state: any) => ({
    token: state.account.token,
    expiredAt: state.account.expiredAt,
});

const mapDispatchToProps = (dispatch: any) => ({
    setCurrentUser: (payload: any) =>
        dispatch({
            type: "SET_CURRENT_USER",
            payload,
        }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(LayoutApp));
