// 使用actionCreator统一创建action
import {
    SWITCH_MENU
} from './actionTypes';

export const getMenuAction = menuName => ({
    type: SWITCH_MENU,
    menuName
});