import React, { Component } from "react";
import { Menu, Modal, Dropdown, Avatar, Icon } from "antd";
import { Link } from "react-router-dom";

export default class TopHeader extends Component{
    state = { };

    handleLogout = (token) => {
        Modal.confirm({
            title: "注销",
            content: "确定要退出系统吗?",
            okText: "确定",
            cancelText: "取消",
            onOk: () => {
                //logout();
            },
        });
    };

    onClick = ({ key }) => {
        switch (key) {
            case "logout":
                this.handleLogout();
                break;
            default:
                break;
        }
    };

    render() {
        const menu = (
            <Menu onClick={this.onClick}>
                <Menu.Item key="dashboard">
                    <Link to="/dashboard">首页</Link>
                </Menu.Item>
                <Menu.Item key="project">
                    <a
                        target="_blank"
                        href="https://github.com/NLRX-WJC/react-antd-admin-template"
                        rel="noopener noreferrer"
                    >
                        项目地址
                    </a>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">注销</Menu.Item>
            </Menu>
        );

        return (
            <>
                <div className="right-menu">
                    <FullScreen />
                    <div className="dropdown-wrap">
                        <Dropdown overlay={menu}>
                            <div>
                                <Avatar shape="square" size="medium" src={avatar} />
                                <Icon style={{ color: "rgba(0,0,0,.3)" }} type="caret-down" />
                            </div>
                        </Dropdown>
                    </div>
                </div>
            </>
        )
    }
}
