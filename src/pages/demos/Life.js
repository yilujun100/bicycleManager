/**
 * 组件生命周期
 * created by yilujun on 2020-8-14
 * 首次加载：
 *  constructor Life的构造函数，初始化先执行（执行2次 16.3引入了StrickMode）
 *  componentWillMount, 组件 Life 准备渲染
 *  组件 Life 正在渲染（执行2次 16.3引入了StrickMode）
 *  componentDidMount, 组件 Life 渲染完毕
 * 点击按钮修改状态时：
 *  shouldComponentUpdate, 判断 Life 组件是否应该渲染，默认返回 true
 *  componentWillUpdate, 组件 Life 准备更新了
 *  组件 Life 正在渲染
 *  componentDidUpdate, 组件 Life 更新完毕了
 *
 * 注意：
 *  v16.3版本引入了StrictMode,在开发环境下以下方法会执行2次：
 *  class组件的constructor方法
 *  render方法
 *  shouldComponentUpdate
 *
 * React16新增的ComponentDidCatch生命周期，用来处理报错
 * shouldComponentUpdate返回false,那么组件就不会渲染
 * 如果是子组件，还有个componentWillReceiveProps
 * 组件卸载有componentWillUnmount，用来做资源的清理
 * 合理利用生命周期，在不同阶段做不同的事情
 */
import React from 'react';
import Tank from './Tank';
import { Button, Input } from 'antd';
import './life.less';

class Life extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isKing: true
        };
        console.log('constructor Life的构造函数，初始化先执行');
    }

    handleClick = () => {
        this.setState({
            isKing: !this.state.isKing
        });
    }

    componentWillMount() {
        console.log('componentWillMount, 组件 Life 准备渲染');
    }

    componentDidMount() {
        console.log('componentDidMount, 组件 Life 渲染完毕');
    }

    shouldComponentUpdate() {
        console.log('shouldComponentUpdate, 判断 Life 组件是否应该渲染，默认返回 true');
        return true;
    }

    componentWillUpdate() {
        console.log('componentWillUpdate, 组件 Life 准备更新了');
    }

    componentDidUpdate() {
        console.log('componentDidUpdate, 组件 Life 更新完毕了');
    }

    render() {
        console.log('组件 Life 正在渲染');
        const level = '最强王者';
        const title = this.state.isKing
            ? <p>早睡早起，理性游戏</p>
            : <h2>我们的目标是{level}</h2>;
        const wordList = ['俺老孙来也', '有妖气', '取经之路，就在脚下'];
        return (
            <div className="content">
                <Input/>
                <Button onClick={this.handleClick}>antd点我</Button>
                <button onClick={this.handleClick}>点我</button>
                {title}
                {this.state.isKing ? <p>我就是王者</p> : null}
                <ul>
                    {
                        wordList.map(v =><li key={v}>{v}</li>)
                    }
                </ul>
                <Tank name="程咬金" />
            </div>
        );
    }
}

export default Life;