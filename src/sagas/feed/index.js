// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import types from 'actions/feed/types';
import { fetchPostsWorker } from './workers/fetchPosts';
import { createPostWorker } from './workers/createPost';
import { deletePostWorker } from './workers/deletePost';
import { likePostWorker } from './workers/likePost';

export default {
    * fetchPostsWatcher () {
        yield takeEvery(types.FETCH_POSTS, fetchPostsWorker);
    },
    * createPostWatcher () {
        yield takeEvery(types.CREATE_POST, createPostWorker);
    },
    * deletePostWatcher () {
        yield takeEvery(types.DELETE_POST, deletePostWorker);
    },
    * likePostWatcher () {
        yield takeEvery(types.LIKE_POST, likePostWorker);
    }
};
