import React from 'react';
import { Row, Col } from 'antd';
import './index.less';
import Util from '../../utils';
import axios from '../../axios';

export default class Header extends React.Component {
    state = {};

    componentDidMount() {
        this.setState({
            userName: 'yilujun100'
        });
        setInterval(() => {
            let sysTime = Util.formatDate(new Date().getTime());
            this.setState({
                sysTime
            });
        }, 1000);
        this.getWeatherAPIData();
    }

    getWeatherAPIData() {
        let city = '成都';
        axios.jsonp({
            url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=rCoT9oPRq1tuugGRb6pcXtN7RUVGGI9K'
        }).then(res => {
            const {dayPictureUrl, weather} = res.results[0].weather_data[0];
            this.setState({
                dayPictureUrl,
                weather
            });
        });
    }

    render() {
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span={24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="void: 0">退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span={4} className="breadcrumb-title">首页</Col>
                    <Col span={20} className="weather">
                        <span className="date">{this.state.sysTime}</span>
                        <span className="weather-img">
                            <img src={this.state.dayPictureUrl} alt=""/>
                        </span>
                        <span className="weather-detail">
                            {this.state.weather}
                        </span>
                    </Col>
                </Row>
            </div>
        );
    }
};