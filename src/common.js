import React, { Component } from 'react';
import { Row } from 'antd';
import Header from './components/Header';
import './styles/common.less';

class common extends Component {
    render() {
        return (
            <div>
                <Row className="simple-page">
                    <Header menuType="second" />
                </Row>
                <Row className="content">
                    {this.props.children}
                </Row>
            </div>
        );
    }
}

export default common;