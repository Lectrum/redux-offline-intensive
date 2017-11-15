// Core
import types from './types';

export default {
    initialize: () => ({
        type: types.INITIALIZE
    }),
    startFetchingAuth: () => ({
        type: types.START_FETCHING_AUTH
    }),
    stopFetchingAuth: () => ({
        type: types.STOP_FETCHING_AUTH
    }),
    startFetchingFeed: () => ({
        type: types.START_FETCHING_FEED
    }),
    stopFetchingFeed: () => ({
        type: types.STOP_FETCHING_FEED
    }),
    startFetchingProfile: () => ({
        type: types.START_FETCHING_PROFILE
    }),
    stopFetchingProfile: () => ({
        type: types.STOP_FETCHING_PROFILE
    }),
    startFetchingAvatar: () => ({
        type: types.START_FETCHING_AVATAR
    }),
    stopFetchingAvatar: () => ({
        type: types.STOP_FETCHING_AVATAR
    }),
    startProfileEditing: () => ({
        type: types.START_PROFILE_EDITING
    }),
    stopProfileEditing: () => ({
        type: types.STOP_PROFILE_EDITING
    }),
    startPasswordEditing: () => ({
        type: types.START_PASSWORD_EDITING
    }),
    stopPasswordEditing: () => ({
        type: types.STOP_PASSWORD_EDITING
    })
};
