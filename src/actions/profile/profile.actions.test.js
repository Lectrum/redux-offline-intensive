// Core
import actions from './';

const user = {
    id:        '',
    groupId:   '',
    token:     '',
    created:   0,
    avatar:    '',
    firstName: '',
    lastName:  '',
    email:     ''
};

const avatar = new Blob();
const message = 'message';
const url = 'https://test.image.io';

describe('profile actions:', () => {
    test(`'fillProfile' action creator should produce a corresponding action`, () => {
        expect(actions.fillProfile(user)).toEqual({
            type:    'FILL_PROFILE',
            payload: user
        });
    });
    test(`'updateProfile' action creator should produce a corresponding action`, () => {
        expect(actions.updateProfile(user)).toEqual({
            type:    'UPDATE_PROFILE',
            payload: user
        });
    });
    test(`'updateProfileSuccess' action creator should produce a corresponding action`, () => {
        expect(actions.updateProfileSuccess(user)).toEqual({
            type:    'UPDATE_PROFILE_SUCCESS',
            payload: user
        });
    });
    test(`'updateProfileFail' action creator should produce a corresponding action`, () => {
        expect(actions.updateProfileFail(message)).toEqual({
            type:    'UPDATE_PROFILE_FAIL',
            payload: message
        });
    });
    test(`'updateAvatar' action creator should produce a corresponding action`, () => {
        expect(actions.updateAvatar(avatar)).toEqual({
            type:    'UPDATE_AVATAR',
            payload: avatar
        });
    });
    test(`'updateAvatarSuccess' action creator should produce a corresponding action`, () => {
        expect(actions.updateAvatarSuccess(url)).toEqual({
            type:    'UPDATE_AVATAR_SUCCESS',
            payload: url
        });
    });
    test(`'updateAvatarFail' action creator should produce a corresponding action`, () => {
        expect(actions.updateAvatarFail(message)).toEqual({
            type:    'UPDATE_AVATAR_FAIL',
            payload: message
        });
    });
});
