import React, { Component } from 'react';
import { Card, Spin, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './ui.less';

export default class Loadings extends Component {
    render() {
        const iconLoading = <LoadingOutlined style={{fontSize: 24}} />;
        return (
            <div style={{width: '100%'}}>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small" />
                    <Spin style={{margin: '0 10px'}} />
                    <Spin size="large" />
                    <Spin indicator={iconLoading} style={{marginLeft: 10}} spinning={true} />
                </Card>
                <Card title="内容遮罩" className="card-wrap">
                    <Alert
                        message="Alert message title"
                        description="Further details about the context of this alert."
                        type="info"
                        style={{ marginBottom: 10 }}
                    />
                    <Spin>
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="warning"
                            style={{ marginBottom: 10 }}
                        />
                    </Spin>
                    <Spin tip="加载中...">
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="warning"
                            style={{ marginBottom: 10 }}
                        />
                    </Spin>
                    <Spin indicator={iconLoading}>
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="warning"
                            style={{ marginBottom: 10 }}
                        />
                    </Spin>
                </Card>
            </div>
        );
    }
};
