import { SET_TOKEN, SET_USER } from "../action-types";

export const setToken = (token) => {
    return {
        type: SET_TOKEN,
        value: token,
    };
};


export const setUserInfo = (user) => {
    return {
        type: SET_USER,
        value: user,
    };
};
