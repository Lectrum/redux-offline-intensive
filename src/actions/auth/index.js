// Types
import types from './types';

export default {
    login: (user) => ({
        type:    types.LOGIN,
        payload: user
    }),
    loginSuccess: () => ({
        type: types.LOGIN_SUCCESS
    }),
    loginFail: (message) => ({
        type:    types.LOGIN_FAIL,
        payload: message
    }),
    signup: (user) => ({
        type:    types.SIGNUP,
        payload: user
    }),
    signupSuccess: () => ({
        type: types.SIGNUP_SUCCESS
    }),
    signupFail: (message) => ({
        type:    types.SIGNUP_FAIL,
        payload: message
    }),
    logout: () => ({
        type: types.LOGOUT
    }),
    logoutSuccess: () => ({
        type: types.LOGOUT_SUCCESS
    }),
    logoutFail: (message) => ({
        type:    types.LOGOUT_FAIL,
        payload: message
    })
};
