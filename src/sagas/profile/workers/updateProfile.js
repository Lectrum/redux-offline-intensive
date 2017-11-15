// Core
import { call, put, select } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

// Instruments
import { api } from 'instruments/api';
import uiActions from 'actions/ui';
import profileActions from 'actions/profile';

export function* updateProfileWorker ({
    payload: {
        firstName,
        lastName,
        oldPassword,
        newPassword: password,
        avatar = []
    }
}) {
    try {
        yield put(uiActions.startFetchingProfile());

        if (avatar.length) {
            yield put(profileActions.updateAvatar(avatar));
        }

        const token = yield select((state) => state.profile.get('token'));

        const response = yield call(fetch, `${api}/user`, {
            method:  'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  token
            },
            body: JSON.stringify({
                firstName,
                lastName,
                oldPassword,
                password
            })
        });

        const { data: user, message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(profileActions.updateProfileSuccess(user));
        yield put(actions.reset('forms.user.password.oldPassword'));
        yield put(actions.reset('forms.user.password.newPassword'));
        yield put(uiActions.stopFetchingProfile());
    } catch ({ message }) {
        yield put(profileActions.updateProfileFail(message));
        yield put(uiActions.stopFetchingProfile());
    }
}
