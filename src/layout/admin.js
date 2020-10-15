import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    AppstoreOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;


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
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="dark"
                    >
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            <Link to="/sys/role">角色管理</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined />}>
                            Option 2
                        </Menu.Item>
                        <Menu.Item key="3" icon={<ContainerOutlined />}>
                            Option 3
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                            <Menu.Item key="5">Option 5</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <SubMenu key="sub3" title="Submenu">
                                <Menu.Item key="11">Option 11</Menu.Item>
                                <Menu.Item key="12">Option 12</Menu.Item>
                            </SubMenu>
                        </SubMenu>
                    </Menu>
                </Sider>

                <Content className="site-layout-content">
                    {this.props.children}
                </Content>
            </Layout>

        )
    }
}

export default Admin;
