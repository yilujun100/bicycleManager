import React, { Component } from 'react';
import { Table } from 'antd';
import './index.less';

class ETable extends Component {
    state = {};

    // 处理行点击事件
    onRowClick = (record, index) => {
        const { rowSelection } = this.props;
        if (rowSelection === 'checkbox') {
            let { selectedRowKeys, selectedIds, selectedItem } = this.props;
            if (selectedIds) {
                const i = selectedIds.indexOf(record.id);
                if (i === -1) { // 避免重复添加
                    selectedIds.push(record.id);
                    selectedRowKeys.push(index);
                    selectedItem.push(record);
                } else {
                    selectedIds.splice(index, 1);
                    selectedRowKeys.splice(index, 1);
                    selectedItem.splice(index, 1);
                }
            } else {
                selectedIds = [record.id];
                selectedRowKeys = [index];
                selectedItem = [record];
            }
            this.props.updateSelectedItem(selectedRowKeys, selectedItem || {}, selectedIds);
        } else {
            let selectKey = [index];
            const { selectedRowKeys } = this.props;
            if (selectedRowKeys && selectedRowKeys[0] === index) {
                return;
            }
            this.props.updateSelectedItem(selectKey, record || {});
        }
    };

    // 选择框变更
    onSelectChange = (selectedRowKeys, selectedRows) => {
        const { rowSelection } = this.props;
        const selectedIds = [];
        if (rowSelection === 'checkbox') {
            selectedRows.forEach(item => {
                selectedIds.push(item.id);
            });
            this.setState({
                selectedRowKeys,
                selectedIds,
                selectedItem: selectedRows[0]
            });
        }
        this.props.updateSelectedItem(selectedRowKeys, selectedRows[0], selectedIds);
    };

    onSelectAll = (selected, selectedRows, changeRows) => {
        const selectedIds = [];
        const selectKey = [];
        selectedRows.forEach((item,i)=> {
            selectedIds.push(item.id);
            selectKey.push(i);
        });
        this.props.updateSelectedItem(selectKey, selectedRows[0] || {}, selectedIds);
    };

    getOptions = () => {
        let p = this.props;
        const nameList = {
            '订单编号': 170,
            '车辆编号': 80,
            '手机号码': 96,
            '用户姓名': 70,
            '密码': 70,
            '运维区域': 300,
            '车型': 42,
            '故障编号': 76,
            '代理商编码': 97,
            '角色ID': 64
        };
        if (p.columns && p.columns.length > 0) {
            p.columns.forEach(item => {
                // 开始/结束 时间
                if (!item.title) {
                    return;
                }
                if (!item.width) {
                    if (item.title.indexOf('时间') > -1 && item.title.indexOf('持续时间') < 0) {
                        item.width = 132;
                    } else if (item.title.indexOf('图片') > -1) {
                        item.width = 86;
                    } else if (item.title.indexOf('权限') > -1 || item.title.indexOf('负责城市') > -1) {
                        item.width = '40%';
                        item.className = 'text-left';
                    } else {
                        if (nameList[item.title]) {
                            item.width = nameList[item.title];
                        }
                    }
                }
                item.bordered = true;
            });
        }
        const { selectedRowKeys } = this.props;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: this.onSelectChange,
            onSelect: (record, selected, selectedRows) => {
                console.log('...');
            },
            onSelectAll: this.onSelectAll
        };
        let row_selection = this.props.rowSelection;
        // 当属性为false或null时，说明没有单选或者复选列
        if (row_selection === false || row_selection === null) {
            row_selection = false;
        } else if (row_selection === 'checkbox') {
            // 设置类型为复选框
            rowSelection.type = 'checkbox';
        } else {
            // 默认为单选
            row_selection = 'radio';
        }
        return (
            <Table
                className="card-wrap page-table"
                bordered
                {...this.props}
                rowSelection={row_selection ? rowSelection : null}
                onRow={(record, index) => ({
                    onClick: () => {
                        if (!row_selection) {
                            return;
                        }
                        this.onRowClick(record, index);
                    }
                })}
            />
        );
    };
    render() {
        return (
            <div>
                {this.getOptions()}
            </div>
        );
    }
}

export default ETable;