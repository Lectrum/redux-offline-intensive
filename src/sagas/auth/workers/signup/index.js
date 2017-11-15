// Core
import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { actions } from 'react-redux-form';
import { replace } from 'react-router-redux';

// Instruments
import uiActions from 'actions/ui';
import authActions from 'actions/auth';
import profileActions from 'actions/profile';
import { api, groupId } from 'instruments/api';

export function* signupWorker ({
    payload: { firstName, lastName, email, password, invite }
}) {
    try {
        yield put(uiActions.startFetchingAuth());

        const response = yield call(fetch, `${api}/user/${groupId}`, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                invite
            })
        });

        const { data: profile, message } = yield call([
            response,
            response.json
        ]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield delay(2000);

        localStorage.setItem('token', profile.token);

        yield put(authActions.signupSuccess());
        yield put(profileActions.fillProfile(profile));
        yield put(replace('/redux/feed'));
        yield put(actions.reset('forms.signup'));
        yield put(uiActions.stopFetchingAuth());
    } catch ({ message }) {
        yield put(authActions.signupFail(message));
        yield put(uiActions.stopFetchingAuth());
    }
}
