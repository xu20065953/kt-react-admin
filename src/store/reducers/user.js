import { SET_TOKEN, SET_USER } from "../action-types";
import { getToken, setToken } from "@/utils/auth";

const defaultState = {
    userInfo: null,
    token: getToken() || null,
}

export default (state = defaultState, action)=>{
    if (action.type == SET_TOKEN){
        // let newState = JSON.parse(JSON.stringify(state));
        // newState.token = action.value;
        setToken(action.value);
        return {...state, token: action.value };
    }

    if (action.type == SET_USER){
        return {...state, userInfo: action.value};
    }

    return state;
}
