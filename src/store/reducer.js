import {
    SWITCH_MENU
} from './actionTypes';

const defaultState = {
    menuName: '首页'
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case SWITCH_MENU:
            const newState = JSON.parse(JSON.stringify(state));
            newState.menuName = action.menuName;
            return newState;
        default:
            return {...state};
    }
};