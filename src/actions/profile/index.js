// Types
import types from './types';

export default {
    fillProfile: (user) => ({
        type:    types.FILL_PROFILE,
        payload: user
    }),
    updateProfile: (user) => ({
        type:    types.UPDATE_PROFILE,
        payload: user
    }),
    updateProfileSuccess: (user) => ({
        type:    types.UPDATE_PROFILE_SUCCESS,
        payload: user
    }),
    updateProfileFail: (message) => ({
        type:    types.UPDATE_PROFILE_FAIL,
        payload: message
    }),
    updateAvatar: (avatar) => ({
        type:    types.UPDATE_AVATAR,
        payload: avatar
    }),
    updateAvatarSuccess: (url) => ({
        type:    types.UPDATE_AVATAR_SUCCESS,
        payload: url
    }),
    updateAvatarFail: (message) => ({
        type:    types.UPDATE_AVATAR_FAIL,
        payload: message
    })
};
