// Core
import { call, put, select } from 'redux-saga/effects';

// Instruments
import uiActions from 'actions/ui';
import feedActions from 'actions/feed';
import { api } from 'instruments/api';

export function* likePostWorker ({ payload: postId }) {
    try {
        yield put(uiActions.startFetchingFeed());

        const token = yield select((state) => state.profile.get('token'));

        const response = yield call(fetch, `${api}/feed/like/${postId}`, {
            method:  'PUT',
            headers: {
                Authorization: token
            }
        });

        if (response.status !== 204) {
            const { message } = yield call([response, response.json]);

            throw new Error(message);
        }

        const userId = yield select((state) => state.profile.get('id'));

        yield put(feedActions.likePostSuccess(postId, userId));
        yield put(uiActions.stopFetchingFeed());
    } catch ({ message }) {
        yield put(feedActions.likePostFail(message));
        yield put(uiActions.stopFetchingFeed());
    }
}
