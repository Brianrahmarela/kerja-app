import { Layout, Menu, Avatar } from 'antd';
import React from "react";
import { Route, Switch, Link } from 'react-router-dom';
import logoHeader from "../../../assets/svg/logo-kerjaapp.svg";
import ToTop from "../../../assets/svg/totop.svg";
import FooterMenu from "../part/FooterMenu";
import { BackTop, Image, Row, Col, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Container = React.lazy(() => import('./Container'));

export interface TopMenuProps {
    judul: string;
}
export interface TopMenuState {
    pageReady: boolean;
    menu: any;
}

const { Header, Content, Footer } = Layout;
class TopMenu extends React.Component<TopMenuProps, TopMenuState> {
    state = {
        pageReady: false,
        menu: <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    English
                </a>
            </Menu.Item>

        </Menu>
    };

    render() {
        const { menu } = this.state;

        return (
            <>
                {/* <h1>{this.props.judul}</h1> */}
                <Layout>
                    <BackTop>
                        <Row justify="center" align="middle">
                            <Col className="totopbtn">
                                <Image src={ToTop} preview={false} style={{ padding: 5, }} />
                            </Col>
                        </Row>
                    </BackTop>
                    <Header style={{ position: 'fixed', zIndex: 2, width: '100%', padding: 0, margin: 0 }}>
                        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1"><Link to="/">
                                <Avatar shape="square" size="large" icon={<img src={logoHeader} alt="logokerjaapp" />} className="logo" />
                            </Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/" style={{ fontFamily: 'Poppins' }}><Dropdown overlay={menu}>
                                <Link to="/" id="languae" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    Indonesia <DownOutlined />
                                </Link>
                            </Dropdown></Link></Menu.Item>
                            <Menu.Item key="3"><Link to="/login" style={{ fontFamily: 'Poppins' }}>Login</Link></Menu.Item>
                            <Menu.Item key="4"><Link to="/signup" style={{ fontFamily: 'Poppins' }}>Sign Up</Link></Menu.Item>
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
                    <Footer style={{ width: '100vw', textAlign: 'center', padding: 20, backgroundColor: '#00B9FF' }}><FooterMenu /></Footer>
                </Layout>
            </>
        );
    }
}

export default TopMenu;
