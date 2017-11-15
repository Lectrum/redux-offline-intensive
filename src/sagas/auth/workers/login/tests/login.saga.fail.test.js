// Core
import { put, call } from 'redux-saga/effects';

// Instruments
import { loginWorker } from '../';

const loginToken = {
    payload: {
        token: 'secret'
    }
};
const profile = {
    firstName: 'Walter',
    lastName:  'White'
};
const responseData = {
    data:    profile,
    message: 'message'
};
const fetchResponse = {
    status: 401,
    json:   () => Promise.resolve(responseData)
};
const url = 'https://lab.lectrum.io/redux/api/user/login';

/* eslint-disable no-undef */
global.fetch = jest.fn(() => Promise.resolve(fetchResponse));
global.localStorage = {
    setItem (item) {
        this.item = item;
    },
    removeItem (item) {
        delete this[item];
    }
};
/* eslint-enable no-undef */

const saga = loginWorker(loginToken);

describe('login saga fail scenario:', () => {
    test(`should dispatch 'START_FETCHING_AUTH' action`, () => {
        expect(saga.next().value).toEqual(
            put({
                type: 'START_FETCHING_AUTH'
            })
        );
    });

    test(`should call a 'fetch' request`, () => {
        expect(saga.next().value).toEqual(
            call(fetch, url, {
                method:  'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginToken.payload)
            })
        );
    });

    test(`the 'fetch' request should return valid response`, () => {
        expect(saga.next(fetchResponse).value).toEqual(
            call([fetchResponse, fetchResponse.json])
        );
    });

    test(`should dispatch 'INITIALIZE' action`, () => {
        expect(saga.next(responseData).value).toEqual(
            put({
                type: 'INITIALIZE'
            })
        );
    });

    test(`should dispatch 'LOGIN_FAIL' action`, () => {
        expect(saga.next(responseData).value).toEqual(
            put({
                type:    'LOGIN_FAIL',
                payload: responseData.message
            })
        );
    });

    test(`should dispatch 'STOP_FETCHING_AUTH' action`, () => {
        expect(saga.next().value).toEqual(put({ type: 'STOP_FETCHING_AUTH' }));
    });
});
