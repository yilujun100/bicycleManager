import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import MenuConfig from './../../config/menuConfig';
import './index.less';
import { connect } from 'react-redux';
import {
    getMenuAction
} from './../../store/actionCreator';

const { SubMenu } = Menu;

class NavLeft extends React.Component {
    constructor(props) {
        super(props);
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.state = {
            menuTreeNode,
            currentKey: window.location.hash.replace(/#|\?.*$/g, '')
        };
    }

    // 菜单渲染
    renderMenu = data => {
        return data.map(item => {
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={item.key}>
                        { this.renderMenu(item.children) }
                    </SubMenu>
                );
            }
            return <Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}>{ item.title }</NavLink>
            </Menu.Item>;
        });
    }

    // 菜单点击
    handleClick = ({ item, key }) => {
        if (key === this.state.currentKey) {
            return false;
        }
        const { dispatch } = this.props;
        const action = getMenuAction(item.props.title);
        dispatch(action);
        this.setState({
            currentKey: key
        });
    };

    handleHomeClick = () => {
        const { dispatch } = this.props;
        const action = getMenuAction('首页');
        dispatch(action);
        this.setState({
            currentKey: '/home'
        });
    };

    render() {
        const logoSrc = process.env.NODE_ENV === 'development' ? '/assets/logo-ant.svg' : `${process.env.PUBLIC_URL}/assets/logo-ant.svg`;
        return (
            <div>
                <NavLink to="/home" onClick={this.handleHomeClick}>
                    <div className="logo">
                        <img src={logoSrc} alt="" />
                        <h1>Bicycle MS</h1>
                    </div>
                </NavLink>
                <Menu
                    onClick={this.handleClick}
                    theme="dark"
                    selectedKeys={this.state.currentKey}
                >
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        );
    }
}

export default connect()(NavLeft);
