/**
 * function component:函数组件（无状态）
 */

import React from 'react';

export default function Tank(props) {
    return (
        <div>
            <h3>{props.name}是一个坦克</h3>
        </div>
    );
}