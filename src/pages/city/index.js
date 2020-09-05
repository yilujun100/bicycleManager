import React, { Component } from 'react';
import { Card, Button, Table, Form, Select, Modal, message } from 'antd';
import axios from './../../axios';
import Utils from './../../utils';
const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends Component {

    render() {
        return (
            <Form layout="inline">
                <FormItem
                    label="城市"
                    name="city_id"
                >
                    <Select
                        style={{width: 100}}
                        placeholder="全部"
                    >
                        <Option value="">全部</Option>
                        <Option value="1">北京市</Option>
                        <Option value="2">上海市</Option>
                        <Option value="3">深圳市</Option>
                    </Select>
                </FormItem>
                <FormItem
                    label="用车模式"
                    name="mode"
                >
                    <Select
                        style={{width: 120}}
                        placeholder="全部"
                    >
                        <Option value="">全部</Option>
                        <Option value="1">指定停车点模式</Option>
                        <Option value="2">禁停区模式</Option>
                    </Select>
                </FormItem>
                <FormItem
                    label="营运模式"
                    name="op_mode"
                >
                    <Select
                        style={{width: 80}}
                        placeholder="全部"
                    >
                        <Option value="">全部</Option>
                        <Option value="1">自营</Option>
                        <Option value="2">加盟</Option>
                    </Select>
                </FormItem>
                <FormItem
                    label="加盟商授权状态"
                    name="auth_status"
                >
                    <Select
                        style={{width: 100}}
                        placeholder="全部"
                    >
                        <Option value="">全部</Option>
                        <Option value="1">已授权</Option>
                        <Option value="2">未授权</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin: '0 20px'}}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        );
    }
}

class OpenCityForm extends Component {
    render() {
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        };
        return (
            <Form
                layout="horizontal"
                initialValues={{
                    city_id: '1',
                    op_mode: '1',
                    use_mode: '1'
                }}
                {...formItemLayout}
                ref={this.props.formRef}
            >
                <FormItem
                    label="选择城市"
                    name="city_id"
                >
                    <Select
                        style={{width: 120}}
                        placeholder="全部"
                    >
                        <Option value="">全部</Option>
                        <Option value="1">北京市</Option>
                        <Option value="2">上海市</Option>
                        <Option value="3">深圳市</Option>
                    </Select>
                </FormItem>
                <FormItem
                    label="营运模式"
                    name="op_mode"
                >
                    <Select
                        style={{width: 120}}
                        placeholder="全部"
                    >
                        <Option value="">全部</Option>
                        <Option value="1">自营</Option>
                        <Option value="2">加盟</Option>
                    </Select>
                </FormItem>
                <FormItem
                    label="用车模式"
                    name="use_mode"
                >
                    <Select
                        style={{width: 120}}
                    >
                        <Option value="">全部</Option>
                        <Option value="1">指定停车点</Option>
                        <Option value="2">禁停区</Option>
                    </Select>
                </FormItem>
            </Form>
        );
    }
}

class City extends Component {
    state = {
        list: [],
        isShowOpenCity: false
    };
    params = {
        page: 1
    };
    formRef = React.createRef();

    componentDidMount() {
        this.requestList();
    }

    // 请求mock接口数据
    requestList = () => {
        let _this = this;
        axios.ajax({
            url: '/open_city',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then(res => {
            let list = res.result.item_list.map((item, index) => ({
                ...item,
                key: index
            }));
            this.setState({
                list,
                pagination: Utils.pagination(res, current => {
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        });
    };

    // 开通城市
    handleOpenCity = () => {
        this.setState({
            isShowOpenCity: true
        });
    };

    // 城市开通提交
    handleSubmit = () => {
        console.log(this.formRef.current.getFieldsValue());
        let cityInfo = this.formRef.current.getFieldsValue();
        axios.ajax({
            url: '/city/open',
            data: {
                params: cityInfo
            }
        }).then(res => {
            if (res.code === 0) {
                message.success('开通成功');
                this.setState({
                    isShowOpenCity: false
                });
                this.requestList();
            }
        })
    };

    render() {
        const columns = [
            {
                title: '城市ID',
                dataIndex: 'id'
            },
            {
                title: '城市名称',
                dataIndex: 'name'
            },
            {
                title: '用车模式',
                dataIndex: 'mode',
                render(mode) {
                    return mode === 1 ? '停车点' : '禁停区';
                }
            },
            {
                title: '营运模式',
                dataIndex: 'op_mode',
                render(op_mode) {
                    return op_mode === 1 ? '自营' : '加盟';
                }
            },
            {
                title: '授权加盟商',
                dataIndex: 'franchisee_name'
            },
            {
                title: '城市管理员',
                dataIndex: 'city_admins',
                render(arr) {
                    return arr.map(item => item.user_name).join(',');
                }
            },
            {
                title: '城市开通时间',
                dataIndex: 'open_time'
            },
            {
                title: '操作时间',
                dataIndex: 'update_time',
                render: Utils.formateDate
            },
            {
                title: '操作人',
                dataIndex: 'sys_user_name'
            }
        ];
        return (
            <div style={{width: '100%'}}>
                <Card>
                    <FilterForm />
                </Card>
                <Card style={{marginTop: 10}}>
                    <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal
                    title="开通城市"
                    visible={this.state.isShowOpenCity}
                    onCancel={() => {
                        this.setState({
                            isShowOpenCity: false
                        })
                    }}
                    onOk={this.handleSubmit}
                >
                    <OpenCityForm formRef={this.formRef} />
                </Modal>
            </div>
        );
    }
}

export default City;
