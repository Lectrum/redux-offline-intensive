// Core
import { delay } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { actions } from 'react-redux-form';

// Instruments
import uiActions from 'actions/ui';
import profileActions from 'actions/profile';
import { api } from 'instruments/api';

export function* updateAvatarWorker ({ payload: [avatar] }) {
    try {
        yield put(uiActions.startFetchingAvatar());

        const token = yield select((state) => state.profile.get('token'));
        const body = yield new FormData();

        yield call([body, body.append], 'avatar', avatar);

        const response = yield call(fetch, `${api}/image`, {
            method:  'POST',
            headers: {
                Authorization: token
            },
            body
        });

        const { data: { avatar: newAvatar }, message } = yield call([
            response,
            response.json
        ]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield delay(1000);
        yield put(profileActions.updateAvatarSuccess(newAvatar));
        yield put(actions.reset('forms.user.profile.avatar'));
        yield put(uiActions.stopFetchingAvatar());
    } catch ({ message }) {
        yield put(profileActions.updateAvatarFail(message));
        yield put(uiActions.stopFetchingAvatar());
    }
}
