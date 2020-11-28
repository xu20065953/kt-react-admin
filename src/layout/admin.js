import React, { Component } from "react";
import { connect } from 'react-redux'
import {Link, Redirect, withRouter} from "react-router-dom";
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import { Scrollbars } from 'react-custom-scrollbars';

const { Header, Sider, Content } = Layout;
import SideMenu from './components/SideMenu'

import { getUserInfo } from "@/api/login"
import { setToken, setUserInfo } from "@/store/actions"


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
            // console.log(this.props);
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
                    <Scrollbars style={{height: 'calc(100vh - 64px)'}}>
                        {/*导航菜单*/}
                        <SideMenu></SideMenu>
                    </Scrollbars>
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
        token: state.user.token,
        userInfo: state.user.userInfo
    }
}

// 将 action 派发到 store
const dispatchToProps = (dispatch)=>{
    return {
        setToken(token){
            dispatch(setToken(token))
        },
        setUserInfo(user){
            dispatch(setUserInfo(user))
        }
    }
}

export default connect(stateToProps, dispatchToProps)(withRouter(Admin));
// export default Admin;
