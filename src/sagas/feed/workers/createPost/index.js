// Core
import { call, put, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';

// Instruments
import uiActions from 'actions/ui';
import feedActions from 'actions/feed';
import { api } from 'instruments/api';
import post from 'schema/feed';

export function* createPostWorker ({ payload: comment }) {
    try {
        yield put(uiActions.startFetchingFeed());

        const token = yield select((state) => state.profile.get('token'));

        const response = yield call(fetch, `${api}/feed`, {
            method:  'POST',
            headers: {
                Authorization:  token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment
            })
        });

        const { data: denormalizedPost, message } = yield call([
            response,
            response.json
        ]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        const normalizedPost = normalize(denormalizedPost, post);

        yield put(feedActions.createPostSuccess(normalizedPost));
        yield put(uiActions.stopFetchingFeed());
    } catch ({ message }) {
        yield put(feedActions.createPostFail(message));
        yield put(uiActions.stopFetchingFeed());
    }
}
