// Core
import { call, put, select } from 'redux-saga/effects';
import { normalize } from 'normalizr';

// Instruments
import uiActions from 'actions/ui';
import feedActions from 'actions/feed';
import { api } from 'instruments/api';
import post from 'schema/feed';

export function* fetchPostsWorker () {
    try {
        yield put(uiActions.startFetchingFeed());

        const token = yield select((state) => state.profile.get('token'));

        const response = yield call(fetch, `${api}/feed?size=100`, {
            method:  'GET',
            headers: {
                Authorization: token
            }
        });

        const { data: posts } = yield call([response, response.json]);

        if (response.status !== 200) {
            const { message } = yield call([response, response.json]);

            throw new Error(message);
        }

        const normalizedPosts = normalize(posts, [post]);

        yield put(feedActions.fetchPostsSuccess(normalizedPosts));
        yield put(uiActions.stopFetchingFeed());
    } catch ({ message }) {
        yield put(feedActions.fetchPostsFail(message));
        yield put(uiActions.stopFetchingFeed());
    }
}
