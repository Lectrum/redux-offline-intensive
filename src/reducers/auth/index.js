// Core
import { Map } from 'immutable';

// Instruments
import types from 'actions/auth/types';

const initialState = Map({
    authenticated: false
});

export default (state = initialState, { type }) => {
    switch (type) {
        case types.LOGIN_SUCCESS:
        case types.SIGNUP_SUCCESS:
            return state.set('authenticated', true);

        case types.LOGOUT_SUCCESS:
            return state.set('authenticated', false);

        default:
            return state;
    }
};
