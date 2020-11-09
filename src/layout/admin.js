import React, { Component } from "react";
import { connect } from 'react-redux'
import {Link, Redirect, withRouter} from "react-router-dom";
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
import SideMenu from './components/SideMenu'

import { getUserInfo } from "@/api/login"


class Admin extends Component{
    state = {
        collapsed: false,
    };

    componentWillMount(){
        if (this.props.token){
            // 获取用户信息
            getUserInfo().then(res=>{
                let data = res.data;
                this.props.setUserInfo(data);
            });
        }
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        const isLogin = this.props.token ? true : false;
        if (!isLogin) {
            console.log(this.props);
            let redirect = this.props.location.pathname + this.props.location.search;
            return <Redirect to={'/login?redirect=' + redirect} />;
        }

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

// 将redux state 映射为props
const stateToProps = (state)=>{
    return {
        token: state.token,
        userInfo: state.userInfo
    }
}

// 将 action 派发到 store
const dispatchToProps = (dispatch)=>{
    return {
        setToken(token){
            let action = {
                type: 'set_token',
                value: token
            }
            dispatch(action)
        },
        setUserInfo(user){
            let action = {
                type: 'set_user',
                value: user
            }
            dispatch(action)
        }
    }
}

export default connect(stateToProps, dispatchToProps)(withRouter(Admin));
// export default Admin;
