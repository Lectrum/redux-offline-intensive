// Core
import { Map } from 'immutable';

// Instruments
import reducer from './';

const initialState = Map({
    authenticated: false
});

describe('auth reducer:', () => {
    test(`should return initial state by default`, () => {
        expect(reducer(initialState, {})).toMatchSnapshot();
    });

    test(`should handle 'LOGIN_SUCCESS' and 'SIGNUP_SUCCESS' actions`, () => {
        expect(
            reducer(initialState, {
                type: 'LOGIN_SUCCESS'
            })
        ).toMatchSnapshot();
        expect(
            reducer(initialState, {
                type: 'SIGNUP_SUCCESS'
            })
        ).toMatchSnapshot();
    });

    test(`should handle 'LOGOUT_SUCCESS' action`, () => {
        expect(
            reducer(initialState, {
                type: 'LOGOUT_SUCCESS'
            })
        ).toMatchSnapshot();
    });
});
