import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserInfo } from "@/api/login"

class AuthorizedRoute extends React.Component{
    componentWillMount(){
        if (this.props.token){
            // 获取用户信息
            getUserInfo().then(res=>{
                let data = res.data;
                this.props.setUserInfo(data);
            });
        }
    }
    render() {
        const { component: Component, ...rest } = this.props
        const isLogin = this.props.token ? true : false;
        return (
            <Route {...rest} render={props => {
                return isLogin
                    ?  <Component {...props} />
                    : <Redirect to="/login" />
            }} />
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

import {setToken, setUserInfo} from "@/store/actions"
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

export default connect(stateToProps, dispatchToProps)(AuthorizedRoute);
