import React from "react";
import { connect } from 'react-redux'
import http from "@/utils/http";
import { Form, Input, Button, Checkbox, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.scss';

class Login extends React.Component{

    constructor() {
        super();
        this.state = {
            loading: false
        }
    }

    onFinish = values => {
        console.log('Received values of form: ', values);
        this.setState({
            loading: true
        });
        let form = new FormData();
        form.append("client_id", "mvc");
        form.append("client_secret", "123456");
        form.append("grant_type", "password");
        form.append("username", values.username);
        form.append("password", values.password);

        http({
            url: '/auth/connect/token',
            method: 'post',
            data: form
        }).then(res=>{
            this.setState({
                loading: false
            });
        }).catch(err=>{
            this.setState({
                loading: false
            });
        })
    };

    render() {
        return (
            <div className="login-container">
                <div className="login-form">
                    <Spin tip="登录中..." spinning={!!this.state.loading}>
                        <h3>后台管理系统</h3>
                        <Form
                            name="normal_login"
                            initialValues={{ remember: true }}
                            onFinish={this.onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: '请输入账号!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="账号" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '请输入密码!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>记住我</Checkbox>
                                </Form.Item>

                                <a className="login-form-forgot" href="">
                                    忘记密码
                                </a>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" size="large" htmlType="submit" className="login-form-button">
                                    登 录
                                </Button>
                                <div className="login-register-link">
                                    新用户？<a href="">现在注册</a>
                                </div>
                            </Form.Item>
                        </Form>
                    </Spin>
                </div>
            </div>
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

export default connect(stateToProps, dispatchToProps)(Login);
