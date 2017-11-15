// Core
import { takeEvery } from 'redux-saga/effects';

// Instruments
import types from 'actions/profile/types';
import { updateProfileWorker } from './workers/updateProfile';
import { updateAvatarWorker } from './workers/updateAvatar';

export default {
    * updateProfileWatcher () {
        yield takeEvery(types.UPDATE_PROFILE, updateProfileWorker);
    },
    * updateAvatarWatcher () {
        yield takeEvery(types.UPDATE_AVATAR, updateAvatarWorker);
    }
};
