import React, { Component } from 'react';
import { Card, Form, Button, Input, Checkbox, Radio, Select, Switch, DatePicker, TimePicker, Upload, InputNumber, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea= Input.TextArea;

class FormRegister extends Component {
    state = {
        loading: false
    };

    handleSubmit = userInfo =>{
        console.log(JSON.stringify(userInfo))
        message.success(`${userInfo.userName} 恭喜你，注册成功，当前密码为：${userInfo.pwd}`)
    };

    getBase64 = (img, callback)=>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                userImg:imageUrl,
                loading: false,
            }));
        }
    };

    render() {
        const fromItemLayout = {
            labelCol: {
                xs: 24,
                sm: 4
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        };
        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    offset: 4
                }
            }
        };
        const rowObject = {
            minRows: 4,
            maxRows: 6
        };
        return (
            <div style={{width: '100%'}}>
                <Card title="注册表单">
                    <Form
                        layout="horizontal"
                        initialValues={{
                            userName: '',
                            pwd: '',
                            sex: '1',
                            age: 18,
                            state: '2',
                            interest: ['2', '5'],
                            isMarried: true,
                            birthday: moment('2018-08-08'),
                            address: '成都市天府广场',
                            time: '',
                            userImg: ''
                        }}
                        {...fromItemLayout}
                        onFinish={this.handleSubmit}
                    >
                        <FormItem
                            label="用户名"
                            name="userName"
                            rules={
                                [
                                    { required: true, message: '用户名不能为空' }
                                ]
                            }
                        >
                            <Input placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem
                            label="密码"
                            name="pwd"
                        >
                            <Input type="password" placeholder="请输入密码" />
                        </FormItem>
                        <FormItem
                            label="性别"
                            name="sex"
                        >
                            <RadioGroup>
                                <Radio value="1">男</Radio>
                                <Radio value="2">女</Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem
                            label="年龄"
                            name="age"
                        >
                            <InputNumber />
                        </FormItem>
                        <FormItem
                            label="当前状态"
                            name="state"
                        >
                            <Select>
                                <Option value="1">咸鱼一条</Option>
                                <Option value="2">风华浪子</Option>
                                <Option value="3">北大才子一枚</Option>
                                <Option value="4">百度FE</Option>
                                <Option value="5">创业者</Option>
                            </Select>
                        </FormItem>
                        <FormItem
                            label="爱好"
                            name="interest"
                        >
                            <Select mode="multiple">
                                <Option value="1">游泳</Option>
                                <Option value="2">打篮球</Option>
                                <Option value="3">踢足球</Option>
                                <Option value="4">跑步</Option>
                                <Option value="5">爬山</Option>
                                <Option value="6">骑行</Option>
                                <Option value="7">桌球</Option>
                                <Option value="8">麦霸</Option>
                            </Select>
                        </FormItem>
                        <FormItem
                            label="是否已婚"
                        >
                            <FormItem name="isMarried" valuePropName="checked" noStyle>
                                <Switch />
                            </FormItem>
                        </FormItem>
                        <FormItem
                            label="生日"
                            name="birthday"
                        >
                            <DatePicker />
                        </FormItem>
                        <FormItem
                            label="联系地址"
                            name="address"
                        >
                            <TextArea autoSize={rowObject} />
                        </FormItem>
                        <FormItem
                            label="早起时间"
                            name="time"
                        >
                            <TimePicker />
                        </FormItem>
                        <FormItem
                            label="头像"
                        >
                            <Upload
                                name="userImg"
                                listType="picture-card"
                                showUploadList={false}
                                action="//jsonplaceholder.typicode.com/posts/"
                                onChange={this.handleChange}
                            >
                                {this.state.userImg ? <img src={this.state.userImg} width="100" height="100" alt="userImg" /> : <PlusOutlined />}
                            </Upload>
                        </FormItem>
                        <FormItem
                            {...offsetLayout}
                        >
                            <Checkbox>我已阅读过<a href="void: 0">用户协议</a></Checkbox>
                        </FormItem>
                        <FormItem
                            {...offsetLayout}
                        >
                            <Button type="primary" htmlType="submit">注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default FormRegister;