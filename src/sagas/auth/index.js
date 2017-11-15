// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import types from 'actions/auth/types';
import { loginWorker } from './workers/login';
import { signupWorker } from './workers/signup';
import { logoutWorker } from './workers/logout';

export default {
    * loginWatcher () {
        yield takeEvery(types.LOGIN, loginWorker);
    },
    * signupWatcher () {
        yield takeEvery(types.SIGNUP, signupWorker);
    },
    * logoutWatcher () {
        yield takeEvery(types.LOGOUT, logoutWorker);
    }
};
