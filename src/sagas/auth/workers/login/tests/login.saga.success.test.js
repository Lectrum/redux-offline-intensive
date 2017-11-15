// Core
import { put, call } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

// Instruments
import { loginWorker } from '../';

const loginEmail = {
    payload: {
        email:    'test@email.com',
        password: '1111'
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
    status: 200,
    json:   () => Promise.resolve(responseData)
};
const url = 'https://lab.lectrum.io/redux/api/user/login';

/* eslint-disable no-undef */
global.fetch = jest.fn(() => Promise.resolve(fetchResponse));
global.localStorage = {
    setItem (item) {
        this.item = item;
    }
};
/* eslint-enable no-undef */

const saga = loginWorker(loginEmail);

describe('login saga success scenario:', () => {
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
                body: JSON.stringify(loginEmail.payload)
            })
        );
    });

    test(`the 'fetch' request should return valid response`, () => {
        expect(saga.next(fetchResponse).value).toEqual(
            call([fetchResponse, fetchResponse.json])
        );
    });

    test(`should dispatch 'LOGIN_SUCCESS' action`, () => {
        expect(saga.next(responseData).value).toEqual(
            put({
                type: 'LOGIN_SUCCESS'
            })
        );
    });

    test(`should dispatch 'FILL_PROFILE' action`, () => {
        expect(saga.next().value).toEqual(
            put({
                type:    'FILL_PROFILE',
                payload: profile
            })
        );
    });

    test(`should dispatch 'redux-form' 'CHANGE' action`, () => {
        expect(saga.next().value).toEqual(
            put({
                external: true,
                model:    'forms.user.profile.firstName',
                multi:    false,
                silent:   false,
                type:     'rrf/change',
                value:    'Walter'
            })
        );
    });

    test(`should dispatch 'redux-form' 'CHANGE' action`, () => {
        expect(saga.next().value).toEqual(
            put(actions.change('forms.user.profile.lastName', profile.lastName))
        );
    });

    test(`should dispatch 'redux-form' 'RESET' action`, () => {
        expect(saga.next().value).toEqual(
            put({
                model: 'forms.login',
                type:  'rrf/reset'
            })
        );
    });

    test(`should dispatch 'STOP_FETCHING_AUTH' action`, () => {
        expect(saga.next().value).toEqual(put({ type: 'STOP_FETCHING_AUTH' }));
    });
});
