import { Layout, Menu, Avatar } from 'antd';
import React from "react";
import { Route, Switch, Link } from 'react-router-dom';
import logoHeader from "../../../assets/svg/logo-kerjaapp.svg";
const Container = React.lazy(() => import('./Container'));

export interface TopMenuProps {
    judul: string;
}
export interface TopMenuState {
    pageReady: boolean;
}

const { Header, Content, Footer } = Layout;
class TopMenu extends React.Component<TopMenuProps, TopMenuState> {
    state = {
        pageReady: false,
    };
    render() {
        return (
            <>
                {/* <h1>{this.props.judul}</h1>
                 */}
                <Layout>
                    <Header style={{ position: 'fixed', zIndex: 2, width: '100%', padding: 0, margin: 0 }}>
                        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1"><Link to="/">
                                <Avatar shape="square" size="large" icon={<img src={logoHeader} alt="logokerjaapp" />} className="logo" />
                            </Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/login">Login</Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/signup">Sign Up</Link></Menu.Item>
                            <Menu.Item key="4">nav 4</Menu.Item>
                            <Menu.Item key="5">nav 5</Menu.Item>
                        </Menu>
                    </Header>
                    <Content className="site-layout" style={{ padding: '0', marginTop: 64 }}>
                        <div className="site-layout-background" style={{ margin: 0, padding: 0, minHeight: 380, }}>
                            <React.Suspense fallback={<div>Loading...</div>}>
                                <Switch>
                                    <Route exact path='/' component={() => <Container />} />

                                    <Route path='/signup' component={() => <h1>Sign Up</h1>} />
                                </Switch>
                            </React.Suspense>
                        </div>
                    </Content>
                    <Footer style={{ width: '100vw', textAlign: 'center', padding: 20, backgroundColor: '#00B9FF' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>

            </>
        );
    }
}

export default TopMenu;
