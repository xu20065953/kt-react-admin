import React, {Component} from "react";
import App from "../App";

import {
    HashRouter,
    BrowserRouter,
    Switch,
    Route,
    Link,
    Redirect
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
                                    <Redirect to="/dashboard" />
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


// 异步按需加载component
function asyncComponent(getComponent) {
    return class AsyncComponent extends React.Component {
        static Component = null;
        state = { Component: AsyncComponent.Component };

        componentDidMount() {
            if (!this.state.Component) {
                getComponent().then(({default: Component}) => {
                    AsyncComponent.Component = Component
                    this.setState({ Component })
                })
            }
        }
        //组件将被卸载
        componentWillUnmount(){
            //重写组件的setState方法，直接返回空
            this.setState = (state,callback)=>{
                return;
            };
        }
        render() {
            const { Component } = this.state
            if (Component) {
                return <Component {...this.props} />
            }
            return null
        }
    }
}

function load(component) {

    return import(/* webpackChunkName: "[request]" */`@/pages${component}`)
}
