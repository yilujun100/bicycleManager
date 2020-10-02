import React from 'react';
import { Select } from 'antd';
const Option = Select.Option;

export default {
    formatDate(timestamp) {
        if (!timestamp) return '';
        let date = new Date(timestamp);
        let year = date.getFullYear();
        let month = this.toDouble(date.getMonth() + 1);
        let day = this.toDouble(date.getDate());
        let hour = this.toDouble(date.getHours());
        let minute = this.toDouble(date.getMinutes());
        let second = this.toDouble(date.getSeconds());
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },

    toDouble(str) {
        return str < 10 ? '0' + str : str;
    },

    pagination(data, callback) {
        return {
            onChange: current => {
                callback(current);
            },
            current: data.result.page,
            pageSize: data.result.page_size,
            total: data.result.total_count,
            showTotal: () => {
                return `共${data.result.total_count}条`;
            },
            showQuickJumper: true
        };
    },

    getOptionList(data) {
        if (!data) {
            return [];
        }
        let options = [];
        data.forEach(item => {
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>);
        });
        return options;
    }
};