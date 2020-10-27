import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu } from 'antd';
import {
    AppstoreOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
} from '@ant-design/icons';
import axios from 'axios'
import { BuildTree } from "@/utils/common"

const { SubMenu } = Menu;

export default class SideMenu extends Component{
    state = {
        MenuItem: []
    };

    componentDidMount() {
        axios({
            url: "/api/Permission/Get",
            method: "post",
            headers: {
                'authorization' : 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkU3RjVFRENBQTBDODlDMzVBMzZEMEM2QjUyRTE1MzM2QkJDNjJDNjkiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiI1X1h0eXFESW5EV2piUXhyVXVGVE5ydkdMR2sifQ.eyJuYmYiOjE2MDM3OTgwOTIsImV4cCI6MTYwMzgwMTY5MiwiaXNzIjoiaHR0cHM6Ly9vYS5rc3RvcGEuY29tLmNuOjgwMDAiLCJhdWQiOiJrc3RvcGEuY29yZS5hcGkiLCJjbGllbnRfaWQiOiJtdmMiLCJzdWIiOiIxIiwiYXV0aF90aW1lIjoxNjAzNzk4MDkyLCJpZHAiOiJsb2NhbCIsImlkIjoiMSIsImF2YXRhclBhdGgiOiJVc2VyL0F2YXRhckltZy9hZG1pbiIsImRlcHQiOiLova_ku7blvIDlj5Hlm6LpmJ8iLCJkZXB0SWQiOiIyMDY2IiwiZW1haWwiOiJibG9nYWRtaW5Aa3N0b3BhLmNvbS5jbiIsImdlbmRlciI6IueUtyIsInVzZXJuYW1lIjoiYWRtaW4iLCJuaWNlTmFtZSI6IuWQjuWPsOaAu-euoeeQhuWRmCIsInBob25lIjoiMTgxMjM0NTY3ODkiLCJvcmdOYW1lIjoi5piG5bGx5L2w5aWl6L2v5Lu25pyJ6ZmQ5YWs5Y-4Iiwib3JnIjoiMTAwMSIsInNjb3BlIjpbImVtYWlsIiwib3BlbmlkIiwicHJvZmlsZSIsImtzdG9wYS5jb3JlLmFwaSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwd2QiXX0.Gy-KENijSLJLs0uiXB8UnVpLVOq2Rt0Me7n8IgcmSUTjKDjH1BhH8RlZ_wTvRHxGGY0uteb9W_EsHEjJX4vg25bD-f0r1GZ0K6TULL56MzDJQ-VZAr6dKxkbeEfqQSBhY5jXw2DiqXmAFwi7nsHGh3df7vZdOkGZWCd37aM_ZZe0SnuKnPjSRcACdB00PBSDckinR_0--SY7hjx_p0Q6-NDu31FVaBQUcbdwQoLJKzaLhkGdSkjUbKXRy5OOUYBD-M5UJc50ly3slyphGkIzK0Vstjn_V9A4x8ueh_Mzvylqtvk7OsK5GPQ57ViLKndcnwgb2XQV2NN-eOrmilwKZg'
            },
            data: {"page":1,"pageSize":2147483647,"sort":[],"filters":[{"groupOp":"AND","rules":[]}]}
        }).then(res=>{
            let r = res.data;
            if (r.success){
                let list = r.response.data.map(item=>{
                    return {
                        id: item.FMenuId,
                        parentId: item.FParentId,
                        name: item.FMenuCode, // 组件名称
                        path: item.FLinkUrl || "/404?id=" + item.FMenuId,
                        hidden: item.FIsHidden,
                        redirect: item.FRedirect,
                        component: item.FComponent,
                        alwaysShow: item.FAlwaysShow,
                        meta: {
                            title: item.FMenuName,
                            icon: item.FIcon,
                            noCache: item.FNoCache
                        },
                    }
                });

                let menu = BuildTree(list, "id", "parentId");
                let MenuItem = menu.map(item=>{
                    return getMenu(item);
                    // return (
                    //     <Menu.Item key={item.id} icon={<PieChartOutlined />}>
                    //         <Link to={item.path}>{item.meta.title}</Link>
                    //     </Menu.Item>
                    // )
                })

                function getMenu(item){
                    if (item.children && item.children.length){
                        return (
                            <SubMenu key={item.id} icon={<MailOutlined />} title={item.meta.title}>
                                {
                                    item.children.map(cate=>{
                                        return getMenu(cate)
                                    })
                                }
                            </SubMenu>
                        )
                    }else {
                        return (
                            <Menu.Item key={item.id} icon={<PieChartOutlined />}>
                                <Link to={item.path}>{item.meta.title}</Link>
                            </Menu.Item>
                        )
                    }
                }

                this.setState({
                    MenuItem: MenuItem
                })
            }
        })
    }

    render() {
        return (
            <div className="side-menu-wrap">
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    {
                        this.state.MenuItem
                    }
                    <Menu.Item key="1x" icon={<PieChartOutlined />}>
                        <Link to="/sys/role">角色管理</Link>
                    </Menu.Item>
                    <Menu.Item key="2x" icon={<DesktopOutlined />}>
                        Option 2
                    </Menu.Item>
                    <Menu.Item key="3x" icon={<ContainerOutlined />}>
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
            </div>
        )
    }
}
