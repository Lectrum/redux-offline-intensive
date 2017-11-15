// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import uiActions from 'actions/ui';
import feedActions from 'actions/feed';
import { api } from 'instruments/api';

export function* deletePostWorker ({ payload: id }) {
    try {
        yield put(uiActions.startFetchingFeed());

        const token = yield select((state) => state.profile.get('token'));

        const response = yield call(fetch, `${api}/feed/${id}`, {
            method:  'DELETE',
            headers: {
                Authorization: token
            }
        });

        if (response.status !== 204) {
            const { message } = yield call([response, response.json]);

            throw new Error(message);
        }

        yield put(feedActions.deletePostSuccess(id));
        yield put(uiActions.stopFetchingFeed());
    } catch ({ message }) {
        yield put(feedActions.deletePostFail(message));
        yield put(uiActions.stopFetchingFeed());
    }
}
