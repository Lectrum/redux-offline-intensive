// Core
import { call, put } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

// Instruments
import uiActions from 'actions/ui';
import authActions from 'actions/auth';
import profileActions from 'actions/profile';
import { api } from 'instruments/api';

export function* loginWorker ({ payload: { email, password, token }}) {
    try {
        yield put(uiActions.startFetchingAuth());

        const user = token
            ? {
                token
            }
            : {
                email,
                password
            };

        const response = yield call(fetch, `${api}/user/login`, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const { data: profile, message } = yield call([
            response,
            response.json
        ]);

        if (response.status !== 200) {
            if (response.status === 401) {
                yield put(uiActions.initialize());
                localStorage.removeItem('token');
            }

            throw new Error(message);
        }

        localStorage.setItem('token', profile.token);

        yield put(authActions.loginSuccess());
        yield put(profileActions.fillProfile(profile));

        const { firstName, lastName } = profile;

        yield put(actions.change('forms.user.profile.firstName', firstName));
        yield put(actions.change('forms.user.profile.lastName', lastName));
        yield put(actions.reset('forms.login'));
        yield put(uiActions.stopFetchingAuth());
    } catch ({ message }) {
        yield put(authActions.loginFail(message));
        yield put(uiActions.stopFetchingAuth());
    }
}
