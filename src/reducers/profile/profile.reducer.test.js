// Core
import { Map } from 'immutable';

// Instruments
import reducer from './';

const initialState = Map({
    id:        '',
    groupId:   '',
    token:     '',
    created:   0,
    avatar:    '',
    firstName: '',
    lastName:  '',
    email:     ''
});

const profile = { firstName: 'Mike' };
const avatar = 'https://new.avatar.io';

describe('profile reducer:', () => {
    test(`should return initial state by default`, () => {
        expect(reducer(initialState, {})).toEqual(initialState);
    });

    test(`should handle 'FILL_PROFILE' and 'UPDATE_PROFILE_SUCCESS' actions`, () => {
        expect(
            reducer(initialState, {
                type:    'FILL_PROFILE',
                payload: profile
            })
        ).toEqual(initialState.merge(profile));
        expect(
            reducer(initialState, {
                type:    'UPDATE_PROFILE_SUCCESS',
                payload: profile
            })
        ).toEqual(initialState.merge(profile));
    });

    test(`should handle 'UPDATE_AVATAR_SUCCESS' action`, () => {
        expect(
            reducer(initialState, {
                type:    'UPDATE_AVATAR_SUCCESS',
                payload: avatar
            })
        ).toEqual(initialState.set('avatar', avatar));
    });
});
