import JsonP from 'jsonp';
import axios from 'axios';
import { Modal } from 'antd';
import Utils from './../utils';

export default class Axios {
    static requestList(_this, url, params, isMock=true) {
        const data = {
            params,
            isMock
        };
        this.ajax({
            url,
            data
        }).then(res => {
            if (res && res.result) {
                const list = res.result.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                });
                _this.setState({
                    list,
                    pagination: Utils.pagination(res, current => {
                        _this.params.page = current;
                        _this.requestList();
                    })
                });
            }
        });
    }

    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, function(err, response) {
                if (response.status === 'success') {
                    resolve(response);
                } else {
                    reject(response.message);
                }
            })
        })
    }

    static ajax(options) {
        let loading;
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseApi = '';
        if (options.isMock) {
            baseApi = 'http://47.98.220.220:7300/mock/5f8e87b14830e81032f44ba3/api';
            // baseApi = 'https://www.easy-mock.com/mock/5f4fa47a66f90555e2209e3b/api';
        } else {
            baseApi = 'http://47.98.220.220:7300/mock/5f8e87b14830e81032f44ba3/api';
            // baseApi = 'https://www.easy-mock.com/mock/5f4fa47a66f90555e2209e3b/api';
        }
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                baseURL: baseApi,
                timeout: 5000
            }).then(response => {
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if (response.status === 200) {
                    const res = response.data;
                    if (res.code === 0) {
                        resolve(res);
                    } else {
                        Modal.info({
                            title: '提示',
                            content: res.msg
                        })
                    }
                } else {
                    console.log('reject');
                    reject(response.data);
                }
            }).catch(err => {
                console.log('error', err);
                Modal.info({
                    type: 'error',
                    title: '提示',
                    content: err.message
                });
                loading.style.display = 'none';
            });
        });
    }
};
