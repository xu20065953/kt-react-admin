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
import http from '@/utils/http'
import { BuildTree } from "@/utils/common"

const { SubMenu } = Menu;

export default class SideMenu extends Component{
    state = {
        MenuItem: []
    };

    componentDidMount() {
        http({
            url: "/api/Permission/Get",
            method: "post",
            data: {"page":1,"pageSize":2147483647,"sort":[],"filters":[{"groupOp":"AND","rules":[]}]}
        }).then(res=>{
            let r = res;
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
                    {/*<Menu.Item key="2x" icon={<DesktopOutlined />}>*/}
                    {/*    Option 2*/}
                    {/*</Menu.Item>*/}
                    {/*<Menu.Item key="3x" icon={<ContainerOutlined />}>*/}
                    {/*    Option 3*/}
                    {/*</Menu.Item>*/}
                    {/*<SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">*/}
                    {/*    <Menu.Item key="5">Option 5</Menu.Item>*/}
                    {/*    <Menu.Item key="6">Option 6</Menu.Item>*/}
                    {/*    <Menu.Item key="7">Option 7</Menu.Item>*/}
                    {/*    <Menu.Item key="8">Option 8</Menu.Item>*/}
                    {/*</SubMenu>*/}
                    {/*<SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">*/}
                    {/*    <Menu.Item key="9">Option 9</Menu.Item>*/}
                    {/*    <Menu.Item key="10">Option 10</Menu.Item>*/}
                    {/*    <SubMenu key="sub3" title="Submenu">*/}
                    {/*        <Menu.Item key="11">Option 11</Menu.Item>*/}
                    {/*        <Menu.Item key="12">Option 12</Menu.Item>*/}
                    {/*    </SubMenu>*/}
                    {/*</SubMenu>*/}
                </Menu>
            </div>
        )
    }
}
