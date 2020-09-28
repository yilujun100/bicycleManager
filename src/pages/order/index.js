import React, { Component } from 'react';
import { Card, Button, Table, Form, Modal, message } from 'antd';
import axios from './../../axios';
import Utils from './../../utils';
const FormItem = Form.Item;

export default class Order extends Component {
    state = {
        list: [],
        selectedRowKeys: [],
        selectedItem: null,
        orderInfo: null,
        orderConfirmVisible: false
    };
    params = {
        page: 1
    };

    componentDidMount() {
        this.requestList();
    }

    onRowClick = (record, index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        });
    };

    requestList = () => {
        const _this = this;
        axios.ajax({
            url: '/order/list',
            data: {
                params: this.params
            }
        }).then(res => {
            const list = res.result.item_list.map((item, index) => {
                item.key = index;
                return item;
            });
            this.setState({
                list,
                pagination: Utils.pagination(res, current => {
                    _this.params.page = current;
                    _this.requestList();
                })
            })
        });
    };

    openOrderDetail = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请先选择一条订单'
            });
            return;
        }
        const ORDER_DETAIL_RUL = process.env.NODE_ENV === 'development'
            ? `/#/common/order/detail/${item.id}`
            : `/bicyclemanager/#/common/order/detail/${item.id}`;
        window.open(ORDER_DETAIL_RUL, '_blank');
    };

    // 结束订单二次确认
    handleConfirm = () => {
        let item = this.state.selectedItem;
        console.log(item);
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请选择一条订单进行结束'
            });
            return;
        }
        axios.ajax({
            url: '/order/ebike_info',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then(res => {
            if (res.code === 0) {
                this.setState({
                    orderInfo: res.result,
                    orderConfirmVisible: true
                })
            }
        });
    };

    // 结束订单
    handleFinishOrder = () => {
        const { selectedItem } = this.state;
        axios.ajax({
            url: '/order/finish_order',
            data: {
                params: {
                    orderId: selectedItem.id
                }
            }
        }).then(res => {
            if (res.code === 0) {
                message.success('订单结束成功');
                this.setState({
                    orderConfirmVisible: false
                });
                this.requestList();
            }
        });
    };

    render() {
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance) {
                    return distance / 1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ];
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        };
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type: 'radio',
            wrapperCol: {
                span: 19
            },
            selectedRowKeys
        };

        return (
            <div style={{width: '100%'}}>
                <Card style={{marginTop: 10}}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{marginLeft: 10}} onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            };
                        }}
                    />
                </div>
                {
                    this.state.orderConfirmVisible && (
                        <Modal
                            title="结束订单"
                            visible={this.state.orderConfirmVisible}
                            onCancel={() => {
                                this.setState({
                                    orderConfirmVisible: false
                                })
                            }}
                            onOk={this.handleFinishOrder}
                            width={600}
                        >
                            <FormItem label="车辆编号" {...formItemLayout}>
                                {this.state.orderInfo.bike_sn}
                            </FormItem>
                            <FormItem label="剩余电量" {...formItemLayout}>
                                {this.state.orderInfo.battery + '%'}
                            </FormItem>
                            <FormItem label="行程开始时间" {...formItemLayout}>
                                {this.state.orderInfo.start_time}
                            </FormItem>
                            <FormItem label="当前位置" {...formItemLayout}>
                                {this.state.orderInfo.location}
                            </FormItem>
                        </Modal>
                    )
                }
            </div>
        );
    }
}