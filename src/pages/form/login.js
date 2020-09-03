import React, { Component } from 'react';
import { Card, Form, Input, Button, message, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const FormItem = Form.Item;

class FormLogin extends Component {
    handleSubmit = userInfo => {
        message.success(`${userInfo.userName} 恭喜你，登录成功，当前密码为：${userInfo.pwd}`);
    };

    render() {
        return (
            <div style={{width: '100%'}}>
                <Card title="登录行内表单">
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem>
                            <Input placeholder="请输入密码" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary">登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="登录水平表单" style={{marginTop: 10}}>
                    <Form
                        style={{width: 300}}
                        initialValues={{
                            userName: '',
                            pwd: '',
                            remember: true
                        }}
                        onFinish={this.handleSubmit}
                    >
                        <FormItem
                            name="userName"
                            rules={
                                [
                                    { required: true, message: '用户名不能为空' },
                                    { min: 5, max: 10, message: '长度在 5 到 10 个字符' },
                                    { pattern: new RegExp('^\\w+$', 'g'), message: '用户名必须为字母或者数字' }
                                ]
                            }
                        >
                            <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem
                            name="pwd"
                        >
                            <Input prefix={<LockOutlined />} type="password" placeholder="请输入密码" />
                        </FormItem>
                        <FormItem>
                            <FormItem name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住密码</Checkbox>
                            </FormItem>
                            <a href="void: 0" style={{float: 'right'}}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit">登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default FormLogin;