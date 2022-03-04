import {LOGIN_USER , AUTH_USER} from '../action/types.js';


export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}
        case AUTH_USER:
            return {...state, token: action.payload}
        default:
            return state;
    }
}