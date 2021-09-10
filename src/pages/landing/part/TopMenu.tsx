import { Layout, Menu, Avatar } from 'antd';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Route, Switch, Link } from 'react-router-dom';
import logoHeader from "../../../assets/svg/logo-kerjaapp.svg";
import ToTop from "../../../assets/svg/totop.svg";
import FooterMenu from "../part/FooterMenu";
import { BackTop, Image, Row, Col, Drawer, Button } from 'antd';
import { DownOutlined, MenuOutlined } from '@ant-design/icons';

const Container = React.lazy(() => import('./Container'));

export interface TopMenuProps {
    judul: string;

}
export interface TopMenuState {
    pageReady: boolean;
    menu: any;
    visible: boolean;
}

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

class TopMenu extends React.Component<TopMenuProps, TopMenuState> {
    state = {
        pageReady: false,
        visible: false,
        menu: <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    English
                </a>
            </Menu.Item>
        </Menu>
    };
    setVisible(arg: boolean) {
        console.log(arg);
        this.setState({ visible: arg });
    };
    showDrawer = () => {
        this.setVisible(true);
    };
    onClose = () => {
        this.setVisible(false);
    };

    render() {

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
                    <Header style={{ position: 'fixed', zIndex: 2, width: '100%', padding: 0, margin: 0 }} >
                        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']} className="mobilehidden">
                            <Menu.Item key="1">
                                <Link to="/">
                                    <Avatar shape="square" size="large" icon={<img src={logoHeader} alt="logokerjaapp" />} className="logo" />
                                </Link>
                            </Menu.Item>
                            <SubMenu key="2" style={{ fontFamily: 'Poppins' }} icon={<DownOutlined />} title="Indonesia">
                                <Menu.Item key="English">
                                    <Link to="/english" style={{ fontFamily: 'Poppins' }}>
                                        English
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item key="3">
                                <Link to="/login" style={{ fontFamily: 'Poppins' }}>Login</Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to="/signup" style={{ fontFamily: 'Poppins' }}>Sign Up</Link>
                            </Menu.Item>
                        </Menu>
                        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} >
                            <Menu.Item key="1">

                                <div className="drawerhidden">
                                    <Button type="primary" onClick={this.showDrawer} className="btnmobile">
                                        <FontAwesomeIcon icon={faBars} style={{ fontSize: 21 }} />

                                    </Button>
                                    <Drawer title="Basic Drawer" placement="right" onClose={this.onClose} visible={this.state.visible}>
                                        <p>Some contents...</p>
                                        <p>Some contents...</p>
                                        <p>Some contents...</p>
                                    </Drawer>
                                </div>
                            </Menu.Item>
                        </Menu>

                    </Header>
                    {/* <Header style={{ position: 'fixed', zIndex: 2, width: '100%', padding: 0, margin: 0 }} >
                        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}> */}
                    {/* </Menu>
                    </Header> */}

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
