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

export default connect(stateToProps, dispatchToProps)(AuthorizedRoute);
