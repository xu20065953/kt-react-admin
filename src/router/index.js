import React, {Component} from "react";
import App from "../App";

import {
    HashRouter,
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Admin from '@/layout/admin';
import Login from '@/pages/login';
import Dashboard from '@/pages/dashboard';
import SysRole from "@/pages/sys/role/sys-role";

export default class Router extends Component{
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" render={()=>{
                        return (
                            <Admin>
                                <Switch>
                                    <Route path='/dashboard' component={Dashboard} />
                                    <Route path='/sys/role' component={SysRole} />
                                </Switch>
                            </Admin>
                        )
                    }}
                     />
                </Switch>
            </HashRouter>
        )
    }
}
