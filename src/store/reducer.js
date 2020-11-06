import { getToken, setToken } from "@/utils/auth";

const defaultState = {
    userInfo: null,
    token: getToken() || null,
}

export default (state = defaultState, action)=>{
    if (action.type == "set_token"){
        let newState = JSON.parse(JSON.stringify(state));
        newState.token = action.value;
        setToken(action.value);
        return newState;
    }

    if (action.type == "set_user"){
        let newState = JSON.parse(JSON.stringify(state));
        newState.userInfo = action.value;
        return newState;
    }

    return state;
}
