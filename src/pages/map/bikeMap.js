import React, { Component } from 'react';
import { Card } from 'antd';
import axios from './../../axios';
import BaseForm from './../../components/BaseForm';

class BikeMap extends Component {
    state = {

    };

    formList = [
        {
            type: '城市',
            placeholder: '全部'
        },
        {
            type: '时间查询'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            placeholder: '全部',
            width: 150,
            list: [
                { id: '0', name: '全部' },
                { id: '1', name: '进行中' },
                { id: '2', name: '行程结束' }
            ]
        }
    ];

    initalValues = {
        city: '0',
        start_time: '',
        end_time: '',
        order_status: '0'
    };

    params = {
        page: 1
    };

    // 查询表单
    handleFilterSubmit = filterParams => {
        this.params = filterParams;
        this.requestList();
    };

    // 列表请求
    requestList = () => {
        axios.ajax({
            url: '/map/bike_list',
            data: {
                params: this.params
            }
        }).then(res => {
            if (res.code === 0) {
                this.setState({
                    total_count: res.result.total_count
                });
                this.renderMap(res.result);
            }
        });
    };

    // 渲染地图
    renderMap = res => {
        const list = res.route_list;
        this.map = new window.BMap.Map('container', { enableMapClick: false });
        let gps1 = list[0].split(',');
        let startPoint = new window.BMap.Point(gps1[0], gps1[1]);
        let gps2 = list[list.length - 1].split(',');
        let endPoint = new window.BMap.Point(gps2[0], gps2[1]);
        this.map.centerAndZoom(endPoint, 11);

        // 添加起始图标
        let startPointIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        });
        let bikeMarkerStart = new window.BMap.Marker(startPoint, { icon: startPointIcon });
        this.map.addOverlay(bikeMarkerStart);
        let endPointIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        });
        let bikeMarkerEnd = new window.BMap.Marker(endPoint, { icon: endPointIcon });
        this.map.addOverlay(bikeMarkerEnd);

        // 绘制车辆行驶路线
        const routeList = [];
        list.forEach(item => {
            let p = item.split(',');
            let point = new window.BMap.Point(p[0], p[1]);
            routeList.push(point);
        });
        let polyLine = new window.BMap.Polyline(routeList, {
            strokeColor: '#ef4136',
            strokeWeight: 3,
            strokeOpacity: 1
        });
        this.map.addOverlay(polyLine);

        // 绘制服务区
        let serviceList = res.service_list;
        let servicePointist = [];
        serviceList.forEach((item) => {
            let point = new window.BMap.Point(item.lon, item.lat);
            servicePointist.push(point);
        });
        let polyServiceLine = new window.BMap.Polyline(servicePointist, {
            strokeColor: '#ef4136',
            strokeWeight: 3,
            strokeOpacity: 1
        });
        this.map.addOverlay(polyServiceLine);

        // 添加地图中的自行车图标
        let bikeList = res.bike_list;
        let bikeIcon = new window.BMap.Icon('assets/bike.jpg', new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        });
        bikeList.forEach((item) => {
            let p = item.split(",");
            let point = new window.BMap.Point(p[0], p[1]);
            var bikeMarker = new window.BMap.Marker(point, { icon: bikeIcon });
            this.map.addOverlay(bikeMarker);
        });

        // 添加地图控件
        this.addMapControl();
    };

    // 添加地图控件
    addMapControl = () => {
        let map = this.map;
        // 左上角，添加比例尺
        var top_right_control = new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT});
        var top_right_navigation = new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT});
        //添加控件和比例尺
        map.addControl(top_right_control);
        map.addControl(top_right_navigation);
        map.enableScrollWheelZoom(true);
        // legend.addLegend(map);
    };

    componentDidMount() {
        this.requestList();
    }

    render() {
        return (
            <div style={{width: '100%'}}>
                <Card>
                    <BaseForm formList={this.formList} initialValues={this.initialValues} filterSubmit={this.handleFilterSubmit} />
                </Card>
                <Card style={{marginTop: 10}}>
                    <div>共{this.state.total_count}辆车</div>
                    <div id="container" style={{height: 500}}></div>
                </Card>
            </div>
        );
    }
}

export default BikeMap;