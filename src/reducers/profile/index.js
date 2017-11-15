// Core
import { Map } from 'immutable';

// Instruments
import types from 'actions/profile/types';

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

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case types.FILL_PROFILE:
        case types.UPDATE_PROFILE_SUCCESS:
            return state.merge(payload);

        case types.UPDATE_AVATAR_SUCCESS:
            return state.set('avatar', payload);

        default:
            return state;
    }
};
