import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
import SideMenu from './components/SideMenu'


class Admin extends Component{
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout className={`app-layout ${this.state.collapsed ? "app-layout-collapsed" : ""}`}>
                <Header className="site-layout-header">
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: this.toggle,
                    })}
                </Header>
                <Sider className="site-sidebar-container" trigger={null} collapsible collapsed={this.state.collapsed} >
                    <Link to="/">
                        <div className="logo" />
                    </Link>
                    {/*导航菜单*/}
                    <SideMenu></SideMenu>
                </Sider>

                <Content className="site-layout-content">
                    {this.props.children}
                </Content>
            </Layout>

        )
    }
}

export default Admin;
