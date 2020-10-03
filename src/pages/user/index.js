import React, { Component } from 'react';
import { Card, Button, Form, Input, Select, Radio, Modal, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from './../../axios';
import Utils from './../../utils';
import BaseForm from './../../components/BaseForm';
import ETable from './../../components/ETable';
import Moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class User extends Component {
    state = {
        list: [],
        selectedRowKeys: [],
        selectedItem: null,
        title: '',
        isVisible: false,
        type: '',
        userInfo: null
    };

    params = {
        page: 1
    };

    formList = [
        {
            type: 'INPUT',
            label: '用户名',
            field: 'user_name',
            placeholder: '请输入用户名',
            width: 130
        },
        {
            type: 'INPUT',
            label: '手机号',
            field: 'user_mobile',
            placeholder: '请输入手机号',
            width: 140
        },
        {
            type: 'DATE',
            label: '请选择入职日期',
            field: 'user_date',
            placeholder: '请输入日期',
            width: 100
        }
    ];

    initialValues = {
        'user_name': '',
        'user_mobile': '',
        'user_date': ''
    };

    handleFilter = params => {
        this.params = params;
        this.requestList();
    };

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        const _this = this;
        axios.requestList(_this, '/user/list', this.params, true);
    };

    // 操作员工
    handleOperator = type => {
        let item = this.state.selectedItem;
        if (type === 'create') {
            this.setState({
                title: '创建员工',
                isVisible: true,
                type
            });
        } else if (type === 'edit' || type === 'detail') {
            if (!item) {
                Modal.info({
                    title: '信息',
                    content: '请选择一个用户'
                });
                return;
            }
            this.setState({
                title: type === 'edit' ? '编辑用户' : '查看详情',
                isVisible: true,
                userInfo: item,
                type
            });
        } else if (type === 'delete') {
            if (!item) {
                Modal.info({
                    title: '信息',
                    content: '请选择一个用户'
                });
                return;
            }
            Modal.confirm({
                title: '确认删除',
                content: '是否要删除当前选中的员工',
                onOk: () => {
                    axios.ajax({
                        url:'/user/delete',
                        data:{
                            params:{
                                id:item.id
                            }
                        }
                    }).then(res => {
                        if(res.code === 0){
                            this.setState({
                                isVisible:false
                            })
                            this.userFormRef.current.resetFields();
                            this.requestList();
                        }
                    });
                }
            })
        }
    };

    handleSubmit = () => {
        let type = this.state.type;
        let data = this.userFormRef.current.getFieldsValue();
        axios.ajax({
            url:type === 'create' ? '/user/add' : '/user/edit',
            data: {
                params: {
                    ...data
                }
            }
        }).then((res)=>{
            if(res.code === 0){
                this.setState({
                    isVisible:false
                });
                this.userFormRef.current.resetFields();
                this.requestList();
            }
        });
    };

    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'username'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    const config = {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '北大才子一枚',
                        '4': '百度FE',
                        '5': '创业者'
                    };
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(interest) {
                    const config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    };
                    return config[interest];
                }
            },
            {
                title: '婚否',
                dataIndex: 'isMarried',
                render(isMarried) {
                    return isMarried ? '已婚' : '未婚';
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '联系地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            }
        ];
        let footer = {};
        if (this.state.type === 'detail') {
            footer = {
                footer: null
            };
        }
        return (
            <div style={{width: '100%'}}>
                <Card>
                    <BaseForm formList={this.formList} initialValues={this.initialValues} filterSubmit={this.handleFilter} />
                </Card>
                <Card style={{marginTop: 10}}>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => this.handleOperator('create')}>创建员工</Button>
                    <Button type="primary" icon={<EditOutlined />} style={{marginLeft: 10}} onClick={() => this.handleOperator('edit')}>编辑员工</Button>
                    <Button type="primary" style={{marginLeft: 10}} onClick={() => this.handleOperator('detail')}>员工详情</Button>
                    <Button type="danger" icon={<DeleteOutlined />} style={{marginLeft: 10}} onClick={() => this.handleOperator('delete')}>删除员工</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                        pagination={this.state.pagination}
                    />
                </div>
                {/* <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    width={800}
                    onCancel={() => {
                        this.userFormRef.current.resetFields();
                        this.setState({
                            isVisible: false,
                            userInfo: ''
                        });
                    }}
                    {...footer}
                >
                    <UserForm userInfo={this.state.userInfo} type={this.state.type} wrappedComponentRef={inst => this.userFormRef = inst} />
                </Modal> */}
            </div>
        );
    }
}

class UserForm extends Component {
    userFormRef = React.createRef();
    getState = state => {
        return {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '北大才子一枚',
            '4': '百度FE',
            '5': '创业者'
        }[state];
    };

    componentDidMount() {
        this.props.wrappedComponentRef(this.userFormRef);
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 }
        };
        const { userInfo, type } = this.props;
        return (
            <Form
                layout="horizontal"
                {...formItemLayout}
                initialValues={{
                    'user_name': userInfo !== null ? userInfo.username : '',
                    sex: userInfo !== null ? userInfo.sex : '',
                    state: userInfo !== null ? userInfo.state : '',
                    birthday: userInfo !== null ? Moment(userInfo.birthday) : '',
                    address: userInfo !== null ? userInfo.address : ''
                }}
                ref={this.userFormRef}
            >
                <FormItem label="姓名" name="user_name">
                    {
                        userInfo && type === 'detail'
                        ? userInfo.username
                        : <Input type="text" placeholder="请输入姓名" />
                    }
                </FormItem>
                <FormItem label="性别" name="sex">
                    {
                        userInfo && type === 'detail'
                        ? userInfo.sex
                        : (
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label="状态" name="state">
                    {
                        userInfo && type === 'detail'
                        ? this.getState(userInfo.state)
                        : (
                            <Select>
                                <Option value={1}>咸鱼一条</Option>
                                <Option value={2}>风华浪子</Option>
                                <Option value={3}>北大才子一枚</Option>
                                <Option value={4}>百度FE</Option>
                                <Option value={5}>创业者</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="生日" name="birthday">
                    {
                        userInfo && type === 'detail'
                        ? userInfo.birthday
                        : <DatePicker />
                    }
                </FormItem>
                <FormItem label="联系地址" name="address">
                    {
                        userInfo && type === 'detail'
                        ? userInfo.address
                        : <Input.TextArea rows={3} placeholder="请输入联系地址" />
                    }
                </FormItem>
            </Form>
        );
    }
}

export default User;