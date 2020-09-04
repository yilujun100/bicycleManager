import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import MenuConfig from './../../config/menuConfig';
import './index.less';

const { SubMenu } = Menu;

export default class NavLeft extends React.Component {
    constructor(props) {
        super(props);
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.state = {
            menuTreeNode
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

    render() {
        const logoSrc = process.env.NODE_ENV === 'development' ? '/assets/logo-ant.svg' : `${process.env.PUBLIC_URL}/assets/logo-ant.svg`;
        return (
            <div>
                <div className="logo">
                    <img src={logoSrc} alt="" />
                    <h1>Bicycle MS</h1>
                </div>
                <Menu
                    theme="dark"
                >
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        );
    }
};
