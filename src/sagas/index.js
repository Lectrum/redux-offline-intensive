// Core
import { all } from 'redux-saga/effects';

// Instruments
import auth from './auth';
import feed from './feed';
import profile from './profile';

export function* saga () {
    yield all([
        auth.loginWatcher(),
        auth.signupWatcher(),
        auth.logoutWatcher(),
        feed.fetchPostsWatcher(),
        feed.createPostWatcher(),
        feed.deletePostWatcher(),
        feed.likePostWatcher(),
        profile.updateProfileWatcher(),
        profile.updateAvatarWatcher()
    ]);
}
